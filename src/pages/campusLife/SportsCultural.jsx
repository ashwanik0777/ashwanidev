import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Trophy, Target, Dribbble, Activity, Shield, MapPin, Clock, Users, Info, X, ArrowRight } from "lucide-react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const GBU_SPORTS_FACILITIES = [
  {
    id: 1,
    icon: Dribbble,
    title: "Eklavya Indoor Sports Stadium",
    image: "/assets/campusimg/eklavya-indoor-stadium.jpg",
    type: "Olympic-Standard Indoor Arena",
    location: "Opposite School of ICT, GBU",
    capacity: "3,000+ Spectators",
    access: "Open to all GBU Students, Faculty, and Staff",
    timings: "6:00 AM - 9:00 AM & 5:00 PM - 9:00 PM (Daily)",
    contact: "Dr. Dinesh Kumar (Sports Officer) - Ext: 4122",
    bookingInfo: "Prior registration required at the Sports Office. Daily slot booking available for badminton/squash.",
    description: "The Eklavya Indoor Stadium is a world-class sports arena equipped with an Olympic-standard maple-wood flooring court for basketball, four professional squash courts, a dedicated table tennis arena with 8 tables, a gymnastics zone, and state-of-the-art wooden flooring badminton courts. It has hosted several state and national-level collegiate championships and provides high-intensity floodlighting and spectator galleries."
  },
  {
    id: 2,
    icon: Trophy,
    title: "GBU Cricket Stadium",
    image: "/assets/campusimg/gbu-cricket-stadium.jpg",
    type: "Ranji-Standard Grass Pitch",
    location: "East Campus Sports Zone",
    capacity: "5,000+ Spectators",
    access: "GBU Cricket Club Members & Inter-School Teams",
    timings: "6:00 AM - 10:00 AM & 4:00 PM - 7:00 PM",
    contact: "Coach Rajeev Sharma - Ext: 4125",
    bookingInfo: "Booking required for inter-departmental or external matches through the Registrar's Office.",
    description: "Featuring a lush green outfield and turf wickets prepared under the guidance of BCCI curators, the GBU Cricket Stadium is a magnificent facility. It has a beautiful pavilion, players' dressing rooms, electronic scoreboard capability, and a turf-wicket practice net facility. The ground is standard size, suitable for hosting Ranji-level practice sessions and all major university tournaments."
  },
  {
    id: 3,
    icon: Target,
    title: "Main Athletic & Football Stadium",
    image: "/assets/sports3.jpg",
    type: "Synthetic Athletics Track & Arena",
    location: "Central Sports Area",
    capacity: "10,000+ Spectators",
    access: "Open to all students for running/athletics and football",
    timings: "5:00 AM - 8:00 AM & 5:00 PM - 8:30 PM",
    contact: "Mr. Satish Giri (Athletics Coach) - Ext: 4126",
    bookingInfo: "Free access for general athletics. Football tournament bookings must be routed via the Sports Committee.",
    description: "This massive stadium boasts an 8-lane synthetic running track certified for national athletic meets, surrounding a lush, professional-grade grass football field. It is equipped with high-intensity floodlights for night matches, a grandstand for thousands of spectators, and top-tier training equipment for track and field events (long jump pit, high jump mats, shotput circle, javelin throw sector)."
  },
  {
    id: 4,
    icon: Activity,
    title: "Decoturf Tennis Arena",
    image: "/assets/sports1.jpg",
    type: "Decoturf Synthetic Courts",
    location: "Behind BH-4 & BH-5",
    capacity: "100 Spectators",
    access: "Open to all GBU tennis enthusiasts",
    timings: "6:00 AM - 8:30 AM & 5:00 PM - 9:00 PM",
    contact: "Tennis Coordinator - Ext: 4129",
    bookingInfo: "Slot booking registry kept with the hostel security gate.",
    description: "A set of four premium synthetic Decoturf tennis courts, designed to match professional tournament standards. These courts are fully floodlit, allowing students to play late into the evening. Perfect for both beginners learning the game and advanced university players training for inter-varsity meets."
  },
  {
    id: 5,
    icon: Shield,
    title: "Central Gymnasium & Fitness Center",
    image: "https://hostels.gbu.ac.in/images/student-utilities/gym.jpeg",
    type: "Equipped Gym Complex",
    location: "First Floor, Eklavya Indoor Stadium",
    capacity: "100+ Athletes at a time",
    access: "All students with valid GBU ID cards",
    timings: "6:00 AM - 10:00 AM & 4:30 PM - 9:30 PM",
    contact: "Gym Instructor - Ext: 4130",
    bookingInfo: "No booking fee. Registration form must be submitted at the gym reception for slot allocation.",
    description: "A fully air-conditioned, state-of-the-art gymnasium equipped with top-of-the-line cardio equipment (treadmills, cross-trainers, spin bikes), a comprehensive strength training section (free weights, multi-gym stations, Olympic lifting platforms), and a dedicated aerobics and yoga floor. Professional fitness trainers are present to guide students through workouts."
  }
];

