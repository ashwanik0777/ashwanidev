import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";
import { incubationTeam } from "../../../Data/incubationData.js";

export default function Team() {
  return (
    <SearchableWrapper>
      <div className="w-full" id="team">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Leadership & Governance
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-2 sm:mt-3">
            AIC-GBU Team
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-indigo-600 mx-auto mt-2 sm:mt-4 rounded-full"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-xs sm:text-sm mt-2 sm:mt-4">
            Core team members driving innovation, operations, IT, and startup incubation at GBURIF
          </p>
        </div>

        {/* Compact Responsive Team Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {incubationTeam.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
              className="group bg-white border border-slate-200/90 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 text-center shadow-2xs hover:shadow-md hover:border-indigo-200 transition-all duration-300 flex flex-col items-center justify-center min-h-[170px] sm:min-h-[210px]"
            >
              <div className="flex flex-col items-center w-full">
                {/* Avatar Container */}
                <div className="w-16 h-16 sm:w-24 sm:h-24 mb-2.5 sm:mb-4 rounded-full overflow-hidden border-2 border-indigo-100 shadow-xs relative bg-slate-100 flex items-center justify-center shrink-0">
                  {member.photo && !member.photo.includes("coming.jpg") ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center bg-slate-100 ${member.photo && !member.photo.includes("coming.jpg") ? 'hidden' : ''}`}>
                    <User className="w-7 h-7 sm:w-10 sm:h-10 text-slate-400" />
                  </div>
                </div>
                
                {/* Name */}
                <h3 className="font-bold text-xs sm:text-base text-slate-900 mb-0.5 sm:mb-1 leading-snug line-clamp-1">
                  {member.name}
                </h3>

                {/* Role / Designation */}
                <p className="text-[11px] sm:text-xs text-indigo-600 font-semibold leading-tight sm:leading-relaxed px-0.5 line-clamp-2">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </SearchableWrapper>
  );
}
