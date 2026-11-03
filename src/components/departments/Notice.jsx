import { createSlug } from "../../utils/slugUtil";
import { Calendar, Bell, Images, ArrowRight } from "lucide-react";
import { useRef, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading, { SECTION_PADDING, SECTION_CONTAINER, SLIDER_SIDE_SPACE, HEADING_SPACE } from "./SectionHeading";

// Shared card look for Notice Board and Event Gallery (same as the department cards)
const CARD_CLASSES =
  "flex flex-col bg-white border border-slate-200 rounded-xl sm:rounded-2xl shadow-sm overflow-hidden";
// Both cards share one height so they line up side by side; shorter on mobile where they stack
const CARD_HEIGHT =
  "h-[27rem] sm:h-[31rem] lg:h-[34rem] min-[1920px]:h-[38rem] min-[2560px]:h-[52rem]";
const CARD_HEADER =
  "shrink-0 flex items-center justify-between gap-2 px-4 sm:px-5 min-[2560px]:px-8 py-3 min-[2560px]:py-5 border-b border-slate-100";
const CARD_ICON =
  "p-1.5 min-[2560px]:p-2.5 rounded-lg bg-blue-600 text-white";
const CARD_TITLE = "text-base sm:text-lg min-[2560px]:text-3xl font-bold text-blue-900";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-07-09" (or any parseable date) -> { day: "09", month: "Jul", year: 2026 }; null if unparseable. */
const splitDate = (value) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: MONTHS[date.getMonth()],
    year: date.getFullYear(),
  };
};
import { getSchoolMeta } from "../../utils/schoolMeta";
import { parseImageUrl } from "../../utils/imageUtils.js";
import {
  getSchoolAnnouncements,
  refreshSchoolAnnouncements,
  syncAnnouncementsFromCache,
} from "../../utils/schoolAnnouncements";

// Badge Component
const Badge = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

const matchesSchool = (item, meta) => {
  if (!meta || !meta.matchTokens?.length) return true;
  const labelCandidates = [
    item?.schoolName,
    item?.school,
    item?.department,
    item?.school_name,
    item?.title,
    item?.description,
    item?.content,
    item?.organizer,
  ]
    .filter(Boolean)
    .map((value) => String(value).toLowerCase());

  return labelCandidates.some((label) =>
    meta.matchTokens.some((token) => label.includes(String(token).toLowerCase()))
  );
};

const filterBySchool = (items, meta) => {
  if (!Array.isArray(items) || !items.length) return [];
  if (!meta?.matchTokens?.length) return items;

  const filtered = items.filter((item) => matchesSchool(item, meta));
  if (filtered.length) return filtered;

  const hasSchoolTags = items.some(
    (item) => item?.schoolName || item?.school || item?.department || item?.school_name || item?.organizer
  );
  return hasSchoolTags ? filtered : items;
};

/** Resolve the best available image URL from an event object. */
const resolveEventImage = (event) => {
  const raw =
    event?.coverImageUrl ||
    event?.cover_image ||
    event?.image ||
    event?.coverImage ||
    (Array.isArray(event?.images) ? event.images[0] : null) ||
    "";
  return raw ? parseImageUrl(raw) : "";
};

