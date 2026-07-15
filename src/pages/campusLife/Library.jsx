import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Wifi, Globe, BookOpen, Layers, Sparkles, ArrowRight, X, Users, Cpu, GraduationCap, Award } from 'lucide-react';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

// === GBU Authentic Library Fallbacks ===
const FALLBACK_LIBRARY_INFO = {
  title: "Bodhisattva Dr. B.R. Ambedkar Library",
  description: "Standing as a majestic structural landmark on the GBU campus, the Bodhisattva Dr. B.R. Ambedkar Library is spread over approximately 1.078 Lakh sq. ft. spanning 5 magnificent storeys. As the center of academic excellence and research at Gautam Buddha University, it offers a peaceful reading environment, state-of-the-art digital access, and comprehensive stacks cataloged under standard classification systems."
};

const FALLBACK_FEATURES = [
  {
    name: "Vast Stacks Room",
    description: "Access over 2.5 Lakh physical books, monographs, and theses cataloged under professional systems for direct student loaning.",
    icon: BookOpen
  },
  {
    name: "Spacious Reading Hall",
    description: "Features comfortable individual study carrels and desks with a total seating capacity of 2,000+ readers simultaneously.",
    icon: Users
  },
  {
    name: "E-Resources & Computers",
    description: "High-speed digital library lounge with 100+ computers providing access to IEEE, ACM, Springer, Science Direct, and JSTOR.",
    icon: Cpu
  },
  {
    name: "DELNET & Consortiums",
    description: "Active institutional memberships in national and international consortia networks including DELNET, INDEST, and INFONET.",
    icon: Globe
  },
  {
    name: "Academic Timings",
    description: "Open from 8:00 AM to 8:00 PM on working days, and special late-night coding/reading hours during examination weeks.",
    icon: Clock
  },
  {
    name: "5-Storeyed Layout",
    description: "Structured floors separating computer science, engineering, law, biotechnology, management stacks, and research cells.",
    icon: Layers
  }
];

const FALLBACK_STATS = [
  { label: "2.5L+", value: "Library Book Collection", icon: BookOpen, color: "text-purple-600 bg-purple-50" },
  { label: "2,000+", value: "Simultaneous Reader Capacity", icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "1.07L", value: "Square Feet Total Covered Area", icon: Layers, color: "text-emerald-600 bg-emerald-50" },
  { label: "10,000+", value: "National & International E-Journals", icon: Wifi, color: "text-orange-600 bg-orange-50" }
];

const FALLBACK_SPACES = [
  {
    id: "space-1",
    name: "PhD Scholar Research Cubicles",
    image: "/assets/about.jpg",
    description: "Private study modules with independent power plugs and dedicated high-speed LAN outlets allocated to research scholars and PhD candidates.",
    capacity: "50+ Individual Cabins",
    amenities: ["Ethernet Port", "LED Desk Light", "Ergonomic Office Chair", "Quiet Zone Protocol"]
  },
  {
    id: "space-2",
    name: "Central Stack Halls",
    image: "/assets/campusimg/library.jpg",
    description: "Spacious multi-row stacks containing core academic textbooks, reference titles, encyclopedia volumes, and doctoral thesis print copies.",
    capacity: "2,50,000+ Books",
    amenities: ["Self-Check Loan Desk", "Subject Search Terminals", "Rolling Book Carts", "Librarian Helpdesk"]
  },
  {
    id: "space-3",
    name: "Bodhisattva Audio-Visual Zone",
    image: "/assets/completegbu.webp",
    description: "Equipped with projection capabilities and audio headsets, students utilize this theater space for technical video lectures and webinars.",
    capacity: "80 Seats",
    amenities: ["HD Projection Board", "Hi-Fi Sound Headsets", "Air Conditioned Halls", "Weekly NPTEL streamings"]
  }
];

