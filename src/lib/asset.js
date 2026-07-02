// Prefixes public-folder asset paths with Vite's base URL so runtime-built
// paths (gallery images, hero background, team photos) keep working when the
// site is served from a subpath (GitHub Pages project sites).
// Pass paths starting with '/', e.g. asset('/images/foo.webp').
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const asset = (path) => `${base}${path}`;
