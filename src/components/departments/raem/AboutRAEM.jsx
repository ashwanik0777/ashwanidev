import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Award, Check } from "lucide-react";

const AboutRAEM = ({
  title = "About",
  highlight = "RAEM",
  sections = [],
  photos = [],
}) => {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 tracking-tight">
          {title} <span className="text-blue-600">{highlight}</span>
        </h2>
        <div className="w-20 sm:w-24 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TEXT SECTIONS + IMAGES */}
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* LEFT TEXT SECTIONS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6 flex flex-col justify-center"
          >
            {sections.map(({ heading, text }, idx) => (
              <div
                key={idx}
                className="bg-gray-50/60 p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-2 sm:mb-3">
                  {heading}
                </h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* RIGHT IMAGES */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-5 items-center justify-center w-full"
          >
            {photos.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`About Section ${idx + 1}`}
                className="rounded-2xl shadow-lg border border-gray-100 max-h-[350px] w-full object-cover hover:shadow-xl transition-shadow"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutRAEM;
