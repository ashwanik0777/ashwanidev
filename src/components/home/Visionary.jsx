import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homeData from "../../Data/home.json";
import gbuCampusView from "../../assets/GBU_CAMPUS_VIEW.jpg";

const VisionaryLeadership = () => {
  const [leaders, setLeaders] = useState([]);

  const BASE_URL = (import.meta.env.VITE_HOST || "").replace(/\/$/, "");

  useEffect(() => {
    const data = homeData?.sections?.leadership || [];
    if (Array.isArray(data)) {
      const sorted = [...data].sort((a, b) => {
        const roles = ["Hon'ble Chancellor", "Hon'ble Vice-Chancellor"];
        const aIndex = roles.indexOf(a.designation?.trim());
        const bIndex = roles.indexOf(b.designation?.trim());

        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return 0;
      });

      const mapped = sorted.map((leader) => {
        let targetUrl = leader.url;
        const desc = (leader.designation || "").toLowerCase();
        if (!targetUrl) {
          if (desc.includes("vice-chancellor")) {
            targetUrl = "/about-us/vice-chancellor-message";
          } else if (desc.includes("chancellor")) {
            targetUrl = "/about-us/chancellor-message";
          } else {
            targetUrl = "#";
          }
        }

        let displayDesignation = leader.designation;
        if (leader.name?.includes("Yogi")) {
          displayDesignation = "Hon'ble Chief Minister of Uttar Pradesh & Chancellor, GBU";
        } else if (leader.name?.includes("Rana")) {
          displayDesignation = "Vice-Chancellor, Gautam Buddha University";
        }

        return { ...leader, url: targetUrl, displayDesignation };
      });

      setLeaders(mapped);
    }
  }, []);

  const getPhotoUrl = (photo) => {
    if (!photo) return gbuCampusView;
    if (photo.startsWith("http")) return photo;
    if (photo.startsWith("/")) return photo;
    return BASE_URL
      ? `${BASE_URL}/${photo.startsWith("media") ? "" : "media/"}${photo}`
      : `/${photo}`;
  };

  if (leaders.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-[#eaf4f8] py-1 sm:py-2 border-y border-slate-200/70 font-sans relative overflow-hidden">
      {/* Top Left Accent Ribbon */}
      <div className="absolute top-0 left-0 h-1.5 w-48 bg-gradient-to-r from-orange-500 via-amber-500 to-transparent z-10" />

      {/* Desktop Only (lg+): Full-height Left Campus Image Banner */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 h-full overflow-hidden pointer-events-none">
        <img
          src={gbuCampusView}
          alt="Gautam Buddha University Campus"
          className="w-full h-full object-cover object-center"
          style={{
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            WebkitMaskComposite: "source-in",
            maskImage: "linear-gradient(to right, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
            maskComposite: "intersect"
          }}
        />
        {/* Soft edge feathering overlay */}
        <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-[#eaf4f8] via-[#eaf4f8]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#eaf4f8] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-end gap-5 lg:gap-6">

          {/* Spacer to balance left 50% campus view on desktop */}
          <div className="hidden lg:block w-1/2 min-h-[220px] pointer-events-none" />

          {/* Right Side (50% Width on Desktop, 100% on Mobile/Tablet): VC & Chancellor Cards in RMNLU Profile Style */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3.5 sm:gap-4 justify-center">
            {leaders.map((leader) => (
              <Link
                key={leader.id || leader.name}
                to={leader.url}
                className="w-full bg-white border-2 border-[#ea7a16] hover:border-orange-600 rounded-2xl p-3.5 sm:p-4 flex flex-row items-center gap-3.5 sm:gap-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                {/* Leader Avatar Photo (Circular RMNLU Frame) */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm shrink-0 bg-slate-50 group-hover:border-orange-400 transition-colors duration-300">
                  <img
                    src={getPhotoUrl(leader.photo)}
                    alt={leader.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Leader Details (Right Aligned Text Block) */}
                <div className="flex flex-col text-left justify-center min-w-0 flex-1">
                  <h3 className="font-extrabold text-[#1a2942] text-sm sm:text-base group-hover:text-orange-600 transition-colors leading-snug">
                    {leader.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-snug mt-0.5">
                    {leader.displayDesignation}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionaryLeadership;








