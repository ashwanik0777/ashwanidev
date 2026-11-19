/*
 * Distinguished visitors shown on the home page. The list is managed from the Admin dashboard
 * and stored on the university's own row (schools code GBU, content.distinguishedVisitors).
 * Until the admin saves a list there, the website shows DEFAULT_VISITORS.
 */

export const VISITORS_SCHOOL_CODE = "GBU";
export const VISITORS_KEY = "distinguishedVisitors";

// Starting list. Only real visits: the Chief Minister's visit (as reported by the university
// office) and Lama Padma Samten's visit from the university's own news item.
export const DEFAULT_VISITORS = [
  {
    id: "yogi-adityanath",
    name: "Shri Yogi Adityanath",
    designation: "Hon'ble Chief Minister, Uttar Pradesh",
    photo: "/assets/Yogiji.jpg",
    visitDate: "",
    link: "",
  },
  {
    id: "lama-padma-samten",
    name: "Lama Padma Samten",
    designation: "Buddhist Scholar & Spiritual Leader, Brazil",
    // The news item's Google Drive photo does not load inside other pages, so initials show
    // until a photo is uploaded from the Admin dashboard.
    photo: "",
    visitDate: "",
    link: "/announcements/news/renowned-brazilian-buddhist-scholar-lama-padma-samten-visits-gbu",
  },
];

const text = (value) => (value === undefined || value === null ? "" : String(value).trim());

export const normalizeVisitor = (raw = {}, index = 0) => ({
  id: text(raw.id) || `visitor-${index + 1}`,
  name: text(raw.name),
  designation: text(raw.designation),
  photo: text(raw.photo),
  visitDate: text(raw.visitDate),
  link: text(raw.link),
  isActive: raw.isActive !== false,
});

// The stored list, or the default one when the admin has not saved a list yet.
export const visitorsFromContent = (content) => {
  const stored = content?.[VISITORS_KEY];
  const list = Array.isArray(stored) ? stored : DEFAULT_VISITORS;
  return list.map(normalizeVisitor).filter((visitor) => visitor.name);
};

export const hasSavedVisitors = (content) => Array.isArray(content?.[VISITORS_KEY]);

// "2026-01-20" or "2026-01" -> "Jan 2026"
export const formatVisitDate = (value) => {
  const match = /^(\d{4})-(\d{2})/.exec(text(value));
  if (!match) return "";
  const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
};

export const visitorInitials = (name) =>
  text(name)
    .replace(/^(shri|smt|dr|prof|mr|mrs|ms|hon'?ble)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
