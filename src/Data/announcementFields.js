/*
 * Single definition of every announcement form field, shared by the admin and
 * school dashboards.
 *
 * These mirror exactly what the public Announcements pages render
 * (pages/Announcements/*) and what the backend stores, so a field can no longer
 * exist on the website with nowhere to enter it — or be captured in a dashboard
 * and silently dropped.
 */

export const NOTICE_TYPES = [
  "General",
  "Academic",
  "Examination",
  "Admission",
  "Placement",
  "Tenders",
  "Important",
  "Sports",
  "NSS/NCC",
  "Research",
  "Student Corner",
];

export const NEWS_CATEGORIES = [
  "Academic",
  "Research",
  "Technology",
  "Sports",
  "Environment",
  "Awards & Recognition",
  "Cultural",
  "Other",
];

export const EVENT_TYPES = [
  "Seminar",
  "Workshop",
  "Conference",
  "Competition",
  "Sports",
  "Cultural",
  "Guest Lecture",
  "Orientation",
  "Convocation",
  "Other",
];

export const GALLERY_CATEGORIES = [
  "Events",
  "Campus",
  "Sports",
  "Cultural",
  "Convocation",
  "Workshops",
  "Other",
];

export const PRIORITIES = ["low", "medium", "high"];

/**
 * Level is handled separately from the per-kind fields because it drives the
 * approval workflow rather than the announcement's own content.
 */
export const LEVEL_FIELD = {
  key: "level",
  label: "Announcement Level",
  type: "select",
  options: [
    { value: "school", label: "School only — visible on your school's pages" },
    { value: "college", label: "College / University-wide — needs admin approval" },
  ],
  required: true,

};

export const ANNOUNCEMENT_FIELDS = {
  notices: [
    { key: "title", label: "Notice Title", required: true },
    { key: "date", label: "Published Date", type: "date", required: true },
    { key: "type", label: "Type", type: "select", options: NOTICE_TYPES, required: true },
    { key: "priority", label: "Priority", type: "select", options: PRIORITIES, required: true },
    { key: "pdfUrl", label: "PDF / Attachment URL", placeholder: "https://…/notice.pdf" },
    { key: "isNew", label: "Show 'New' badge", type: "boolean" },
    { key: "views", label: "Views Count", type: "number" },
    { key: "content", label: "Notice Content", type: "textarea", required: true },
  ],

  news: [
    { key: "title", label: "News Title", required: true },
    { key: "date", label: "Published Date", type: "date", required: true },
    { key: "category", label: "Category", type: "select", options: NEWS_CATEGORIES, required: true },
    { key: "priority", label: "Priority", type: "select", options: PRIORITIES, required: true },
    { key: "author", label: "Author" },
    { key: "department", label: "Department" },
    { key: "tags", label: "Tags (comma separated)", placeholder: "research, ai, students" },
    { key: "image", label: "Cover Image URL", placeholder: "https://…/news.jpg" },
    { key: "imageLink", label: "Image Click Link" },
    { key: "pdfUrl", label: "PDF URL" },
    { key: "link", label: "External Link" },
    { key: "featured", label: "Featured News", type: "boolean" },
    { key: "status", label: "Status", type: "select", options: ["published", "draft"], required: true },
    { key: "views", label: "Views Count", type: "number" },
    { key: "likes", label: "Likes Count", type: "number" },
    { key: "excerpt", label: "Excerpt (short summary)", type: "textarea", required: true },
    { key: "content", label: "Full Content", type: "textarea", required: true },
  ],

  events: [
    { key: "title", label: "Event Title", required: true },
    { key: "startsAt", label: "Start Date", type: "date", required: true },
    { key: "endsAt", label: "End Date", type: "date" },
    { key: "time", label: "Time Description", placeholder: "10:00 AM - 04:00 PM" },
    { key: "venue", label: "Venue", placeholder: "Seminar Hall", required: true },
    { key: "location", label: "Location / Block", placeholder: "ICT Block" },
    { key: "type", label: "Type", type: "select", options: EVENT_TYPES, required: true },
    { key: "mode", label: "Mode", type: "select", options: ["Offline", "Online", "Hybrid"], required: true },
    { key: "status", label: "Status", type: "select", options: ["upcoming", "ongoing", "completed"], required: true },
    { key: "organizer", label: "Organizer", required: true },
    { key: "attendees", label: "Expected Attendees", type: "number" },
    { key: "price", label: "Price / Registration Fee", placeholder: "Free" },
    { key: "year", label: "Year", placeholder: "2026" },
    { key: "tags", label: "Tags (comma separated)" },
    { key: "coverImageUrl", label: "Cover Image URL" },
    { key: "imageLink", label: "Image Click Link" },
    { key: "images", label: "Gallery Images (comma separated URLs)", type: "textarea" },
    { key: "registrationUrl", label: "Registration Link" },
    { key: "brochureUrl", label: "Brochure PDF URL", placeholder: "https://.../brochure.pdf" },
    { key: "flyerUrl", label: "Flyer Image URL", placeholder: "https://.../flyer.jpg" },
    { key: "description", label: "Description", type: "textarea", required: true },
  ],

  newsletters: [
    { key: "title", label: "Newsletter Title", required: true },
    { key: "issueNumber", label: "Issue Number", placeholder: "Vol 2, Issue 3" },
    { key: "date", label: "Published Date", type: "date", required: true },
    { key: "category", label: "Category", type: "select", options: ["School Update", "University Update", "Research", "Alumni", "Other"], required: true },
    { key: "coverImage", label: "Cover Image URL" },
    { key: "pdfLink", label: "PDF Link", required: true },
    { key: "views", label: "Views Count", type: "number" },
    { key: "excerpt", label: "Excerpt", type: "textarea", required: true },
  ],

  gallery: [
    { key: "title", label: "Album Title", required: true },
    { key: "category", label: "Category", type: "select", options: GALLERY_CATEGORIES, required: true },
    { key: "year", label: "Year", placeholder: "2026", required: true },
    { key: "date", label: "Album Date", type: "date", required: true },
    { key: "images", label: "Image URLs (one per line, or comma separated)", type: "textarea", required: true },
  ],
};

