import React from 'react';
import { motion } from "framer-motion";
import SearchableWrapper from '../../../components/Searchbar/SearchableWrapper';
import { incubationFacilities } from '../../../Data/incubationData.js';
import { Building2 } from 'lucide-react';

export default function Services() {
  return (
    <SearchableWrapper>
      <div className="w-full" id="facilities">
        
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Infrastructure
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-2 sm:mt-3">
            Facilities
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-indigo-600 mx-auto mt-2 sm:mt-4 rounded-full"></div>
          <p className="mt-2 sm:mt-4 text-slate-600 max-w-2xl mx-auto text-xs sm:text-base">
            State-of-the-art infrastructure provided by GBU Incubation Centre for startups and incubatees
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {incubationFacilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="group bg-white rounded-xl sm:rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 w-full bg-slate-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div className="hidden absolute inset-0 items-center justify-center bg-slate-100 text-slate-400">
                  <Building2 className="w-10 h-10" />
                </div>
              </div>

              {/* Facility Title */}
              <div className="p-4 sm:p-5 text-center">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SearchableWrapper>
  );
}
