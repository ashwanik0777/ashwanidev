import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Cpu } from "lucide-react";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";
import { incubationExactData } from "../../../Data/incubationData.js";

const Focus = () => {
  return (
    <SearchableWrapper>
      <div className="w-full" id="objectives">
        
        {/* Objectives Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Vision & Strategy
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-2 sm:mt-3">
            Incubation Centre Objectives
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-indigo-600 mx-auto mt-2 sm:mt-4 rounded-full"></div>
        </div>

        {/* Objectives List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {incubationExactData.objectives.map((obj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all flex items-start gap-3 sm:gap-4"
            >
              <div className="p-2 bg-indigo-50 rounded-lg sm:rounded-xl text-indigo-600 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <p className="text-slate-700 text-xs sm:text-base leading-relaxed font-medium">
                {obj}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Initial Focus Areas Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/80 shadow-2xs" id="focus-areas">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[11px] sm:text-xs font-bold mb-2 border border-indigo-100">
              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
              Multidisciplinary Domains
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900">
              Initial Focus Areas
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl mx-auto mt-1 sm:mt-2 leading-relaxed">
              The functional areas for technological and product-based startup incubation include, but are not limited to:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {incubationExactData.focusAreas.map((area, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: idx * 0.015 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-slate-50 hover:bg-indigo-600 hover:text-white text-slate-700 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200/80 hover:border-indigo-600 shadow-2xs transition-all duration-200 cursor-default"
              >
                {area}
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </SearchableWrapper>
  );
};

export default Focus;
