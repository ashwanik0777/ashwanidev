/*
 * Shared field helpers for the public faculty profile tabs.
 *
 * The faculty dashboard and these tabs grew separate vocabularies for the same
 * data (e.g. the editor saves `issuingOrganization` while the tab rendered
 * `platform`, the editor saves a PhD scholar's `topic` while the tab rendered
 * `thesis`). On top of that, several tabs called `.map()` / `.toLowerCase()`
 * straight on optional fields, so a profile saved from the dashboard crashed
 * the whole tab instead of rendering blanks.
 *
 * `pick` resolves the first key that actually carries a value, and the `as*`
 * helpers make every read total.
 */

export const asArray = (value) => {
  if (Array.isArray(value)) return value.filter((item) => item !== null && item !== undefined);
  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

export const asText = (value, fallback = "") => {
  if (value === null || value === undefined) return fallback;
  const text = String(value).trim();
  return text || fallback;
};

export const asNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

/** First key on `source` that holds a non-empty value, else `fallback`. */
export const pick = (source, keys, fallback = "") => {
  if (!source) return fallback;
  for (const key of keys) {
    const value = source[key];
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && !value.trim()) continue;
    if (Array.isArray(value) && !value.length) continue;
    return value;
  }
  return fallback;
};

export const pickText = (source, keys, fallback = "") => asText(pick(source, keys), fallback);

export const pickArray = (source, keys) => asArray(pick(source, keys));

export const pickNumber = (source, keys, fallback = 0) => asNumber(pick(source, keys), fallback);

/** Case-insensitive lookup that never explodes on a missing status/level. */
export const matchKey = (value, map, fallback) => {
  const key = asText(value).toLowerCase();
  return map[key] ?? fallback;
};

/** Placeholder for a field the faculty has not filled in yet. */
export const NOT_PROVIDED = "—";

export const displayOr = (value, fallback = NOT_PROVIDED) => asText(value, fallback);
