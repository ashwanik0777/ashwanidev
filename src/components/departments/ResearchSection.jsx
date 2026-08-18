import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import StatsCard from "../StatsCard";

const ResearchSection = ({
  title = "Research & Innovation",
  subtitle = "Pioneering technology research and real-world domain solutions.",
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
    <section id="research-section" className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Department Focus Areas</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              {title}
            </h2>
            {subtitle && (
              <p className="text-slate-400 mt-3 text-base sm:text-lg max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
            <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mt-4 rounded-full" />
          </div>

          {/* Research Areas Cards */}
          {researchAreas && researchAreas.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {researchAreas.map((area, idx) => {
                const IconComponent = area.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 sm:p-7 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Bar with Icon */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3.5 rounded-2xl text-white bg-gradient-to-r ${area.gradient || "from-teal-500 to-blue-500"} shadow-md`}>
                          {IconComponent ? (
                            <IconComponent className="w-6 h-6" />
                          ) : (
                            <Sparkles className="w-6 h-6" />
                          )}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-teal-400 transition-colors">
                          Domain {idx + 1}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-5">
                        {area.description}
                      </p>

                      {/* Ongoing Projects Badges */}
                      {area.projects && area.projects.length > 0 && (
                        <div>
                          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Key Projects & Initiatives:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {area.projects.map((proj, pIdx) => (
                              <span
                                key={pIdx}
                                className="px-3 py-1 bg-slate-700/60 border border-slate-600/60 text-slate-200 text-xs font-medium rounded-full flex items-center gap-1.5"
                              >
                                <ArrowRight className="w-3 h-3 text-teal-400" />
                                {proj}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Research Stats Grid */}
          {researchStats && researchStats.length > 0 && (
            <div className="pt-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-slate-300 uppercase tracking-wider">
                  Research Metrics & Outcomes
                </h3>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
                <StatsCard
                  stats={researchStats.map((stat) => ({
                    numberText: stat.numberText || stat.value,
                    title: stat.title || stat.label,
                    subtitle: stat.subtitle || stat.label,
                  }))}
                  compact={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