/* ─── Gallery Slider (matches home page "Ongoing Events" design) ─── */
const EventGallerySlider = ({ events = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (events.length <= 1) return;
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % events.length);
        setTransitioning(false);
      }, 150);
    }, 4000);
    return () => clearInterval(timer);
  }, [events.length]);

  const goTo = (idx) => {
    if (transitioning || idx === activeIndex) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveIndex(idx);
      setTransitioning(false);
    }, 150);
  };

  const current = events[activeIndex];
  const imgSrc = resolveEventImage(current) || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"; // Dummy event image

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Main Image */}
            <Link
        to={current.link || (current.id ? `/announcements/event/${current.title ? createSlug(current.title) : current.id}` : "#")}
        className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden shadow-md group block bg-gray-100"
      >
        <img
          src={imgSrc}
          alt={current.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
            transitioning ? "scale-110 opacity-80 blur-[2px]" : "scale-100 opacity-100 blur-0"
          }`}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Caption overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 py-3 pt-12">
          <h4 className="font-semibold text-white text-sm sm:text-base min-[2560px]:text-2xl leading-snug line-clamp-2 drop-shadow-lg pr-16">
            {current.title}
          </h4>
          {current.date && (
            <p className="text-xs min-[2560px]:text-lg text-blue-200 mt-1 font-medium">{current.date}</p>
          )}
        </div>

        {/* Dot indicators */}
        {events.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5 z-10" onClick={(e) => e.preventDefault()}>
            {events.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }}
                className={`w-2 h-2 min-[2560px]:w-3.5 min-[2560px]:h-3.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "bg-white scale-125 shadow shadow-white/50"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}
      </Link>

      {/* Thumbnail strip */}
      {events.length > 1 && (
        <div className="mt-2.5 overflow-x-auto flex gap-2 p-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`.evt-thumbs::-webkit-scrollbar{display:none}`}</style>
          {events.map((evt, i) => {
            const thumbSrc = resolveEventImage(evt);
            return (
              <div
                key={evt.id || i}
                onClick={() => goTo(i)}
                className={`cursor-pointer flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                  i === activeIndex
                    ? "ring-2 ring-blue-500 scale-105 shadow-md"
                    : "opacity-70 hover:opacity-100 hover:ring-1 hover:ring-blue-300"
                }`}
              >
                <img
                  src={thumbSrc || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"}
                  alt={evt.title}
                  className="w-16 h-11 sm:w-20 sm:h-14 lg:w-24 lg:h-16 min-[2560px]:w-36 min-[2560px]:h-24 object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Progress bar */}
      {events.length > 1 && (
        <div className="mt-2 w-full bg-gray-100 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-linear"
            style={{ width: `${((activeIndex + 1) / events.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

const NoticeEvents = ({ schoolCode, customNotices = null, customEvents = null, title = "Notices and Events", viewAllLink }) => {
  const scrollRef = useRef(null);
  const pausedRef = useRef(false);
  const [announcements, setAnnouncements] = useState(() => getSchoolAnnouncements(schoolCode));
  const schoolMeta = useMemo(() => getSchoolMeta(schoolCode), [schoolCode]);

  // Auto-scroll effect
  useEffect(() => {
    const scrollEl = scrollRef.current;
    let scrollSpeed = 1;
    let intervalId;

    const startScroll = () => {
      intervalId = setInterval(() => {
        if (!scrollEl || pausedRef.current) return;

        scrollEl.scrollTop += scrollSpeed;

        if (scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight) {
          scrollEl.scrollTop = 0;
        }
      }, 30);
    };

    startScroll();

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadAnnouncements = async () => {
      if (customNotices !== null && customEvents !== null) return;
      try {
        await refreshSchoolAnnouncements(schoolCode);
      } catch {
        syncAnnouncementsFromCache();
      }

      if (mounted) {
        setAnnouncements(getSchoolAnnouncements(schoolCode));
      }
    };

    loadAnnouncements();
    window.addEventListener("announcements-data-updated", loadAnnouncements);
    window.addEventListener("focus", loadAnnouncements);

    return () => {
      mounted = false;
      window.removeEventListener("announcements-data-updated", loadAnnouncements);
      window.removeEventListener("focus", loadAnnouncements);
    };
  }, [schoolCode]);

  const notices = customNotices !== null ? customNotices : filterBySchool(announcements.notices || [], schoolMeta);
  const events = customEvents !== null ? customEvents : filterBySchool(announcements.events || [], schoolMeta);
  const visibleNotices = notices;
  const visibleEvents = events;

  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <SectionHeading className={`${HEADING_SPACE} px-4`}>{title}</SectionHeading>

      {/* Same width as the faculty / departments sections */}
      <div className={`${SECTION_CONTAINER} ${SLIDER_SIDE_SPACE}`}>
        <div className="grid lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 min-[2560px]:gap-12">
          {/* Notice Board */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className={`${CARD_CLASSES} ${CARD_HEIGHT}`}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2.5">
                  <span className={CARD_ICON}>
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 min-[2560px]:w-8 min-[2560px]:h-8" />
                  </span>
                  <h3 className={CARD_TITLE}>Notice Board</h3>
                </div>
                {visibleNotices.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs min-[2560px]:text-lg font-semibold">
                    {visibleNotices.length}
                  </span>
                )}
              </div>

              {/* Auto-Scrolling Notice List (pauses on hover) */}
              <div
                ref={scrollRef}
                onMouseEnter={() => (pausedRef.current = true)}
                onMouseLeave={() => (pausedRef.current = false)}
                className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-4 py-3 space-y-2 min-[2560px]:space-y-4"
                style={{
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE 10+
                }}
              >
                {visibleNotices.map((notice, index) => {
                  const noticeUrl = notice.pdfUrl || notice.link || (notice.id ? `/announcements/news/${createSlug(notice.title)}` : '#');
                  const isExternal = noticeUrl.startsWith('http') || noticeUrl.endsWith('.pdf');
                  const dateParts = splitDate(notice.date);

                  const InnerContent = (
                    <>
                      {/* Date tile */}
                      <div className="shrink-0 w-11 sm:w-12 min-[2560px]:w-20 rounded-lg bg-blue-600 text-white text-center py-1 min-[2560px]:py-2 leading-none">
                        {dateParts ? (
                          <>
                            <div className="text-base sm:text-lg min-[2560px]:text-3xl font-bold">{dateParts.day}</div>
                            <div className="text-[10px] min-[2560px]:text-base uppercase tracking-wide mt-0.5">{dateParts.month}</div>
                          </>
                        ) : (
                          <Calendar className="w-5 h-5 mx-auto my-1.5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-xs sm:text-sm min-[2560px]:text-xl text-slate-800 group-hover:text-blue-700 leading-snug line-clamp-2">
                          {notice.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <Badge className="text-[10px] sm:text-[11px] min-[2560px]:text-base px-2 py-0 capitalize border-blue-100 bg-blue-50 text-blue-700">
                            {notice.type || 'Notice'}
                          </Badge>
                          {dateParts?.year && (
                            <span className="text-[11px] min-[2560px]:text-base text-slate-500">{dateParts.year}</span>
                          )}
                        </div>
                      </div>
                    </>
                  );

                  const commonClasses = "group flex items-start gap-3 p-2.5 min-[2560px]:p-4 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors";

                  return isExternal ? (
                    <a
                      href={noticeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                      className={commonClasses}
                    >
                      {InnerContent}
                    </a>
                  ) : (
                    <Link to={noticeUrl} key={index} className={commonClasses}>
                      {InnerContent}
                    </Link>
                  );
                })}
                {visibleNotices.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 gap-2">
                    <Bell className="w-8 h-8 min-[2560px]:w-14 min-[2560px]:h-14" />
                    <p className="text-sm min-[2560px]:text-xl">No notices available.</p>
                  </div>
                ) : null}
              </div>

              {/* View All */}
              <div className="shrink-0 px-4 py-2.5 min-[2560px]:py-4 border-t border-slate-100 flex justify-center">
                <Link
                  to={viewAllLink || (schoolCode ? `/schools/${schoolCode}/about/activities` : "#")}
                  className="text-sm min-[2560px]:text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group"
                >
                  View All Notices
                  <ArrowRight className="w-4 h-4 min-[2560px]:w-6 min-[2560px]:h-6 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Event Gallery */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className={`${CARD_CLASSES} ${CARD_HEIGHT}`}>
              <div className={CARD_HEADER}>
                <div className="flex items-center gap-2.5">
                  <span className={CARD_ICON}>
                    <Images className="w-4 h-4 sm:w-5 sm:h-5 min-[2560px]:w-8 min-[2560px]:h-8" />
                  </span>
                  <h3 className={CARD_TITLE}>Event Gallery</h3>
                </div>
              </div>

              <div className="flex-1 min-h-0 flex flex-col p-3 sm:p-4 min-[2560px]:p-6">
                {visibleEvents.length > 0 ? (
                  <EventGallerySlider events={visibleEvents} />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 gap-2">
                    <Images className="w-8 h-8 min-[2560px]:w-14 min-[2560px]:h-14" />
                    <p className="text-sm min-[2560px]:text-xl">No events available.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeEvents;

