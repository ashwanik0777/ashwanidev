import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { fetchSchoolWithin } from "../../services/schoolContentService";
import { parseImageUrl } from "../../utils/imageUtils";
import { VISITORS_SCHOOL_CODE, DEFAULT_VISITORS, formatVisitDate, normalizeVisitor, visitorInitials, visitorsFromContent } from "../visitors/visitorsModel";

// Seconds each card takes to cross, so the speed stays the same however many visitors there are.
const SECONDS_PER_CARD = 5;
// The track repeats the list until it is wide enough to loop without a gap on large screens.
const MIN_CARDS_PER_HALF = 8;

const imageSrc = (url) => (url.startsWith("/") && !url.startsWith("/uploads/") ? url : parseImageUrl(url, 600));

const VisitorCard = ({ visitor, copy }) => {
  const visited = formatVisitDate(visitor.visitDate);
  // A photo that fails to load shows the initials instead of a broken image.
  const [failed, setFailed] = useState(false);
  const card = (
    <article className="group h-full w-40 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:w-44 sm:p-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
        {visitor.photo && !failed ? (
          <img
            src={imageSrc(visitor.photo)}
            alt={copy ? "" : visitor.name}
            loading="lazy"
            draggable="false"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-blue-50 font-display text-3xl font-extrabold text-blue-700">
            {visitorInitials(visitor.name)}
          </div>
        )}
        {visited && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-blue-800 shadow-sm">
            <CalendarDays className="h-3 w-3" /> {visited}
          </span>
        )}
      </div>
      <div className="px-0.5 pb-0.5 pt-2.5 text-center">
        <h3 className="font-display text-sm font-bold leading-snug text-blue-950 sm:text-[15px]">{visitor.name}</h3>
        <span className="mx-auto mt-1.5 block h-0.5 w-7 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-12" />
        <p className="mt-1.5 line-clamp-2 min-h-[2rem] text-[11px] leading-4 text-slate-600 sm:text-xs">{visitor.designation}</p>
      </div>
    </article>
  );

  if (!visitor.link) return card;
  const linkProps = { className: "block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2", tabIndex: copy ? -1 : undefined };
  return /^https?:\/\//i.test(visitor.link) ? (
    <a href={visitor.link} target="_blank" rel="noopener noreferrer" {...linkProps}>
      {card}
    </a>
  ) : (
    <Link to={visitor.link} {...linkProps}>
      {card}
    </Link>
  );
};

const CardSkeleton = () => (
  <div className="w-40 shrink-0 animate-pulse rounded-2xl border border-slate-200 bg-white p-2.5 sm:w-44 sm:p-3">
    <div className="aspect-square rounded-xl bg-slate-200" />
    <div className="mx-auto mt-3 h-4 w-3/4 rounded bg-slate-200" />
    <div className="mx-auto mt-2.5 h-3 w-1/2 rounded bg-slate-200" />
  </div>
);

/*
 * "Distinguished Visitors": people who have visited the university, sliding sideways in a loop.
 * Managed from Admin dashboard > Distinguished Visitors.
 */
const DistinguishedVisitors = () => {
  const [visitors, setVisitors] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchSchoolWithin(VISITORS_SCHOOL_CODE).then((row) => {
      if (cancelled) return;
      // No answer from the API: show the starting list rather than an empty block.
      const list = row ? visitorsFromContent(row.content) : DEFAULT_VISITORS.map(normalizeVisitor);
      setVisitors(list.filter((visitor) => visitor.isActive));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (visitors && visitors.length === 0) return null;

  let half = visitors || [];
  while (half.length && half.length < MIN_CARDS_PER_HALF) half = [...half, ...visitors];
  const track = [...half, ...half];

  return (
    <section className="overflow-hidden border-y border-slate-100 bg-slate-50 pb-4 pt-6 md:pb-5 md:pt-8" aria-labelledby="visitors-heading">
      <div className="mb-4 px-4 text-center md:mb-5">
        <h2 id="visitors-heading" className="text-2xl font-bold text-blue-800 sm:text-3xl md:text-4xl">
          Distinguished Visitors
        </h2>
        <div className="mx-auto mt-2.5 h-1 w-20 rounded-full bg-blue-600" />
       
      </div>

      {!visitors ? (
        <div className="flex justify-center gap-4 px-4 py-2 sm:gap-5" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className={i >= 2 ? "hidden md:block" : i === 1 ? "hidden min-[440px]:block" : ""}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="visitors-marquee relative">
          <ul className="visitors-track flex w-max py-2" style={{ animationDuration: `${half.length * SECONDS_PER_CARD}s` }}>
            {track.map((visitor, index) => {
              // Only the first copy of each visitor is read out and reachable by keyboard.
              const copy = index >= visitors.length;
              return (
                <li key={`${visitor.id}-${index}`} className="pl-4 sm:pl-5" aria-hidden={copy ? "true" : undefined}>
                  <VisitorCard visitor={visitor} copy={copy} />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <style>{`
        @keyframes visitors-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .visitors-track { animation: visitors-scroll linear infinite; }
        .visitors-marquee:hover .visitors-track,
        .visitors-marquee:focus-within .visitors-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .visitors-track { animation: none; }
          .visitors-marquee { overflow-x: auto; }
        }
      `}</style>
    </section>
  );
};

export default DistinguishedVisitors;
