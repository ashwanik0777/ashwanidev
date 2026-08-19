import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search, X, Award, DollarSign, Calendar, CheckCircle } from "lucide-react";
import BannerSection from "../../components/HeroBanner";

export default function ResearchGrants() {
  const { shortCode } = useParams();
  const [grantsData, setGrantsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/research/research-grants.jsx`);
        setGrantsData(module.researchGrantsData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/research/research-grants.jsx");
          setGrantsData(fallback.researchGrantsData);
        } catch {
          setGrantsData(null);
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

  if (!grantsData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Research grants data not available.
      </div>
    );
  }

  const { hero, grantsList = [] } = grantsData;
  const categories = ["All", "Ongoing", "Completed"];

  const filteredGrants = grantsList.filter((g) => {
    const matchCategory =
      activeTab === "All" || (g.status && g.status.toLowerCase() === activeTab.toLowerCase());
    const term = searchTerm.toLowerCase();
    const matchSearch =
      (g.pi && g.pi.toLowerCase().includes(term)) ||
      (g.title && g.title.toLowerCase().includes(term)) ||
      (g.fundingAgency && g.fundingAgency.toLowerCase().includes(term)) ||
      (g.amount && g.amount.toLowerCase().includes(term)) ||
      (g.duration && g.duration.toLowerCase().includes(term));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50">
      <BannerSection
        title={hero?.title || "RESEARCH GRANTS"}
        subtitle={hero?.subtitle || "Extramural research grants and funded projects"}
        bgTheme={1}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
              Research Grants Portfolio
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Extramural research projects funded by premier national and state funding agencies.
            </p>
          </div>

          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search PI, project title, agency..."
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

        {/* Status Filters & Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? grantsList.length
                  : grantsList.filter(
                      (g) => (g.status || "").toLowerCase() === cat.toLowerCase()
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
                  <span>{cat === "All" ? "All Grants" : `${cat} Grants`}</span>
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
            Showing <strong className="text-slate-800">{filteredGrants.length}</strong> of{" "}
            <strong className="text-slate-800">{grantsList.length}</strong> Research Grants
          </div>
        </div>

        {/* Structured Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 w-14 text-center">S.No</th>
                  <th className="py-3.5 px-4 w-44">Principal Investigator</th>
                  <th className="py-3.5 px-4">Project Title</th>
                  <th className="py-3.5 px-4 text-center w-32">Funding Agency</th>
                  <th className="py-3.5 px-4 text-center w-32">Sanctioned Amount</th>
                  <th className="py-3.5 px-4 text-center w-28">Duration</th>
                  <th className="py-3.5 px-4 text-center w-28">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80 font-medium">
                {filteredGrants.map((g, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-center font-bold text-slate-500">{g.sno || idx + 1}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{g.pi}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium leading-snug">{g.title}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold text-xs border border-slate-200">
                        {g.fundingAgency}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-emerald-700">{g.amount}</td>
                    <td className="py-3.5 px-4 text-center text-slate-600 font-semibold">{g.duration}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold ${
                          (g.status || "").toLowerCase() === "ongoing"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredGrants.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm mt-6">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Research Grants Found</h3>
            <p className="text-sm text-slate-500 mt-1">
              No grants matched your search query "{searchTerm}".
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
