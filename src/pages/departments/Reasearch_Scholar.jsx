import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, Search, X, Users, Clock, BookOpen } from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";

const iconMap = {
  Users,
  CheckCircle,
  Clock,
  BookOpen,
};

// Hero Section
const HeroSection = ({ title, subtitle }) => (
  <BannerSection
    title={title}
    subtitle={subtitle}
    bgTheme={3}
  />
);

// Stats Section
const StatsSection = ({ stats = [] }) => (
  <StatsCard
    stats={stats.map((item) => ({
      icon: iconMap[item.icon] || Users,
      numberText: item.count || item.number,
      subtitle: item.label,
    }))}  
  />
);

// Directory Section for Year-wise Scholars
const ScholarDirectorySection = ({ byYear = [] }) => {
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const allYears = ["All", ...byYear.map((b) => b.year)];

  // Flatten scholars with year attribute
  const flattened = byYear.flatMap((group) =>
    group.scholars.map((s) => ({ ...s, year: group.year }))
  );

  const filtered = flattened.filter((s) => {
    const matchYear = selectedYear === "All" || s.year === selectedYear;
    const matchStatus =
      selectedStatus === "All" ||
      s.status.toLowerCase() === selectedStatus.toLowerCase();
    const term = searchTerm.toLowerCase();
    const matchSearch =
      s.name.toLowerCase().includes(term) ||
      (s.thesis && s.thesis.toLowerCase().includes(term)) ||
      (s.supervisor && s.supervisor.toLowerCase().includes(term));
    return matchYear && matchStatus && matchSearch;
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
              Ph.D. Scholars Directory
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Browse Ph.D. scholars by admission year, research title, supervisor, and status.
            </p>
          </div>

          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search scholar, thesis, supervisor..."
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

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {allYears.map((y) => {
              const label = y === "All" ? "All Sessions" : y.replace(/^Batch\s*/i, "").replace(/^Academic Session\s*/i, "");
              return (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    selectedYear === y
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Status:</span>
            {["All", "Ongoing", "Completed", "Thesis Submitted"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  selectedStatus === st
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-500 font-medium mb-4">
          Showing <strong className="text-slate-800">{filtered.length}</strong> Ph.D. Scholars
        </div>

        {/* Scholars View: Render Table if s.sno is present, else Card Grid */}
        {filtered.some((s) => s.sno !== undefined) ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4 w-16 text-center">S.No.</th>
                    <th className="py-3.5 px-4">Name of Student</th>
                    <th className="py-3.5 px-4">Thesis Supervisor</th>
                    <th className="py-3.5 px-4 text-center">Year of Registration</th>
                    <th className="py-3.5 px-4 text-center">FT / WP</th>
                    <th className="py-3.5 px-4 text-center">Current Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 font-medium">
                  {filtered.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-slate-500">{s.sno || idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{s.name}</td>
                      <td className="py-3 px-4 text-slate-700">{s.supervisor || "—"}</td>
                      <td className="py-3 px-4 text-center font-semibold text-slate-600">{s.regYear || s.year || "—"}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            s.mode === "WP"
                              ? "bg-purple-100 text-purple-800 border border-purple-200"
                              : "bg-blue-100 text-blue-800 border border-blue-200"
                          }`}
                        >
                          {s.mode || "FT"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold capitalize ${
                            (s.status || "").toLowerCase() === "completed"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : (s.status || "").toLowerCase().includes("thesis")
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {s.status || "ongoing"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Legacy Scholars Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {filtered.map((s, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-outfit">
                        {s.name}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        Batch {s.year}
                      </span>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full shrink-0 ${
                        s.status === "Awarded"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>

                  <div className="mt-3 space-y-2.5 text-sm">
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Thesis Title
                      </h4>
                      <p className="text-slate-700 font-medium leading-snug mt-0.5">
                        {s.thesis || "Thesis title pending/under registration"}
                      </p>
                    </div>

                    {s.supervisor && (
                      <div className="pt-2.5 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Supervisor
                        </h4>
                        <p className="text-slate-800 font-semibold text-xs mt-0.5">
                          {s.supervisor}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm mt-6">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Scholars Found</h3>
            <p className="text-sm text-slate-500 mt-1">
              No Ph.D. scholars matched your current search filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedYear("All");
                setSelectedStatus("All");
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

// Featured Scholars (Legacy fallback if needed)
const FeaturedScholars = ({ scholars = [] }) => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        Featured Research Scholars
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholars.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 + i * 0.2 }}
            className={`bg-gradient-to-br ${s.bg} p-6 rounded-xl`}
          >
            <div className="text-center mb-6">
              <div
                className={`w-24 h-24 ${s.avatarColor} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}
              >
                {s.initials}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{s.name}</h3>
              <p className={`font-semibold ${s.textColor}`}>{s.designation}</p>
              <p className="text-sm text-gray-600">{s.department}</p>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Research Area:
                </h4>
                <p className="text-sm text-gray-600">{s.area}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {s.supervisorTitle}:
                </h4>
                <p className="text-sm text-gray-600">{s.supervisor}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {s.publicationsTitle}:
                </h4>
                <p className="text-sm text-gray-600">{s.publications}</p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-1">
                {s.achievementTitle}:
              </p>
              <p className="text-xs text-gray-500">{s.achievement}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Main Parent
export default function ResearchScholars() {
  const { shortCode } = useParams();
  const [researchScholarsData, setResearchScholarsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/research/research-scholars.jsx`);
        setResearchScholarsData(module.researchScholarsData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/research/research-scholars.jsx");
          setResearchScholarsData(fallback.researchScholarsData);
        } catch {
          setResearchScholarsData(null);
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

  if (!researchScholarsData) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Research scholars data not available.</div>;
  }

  const {
    hero,
    stats,
    byYear,
    scholars,
  } = researchScholarsData;

  return (
    <div className="min-h-screen">
      <HeroSection
        title={hero?.title || "RESEARCH SCHOLARS | USICT"}
        subtitle={hero?.subtitle || "Ph.D. Scholars Community"}
      />

      {byYear && byYear.length > 0 && (
        <ScholarDirectorySection byYear={byYear} />
      )}

      {!byYear && scholars && scholars.length > 0 && (
        <FeaturedScholars scholars={scholars} />
      )}
    </div>
  );
}
