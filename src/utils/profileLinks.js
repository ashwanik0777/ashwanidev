/*
 * Faculty profile links as typed by people: "www.linkedin.com/in/...", a bare ORCID iD
 * ("0000-0002-1825-0097"), a Google Scholar user id, or a link wrapped in text.
 * Opened as-is, these become broken links relative to our own site, so they are turned
 * into full links here. Returns "" when nothing usable is found.
 */

const ORCID_ID = /\b(\d{4}-\d{4}-\d{4}-\d{3}[\dX])\b/i;
const SCHOLAR_USER_ID = /^[A-Za-z0-9_-]{12}$/;

export const profileLink = (value, kind = "") => {
  const raw = String(value ?? "").trim();
  if (!raw) return "";

  const embedded = raw.match(/https?:\/\/[^\s)'"<>]+/i);
  if (embedded) return embedded[0];

  if (kind === "orcid") {
    const id = raw.match(ORCID_ID);
    if (id) return `https://orcid.org/${id[1].toUpperCase()}`;
  }
  if (kind === "googleScholar" && SCHOLAR_USER_ID.test(raw)) {
    return `https://scholar.google.com/citations?user=${raw}`;
  }

  if (raw.startsWith("//")) return `https:${raw}`;
  if (raw.startsWith("/")) return raw;
  // A bare domain, e.g. "www.linkedin.com/in/name"
  if (/^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(raw)) return `https://${raw}`;
  return "";
};
