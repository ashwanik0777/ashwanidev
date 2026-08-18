import React, { useEffect, useState } from "react";
import homeData from "../../Data/home.json";

export default function CampusLifeSection() {
  const [testimonials, setTestimonials] = useState([]);
  const BASE = (import.meta.env.VITE_HOST || "").replace(/\/$/, "");

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/600x400?text=No+Image";
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith("/")) return path;
    const cleanPath = path.replace(/^\/+/, "");
    if (BASE) {
      return `${BASE}/${cleanPath.startsWith("media/") ? cleanPath : `media/${cleanPath}`}`;
    }
    return `/${cleanPath}`;
  };

  useEffect(() => {
    const campusLife = homeData?.sections?.campus_life || [];
    const normalized = campusLife.map((item) => ({
      ...item,
      image: getImageUrl(item.image),
    }));
    setTestimonials(normalized);
  }, []);

  // Function to extract category from card_content
  const getCategory = (cardContent) => {
    if (cardContent.includes('Students Life')) return 'Students Life';
    if (cardContent.includes('Sports')) return 'Sports & Recreation';
    if (cardContent.includes('Cultural')) return 'Cultural Activities';
    if (cardContent.includes('Hostel')) return 'Hostel Life';
    return cardContent.split('-')[0]?.trim() || 'Campus Life';
  };

  // Function to get icon based on category
  const getCategoryIcon = (category) => {
    const icons = {
      'Students Life': '🎓',
      'Sports & Recreation': '⚽',
      'Cultural Activities': '🎭',
      'Hostel Life': '🏠',
      'Campus Life': '🏫'
    };
    return icons[category] || '🏫';
  };

  // Function to get gradient based on category
  const getCategoryGradient = (category) => {
    const gradients = {
      'Students Life': 'from-blue-500 to-purple-600',
      'Sports & Recreation': 'from-green-500 to-teal-600',
      'Cultural Activities': 'from-orange-500 to-red-600',
      'Hostel Life': 'from-pink-500 to-purple-600',
      'Campus Life': 'from-indigo-500 to-blue-600'
    };
    return gradients[category] || 'from-gray-500 to-gray-600';
  };

  // Navigation function
  const handleCardClick = (item) => {
    let src = '';
    
    switch(item.id) {
      case 1:
        src = '/campus-life/hero';
        break;
      case 2:
        src = '/campus-life/sports-fitness';
        break;
      case 3:
        src = '/announcements/news-notifications';
        break;
      case 4:
        src = 'https://hostels.gbu.ac.in/';
        break;
      default:
        src = '/campus-life/hero';
    }
    
    window.location.href = src;
  };

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-4 sm:py-10 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 text-blue-800">
          Campus Life at GBU
        </h2>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {testimonials.map((item, index) => {
          const category = getCategory(item.card_content);
          const icon = getCategoryIcon(category);
          
          return (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200/50 shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image container */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Image overlay gradient */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80`} />

                {/* Icon container */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-lg shadow-lg border border-white/30 text-white">
                  {icon}
                </div>
                
                {/* Title Overlay with arrow */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <h3 className="font-bold text-xl text-white drop-shadow-md">
                    {category}
                  </h3>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/40 transition-all">
                    <svg className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* ID badge for reference */}
              <div className="absolute top-2 left-2 opacity-30">
                <div className="w-5 h-5 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{item.id}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Loading state */}
      {testimonials.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      )}
    </div>
  );
}
