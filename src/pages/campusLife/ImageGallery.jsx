import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const ImageGallery = ({ images = [], autoPlayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    if (images.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [images.length, autoPlayInterval, isHovered]);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  return (
    <SearchableWrapper>
      <div 
        className="w-full max-w-5xl mx-auto flex flex-col gap-4 sm:gap-6"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Display Container */}
        <div 
          className="relative w-full h-[240px] sm:h-[380px] md:h-[480px] rounded-2xl overflow-hidden bg-slate-950 shadow-xl border border-slate-100 group select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Gallery photo ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20 pointer-events-none" />

          {/* Counter Badge */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-semibold text-white z-10">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Touch indicator hint for mobile */}
          <div className="absolute bottom-3 left-4 text-[10px] sm:text-xs font-medium text-white/80 sm:hidden z-10">
            Swipe left / right to browse
          </div>

          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-sm transition-all transform hover:scale-110 shadow-lg cursor-pointer z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-sm transition-all transform hover:scale-110 shadow-lg cursor-pointer z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Thumbnail Row Container */}
        <div className="w-full overflow-x-auto pb-2 scrollbar-none sm:scrollbar-thin sm:scrollbar-thumb-slate-300">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max px-1">
            {images.map((imgSrc, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 shrink-0 cursor-pointer ${
                  idx === currentIndex
                    ? "ring-2 sm:ring-4 ring-amber-500 scale-105 opacity-100 shadow-md"
                    : "opacity-60 hover:opacity-100 hover:scale-102"
                }`}
              >
                <img
                  src={imgSrc}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-16 h-12 sm:w-24 sm:h-18 object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default ImageGallery;
