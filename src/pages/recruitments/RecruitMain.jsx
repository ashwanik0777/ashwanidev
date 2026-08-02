import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, Users, FlaskConical, BriefcaseBusiness, Archive,
  Search, Calendar, FileText, ExternalLink, ChevronDown, Briefcase,
  Clock, MapPin, Building2, ArrowRight, Filter, X
} from "lucide-react";
import RecruitmentBlock from "../../components/recruitments/RecruitmentBlock";
import BannerSection from "../../components/HeroBanner";
import {
  getNoDataText,
  getRecruitmentDashboardData,
} from "../../services/announcementsService";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const CATEGORY_COLORS = {
  teaching: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", badge: "bg-blue-100 text-blue-800", icon: "text-blue-600" },
  "non-teaching": { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800", icon: "text-emerald-600" },
  "project-research": { bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700", badge: "bg-violet-100 text-violet-800", icon: "text-violet-600" },
  others: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", badge: "bg-amber-100 text-amber-800", icon: "text-amber-600" },
};

const CATEGORY_ICONS = {
  teaching: GraduationCap,
  "non-teaching": Users,
  "project-research": FlaskConical,
  others: BriefcaseBusiness,
};

const RecruitMain = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [activeArchiveYear, setActiveArchiveYear] = useState("");
  const [recruitmentData, setRecruitmentData] = useState({ categories: [], archived: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    let isMounted = true;
    const loadRecruitments = async () => {
      setIsLoading(true);
      try {
        const payload = await getRecruitmentDashboardData();
        if (!isMounted) return;
        setRecruitmentData(payload);
        const firstYear = payload.archived?.[0]?.year || "";
        setActiveArchiveYear(firstYear);
      } catch {
        if (!isMounted) return;
        setRecruitmentData({ categories: [], archived: [] });
        setActiveArchiveYear("");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadRecruitments();
    return () => { isMounted = false; };
  }, []);

  const currentCategories = useMemo(
    () =>
      (recruitmentData.categories || []).map((item) => ({
        ...item,
        iconComponent: CATEGORY_ICONS[item.type] || BriefcaseBusiness,
        colors: CATEGORY_COLORS[item.type] || CATEGORY_COLORS.others,
      })),
    [recruitmentData.categories],
  );

  const archivedEntries = recruitmentData.archived || [];
  const activeArchivedYear =
    archivedEntries.find((entry) => entry.year === activeArchiveYear) || archivedEntries[0] || null;

  // Count totals
  const totalCurrentJobs = currentCategories.reduce((s, c) => s + (c.tabs?.length || 0), 0);
  const totalArchivedYears = archivedEntries.length;

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <BannerSection
        title="RECRUITMENTS"
        subtitle="Faculty and Staff Recruitment"
        bgTheme={9}
      />

      <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6">

        {/* Stats Bar */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Open Positions", value: totalCurrentJobs, icon: Briefcase, color: "text-blue-600 bg-blue-50" },
            { label: "Categories", value: currentCategories.length, icon: Filter, color: "text-emerald-600 bg-emerald-50" },
            { label: "Archive Years", value: totalArchivedYears, icon: Archive, color: "text-amber-600 bg-amber-50" },
            { label: "Total Records", value: totalCurrentJobs + archivedEntries.reduce((s, e) => s + (e.items?.length || 0), 0), icon: FileText, color: "text-violet-600 bg-violet-50" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className={cn("rounded-lg p-2.5", stat.color)}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("current")}
            className={cn(
              "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200",
              activeTab === "current"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Briefcase className="h-4 w-4" />
            Current Opportunities
            {totalCurrentJobs > 0 && (
              <span className={cn(
                "ml-1 rounded-full px-2 py-0.5 text-xs font-bold",
                activeTab === "current" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              )}>
                {totalCurrentJobs}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("archived")}
            className={cn(
              "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200",
              activeTab === "archived"
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Archive className="h-4 w-4" />
            Archived Opportunities
          </button>
        </div>

        {/* Loading */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-800" />
            <p className="mt-4 text-sm font-medium text-slate-500">Loading recruitment data...</p>
          </div>
        ) : activeTab === "current" ? (
          /* ─── Current Opportunities ─── */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentCategories.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-16 text-center">
                <Briefcase className="h-12 w-12 text-slate-300" />
                <p className="mt-4 text-lg font-semibold text-slate-700">No Current Openings</p>
                <p className="mt-1 text-sm text-slate-500">Check back soon for new recruitment opportunities.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {currentCategories.map((category) => (
                  <RecruitmentBlock
                    key={category.type}
                    title={category.title}
                    type={category.type}
                    icon={category.iconComponent}
                    tabs={category.tabs || []}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          /* ─── Archived Opportunities ─── */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {archivedEntries.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-16 text-center">
                <Archive className="h-12 w-12 text-slate-300" />
                <p className="mt-4 text-lg font-semibold text-slate-700">No Archived Records</p>
                <p className="mt-1 text-sm text-slate-500">Past recruitment records will appear here.</p>
              </div>
            ) : (
              <>
                {/* Year Tabs */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {archivedEntries.map((entry) => (
                    <button
                      key={entry.year}
                      type="button"
                      onClick={() => setActiveArchiveYear(entry.year)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                        activeArchiveYear === entry.year
                          ? "bg-slate-900 text-white shadow-md"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      )}
                    >
                      <Calendar className="h-4 w-4" />
                      {entry.year}
                      <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-bold",
                        activeArchiveYear === entry.year
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600"
                      )}>
                        {entry.items?.length || 0}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Archived Items List */}
                <AnimatePresence mode="wait">
                  {activeArchivedYear && (
                    <motion.div
                      key={activeArchivedYear.year}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
                          <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Archive className="h-5 w-5 text-slate-300" />
                            Archived Recruitments — {activeArchivedYear.year}
                          </h3>
                          <p className="mt-1 text-xs text-slate-400">
                            {activeArchivedYear.items?.length || 0} recruitment{(activeArchivedYear.items?.length || 0) !== 1 ? "s" : ""} archived from {activeArchivedYear.year}
                          </p>
                        </div>

                        <div className="divide-y divide-slate-100">
                          {(activeArchivedYear.items || []).map((item) => {
                            const catColors = CATEGORY_COLORS[item.categoryType] || CATEGORY_COLORS.others;
                            const CatIcon = CATEGORY_ICONS[item.categoryType] || BriefcaseBusiness;
                            const isExpanded = expandedCards[item.id];

                            return (
                              <div key={item.id} className="transition-colors hover:bg-slate-50">
                                <div
                                  className="flex items-start gap-4 px-6 py-4 cursor-pointer"
                                  onClick={() => toggleCard(item.id)}
                                >
                                  <div className={cn("mt-0.5 flex-shrink-0 rounded-lg p-2", catColors.bg)}>
                                    <CatIcon className={cn("h-4 w-4", catColors.icon)} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-3">
                                      <div>
                                        <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                                        <p className="mt-0.5 text-xs text-slate-500">Ref: {item.ref}</p>
                                      </div>
                                      <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold", catColors.badge)}>
                                          {(CATEGORY_COLORS[item.categoryType] ? item.categoryType : "others").replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                                        </span>
                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">
                                          <Archive className="h-3 w-3" /> Closed
                                        </span>
                                        <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", isExpanded && "rotate-180")} />
                                      </div>
                                    </div>
                                    <div className="mt-2 flex items-center gap-4 text-xs text-slate-500">
                                      <span className="inline-flex items-center gap-1">
                                        <Calendar className="h-3.5 w-3.5" /> {item.date}
                                      </span>
                                      <span className="inline-flex items-center gap-1">
                                        <FileText className="h-3.5 w-3.5" /> {item.documents?.length || 0} document{(item.documents?.length || 0) !== 1 ? "s" : ""}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {/* Expanded Documents */}
                                <AnimatePresence>
                                  {isExpanded && item.documents?.length > 0 && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="mx-6 mb-4 rounded-xl border border-slate-200 bg-slate-50 divide-y divide-slate-200">
                                        {item.documents.map((doc, idx) => (
                                          <div key={doc.id || idx} className="flex items-center justify-between px-4 py-3">
                                            <div className="flex items-center gap-3">
                                              <FileText className="h-4 w-4 text-slate-500" />
                                              <div>
                                                <p className="text-sm font-medium text-slate-800">{doc.name}</p>
                                                <p className="text-xs text-slate-500">{doc.description}</p>
                                              </div>
                                            </div>
                                            <a
                                              href={doc.url || "#"}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                                            >
                                              Open <ExternalLink className="h-3 w-3" />
                                            </a>
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default RecruitMain;
