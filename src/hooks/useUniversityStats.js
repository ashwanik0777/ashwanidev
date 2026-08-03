import { useEffect, useState } from "react";
import {
  STAT_FALLBACKS,
  getUniversityStats,
  refreshUniversityStats,
} from "../services/universityStatsService";

/*
 * Read the university-wide statistics from the single source of truth.
 *
 * Returns a { key: value } map that is complete from the very first render —
 * previously hardcoded values act as fallbacks — then re-renders once the live
 * figures arrive. Components keep their own layout and icons; only the numbers
 * and labels come from here.
 *
 *   const stats = useUniversityStats();
 *   stats.students        // "8200+"
 *   stats.placement_rate  // "90%"
 */
export const useUniversityStats = () => {
  const [stats, setStats] = useState(getUniversityStats);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      const next = await refreshUniversityStats();
      if (isMounted) setStats({ ...next });
    };

    load();
    // Pick up an administrator's edit made in another tab.
    window.addEventListener("focus", load);
    window.addEventListener("university-stats-updated", load);

    return () => {
      isMounted = false;
      window.removeEventListener("focus", load);
      window.removeEventListener("university-stats-updated", load);
    };
  }, []);

  return stats;
};

export { STAT_FALLBACKS };
export default useUniversityStats;
