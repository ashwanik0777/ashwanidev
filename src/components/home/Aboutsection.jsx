import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Users, School, BookMarked, Briefcase, Compass, TrendingUp, ArrowRight } from "lucide-react";
import homeData from "../../Data/home.json";
import SearchableWrapper from "../Searchbar/SearchableWrapper";
import { useUniversityStats } from "../../hooks/useUniversityStats";

const BASE_URL = (import.meta.env.VITE_HOST || "").replace(/\/$/, "");

// --- Utility ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Individual Animated Stat Item ---
const StatItem = ({ label, rawValue, icon: Icon, color }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  const parsed = useMemo(() => {
    const text = String(rawValue || "0");
    const match = text.match(/^(\d+)(.*)$/); 
    if (match) {
      return { target: parseInt(match[1], 10), suffix: match[2] || "" };
    }
    return { target: 0, suffix: text };
  }, [rawValue]);

  useEffect(() => {
    if (parsed.target <= 0) {
      setCount(0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          let startTimestamp = null;
          const duration = 1500;
          const startValue = 0;
          const endValue = parsed.target;

          const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress * (2 - progress);
            setCount(Math.floor(easeProgress * (endValue - startValue) + startValue));
            
            if (progress < 1) requestAnimationFrame(step);
            else setCount(endValue);
          };
          requestAnimationFrame(step);
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current && !hasAnimated) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, [hasAnimated, parsed.target]);

  const displayText = parsed.target > 0 ? count + parsed.suffix : parsed.suffix;

  return (
    <div ref={ref} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
      <div className={cn("p-3 rounded-xl shrink-0 bg-opacity-10", color.bg, color.text)}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-1">
          {displayText}
        </div>
        <div className="text-sm font-medium text-slate-500">
          {label}
        </div>
      </div>
    </div>
  );
};

export default function AboutSection() {
  const aboutData = homeData?.sections?.about?.[0] || null;
  const { stats } = useUniversityStats();

  if (!aboutData) return <div className="text-center py-10">Loading...</div>;

  const imageSrc = /^https?:\/\//i.test(aboutData.image || "")
    ? aboutData.image
    : (aboutData.image || "").startsWith("/")
      ? aboutData.image
    : BASE_URL
      ? `${BASE_URL}/${(aboutData.image || "").startsWith("media/") ? aboutData.image : `media/${aboutData.image || ""}`}`
      : `/${aboutData.image || ""}`;

  // Stat definitions
  const statItems = [
    { label: "Students", rawValue: stats?.students || "6500+", icon: Users, color: { bg: "bg-blue-500", text: "text-white" } },
    { label: "Faculty", rawValue: stats?.faculty || "300+", icon: BookMarked, color: { bg: "bg-emerald-500", text: "text-white" } },
    { label: "Acres Campus", rawValue: "511", icon: Compass, color: { bg: "bg-orange-500", text: "text-white" } },
    { label: "Programs", rawValue: stats?.programs || "120+", icon: School, color: { bg: "bg-purple-500", text: "text-white" } },
  ];

  return (
    <SearchableWrapper>
      <section className="bg-white py-8 md:py-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
            
            {/* Left Content (Text + Stats) */}
            <div className="lg:w-5/12 flex flex-col justify-center items-start text-left py-4 relative z-10">
              
              <h2 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight mb-6">
                {aboutData.title || "Gautam Buddha University"}
              </h2>

              <div className="prose prose-slate prose-lg text-slate-600 mb-10 max-w-none">
                {aboutData.description &&
                  aboutData.description.split(/\r?\n\r?\n/).map((para, index) => (
                    <p key={index} className="mb-4 leading-relaxed">
                      {para}
                    </p>
                  ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full mb-10">
                {statItems.map((item, idx) => (
                  <StatItem key={idx} {...item} />
                ))}
              </div>

              {/* Actions */}
              {aboutData.button1_text && aboutData.button1_url && (
                <a
                  href={aboutData.button1_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:shadow-xl shadow-blue-600/30"
                >
                  {aboutData.button1_text}
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Right Content (Image) */}
            <div className="lg:w-7/12 relative w-full min-h-[400px]">
              
              <div className="relative w-full h-full">
                <img
                  src={aboutData.image ? imageSrc : "https://via.placeholder.com/800x600?text=GBU+Campus"}
                  alt={aboutData.title || "Campus View"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Seamless Edge Blending Overlays */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-48 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                
                {/* Floating Badge (Original 17+ Years) */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 text-center flex flex-col items-center justify-center">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600 leading-none mb-1">
                    17+
                  </div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Years of<br />Excellence
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </SearchableWrapper>
  );
}
