import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import homeData from "../../Data/home.json";

const cardVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const VisionaryLeadership = () => {
  const [leaders, setLeaders] = useState([]);
  const [index, setIndex] = useState(0);

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

      // Add dynamic fallback routes for Chancellor and Vice-Chancellor details if URL is null
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
        return { ...leader, url: targetUrl };
      });

      setLeaders(mapped);
    }
  }, []);

  useEffect(() => {
    if (leaders.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % leaders.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [leaders]);

  if (leaders.length === 0) {
    return (
      <section className="py-16 text-center text-blue-800">
        <p>Loading Visionary Leadership...</p>
      </section>
    );
  }

  const current = leaders[index];
  const fullImageUrl = current.photo?.includes("http")
    ? current.photo
    : current.photo?.startsWith("/")
      ? current.photo
      : BASE_URL
        ? `${BASE_URL}/${current.photo.startsWith("media") ? "" : "media/"}${current.photo}`
        : `/${current.photo}`;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-100 via-white to-green-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-10 sm:mb-12">
        Visionary <span className="text-blue-800">Leadership</span>
      </h2>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            variants={cardVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8 }}
            className="w-full bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-blue-200 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-10"
          >
            {/* Interactive Image Link with View Message Hover Overlay */}
            <Link 
              to={current.url} 
              className="group/img block shrink-0 relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 w-60 h-56 sm:w-48 sm:h-64 md:w-[220px] md:h-[300px]"
            >
              <img
                src={fullImageUrl}
                alt={current.name}
                className="w-full h-full object-cover rounded-2xl transform transition-transform duration-500 group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="bg-white/95 text-blue-950 px-4 py-1.5 rounded-full text-xs font-bold shadow-md border border-blue-100 transform translate-y-2 group-hover/img:translate-y-0 transition-all duration-300">
                  View Message
                </span>
              </div>
            </Link>

            <div className="text-center md:text-left flex-1">
              {/* Interactive Title Link with Hover Underline Effect */}
              <Link to={current.url} className="inline-block group/title mb-1 sm:mb-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-900 group-hover/title:text-blue-700 transition-colors duration-300 relative">
                  {current.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-700 group-hover/title:w-full transition-all duration-300" />
                </h3>
              </Link>
              
              <p className="text-sm sm:text-base text-gray-600 mb-4 font-semibold tracking-wide">
                {current.designation}
              </p>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                {current.message}
              </p>

              {/* Read Full Message CTA Button */}
              <div>
                <Link
                  to={current.url}
                  className="group/btn inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 hover:border-blue-200 shadow-sm hover:shadow transition-all duration-300"
                >
                  <span>Read Full Message</span>
                  <ArrowRight className="w-4 h-4 text-blue-700 transform group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-3">
          {leaders.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === index ? "bg-blue-600 scale-125" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionaryLeadership;

