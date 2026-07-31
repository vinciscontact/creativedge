// Prerenders the built SPA into real per-route HTML so crawlers that don't
// execute JavaScript (Bing, GPTBot, ClaudeBot, PerplexityBot, ...) see actual
// content instead of an empty <div id="root">.
//
// Runs after `vite build`:  node scripts/prerender.mjs
// - serves dist/ on a local port with SPA fallback
// - opens each route in system Chrome/Edge (puppeteer-core, headless)
// - emulates prefers-reduced-motion so no content is trapped at opacity:0
//   by entrance animations, and scrolls through the page to settle layout
// - writes dist/<route>/index.html with the fully rendered markup
//
// The live app still hydrates over this HTML client-side, so visitors get the
// full animated experience — only the initial payload changes.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = 4179;
const ROUTES = ['/', '/about', '/services', '/portfolio', '/contact', '/privacy', '/terms'];
// Deploy subpath (e.g. '/creativedge' on GitHub Pages project sites); '' at root.
const BASE_PATH = (process.env.VITE_BASE || '/').replace(/\/$/, '');

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.txt': 'text/plain', '.xml': 'text/xml', '.woff2': 'font/woff2',
};

const CHROME_PATHS = [
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  `${process.env.LOCALAPPDATA}\\Google\\Chrome\\Application\\chrome.exe`,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium-browser',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

async function findBrowser() {
  for (const p of CHROME_PATHS) {
    try { await access(p); return p; } catch { /* keep looking */ }
  }
  return null;
}

function serveDist(shell) {
  const server = createServer(async (req, res) => {
    let urlPath = decodeURIComponent(new URL(req.url, `http://localhost:${PORT}`).pathname);
    // dist/ maps to the site root *under* the base path — strip it first.
    if (BASE_PATH && urlPath.startsWith(BASE_PATH)) urlPath = urlPath.slice(BASE_PATH.length) || '/';
    let filePath = join(DIST, urlPath);
    try {
      if (!extname(filePath)) throw new Error('route');
      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME[extname(filePath).toLowerCase()] ?? 'application/octet-stream' });
      res.end(data);
    } catch {
      // SPA fallback — always the PRISTINE shell captured before rendering.
      // (Serving dist/index.html live would leak the prerendered home page's
      // head tags into every other route once "/" has been written.)
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(shell);
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

// Fail-soft when the build environment has no Chrome (e.g. Vercel's build
// container): ship the plain SPA instead of failing the whole deployment.
// Environments with Chrome (local, GitHub Actions) still get full prerender;
// set PRERENDER_REQUIRE=1 to make a missing browser fail the build again.
const executablePath = await findBrowser();
if (!executablePath) {
  const msg =
    'No Chrome/Edge found for prerendering. Install Chrome or set PUPPETEER_EXECUTABLE_PATH.';
  if (process.env.PRERENDER_REQUIRE) throw new Error(msg);
  console.warn(`[prerender] SKIPPED — ${msg}`);
  console.warn('[prerender] Deploying the SPA without per-route static HTML.');
  process.exit(0);
}

const shell = await readFile(join(DIST, 'index.html'));
const server = await serveDist(shell);
const browser = await puppeteer.launch({ executablePath, headless: true });

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  // Reduced motion: our GSAP/framer code renders everything fully visible in
  // this mode, so the snapshot contains no opacity-0 "hidden text".
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  for (const route of ROUTES) {
    await page.goto(`http://localhost:${PORT}${BASE_PATH}${route}`, { waitUntil: 'networkidle0', timeout: 60_000 });
    // Trigger any remaining in-view reveals, then settle back at the top.
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));
    });

    const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML));
    const outDir = route === '/' ? DIST : join(DIST, route.slice(1));
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, 'index.html'), html);

    const textBytes = await page.evaluate(() => document.body.innerText.length);
    console.log(`prerendered ${route.padEnd(11)} -> ${route === '/' ? '' : route.slice(1) + '/'}index.html (${textBytes} chars of text)`);
  }
  // GitHub Pages (and most static hosts) serve 404.html with a real 404
  // status for unknown paths — the pristine shell lets React render the
  // NotFound page there.
  await writeFile(join(DIST, '404.html'), shell);
  console.log('wrote 404.html (SPA shell -> NotFound route)');
} finally {
  await browser.close();
  server.close();
}

console.log('\nPrerender complete. Deploy dist/ — each route now ships real HTML.');
