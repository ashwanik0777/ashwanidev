import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  CalendarDays, 
  FileText, 
  Bell, 
  Search,
  Calendar,
  ExternalLink,
  Newspaper,
  Eye,
  ThumbsUp,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BannerSection from "../../components/HeroBanner";
import {
  getSchoolAnnouncements,
  refreshSchoolAnnouncements,
  syncAnnouncementsFromCache,
} from "../../utils/schoolAnnouncements";
import { parseImageUrl } from "../../utils/imageUtils.js";
import { getSchoolMeta } from "../../utils/schoolMeta";

const formatDate = (dateString) => {
  if (!dateString) return "Date TBA";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateString;
  }
};

const EmptyState = ({ type }) => {
  const labels = { notices: "Notices", events: "Events", news: "News" };
  const icons = { notices: Bell, events: Calendar, news: Newspaper };
  const Icon = icons[type] || Bell;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 text-center px-4"
    >
      <div className="w-24 h-24 mb-6 rounded-full bg-indigo-50/50 flex items-center justify-center">
        <Icon className="w-12 h-12 text-indigo-300" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        No {labels[type] || "Items"} Found
      </h3>
      <p className="text-gray-500 max-w-md mx-auto">
        There are currently no {labels[type]?.toLowerCase() || "items"} for this school. Please check back later.
      </p>
    </motion.div>
  );
};

/* ───────────────────── Notice Card ───────────────────── */
const NoticeCard = ({ notice, index }) => {
  const pdfLink = notice.pdfUrl ? parseImageUrl(notice.pdfUrl) : null;
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
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
              <CalendarDays className="w-3.5 h-3.5" />
              {formatDate(notice.date)}
            </span>
            {notice.type && notice.type !== "General" && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
                {notice.type}
              </span>
            )}
            {notice.isNew && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white">
                NEW
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700 transition-colors mb-2 line-clamp-2">
            {notice.title}
          </h3>
          
          {notice.content && (
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{notice.content}</p>
          )}

          <div className="flex items-center justify-between mt-3">
            {notice.views > 0 ? (
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> {notice.views} views
              </span>
            ) : <span />}

            <div className="flex items-center gap-3">
              {pdfLink && (
                <a 
                  href={pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  View PDF <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ───────────────────── Event Card ───────────────────── */
const EventCard = ({ event, index }) => {
  const imageUrl = event.coverImageUrl ? parseImageUrl(event.coverImageUrl) :
                   event.image ? parseImageUrl(event.image) : null;
  const isPast = !event.isUpcoming;

  return (
    <Link to={`/announcements/event-calendar/${event.id}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer"
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <Calendar className="w-16 h-16 text-indigo-300 opacity-50" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />

          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md ${
              isPast ? "bg-gray-900/60 text-white" : "bg-emerald-500/90 text-white"
            }`}>
              {isPast ? "Completed" : "Upcoming"}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1">
              <CalendarDays className="w-4 h-4" />
              <span>{formatDate(event.date)}</span>
            </div>
            <h3 className="text-lg font-bold leading-tight line-clamp-2">
              {event.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-grow">
          {event.description && (
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed flex-grow mb-4">
              {event.description}
            </p>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            {event.type && event.type !== "General" && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                {event.type}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors ml-auto">
              View Details <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

/* ───────────────────── News Card ───────────────────── */
const NewsCard = ({ news, index }) => {
  const imageUrl = news.coverImageUrl ? parseImageUrl(news.coverImageUrl) :
                   news.image ? parseImageUrl(news.image) : null;
  const readMoreUrl = news.link || (news.pdfUrl ? parseImageUrl(news.pdfUrl) : null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
    >
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={news.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.parentElement.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
            <CalendarDays className="w-3 h-3" />
            {formatDate(news.date)}
          </span>
          {news.category && news.category !== "General" && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
              {news.category}
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-gray-900 group-hover:text-indigo-700 transition-colors mb-2 line-clamp-2">
          {news.title}
        </h3>

        {news.excerpt && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">{news.excerpt}</p>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            {news.views > 0 && (
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {news.views}</span>
            )}
            {news.likes > 0 && (
              <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {news.likes}</span>
            )}
          </div>
          <Link
            to={`/announcements/news-notifications/${news.id}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors ml-auto"
          >
            Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

/* ───────────────────── Main Page ───────────────────── */
const SchoolActivitiesAnnouncements = () => {
  const { shortCode } = useParams();
  const schoolCode = (shortCode || "GLOBAL").toUpperCase();
  const schoolMeta = getSchoolMeta(schoolCode);
  const schoolDisplayName = schoolMeta?.name || schoolCode;
  
  const [data, setData] = useState({ notices: [], events: [], news: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("notices");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      setLoading(true);
      try {
        await refreshSchoolAnnouncements(schoolCode);
      } catch {
        syncAnnouncementsFromCache();
      }

      if (isMounted) {
        const a = getSchoolAnnouncements(schoolCode);
        setData({ notices: a.notices || [], events: a.events || [], news: a.news || [] });
        setLoading(false);
      }
    };
    
    loadData();
    window.addEventListener("announcements-data-updated", loadData);
    window.addEventListener("focus", loadData);

    return () => { 
      isMounted = false; 
      window.removeEventListener("announcements-data-updated", loadData);
      window.removeEventListener("focus", loadData);
    };
  }, [schoolCode]);

  const tabs = [
    { id: "notices", label: "Notices & Circulars", icon: Bell },
    { id: "events", label: "Events & Activities", icon: Calendar },
    { id: "news", label: "News & Updates", icon: Newspaper },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSearchQuery("");
  };

  const getTabData = (tabId) => {
    const items = data[tabId] || [];
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(item => 
      (item.title || "").toLowerCase().includes(q) ||
      (item.content || "").toLowerCase().includes(q) ||
      (item.excerpt || "").toLowerCase().includes(q) ||
      (item.description || "").toLowerCase().includes(q)
    );
  };

  const currentData = getTabData(activeTab);
  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
  const paginatedData = currentData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50/50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="relative z-10">
        <BannerSection
          title={`${schoolDisplayName} — Updates`}
          subtitle="Stay updated with the latest notices, circulars, events, news and activities."
          bgTheme={9}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Tabs + Search */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            <div className="inline-flex bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-gray-100">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                const count = data[tab.id]?.length || 0;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      isActive ? "text-indigo-700" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
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
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                        isActive ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"
                      }`}>{count}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300"
              />
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[400px]">
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                <p className="text-gray-500 font-medium">Loading updates...</p>
              </div>
            ) : currentData.length === 0 ? (
              <EmptyState type={activeTab} />
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab + currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  >
                    {paginatedData.map((item, index) => {
                      if (activeTab === "notices") return <NoticeCard key={item.id || index} notice={item} index={index} />;
                      if (activeTab === "events") return <EventCard key={item.id || index} event={item} index={index} />;
                      return <NewsCard key={item.id || index} news={item} index={index} />;
                    })}
                  </motion.div>
                </AnimatePresence>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-12 gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <div className="flex items-center gap-1 px-4">
                      {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                        let pageNum;
                        if (totalPages <= 7) pageNum = i + 1;
                        else if (currentPage <= 4) pageNum = i + 1;
                        else if (currentPage >= totalPages - 3) pageNum = totalPages - 6 + i;
                        else pageNum = currentPage - 3 + i;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === pageNum 
                                ? "bg-indigo-600 text-white" 
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolActivitiesAnnouncements;
