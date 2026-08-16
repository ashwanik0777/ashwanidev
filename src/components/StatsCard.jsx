import React, { useMemo } from "react";

const StatItem = ({
  icon: Icon,
  number,
  numberText,
  title,
  subtitle,
  iconColor = "#6b21a8",
  compact = true,
}) => {
  // Directly format the display text from number or numberText without starting at 0
  const displayText = useMemo(() => {
    if (numberText !== undefined && numberText !== null) {
      return String(numberText);
    }
    if (typeof number === "number") {
      return number.toLocaleString();
    }
    return String(number || "");
  }, [number, numberText]);

  return (
    <div
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
        {displayText}
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
