import React, { useEffect, useRef, useState, useMemo } from "react";

const StatItem = ({
  icon: Icon,
  number,
  numberText,
  title,
  subtitle,
  iconColor = "#6b21a8",
  compact = true,
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  // Parse prefix, numeric target, leading zero pad, and suffix from number or numberText
  const parsed = useMemo(() => {
    if (typeof number === "number") {
      return { prefix: "", target: number, padLen: 0, suffix: "", hasDigit: true };
    }

    const text = String(numberText || number || "");
    const match = text.match(/^(.*?)(\d+)(.*)$/); // Match optional prefix, digits, and optional suffix
    if (match) {
      const rawDigits = match[2];
      const hasLeadingZero = rawDigits.length > 1 && rawDigits.startswith ? rawDigits.startsWith("0") : rawDigits[0] === "0";
      return {
        prefix: match[1] || "",
        target: parseInt(rawDigits, 10),
        padLen: hasLeadingZero ? rawDigits.length : 0,
        suffix: match[3] || "",
        hasDigit: true,
      };
    }

    return { prefix: "", target: 0, padLen: 0, suffix: text, hasDigit: false };
  }, [number, numberText]);

  const animateCount = () => {
    let startTimestamp = null;
    const duration = 1500; // 1.5 seconds animation
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
        setCount(endValue); // Ensure precise ending on target
      }
    };

    requestAnimationFrame(step);
  };

  useEffect(() => {
    if (!parsed.hasDigit || parsed.target <= 0) {
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
  }, [hasAnimated, parsed.hasDigit, parsed.target]);

  // Format current count display string with prefix, padding, and suffix
  const formattedNumber = useMemo(() => {
    if (!parsed.hasDigit) return parsed.suffix;
    let numStr = String(count);
    if (parsed.padLen > 0) {
      numStr = numStr.padStart(parsed.padLen, "0");
    }
    return `${parsed.prefix}${numStr}${parsed.suffix}`;
  }, [count, parsed]);

  return (
    <div
      ref={ref}
      className={`text-center group transition-all duration-300 hover:shadow-lg shadow-sm rounded-xl md:rounded-2xl border border-slate-100 hover:border-slate-200 bg-white transform hover:-translate-y-1 ${
        compact ? "p-3.5 sm:p-4" : "p-6 md:p-8"
      }`}
    >
      {Icon && (
        <div
          className={`${
            compact ? "p-2 w-10 h-10 mb-2 rounded-xl" : "p-3 w-16 h-16 mb-4 rounded-2xl"
          } bg-slate-50 mx-auto flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon
            className={compact ? "w-5 h-5" : "w-8 h-8"}
            style={{ color: iconColor }}
          />
        </div>
      )}
      <div
        className={`${
          compact ? "text-xl sm:text-2xl mb-0.5" : "text-3xl md:text-4xl mb-2"
        } font-extrabold text-slate-900 tracking-tight`}
      >
        {formattedNumber}
      </div>
      {title && (
        <div
          className={`${
            compact ? "text-xs sm:text-sm font-bold" : "text-sm md:text-base font-bold"
          } text-slate-700`}
        >
          {title}
        </div>
      )}
      {subtitle && (
        <div
          className={`${
            compact ? "text-[11px] sm:text-xs mt-0.5" : "text-xs mt-1"
          } text-slate-400 font-medium`}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

const StatsCard = ({ stats = [], compact = true }) => {
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
      return "grid-cols-2 lg:grid-cols-4";
    }
  };

  return (
    <section className="relative py-4 sm:py-6 px-4 bg-transparent overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div className={`grid gap-3 sm:gap-4 ${getGridClasses()}`}>
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              number={stat.number}
              numberText={stat.numberText}
              title={stat.title}
              subtitle={stat.subtitle}
              iconColor={stat.iconColor}
              compact={compact}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCard;
