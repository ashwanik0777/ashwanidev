import React, { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import homeData from "../../Data/home.json";

// Curated list of top recruiter logos evenly spaced along the semicircle arc
const RECRUITER_LOGOS = [
  { id: 1, name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { id: 2, name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { id: 3, name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { id: 4, name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { id: 5, name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
  { id: 6, name: "TCS", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" },
  { id: 7, name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Adobe_Systems_logo_and_wordmark.svg" },
  { id: 8, name: "HCL Tech", logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/HCL_Technologies_logo.svg" },
];

const BASE = import.meta.env.VITE_HOST?.replace(/\/$/, "");
const getImageUrl = (path) => {
  if (!path) return "";
  return path.includes("http")
    ? path
    : path.startsWith("/")
      ? path
      : `${BASE}/${path.startsWith("media") ? "" : "media/"}${path}`;
};

const StatItem = ({ end, duration, suffix = "", separator = "", text, start }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div className="text-center" ref={ref}>
      <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
        {inView ? (
          <CountUp end={end} duration={duration} suffix={suffix} separator={separator} start={start ?? 0} />
        ) : (
          "0"
        )}
        +
      </h3>
      <p className="text-slate-600 text-xs sm:text-sm font-semibold mt-1">{text}</p>
    </div>
  );
};

const HiringSection = () => {
  const [companyData, setCompanyData] = useState([]);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isMobile, setIsMobile] = useState(false);
  const [time, setTime] = useState(0);
  const animationRef = useRef();

  useEffect(() => {
    const fromJson = (homeData?.sections?.companies_hiring || [])
      .filter((c) => c.logo)
      .map((c, idx) => ({
        id: `json-${idx}`,
        name: c.title,
        logo: getImageUrl(c.logo),
      }));

    const combined = fromJson.length >= 8 ? fromJson.slice(0, 8) : [...RECRUITER_LOGOS];
    setCompanyData(combined);
  }, []);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 640);
      setContainerWidth(width > 1280 ? 1200 : Math.max(300, width - 32));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const animate = () => {
      setTime((prev) => prev + 0.0004);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const radius = isMobile ? Math.min(containerWidth / 2.3, 160) : Math.min(containerWidth / 2.1, 460);
  const activeLogos = isMobile ? companyData.slice(0, 5) : companyData;
  const first = homeData?.sections?.companies_hiring?.[0] || {};

  return (
    <section className="bg-gradient-to-b from-[#f4f8fc] via-[#edf4fa] to-[#f4f8fc] py-4 sm:py-6 overflow-hidden font-sans border-t border-slate-200/60">
      
      {/* Mobile Title (above the arc on small screens) */}
      {isMobile && (
        <div className="text-center px-4 mb-4">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Companies <span className="text-blue-700">Hiring</span>
          </h2>
        </div>
      )}

      {/* Semicircle Arc Container */}
      <div
        className="relative mx-auto"
        style={{
          width: containerWidth,
          height: isMobile ? radius + 90 : radius + 35,
          minHeight: isMobile ? "220px" : "280px",
        }}
      >
        {/* Desktop Title Block Placed INSIDE the Semicircle Arc */}
        {!isMobile && (
          <div
            className="absolute left-1/2 transform -translate-x-1/2 text-center z-20 px-4 w-full max-w-lg"
            style={{ top: `${radius * 0.43}px` }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Companies <span className="text-blue-700">Hiring</span>
            </h2>
          </div>
        )}

        {/* Outer Arc Floating Logo Bubbles */}
        {activeLogos.map((company, i) => {
          const total = activeLogos.length;
          const offset = (time + i / total) % 1;
          const angle = Math.PI * offset;
          const x = radius * Math.cos(angle);
          const y = -radius * Math.sin(angle);

          return (
            <div
              key={company.id || i}
              className="absolute transition-transform duration-75 hover:scale-110 z-10"
              style={{
                left: `${containerWidth / 2 + x - (isMobile ? 22 : 35)}px`,
                top: `${radius + y + (isMobile ? 15 : 25)}px`,
              }}
            >
              <div className="w-11 h-11 sm:w-20 sm:h-20 bg-white rounded-full shadow-md sm:shadow-lg border border-slate-200/80 flex items-center justify-center p-1.5 sm:p-3 hover:shadow-2xl hover:border-blue-400 transition-all duration-300">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-7 h-7 sm:w-13 sm:h-13 max-w-[85%] max-h-[85%] object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/60?text=" + encodeURIComponent(company.name || "Logo");
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* View Placements CTA Button */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2 text-center z-20 w-full"
          style={{ top: isMobile ? `${radius + 35}px` : `${radius * 0.72}px` }}
        >
          <Link to="/placements">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-2.5 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 text-xs sm:text-base border border-blue-500">
              <span>View Placements</span>
              <svg className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </Link>
        </div>

      </div>

      {/* Placement Stats Bar */}
      <div className="w-[92vw] max-w-4xl mx-auto mt-4 sm:mt-4 bg-white shadow-xl rounded-2xl p-5 sm:p-7 border border-slate-100 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <StatItem
            end={parseInt(first?.Companies_hiring?.replace(/\D/g, "") || "300", 10)}
            duration={2}
            text="Companies hiring worldwide"
          />
          <StatItem
            end={parseInt(first?.alumini_count?.replace(/\D/g, "") || "30000", 10)}
            duration={3}
            separator=","
            text="Successful Alumni worldwide"
          />
          <StatItem
            end={parseInt(first?.placement_rate?.replace(/\D/g, "") || "90", 10)}
            start={65}
            duration={2.5}
            suffix="%"
            text="Placement program wise"
          />
        </div>
      </div>

    </section>
  );
};

export default HiringSection;
