import React from "react";

/**
 * Animated "NEW" star badge (public/assets/badges/new.svg). The motion lives inside the SVG,
 * so it also works as a plain <img> anywhere on the site. It is square; 24px or more keeps
 * the word readable.
 */
const NewBadge = ({ className = "h-6 w-6" }) => (
  <img
    src="/assets/badges/new.svg"
    alt="New"
    width="64"
    height="64"
    draggable="false"
    className={`inline-block w-auto shrink-0 select-none ${className}`}
  />
);

export default NewBadge;
