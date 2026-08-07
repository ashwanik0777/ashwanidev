 import React from "react";

import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";

const logos = [
  { name: "Amazon", logo: "https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_256px.png" },
  { name: "Apple", logo: "https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_256px.png" },
  { name: "Myntra", logo: "https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_256px.png" },
  { name: "Grow", logo: "https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_256px.png" },
  { name: "Flipkart", logo: "https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_256px.png" },
  { name: "Meesho", logo: "https://mailmeteor.com/logos/assets/PNG/Microsoft_Logo_256px.png" },
];

export default function StartupsCarousel() {
  return (
    <SearchableWrapper>
    <div className="bg-white py-16 border-t border-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">
          Startups & Incubatees
        </h2>
      </div>
      
      <div className="overflow-hidden relative w-full max-w-7xl mx-auto">
        <div
          className="flex w-max animate-[scroll_15s_linear_infinite] space-x-20"
          style={{
            animation: "scroll 15s linear infinite"
          }}
        >
          {[...logos, ...logos].map((item, idx) => (
            <div key={idx} className="flex items-center justify-center w-40 h-24 bg-slate-50 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
              <img
                src={item.logo}
                alt={item.name}
                className="h-12 object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
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
