/*
 * One shape for a club, shared by the public club page and the club manager in the
 * School and Admin dashboards. Clubs are stored in each school's content blob
 * (schools.content.clubs), so this file is the only place that knows the fields.
 */

export const CLUB_CATEGORIES = [
  "Technical",
  "Cultural",
  "Literary",
  "Sports",
  "Social",
  "Media",
  "Environmental",
  "Wellness",
  "Entrepreneurship",
  "Academic",
  "Other",
];

// Light chip colours per category (no gradients).
export const CATEGORY_TONES = {
  Technical: "bg-sky-50 text-sky-700 ring-sky-200",
  Cultural: "bg-violet-50 text-violet-700 ring-violet-200",
  Literary: "bg-rose-50 text-rose-700 ring-rose-200",
  Sports: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Social: "bg-amber-50 text-amber-700 ring-amber-200",
  Media: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  Environmental: "bg-green-50 text-green-700 ring-green-200",
  Wellness: "bg-teal-50 text-teal-700 ring-teal-200",
  Entrepreneurship: "bg-orange-50 text-orange-700 ring-orange-200",
  Academic: "bg-blue-50 text-blue-700 ring-blue-200",
  Other: "bg-slate-100 text-slate-700 ring-slate-200",
};
export const categoryTone = (category) => CATEGORY_TONES[category] || CATEGORY_TONES.Other;

export const OFFICE_BEARERS = [
  { key: "president", label: "President" },
  { key: "vicePresident", label: "Vice President" },
  { key: "secretary", label: "Secretary" },
  { key: "treasurer", label: "Treasurer" },
];

export const SOCIAL_PLATFORMS = [
  { key: "instagram", label: "Instagram", placeholder: "https://instagram.com/..." },
  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/..." },
  { key: "youtube", label: "YouTube", placeholder: "https://youtube.com/..." },
  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/..." },
  { key: "twitter", label: "X (Twitter)", placeholder: "https://x.com/..." },
  { key: "website", label: "Website", placeholder: "https://..." },
];

