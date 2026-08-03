import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Compass,
  School,
  BookMarked,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import homeData from "../../Data/home.json";
import { useUniversityStats } from "../../hooks/useUniversityStats";

// --- Utility ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Individual Stat Item with Premium Counter & Interactive Design ---
const GlanceStatItem = ({ label, rawValue, description, icon: Icon, iconColor, themeColor }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  // Parse numeric part and suffix (e.g., "6500+" -> target: 6500, suffix: "+")
  const parsed = useMemo(() => {
    if (typeof rawValue === "number") {
      return { target: rawValue, suffix: "" };
    }
    const text = String(rawValue || "");
    const match = text.match(/^(\d+)(.*)$/); // Match digits at the beginning
    if (match) {
      return {
        target: parseInt(match[1], 10),
        suffix: match[2] || "",
      };
    }
    return { target: 0, suffix: text };
  }, [rawValue]);

  const animateCount = () => {
    let startTimestamp = null;
    const duration = 1600; // Smooth 1.6s duration
    const startValue = 0;
    const endValue = parsed.target;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Beautiful deceleration (easeOutQuad)
      const easeProgress = progress * (2 - progress);
      const currentValue = Math.floor(easeProgress * (endValue - startValue) + startValue);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (parsed.target <= 0) {
      setCount(0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount();
          setHasAnimated(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current && !hasAnimated) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated, parsed.target]);

  const displayText = parsed.target > 0 ? count + parsed.suffix : parsed.suffix;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 16 
      } 
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      ref={ref}
      tabIndex={0}
      className={cn(
        "group rounded-3xl p-5 md:p-6 bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)]",
        "hover:shadow-2xl hover:border-slate-300/40 hover:-translate-y-2.5 focus:-translate-y-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500 ease-out flex flex-col items-center text-center relative overflow-hidden"
      )}
    >
      {/* Dynamic Background Hover Accent Spotlight */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br pointer-events-none",
        themeColor
      )} />

      {/* Decorative corner glow */}
      <div className={cn(
        "absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-10 transition-all duration-500 group-hover:opacity-25 group-hover:scale-125 bg-gradient-to-br", 
        themeColor
      )} />

      {/* Double-Ringed Icon Container */}
      <div className="relative mb-5 flex items-center justify-center">
        {/* Outer pulsating dashed border on hover */}
        <div className="absolute inset-0 -m-1.5 rounded-2xl border border-dashed opacity-0 scale-90 group-hover:scale-100 group-hover:opacity-60 transition-all duration-500" style={{ borderColor: iconColor }} />
        
        {/* Inner circle */}
        <div className="relative p-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 ease-out shadow-sm overflow-hidden">
          {/* Subtle color splash on hover inside icon bg */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: iconColor }} />
          <Icon className="h-6.5 w-6.5 relative z-10 transition-transform duration-500 group-hover:scale-105" style={{ color: iconColor }} />
        </div>
      </div>

      {/* Counter number */}
      <p className={cn(
        "text-4xl md:text-5xl font-black tracking-tight mb-2 bg-gradient-to-br bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105 select-none", 
        themeColor
      )}>
        {displayText}
      </p>

      {/* Label */}
      <p className="text-slate-800 font-extrabold text-xs md:text-sm leading-snug uppercase tracking-wider mt-1 group-hover:text-slate-900 transition-colors duration-300">
        {label}
      </p>

      {/* Elegant informative Subtext Description */}
      <p className="text-slate-500 text-xs mt-2 font-normal leading-relaxed max-w-[200px] group-hover:text-slate-600 transition-colors duration-300">
        {description}
      </p>
    </motion.div>
  );
};

const Glance = () => {
  const glanceData = homeData?.sections?.glance_stat?.[0] || null;
  // Figures come from the single university-stats source so this section can
  // never disagree with the About / Admissions / Campus Life pages.
  const universityStats = useUniversityStats();

  const stats = [
    {
      label: "Acres Campus",
      value: universityStats.acres_campus,
      description: "Lush green, eco-friendly smart campus design",
      icon: Compass,
      iconColor: "#10b981", // Emerald-500
      themeColor: "from-emerald-600 to-teal-600",
    },
    {
      label: "Academic Schools",
      value: universityStats.academic_schools,
      description: "Multidisciplinary research and learning centers",
      icon: School,
      iconColor: "#2563eb", // Blue-600
      themeColor: "from-blue-600 to-indigo-600",
    },
    {
      label: "Dynamic Programs",
      value: universityStats.programs,
      description: "Comprehensive industry-aligned global curricula",
      icon: BookMarked,
      iconColor: "#6366f1", // Indigo-500
      themeColor: "from-indigo-600 to-violet-600",
    },
    {
      label: "Enrolled Students",
      value: universityStats.students,
      description: "Vibrant, diverse community of future leaders",
      icon: Users,
      iconColor: "#8b5cf6", // Violet-500
      themeColor: "from-violet-600 to-purple-600",
    },
    {
      label: "Expert Faculty",
      value: universityStats.faculty_members,
      description: "Distinguished scholars and industry pioneers",
      icon: Briefcase,
      iconColor: "#f97316", // Orange-500
      themeColor: "from-orange-500 to-amber-500",
    },
    {
      label: "Placement Rate",
      value: universityStats.placement_rate,
      description: "Excellent career pathways & global network",
      icon: TrendingUp,
      iconColor: "#f43f5e", // Rose-500
      themeColor: "from-rose-500 to-pink-500",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section
      aria-label="GBU statistics overview"
      className="relative py-24 md:py-28 bg-slate-50/70 border-y border-slate-200/60 overflow-hidden bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]"
    >
      {/* Background ambient grids/bubbles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft floating blur circles */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-100/40 rounded-full blur-[120px] opacity-40 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-100/40 rounded-full blur-[120px] opacity-35 animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/30 rounded-full blur-[150px] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 flex flex-col items-center">
          {/* Glowing Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-100/80 backdrop-blur-md shadow-sm mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-blue-750 uppercase tracking-widest leading-none">University Metrics</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight capitalize">
            {glanceData?.label || "GBU at a Glance"}
          </h2>
          
          {/* Premium multi-layered divider line */}
          <div className="flex items-center gap-3 my-5 w-full max-w-xs">
            <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="p-1 rounded-full bg-slate-100 border border-slate-200">
              <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
          </div>

          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            Explore the key milestones, massive infrastructure, and outstanding achievements that place Gautam Buddha University at the forefront of global education.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-6 md:gap-8"
        >
          {stats.map((stat) => (
            <GlanceStatItem
              key={stat.label}
              label={stat.label}
              rawValue={stat.value}
              description={stat.description}
              icon={stat.icon}
              iconColor={stat.iconColor}
              themeColor={stat.themeColor}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Glance;
