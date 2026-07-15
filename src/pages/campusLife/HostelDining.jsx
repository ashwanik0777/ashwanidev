import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, ShieldCheck, Utensils, Clock, MapPin, ArrowUpRight, Info, Sparkles, Building2, UserCheck } from 'lucide-react';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const GBU_HOSTELS_DATA = {
  girls: [
    { name: "Savitri Bai Phule Girls Hostel", capacity: "Single Occupancy Rooms", image: "/assets/Hostel_Image.webp" },
    { name: "Rani Laxmi Bai Girls Hostel", capacity: "Single Occupancy Rooms", image: "/assets/hostel2.jpg" },
    { name: "Rama Bai Ambedkar Girls Hostel", capacity: "Single Occupancy Rooms", image: "/assets/hostels.jpg" },
    { name: "Mahamaya Girls Hostel", capacity: "Single Occupancy Rooms", image: "/assets/Hostel_Image.webp" },
    { name: "Mahadevi Verma Girls Hostel", capacity: "Single Occupancy Rooms", image: "/assets/hostel2.jpg" },
    { name: "Ismat Chughtai Girls Hostel", capacity: "Single Occupancy Rooms", image: "/assets/hostels.jpg" }
  ],
  boys: [
    { name: "Sant Ravidas Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/Hostel_Image.webp" },
    { name: "Sant Kabir Das Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/hostel2.jpg" },
    { name: "Birsa Munda Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/completegbu.webp" },
    { name: "Ram Sharan Das Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/hostels.jpg" },
    { name: "Shri Narayan Guru Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/about.jpg" },
    { name: "Tulsidas Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/Hostel_Image.webp" },
    { name: "Guru Ghasi Das Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/hostel2.jpg" },
    { name: "Malik Mohammad Jaysi Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/completegbu.webp" },
    { name: "Munshi Premchand Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/hostels.jpg" },
    { name: "Raheem Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/about.jpg" },
    { name: "Maharshi Valmiki Boys Hostel", capacity: "Single Occupancy Rooms", image: "/assets/Hostel_Image.webp" }
  ],
  married: [
    { name: "Married Research Scholars Hostel", capacity: "Furnished Family Suites", image: "/assets/completegbu.webp" }
  ],
  dining: {
    description: "Gautam Buddha University operates a highly collaborative dining ecosystem. Centralized hostal kitchens, monitored closely by student-led mess committees, serve fresh, nutritious, and purely vegetarian meals daily. Menus rotate weekly to present seasonal options and cultural variety.",
    timings: [
      { meal: "Breakfast", time: "7:30 AM - 9:00 AM", menu: "Milk, Sprouts, Bread-butter, Seasonal Paratha/Poha/Idli" },
      { meal: "Lunch", time: "12:30 PM - 2:00 PM", menu: "Seasonal Green Veg, Dal Tadka, Roti, Plain Rice, Curd & Salad" },
      { meal: "Evening Tea", time: "5:00 PM - 6:00 PM", menu: "Tea/Coffee with Quick Snacks (Samosa/Sandwiches/Biscuits)" },
      { meal: "Dinner", time: "8:00 PM - 9:30 PM", menu: "Paneer/Special Sabzi, Dal Makhani, Pulao, Chapati & Dessert" }
    ],
    features: [
      { title: "Student Mess Committee", desc: "Weekly review of hygiene, raw material supplies, and custom menu additions." },
      { title: "Diverse Menus", desc: "Serving wholesome meals tailored to support student health and research schedules." },
      { title: "Pure Vegetarian & Hygiene", desc: "Strict quality control, steam sterilizers for utensils, and organic ingredients." }
    ]
  }
};

