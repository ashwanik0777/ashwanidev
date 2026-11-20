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
          displayDesignation = "Hon'ble Chief Minister, Uttar Pradesh and Hon'ble Chancellor of Gautam Buddha University";
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

      {/* Mobile Campus View Background Image (Visible < lg with 10% opacity) */}
      <div className="block lg:hidden absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img
          src={gbuCampusView}
          alt="Gautam Buddha University Campus"
          className="w-full h-full object-cover object-center opacity-70 filter contrast-105"
        />
      </div>

      {/* Desktop Only (lg+): Full-height Left Campus Image Banner */}
      <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 h-full overflow-hidden pointer-events-none z-0">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row items-center justify-end gap-5 lg:gap-6">

          {/* Spacer to balance left 50% campus view on desktop */}
          <div className="hidden lg:block w-1/2 min-h-[220px] pointer-events-none" />

          {/* Right Side (50% Width on Desktop, 100% on Mobile/Tablet): VC & Chancellor Cards in RMNLU Style */}
          <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-4 items-stretch justify-center">
            {leaders.map((leader) => (
              <Link
                key={leader.id || leader.name}
                to={leader.url}
                className="w-full bg-white border-2 border-[#ea7a16] hover:border-orange-600 rounded-2xl p-3.5 sm:p-4 lg:p-5 flex flex-row lg:flex-col items-center text-left lg:text-center gap-2.5 sm:gap-3 lg:gap-1 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
              >
                {/* Leader Avatar Photo (Circular RMNLU Frame) */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm shrink-0 bg-slate-50 group-hover:border-orange-400 transition-colors duration-300 lg:mx-auto">
                  <img
                    src={getPhotoUrl(leader.photo)}
                    alt={leader.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Leader Details Block */}
                <div className="flex flex-col items-start lg:items-center text-left lg:text-center justify-center lg:justify-start min-w-0 flex-1">
                  <h3 className="font-extrabold text-[#1a2942] text-sm sm:text-base group-hover:text-orange-600 transition-colors leading-snug">
                    {leader.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-snug mt-0.5 lg:mt-1 max-w-[280px] lg:max-w-none">
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








