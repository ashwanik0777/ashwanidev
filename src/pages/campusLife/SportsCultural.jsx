import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Trophy, Target, Dribbble, Activity, Flame, Shield, MapPin, Clock, Phone, Info, X } from "lucide-react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const GBU_SPORTS_FACILITIES = [
  {
    id: 1,
    icon: Dribbble,
    title: "Eklavya Indoor Sports Stadium",
    image: "/assets/campusimg/Ellavya_Sports_complex.jpg",
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
    image: "/assets/sports2.jpg",
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
    image: "/assets/campusimg/Ellavya_Sports_complex.jpg",
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

const SportsWellness = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  return (
    <SearchableWrapper>
      <section id="sports-wellness" className="py-16 bg-white font-sans text-left">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Sports & Fitness Venues</h2>
            </div>

            {/* Custom slider navigation controls */}
            <div className="flex gap-2">
              <button
                onClick={scrollLeft}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={scrollRight}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Cards container with horizontal scrollbar hidden */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {GBU_SPORTS_FACILITIES.map((facility) => (
              <div
                key={facility.id}
                onClick={() => setSelectedFacility(facility)}
                className="flex-shrink-0 w-80 md:w-96 snap-start bg-white border border-slate-100 hover:border-blue-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                    {React.createElement(facility.icon, { size: 22 })}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">{facility.type}</span>
                    <h3 className="font-bold text-lg mt-0.5 leading-tight">{facility.title}</h3>
                  </div>
                </div>

                <div className="p-6 text-sm text-slate-600 space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-slate-400" />
                    <span>{facility.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy size={15} className="text-slate-400" />
                    <span>{facility.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-slate-400" />
                    <span>{facility.timings}</span>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                    <span>View Scheduling Details</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Details Dialog / Modal */}
          {selectedFacility && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                onClick={() => setSelectedFacility(null)}
              />
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-3xl z-10 border border-slate-100 max-h-[90vh] overflow-y-auto">
                <button
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-950 p-1.5 hover:bg-slate-100 rounded-full cursor-pointer"
                  onClick={() => setSelectedFacility(null)}
                >
                  <X size={20} />
                </button>
                <div className="mb-6 flex flex-col gap-1 text-left">
                  <h2 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
                    {React.createElement(selectedFacility.icon, { size: 24, className: "text-blue-600" })}
                    <span>{selectedFacility.title}</span>
                  </h2>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mt-1">{selectedFacility.type}</p>
                </div>

                <div className="space-y-6 text-left">
                  <img
                    src={selectedFacility.image}
                    alt={selectedFacility.title}
                    className="w-full h-64 object-cover rounded-2xl border border-slate-100"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-1.5">
                        <Info size={16} className="text-blue-600" />
                        <span>Venue Guidelines</span>
                      </h4>
                      <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 flex-shrink-0">Location:</span>
                          <span>{selectedFacility.location}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 flex-shrink-0">Capacity:</span>
                          <span>{selectedFacility.capacity}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 flex-shrink-0">Timings:</span>
                          <span>{selectedFacility.timings}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 flex-shrink-0">Access:</span>
                          <span>{selectedFacility.access}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="font-semibold text-slate-950 w-20 flex-shrink-0">Contact:</span>
                          <span className="text-blue-600">{selectedFacility.contact}</span>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-slate-100">
                          <span className="font-semibold text-slate-950 w-20 flex-shrink-0">Booking:</span>
                          <span className="text-slate-500 text-xs leading-relaxed">{selectedFacility.bookingInfo}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">Description</h4>
                      <p className="text-sm text-slate-600 leading-relaxed">{selectedFacility.description}</p>
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
