import React, { useState, useEffect } from "react";
import { Medal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import StatsCard from "../../StatsCard";

// ✅ Reusable Card
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-lg border ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-bold text-foreground ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-muted-foreground text-sm ${className}`}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const AchieversSlider = ({ topAchievers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cardsPerView, setCardsPerView] = useState(3);

  const getCardsPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
    }
    return 1;
  };

  useEffect(() => {
    const handleResize = () => setCardsPerView(getCardsPerView());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, topAchievers.length - cardsPerView);

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
      className="relative px-2 sm:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="overflow-hidden py-4">
        <motion.div
          className="flex gap-6"
          animate={{ x: `-${currentIndex * (100 / cardsPerView)}%` }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
        >
          {topAchievers.map((student, index) => (
            <div
              key={index}
              className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white border border-gray-100 shadow-lg rounded-2xl flex flex-col justify-between overflow-hidden">
                <CardHeader className="text-center pb-2">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mx-auto mb-4 shadow-lg bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-700 text-white flex items-center justify-center font-bold text-3xl border-2 border-white">
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
                  <CardTitle>{student.name}</CardTitle>
                  {student.rollNo && (
                    <span className="text-xs font-medium text-gray-500 block mt-0.5">
                      Roll No: {student.rollNo}
                    </span>
                  )}
                  <CardDescription className="text-blue-600 font-semibold mt-1">
                    {student.year}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                  <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100">
                    <div className="flex items-start space-x-2.5">
                      <Medal className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-800 leading-relaxed">
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
      {topAchievers.length > cardsPerView && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg border border-gray-100 flex items-center justify-center z-20 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-blue-700" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg border border-gray-100 flex items-center justify-center z-20 transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 text-blue-700" />
          </button>

          {/* Dots */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 bg-blue-600 shadow-md"
                    : "w-2.5 bg-blue-200 hover:bg-blue-300"
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
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
                  {achieversHeading}
                </h2>
                <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
              </div>

              <AchieversSlider topAchievers={topAchievers} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default StudentAchievers;
