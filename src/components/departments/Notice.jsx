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

const NoticeEvents = ({ schoolCode, notices: fallbackNotices = [], events: fallbackEvents = [] }) => {
  const scrollRef = useRef(null);
  const [announcements, setAnnouncements] = useState(() => getSchoolAnnouncements());
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
        setAnnouncements(getSchoolAnnouncements());
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
  }, []);

  const notices = filterBySchool(announcements.notices || [], schoolMeta);
  const events = filterBySchool(announcements.events || [], schoolMeta);
  const visibleNotices = notices;
  const visibleEvents = events;

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
            Notices and Events
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-10 gap-10">
          {/* Notice Board */}
          <div className="lg:col-span-3">
            <div className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 h-[37.5rem] flex flex-col">
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
                  maxHeight: "calc(100% - 50px)",
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

            </div>
          </div>

          {/* Event Gallery */}
          <div className="lg:col-span-7">
            <div className="rounded-xl shadow-lg border border-gray-200 bg-white p-6 h-[37.5rem]">
              <h3 className="text-blue-800 text-lg font-bold mb-4">
                Event Gallery
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-y-auto h-[calc(100%-30px)] pr-2 custom-scrollbar">
                {visibleEvents.map((event, index) => {
                  const imgSrc = resolveEventImage(event);
                  return (
                    <Link
                      key={index}
                      to={`/announcements/event-calendar/${event.id}`}
                      className="group cursor-pointer block"
                    >
                      <div className="relative overflow-hidden rounded-xl bg-gray-200 h-48 shadow-md group-hover:shadow-xl transition-shadow duration-300">
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.nextElementSibling && (e.target.nextElementSibling.style.display = "flex");
                            }}
                          />
                        ) : null}
                        {/* Fallback when no image */}
                        <div
                          className={`absolute inset-0 items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 ${imgSrc ? 'hidden' : 'flex'}`}
                        >
                          <Calendar size={40} className="text-white/50" />
                        </div>
                        {/* Overlay gradient with title */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-10">
                          <h4 className="font-semibold text-white text-sm leading-snug line-clamp-2">
                            {event.title}
                          </h4>
                          {event.date && (
                            <p className="text-xs text-blue-200 mt-1 font-medium">
                              {event.date}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
                {visibleEvents.length === 0 ? (
                  <p className="text-sm text-gray-500 col-span-full">No events available.</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NoticeEvents;

