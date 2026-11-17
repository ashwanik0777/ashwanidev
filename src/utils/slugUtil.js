export const createSlug = (title) => {
  if (!title) return "";
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
};

/**
 * Link to a news item. A school's item carries its school, because the detail
 * page would not find a school-only item in the university list.
 */
export const newsDetailPath = (news) => {
  const path = `/announcements/news/${createSlug(news?.title)}`;
  const school = String(news?.schoolCode || "").trim().toUpperCase();
  return school && school !== "GBU" ? `${path}?school=${encodeURIComponent(school)}` : path;
};

/** Link to an event, carrying its school for the same reason as news. */
export const eventDetailPath = (event) => {
  const path = `/announcements/event/${event?.title ? createSlug(event.title) : event?.id}`;
  const school = String(event?.schoolCode || "").trim().toUpperCase();
  return school && school !== "GBU" ? `${path}?school=${encodeURIComponent(school)}` : path;
};
