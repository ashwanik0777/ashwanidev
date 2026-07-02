import React, { useEffect, useRef, useState, useMemo } from "react";

const StatItem = ({
  icon: Icon,
  number,
  numberText,
  title,
  subtitle,
  iconColor = "#6b21a8",
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  // Parse numeric part and suffix from either number or numberText
  const parsed = useMemo(() => {
    if (typeof number === "number") {
      return { target: number, suffix: "", hasDigit: true };
    }
    
    const text = String(numberText || "");
    const match = text.match(/^(\d+)(.*)$/); // Match digits at the beginning
    if (match) {
      return {
        target: parseInt(match[1], 10),
        suffix: match[2] || "",
        hasDigit: true,
      };
    }
    
    return { target: 0, suffix: text, hasDigit: false };
  }, [number, numberText]);

  const animateCount = () => {
    let startTimestamp = null;
    const duration = 1500; // 1.5 seconds duration
    const startValue = 0;
    const endValue = parsed.target;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (endValue - startValue) + startValue);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(endValue); // Guarantee ending precisely on target
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
      { threshold: 0.15 } // Trigger when 15% visible
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

  const displayText = parsed.hasDigit ? count + parsed.suffix : parsed.suffix;

  return (
    <div
      ref={ref}
      className="text-center group transition-all duration-500 hover:shadow-xl shadow-md rounded-2xl p-6 md:p-8 border border-slate-100 hover:border-slate-200 bg-white transform hover:-translate-y-1.5"
    >
      {Icon && (
        <div className="p-3 bg-slate-50 rounded-2xl w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8" style={{ color: iconColor }} />
        </div>
      )}
      <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">
        {displayText}
      </div>
      {title && <div className="text-slate-700 font-bold text-sm md:text-base">{title}</div>}
      {subtitle && <div className="text-slate-400 text-xs mt-1 font-medium">{subtitle}</div>}
    </div>
  );
};

const StatsCard = ({ stats = [] }) => {
  const getGridClasses = () => {
    const count = stats.length;
    if (count === 4) {
      return "grid-cols-2 lg:grid-cols-4";
    } else if (count === 5) {
      return "grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
    } else if (count <= 2) {
      return "grid-cols-1 sm:grid-cols-2";
    } else if (count === 3) {
      return "grid-cols-1 sm:grid-cols-3";
    } else {
      return "grid-cols-2 lg:grid-cols-4"; // fallback
    }
  };

  return (
    <section className="relative py-8 px-4 bg-transparent overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className={`grid gap-6 ${getGridClasses()}`}>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              number={stat.number}
              numberText={stat.numberText}
              title={stat.title}
              subtitle={stat.subtitle}
              iconColor={stat.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCard;
