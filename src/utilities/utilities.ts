function getAssetPath(name: string, subfolder: '' | 'fonts' | 'icons' = '') {
  if (!subfolder) return new URL(`../assets/${name}`, import.meta.url).href;
  else return new URL(`../assets/${subfolder}/${name}`, import.meta.url).href;
};

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
  redirectTo,
  getRandomString
}