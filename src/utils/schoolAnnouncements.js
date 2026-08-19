import {
  EMPTY_ANNOUNCEMENTS,
  fetchAnnouncementsSnapshot,
} from "../services/announcementsService";

const ANNOUNCEMENTS_CACHE_KEY = "gbu_announcements_api_cache_v2";
const ANNOUNCEMENTS_REFRESH_MIN_INTERVAL_MS = 5000;

const toSafeAnnouncements = (value) => {
  if (!value || typeof value !== "object") {
    return { ...EMPTY_ANNOUNCEMENTS };
  }

  return {
    schoolName: value.schoolName || "GBU",
    notices: Array.isArray(value.notices) ? value.notices : [],
    events: Array.isArray(value.events) ? value.events : [],
    news: Array.isArray(value.news) ? value.news : [],
    newsletters: Array.isArray(value.newsletters) ? value.newsletters : [],
    mediaGallery: Array.isArray(value.mediaGallery) ? value.mediaGallery : [],
    eventGallery: Array.isArray(value.eventGallery) ? value.eventGallery : [],
  };
};

const readFromCache = () => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(ANNOUNCEMENTS_CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const result = {};
    for (const key of Object.keys(parsed)) {
      result[key] = toSafeAnnouncements(parsed[key]);
    }
    return result;
  } catch {
    return {};
  }
};

const saveToCache = (payloadMap) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ANNOUNCEMENTS_CACHE_KEY, JSON.stringify(payloadMap));
  } catch {
    // Ignore localStorage write issues and keep runtime data.
  }
};

let announcementsCacheMap = readFromCache();
let announcementsRefreshPromises = {};
let lastAnnouncementsRefreshAtMap = {};

export const getSchoolAnnouncements = (schoolCode) => {
  const key = schoolCode || "GLOBAL";
  const data = announcementsCacheMap[key] || { ...EMPTY_ANNOUNCEMENTS };

  if (schoolCode) {
    // Exclude 'college' level items from school pages
    return {
      ...data,
      notices: data.notices.filter(item => (item.level || "").toLowerCase() !== "college"),
      news: data.news.filter(item => (item.level || "").toLowerCase() !== "college"),
      events: data.events.filter(item => (item.level || "").toLowerCase() !== "college"),
      newsletters: data.newsletters.filter(item => (item.level || "").toLowerCase() !== "college"),
      mediaGallery: data.mediaGallery.filter(item => (item.level || "").toLowerCase() !== "college"),
      eventGallery: data.eventGallery.filter(item => (item.level || "").toLowerCase() !== "college"),
    };
  }

  return data;
};

export const refreshSchoolAnnouncements = async (schoolCode) => {
  const key = schoolCode || "GLOBAL";
  const now = Date.now();

  if (announcementsRefreshPromises[key]) {
    return announcementsRefreshPromises[key];
  }

  if (now - (lastAnnouncementsRefreshAtMap[key] || 0) < ANNOUNCEMENTS_REFRESH_MIN_INTERVAL_MS) {
    return announcementsCacheMap[key] || { ...EMPTY_ANNOUNCEMENTS };
  }

  announcementsRefreshPromises[key] = fetchAnnouncementsSnapshot(schoolCode)
    .then((latest) => {
      announcementsCacheMap[key] = toSafeAnnouncements(latest);
      saveToCache(announcementsCacheMap);
      lastAnnouncementsRefreshAtMap[key] = Date.now();
      return announcementsCacheMap[key];
    })
    .finally(() => {
      announcementsRefreshPromises[key] = null;
    });

  return announcementsRefreshPromises[key];
};

export const syncAnnouncementsFromCache = () => {
  announcementsCacheMap = readFromCache();
};

/**
 * Clears the refresh throttle so the very next refresh hits the API.
 *
 * Called after a dashboard writes an announcement — without this the 5s
 * throttle could serve a stale snapshot and the new item would look missing.
 */
export const invalidateAnnouncementsCache = () => {
  lastAnnouncementsRefreshAtMap = {};
};
