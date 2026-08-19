import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import SocialShare from '../../components/announcement/SocialShare';
import { useState, useEffect } from "react";
import {
  getSchoolAnnouncements,
  refreshSchoolAnnouncements,
  syncAnnouncementsFromCache,
} from '../../utils/schoolAnnouncements';
import { formatAnnouncementDate } from '../../utils/announcementDate';
import { parseImageUrl } from '../../utils/imageUtils.js';

// Button component
const Button = ({ children, variant = "default", size = "md", className = "", ...props }) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 bg-white hover:bg-blue-50",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Badge component
const Badge = ({ children, className = "" }) => (
  <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${className}`}>
    {children}
  </span>
);

const format = (date) => formatAnnouncementDate(date, "MMMM dd, yyyy");

const NewsDetail = () => {
  const { id } = useParams();
  const [mockNews, setMockNews] = useState(() => getSchoolAnnouncements().news);
  const newsItem = mockNews.find((item) => String(item.id) === String(id));
  
  useEffect(() => {
    let isMounted = true;

    const loadNews = async () => {
      try {
        await refreshSchoolAnnouncements();
      } catch {
        syncAnnouncementsFromCache();
      }

      if (isMounted) {
        setMockNews(getSchoolAnnouncements().news);
      }
    };

    loadNews();
    window.addEventListener("storage", loadNews);
    window.addEventListener("focus", loadNews);
    window.addEventListener("announcements-data-updated", loadNews);

    return () => {
      isMounted = false;
      window.removeEventListener("storage", loadNews);
      window.removeEventListener("focus", loadNews);
      window.removeEventListener("announcements-data-updated", loadNews);
    };
  }, []);

  if (!newsItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">News not found</h1>
          <Link to="/announcements/news-notifications">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getTypeColor = (category) => {
    const colors = {
      'Research': 'bg-purple-100 text-purple-800',
      'Campus': 'bg-green-100 text-green-800',
      'Academic': 'bg-blue-100 text-blue-800',
      'Sports': 'bg-orange-100 text-orange-800',
      'General': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors['General'];
  };

  const imageUrl = newsItem.coverImageUrl ? parseImageUrl(newsItem.coverImageUrl) :
                   newsItem.image ? parseImageUrl(newsItem.image) : null;
  const pdfUrl = newsItem.pdfUrl ? parseImageUrl(newsItem.pdfUrl) : null;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
        <div className="mb-6">
          <Link to="/announcements/news-notifications">
            <Button variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" />
              Back to News
            </Button>
          </Link>
        </div>

        {newsItem.category && (
          <Badge className={`${getTypeColor(newsItem.category)} mb-2`}>
            {newsItem.category}
          </Badge>
        )}

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">{newsItem.title}</h1>
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600 mb-2">{newsItem.schoolName}</p>
        <p className="text-gray-500 mb-6">Published on {format(newsItem.date, 'MMMM dd, yyyy')}</p>

        {imageUrl && (
          <div className="mb-6 rounded-2xl overflow-hidden shadow-md">
            <img
              src={imageUrl}
              alt={newsItem.title}
              className="w-full max-h-96 object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none mb-6">
          <p className="text-lg text-gray-700 leading-relaxed">{newsItem.content || newsItem.excerpt}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Button>
                <Download size={16} className="mr-2" />
                Download PDF
              </Button>
            </a>
          )}
          {newsItem.link && (
            <a
              href={newsItem.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <ExternalLink size={16} className="mr-2" />
                External Link
              </Button>
            </a>
          )}
          <SocialShare
            url={window.location.href}
            title={newsItem.title}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
