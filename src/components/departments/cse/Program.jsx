import React, { useState, useMemo } from "react";
import { Clock } from "lucide-react";

/**
 * Parse duration string like "4 Years" or "3-5 Years" into a number.
 */
const parseDurationYears = (duration) => {
  if (!duration) return 2;
  const match = String(duration).match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 2;
};

const Program = ({ data }) => {
  const { heading = "Academic Programs", programs = [], categories = [] } = data || {};
  const [activeFilter, setActiveFilter] = useState("All");

  // Available tabs
  const availableTabs = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    const distinctLevels = Array.from(
      new Set(programs.map((p) => p.level).filter(Boolean))
    );
    return ["All", ...distinctLevels];
  }, [categories, programs]);

  // Filter programs based on active tab
  const filteredPrograms = useMemo(() => {
    if (!programs || !Array.isArray(programs)) return [];
    if (!activeFilter || activeFilter === "All") return programs;
    return programs.filter(
      (item) => item?.level?.toLowerCase() === activeFilter?.toLowerCase()
    );
  }, [programs, activeFilter]);

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
              {heading}
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
          </div>

          {/* Filter Tabs */}
          {availableTabs.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-10">
              {availableTabs.map((tab) => {
                const isActive = activeFilter === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          )}

          {/* Programs Grid */}
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((prog, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200/60">
                        {prog.code || prog.level || "Program"}
                      </span>
                      {prog.duration && (
                        <span className="flex items-center text-xs text-slate-500 font-medium">
                          <Clock size={13} className="mr-1" />
                          {prog.duration}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {prog.name}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {prog.description}
                    </p>

                    {prog.specializations && prog.specializations.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                          Specializations:
                        </p>
                        <ul className="text-xs text-slate-700 space-y-1">
                          {prog.specializations.map((spec, sIdx) => (
                            <li key={sIdx} className="flex items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 flex-shrink-0" />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">No programs available</p>
          )}

        </div>
      </div>
    </section>
  );
};

export default Program;