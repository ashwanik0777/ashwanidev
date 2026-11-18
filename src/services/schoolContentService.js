import { getSchoolByCode } from "./schoolsService";

/*
 * Public pages read a school's row (dean, banners, clubs ...) from several sections of the
 * same page. One request per school per minute is shared between them.
 */
const TTL_MS = 60 * 1000;
const cache = new Map();

export const fetchSchoolCached = (code) => {
  const key = String(code || "").toUpperCase();
  if (!key) return Promise.resolve(null);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.promise;
  const promise = getSchoolByCode(key).catch(() => null);
  cache.set(key, { at: Date.now(), promise });
  return promise;
};

// Resolves to null instead of holding the page when the API is slow.
export const fetchSchoolWithin = (code, ms = 4000) =>
  Promise.race([fetchSchoolCached(code), new Promise((resolve) => setTimeout(() => resolve(null), ms))]);
