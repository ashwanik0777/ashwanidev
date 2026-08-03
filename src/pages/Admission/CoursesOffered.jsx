import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useUniversityStats } from "../../hooks/useUniversityStats";
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Star,
  Award,
  Globe,
  ChevronDown,
  Search,
  X,
  BookMarked,
  Sparkles,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HeroBanner from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";
import { ADMISSIONS_CATEGORIES, ADMISSIONS_SCHOOL_BUTTONS } from "../../Data/schools";

// --- Utility ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Custom UI Components ---
const Card = ({ children, className = "" }) => (
  <div
    className={cn(
      "bg-white rounded-2xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full",
      className
    )}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={cn("px-6 py-5 border-b border-slate-50", className)}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={cn("text-lg font-bold text-slate-800 leading-snug", className)}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={cn("px-6 py-5 flex-1 flex flex-col justify-between space-y-4", className)}>
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-50 text-blue-700 border border-blue-100",
    secondary: "bg-slate-50 text-slate-600 border border-slate-100",
    outline: "border border-slate-200 text-slate-600 bg-white",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// School Categories Data
const schoolCategories = ADMISSIONS_CATEGORIES;

// Icons and colours are configured here; the figures come from the shared
// university-stats source. This page used to show 80+ programmes and a 95%
// placement rate while the homepage said 160+ and 90%.
const educationStatsMeta = [
  { icon: GraduationCap, statKey: "academic_schools", title: "Academic Schools", iconColor: "#2563eb" },
  { icon: BookOpen, statKey: "programs", title: "Dynamic Programs", iconColor: "#16a34a" },
  { icon: Award, statKey: "available_seats", title: "Available Seats", iconColor: "#9333ea" },
  { icon: Globe, statKey: "placement_rate", title: "Placement Rate", iconColor: "#f97316" },
];

const buildEducationStats = (stats) =>
  educationStatsMeta.map(({ icon, statKey, title, iconColor }) => ({
    icon,
    title,
    iconColor,
    numberText: String(stats[statKey] ?? ""),
  }));

const CoursesOffered = () => {
  const universityStats = useUniversityStats();
  const educationStatsData = buildEducationStats(universityStats);
  const [activeProgram, setActiveProgram] = useState("Undergraduate");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [expandedSchools, setExpandedSchools] = useState(new Set());

  // --- Caching: School metadata & buttons ---
  const schoolButtons = useMemo(() => ADMISSIONS_SCHOOL_BUTTONS, []);

  // --- Buffer: Search query debounce handler ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); // 300ms debounce buffer

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // --- Caching & Memoization: Processed & filtered courses data ---
  const filteredSchoolsData = useMemo(() => {
    const query = debouncedQuery.trim().toLowerCase();

    return Object.entries(schoolCategories).map(([schoolKey, schoolData]) => {
      const buttonMeta = schoolButtons.find((b) => b.id === schoolKey) || {};
      const schoolShort = buttonMeta.label || schoolKey;

      const coursesForLevel = schoolData.programs?.[activeProgram] || [];

      const filteredCourses = coursesForLevel.filter((course) => {
        if (!query) return true;
        return (
          course.name?.toLowerCase().includes(query) ||
          course.eligibility?.toLowerCase().includes(query) ||
          course.specializations?.some((spec) => spec.toLowerCase().includes(query)) ||
          course.highlights?.some((hl) => hl.toLowerCase().includes(query))
        );
      });

      return {
        schoolKey,
        schoolName: schoolData.name || schoolKey,
        schoolShort,
        color: schoolData.color || "from-blue-600 to-indigo-600",
        icon: schoolData.icon || GraduationCap,
        image: schoolData.image || "photo-1581092162384-8987c1d64718",
        allCourses: coursesForLevel,
        filteredCourses,
      };
    });
  }, [schoolCategories, debouncedQuery, activeProgram, schoolButtons]);

  // Set first school as expanded by default on initial load
  useEffect(() => {
    if (expandedSchools.size === 0 && filteredSchoolsData.length > 0) {
      // Find the first school that actually has courses to display
      const firstActiveSchool = filteredSchoolsData.find((s) => s.filteredCourses.length > 0);
      if (firstActiveSchool) {
        setExpandedSchools(new Set([firstActiveSchool.schoolKey]));
      }
    }
  }, [filteredSchoolsData, expandedSchools.size]);

  // --- Memoized Callbacks for Performance ---
  const toggleSchool = useCallback((schoolKey) => {
    setExpandedSchools((prev) => {
      const next = new Set(prev);
      if (next.has(schoolKey)) {
        next.delete(schoolKey);
      } else {
        next.add(schoolKey);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedSchools(new Set(filteredSchoolsData.map((s) => s.schoolKey)));
  }, [filteredSchoolsData]);

  const collapseAll = useCallback(() => {
    setExpandedSchools(new Set());
  }, []);

  const programButtons = [
    { id: "Undergraduate", label: "Undergraduate (UG)", short: "UG" },
    { id: "Postgraduate", label: "Postgraduate (PG)", short: "PG" },
    { id: "Doctoral", label: "Doctoral (Ph.D.)", short: "Ph.D." },
  ];

  // Render course details card
  const CourseCard = ({ course }) => (
    <Card>
      <CardHeader className="bg-slate-50/40">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-slate-800 text-[16px] md:text-[17px] font-extrabold leading-snug">
            {course.name}
          </CardTitle>
          <Badge variant="success" className="shrink-0 font-bold whitespace-nowrap">
            {course.duration}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Specializations */}
        {course.specializations && course.specializations.length > 0 && (
          <div>
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Available Specializations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {course.specializations.map((spec, idx) => (
                <Badge key={idx} variant="outline" className="text-[11px] font-medium">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Seat and duration grid */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-100/50 text-xs">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Capacity</span>
              <span className="font-bold text-slate-700">{course.seats} Intake Seats</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Duration</span>
              <span className="font-bold text-slate-700">{course.duration} Course</span>
            </div>
          </div>
        </div>

        {/* Eligibility */}
        <div className="border-t border-slate-100 pt-3">
          <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            Eligibility Criteria
          </span>
          <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50/30 p-2.5 rounded-lg border border-dashed border-slate-200">
            {course.eligibility}
          </p>
        </div>

        {/* Highlights */}
        {course.highlights && course.highlights.length > 0 && (
          <div className="border-t border-slate-100 pt-3 flex-1 flex flex-col justify-end">
            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">
              Program Highlights
            </span>
            <ul className="grid grid-cols-1 gap-1.5">
              {course.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
                  <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50/50 pb-16">
        <HeroBanner
          title="Courses Offered"
          subtitle="Explore our diverse academic programs across multiple schools and degree levels"
          bgTheme={5}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
          <StatsCard stats={educationStatsData} />

          {/* Controls Bar */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-100 shadow-xl p-5 md:p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-5">
            {/* Program Tabs */}
            <div className="flex bg-slate-100/85 p-1 rounded-xl w-full md:w-auto">
              {programButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setActiveProgram(btn.id)}
                  className={cn(
                    "flex-1 md:flex-none px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-300 whitespace-nowrap",
                    activeProgram === btn.id
                      ? "bg-slate-900 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  <span className="hidden sm:inline">{btn.label}</span>
                  <span className="sm:hidden">{btn.short}</span>
                </button>
              ))}
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-80 flex items-center">
              <Search className="absolute left-3.5 h-4.5 w-4.5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs, eligibility, keywords..."
                className="w-full pl-10 pr-9 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-slate-850 focus:bg-white transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 p-1 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Expand / Collapse Controls */}
            <div className="flex gap-2 w-full md:w-auto justify-end">
              <button
                onClick={expandAll}
                className="px-3.5 py-2 text-xs font-bold border border-slate-200 hover:border-slate-300 bg-white rounded-lg text-slate-600 transition shadow-sm"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-3.5 py-2 text-xs font-bold border border-slate-200 hover:border-slate-300 bg-white rounded-lg text-slate-600 transition shadow-sm"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Unified Schools Accordions Stack */}
          <div className="space-y-4">
            {filteredSchoolsData.map((school) => {
              const isOpen = expandedSchools.has(school.schoolKey);
              const courseCount = school.filteredCourses.length;
              const hasCourses = school.allCourses.length > 0;

              // If there's a search query, and this school has no matching courses, we can hide it or show it as empty
              if (searchQuery && courseCount === 0) return null;

              return (
                <div
                  key={school.schoolKey}
                  className="rounded-2xl border border-slate-100 bg-white shadow-md overflow-hidden transition-all duration-300"
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleSchool(school.schoolKey)}
                    disabled={!hasCourses}
                    className={cn(
                      "w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none transition-all duration-300",
                      isOpen ? "bg-slate-50/80 border-b border-slate-100" : "hover:bg-slate-50/30",
                      !hasCourses && "opacity-60 cursor-not-allowed"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* School Icon Indicator */}
                      <div className="p-2.5 bg-slate-100 rounded-xl text-blue-600 hidden sm:flex items-center justify-center shrink-0">
                        <school.icon className="h-5.5 w-5.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="bg-slate-900 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {school.schoolShort}
                          </span>
                          <h3 className="text-base md:text-lg font-bold text-slate-800 leading-snug">
                            {school.schoolName}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                          <BookMarked className="h-3 w-3" />
                          {hasCourses
                            ? `${school.allCourses.length} total ${activeProgram.toLowerCase()} programs`
                            : "No programs configured for this level"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {hasCourses && (
                        <Badge
                          variant={courseCount > 0 ? "default" : "secondary"}
                          className="text-[11px] font-bold"
                        >
                          {searchQuery
                            ? `${courseCount} matching`
                            : `${courseCount} Programs`}
                        </Badge>
                      )}
                      {hasCourses && (
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="text-slate-400 p-1 rounded-full hover:bg-slate-200/50 transition-colors"
                        >
                          <ChevronDown className="h-5 w-5" />
                        </motion.div>
                      )}
                    </div>
                  </button>

                  {/* Accordion Expandable Content with Framer Motion */}
                  <AnimatePresence initial={false}>
                    {isOpen && hasCourses && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <div className="p-5 md:p-6 bg-slate-50/20 border-t border-slate-50">
                          {courseCount > 0 ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {school.filteredCourses.map((course, idx) => (
                                <CourseCard key={idx} course={course} />
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-10 text-slate-500">
                              <Sparkles className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                              <p className="text-sm font-semibold">No programs matching your search query.</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Zero matching results across all schools fallback */}
            {searchQuery &&
              filteredSchoolsData.every((school) => school.filteredCourses.length === 0) && (
                <Card className="p-12 text-center border-dashed border-2">
                  <CardContent className="space-y-3">
                    <Search className="w-12 h-12 text-slate-300 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-800">No Program Matches Found</h3>
                    <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                      We couldn't find any courses matching "{searchQuery}" for the {activeProgram} level. Try searching other degree levels or check your spelling.
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 transition shadow"
                    >
                      Clear Search Query
                    </button>
                  </CardContent>
                </Card>
              )}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default CoursesOffered;