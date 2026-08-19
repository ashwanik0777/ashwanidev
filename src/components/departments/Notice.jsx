import { Calendar } from "lucide-react";
import { useRef, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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
        to={`/announcements/event-calendar/${current.id}`}
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
          <h4 className="font-semibold text-white text-sm sm:text-base leading-snug line-clamp-2 drop-shadow-lg">
            {current.title}
          </h4>
          {current.date && (
            <p className="text-xs text-blue-200 mt-1 font-medium">{current.date}</p>
          )}
        </div>

        {/* Dot indicators */}
        {events.length > 1 && (
          <div className="absolute bottom-3 right-3 flex gap-1.5 z-10" onClick={(e) => e.preventDefault()}>
            {events.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); goTo(i); }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
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
        <div className="mt-3 overflow-x-auto flex gap-2 pb-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
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
                  className="w-20 h-14 sm:w-24 sm:h-16 object-cover"
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

const NoticeEvents = ({ schoolCode, notices: fallbackNotices = [], events: fallbackEvents = [] }) => {
  const scrollRef = useRef(null);
  const [announcements, setAnnouncements] = useState(() => getSchoolAnnouncements(schoolCode));
  const schoolMeta = useMemo(() => getSchoolMeta(schoolCode), [schoolCode]);

  // Auto-scroll effect
  useEffect(() => {
    const scrollEl = scrollRef.current;
    let scrollSpeed = 1;
    let intervalId;

    const startScroll = () => {
      intervalId = setInterval(() => {
        if (!scrollEl) return;

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

  const notices = filterBySchool(announcements.notices || [], schoolMeta);
  const events = filterBySchool(announcements.events || [], schoolMeta);
  const visibleNotices = notices;
  const visibleEvents = events;

  return (
    <section className="py-8 sm:py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
            Notices and Events
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Notice Board */}
          <div className="lg:col-span-4">
            <div className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 h-[37.5rem] flex flex-col relative pb-16">
              <div className="text-blue-800 text-lg font-bold flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={20} />
                  Notice Board
                </div>
              </div>

             
              {/* Auto-Scrolling Notice List */}
              <div
                ref={scrollRef}
                className="space-y-4 flex-grow overflow-y-auto pr-2 scrollbar-hide"
                style={{
                  scrollbarWidth: "none", // Firefox
                  msOverflowStyle: "none", // IE 10+
                }}
              >
                {visibleNotices.map((notice, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 pl-4 py-2 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-sm text-blue-900">
                        {notice.title}
                      </h4>
                      <Badge className="text-xs px-2 py-0.5 capitalize bg-blue-100 text-blue-800 whitespace-nowrap ml-2">
                        {notice.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500">{notice.date}</p>
                  </div>
                ))}
                {visibleNotices.length === 0 ? (
                  <p className="text-sm text-gray-500">No notices available.</p>
                ) : null}
              </div>

              {/* View More Button */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white rounded-b-xl flex justify-center">
                <Link
                  to={`/schools/${schoolCode}/about/activities`}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 group"
                >
                  View All Notices
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Event Gallery */}
          <div className="lg:col-span-8">
            <div className="rounded-xl shadow-lg border border-gray-200 bg-white p-4 sm:p-6 h-[37.5rem] flex flex-col">
              <h3 className="text-blue-800 text-lg font-bold mb-3">
                Event Gallery
              </h3>

              {visibleEvents.length > 0 ? (
                <EventGallerySlider events={visibleEvents} />
              ) : (
                <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
                  No events available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeEvents;

