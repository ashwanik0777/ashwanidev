import React from "react";
import { Facebook, Globe, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import { categoryIcon, imageSrc, socialEntries } from "../clubUi";

const initialsOf = (name) =>
  String(name || "")
    .replace(/^(prof|dr|mr|mrs|ms)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

// A person's photo, or their initials on a light circle when there is none.
// onTint: the avatar sits on a light blue panel, so the initials get a white circle.
export const Avatar = ({ name, photo, onTint = false, className = "h-16 w-16 text-lg" }) =>
  photo ? (
    <img src={imageSrc(photo, 400)} alt={name} loading="lazy" className={`shrink-0 rounded-full object-cover object-top ${className}`} />
  ) : (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-bold text-blue-700 ${onTint ? "bg-white" : "bg-blue-50"} ${/\bring-/.test(className) ? "" : "ring-1 ring-blue-100"} ${className}`}
    >
      {initialsOf(name)}
    </span>
  );

// The club logo, or the category icon when the club has none yet.
export const ClubLogo = ({ club, className = "h-14 w-14", iconClassName = "h-7 w-7" }) => {
  const Icon = categoryIcon(club.category);
  return club.logo ? (
    <img src={imageSrc(club.logo, 400)} alt={`${club.name} logo`} className={`shrink-0 bg-white object-cover ${className}`} />
  ) : (
    <span className={`flex shrink-0 items-center justify-center bg-blue-50 text-blue-600 ${className}`}>
      <Icon className={iconClassName} />
    </span>
  );
};

const SOCIAL_ICONS = { instagram: Instagram, linkedin: Linkedin, youtube: Youtube, facebook: Facebook, twitter: Twitter, website: Globe };
const SOCIAL_HOVER = {
  instagram: "hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600",
  linkedin: "hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700",
  youtube: "hover:border-red-200 hover:bg-red-50 hover:text-red-600",
  facebook: "hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
  twitter: "hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900",
  website: "hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700",
};

export const SocialLinks = ({ club, size = "h-10 w-10" }) => {
  const links = socialEntries(club);
  if (!links.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ key, label, url }) => {
        const Icon = SOCIAL_ICONS[key];
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${club.name} on ${label}`}
            title={label}
            className={`flex ${size} items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition duration-200 hover:-translate-y-0.5 ${SOCIAL_HOVER[key]}`}
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        );
      })}
    </div>
  );
};

// A content block on the club page, with the site's heading style (blue title, short accent bar).
export const Section = ({ id, title, action, children }) => (
  <section id={id} data-club-section className="animate-club-fade scroll-mt-40 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:scroll-mt-44 sm:p-8">
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-xl font-bold tracking-tight text-blue-950 sm:text-2xl">{title}</h2>
        <span className="mt-2 block h-1 w-12 rounded-full bg-blue-600" />
      </div>
      {action}
    </div>
    {children}
  </section>
);

// Renders an icon component passed around as data (lists of facts, steps ...).
export const Glyph = ({ icon, ...props }) => {
  const Icon = icon;
  return <Icon {...props} />;
};

export const SubHeading = ({ icon, children }) => (
  <h3 className="flex items-center gap-2 font-display text-base font-bold text-slate-900">
    {icon && <Glyph icon={icon} className="h-5 w-5 text-blue-600" />}
    {children}
  </h3>
);
