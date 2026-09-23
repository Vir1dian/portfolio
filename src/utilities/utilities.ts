// Each subfolder needs its own static template string so Vite can find the
// files at build time (a single `${name}` wildcard does not cross folders).
function getAssetPath(name: string, subfolder: '' | 'fonts' | 'icons' | 'projects' = '') {
  switch (subfolder) {
    case 'fonts': return new URL(`../assets/fonts/${name}`, import.meta.url).href;
    case 'icons': return new URL(`../assets/icons/${name}`, import.meta.url).href;
    case 'projects': return new URL(`../assets/projects/${name}`, import.meta.url).href;
    default: return new URL(`../assets/${name}`, import.meta.url).href;
  }
};

// Thumbnails/diagrams may live in src/assets (legacy) or src/assets/projects.
// Content refers to the latter as 'projects/<file>'.
const PROJECTS_PREFIX = 'projects/';
function getImagePath(name: string) {
  if (name.startsWith(PROJECTS_PREFIX)) return getAssetPath(name.slice(PROJECTS_PREFIX.length), 'projects');
  return getAssetPath(name);
}

function redirectTo(link: string | undefined) {
  if (link) window.open(link, '_blank');
}

function getRandomString(length: number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export {
  getAssetPath,
  getImagePath,
  redirectTo,
  getRandomString
}
