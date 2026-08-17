import React, { useState } from "react";
import { Clock, ChevronDown, FileText } from "lucide-react";

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
 * (supports s.session, s.year, s.title, s.label, s.name, or string)
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

  // Extract session names safely across all school/department formats
  const hasSyllabusArray = Array.isArray(program.syllabus) && program.syllabus.length > 0;
  
  const availableSessions = hasSyllabusArray
    ? program.syllabus.map((item, idx) => getItemLabel(item, idx))
    : fallbackSessions;

  const [selectedSession, setSelectedSession] = useState(availableSessions[0] || "Default");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Find syllabus URL for selected session, falling back gracefully to program.syllabusUrl
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
    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Header Row: Title & Duration Badge */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
            {program.title}
          </h3>
          {program.level && (
            <span className="inline-block mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">
              {program.level}
            </span>
          )}
        </div>

        {program.duration && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{program.duration}</span>
          </div>
        )}
      </div>

      {/* Action Row: Dropdown + Download Button */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
        {/* Session Dropdown */}
        <div className="relative min-w-[150px] flex-grow sm:flex-grow-0">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="truncate">{selectedSession}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform flex-shrink-0 ${
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
              <div className="absolute z-50 bottom-full left-0 right-0 mb-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden py-1 max-h-48 overflow-y-auto">
                {availableSessions.map((session) => (
                  <button
                    key={session}
                    onClick={() => {
                      setSelectedSession(session);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
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
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            syllabusUrl
              ? "bg-blue-700 hover:bg-blue-800 text-white shadow-sm cursor-pointer"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Syllabus PDF</span>
        </button>
      </div>
    </div>
  );
};

const Programs = ({
  heading = "Academic Programs",
  subheading = "Choose from our diverse range of programs designed to meet your academic and career goals.",
  programs = [],
}) => {
  if (!programs || programs.length === 0) {
    return (
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-slate-500">No programs available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="programs" className="py-14 bg-slate-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
              {heading}
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {programs.map((program, index) => (
              <ProgramCard key={index} program={program} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;
