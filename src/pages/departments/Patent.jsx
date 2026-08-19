import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Award,
  Calendar,
  FileText,
  Users,
  CheckCircle,
  Clock,
  Search,
  X,
  TrendingUp,
} from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";

const iconMap = {
  Award,
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  Users,
};

const PatentCard = ({ patent }) => {
  const getBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "granted":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "published":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "filed":
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${getBadgeStyle(
              patent.status
            )}`}
          >
            Patent {patent.status}
          </span>
          {patent.year && (
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {patent.year}
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-slate-900 font-outfit leading-snug mb-3">
          {patent.title}
        </h3>

        {patent.description && (
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {patent.description}
          </p>
        )}

        <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
          {patent.patentNo && (
            <div className="flex items-start justify-between gap-2">
              <span className="text-slate-500 font-medium">Patent / App No:</span>
              <span className="font-semibold text-slate-800 text-right">
                {patent.patentNo}
              </span>
            </div>
          )}

          {patent.type && (
            <div className="flex items-start justify-between gap-2">
              <span className="text-slate-500 font-medium">Type / Office:</span>
              <span className="font-semibold text-slate-800 text-right">
                {patent.type}
              </span>
            </div>
          )}

          {patent.inventors && (
            <div className="pt-2 border-t border-slate-100">
              <span className="text-slate-500 font-bold uppercase tracking-wider block mb-1">
                Inventors
              </span>
              <p className="text-slate-800 font-medium leading-relaxed">
                {patent.inventors}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Patents() {
  const { shortCode } = useParams();
  const [patentsData, setPatentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/research/patents.jsx`);
        setPatentsData(module.patentsData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/research/patents.jsx");
          setPatentsData(fallback.patentsData);
        } catch {
          setPatentsData(null);
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

  if (!patentsData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Patents data not available.
      </div>
    );
  }

  const { hero, stats = [], patentsList = [] } = patentsData;

  const categories = ["All", "Granted", "Published", "Filed"];

  const filteredPatents = patentsList.filter((p) => {
    const matchCategory =
      activeTab === "All" || p.status.toLowerCase() === activeTab.toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchSearch =
      p.title.toLowerCase().includes(term) ||
      (p.inventors && p.inventors.toLowerCase().includes(term)) ||
      (p.patentNo && p.patentNo.toLowerCase().includes(term)) ||
      (p.description && p.description.toLowerCase().includes(term));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      <BannerSection
        title={hero?.title || "PATENTS & INNOVATIONS"}
        subtitle={hero?.subtitle || "Showcasing cutting-edge research and technological advancements"}
        bgTheme={1}
      />

      {stats && stats.length > 0 && (
        <StatsCard
          stats={stats.map((item) => ({
            icon: iconMap[item.icon] || Award,
            number: item.number,
            subtitle: item.subtitle,
          }))}
        />
      )}

      {/* Main Content Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
              Patents Portfolio
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Browse intellectual property disclosures, filed applications, published patents, and granted patents.
            </p>
          </div>

          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patent title, inventor, number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs & Count */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? patentsList.length
                  : patentsList.filter(
                      (p) => p.status.toLowerCase() === cat.toLowerCase()
                    ).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    activeTab === cat
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span>{cat === "All" ? "All Patents" : `Patent ${cat}`}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      activeTab === cat
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-800">{filteredPatents.length}</strong> of{" "}
            <strong className="text-slate-800">{patentsList.length}</strong> Patents
          </div>
        </div>

        {/* Patents View: Render Table if patent.sno exists, else Card Grid */}
        {filteredPatents.some((p) => p.sno !== undefined) ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4 w-16 text-center">Sl. No.</th>
                    <th className="py-3.5 px-4 text-center w-28">Status</th>
                    <th className="py-3.5 px-4">Inventor/s Name</th>
                    <th className="py-3.5 px-4">Title of the Patent</th>
                    <th className="py-3.5 px-4">Applicant/s Name</th>
                    <th className="py-3.5 px-4 text-center w-28">Filed Date</th>
                    <th className="py-3.5 px-4 text-center w-36">Published / Granted Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 font-medium">
                  {filteredPatents.map((p, idx) => (
                    <tr key={p.id || idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-slate-500">{p.sno || idx + 1}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            p.status?.toLowerCase() === "granted"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : p.status?.toLowerCase() === "published"
                              ? "bg-blue-100 text-blue-800 border border-blue-200"
                              : "bg-purple-100 text-purple-800 border border-purple-200"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{p.inventors || "—"}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 leading-snug">{p.title}</td>
                      <td className="py-3 px-4 text-slate-700">{p.applicant || "—"}</td>
                      <td className="py-3 px-4 text-center font-semibold text-slate-600">{p.filedDate || "—"}</td>
                      <td className="py-3 px-4 text-center font-semibold text-slate-600">{p.publishedDate || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Grid of Patents Fallback */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filteredPatents.map((patent) => (
              <PatentCard key={patent.id} patent={patent} />
            ))}
          </div>
        )}

        {filteredPatents.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm mt-6">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Patents Found</h3>
            <p className="text-sm text-slate-500 mt-1">
              No patents matched your query "{searchTerm}".
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveTab("All");
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear Search Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
