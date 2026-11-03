import apiClient from "./apiClient";

const VISITOR_TRACKED_KEY = "gbu_visitor_tracked";

/**
 * Track the current visitor and return the total unique count.
 * Tracks only once per browser session (uses sessionStorage).
 */
export const trackVisitor = async () => {
  try {
    // Check if already tracked in this session
    const alreadyTracked = sessionStorage.getItem(VISITOR_TRACKED_KEY);

    if (alreadyTracked) {
      // Just get the count without re-tracking
      return await getVisitorCount();
    }

    const response = await apiClient.post("/visitors/track");
    const count = response?.data?.data?.count ?? 0;

    // Mark as tracked for this session
    sessionStorage.setItem(VISITOR_TRACKED_KEY, "1");

    return count;
  } catch (error) {
    // Silently fail — visitor count is non-critical
    console.warn("Visitor tracking failed:", error.message);
    return 0;
  }
};

/**
 * Get the current unique visitor count without tracking.
 */
export const getVisitorCount = async () => {
  try {
    const response = await apiClient.get("/visitors/count");
    return response?.data?.data?.count ?? 0;
  } catch (error) {
    console.warn("Visitor count fetch failed:", error.message);
    return 0;
  }
};
