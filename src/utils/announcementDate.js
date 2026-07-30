/*
 * Date formatting for the Announcements pages.
 *
 * These pages used to call `new Date(value)` straight from the API payload and
 * hand the result to a formatter. When the field was missing — which happened
 * whenever the API and the page disagreed on the key name — the formatter
 * printed the literal string "Invalid Date" to visitors. Everything here fails
 * closed to a neutral placeholder instead.
 */

export const DATE_PLACEHOLDER = "—";

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** A valid Date, or null. Never an Invalid Date. */
export const toValidDate = (value) => {
  if (!value) return null;
  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export const isValidDate = (value) => toValidDate(value) !== null;

/**
 * Formats using the same MMMM/MMM/MM/dd/yyyy/yy tokens the pages already use.
 * Returns `fallback` when the value cannot be parsed.
 */
export const formatAnnouncementDate = (value, pattern = "MMMM dd, yyyy", fallback = DATE_PLACEHOLDER) => {
  const date = toValidDate(value);
  if (!date) return fallback;

  const pad = (n) => String(n).padStart(2, "0");
  const tokens = {
    MMMM: MONTHS_LONG[date.getMonth()],
    MMM: MONTHS_LONG[date.getMonth()].slice(0, 3),
    MM: pad(date.getMonth() + 1),
    dd: pad(date.getDate()),
    yyyy: String(date.getFullYear()),
    yy: String(date.getFullYear()).slice(-2),
  };
  return pattern.replace(/MMMM|MMM|MM|dd|yyyy|yy/g, (match) => tokens[match]);
};

/** Four-digit year as a string, or "" when the value is unusable. */
export const getAnnouncementYear = (value) => {
  const date = toValidDate(value);
  return date ? String(date.getFullYear()) : "";
};

/** Distinct, sorted (newest first) years across a list — undated items skipped. */
export const collectYears = (items, key = "date") => {
  const years = new Set();
  for (const item of items || []) {
    const year = getAnnouncementYear(item?.[key]);
    if (year) years.add(year);
  }
  return [...years].sort((a, b) => Number(b) - Number(a));
};
