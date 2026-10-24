import React, { useState, useMemo } from "react";
import { Clock, ChevronDown, FileText } from "lucide-react";
import SectionHeading, { SECTION_PADDING, SECTION_GUTTER, SECTION_CONTAINER } from "../SectionHeading";

/**
 * Parse duration string like "4 Years" or "3-5 Years" into a number.
 */
const parseDurationYears = (duration) => {
  if (!duration) return 2;
  const match = String(duration).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 2;
};

/**
 * Fallback session generator for programs without explicit syllabus arrays.
 */
const generateSessions = (count) => {
  const currentYear = new Date().getFullYear();
  const sessions = [];
  for (let i = 0; i < count; i++) {
    const startYear = currentYear - i;
    sessions.push(`${startYear}-${String(startYear + 1).slice(2)}`);
  }
  return sessions;
};

/**
 * Helper to extract display label from syllabus item across different department formats
 */
const getItemLabel = (item, index) => {
  if (typeof item === "string") return `Option ${index + 1}`;
  if (!item) return `Session ${index + 1}`;
  return item.session || item.year || item.title || item.label || item.name || `Session ${index + 1}`;
};

/**
 * Helper to extract PDF URL from syllabus item across different department formats
 */
const getItemUrl = (item, defaultUrl = "") => {
  if (typeof item === "string") return item;
  return item?.url || item?.link || item?.pdfUrl || defaultUrl;
};

