import React from "react";
import { motion } from "framer-motion";
import { Eye, Target, CheckCircle2 } from "lucide-react";
import StatsCard from "../../StatsCard";
import SectionHeading, { SECTION_PADDING, SECTION_GUTTER, SECTION_CONTAINER, VISION_CONTAINER } from "../SectionHeading";

const AboutDepartment = ({
  heading = "About the Department",
  description = "",
  stats = [],
  highlights = [],
  vision = "",
  missionPoints = [],
}) => {
  return (
    <section id="about" className={`${SECTION_PADDING} bg-white`}>
      <div className={SECTION_GUTTER}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className={`${SECTION_CONTAINER} space-y-6 sm:space-y-8 min-[2560px]:space-y-12`}
        >
          <div>
            <SectionHeading>{heading}</SectionHeading>
            {description && (
              <p className="max-w-5xl min-[2560px]:max-w-7xl mx-auto text-center text-sm sm:text-base min-[2560px]:text-2xl text-slate-700 leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Stats Card */}
          {stats && stats.length > 0 && <StatsCard stats={stats} compact />}

          {/* Vision & Mission Section */}
          {(vision || (missionPoints && missionPoints.length > 0)) && (
            <div className={`${VISION_CONTAINER} grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 min-[2560px]:gap-12`}>
              {vision && (
                <div className="bg-blue-50/60 p-4 sm:p-5 min-[2560px]:p-9 rounded-xl sm:rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 min-[2560px]:p-3.5 bg-blue-600 text-white rounded-lg sm:rounded-xl">
                      <Eye className="w-5 h-5 min-[2560px]:w-8 min-[2560px]:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl min-[2560px]:text-3xl font-bold text-blue-900">Our Vision</h3>
                  </div>
                  <p className="text-sm sm:text-base min-[2560px]:text-2xl text-slate-700 leading-relaxed">
                    {vision}
                  </p>
                </div>
              )}

              {missionPoints && missionPoints.length > 0 && (
                <div className="bg-blue-50/60 p-4 sm:p-5 min-[2560px]:p-9 rounded-xl sm:rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 min-[2560px]:p-3.5 bg-blue-600 text-white rounded-lg sm:rounded-xl">
                      <Target className="w-5 h-5 min-[2560px]:w-8 min-[2560px]:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl min-[2560px]:text-3xl font-bold text-blue-900">Our Mission</h3>
                  </div>
                  <ul className="space-y-2">
                    {missionPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm sm:text-base min-[2560px]:text-2xl text-slate-700">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 min-[2560px]:w-7 min-[2560px]:h-7 text-blue-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Highlights Grid */}
          {highlights && highlights.length > 0 && (
            <div>
              <h3 className="text-center text-lg sm:text-xl lg:text-2xl min-[2560px]:text-4xl font-bold text-blue-900 mb-3 sm:mb-4">
                Key Department Highlights
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 min-[1920px]:grid-cols-4 gap-3 sm:gap-4 min-[2560px]:gap-8">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 min-[2560px]:p-7 bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="w-2.5 h-2.5 min-[2560px]:w-4 min-[2560px]:h-4 rounded-full bg-blue-600 shrink-0" />
                      <h4 className="text-sm sm:text-base min-[2560px]:text-2xl font-bold text-slate-900">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm min-[2560px]:text-xl text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
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
