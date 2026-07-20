// Generates the browser-tab / home-screen icons in public/ from the brand
// logo. Re-run after changing src/assets/logo.png:
//
//   node scripts/generate-favicons.mjs
import sharp from 'sharp';

const SRC = new URL('../src/assets/logo.png', import.meta.url).pathname
  .replace(/^\/([A-Za-z]:)/, '$1'); // strip leading slash on Windows drive paths
const OUT = new URL('../public', import.meta.url).pathname
  .replace(/^\/([A-Za-z]:)/, '$1');

// Wide wordmark centered on a square canvas. Transparent for the tab icons;
// solid white for the iOS home-screen icon (iOS fills transparency with black).
const make = (size, file, background) =>
  sharp(SRC)
    .resize({
      width: Math.round(size * 0.92),
      height: Math.round(size * 0.92),
      fit: 'contain',
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .extend({
      top: Math.round(size * 0.04),
      bottom: Math.round(size * 0.04),
      left: Math.round(size * 0.04),
      right: Math.round(size * 0.04),
      background: background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(`${OUT}/${file}`)
    .then(() => console.log(`${file} (${size}px)`));

await make(64, 'favicon.png');
await make(192, 'icon-192.png');
await make(512, 'icon-512.png');
await make(180, 'apple-touch-icon.png', { r: 255, g: 255, b: 255, alpha: 1 });