const AUTOPLAY_MS = 6000;

const SportsWellness = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [paused, setPaused] = useState(false);
  const thumbsRef = useRef(null);

  const total = GBU_SPORTS_FACILITIES.length;
  const active = GBU_SPORTS_FACILITIES[activeIndex];

  const goTo = (index) => setActiveIndex((index + total) % total);
  const showPrev = () => goTo(activeIndex - 1);
  const showNext = () => goTo(activeIndex + 1);

  // Swipe left/right on the featured image (touch screens)
  const touchStartX = useRef(null);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) showNext();
    else showPrev();
  };

  // Auto-advance the featured venue; stops while hovered, while details are open, or for reduced motion
  useEffect(() => {
    if (paused || selectedFacility) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => setActiveIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, paused, selectedFacility, total]);

  // Keep the active thumbnail in view on the mobile/tablet strip without scrolling the page
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[activeIndex];
    if (!strip || !thumb || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: thumb.offsetLeft - 4, behavior: "smooth" });
  }, [activeIndex]);

  useEffect(() => {
    if (!selectedFacility) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedFacility(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedFacility]);

  const navButtonClass =
    "w-10 h-10 sm:w-11 sm:h-11 min-[160rem]:w-16 min-[160rem]:h-16 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm cursor-pointer";

  return (
    <SearchableWrapper>
      <section id="sports-wellness" className="py-10 sm:py-8 min-[160rem]:py-24 bg-white font-sans text-left">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 max-w-7xl min-[160rem]:max-w-[2200px]">

          {/* Header */}
          <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8 min-[160rem]:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl min-[160rem]:text-6xl font-extrabold text-slate-900 tracking-tight">Sports & Fitness Venues</h2>

            <div className="flex gap-2 flex-shrink-0">
              <button onClick={showPrev} className={navButtonClass} aria-label="Previous venue">
                <ChevronLeft className="w-5 h-5 min-[160rem]:w-8 min-[160rem]:h-8" />
              </button>
              <button onClick={showNext} className={navButtonClass} aria-label="Next venue">
                <ChevronRight className="w-5 h-5 min-[160rem]:w-8 min-[160rem]:h-8" />
              </button>
            </div>
          </div>

          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {/* Featured venue */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 min-[160rem]:gap-16">
              <div
                className="lg:col-span-7 relative h-60 sm:h-[min(24rem,70vh)] lg:h-[480px] min-[160rem]:h-[760px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg bg-slate-900 touch-pan-y"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence initial={false}>
                  <motion.img
                    key={active.id}
                    src={active.image}
                    alt={active.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20" />

                <div className="absolute top-4 left-4 min-[160rem]:top-8 min-[160rem]:left-8 w-12 h-12 min-[160rem]:w-20 min-[160rem]:h-20 rounded-xl bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                  {React.createElement(active.icon, { className: "w-6 h-6 min-[160rem]:w-10 min-[160rem]:h-10" })}
                </div>
                <div className="absolute top-4 right-4 min-[160rem]:top-8 min-[160rem]:right-8 px-3 py-1 rounded-full bg-slate-950/50 backdrop-blur-md text-white text-xs sm:text-sm min-[160rem]:text-xl font-semibold">
                  {activeIndex + 1} / {total}
                </div>

                {/* Slide dots */}
                <div className="absolute bottom-4 min-[160rem]:bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                  {GBU_SPORTS_FACILITIES.map((facility, index) => (
                    <button
                      key={facility.id}
                      onClick={() => goTo(index)}
                      aria-label={`Show ${facility.title}`}
                      className={`h-2 min-[160rem]:h-3 rounded-full transition-all duration-300 cursor-pointer ${
                        index === activeIndex ? "w-8 min-[160rem]:w-12 bg-white" : "w-2 min-[160rem]:w-3 bg-white/50 hover:bg-white/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* All venue texts share one grid cell, so the block keeps the tallest height and content below never jumps */}
              <div className="lg:col-span-5 grid items-center">
                {GBU_SPORTS_FACILITIES.map((facility, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <motion.div
                      key={facility.id}
                      aria-hidden={!isActive}
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                      transition={{ duration: 0.35 }}
                      className={`col-start-1 row-start-1 flex flex-col ${isActive ? "" : "invisible pointer-events-none"}`}
                    >
                      <span className="text-xs sm:text-sm min-[160rem]:text-xl font-bold uppercase tracking-wider text-blue-600">{facility.type}</span>
                      <h3 className="mt-1 text-xl sm:text-3xl lg:text-4xl min-[160rem]:text-6xl font-extrabold text-slate-900 leading-tight">{facility.title}</h3>
                      <p className="mt-2 sm:mt-4 text-sm sm:text-base min-[160rem]:text-2xl text-slate-600 leading-relaxed line-clamp-3 sm:line-clamp-4">{facility.description}</p>

                      <div className="mt-3 sm:mt-6 space-y-2 sm:space-y-2.5 min-[160rem]:space-y-4 text-sm sm:text-base min-[160rem]:text-2xl text-slate-700">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 min-[160rem]:w-7 min-[160rem]:h-7 mt-0.5 text-blue-600 flex-shrink-0" />
                          <span>{facility.location}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 min-[160rem]:w-7 min-[160rem]:h-7 mt-0.5 text-blue-600 flex-shrink-0" />
                          <span>{facility.capacity}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 min-[160rem]:w-7 min-[160rem]:h-7 mt-0.5 text-blue-600 flex-shrink-0" />
                          <span>{facility.timings}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedFacility(facility)}
                        tabIndex={isActive ? 0 : -1}
                        className="mt-4 sm:mt-7 w-full sm:w-auto sm:self-start inline-flex items-center justify-center gap-2 px-5 py-2.5 min-[160rem]:px-8 min-[160rem]:py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm min-[160rem]:text-xl shadow-md transition-colors cursor-pointer group"
                      >
                        View Full Details
                        <ArrowRight className="w-4 h-4 min-[160rem]:w-6 min-[160rem]:h-6 transition-transform group-hover:translate-x-1" />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Venue thumbnails: scroll strip on mobile/tablet, single row from desktop */}
            <div
              ref={thumbsRef}
              className="relative mt-5 sm:mt-6 min-[160rem]:mt-10 flex gap-3 sm:gap-4 min-[160rem]:gap-6 overflow-x-auto p-1 snap-x snap-mandatory scroll-smooth lg:grid lg:grid-cols-5 lg:overflow-visible"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {GBU_SPORTS_FACILITIES.map((facility, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={facility.id}
                    onClick={() => goTo(index)}
                    aria-label={`Show ${facility.title}`}
                    aria-pressed={isActive}
                    className={`relative flex-shrink-0 w-44 sm:w-56 lg:w-auto h-28 sm:h-36 min-[160rem]:h-56 snap-start rounded-2xl overflow-hidden text-left cursor-pointer group transition-all duration-300 ${
                      isActive ? "ring-2 ring-blue-600 ring-offset-2" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={facility.image}
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                    <span className="absolute bottom-2 left-3 right-3 min-[160rem]:bottom-4 min-[160rem]:left-5 text-white font-semibold text-xs sm:text-sm min-[160rem]:text-xl leading-tight line-clamp-2">
                      {facility.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Dialog / Modal */}
          {selectedFacility && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={selectedFacility.title}>
              <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                onClick={() => setSelectedFacility(null)}
              />
              <div className="relative bg-white rounded-3xl shadow-2xl p-5 sm:p-8 min-[160rem]:p-12 w-full max-w-3xl min-[160rem]:max-w-5xl z-10 border border-slate-100 max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-slate-950 p-1.5 hover:bg-slate-100 rounded-full cursor-pointer"
                  onClick={() => setSelectedFacility(null)}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <div className="mb-6 flex flex-col gap-1 text-left pr-8">
                  <h2 className="text-xl sm:text-2xl min-[160rem]:text-4xl font-bold text-slate-950 flex items-center gap-2">
                    {React.createElement(selectedFacility.icon, { size: 24, className: "text-blue-600 flex-shrink-0" })}
                    <span>{selectedFacility.title}</span>
                  </h2>
                  <p className="text-xs min-[160rem]:text-lg text-slate-500 uppercase font-semibold tracking-wider mt-1">{selectedFacility.type}</p>
                </div>

                <div className="space-y-6 text-left">
                  <img
                    src={selectedFacility.image}
                    alt={selectedFacility.title}
                    className="w-full h-48 sm:h-64 min-[160rem]:h-96 object-cover rounded-2xl border border-slate-100"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm min-[160rem]:text-xl font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-1.5">
                        <Info size={16} className="text-blue-600" />
                        <span>Venue Guidelines</span>
                      </h4>
                      <div className="space-y-3 text-sm min-[160rem]:text-xl text-slate-600">
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 min-[160rem]:w-32 flex-shrink-0">Location:</span>
                          <span>{selectedFacility.location}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 min-[160rem]:w-32 flex-shrink-0">Capacity:</span>
                          <span>{selectedFacility.capacity}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 min-[160rem]:w-32 flex-shrink-0">Timings:</span>
                          <span>{selectedFacility.timings}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 min-[160rem]:w-32 flex-shrink-0">Access:</span>
                          <span>{selectedFacility.access}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 min-[160rem]:w-32 flex-shrink-0">Contact:</span>
                          <span className="text-blue-600">{selectedFacility.contact}</span>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-slate-100">
                          <span className="font-semibold text-slate-950 w-20 min-[160rem]:w-32 flex-shrink-0">Booking:</span>
                          <span className="text-slate-500 text-xs min-[160rem]:text-lg leading-relaxed">{selectedFacility.bookingInfo}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm min-[160rem]:text-xl font-bold uppercase tracking-wider text-slate-800 mb-4">Description</h4>
                      <p className="text-sm min-[160rem]:text-xl text-slate-600 leading-relaxed">{selectedFacility.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </SearchableWrapper>
  );
};

export default SportsWellness;
