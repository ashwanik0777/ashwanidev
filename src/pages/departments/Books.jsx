import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Award,
  FileText,
  Search,
  Globe,
  Book,
  CheckCircle,
} from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";

const iconMap = {
  BookOpen,
  Award,
  FileText,
  Globe,
  Book,
  CheckCircle,
};

const BookCard = ({ book }) => {
  const getBadgeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case "authored book":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "edited book":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "book chapter":
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        {/* Type Badge & Year */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${getBadgeStyle(
              book.type
            )}`}
          >
            {book.type}
          </span>
          {book.year && (
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {book.year}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 font-outfit leading-snug mb-3">
          {book.title}
        </h3>

        {/* Description */}
        {book.description && (
          <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {book.description}
          </p>
        )}
      </div>

      <div>
        {/* Publisher & ISBN */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs mb-3">
          {book.publisher && (
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Publisher:</span>
              <span className="font-semibold text-slate-800 text-right">
                {book.publisher}
              </span>
            </div>
          )}
          {book.isbn && (
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">ISBN:</span>
              <span className="font-mono text-slate-800 text-right">
                {book.isbn}
              </span>
            </div>
          )}
        </div>

        {/* Authors & Faculty */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          {book.faculty && (
            <div className="text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                SOICT Faculty Member
              </span>
              <span className="font-semibold text-blue-900">{book.faculty}</span>
            </div>
          )}
          {book.authors && (
            <div className="text-xs">
              <span className="text-slate-400 font-bold uppercase tracking-wider block text-[10px]">
                Authors / Contributors
              </span>
              <p className="text-slate-700 font-medium leading-relaxed">
                {book.authors}
              </p>
            </div>
          )}
        </div>

        {/* External Link / DOI Button */}
        {book.link && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg transition-colors border border-blue-200"
            >
              <Globe className="w-3.5 h-3.5" />
              View Publisher / DOI Link
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Books() {
  const { shortCode } = useParams();
  const [booksData, setBooksData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/research/books.jsx`);
        setBooksData(module.booksData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/research/books.jsx");
          setBooksData(fallback.booksData);
        } catch {
          setBooksData(null);
        }
      }
      setLoading(false);
    };

    loadData();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!booksData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Books data not available.
      </div>
    );
  }

  const { hero, stats = [], booksList = [] } = booksData;

  // Extract unique categories dynamically
  const uniqueTypes = Array.from(
    new Set(booksList.map((b) => b.type).filter(Boolean))
  );
  const categories = ["All", ...uniqueTypes];

  const filteredBooks = booksList.filter((b) => {
    const matchCategory =
      activeTab === "All" || b.type?.toLowerCase() === activeTab.toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchSearch =
      b.title.toLowerCase().includes(term) ||
      (b.faculty && b.faculty.toLowerCase().includes(term)) ||
      (b.authors && b.authors.toLowerCase().includes(term)) ||
      (b.publisher && b.publisher.toLowerCase().includes(term)) ||
      (b.isbn && b.isbn.toLowerCase().includes(term));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      <BannerSection
        title={hero?.title || "BOOKS & CHAPTERS"}
        subtitle={hero?.subtitle || "Showcasing authored textbooks, edited volumes, and published book chapters"}
        bgTheme={1}
      />

      {stats && stats.length > 0 && (
        <StatsCard
          stats={stats.map((item) => ({
            icon: iconMap[item.icon] || BookOpen,
            number: item.number,
            subtitle: item.subtitle,
          }))}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Header */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by title, author, publisher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveTab(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === category
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm font-medium text-slate-600">
            Showing <span className="font-bold text-slate-900">{filteredBooks.length}</span>{" "}
            {filteredBooks.length === 1 ? "Book" : "Books"}
          </p>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-800 mb-1">No Books Found</h3>
            <p className="text-slate-500 text-sm">
              Try adjusting your search criteria or select a different category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