const Library = () => {
  const [libraryInfo, setLibraryInfo] = useState(FALLBACK_LIBRARY_INFO);
  const [features, setFeatures] = useState(FALLBACK_FEATURES);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [spaces] = useState(FALLBACK_SPACES);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = import.meta.env.VITE_HOST;

  useEffect(() => {
    const fetchData = async () => {
      if (!BASE_URL) return;
      try {
        setIsLoading(true);
        const [infoRes, facilitiesRes, statsRes] = await Promise.all([
          fetch(`${BASE_URL}/campuslife/library-info/`).then(res => res.json()).catch(() => null),
          fetch(`${BASE_URL}/campuslife/library-facilities/`).then(res => res.json()).catch(() => null),
          fetch(`${BASE_URL}/campuslife/library-stats/`).then(res => res.json()).catch(() => null)
        ]);

        if (infoRes?.[0]) setLibraryInfo(infoRes[0]);
        if (facilitiesRes?.length) {
          const mappedFeatures = facilitiesRes.map(item => ({
            name: item.name,
            description: item.description,
            icon: BookOpen
          }));
          setFeatures(mappedFeatures);
        }
        if (statsRes?.length) {
          const mappedStats = statsRes.map(item => ({
            label: item.value,
            value: item.label,
            icon: BookOpen,
            color: "text-purple-600 bg-purple-50"
          }));
          setStats(mappedStats);
        }
      } catch (e) {
        console.error('Library fetch error', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [BASE_URL]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SearchableWrapper>
      <section id="library" className="py-24 bg-white relative overflow-hidden font-sans text-left">
        {/* Floating background decorative details */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
          
          {/* Main Info showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
            <div className="lg:col-span-6 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-10 filter blur-xl group-hover:opacity-15 transition-opacity" />
              <img
                src="https://library.gbu.ac.in/img/Artboard%201library1.jpg"
                alt="Dr. B.R. Ambedkar Central Library"
                className="w-full h-80 sm:h-[450px] object-cover rounded-3xl shadow-xl border border-slate-100 transition-transform duration-300 hover:scale-[1.01]"
              />
              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/10 flex items-center gap-1.5 shadow-lg">
                <Award size={15} className="text-yellow-400" />
                <span>Tallest Landmark Structure</span>
              </div>
            </div>
            
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100">
                <BookOpen size={13} />
                <span>Central Knowledge Hub</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                {libraryInfo.title}
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
                {libraryInfo.description}
              </p>
              <div className="flex gap-4">
                <a
                  href="https://library.gbu.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
                >
                  Visit Digital OPAC
                </a>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center"
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-4 ${stat.color}`}>
                  {React.createElement(stat.icon || BookOpen, { size: 20 })}
                </div>
                <div className="text-2xl font-black text-slate-950 mb-1">{stat.label}</div>
                <div className="text-slate-500 text-xs font-medium">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Key Stacks Spaces Grid */}
          <div className="mb-24">
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>Specialized Library Spaces</span>
              </h3>
              <p className="text-sm text-slate-500 mt-1">Explore custom facilities inside Dr. Ambedkar Central Library.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {spaces.map((space, idx) => (
                <div
                  key={space.id}
                  onClick={() => setSelectedSpace(space)}
                  className="group cursor-pointer bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img src={space.image} alt={space.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h4 className="font-bold text-base">{space.name}</h4>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center bg-slate-50/50">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Capacity: {space.capacity}</span>
                    <span className="text-blue-600 font-semibold text-xs group-hover:translate-x-1 transition-transform">Explore →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Features Grid */}
          <div>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900">Library Services & Access Rules</h3>
              <p className="text-sm text-slate-500 mt-1">Providing student-focused reference tools and extensive research assistance.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                    {React.createElement(feature.icon || Clock, { size: 18 })}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1.5">{feature.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Space Details Dialog */}
        <AnimatePresence>
          {selectedSpace && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                onClick={() => setSelectedSpace(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl z-10 border border-slate-100 max-h-[90vh] overflow-y-auto"
              >
                <button
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-950 p-1.5 hover:bg-slate-100 rounded-full cursor-pointer"
                  onClick={() => setSelectedSpace(null)}
                >
                  <X size={20} />
                </button>
                <div className="mb-6 flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
                    <GraduationCap className="text-blue-600" size={24} />
                    <span>{selectedSpace.name}</span>
                  </h2>
                  <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mt-1">Space Overview & Guidelines</p>
                </div>
                <div className="space-y-6">
                  <img src={selectedSpace.image} alt={selectedSpace.name} className="w-full h-56 object-cover rounded-xl border border-slate-100" />
                  <p className="text-sm text-slate-600 leading-relaxed">{selectedSpace.description}</p>
                  
                  <div className="grid grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">Space Capacity</h4>
                      <p className="text-sm text-slate-600">{selectedSpace.capacity}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">Key Amenities</h4>
                      <ul className="space-y-1">
                        {selectedSpace.amenities.map((item, idx) => (
                          <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-blue-600" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </section>
    </SearchableWrapper>
  );
};

export default Library;
