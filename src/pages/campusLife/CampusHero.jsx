import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, BookOpen, Hotel, ArrowDown, ChevronRight, Sparkles } from 'lucide-react';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const GBU_HERO_SLIDES = [
  {
    id: 1,
    background_image: "/assets/campusimg/WhatsApp_Image_2025-06-25_at_4.28.55_PM.jpeg",
    tagline: "Explore the Majestic 511-Acre Campus",
    title: "Vibrant GBU Campus Life",
    description: "We are ready to see you thrive. Be a part of a vibrant community of intellectuals and entrepreneurs endowed with Character, Creativity, Competence, and Commitment.",
    button1_text: "Virtual Tour",
    button1_url: "#campus-tour",
    button2_text: "Life @ GBU",
    button2_url: "#life-at-gbu",
    icon: Compass
  },
  {
    id: 2,
    background_image: "https://www.gbu.ac.in/Content/clubs/img/Artboard-1meditationatnight.jpg",
    tagline: "Character, Creativity, Competence & Commitment",
    title: "Mahatma Jyotiba Phule Dhyana Kendra",
    description: "Inspired by stupa architecture, our meditation and retreat centre gives an experience of the power of peace, inner silence, positive values, and stress-free living.",
    button1_text: "Meditation Center",
    button1_url: "/campus-life/meditation-center",
    button2_text: "Shanti Sarowar",
    button2_url: "#grand-walk",
    icon: Sparkles
  },
  {
    id: 3,
    background_image: "/assets/campusimg/library.jpg",
    tagline: "A Hub of Intellectual Growth",
    title: "Bodhisattva Central Library",
    description: "Home to the architectural marvel Bodhisattva Dr. B.R. Ambedkar Library, boasting 5 storeys, 2,000+ seating capacity, and over 2.5 Lakh collections to inspire research and excellence.",
    button1_text: "Explore Library",
    button1_url: "#library",
    button2_text: "E-Resources",
    button2_url: "https://www.gbu.ac.in/",
    icon: BookOpen
  },
  {
    id: 4,
    background_image: "/assets/Hostel_Image.webp",
    tagline: "Your Cozy Home Away From Home",
    title: "Premium Residential Hostels",
    description: "Featuring 18 single-seeded boys' hostels and 6 girls' hostels, fully cooperative multi-cuisine dining, continuous power backup, and modern recreational zones.",
    button1_text: "Hostel Details",
    button1_url: "#hostel-life",
    button2_text: "OHMS Portal",
    button2_url: "https://hostels.gbu.ac.in/ohms",
    icon: Hotel
  }
];

const CampusHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % GBU_HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (selector) => {
    if (selector.startsWith('#')) {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.open(selector, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <SearchableWrapper>
      <section id="home" className="relative h-[92vh] md:h-screen w-full overflow-hidden bg-slate-950 font-sans">
        {/* Slide Carousel Background */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0"
            >
              <img
                src={GBU_HERO_SLIDES[currentSlide].background_image}
                alt={GBU_HERO_SLIDES[currentSlide].title}
                className="w-full h-full object-cover object-center select-none filter brightness-75"
              />
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/90 via-slate-950/40 to-transparent z-1" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 z-1" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-start px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl text-left">
            {/* Title */}
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight select-none font-outfit"
            >
              {GBU_HERO_SLIDES[currentSlide].title.split(' ').map((word, i) => (
                <span key={i} className={word === "GBU" || word === "Residential" || word === "Bodhisattva" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-indigo-500" : ""}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-slate-200/90 mb-10 leading-relaxed font-normal max-w-2xl"
            >
              {GBU_HERO_SLIDES[currentSlide].description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              key={`cta-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => handleScroll(GBU_HERO_SLIDES[currentSlide].button1_url)}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer text-base"
              >
                {React.createElement(GBU_HERO_SLIDES[currentSlide].icon, { size: 18, className: "group-hover:rotate-12 transition-transform" })}
                <span>{GBU_HERO_SLIDES[currentSlide].button1_text}</span>
              </button>

              <button
                onClick={() => handleScroll(GBU_HERO_SLIDES[currentSlide].button2_url)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/35 backdrop-blur-md font-semibold transition-all duration-300 hover:scale-[1.03] cursor-pointer text-base"
              >
                <span>{GBU_HERO_SLIDES[currentSlide].button2_text}</span>
                <ChevronRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Floating Side Indicators */}
        <div className="absolute right-6 md:right-12 bottom-20 z-20 flex flex-col items-center gap-3">
          {GBU_HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="group relative flex items-center justify-center p-1.5 cursor-pointer"
              aria-label={`Go to slide ${index + 1}`}
            >
              <span className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-400 scale-125 w-8' : 'bg-white/40 group-hover:bg-white/70'
              }`} />
            </button>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => handleScroll('#campus-tour')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center gap-2 group text-white/50 hover:text-white transition-colors duration-300"
        >
          <span className="text-xs uppercase tracking-widest font-semibold opacity-70 group-hover:opacity-100">Explore Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ArrowDown size={22} className="text-blue-400/80 group-hover:text-blue-400" />
          </motion.div>
        </div>
      </section>
    </SearchableWrapper>
  );
};

export default CampusHero;