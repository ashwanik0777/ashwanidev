import React, { useState, useEffect } from "react";
import { Medal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "../../StatsCard";
import useResponsiveSlider from "../useResponsiveSlider";
import SectionHeading, { SECTION_PADDING, SECTION_GUTTER, SECTION_CONTAINER } from "../SectionHeading";

// ✅ Reusable Card
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg border ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`font-bold text-foreground ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-muted-foreground ${className}`}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

// [min viewport width, cards per view]: mobile, tablet, laptop, desktop, full HD / projector, 4K
const ACHIEVER_BREAKPOINTS = [
  [0, 1],
  [560, 2],
  [1024, 3],
  [1280, 4],
  [1920, 5],
  [2560, 6],
];
const ACHIEVER_GAP = 16;

const AchieversSlider = ({ topAchievers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { viewportRef, cardsPerView, cardWidth, step } = useResponsiveSlider(
    ACHIEVER_BREAKPOINTS,
    ACHIEVER_GAP
  );

  const maxIndex = Math.max(0, topAchievers.length - cardsPerView);
  const shouldScroll = topAchievers.length > cardsPerView;

  // Keep the index valid when the screen size (and so cards per view) changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (isPaused || topAchievers.length <= cardsPerView) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, topAchievers.length, cardsPerView]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  if (!topAchievers || topAchievers.length === 0) return null;

  return (
    <div
      className={`relative ${shouldScroll ? "px-10 sm:px-12 min-[2560px]:px-20" : ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div ref={viewportRef} className="overflow-hidden py-3">
        <motion.div
          className={`flex${!shouldScroll ? " justify-center" : ""}`}
          style={{ gap: `${ACHIEVER_GAP}px` }}
          animate={{ x: shouldScroll ? -currentIndex * step : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          {cardWidth > 0 && topAchievers.map((student, index) => (
            <div
              key={index}
              className="shrink-0"
              style={{ width: `${cardWidth}px` }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100 shadow-sm rounded-xl sm:rounded-2xl flex flex-col overflow-hidden">
                <CardHeader className="text-center px-4 pt-4 pb-2 min-[2560px]:px-7 min-[2560px]:pt-7">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 min-[2560px]:w-36 min-[2560px]:h-36 rounded-full overflow-hidden mx-auto mb-3 shadow-md bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center font-bold text-2xl min-[2560px]:text-4xl border-2 border-white">
                    {student.image ? (
                      <img
                        src={student.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-top z-10"
                        style={{ objectPosition: student.imagePosition || "center top" }}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : null}
                    <span className="select-none tracking-wider">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <CardTitle className="text-base sm:text-lg min-[2560px]:text-3xl leading-snug">{student.name}</CardTitle>
                  {student.rollNo && (
                    <span className="text-[11px] sm:text-xs min-[2560px]:text-lg font-medium text-gray-500 block mt-0.5">
                      Roll No: {student.rollNo}
                    </span>
                  )}
                  <CardDescription className="text-xs sm:text-sm min-[2560px]:text-xl text-blue-600 font-semibold mt-0.5">
                    {student.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-3 pt-1 sm:px-4 sm:pb-4 min-[2560px]:px-7 min-[2560px]:pb-7 flex-grow flex flex-col">
                  <div className="flex-grow bg-blue-50/70 p-3 min-[2560px]:p-5 rounded-lg sm:rounded-xl border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Medal className="h-4 w-4 sm:h-5 sm:w-5 min-[2560px]:h-7 min-[2560px]:w-7 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm min-[2560px]:text-xl text-gray-800 leading-relaxed">
                        {student.achievement}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation arrows */}
      {shouldScroll && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 min-[2560px]:w-14 min-[2560px]:h-14 bg-white hover:bg-blue-50 rounded-full shadow-md border border-blue-100 flex items-center justify-center z-20 transition-all active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 min-[2560px]:w-8 min-[2560px]:h-8 text-blue-700" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 min-[2560px]:w-14 min-[2560px]:h-14 bg-white hover:bg-blue-50 rounded-full shadow-md border border-blue-100 flex items-center justify-center z-20 transition-all active:scale-95"
          >
            <ChevronRight className="w-5 h-5 min-[2560px]:w-8 min-[2560px]:h-8 text-blue-700" />
          </button>

          {/* Dots */}
          <div className="flex justify-center items-center flex-wrap gap-1.5 mt-3">

            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 min-[2560px]:h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-6 min-[2560px]:w-10 bg-blue-600"
                    : "w-2 min-[2560px]:w-3 bg-blue-200 hover:bg-blue-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const StudentAchievers = ({
  topAchievers = [],
  achievements = [],
  achieversHeading = "Student Achievers",
  achieversSubheading = "Celebrating our outstanding students who excel in academics, research, and innovation.",
  achievementsHeading = "Our Achievements",
  achievementsSubheading = "Recognition and excellence in education",
}) => {
  if (
    (!topAchievers || topAchievers.length === 0) &&
    (!achievements || achievements.length === 0)
  ) {
    return null;
  }

  return (
    <>
      {/* Top Achievers */}
      {topAchievers && topAchievers.length > 0 && (
        <section className={`${SECTION_PADDING} bg-white overflow-hidden`}>
          <div className={SECTION_GUTTER}>
            <div className={SECTION_CONTAINER}>
              <SectionHeading>{achieversHeading}</SectionHeading>

              <AchieversSlider topAchievers={topAchievers} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default StudentAchievers;
