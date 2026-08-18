import React, { useState } from "react";

const fallbackLogo = "https://ui-avatars.com/api/?name=Company&background=e2e8f0&color=475569&size=120&bold=true";

const RecruitersShowcase = ({ recruitersData = [] }) => {
  const [isPaused, setIsPaused] = useState(false);

  if (!recruitersData || !recruitersData.length) return null;

  // Duplicate data to ensure seamless infinite loop
  const displayRecruiters = [...recruitersData, ...recruitersData];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden">
      <style>{`
        @keyframes softMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-soft-marquee {
          display: flex;
          width: max-content;
          animation: softMarquee 35s linear infinite;
        }
        .animate-soft-marquee.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 tracking-tight">
            Our Recruiters
          </h2>
          <div className="w-20 sm:w-24 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full" />
          <p className="text-sm text-gray-500 mt-2 font-medium">
            Leading companies recruiting our graduates
          </p>
        </div>

        {/* Marquee Track Container with Soft Edge Fades */}
        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Masks for Soft Edge Fading */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Continuous Sliding Track */}
          <div className={`animate-soft-marquee gap-4 sm:gap-6 ${isPaused ? "paused" : ""}`}>
            {displayRecruiters.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-36 sm:w-44 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl bg-white shadow-sm border border-gray-200/80 hover:shadow-xl hover:border-blue-300 hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex items-center justify-center"
              >
                <div className="w-full h-14 sm:h-18 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    title={company.name}
                    onError={(e) => (e.target.src = fallbackLogo)}
                    className="max-w-full max-h-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecruitersShowcase;