const HostelDining = () => {
  const [activeMainTab, setActiveMainTab] = useState('hostels'); // 'hostels' | 'dining'
  const [hostelCategory, setHostelCategory] = useState('boys'); // 'boys' | 'girls' | 'married'

  const currentHostelsList = GBU_HOSTELS_DATA[hostelCategory];

  return (
    <SearchableWrapper>
      <section id="hostel-life" className="py-24 bg-slate-50 relative overflow-hidden font-sans text-left">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
          
          {/* Section Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100"
            >
              <Bed size={13} />
              <span>Residential Campus</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
            >
              Hostel Accommodation & Dining
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-600 text-lg leading-relaxed font-normal"
            >
              Discover our extensive student residential blocks. GBU provides separate, fully-equipped single-occupancy hostels to guarantee quiet study time, privacy, and personal focus.
            </motion.p>
          </div>

          {/* OHMS Notice / External Portal redirect */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/10"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 flex-shrink-0">
                <Info size={22} className="text-blue-100" />
              </div>
              <div>
                <h4 className="font-bold text-lg leading-tight">Online Hostel Management System (OHMS)</h4>
                <p className="text-sm text-blue-100/90 mt-1">Room allotments, mess selection, registration, and approvals are directly processed via the official hostels portal.</p>
              </div>
            </div>
            <a
              href="https://hostels.gbu.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white text-blue-600 hover:bg-blue-50 font-bold transition-all duration-300 shadow-sm text-sm whitespace-nowrap cursor-pointer"
            >
              Go to Hostels Portal
            </a>
          </motion.div>

          {/* Main Option Tabs (Hostels vs Dining) */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-200/60 p-1.5 rounded-full flex gap-1 border border-slate-200">
              <button
                onClick={() => setActiveMainTab('hostels')}
                className={`px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
                  activeMainTab === 'hostels' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student Accommodations
              </button>
              <button
                onClick={() => setActiveMainTab('dining')}
                className={`px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
                  activeMainTab === 'dining' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Dining & Mess Info
              </button>
            </div>
          </div>

          {activeMainTab === 'hostels' ? (
            <div>
              {/* Category subtabs (boys vs girls vs married) */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  onClick={() => setHostCategory('boys')}
                  className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    hostelCategory === 'boys' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Boys' Hostels ({GBU_HOSTELS_DATA.boys.length})
                </button>
                <button
                  onClick={() => setHostCategory('girls')}
                  className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    hostelCategory === 'girls' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Girls' Hostels ({GBU_HOSTELS_DATA.girls.length})
                </button>
                <button
                  onClick={() => setHostCategory('married')}
                  className={`px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                    hostelCategory === 'married' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Married Accommodation ({GBU_HOSTELS_DATA.married.length})
                </button>
              </div>

              {/* Hostels Grid Overhaul */}
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentHostelsList.map((hostel, idx) => (
                  <motion.div
                    key={idx}
                    layout
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-48 relative overflow-hidden">
                        <img
                          src={hostel.image}
                          alt={hostel.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-103 select-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                        <div className="absolute bottom-4 left-4">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10">
                            <Building2 size={10} />
                            <span>{hostel.capacity}</span>
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-lg text-slate-950 leading-tight mb-2">{hostel.name}</h4>
                        <div className="space-y-2 text-xs text-slate-500 pt-3 border-t border-slate-50">
                          <div className="flex items-center gap-1.5">
                            <MapPin size={13} className="text-slate-400" />
                            <span>GBU Residential Zone</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <UserCheck size={13} className="text-slate-400" />
                            <span>Biometric Attendance Registry</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                      <a
                        href="https://hostels.gbu.ac.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md hover:shadow-blue-500/10 transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View Now !!</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ) : (
            // Cooperative Dining Showcase
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl text-left"
            >
              <div className="max-w-3xl mb-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Utensils size={24} className="text-blue-600" />
                  <span>Centralized Cooperative Mess Management</span>
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">{GBU_HOSTELS_DATA.dining.description}</p>
              </div>

              {/* Dining Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {GBU_HOSTELS_DATA.dining.features.map((feature, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-2">{feature.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>

              {/* Timings Table */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-6 flex items-center gap-2">
                  <Clock size={16} className="text-blue-500 animate-pulse" />
                  <span>Mess Operational Schedule</span>
                </h4>
                <div className="overflow-x-auto border border-slate-100 rounded-2xl">
                  <table className="w-full border-collapse text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-950 font-bold border-b border-slate-100">
                      <tr>
                        <th className="p-4">Meal</th>
                        <th className="p-4">Timings</th>
                        <th className="p-4">Example Diet Menu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {GBU_HOSTELS_DATA.dining.timings.map((time, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="p-4 font-bold text-slate-950">{time.meal}</td>
                          <td className="p-4 text-blue-600 font-medium">{time.time}</td>
                          <td className="p-4 text-xs">{time.menu}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </section>
    </SearchableWrapper>
  );
};

export default HostelDining;
