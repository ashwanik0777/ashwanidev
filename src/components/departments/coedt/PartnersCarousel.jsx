import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Reusable Badge
const Badge = ({ className = "", children }) => (
  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${className}`}>
    {children}
  </span>
);

const PartnersCarousel = ({
  sectionTitle = "Our Collaborators",
  sectionSubtitle = "Strategic partners supporting our mission",
  partners = [],
  interval = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!partners.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % partners.length);
    }, interval);
    return () => clearInterval(timer);
  }, [partners.length, interval]);

  const getTypeColor = (type) => {
    switch (type) {
      case "Industrial Partner":
        return "bg-indigo-600 text-white";
      case "Training Partner":
        return "bg-emerald-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const partner = partners[currentSlide];

  return (
    <section className="py-8 sm:py-12 bg-gray-50/70 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 tracking-tight">{sectionTitle}</h2>
          <div className="w-20 sm:w-24 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full" />
          {sectionSubtitle && (
            <p className="text-sm text-gray-500 mt-2 font-medium">{sectionSubtitle}</p>
          )}
        </div>

        {/* Dynamic Card Container */}
        {partner && (
          <div className="relative shadow-xl border border-gray-200 bg-white rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row items-center"
              >
                {/* Text Details */}
                <div className="p-6 sm:p-8 flex flex-col justify-center bg-gradient-to-br from-white via-blue-50/30 to-white md:w-7/12 w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className={getTypeColor(partner.type)}>{partner.type}</Badge>
                    {partner.year && (
                      <Badge className="bg-gray-100 text-gray-800 border border-gray-200">
                        Since {partner.year}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-950 mb-2">{partner.name}</h3>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{partner.description}</p>
                </div>

                {/* Logo Image */}
                <div className="flex items-center justify-center p-6 md:w-5/12 w-full bg-gray-50/60 border-t md:border-t-0 md:border-l border-gray-100">
                  <div className="w-48 h-24 sm:w-56 sm:h-28 flex items-center justify-center bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-blue-600 shadow-md"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
