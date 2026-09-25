import React, { useState, useEffect, useMemo } from 'react';
import {
  getSchoolAnnouncements,
  refreshSchoolAnnouncements,
  syncAnnouncementsFromCache,
} from '../../utils/schoolAnnouncements';
import { parseImageUrl } from '../../utils/imageUtils';

export default function LatestUpdates() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);

  const buildSchoolUpdates = () => {
    const announcements = getSchoolAnnouncements();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const latestNews = (announcements.news || [])
      .slice(0, 8)
      .map((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        const diffTime = today.getTime() - itemDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        return {
          id: `news-${item.id}`,
          content_text: item.title || 'News update',
          category: 'Latest News',
          tag: diffDays <= 10 ? 'Latest News' : 'News',
          priority: item.priority || 'medium',
          date: item.date,
          url: `/announcements/news-notifications/${item.id}`,
        };
      });

    const noticeItems = (announcements.notices || [])
      .slice(0, 8)
      .map((item) => ({
        id: `notice-${item.id}`,
        content_text: item.title || 'Notice update',
        category: 'Notice/Circulars',
        tag: 'Notice',
        priority: item.priority || 'medium',
        date: item.date,
        url: item.pdfUrl ? parseImageUrl(item.pdfUrl) : '/announcements/notices',
      }));

    const allEvents = announcements.events || [];

    // Newest 6 events
    const events = allEvents
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
      .slice(0, 6)
      .map((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        let tag = 'Ongoing Event';
        
        if (itemDate > today) {
          tag = 'Upcoming Event';
        } else if (itemDate < today) {
          tag = 'Past Event';
        }

        return {
          id: `event-${item.id}`,
          content_text: item.title || 'Event update',
          category: 'Ongoing Events',
          tag: tag,
          priority: item.priority || 'high',
          date: item.date,
          url: `/announcements/event-calendar/${item.id}`,
        };
      });

    return [...latestNews, ...noticeItems, ...events];
  };

  const categories = useMemo(() => [
    { category: 'Latest News' },
    { category: 'Notice/Circulars' },
    { category: 'Ongoing Events' },
  ], []);

  const viewMoreUrls = {
    'Latest News': '/announcements/news-notifications',
    'Notice/Circulars': '/announcements/notices',
    'Ongoing Events': '/announcements/event-calendar',
  };

  useEffect(() => {
    setIsVisible(true);

    const loadUpdates = async () => {
      try {
        await refreshSchoolAnnouncements();
      } catch {
        syncAnnouncementsFromCache();
      }

      const notices = buildSchoolUpdates();
      setData(notices);
    };

    loadUpdates();
    window.addEventListener('storage', loadUpdates);
    window.addEventListener('focus', loadUpdates);
    window.addEventListener('announcements-data-updated', loadUpdates);

    return () => {
      window.removeEventListener('storage', loadUpdates);
      window.removeEventListener('focus', loadUpdates);
      window.removeEventListener('announcements-data-updated', loadUpdates);
    };
  }, []);

  const getPriorityIndicator = (priority = 'low') => {
    if (priority === 'high') return 'bg-red-500 animate-pulse';
    if (priority === 'medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getTypeColor = (tag) => {
    const colors = {
      'Latest News': 'bg-blue-100 text-blue-600 border-blue-200',
      'News': 'bg-sky-100 text-sky-600 border-sky-200',
      'Notice': 'bg-green-100 text-green-600 border-green-200',
      'Notice/Circulars': 'bg-green-100 text-green-600 border-green-200',
      'Ongoing Event': 'bg-orange-100 text-orange-600 border-orange-200',
      'Ongoing Events': 'bg-orange-100 text-orange-600 border-orange-200',
      'Upcoming Event': 'bg-purple-100 text-purple-600 border-purple-200',
      'Past Event': 'bg-gray-100 text-gray-600 border-gray-200',
    };
    return colors[tag?.trim()] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const emptyMessages = {
    'Latest News': 'No latest news available right now.',
    'Notice/Circulars': 'No notices or circulars available right now.',
    'Ongoing Events': 'No ongoing events at the moment.',
  };

  const NoticeCard = ({ item, index }) => (
    <a
      href={item.url}
      className={`group relative flex items-start gap-3 p-4 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg border border-transparent hover:border-blue-100 ${isVisible ? 'animate-slide-in' : 'opacity-0 translate-y-4'}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className={`w-1.5 h-16 ${getPriorityIndicator(item.priority)} rounded-full flex-shrink-0 mt-1 shadow-sm`}></div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-800 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors duration-200">
          {item.content_text}
        </h4>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date(item.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
        </p>
      </div>
      <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 border transition-all duration-200 group-hover:scale-105 ${getTypeColor(item.tag)}`}>{item.tag}</span>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/5 group-hover:to-indigo-600/5 transition-all duration-300"></div>
    </a>
  );

  return (
    <section className="px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-10 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <style jsx>{`
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
        .marquee-wrapper {
          overflow: hidden;
          height: 350px;
          position: relative;
        }
        .marquee-content {
          display: flex;
          flex-direction: column;
          animation: scroll-up linear infinite;
        }
        @keyframes scroll-up {
          0% { transform: translateY(0%); }
          100% { transform: translateY(-50%); }
        }
      `}</style>

      <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((catItem, catIndex) => {
          const category = catItem.category.trim();
          const filtered = data.filter(item => item.category.trim() === category);
          const hasItems = filtered.length > 0;
          const marqueeDuration = `${Math.max(filtered.length, 1) * 5}s`;

          return (
            <div key={catIndex} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden flex flex-col relative">
              <div className="p-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white">
                <h3 className="text-lg font-semibold">{category}</h3>
              </div>

              <div className="relative flex-1 flex flex-col">
                <div className="marquee-wrapper">
                  {hasItems ? (
                    <div className="marquee-content space-y-3" style={{ animationDuration: marqueeDuration }}>
                      {filtered.concat(filtered).map((item, i) => (
                        <NoticeCard key={`${item.id}-${i}`} item={item} index={i} category={category} />
                      ))}
                    </div>
                  ) : (
                    <div className="p-4">
                      <div className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50">
                        <div className="w-1.5 h-16 bg-gray-300 rounded-full flex-shrink-0 mt-1"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-700 text-sm leading-snug mb-2">
                            {emptyMessages[category]}
                          </h4>
                          <p className="text-xs text-gray-500">Please check back later.</p>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium flex-shrink-0 border ${getTypeColor(category)}`}>
                          {category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex align-middle justify-end z-10 mt-4 h-10">
                  <button
                    onClick={() => {
                      const url = viewMoreUrls[category] || '/announcements/news-notifications';
                      window.location.href = url;
                    }}
                    className="px-4 py-1 text-blue-600  rounded-2xl font-semibold hover:bg-blue-500 hover:text-white transition-colors duration-200 bg-transparent"
                  >
                    View More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}