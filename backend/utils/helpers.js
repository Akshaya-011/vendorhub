const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
};

const generateRandomString = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const extractSubdomain = (hostname) => {
  if (!hostname) return null;
  const parts = hostname.split('.');
  // If localhost: e.g. bakery.localhost
  if (parts.length > 1 && parts[parts.length - 1] === 'localhost') {
    return parts[0];
  }
  // Standard domain: e.g. bakery.vendorhub.com
  if (parts.length > 2) {
    return parts[0];
  }
  return null;
};

module.exports = {
  slugify,
  generateRandomString,
  extractSubdomain
};
