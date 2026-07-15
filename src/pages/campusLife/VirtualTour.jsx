import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Calendar, Sparkles, X, User, Mail, Phone, CalendarRange, Users, Video, Compass, Leaf, GraduationCap } from 'lucide-react';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';
import { useToast } from '../../hooks/use-toast';

const GBU_VIRTUAL_TOUR = {
  title: "Virtual Campus Experience",
  description: "Take a stunning 360-degree virtual walkthrough of our majestic 511-acre campus. Discover our iconic academic schools, lush green woods, modern hostels, and Olympic-standard sports venues.",
  thumbnail: "/assets/completegbu.webp",
  video_link: "https://www.youtube.com/embed/-KWjgavlN04?si=BYqhXFKJNDCfhcGj"
};

const VirtualTour = () => {
  const [tour] = useState(GBU_VIRTUAL_TOUR);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const tourHighlights = [
    { title: 'Academic Excellence', description: 'State-of-the-art smart classrooms and advanced research labs.', icon: GraduationCap },
    { title: 'Modern Architecture', description: 'Tallest campus structures, design excellence, and vast auditoriums.', icon: Compass },
    { title: 'Green Sanctuary', description: 'Eco-friendly sprawling campus with native flora, solar grid, and STP.', icon: Leaf },
    { title: 'Residential Ecosystem', description: 'Vibrant single-occupancy hostels and multi-cuisine central food complex.', icon: Users }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    toast({
      title: "Campus Tour Booked!",
      description: `Thank you ${data.get('name')}. Your visit on ${data.get('date')} has been registered.`,
    });
    setIsDialogOpen(false);
  };

  return (
    <SearchableWrapper>
      <section id="campus-tour" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden font-sans">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-100"
            >
              <Video size={13} className="animate-pulse" />
              <span>360° View</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight"
            >
              {tour.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed font-normal"
            >
              {tour.description}
            </motion.p>
          </div>

          {/* Video Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200/60 bg-slate-950 mb-16"
          >
            {!isVideoPlaying ? (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <img
                  src={tour.thumbnail}
                  alt="GBU Campus Tour"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-75 transition-transform duration-500 hover:scale-102 select-none"
                />
                {/* Premium Glassmorphic Play Trigger */}
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsVideoPlaying(true)}
                    className="flex items-center gap-3.5 px-8 py-5 rounded-full bg-white text-slate-950 font-bold text-lg shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:bg-blue-50 cursor-pointer"
                  >
                    <Play className="fill-slate-950 text-slate-950" size={20} />
                    <span>Watch Virtual Tour</span>
                  </motion.button>
                </div>
                <div className="absolute top-6 left-6 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-full font-semibold border border-white/10 text-sm">
                  <Sparkles size={14} className="text-yellow-400 animate-spin-slow" />
                  <span>Immersive Experience</span>
                </div>
              </div>
            ) : (
              <iframe
                width="100%"
                height="100%"
                src={`${tour.video_link}?autoplay=1`}
                title={tour.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {tourHighlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                  <item.icon className="text-blue-600 group-hover:text-white transition-colors duration-300" size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-950 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Schedule/CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsVideoPlaying(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer text-base"
            >
              <Play className="fill-white" size={16} />
              <span>Full 360° Tour</span>
            </button>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 shadow-sm font-semibold transition-all duration-300 hover:scale-[1.03] cursor-pointer text-base"
            >
              <Calendar size={18} />
              <span>Schedule Physical Visit</span>
            </button>
          </div>
        </div>

        {/* Dialog / Modal Overhaul */}
        <AnimatePresence>
          {isDialogOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                onClick={() => setIsDialogOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg z-10 border border-slate-100 max-h-[90vh] overflow-y-auto"
              >
                <button
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors p-1.5 hover:bg-slate-100 rounded-full cursor-pointer"
                  onClick={() => setIsDialogOpen(false)}
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <div className="mb-6 flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
                    <CalendarRange className="text-blue-600" size={24} />
                    <span>Plan Your Visit</span>
                  </h2>
                  <p className="text-sm text-slate-500">Request a guided tour of Gautam Buddha University campus.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="relative">
                    <label htmlFor="name" className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><User size={16} /></span>
                      <input id="name" name="name" required placeholder="Enter full name" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={16} /></span>
                      <input id="email" name="email" type="email" required placeholder="your.email@gbu.ac.in" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Phone size={16} /></span>
                      <input id="phone" name="phone" required placeholder="Enter 10-digit number" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-900" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="date" className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Preferred Date</label>
                      <input id="date" name="date" type="date" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-900" />
                    </div>
                    <div>
                      <label htmlFor="visitors" className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">No. of Visitors</label>
                      <input id="visitors" name="visitors" type="number" min="1" max="10" defaultValue="1" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm text-slate-900" />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer">
                    Book Campus Tour Request
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>
    </SearchableWrapper>
  );
};

export default VirtualTour;
