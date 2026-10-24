import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import StatsCard from "../StatsCard";
import SectionHeading, { SECTION_PADDING, SECTION_GUTTER, SECTION_CONTAINER } from "./SectionHeading";

const ResearchSection = ({
  title = "Research & Innovation",
  researchAreas = [],
  researchStats = [],
}) => {
  if (
    (!researchAreas || researchAreas.length === 0) &&
    (!researchStats || researchStats.length === 0)
  ) {
    return null;
  }

  return (
    <section id="research-section" className={`${SECTION_PADDING} bg-white`}>
      <div className={SECTION_GUTTER}>
        <div className={`${SECTION_CONTAINER} space-y-6 sm:space-y-8`}>
          <SectionHeading className="">{title}</SectionHeading>

          {/* Research Areas Cards */}
          {researchAreas && researchAreas.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 min-[1920px]:grid-cols-4 gap-3 sm:gap-4 min-[2560px]:gap-8">
              {researchAreas.map((area, idx) => {
                const IconComponent = area.icon || Sparkles;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200/80 rounded-xl sm:rounded-2xl p-4 sm:p-5 min-[2560px]:p-8 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="p-2 min-[2560px]:p-3.5 rounded-lg sm:rounded-xl text-white bg-blue-600 shrink-0">
                        <IconComponent className="w-5 h-5 min-[2560px]:w-8 min-[2560px]:h-8" />
                      </div>
                      <h3 className="text-base sm:text-lg min-[2560px]:text-3xl font-bold text-slate-900 leading-snug">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm min-[2560px]:text-xl text-slate-600 leading-relaxed">
                      {area.description}
                    </p>

                    {/* Ongoing Projects Badges */}
                    {area.projects && area.projects.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {area.projects.map((proj, pIdx) => (
                          <span
                            key={pIdx}
                            className="px-2.5 py-1 bg-blue-50 border border-blue-100 text-blue-800 text-[11px] sm:text-xs min-[2560px]:text-lg font-medium rounded-full flex items-center gap-1"
                          >
                            <ArrowRight className="w-3 h-3 min-[2560px]:w-5 min-[2560px]:h-5 text-blue-600" />
                            {proj}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Research Stats Grid */}
          {researchStats && researchStats.length > 0 && (
            <StatsCard
              stats={researchStats.map((stat) => ({
                numberText: stat.numberText || stat.value,
                title: stat.title || stat.label,
                subtitle: stat.subtitle || stat.label,
              }))}
              compact
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
