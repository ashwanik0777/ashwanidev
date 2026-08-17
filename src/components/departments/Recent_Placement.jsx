 import { useState, useEffect } from "react";
import { Badge } from "../ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RecentPlacements = ({ data }) => {
  // 🔹 Dynamic Data Object
  const [currentSlide, setCurrentSlide] = useState(0);
const fallbackImage = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % Math.ceil(data.students.length / 2)
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [data.students.length]);

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % Math.ceil(data.students.length / 2)
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(data.students.length / 2)) %
        Math.ceil(data.students.length / 2)
    );
  };

  const getCurrentPlacements = () => {
    const startIndex = currentSlide * 2;
    return data.students.slice(startIndex, startIndex + 2);
  };

  const totalSlides = Math.ceil(data.students.length / 2);

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
            Recent Placements
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>

        {/* Carousel Container — buttons outside */}
        <div className="relative flex items-center gap-3 sm:gap-5">
          {/* Prev Button — Outside */}
          {totalSlides > 1 && (
            <button
              onClick={prevSlide}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-blue-800 hover:bg-blue-50 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Previous placements"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Card */}
          <div className="flex-1 rounded-2xl shadow-lg border border-gray-100 bg-white overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                {getCurrentPlacements().map((placement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-5 p-5 sm:p-6 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl hover:shadow-lg transition-all duration-300 group"
                  >
                    <img
                      src={placement.photo}
                      alt={placement.name}
                      onError={(e) => (e.target.src = fallbackImage)}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-yellow-300/30 group-hover:ring-yellow-400/60 transition-all duration-300"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-lg sm:text-xl text-blue-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                        {placement.name}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base mb-1 truncate">
                        {placement.department}
                      </p>
                      <p className="font-bold text-green-600 text-lg sm:text-xl mb-1">
                        {placement.package}
                      </p>
                      <Badge
                        variant="outline"
                        className="border-blue-600 text-blue-600"
                      >
                        {placement.company}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Button — Outside */}
          {totalSlides > 1 && (
            <button
              onClick={nextSlide}
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg hover:shadow-xl border border-gray-200 flex items-center justify-center text-blue-800 hover:bg-blue-50 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Next placements"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>

        {/* Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "w-8 bg-blue-600 shadow-md"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentPlacements;
