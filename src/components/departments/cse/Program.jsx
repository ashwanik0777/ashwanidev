import { GraduationCap, Clock, Download, ChevronDown } from "lucide-react";
import { useState } from "react";

/**
 * Parse duration string like "4 Years" or "3-5 Years" into a number.
 * For ranges, take the lower number.
 */
const parseDurationYears = (duration) => {
  if (!duration) return 2;
  const match = String(duration).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 2;
};

/**
 * Generate latest N academic sessions. E.g. for N=4 and current year 2025:
 * ["2025-26", "2024-25", "2023-24", "2022-23"]
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

const ProgramCard = ({ program }) => {
  const years = parseDurationYears(program.duration);
  const sessions = generateSessions(years);
  const [selectedSession, setSelectedSession] = useState(sessions[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Find syllabus URL for selected session
  const syllabusEntry = (program.syllabus || []).find(
    (s) => s.session === selectedSession
  );
  const syllabusUrl = syllabusEntry?.url || program.syllabusUrl || "";

  const handleDownload = () => {
    if (syllabusUrl) {
      window.open(syllabusUrl, "_blank");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full group relative">
      {/* Accent top */}
      <div className="h-1 bg-blue-600 w-full rounded-t-xl" />

      <div className="p-5 flex flex-col flex-grow">
        {/* Title */}
        <div className="flex items-start gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
            <GraduationCap className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-3">
            {program.title}
          </h3>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Combined Row: Duration + Dropdown + Download */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
          {/* Duration */}
          <div className="flex items-center gap-1.5 text-sm text-gray-600 font-medium whitespace-nowrap bg-gray-50 px-2.5 py-2 rounded-lg border border-gray-200 flex-shrink-0">
            <Clock className="w-4 h-4 text-gray-400" />
            {program.duration}
          </div>

          {/* Dropdown */}
          <div className="relative flex-grow min-w-0">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="truncate">{selectedSession}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ml-1 ${
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
                <div className="absolute z-50 bottom-full left-0 right-0 mb-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
                  {sessions.map((session) => (
                    <button
                      key={session}
                      onClick={() => {
                        setSelectedSession(session);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-sm hover:bg-blue-50 transition-colors ${
                        selectedSession === session
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {session}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Download button */}
          <button
            onClick={handleDownload}
            disabled={!syllabusUrl}
            title={syllabusUrl ? `Download ${selectedSession} Syllabus` : "Syllabus coming soon"}
            className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              syllabusUrl
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow cursor-pointer"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500">No programs available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="programs" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4">
              {heading}
            </h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {subheading}
            </p>
          </div>

          {/* Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${programs.length >= 4 ? 'xl:grid-cols-4' : ''} gap-5 justify-center`}>
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
