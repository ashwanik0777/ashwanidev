import React from "react";
import { motion } from "framer-motion";
import { Eye, Target, CheckCircle2 } from "lucide-react";
import StatsCard from "../../StatsCard";

const AboutDepartment = ({
  heading = "About the Department",
  subheading = "",
  stats = [],
  highlights = [],
  vision = "",
  missionPoints = [],
}) => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto space-y-12"
        >
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 tracking-tight">
              {heading}
            </h2>
            {subheading && (
              <p className="text-slate-600 mt-3 text-base sm:text-lg max-w-3xl mx-auto">
                {subheading}
              </p>
            )}
            <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full" />
          </div>

          {/* Stats Card */}
          {stats && stats.length > 0 && <StatsCard stats={stats} compact={false} />}

          {/* Vision & Mission Section */}
          {(vision || (missionPoints && missionPoints.length > 0)) && (
            <div className="grid md:grid-cols-2 gap-8 pt-4">
              {vision && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50/90 via-indigo-50/50 to-white p-7 sm:p-9 rounded-2xl border border-blue-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-5">
                      <div className="p-3.5 bg-blue-600 text-white rounded-2xl shadow-md shadow-blue-600/30">
                        <Eye className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Strategic Goals</span>
                        <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
                      </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-base sm:text-lg font-medium">
                      "{vision}"
                    </p>
                  </div>
                </motion.div>
              )}

              {missionPoints && missionPoints.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-teal-50/90 via-emerald-50/50 to-white p-7 sm:p-9 rounded-2xl border border-teal-100 shadow-xl shadow-teal-900/5 hover:shadow-2xl hover:border-teal-200 transition-all duration-300"
                >
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className="p-3.5 bg-teal-600 text-white rounded-2xl shadow-md shadow-teal-600/30">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Our Commitment</span>
                      <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {missionPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                        <CheckCircle2 className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          )}

          {/* Highlights Grid */}
          {highlights && highlights.length > 0 && (
            <div className="pt-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Key Department Highlights
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {highlights.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className="w-3.5 h-3.5 rounded-full inline-block shadow-sm"
                          style={{ backgroundColor: item.dotColor || "#10b981" }}
                        />
                        <h4 className="text-lg font-bold text-slate-900">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutDepartment;

