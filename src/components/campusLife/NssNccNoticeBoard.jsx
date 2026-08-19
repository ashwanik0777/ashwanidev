import React, { useState, useEffect, useRef } from "react";
import { Calendar, ChevronRight, Download, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { parseImageUrl } from "../../utils/imageUtils";

const Badge = ({ children, className = "", ...props }) => (
  <div
    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </div>
);

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
  // Parse the image URL ensuring Drive/Photos links work correctly
  const imgSrc = current?.image ? parseImageUrl(current.image) : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="flex flex-col flex-1 min-h-0 relative group">
      {/* Main Image */}
      <div className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden shadow-md bg-gray-100">
        <img
          src={imgSrc}
          alt={current?.title || "Event Image"}
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
            transitioning ? "scale-110 opacity-80 blur-[2px]" : "scale-100 opacity-100 blur-0"
          }`}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Caption overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 py-4 pt-16">
          <h4 className="font-semibold text-white text-base sm:text-lg leading-snug line-clamp-2 drop-shadow-md">
            {current?.title}
          </h4>
          <p className="text-gray-300 text-sm mt-1 flex items-center gap-2">
            <Calendar size={14} />
            {current?.date}
          </p>
        </div>

        {/* Dot indicators */}
        {events.length > 1 && (
          <div className="absolute bottom-4 right-4 flex gap-1.5 z-10" onClick={(e) => e.preventDefault()}>
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
      </div>

      {/* Thumbnail strip */}
      {events.length > 1 && (
        <div className="mt-4 overflow-x-auto flex gap-3 pb-2 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
          {events.map((evt, i) => {
            const thumbSrc = evt?.image ? parseImageUrl(evt.image, 300) : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80";
            return (
              <div
                key={evt.id || i}
                onClick={() => goTo(i)}
                className={`cursor-pointer flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                  i === activeIndex
                    ? "ring-2 ring-blue-600 scale-105 shadow-md"
                    : "opacity-60 hover:opacity-100 hover:ring-1 hover:ring-blue-300"
                }`}
              >
                <img
                  src={thumbSrc}
                  alt={evt.title}
                  className="w-24 h-16 sm:w-28 sm:h-20 object-cover"
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
        <div className="mt-2 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-linear"
            style={{ width: `${((activeIndex + 1) / events.length) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

const NssNccNoticeBoard = ({ title, events = [] }) => {
  const scrollRef = useRef(null);

  // Auto-scroll effect for the left column
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

  return (
    <section className="py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            {title}
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Notice Board (Left) */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl shadow-xl border border-gray-100 bg-white p-6 h-[40rem] flex flex-col relative overflow-hidden">
              {/* Decorative top bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
              
              <div className="flex items-center justify-between mb-6 pt-2 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Calendar size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Events Feed</h3>
                </div>
              </div>

              {/* Auto-Scrolling Notice List */}
              <div
                ref={scrollRef}
                className="space-y-4 flex-grow overflow-y-auto pr-3 scrollbar-hide pb-8"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
                {events.map((evt, index) => {
                  const hasLink = evt.links && evt.links.length > 0;
                  const targetUrl = hasLink ? evt.links[0] : "#";
                  
                  return (
                    <a
                      key={index}
                      href={targetUrl}
                      target={hasLink ? "_blank" : "_self"}
                      rel={hasLink ? "noopener noreferrer" : ""}
                      className="block group bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md hover:border-blue-200 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-200 group-hover:bg-blue-600 transition-colors duration-300" />
                      
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 pr-2">
                          {evt.title}
                        </h4>
                        {evt.type && (
                          <Badge className="text-[10px] px-2 py-0.5 uppercase tracking-wider bg-blue-50 text-blue-700 whitespace-nowrap shrink-0 border-blue-100">
                            {evt.type}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                          <Calendar size={12} />
                          {evt.date}
                        </p>
                        {hasLink && (
                          <span className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                            <ExternalLink size={14} />
                          </span>
                        )}
                      </div>
                    </a>
                  );
                })}
                {events.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-3">
                    <Calendar size={32} className="opacity-20" />
                    <p className="text-sm">No events available.</p>
                  </div>
                ) : null}
              </div>
              
              {/* Bottom gradient fade for scroll indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Event Gallery (Right) */}
          <div className="lg:col-span-8">
            <div className="rounded-2xl shadow-xl border border-gray-100 bg-white p-6 h-[40rem] flex flex-col relative overflow-hidden">
               {/* Decorative top bar */}
               <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-blue-600" />
               
              <h3 className="text-xl font-bold text-gray-900 mb-6 pt-2 border-b border-gray-100 pb-4">
                Event Gallery
              </h3>

              {events.length > 0 ? (
                <EventGallerySlider events={events} />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-3">
                  <div className="p-4 bg-gray-50 rounded-full">
                    <Calendar size={32} className="opacity-20" />
                  </div>
                  <p className="text-sm">No gallery images available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NssNccNoticeBoard;
