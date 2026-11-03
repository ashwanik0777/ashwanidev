import React, { useState } from "react";
import SectionHeading, { SECTION_PADDING, SECTION_CONTAINER, SLIDER_SIDE_SPACE, HEADING_SPACE } from "./SectionHeading";

const fallbackLogo = "https://ui-avatars.com/api/?name=Company&background=e2e8f0&color=475569&size=120&bold=true";

const RecruitersShowcase = ({ recruitersData = [] }) => {
  const [isPaused, setIsPaused] = useState(false);

  if (!recruitersData || !recruitersData.length) return null;

  // Duplicate data to ensure seamless infinite loop
  const displayRecruiters = [...recruitersData, ...recruitersData];

  return (
    <section className={`${SECTION_PADDING} bg-white overflow-hidden`}>
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

      <SectionHeading className={`${HEADING_SPACE} px-4`}>Our Recruiters</SectionHeading>

      {/* Same width as the faculty / departments sections */}
      <div className={`${SECTION_CONTAINER} ${SLIDER_SIDE_SPACE}`}>
        {/* Marquee Track Container with Soft Edge Fades */}
        <div
          className="relative w-full overflow-hidden py-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Masks for Soft Edge Fading */}
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 min-[2560px]:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 min-[2560px]:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Continuous Sliding Track */}
          <div className={`animate-soft-marquee gap-3 sm:gap-4 lg:gap-5 min-[2560px]:gap-8 ${isPaused ? "paused" : ""}`}>
            {displayRecruiters.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-28 sm:w-36 lg:w-40 min-[1920px]:w-44 min-[2560px]:w-64 px-3 py-2.5 sm:px-5 sm:py-3 min-[2560px]:px-8 min-[2560px]:py-5 rounded-xl sm:rounded-2xl bg-white shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all duration-300 group flex items-center justify-center"
              >
                <div className="w-full h-10 sm:h-14 min-[2560px]:h-24 flex items-center justify-center">
                  <img
                    src={company.logo}
                    alt={company.name}
                    title={company.name}
                    loading="lazy"
                    onError={(e) => (e.target.src = fallbackLogo)}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
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
