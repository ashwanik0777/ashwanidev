import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  Eye,
  Calendar,
  Image,
  X,
  Award,
  Heart,
  Users,
} from "lucide-react";
import StatsCard from "../StatsCard";
import SearchableWrapper from "../Searchbar/SearchableWrapper";

const NSSGallery = ({ nssData }) => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState("all");
  const [dialogImage, setDialogImage] = useState(null);

  const defaultGalleryItems = [
    {
      id: 1,
      title: "Mega Blood Donation Camp 2024",
      category: "Health",
      event: "Blood Donation Camp",
      year: "2024",
      date: "2024-04-19",
      images: [
        {
          url: "https://nss.gbu.ac.in/uploads/imagesfiles/666c5b818913d_WhatsApp%20Image%202024-04-19%20at%201.59.17%20PM%20(1).jpeg",
          caption: "Volunteers registering blood donors at GBU Health Centre",
        },
        {
          url: "https://nss.gbu.ac.in/uploads/imagesfiles/666c5b5215672_WhatsApp%20Image%202024-04-19%20at%201.28.41%20PM%20(1).jpeg",
          caption: "Medical team conducting pre-donation health checkups",
        },
        {
          url: "https://nss.gbu.ac.in/uploads/imagesfiles/666c5b43cda9a_WhatsApp%20Image%202024-04-19%20at%202.00.34%20PM.jpeg",
          caption: "GBU student volunteers donating blood",
        },
        {
          url: "https://nss.gbu.ac.in/uploads/imagesfiles/666c5b5c4bf7a_WhatsApp%20Image%202024-04-19%20at%204.04.40%20PM.jpeg",
          caption: "Volunteer team with donor appreciation certificates",
        },
      ],
    },
    {
      id: 2,
      title: "Cyber Sanskar & Awareness Campaign",
      category: "Education",
      event: "Cyber Awareness",
      year: "2024",
      date: "2024-03-12",
      images: [
        {
          url: "https://cdn-prod.mybharats.in/events/68e8e4a314007137094.jpg",
          caption: "NSS GBU Cyber Sanskar workshop launch",
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQskMRga2F9mYN9FclMItZ1uhC-XCXkCDM6NuH1ryD_EGqplR1XrarhOZpafQ2V-WPvBs&usqp=CAU",
          caption: "NSS GBU official emblem badge and volunteers interactive session",
        },
      ],
    },
    {
      id: 3,
      title: "Campus Cleanliness & Tree Plantation Drive",
      category: "Environment",
      event: "Environmental Drive",
      year: "2024",
      date: "2024-02-05",
      images: [
        {
          url: "https://nss.gbu.ac.in/uploads/imagesfiles/666c5b818913d_WhatsApp%20Image%202024-04-19%20at%201.59.17%20PM%20(1).jpeg",
          caption: "Volunteers planting saplings across GBU campus green belts",
        },
        {
          url: "https://cdn-prod.mybharats.in/events/68e8e4a314007137094.jpg",
          caption: "Swachh Bharat Abhiyan cleanliness drive team",
        },
      ],
    },
    {
      id: 4,
      title: "Youth Leadership & Village Outreach Program",
      category: "Community",
      event: "Rural Development",
      year: "2023",
      date: "2023-11-20",
      images: [
        {
          url: "https://nss.gbu.ac.in/uploads/imagesfiles/666c5b43cda9a_WhatsApp%20Image%202024-04-19%20at%202.00.34%20PM.jpeg",
          caption: "NSS volunteers interacting with adopted village community members",
        },
        {
          url: "https://nss.gbu.ac.in/uploads/imagesfiles/666c5b5c4bf7a_WhatsApp%20Image%202024-04-19%20at%204.04.40%20PM.jpeg",
          caption: "Community service recognition ceremony",
        },
      ],
    },
  ];

  const dbGallery = nssData?.content?.eventGallery || [];
  const galleryItems = dbGallery.length > 0
    ? dbGallery.map((g, idx) => ({
        id: idx + 1,
        title: g.title || "NSS Event Image",
        category: "Social",
        event: g.title || "NSS Event",
        year: g.eventDate ? g.eventDate.split('-')[0] : "2024",
        date: g.eventDate || "2024-01-15",
        images: [
          { url: g.imageUrl || g.image || "https://cdn-prod.mybharats.in/events/68e8e4a314007137094.jpg", caption: g.title || "Event Photo" }
        ]
      }))
    : defaultGalleryItems;

  const filteredItems = galleryItems.filter((item) => {
    const yearMatch = selectedYear === "all" || item.year === selectedYear;
    const categoryMatch =
      selectedCategory === "all" || item.category === selectedCategory;
    const eventMatch = selectedEvent === "all" || item.event === selectedEvent;
    return yearMatch && categoryMatch && eventMatch;
  });

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
      icon: Image,
      numberText: "500+",
      title: "Photos Captured",
      iconColor: "#2563eb",
    },
    {
      icon: Calendar,
      numberText: "50+",
      title: "Events Documented",
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
            Visual highlights capturing moments of selfless community service, tree plantation drives, and student engagement.
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
                Filter Gallery:
              </span>
            </div>

            {[
              {
                value: selectedYear,
                setValue: setSelectedYear,
                options: ["all", "2024", "2023"],
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
                  "Blood Donation Camp",
                  "Cyber Awareness",
                  "Environmental Drive",
                  "Rural Development",
                ],
                label: "Event",
                width: "w-44",
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
          className="space-y-8"
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
                  </p>
                </div>
                <div className="flex items-center space-x-2">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {item.images.map((image, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
                      onClick={() => setDialogImage(image)}
                    >
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                        <div className="self-end bg-white/20 backdrop-blur-md p-1.5 rounded-full">
                          <Eye className="h-4 w-4 text-white" />
                        </div>
                        <p className="text-xs font-medium line-clamp-2 leading-relaxed">
                          {image.caption}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  <span>{item.images.length} Verified Photos</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Dialog Modal */}
        <AnimatePresence>
          {dialogImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setDialogImage(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-3xl relative border border-slate-100 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-slate-400 hover:text-slate-950 p-2 hover:bg-slate-100 rounded-full cursor-pointer transition-all"
                  onClick={() => setDialogImage(null)}
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-slate-100">
                    <img
                      src={dialogImage.url}
                      alt={dialogImage.caption}
                      className="w-full max-h-[65vh] object-contain bg-slate-900"
                    />
                  </div>
                  <div className="pt-2 text-center sm:text-left">
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {dialogImage.caption}
                    </p>
                  </div>
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