/** A blank item for each kind, matching the field definitions above. */
export const buildEmptyAnnouncement = (kind, level = "school") => {
  const today = new Date().toISOString().slice(0, 10);
  const base = { level };

  for (const field of ANNOUNCEMENT_FIELDS[kind] || []) {
    if (field.type === "boolean") base[field.key] = false;
    else if (field.type === "number") base[field.key] = 0;
    else if (field.type === "select") base[field.key] = optionValue(field.options?.[0]);
    else if (field.type === "date") base[field.key] = today;
    else base[field.key] = "";
  }

  if (kind === "events") base.year = String(new Date().getFullYear());
  if (kind === "gallery") base.year = String(new Date().getFullYear());
  if (kind === "notices") base.isNew = true;
  return base;
};

/** Options may be plain strings or {value,label} pairs. */
export const optionValue = (option) =>
  option && typeof option === "object" ? option.value : option ?? "";

export const optionLabel = (option) =>
  option && typeof option === "object" ? option.label : option ?? "";

/** Columns shown in each kind's list table. */
export const ANNOUNCEMENT_COLUMNS = {
  notices: [
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "type", label: "Type" },
  ],
  news: [
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "author", label: "Author" },
  ],
  events: [
    { key: "title", label: "Title" },
    { key: "startsAt", label: "Date" },
    { key: "venue", label: "Venue" },
  ],
  newsletters: [
    { key: "title", label: "Title" },
    { key: "date", label: "Date" },
    { key: "issueNumber", label: "Issue" },
    { key: "category", label: "Category" },
  ],
  gallery: [
    { key: "title", label: "Album" },
    { key: "date", label: "Date" },
    { key: "category", label: "Category" },
    { key: "year", label: "Year" },
  ],
};
