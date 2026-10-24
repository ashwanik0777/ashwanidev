import React from "react";

/**
 * Shared section heading for every department page section, so all schools'
 * departments use the same font size, weight, colour and accent bar.
 */
// Kept tight: two adjacent sections add their paddings, so ~32px between sections on desktop
export const SECTION_PADDING = "py-3 sm:py-4 min-[2560px]:py-8";
// Space between a section heading and its content
export const HEADING_SPACE = "mb-3 sm:mb-4 min-[2560px]:mb-6";
export const SECTION_GUTTER = "px-3 sm:px-4 lg:px-5";
export const SECTION_CONTAINER =
  "max-w-screen-2xl min-[1920px]:max-w-[1840px] min-[2560px]:max-w-[2400px] mx-auto";
// Side space reserved for slider arrows (faculty / achievers); also used where a section must match their width
export const SLIDER_SIDE_SPACE = "px-10 sm:px-12 min-[2560px]:px-20";
// Narrower width for text-heavy blocks (Dean / HOD message)
export const NARROW_CONTAINER =
  "max-w-5xl min-[1920px]:max-w-6xl min-[2560px]:max-w-[1800px] mx-auto";
// Vision & Mission cards: a little wider than the message cards
export const VISION_CONTAINER =
  "max-w-6xl min-[1920px]:max-w-7xl min-[2560px]:max-w-[2000px] mx-auto";

const SectionHeading = ({ children, className = HEADING_SPACE }) => (
  <div className={`text-center ${className}`}>
    <h2 className="text-2xl sm:text-3xl lg:text-4xl min-[2560px]:text-6xl font-bold text-blue-900 tracking-tight leading-tight">
      {children}
    </h2>
    <div className="w-16 sm:w-20 min-[2560px]:w-28 h-1 bg-blue-600 mx-auto mt-2 rounded-full" />
  </div>
);

export default SectionHeading;
