import React from "react";
import { withValue } from "./facultyTabData";

// Static class names only, so Tailwind can see them.
const TONES = {
  blue: { box: "from-blue-50 to-blue-100 border-blue-200", value: "text-blue-600", label: "text-blue-700" },
  green: { box: "from-green-50 to-green-100 border-green-200", value: "text-green-600", label: "text-green-700" },
  purple: { box: "from-purple-50 to-purple-100 border-purple-200", value: "text-purple-600", label: "text-purple-700" },
  orange: { box: "from-orange-50 to-orange-100 border-orange-200", value: "text-orange-600", label: "text-orange-700" },
};

/**
 * Row of count tiles for the profile tabs. Tiles with nothing to count are
 * left out, and the row renders nothing when no tile is left.
 * `stats`: [{ label, value, tone: "blue" | "green" | "purple" | "orange" }]
 */
const StatTiles = ({ stats, columns = "sm:grid-cols-2 lg:grid-cols-4", className = "" }) => {
  const shown = withValue(stats);
  if (!shown.length) return null;
  return (
    <div className={`grid gap-4 ${columns} ${className}`}>
      {shown.map((stat) => {
        const tone = TONES[stat.tone] || TONES.blue;
        return (
          <div
            key={stat.label}
            className={`rounded-lg border border-solid bg-gradient-to-br p-4 text-center transition-shadow duration-200 hover:shadow-md ${tone.box}`}
          >
            <div className={`text-2xl font-bold ${tone.value}`}>{stat.value}</div>
            <div className={`text-sm ${tone.label}`}>{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default StatTiles;
