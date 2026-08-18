import { useState, useEffect, useMemo } from "react";
import { Download, FileText, Calendar, Eye, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Pagination from '../../components/announcement/Pagination';
import BannerSection from '../../components/HeroBanner';
import StatsCard from '../../components/StatsCard';
import {
  getSchoolAnnouncements,
  refreshSchoolAnnouncements,
  syncAnnouncementsFromCache,
} from '../../utils/schoolAnnouncements';
import { collectYears, getAnnouncementYear } from '../../utils/announcementDate';
import UnifiedAnnouncementFilter from '../../components/announcement/UnifiedAnnouncementFilter';
import { parseImageUrl } from '../../utils/imageUtils.js';

// === Modern Card Components ===
const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    className={`bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-bold text-gray-900 leading-tight mb-2 ${className}`}>{children}</h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 line-clamp-2 ${className}`}>{children}</p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 pt-0 ${className}`}>{children}</div>
);

// === Modern Button Component ===
const Button = ({ children, type = "button", variant = "primary", size = "md", className = "", ...props }) => {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// === Modern Badge Component ===
const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-50 text-blue-700 border border-blue-200",
    new: "bg-green-500 text-white shadow-lg animate-pulse",
    outline: "bg-white text-blue-600 border border-blue-300",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};


const NewsLetter = ({ schoolCode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mockNewsletters, setMockNewsletters] = useState(() => getSchoolAnnouncements(schoolCode).newsletters);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    let isMounted = true;

    const loadNewsletters = async () => {
      setLoading(true);
      try {
        await refreshSchoolAnnouncements(schoolCode);
      } catch {
        syncAnnouncementsFromCache();
      }
      
      if (isMounted) {
        setMockNewsletters(getSchoolAnnouncements(schoolCode).newsletters || []);
        setLoading(false);
      }
    };

    loadNewsletters();
    return () => { isMounted = false; };
  }, [schoolCode]);

  // Derive unique years for the filter
  const allYears = useMemo(
    () => collectYears(mockNewsletters, 'date'),
    [mockNewsletters]
  );

  // Apply filters and search
  const filteredNewsletters = useMemo(() => {
    return mockNewsletters.filter((item) => {
      const yearStr = getAnnouncementYear(item.date);
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesYear = selectedYear === "all" || yearStr === selectedYear;

      return matchesSearch && matchesYear;
    });
  }, [mockNewsletters, searchQuery, selectedYear]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear]);

  // Safe calculations
  const totalPages = Math.ceil(filteredNewsletters.length / itemsPerPage) || 1;
  const currentNewsletters = filteredNewsletters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const latestId = mockNewsletters.length > 0 ? mockNewsletters[0].id : null;

  // Dynamic values for StatsCard
  const latestYear = getAnnouncementYear(mockNewsletters[0]?.date) || String(new Date().getFullYear());

  return (
    <div className="min-h-screen bg-gray-50/50">
      <BannerSection
        title="Newsletter"
        subtitle="Stay updated with the latest campus highlights and newsletters"
        bgTheme={3}
      />

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <StatsCard
          stats={[
            { number: mockNewsletters.length, title: "Total Issues", icon: FileText, iconColor: "#4F46E5" },
            { number: latestYear, title: "Latest Year", icon: Calendar, iconColor: "#EF4444" }
          ]}
        />


        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Newsletter Archive</h2>
          </div>
        </div>

        <UnifiedAnnouncementFilter
          onSearch={setSearchQuery}
          categories={[]} // no longer filtering by category
          selectedCategories={[]}
          onCategoryToggle={() => {}}
          onTypeChange={() => {}}
          selectedType={"all"}
          years={allYears}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          showDate={false}
          showViewMode={false}
          totalResults={filteredNewsletters.length}
          searchPlaceholder="Search newsletters by title or description..."
        />

        {/* Loading State or Newsletter Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : mockNewsletters.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No newsletters found.</p>
          </div>
        ) : filteredNewsletters.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg">No newsletters match current filters.</p>
          </div>
        ) : (
          <>
            {/* Newsletter Grid */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
            >
              {currentNewsletters.map((newsletter) => (
                <motion.div
                  key={newsletter.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Card className="h-full flex flex-col relative group hover:border-indigo-200">
                    {/* New Badge */}
                    {newsletter.id === latestId && (
                      <Badge variant="new" className="absolute top-3 right-3 z-10">
                        NEW
                      </Badge>
                    )}

                    {/* Cover Image (Portrait Ratio) */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={parseImageUrl(newsletter.coverImage)}
                        alt={newsletter.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Card Header */}
                    <CardHeader className="flex-1 flex flex-col">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                        {newsletter.schoolName}
                      </p>

                      <CardTitle className="group-hover:text-indigo-600 transition-colors mb-2 line-clamp-2 text-xl">
                        {newsletter.title}
                      </CardTitle>

                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-medium">
                        <Calendar size={14} className="text-indigo-400" />
                        <span>{newsletter.date ? format(new Date(newsletter.date), 'MMMM dd, yyyy') : 'Date TBA'}</span>
                      </div>

                      <CardDescription className="mb-4 text-gray-600 leading-relaxed text-sm flex-1">
                        {newsletter.description}
                      </CardDescription>
                    </CardHeader>

                    {/* Card Content - Actions */}
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => newsletter.englishPdfLink && window.open(newsletter.englishPdfLink, "_blank")}
                          disabled={!newsletter.englishPdfLink}
                          className="flex items-center justify-center gap-1.5 w-full border-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200"
                        >
                          <Download size={14} />
                          English
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => newsletter.hindiPdfLink && window.open(newsletter.hindiPdfLink, "_blank")}
                          disabled={!newsletter.hindiPdfLink}
                          className="flex items-center justify-center gap-1.5 w-full border-gray-200 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200"
                        >
                          <Download size={14} />
                          Hindi
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NewsLetter;