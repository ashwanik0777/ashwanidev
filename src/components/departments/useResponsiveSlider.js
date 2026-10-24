import { useEffect, useState } from "react";

/**
 * Measures the slider viewport and returns how many cards fit per view,
 * the pixel width of each card, and how far one slide step moves.
 *
 * `breakpoints` is a list of [minViewportWidth, cardsPerView], checked from
 * the largest down, so it covers mobile → tablet → laptop → desktop → 4K/projector.
 */
export default function useResponsiveSlider(breakpoints, gap) {
  // Callback ref, so measuring starts whenever the viewport mounts (e.g. after data loads)
  const [el, viewportRef] = useState(null);
  const [width, setWidth] = useState(0);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280
  );

  useEffect(() => {
    if (!el) return undefined;

    const update = () => {
      setWidth(el.clientWidth);
      setScreenWidth(window.innerWidth);
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [el]);

  const sorted = [...breakpoints].sort((a, b) => b[0] - a[0]);
  const match = sorted.find(([min]) => screenWidth >= min);
  const cardsPerView = match ? match[1] : 1;

  const cardWidth = width > 0 ? (width - gap * (cardsPerView - 1)) / cardsPerView : 0;

  return { viewportRef, cardsPerView, cardWidth, step: cardWidth + gap };
}
