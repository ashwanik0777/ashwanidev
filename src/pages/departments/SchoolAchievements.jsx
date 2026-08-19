import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Award,
  Globe,
  Handshake,
  BookOpen,
  CheckCircle,
  GraduationCap,
  Sparkles,
  Building,
  Search,
  X,
} from "lucide-react";
import BannerSection from "../../components/HeroBanner";

const modules = import.meta.glob("../../Data/schools/*/about/achievements.jsx");

export default function SchoolAchievements() {
  const { shortCode } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [netSearch, setNetSearch] = useState("");
  const [gateSearch, setGateSearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const code = (shortCode || "SOBT").toLowerCase();
      const pathKey = Object.keys(modules).find((path) =>
        path.toLowerCase().includes(`/schools/${code}/about/achievements.jsx`)
      );

      if (pathKey) {
        try {
          const mod = await modules[pathKey]();
          setData(mod.achievementsData);
        } catch {
          setData(null);
        }
      } else {
        const fallbackKey = Object.keys(modules).find((path) =>
          path.toLowerCase().includes("/schools/sobt/about/achievements.jsx")
        );
        if (fallbackKey) {
          try {
            const mod = await modules[fallbackKey]();
            setData(mod.achievementsData);
          } catch {
            setData(null);
          }
        } else {
          setData(null);
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

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 font-medium">
        Achievements data not available.
      </div>
    );
  }

  const {
    hero,
    mous = [],
    conferences = [],
    internationalHighlights = [],
    doctoralPlacements = [],
    nationalFellowships = [],
    netQualifiers = [],
    gateQualifiers = [],
    premierDissertations = [],
  } = data;

  const filteredNet = netQualifiers.filter(
    (item) =>
      item.name.toLowerCase().includes(netSearch.toLowerCase()) ||
      item.exam.toLowerCase().includes(netSearch.toLowerCase()) ||
      item.year.toLowerCase().includes(netSearch.toLowerCase())
  );

  const filteredGate = gateQualifiers.filter(
    (item) =>
      item.name.toLowerCase().includes(gateSearch.toLowerCase()) ||
      item.exam.toLowerCase().includes(gateSearch.toLowerCase()) ||
      item.year.toLowerCase().includes(gateSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <BannerSection
        title={hero?.title || "ACHIEVEMENTS"}
        subtitle={hero?.subtitle || "Excellence & Recognitions"}
        bgTheme={1}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        
        {/* MOUs Section */}
        {mous.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit">
                  Memorandum of Understanding (MOU)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Strategic research and academic collaborations
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mous.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
                      {item.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mb-3">{item.location}</p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Conferences Section */}
        {conferences.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit">
                  Conferences, Seminars & Workshops Organized
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Academic symposiums and industry-academia meets
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conferences.map((conf, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                      {conf.date}
                    </span>
                    {conf.funding && (
                      <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded">
                        {conf.funding}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {conf.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {conf.details}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Student Achievements Highlights */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit">
                Students Achievements — Ph.D. & M.Tech Success Stories
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Performance of SOBT students at premier national and international platforms
              </p>
            </div>
          </div>

          {/* International Recognitions & Fellowships */}
          {internationalHighlights.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                International Recognitions & Fellowships
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {internationalHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold">
                          {item.badge}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{item.year}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                      <p className="text-xs font-semibold text-purple-700 mb-2">{item.recipient}</p>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* International Doctoral Programs */}
          {doctoralPlacements.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
                Students Selected for International Doctoral Programs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {doctoralPlacements.map((doc, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:border-emerald-300 transition-colors flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-emerald-100">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{doc.name}</h4>
                      <p className="text-xs font-semibold text-emerald-700 mt-0.5">{doc.university}</p>
                      <span className="text-[10px] text-slate-400 font-semibold">{doc.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* National Fellowships */}
          {nationalFellowships.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                National Fellowships Held by SOBT Scholars
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {nationalFellowships.map((fellow, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:border-amber-300 transition-colors"
                  >
                    <h4 className="font-bold text-slate-900 text-sm">{fellow.recipient}</h4>
                    <p className="text-xs font-semibold text-amber-800 mt-1 leading-snug">{fellow.fellowship}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                      {fellow.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CSIR/UGC NET-LS Qualified */}
          {netQualifiers.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  CSIR / UGC NET-JRF / NET-LS Qualified Students ({netQualifiers.length})
                </h3>
                <div className="w-full sm:w-64 relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search NET qualifier..."
                    value={netSearch}
                    onChange={(e) => setNetSearch(e.target.value)}
                    className="w-full pl-9 pr-7 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  {netSearch && (
                    <button
                      onClick={() => setNetSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredNet.map((student, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{student.name}</h4>
                      <p className="text-[11px] font-semibold text-blue-700">{student.exam}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {student.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GATE Qualified */}
          {gateQualifiers.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                  GATE Qualified Students ({gateQualifiers.length})
                </h3>
                <div className="w-full sm:w-64 relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search GATE qualifier..."
                    value={gateSearch}
                    onChange={(e) => setGateSearch(e.target.value)}
                    className="w-full pl-9 pr-7 py-1.5 rounded-lg border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  />
                  {gateSearch && (
                    <button
                      onClick={() => setGateSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredGate.map((student, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg p-3 shadow-sm border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{student.name}</h4>
                      <p className="text-[11px] font-semibold text-indigo-700">{student.exam}</p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {student.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dissertations & Training in Premier Institutes */}
          {premierDissertations.length > 0 && (
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg space-y-4">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg sm:text-xl font-bold font-outfit">
                  Dissertations & Training Projects at Premier National Institutes
                </h3>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Meritorious students from SOBT are routinely selected for M.Tech dissertations and specialized research training at premier national institutes across India:
              </p>
              <div className="flex flex-wrap gap-2.5 pt-2">
                {premierDissertations.map((inst, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-bold text-white shadow-sm"
                  >
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
