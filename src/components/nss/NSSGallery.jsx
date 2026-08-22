import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Eye,
  Calendar,
  Image as ImageIcon,
  X,
  Award,
  Users,
  Grid,
  Layers,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import StatsCard from "../StatsCard";
import SearchableWrapper from "../Searchbar/SearchableWrapper";
import { NSS_OFFICIAL_GALLERY } from "./nssGalleryData";

const NSSGallery = ({ nssData }) => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [activeModalImage, setActiveModalImage] = useState(null);
  const [activeModalIndex, setActiveModalIndex] = useState(0);
  const [currentAlbumImages, setCurrentAlbumImages] = useState([]);

  const galleryItems = NSS_OFFICIAL_GALLERY || [];

  const filteredItems = galleryItems.filter((item) => {
    const yearMatch = selectedYear === "all" || item.year === selectedYear;
    const categoryMatch =
      selectedCategory === "all" || item.category === selectedCategory;
    const eventMatch = selectedEvent === "all" || item.event === selectedEvent;
    return yearMatch && categoryMatch && eventMatch;
  });

  const totalPhotosCount = galleryItems.reduce((acc, item) => acc + (item.images?.length || 0), 0);

  const getCategoryColor = (category) => {
    const colors = {
      Health: "bg-red-50 text-red-700 border border-red-200",
      Education: "bg-purple-50 text-purple-700 border border-purple-200",
      Environment: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      Community: "bg-amber-50 text-amber-700 border border-amber-200",
    };
    return colors[category] || "bg-slate-100 text-slate-700 border border-slate-200";
  };

  const galleryStatsData = [
    {
      icon: ImageIcon,
      numberText: `${totalPhotosCount}+`,
      title: "Photos Captured",
      iconColor: "#2563eb",
    },
    {
      icon: Layers,
      numberText: `${galleryItems.length}`,
      title: "Event Albums",
      iconColor: "#16a34a",
    },
    {
      icon: Users,
      numberText: "500+",
      title: "Active Volunteers",
      iconColor: "#9333ea",
    },
    {
      icon: Award,
      numberText: "10+",
      title: "Years of Service",
      iconColor: "#f97316",
    },
  ];

  const openModal = (images, index) => {
    setCurrentAlbumImages(images);
    setActiveModalIndex(index);
    setActiveModalImage(images[index]);
  };

  const handleNextPhoto = () => {
    if (!currentAlbumImages.length) return;
    const nextIdx = (activeModalIndex + 1) % currentAlbumImages.length;
    setActiveModalIndex(nextIdx);
    setActiveModalImage(currentAlbumImages[nextIdx]);
  };

  const handlePrevPhoto = () => {
    if (!currentAlbumImages.length) return;
    const prevIdx = (activeModalIndex - 1 + currentAlbumImages.length) % currentAlbumImages.length;
    setActiveModalIndex(prevIdx);
    setActiveModalImage(currentAlbumImages[prevIdx]);
  };

  return (
    <SearchableWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10 px-4 sm:px-6 lg:px-12 mx-auto max-w-7xl"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            NSS GBU Photo Gallery
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Authentic photo galleries extracted directly from the official Gautam Buddha University NSS Cell archive.
          </p>
        </motion.div>

        {/* Gallery Statistics */}
        <StatsCard stats={galleryStatsData} />

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border border-slate-100 shadow-md p-6"
        >
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <div className="flex items-center space-x-2 mr-2">
              <Filter className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-bold text-slate-800">
                Filter Event Albums:
              </span>
            </div>

            {[
              {
                value: selectedYear,
                setValue: setSelectedYear,
                options: ["all", "2026", "2024", "2023"],
                label: "Year",
                width: "w-32",
              },
              {
                value: selectedCategory,
                setValue: setSelectedCategory,
                options: [
                  "all",
                  "Health",
                  "Education",
                  "Environment",
                  "Community",
                ],
                label: "Category",
                width: "w-36",
              },
              {
                value: selectedEvent,
                setValue: setSelectedEvent,
                options: [
                  "all",
                  "Nasha Mukt Yuva Abhiyan",
                  "Environmental Drive",
                  "Cyber Awareness",
                  "Blood Donation Camp",
                  "Yoga & Wellness",
                  "Rural Camp",
                  "Distribution Drive",
                  "Clean-Up Drive",
                ],
                label: "Event",
                width: "w-52",
              },
            ].map(({ value, setValue, options, label, width }, i) => (
              <div key={i} className={`relative ${width}`}>
                <select
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl bg-white text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer shadow-sm"
                >
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt === "all" ? `All ${label}s` : opt}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="space-y-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-extrabold text-xl text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                    <Calendar size={13} className="text-blue-600" />
                    <span>
                      {new Date(item.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="text-slate-600 font-normal">{item.description}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold border border-slate-200 text-slate-700 bg-slate-50">
                    {item.year}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {item.images.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                      onClick={() => openModal(item.images, index)}
                    >
                      <img
                        src={image.url}
                        alt={image.title || item.title}
                        className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://cdn-prod.mybharats.in/events/68e8e4a314007137094.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-white">
                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full">
                          <Eye className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  <span>{item.images.length} High-Resolution Photos</span>
                  <span className="text-blue-600">Click any photo to view full slider</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Full Screen Image Modal Carousel */}
        <AnimatePresence>
          {activeModalImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
              onClick={() => setActiveModalImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-4xl relative border border-slate-100 max-h-[95vh] flex flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-950 p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-all"
                  onClick={() => setActiveModalImage(null)}
                  aria-label="Close"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="relative flex items-center justify-center min-h-[50vh] max-h-[70vh] bg-slate-950 rounded-2xl overflow-hidden">
                  <img
                    src={activeModalImage.url}
                    alt={activeModalImage.title}
                    className="max-h-[70vh] w-auto max-w-full object-contain"
                  />

                  {/* Slider Prev / Next Controls */}
                  {currentAlbumImages.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevPhoto}
                        className="absolute left-4 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={handleNextPhoto}
                        className="absolute right-4 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    {activeModalImage.title || "NSS GBU Official Photo Archive"}
                  </p>
                  <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                    {activeModalIndex + 1} / {currentAlbumImages.length}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </SearchableWrapper>
  );
};

export default NSSGallery;
