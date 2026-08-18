import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { 
  CalendarDays, 
  MapPin, 
  Users, 
  ArrowRight, 
  FileText, 
  Bell, 
  Search,
  Calendar,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BannerSection from "../../components/HeroBanner";
import {
  getSchoolAnnouncements,
  refreshSchoolAnnouncements,
  syncAnnouncementsFromCache,
} from "../../utils/schoolAnnouncements";
import { parseImageUrl } from "../../utils/imageUtils.js";

// Helper for formatting dates
const formatDate = (dateString) => {
  if (!dateString) return "Date TBA";
  try {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    return dateString;
  }
};

const EmptyState = ({ type }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center px-4"
    >
      <div className="w-24 h-24 mb-6 rounded-full bg-indigo-50/50 flex items-center justify-center">
        {type === "notices" ? (
          <Bell className="w-12 h-12 text-indigo-300" />
        ) : (
          <Calendar className="w-12 h-12 text-indigo-300" />
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        No {type === "notices" ? "Notices" : "Events"} Found
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        There are currently no active {type === "notices" ? "notices or circulars" : "events or activities"} for this school. Please check back later.
      </p>
    </motion.div>
  );
};

const NoticeCard = ({ notice, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative bg-white border border-gray-200 hover:border-indigo-200 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
          <FileText className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(notice.date)}
            </span>
            {notice.department && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                {notice.department}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors mb-2 line-clamp-2">
            {notice.title}
          </h3>
          
          {notice.description && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {notice.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-gray-500 font-medium">
              Ref: {notice.refNo || 'N/A'}
            </span>
            
            {notice.fileUrl && (
              <a 
                href={notice.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                View Document
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EventCard = ({ event, index }) => {
  const imageUrl = event.image ? parseImageUrl(event.image) : null;
  const isPast = event.status === "past" || new Date(event.date) < new Date();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative"
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
            <Calendar className="w-16 h-16 text-indigo-300 opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${
            isPast 
              ? "bg-gray-900/60 text-white" 
              : "bg-emerald-500/90 text-white"
          }`}>
            {isPast ? "Completed" : "Upcoming"}
          </span>
        </div>
        
        {/* Date Overlay */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1">
            <CalendarDays className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <h3 className="text-xl font-bold leading-tight group-hover:text-indigo-300 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow bg-white">
        {event.description && (
          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
            {event.description}
          </p>
        )}
        
        <div className="space-y-3 pt-4 border-t border-gray-100">
          {event.location && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-medium truncate">{event.location}</span>
            </div>
          )}
          
          {event.organizer && (
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-medium truncate">{event.organizer}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SchoolActivitiesAnnouncements = () => {
  const { shortCode } = useParams();
  const schoolCode = (shortCode || "GLOBAL").toUpperCase();
  
  const [data, setData] = useState({ notices: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("notices");

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      setLoading(true);
      try {
        const latest = await refreshSchoolAnnouncements(schoolCode);
        if (isMounted) {
          setData({ 
            notices: latest.notices || [], 
            events: latest.events || [] 
          });
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          syncAnnouncementsFromCache();
          const cached = getSchoolAnnouncements(schoolCode);
          setData({ 
            notices: cached.notices || [], 
            events: cached.events || [] 
          });
          setLoading(false);
        }
      }
    };
    
    loadData();
    return () => { isMounted = false; };
  }, [schoolCode]);

  // Tab configurations
  const tabs = [
    { id: "notices", label: "Notices & Circulars", icon: Bell },
    { id: "events", label: "Events & Activities", icon: Calendar }
  ];

  const currentData = activeTab === "notices" ? data.notices : data.events;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <BannerSection
        title={`${schoolCode} Updates`}
        subtitle="Stay updated with the latest notices, circulars, events, and activities."
        bgTheme={9}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Custom Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-gray-100">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isActive 
                      ? "text-indigo-700" 
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-indigo-50 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : ""}`} />
                    {tab.label}
                    <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs ${
                      isActive ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"
                    }`}>
                      {tab.id === "notices" ? data.notices.length : data.events.length}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-gray-500 font-medium">Loading updates...</p>
            </div>
          ) : currentData.length === 0 ? (
            <EmptyState type={activeTab} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={
                  activeTab === "notices"
                    ? "grid gap-4 md:grid-cols-2" // Notices layout
                    : "grid gap-8 md:grid-cols-2 lg:grid-cols-3" // Events layout
                }
              >
                {currentData.map((item, index) => 
                  activeTab === "notices" ? (
                    <NoticeCard key={item.id || index} notice={item} index={index} />
                  ) : (
                    <EventCard key={item.id || index} event={item} index={index} />
                  )
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolActivitiesAnnouncements;
