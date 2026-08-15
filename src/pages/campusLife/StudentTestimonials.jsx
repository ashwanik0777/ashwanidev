import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, MessageSquare, User } from 'lucide-react';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    course: "Computer Science Engineering",
    year: "Final Year",
    image: null,
    quote: "The campus life at GBU has been truly transformative. From coding inside the digital library labs to leading the university robotics club, every single day presents opportunities to explore and grow."
  },
  {
    name: "Rahul Kumar",
    course: "Mechanical Engineering",
    year: "Third Year",
    image: null,
    quote: "Living inside the single-seated hostels at GBU has taught me independence while giving me lifelong friendships. The sports facilities in the Eklavya indoor arena are outstanding."
  },
  {
    name: "Anita Patel",
    course: "Electronics Engineering",
    year: "Second Year",
    image: null,
    quote: "Being a core member of the cultural and coding committees helped me polish my project management skills. The green surroundings and friendly faculty create a highly nurturing space."
  }
];

const StudentTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <SearchableWrapper>
      <section className="py-16 bg-slate-50 relative overflow-hidden font-sans text-left border-t border-slate-100">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-5xl relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
            >
              What Our Students Say
            </motion.h2>
          </div>

          {/* Testimonial card slider */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8"
              >
                {/* Photo or Fallback User Icon */}
                <div className="flex-shrink-0 relative animate-fade-in">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-10 filter blur" />
                  {TESTIMONIALS[currentIndex].image ? (
                    <img
                      src={TESTIMONIALS[currentIndex].image}
                      alt={TESTIMONIALS[currentIndex].name}
                      className="w-24 h-24 rounded-full object-cover shadow-md relative z-10 border-2 border-white select-none"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center shadow-md relative z-10 border-2 border-white select-none text-slate-400">
                      <User size={36} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="mb-4">
                    <Quote className="w-12 h-12 text-blue-200 fill-blue-50/50" />
                  </div>
                  <p className="text-lg md:text-xl text-slate-700 leading-relaxed italic mb-6">
                    "{TESTIMONIALS[currentIndex].quote}"
                  </p>
                  <div>
                    <h4 className="text-xl font-bold text-slate-950 mb-1">{TESTIMONIALS[currentIndex].name}</h4>
                    <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase">{TESTIMONIALS[currentIndex].course}</span>
                    <p className="text-xs text-slate-400 mt-1">{TESTIMONIALS[currentIndex].year}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider control buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-20">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-all shadow-md cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-20">
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-all shadow-md cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'bg-blue-600 scale-125 w-6' : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </section>
    </SearchableWrapper>
  );
};

export default StudentTestimonials;
