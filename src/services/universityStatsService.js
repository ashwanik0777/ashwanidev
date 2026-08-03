import apiClient from "./apiClient";

/*
 * University-wide headline statistics — one source of truth for the whole site.
 *
 * Campus acreage, student/faculty counts, programme counts, placement rate and
 * the number of schools used to be hardcoded separately in the homepage Glance
 * section, the About page, the Admissions page and the Campus Life page. They
 * had drifted apart (8200+ students in one place, 6500+ in another; 90% vs 95%
 * placement). Every one of those places now reads from here.
 *
 * FALLBACKS are the values that were previously hardcoded. They are used only
 * before the first fetch resolves, or if the API is unreachable, so the site
 * never renders a blank figure.
 */

export const STAT_FALLBACKS = Object.freeze({
  acres_campus: "511",
  academic_schools: "8",
  programs: "160+",
  students: "8200+",
  faculty_members: "350+",
  placement_rate: "90%",
  available_seats: "2500+",
  hostels: "18",
  library_books: "2.5L+",
  stadium_capacity: "3,000+",
  countries_represented: "15+",
  research_publications: "1200+",
});

const CACHE_KEY = "gbu_university_stats_v1";
const REFRESH_MIN_INTERVAL_MS = 30000;

const readCache = () => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};

const writeCache = (values) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(values));
  } catch {
    // A cache write failure is not fatal; the live values are already in memory.
  }
};

// Fallbacks first, then anything cached from a previous visit.
let statValues = { ...STAT_FALLBACKS, ...(readCache() || {}) };
let inFlight = null;
let lastFetchedAt = 0;

/** Current values, synchronously. Always complete — missing keys fall back. */
export const getUniversityStats = () => statValues;

/** One value by key, with its previously hardcoded default as the fallback. */
export const getStat = (key, fallback) =>
  statValues[key] ?? fallback ?? STAT_FALLBACKS[key] ?? "";

/** Fetches the latest values; concurrent callers share one request. */
export const refreshUniversityStats = async ({ force = false } = {}) => {
  if (inFlight) return inFlight;
  if (!force && Date.now() - lastFetchedAt < REFRESH_MIN_INTERVAL_MS) {
    return statValues;
  }

  inFlight = (async () => {
    try {
      const response = await apiClient.get("/university-stats");
      const values = response?.data?.data?.values;
      if (values && typeof values === "object") {
        // Keep fallbacks for any key the server does not know about yet.
        statValues = { ...STAT_FALLBACKS, ...values };
        writeCache(statValues);
        lastFetchedAt = Date.now();
      }
      return statValues;
    } catch {
      // Offline or API down — keep serving the cached/fallback values.
      return statValues;
    } finally {
      inFlight = null;
    }
  })();

  return inFlight;
};

/* ─── Admin ─── */

export const adminListUniversityStats = async () => {
  const response = await apiClient.get("/admin/university-stats");
  return response?.data?.data || [];
};

export const adminSaveUniversityStats = async (stats) => {
  const response = await apiClient.put("/admin/university-stats", { stats });
  // Refresh the shared values so the admin's own session shows the new numbers.
  await refreshUniversityStats({ force: true });
  return response?.data?.data || [];
};
