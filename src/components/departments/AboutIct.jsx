import React from "react";
import { motion } from "framer-motion";

const AboutUs = ({ data }) => {
  const {
    heading = "About Us",
    subtitle = "",
    cards = [],
  } = data || {};

  return (
    <section className="py-8 sm:py-10 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 tracking-tight">
            {heading}
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
          {subtitle && (
            <p className="text-gray-500 font-medium text-base mt-2">
              {subtitle}
            </p>
          )}
        </div>

        {/* 2-Column Minimalist Layout */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="border-l-2 border-blue-600 pl-6 sm:pl-8 py-1"
              >
                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight mb-3">
                  {card.title?.replace(/\|.*/, "").trim() || "Overview"}
                </h3>

                {/* Paragraph Content */}
                <div className="text-gray-700 text-base sm:text-[16px] leading-relaxed text-justify">
                  {card.content}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">No information available.</p>
          )}
        </div>

      </div>
    </section>
  );
};

export default AboutUs;