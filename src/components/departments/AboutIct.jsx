import React from "react";
import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import SectionHeading, { SECTION_PADDING, SECTION_GUTTER, VISION_CONTAINER } from "./SectionHeading";

// Inline coloured <span>s in school data inherit the paragraph colour, so every school's
// Vision / Mission text looks the same (bold emphasis is kept).
const UNIFORM_TEXT = "text-slate-700 [&_span]:text-inherit";

const AboutUs = ({ data }) => {
  const { heading = "About Us", cards = [] } = data || {};

  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <div className={SECTION_GUTTER}>
        <div className={VISION_CONTAINER}>
          <SectionHeading>{heading}</SectionHeading>

          {cards.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 min-[2560px]:gap-12">
              {cards.map((card, index) => {
                const Icon = index % 2 === 0 ? Eye : Target;
                const highlights = Array.isArray(card.highlight) ? card.highlight : null;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="bg-blue-50/60 p-4 sm:p-5 min-[2560px]:p-9 rounded-xl sm:rounded-2xl border border-blue-100"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 min-[2560px]:p-3.5 bg-blue-600 text-white rounded-lg sm:rounded-xl shrink-0">
                        <Icon className="w-5 h-5 min-[2560px]:w-8 min-[2560px]:h-8" />
                      </div>
                      <h3 className="text-lg sm:text-xl min-[2560px]:text-3xl font-bold text-blue-900">
                        {card.title?.replace(/\|.*/, "").trim() || "Overview"}
                      </h3>
                    </div>

                    <div className={`${UNIFORM_TEXT} text-sm sm:text-base min-[2560px]:text-2xl leading-relaxed text-justify space-y-2`}>
                      <div>{card.content}</div>

                      {card.highlight && !highlights && <div>{card.highlight}</div>}

                      {Array.isArray(card.bullets) && card.bullets.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1 text-left">
                          {card.bullets.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      )}

                      {highlights && highlights.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {highlights.map((item, i) => (
                            <div
                              key={i}
                              className="px-2.5 py-0.5 rounded-full bg-white border border-blue-100 text-xs min-[2560px]:text-lg font-semibold text-blue-700"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500">No information available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
