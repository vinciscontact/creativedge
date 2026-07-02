// Converts every JPG/PNG under public/images to a resized WebP sibling
// (same path, .webp extension). Originals are kept; the app references the
// .webp versions. Re-run after adding new images — up-to-date files are skipped.
//
//   node scripts/optimize-images.mjs
import { readdir, stat } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../public/images', import.meta.url).pathname
  .replace(/^\/([A-Za-z]:)/, '$1'); // strip leading slash on Windows drive paths

const MAX_WIDTH = 1600; // plenty for a 3-col gallery on retina; huge PDF scans shrink a lot
const QUALITY = 80;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

let converted = 0;
let skipped = 0;
let inBytes = 0;
let outBytes = 0;

for await (const file of walk(ROOT)) {
  if (!/\.(jpe?g|png)$/i.test(extname(file))) continue;
  const out = file.replace(/\.(jpe?g|png)$/i, '.webp');

  const srcStat = await stat(file);
  const outStat = await stat(out).catch(() => null);
  if (outStat && outStat.mtimeMs >= srcStat.mtimeMs) {
    skipped++;
    continue;
  }

  await sharp(file)
    .rotate() // respect EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);

  const outSize = (await stat(out)).size;
  inBytes += srcStat.size;
  outBytes += outSize;
  converted++;
  console.log(
    `${(srcStat.size / 1024 / 1024).toFixed(1).padStart(6)} MB -> ${(outSize / 1024).toFixed(0).padStart(5)} KB  ${file.slice(ROOT.length + 1)}`
  );
}

console.log(
  `\nDone: ${converted} converted, ${skipped} up-to-date. ${(inBytes / 1024 / 1024).toFixed(1)} MB -> ${(outBytes / 1024 / 1024).toFixed(1)} MB`
);
