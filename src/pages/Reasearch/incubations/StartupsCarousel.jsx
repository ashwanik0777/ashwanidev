import React from "react";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";
import { incubationLogos } from "../../../Data/incubationData.js";

export default function StartupsCarousel() {
  return (
    <SearchableWrapper>
      <div className="bg-slate-900 py-16 border-t border-slate-800 text-white overflow-hidden">
        <div className="text-center mb-10">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase bg-indigo-950/80 px-4 py-1.5 rounded-full border border-indigo-800">
            Portfolio Highlights
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mt-3">
            Featured Incubatee Companies
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mt-2">
            Innovators, tech pioneers, and high-growth ventures nurtured at AIC-GBU Incubation Center
          </p>
        </div>

        <div className="overflow-hidden relative w-full max-w-7xl mx-auto">
          {/* Gradient Edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>

          <div
            className="flex w-max animate-[scroll_25s_linear_infinite] space-x-8"
            style={{
              animation: "scroll 25s linear infinite"
            }}
          >
            {[...incubationLogos, ...incubationLogos].map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center w-48 h-28 bg-slate-800/80 border border-slate-700/60 rounded-2xl p-4 hover:border-indigo-500 hover:bg-slate-800 transition-all duration-300 shadow-lg"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="max-h-12 max-w-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="hidden font-bold text-sm text-indigo-300 text-center">
                  {item.name}
                </span>
                <span className="text-[11px] font-semibold text-slate-300 mt-2 truncate max-w-full group-hover:text-indigo-400 transition-colors">
                  {item.name}
                </span>
                <span className="text-[9px] text-slate-500 truncate max-w-full">
                  {item.subsector || item.sector}
                </span>
              </div>
            ))}
          </div>

          <style>
            {`
              @keyframes scroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
            `}
          </style>
        </div>
      </div>
    </SearchableWrapper>
  );
}