const ProgramCard = ({ program }) => {
  const years = parseDurationYears(program.duration);
  const fallbackSessions = generateSessions(years);

  const hasSyllabusArray = Array.isArray(program.syllabus) && program.syllabus.length > 0;
  
  const availableSessions = hasSyllabusArray
    ? program.syllabus.map((item, idx) => getItemLabel(item, idx))
    : fallbackSessions;

  const [selectedSession, setSelectedSession] = useState(availableSessions[0] || "Default");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let syllabusUrl = program.syllabusUrl || "";

  if (hasSyllabusArray) {
    const matchedEntry = program.syllabus.find(
      (item, idx) => getItemLabel(item, idx) === selectedSession
    );
    syllabusUrl = getItemUrl(matchedEntry, program.syllabusUrl || "");
  }

  const handleDownload = () => {
    if (syllabusUrl) {
      window.open(syllabusUrl, "_blank");
    }
  };

  return (
    <div className="h-full bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 px-3.5 py-4 sm:px-4 min-[2560px]:px-6 min-[2560px]:py-6 hover:border-blue-200 hover:shadow-md transition-all duration-200 flex flex-col">
      {/* Header Row: Title & Duration Badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0 flex-1">
          {program.level && (
            <span className="inline-block mb-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-[10px] sm:text-[11px] min-[2560px]:text-sm font-semibold text-blue-700 uppercase tracking-wider">
              {program.level}
            </span>
          )}
          <h3 className="text-sm sm:text-base min-[1920px]:text-lg min-[2560px]:text-2xl font-bold text-slate-900 leading-snug break-words">
            {program.title || program.name}
          </h3>
        </div>

        {program.duration && (
          <div className="flex items-center gap-1 text-[11px] sm:text-xs min-[2560px]:text-base font-medium text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-full shrink-0 whitespace-nowrap">
            <Clock className="w-3.5 h-3.5 min-[2560px]:w-5 min-[2560px]:h-5 text-slate-500" />
            <span>{program.duration}</span>
          </div>
        )}
      </div>

      {/* Action Row: Dropdown + Download Button */}
      <div className="mt-auto flex items-center gap-2 pt-4 border-t border-slate-100">
        {/* Session Dropdown */}
        <div className="relative min-w-0 flex-1">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2 min-[2560px]:py-3 bg-slate-50 border border-slate-200 rounded-lg sm:rounded-xl text-xs min-[2560px]:text-base font-medium text-slate-700 hover:bg-slate-100/80 transition-colors"
          >
            <span className="truncate">{selectedSession}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute z-50 bottom-full left-0 right-0 mb-1.5 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden py-1 max-h-48 overflow-y-auto">
                {availableSessions.map((session) => (
                  <button
                    key={session}
                    onClick={() => {
                      setSelectedSession(session);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs min-[2560px]:text-base transition-colors ${
                      selectedSession === session
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {session}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* View Syllabus PDF Button */}
        <button
          onClick={handleDownload}
          disabled={!syllabusUrl}
          title={
            syllabusUrl
              ? `Download ${selectedSession} Syllabus`
              : "Syllabus not available"
          }
          className={`shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 min-[2560px]:px-5 min-[2560px]:py-3 rounded-lg sm:rounded-xl text-xs min-[2560px]:text-base font-semibold whitespace-nowrap transition-all ${
            syllabusUrl
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          <FileText className="w-3.5 h-3.5 min-[2560px]:w-5 min-[2560px]:h-5" />
          <span>View Syllabus</span>
        </button>
      </div>
    </div>
  );
};

const FILTER_TABS = [
  { id: "ALL", label: "All Programs", short: "All" },
  { id: "UG", label: "Undergraduate (UG)", short: "UG" },
  { id: "PG", label: "Postgraduate (PG)", short: "PG" },
  { id: "PHD", label: "Doctoral (Ph.D.)", short: "Ph.D." },
  { id: "INTEGRATED", label: "Integrated", short: "Integrated" },
];

const checkMatch = (program, filterId) => {
  if (filterId === "ALL") return true;
  const level = String(program.level || program.category || program.title || "").toLowerCase();
  
  if (filterId === "UG") {
    return level.includes("ug") || level.startsWith("under") || level.includes("b.tech") || level.includes("bca") || level.includes("b.sc");
  }
  if (filterId === "PG") {
    return level.includes("pg") || level.startsWith("post") || level.includes("m.tech") || level.includes("mca") || level.includes("m.sc") || level.includes("master");
  }
  if (filterId === "PHD") {
    return level.includes("phd") || level.includes("ph.d") || level.startsWith("doc") || level.includes("research");
  }
  if (filterId === "INTEGRATED") {
    return level.includes("integrated") || level.includes("dual");
  }
  return true;
};

const Programs = ({
  heading = "Academic Programs",
  programs = [],
}) => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const availableTabs = useMemo(() => {
    return FILTER_TABS.filter((tab) => {
      if (tab.id === "ALL") return true;
      return programs.some((p) => checkMatch(p, tab.id));
    });
  }, [programs]);

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => checkMatch(p, activeFilter));
  }, [programs, activeFilter]);

  if (!programs || programs.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-500">No programs available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="programs" className={`${SECTION_PADDING} bg-white`}>
      <div className={SECTION_GUTTER}>
        <div className={SECTION_CONTAINER}>
          {/* Section Header */}
          <div className="text-center">
            <SectionHeading>{heading}</SectionHeading>

            {/* Medium Fully-Rounded Pills with Single-Line Horizontal Layout */}
            {availableTabs.length > 1 && (
              <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 mb-3 sm:mb-4 min-[2560px]:mb-8 scrollbar-none max-w-full px-1">
                {availableTabs.map((tab) => {
                  const isActive = activeFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveFilter(tab.id)}
                      className={`px-3.5 sm:px-5 min-[2560px]:px-8 py-1.5 sm:py-2 min-[2560px]:py-3 rounded-full text-xs sm:text-sm min-[2560px]:text-xl font-medium transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
                        isActive
                          ? "bg-blue-600 text-white border border-blue-600 shadow-sm shadow-blue-500/20"
                          : "bg-transparent border border-slate-300/80 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:shadow-[0_0_10px_rgba(59,130,246,0.15)]"
                      }`}
                    >
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.short}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Cards Grid */}
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1920px]:grid-cols-5 gap-3 lg:gap-4 min-[2560px]:gap-6 ">

              {filteredPrograms.map((program, index) => (
                <ProgramCard key={program.id || index} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50/80 rounded-2xl border border-slate-100">
              <p className="text-sm text-slate-500">No programs available in this category.</p>
              <button
                onClick={() => setActiveFilter("ALL")}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                View all programs
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Programs;