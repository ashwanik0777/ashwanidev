import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * useHashScroll — Scrolls to a DOM element matching the URL hash
 * and applies a non-layout-shifting highlight effect.
 *
 * When the URL changes to e.g. /campus-life/NSS#nss-about,
 * this hook waits for the page to render, finds #nss-about,
 * scrolls to it smoothly, and highlights it with a box-shadow pulse.
 */
const useHashScroll = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const elementId = hash.replace("#", "");
    if (!elementId) return;

    // Wait for the page to fully render (lazy-loaded components)
    const attemptScroll = (retries = 0) => {
      const element = document.getElementById(elementId);

      if (element) {
        // Small delay to let layout stabilize after navigation
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Apply non-layout-shifting highlight
          element.classList.add("search-highlight-glow");
          setTimeout(() => {
            element.classList.remove("search-highlight-glow");
          }, 3000);
        }, 100);
      } else if (retries < 10) {
        // Retry — page might still be loading (lazy components)
        setTimeout(() => attemptScroll(retries + 1), 200);
      }
    };

    // Start attempting after a short delay for route transition
    setTimeout(() => attemptScroll(), 300);
  }, [hash, pathname]);
};

export default useHashScroll;
