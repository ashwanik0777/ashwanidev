import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Dialog = ({ open, onClose, children }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full p-4 relative mx-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 bg-slate-900/60 hover:bg-slate-950 p-2 rounded-full text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DevelopmentGlimpses = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(null);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
      title: "Team Collaboration",
      description: "Students working together on GBU Smart Campus systems",
    },
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=800&fit=crop",
      title: "Development Session",
      description: "Writing scalable features and wiring APIs in the lab",
    },
    {
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop",
      title: "Code Review & Mentoring",
      description: "Faculty advisor reviews and system performance tuning",
    },
    {
      url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=800&fit=crop",
      title: "UI/UX Design Phase",
      description: "Crafting beautiful, accessible layouts for the student dashboard",
    },
    {
      url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=800&fit=crop",
      title: "Whiteboard Sprint Planning",
      description: "Mapping database schemas and route middleware architecture",
    },
    {
      url: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1200&h=800&fit=crop",
      title: "Demo & Showcase",
      description: "Presenting working automation models to university leadership",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="mb-20 relative">
      <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
        Development Glimpses
      </h2>
      <p className="text-center text-gray-600 mb-10 text-sm sm:text-base">
        A behind-the-scenes look at the building process of the GBU Smart Campus portal.
      </p>

      {/* Main Slider Container */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl border border-slate-100 bg-slate-900 group">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          style={{ width: `${images.length * 100}%` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full relative h-[300px] sm:h-[400px] md:h-[500px]"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover select-none"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/20" />

              {/* Text content inside slider */}
              <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white z-10">
                <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white mb-3">
                  Gallery
                </span>
                <h3 className="text-xl sm:text-3xl font-bold tracking-tight">
                  {image.title}
                </h3>
                <p className="mt-2 text-sm sm:text-lg text-slate-200 max-w-2xl font-light">
                  {image.description}
                </p>
              </div>

              {/* Hover Zoom button */}
              <button
                onClick={() => setActiveImage(image)}
                className="absolute top-4 right-4 bg-black/40 hover:bg-black/70 p-3 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center animate-fade-in"
                title="Zoom Image"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          ))}
        </motion.div>

        {/* Navigation Buttons */}
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition duration-200 z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <ChevronLeft className="w-6 h-6 text-slate-800" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white p-3 rounded-full shadow-lg transition duration-200 z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          <ChevronRight className="w-6 h-6 text-slate-800" />
        </motion.button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 gap-2.5">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-blue-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Dialog for zoomed image */}
      <Dialog open={!!activeImage} onClose={() => setActiveImage(null)}>
        {activeImage && (
          <div className="flex flex-col">
            <div className="overflow-hidden rounded-lg bg-slate-100 max-h-[70vh] flex items-center justify-center">
              <img
                src={activeImage.url}
                alt={activeImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="mt-4 px-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{activeImage.title}</h3>
              <p className="text-slate-600 mt-1">{activeImage.description}</p>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default DevelopmentGlimpses;