export const slugify = (text) =>
  String(text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

// The id is the club's URL (/club/:id?school=CODE). Older clubs have no id and use their name.
export const clubId = (club) => club?.id || slugify(club?.name);

// A new club gets a readable id that no other club of the same school uses.
export const uniqueClubId = (name, clubs = [], ownId = null) => {
  const taken = new Set(clubs.map(clubId).filter((id) => id && id !== ownId));
  const base = slugify(name) || "club";
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
};

export const isClubVisible = (club) => club?.isActive !== false;

const text = (value) => (value === undefined || value === null ? "" : String(value).trim());

const textList = (value) => {
  if (Array.isArray(value)) return value.map(text).filter(Boolean);
  if (typeof value === "string") return value.split(/\r?\n/).map(text).filter(Boolean);
  return [];
};

const person = (raw, role = "") => ({
  name: text(raw?.name),
  role: text(raw?.role) || role,
  department: text(raw?.department),
  email: text(raw?.email),
  photo: text(raw?.photo || raw?.image),
});

const nonNegativeNumber = (value) => {
  const n = Number(String(value ?? "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 0;
};

/**
 * Every field present, every list an array, nothing invented. Accepts both the
 * stored shape and the older flat fields (facultyAdvisor, presidentName, members, ...).
 */
export const normalizeClub = (raw = {}) => {
  const team = raw.team || {};
  const policies = raw.policies || {};
  const social = { ...(raw.socialLinks || {}), ...(raw.socialMedia || {}) };

  const facultyCoordinator = person(
    team.facultyCoordinator || { name: raw.facultyAdvisor, department: raw.facultyAdvisorDept },
    "Faculty Advisor",
  );
  const bearers = {};
  OFFICE_BEARERS.forEach(({ key, label }) => {
    bearers[key] = person(team[key] || { name: raw[`${key}Name`], department: raw[`${key}Dept`] }, label);
  });

  return {
    id: clubId(raw),
    name: text(raw.name),
    tagline: text(raw.tagline),
    category: text(raw.category) || "Other",
    logo: text(raw.logo),
    banner: text(raw.banner || raw.image),
    memberCount: nonNegativeNumber(raw.memberCount ?? raw.members),
    foundedYear: text(raw.foundedYear),
    isActive: raw.isActive !== false,
    description: text(raw.description),
    history: text(raw.history),
    objectives: textList(raw.objectives),
    achievements: textList(raw.achievements),
    team: {
      facultyCoordinator,
      ...bearers,
      members: (Array.isArray(team.members) ? team.members : []).map((m) => person(m)).filter((m) => m.name),
    },
    events: (Array.isArray(raw.events) ? raw.events : [])
      .map((e, i) => ({
        id: text(e?.id) || `event-${i + 1}`,
        title: text(e?.title),
        date: text(e?.date),
        venue: text(e?.venue),
        description: text(e?.description),
        image: text(e?.image),
        link: text(e?.link),
      }))
      .filter((e) => e.title),
    gallery: (Array.isArray(raw.gallery) ? raw.gallery : [])
      .map((g, i) => (typeof g === "string" ? { id: `photo-${i + 1}`, url: text(g), caption: "" } : { id: text(g?.id) || `photo-${i + 1}`, url: text(g?.url), caption: text(g?.caption) }))
      .filter((g) => g.url),
    policies: {
      codeOfConduct: textList(policies.codeOfConduct),
      eligibility: textList(policies.eligibility),
      responsibilities: textList(policies.responsibilities),
      meetingFrequency: text(policies.meetingFrequency || raw.meetingFrequency),
      meetingVenue: text(policies.meetingVenue),
    },
    reports: (Array.isArray(raw.reports) ? raw.reports : [])
      .map((r, i) => ({ id: text(r?.id) || `report-${i + 1}`, title: text(r?.title), year: text(r?.year), summary: text(r?.summary), link: text(r?.link) }))
      .filter((r) => r.title),
    socialMedia: Object.fromEntries(SOCIAL_PLATFORMS.map(({ key }) => [key, text(social[key])])),
    contact: { email: text(raw.contact?.email || raw.email), phone: text(raw.contact?.phone || raw.phone) },
    joinLink: text(raw.joinLink),
    updatedAt: text(raw.updatedAt),
  };
};

// A blank club for the "Add club" form.
export const emptyClub = () => ({ ...normalizeClub({ category: "Technical" }), id: "" });

/**
 * What gets stored: the normalized club with empty people, blank rows and the
 * editor's temporary ids removed, plus the time of the save.
 */
export const prepareClubForSave = (form) => {
  const club = normalizeClub(form);
  const keepPerson = (p) => (p.name ? p : null);
  const team = { facultyCoordinator: keepPerson(club.team.facultyCoordinator) };
  OFFICE_BEARERS.forEach(({ key }) => {
    team[key] = keepPerson(club.team[key]);
  });
  team.members = club.team.members;
  return { ...club, team, updatedAt: new Date().toISOString() };
};

// Messages for the fields a club cannot be saved without.
export const validateClub = (club) => {
  const errors = {};
  if (!text(club.name)) errors.name = "Club name is required";
  if (!text(club.description)) errors.description = "Add a short description of the club";
  const badEvent = (club.events || []).findIndex((e) => !text(e.title) && (text(e.date) || text(e.description) || text(e.venue)));
  if (badEvent >= 0) errors.events = `Event ${badEvent + 1} needs a title`;
  const badReport = (club.reports || []).findIndex((r) => !text(r.title) && (text(r.year) || text(r.summary) || text(r.link)));
  if (badReport >= 0) errors.reports = `Report ${badReport + 1} needs a title`;
  return errors;
};

// Whether the club page has anything to show under Membership & Guidelines.
export const hasGuidelines = (club) =>
  ["eligibility", "codeOfConduct", "responsibilities"].some((key) => club.policies[key].length > 0) ||
  !!club.policies.meetingFrequency ||
  !!club.policies.meetingVenue;

/* ── Events ── */

// Events entered from the dashboard use YYYY-MM-DD; older ones may hold free text like "Annual Fest".
export const parseEventDate = (value) => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(text(value));
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
};

const startOfToday = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
};

export const isUpcoming = (event) => {
  const date = parseEventDate(event.date);
  return !!date && date >= startOfToday();
};

// Upcoming first (soonest first), then undated, then past (latest first).
export const sortEvents = (events = []) => {
  const rank = (e) => (isUpcoming(e) ? 0 : parseEventDate(e.date) ? 2 : 1);
  return [...events].sort((a, b) => {
    const diff = rank(a) - rank(b);
    if (diff) return diff;
    const da = parseEventDate(a.date)?.getTime() || 0;
    const db = parseEventDate(b.date)?.getTime() || 0;
    return rank(a) === 0 ? da - db : db - da;
  });
};

export const formatEventDate = (value, options = { day: "numeric", month: "long", year: "numeric" }) => {
  const date = parseEventDate(value);
  return date ? date.toLocaleDateString("en-IN", options) : text(value);
};

/* ── Dashboard helpers ── */

export const clubTeamCount = (club) => {
  const c = normalizeClub(club);
  return [c.team.facultyCoordinator, ...OFFICE_BEARERS.map(({ key }) => c.team[key]), ...c.team.members].filter((p) => p?.name).length;
};

// What a visitor would miss on the public page, for the dashboard's checklist.
export const clubChecklist = (club) => {
  const c = normalizeClub(club);
  return [
    { label: "Logo", done: !!c.logo },
    { label: "Banner image", done: !!c.banner },
    { label: "Description", done: !!c.description },
    { label: "Objectives", done: c.objectives.length > 0 },
    { label: "Faculty advisor", done: !!c.team.facultyCoordinator.name },
    { label: "Student team", done: OFFICE_BEARERS.some(({ key }) => c.team[key].name) || c.team.members.length > 0 },
    { label: "Events", done: c.events.length > 0 },
    { label: "Photos", done: c.gallery.length > 0 },
    { label: "Contact or join link", done: !!(c.contact.email || c.joinLink) },
  ];
};
