import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSchoolMeta } from "../../utils/schoolMeta";


const Landing = ({ slides = [], schoolCode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // The banner always shows the school's full name; other sections use the short code
  const schoolFullName = schoolCode ? getSchoolMeta(schoolCode)?.name : "";

  useEffect(() => {
    if (!slides.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (!slides.length) {
    return null;
  }

  return (
    <section
      id="home"
      className="relative h-[30vh] sm:h-[36vh] lg:h-[40vh] min-h-[200px] overflow-hidden shadow-lg"
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent " />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-5xl min-[2560px]:max-w-[1800px] px-12 sm:px-16 min-[2560px]:px-28">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl min-[2560px]:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {schoolFullName || slide.title}
              </h1>
              {/* <p className="text-lg md:text-xl mb-6 text-blue-100 font-light">
                {slide.subtitle}
              </p> */}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 min-[2560px]:w-16 min-[2560px]:h-16 transition-all duration-300 flex items-center justify-center"
      >
        <ChevronLeft className="w-5 h-5 min-[2560px]:w-9 min-[2560px]:h-9" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 backdrop-blur-sm rounded-full w-8 h-8 sm:w-10 sm:h-10 min-[2560px]:w-16 min-[2560px]:h-16 transition-all duration-300 flex items-center justify-center"
      >
        <ChevronRight className="w-5 h-5 min-[2560px]:w-9 min-[2560px]:h-9" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-3 sm:bottom-4 min-[2560px]:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 min-[2560px]:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 min-[2560px]:w-4 min-[2560px]:h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white shadow-md scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Landing;
