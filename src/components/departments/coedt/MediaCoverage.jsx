import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function MediaCoverage({
  sectionTitle = "Media Coverage",
  sectionSubtitle = "Explore how our work is making headlines",
  mediaItems = [],
}) {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
            {sectionTitle}
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        </motion.div>

        {/* Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="rounded-2xl shadow-lg border border-gray-200/80 bg-white p-6"
        >
          <h3 className="text-blue-900 text-xl font-bold mb-6">
            News & Articles
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[650px] overflow-y-auto pr-2 custom-scrollbar">
            {mediaItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex flex-col bg-gray-50/50 rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden rounded-lg mb-3 bg-gray-100 h-44">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h4 className="font-semibold text-blue-900 text-sm mb-1.5 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 mb-3 flex-1 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex items-center text-xs text-blue-600 font-medium mt-auto pt-2 border-t border-gray-200/60">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  {item.date}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
