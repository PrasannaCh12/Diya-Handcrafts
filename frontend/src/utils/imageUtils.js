/**
 * Universal Image URL Resolver
 * Safely resolves Data URIs, absolute HTTP/HTTPS URLs, relative public paths, and fallback placeholders.
 */
export const getImageUrl = (src) => {
  if (!src) return '/logo192.png';
  if (typeof src !== 'string') return '/logo192.png';
  
  const cleanSrc = src.trim();
  if (!cleanSrc) return '/logo192.png';

  // 1. Data URI (Base64) or Blob URI
  if (cleanSrc.startsWith('data:') || cleanSrc.startsWith('blob:')) {
    return cleanSrc;
  }

  // 2. Absolute HTTP / HTTPS URL
  if (cleanSrc.startsWith('http://') || cleanSrc.startsWith('https://')) {
    return cleanSrc;
  }

  // 3. Relative path starting with /
  if (cleanSrc.startsWith('/')) {
    return cleanSrc;
  }

  // 4. Relative path without leading /
  return `/${cleanSrc}`;
};
