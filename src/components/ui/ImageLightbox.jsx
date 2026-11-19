import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react";

/**
 * Full-screen photo viewer.
 * images: [{ src, title }], index: the photo shown, onIndexChange(next), onClose().
 * Arrows / ← → keys / swipe move between photos, Esc or a click outside the photo closes,
 * and the page behind does not scroll while it is open.
 */
const ImageLightbox = ({ images, index, onIndexChange, onClose }) => {
  const count = images.length;
  const photo = images[index];
  // Which photo has finished loading (by its link), so a photo from the cache is never hidden.
  const [loadedSrc, setLoadedSrc] = useState(null);
  const loaded = loadedSrc === photo.src;
  const imageRef = useRef(null);
  const closeRef = useRef(null);
  const thumbsRef = useRef(null);
  const touchStart = useRef(null);

  const go = (step) => onIndexChange((index + step + count) % count);

  // Lock the page, focus the viewer, give focus back to the photo that opened it.
  useEffect(() => {
    const opener = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (opener && typeof opener.focus === "function") opener.focus();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight" && count > 1) onIndexChange((index + 1) % count);
      else if (event.key === "ArrowLeft" && count > 1) onIndexChange((index - 1 + count) % count);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, count, onClose, onIndexChange]);

  // A spinner shows until the photo has loaded; its neighbours load in the background.
  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth) setLoadedSrc(image.getAttribute("src"));
    [index + 1, index - 1].forEach((i) => {
      const next = images[(i + count) % count];
      if (next) new Image().src = next.src;
    });
    const thumb = thumbsRef.current?.querySelector(`[data-index="${index}"]`);
    thumb?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index, images, count]);

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event) => {
    if (touchStart.current === null || count < 2) return;
    const dx = event.changedTouches[0].clientX - touchStart.current;
    touchStart.current = null;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  const navButton =
    // Smaller and darker on phones, where they sit over the photo's edge (swiping works there too).
    "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-slate-950/55 text-white backdrop-blur transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:w-12 sm:bg-white/10";

  return createPortal(
    <div
      className="animate-backdrop-in fixed inset-0 z-[10000] flex flex-col bg-slate-950/95"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title ? `Photo: ${photo.title}` : "Photo viewer"}
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex shrink-0 items-center gap-3 px-4 py-3 text-white sm:px-6" onClick={(event) => event.stopPropagation()}>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tabular-nums sm:text-sm">
          {index + 1} / {count}
        </span>
        <p className="min-w-0 flex-1 truncate text-sm font-semibold sm:text-base">{photo.title}</p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Photo; a click on the dark area around it closes */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-20" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {!loaded && <Loader2 className="absolute h-8 w-8 animate-spin text-white/70" />}
        <img
          key={photo.src}
          ref={imageRef}
          src={photo.src}
          alt={photo.title || `Photo ${index + 1}`}
          onLoad={(event) => setLoadedSrc(event.currentTarget.getAttribute("src"))}
          onClick={(event) => event.stopPropagation()}
          className={`max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          draggable="false"
        />
        {count > 1 && (
          <>
            <button type="button" aria-label="Previous photo" className={`${navButton} left-2 sm:left-5`} onClick={(event) => { event.stopPropagation(); go(-1); }}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" aria-label="Next photo" className={`${navButton} right-2 sm:right-5`} onClick={(event) => { event.stopPropagation(); go(1); }}>
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <div className="shrink-0 px-3 pb-4 sm:pb-5" onClick={(event) => event.stopPropagation()}>
          <div ref={thumbsRef} className="no-scrollbar mx-auto flex max-w-4xl gap-2 overflow-x-auto px-1 py-1">
            {images.map((item, i) => (
              <button
                key={`${item.src}-${i}`}
                type="button"
                data-index={i}
                onClick={() => onIndexChange(i)}
                aria-label={`Show photo ${i + 1}${item.title ? `: ${item.title}` : ""}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-12 w-16 shrink-0 overflow-hidden rounded-md transition sm:h-14 sm:w-20 ${
                  i === index ? "opacity-100 ring-2 ring-white" : "opacity-50 hover:opacity-90"
                }`}
              >
                <img src={item.src} alt="" loading="lazy" className="h-full w-full object-cover" draggable="false" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body,
  );
};

export default ImageLightbox;
