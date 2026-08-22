import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const fallbackLogo = "https://ui-avatars.com/api/?name=Company&background=e2e8f0&color=475569&size=120&bold=true";

const RecruitersShowcase = ({ recruitersData = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const trackRef = useRef(null);

  const itemsPerView = 4;
  const totalItems = recruitersData.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const goTo = useCallback((idx) => {
    if (isAnimating) return;
    const clamped = Math.max(0, Math.min(idx, maxIndex));
    setIsAnimating(true);
    setCurrentIndex(clamped);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, maxIndex]);

  const next = useCallback(() => {
    if (currentIndex >= maxIndex) {
      goTo(0);
    } else {
      goTo(currentIndex + itemsPerView);
    }
  }, [currentIndex, maxIndex, goTo]);

  const prev = useCallback(() => {
    if (currentIndex <= 0) {
      goTo(maxIndex);
    } else {
      goTo(currentIndex - itemsPerView);
    }
  }, [currentIndex, maxIndex, goTo]);

  // Auto-play
  useEffect(() => {
    if (totalItems <= itemsPerView) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, totalItems]);

  if (!recruitersData.length) return null;

  const totalDots = Math.ceil(totalItems / itemsPerView);
  const activeDot = Math.min(Math.floor(currentIndex / itemsPerView), totalDots - 1);

  return (
    <section className="py-10 bg-gray-100">
      <div className="min-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">Our Recruiters</h2>
          <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center gap-3 sm:gap-5">
          {/* Prev Button — Outside */}
          {totalItems > itemsPerView && (
            <button
              onClick={prev}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-blue-800 hover:bg-blue-50 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous recruiters"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Track */}
          <div className="flex-1 overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100">
            <div className="p-5 sm:p-8">
              <div
                ref={trackRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${totalItems > 0 ? (currentIndex / totalItems) * 100 : 0}%)`,
                  width: `${(totalItems / itemsPerView) * 100}%`,
                }}
              >
                {recruitersData.map((company, index) => (
                  <div
                    key={index}
                    className="px-2 sm:px-3"
                    style={{ width: `${100 / totalItems}%` }}
                  >
                    <div className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all duration-300 group h-full">
                      <div className="w-full h-14 sm:h-20 flex items-center justify-center mb-3 sm:mb-4">
                        <img
                          src={company.logo}
                          alt={company.name}
                          onError={(e) => (e.target.src = fallbackLogo)}
                          className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors duration-300 text-center line-clamp-2">
                        {company.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Button — Outside */}
          {totalItems > itemsPerView && (
            <button
              onClick={next}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-blue-800 hover:bg-blue-50 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next recruiters"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>

        {/* Dots */}
        {totalDots > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i * itemsPerView)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeDot
                    ? "w-8 bg-blue-600 shadow-md"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecruitersShowcase;
