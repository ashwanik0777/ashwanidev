/**
 * Shared utility for parsing image URLs from various sources.
 * Handles: Google Drive, Google Photos, normal URLs, and relative paths.
 */

const VITE_HOST = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_HOST || '') : '';
const BASE_URL = VITE_HOST ? (VITE_HOST.endsWith('/') ? VITE_HOST.slice(0, -1) : VITE_HOST) : '';

/**
 * Parse Google Drive links into direct viewable/embeddable image URLs.
 * Supports:
 *   - drive.google.com/file/d/FILE_ID/view
 *   - drive.google.com/open?id=FILE_ID
 *   - drive.google.com/uc?id=FILE_ID
 *   - drive.google.com/thumbnail?id=FILE_ID
 */
export const parseDriveLink = (url) => {
  if (!url) return '';
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=|uc\?export=view&id=))([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}=w1000`;
  }
  return url;
};

/**
 * Parse Google Photos links into direct image URLs.
 * Supports:
 *   - photos.google.com/share/... (shared album links)
 *   - photos.app.goo.gl/... (short links)
 *   - lh3.googleusercontent.com/... (already direct links)
 *   - lh3.googleusercontent.com/pw/... (Google Photos direct)
 */
export const parseGooglePhotosLink = (url) => {
  if (!url) return '';
  // Already a direct googleusercontent link
  if (url.includes('lh3.googleusercontent.com')) {
    // Ensure proper sizing parameter
    if (url.includes('=w') || url.includes('=s')) return url;
    return url + '=w1000';
  }
  // Google Photos share links can't be directly converted,
  // but we return as-is since the user may paste the direct image URL from Photos
  return url;
};

/**
 * Master image URL parser.
 * Detects the type of URL and converts it to a directly usable image source.
 * 
 * @param {string} path - The image URL or path
 * @param {number} [width=1000] - Desired width for Google Drive thumbnails
 * @returns {string} - A directly usable image URL
 */
export const parseImageUrl = (path, width = 1000) => {
  if (!path) return '';

  const trimmed = path.trim();

  // 1. Google Drive links
  if (trimmed.includes('drive.google.com')) {
    const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=|uc\?export=view&id=|thumbnail\?id=))([a-zA-Z0-9_-]+)/;
    const match = trimmed.match(driveRegex);
    if (match && match[1]) {
      return `https://lh3.googleusercontent.com/d/${match[1]}=w${width}`;
    }
  }

  // 2. Google Photos / googleusercontent links
  if (trimmed.includes('lh3.googleusercontent.com')) {
    if (trimmed.includes('=w') || trimmed.includes('=s')) return trimmed;
    return trimmed + `=w${width}`;
  }

  // 3. Google Photos share/app links (photos.google.com or photos.app.goo.gl)
  if (trimmed.includes('photos.google.com') || trimmed.includes('photos.app.goo.gl')) {
    return trimmed; // These are viewable share links
  }

  // 4. Already a full URL (http/https)
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // 5. Data URLs
  if (trimmed.startsWith('data:')) return trimmed;

  // 6. Relative path - prefix with base URL
  const cleanPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  if (BASE_URL) {
    return `${BASE_URL}${cleanPath}`;
  }
  return cleanPath;
};

/**
 * Get a usable image URL with a fallback placeholder.
 * 
 * @param {string} path - The image URL or path
 * @param {string} [placeholder] - Custom placeholder URL
 * @returns {string} - A directly usable image URL
 */
export const getImageUrl = (path, placeholder = 'https://via.placeholder.com/800x500/6B7280/FFFFFF?text=Image+Not+Found') => {
  if (!path) return placeholder;
  const parsed = parseImageUrl(path);
  return parsed || placeholder;
};

/**
 * Extract 1-2 letter initials from a faculty member's name.
 */
export const getFacultyInitials = (name) => {
  if (!name) return 'F';
  const skip = ['dr.', 'dr', 'prof.', 'prof', 'mr.', 'mr', 'ms.', 'ms', 'mrs.', 'mrs', 'shri', 'smt.', 'smt'];
  const parts = String(name).split(/\s+/).filter(w => !skip.includes(w.toLowerCase()));
  if (parts.length === 0) return 'F';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Resolve faculty image URL with fallback to local mapped assets or ui-avatars.com.
 */
export const resolveFacultyImage = (url, image, name, email, id) => {
  const target = url || image;
  if (target) {
    const parsed = parseImageUrl(target);
    if (parsed) return parsed;
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(getFacultyInitials(name || 'Faculty'))}&background=0D8ABC&color=fff&size=150`;
};


