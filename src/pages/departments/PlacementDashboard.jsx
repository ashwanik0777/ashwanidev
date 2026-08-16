import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Trophy,
  GraduationCap,
  MapPin,
  Mail,
  Calendar,
  Award,
  Target,
  BookOpen,
  Star,
  ChevronRight,
  Briefcase,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Phone,
  Globe,
  BarChart2,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  Info,
  ShieldAlert,
  FileCheck,
} from "lucide-react";

import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const PlacementDashboard = () => {
  const { shortCode } = useParams();
  const [placementData, setPlacementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/placement.jsx`);
        setPlacementData(module.placementData);
      } catch (err) {
        try {
          const fallback = await import("../../Data/schools/SOICT/placement.jsx");
          setPlacementData(fallback.placementData);
        } catch {
          setPlacementData(null);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!placementData) {
    return (
      <div className="flex justify-center items-center h-screen text-slate-500 font-medium text-sm">
        Placement data not available for this school.
      </div>
    );
  }

  const {
    hero = {},
    placementStats = {},
    achievers = [],
    placementRules = [],
    missionObjective = {},
    brochure,
    report,
    growth = [],
    sectorDistribution = [],
    noticeBoard = [],
    btechPrograms = [],
    otherPrograms = [],
    recruitersData = [],
    vcMessage,
    overviewText,
    whyGbu,
    recruiterFormUrl,
    galleryOverviewText,
    galleryImages = [],
    placementPolicy = {},
    placementGuidelines = [],
    coordinators = [],
  } = placementData || {};

  const placementStatsData = [
    {
      icon: Users,
      number: placementStats?.totalStudents || 0,
      title: "Total Students",
      iconColor: "blue",
    },
    {
      icon: CheckCircle,
      number: placementStats?.placedStudents || 0,
      title: "Placed Students",
      iconColor: "green",
    },
    {
      icon: TrendingUp,
      numberText: placementStats?.placementRate ? `${placementStats.placementRate}%` : "0%",
      title: "Placement Rate",
      iconColor: "purple",
    },
    {
      icon: Award,
      numberText: placementStats?.highestPackage ? `${placementStats.highestPackage} LPA` : "0 LPA",
      title: "Highest Package",
      iconColor: "orange",
    },
  ];

  const menuItems = [
    { id: "all", label: "All Sections", icon: LayoutGrid },
    { id: "overview", label: "Overview", icon: Info },
    { id: "brochure", label: "Placement brochure", icon: BookOpen },
    { id: "recruiter", label: "For Recruiter", icon: Briefcase },
    { id: "records", label: "Placement Records", icon: BarChart2 },
    { id: "rules", label: "Placement Rules", icon: AlertTriangle },
    { id: "gallery", label: "Placement Gallery", icon: ImageIcon },
  ];

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50 selection:bg-purple-200">
        {/* Header Hero */}
        <BannerSection
          title={hero.title || "USICT Placement Cell"}
          subtitle={hero.subtitle || "University School of Information and Communication Technology"}
          bgTheme={hero.bgTheme || 3}
        />

        {/* Top Horizontal Sticky Header Sub-Navigation Menu */}
        <div className="sticky top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                      isActive
                        ? "bg-purple-900 text-white shadow-md transform -translate-y-0.5"
                        : "bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-900"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-8 space-y-10">

          {/* OVERVIEW SECTION */}
          {(activeTab === "all" || activeTab === "overview") && (
            <div className="space-y-8">
              {/* Stats Overview */}
              {placementStats && (placementStats.totalStudents > 0 || placementStats.placedStudents > 0 || placementStats.highestPackage > 0) && (
                <StatsCard stats={placementStatsData} />
              )}

              {/* Overview Detailed Text Block */}
              {overviewText && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Info className="w-6 h-6 text-purple-600" />
                    Placement Overview | USICT
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium space-y-4 whitespace-pre-line">
                    {overviewText}
                  </div>
                </motion.section>
              )}

              {/* VC Message Card */}
              {vcMessage && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-md space-y-6"
                >
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="flex flex-col items-center shrink-0 space-y-3">
                      <img
                        src={vcMessage.image}
                        alt={vcMessage.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white/20 shadow-md"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="text-center">
                        <h3 className="text-base sm:text-lg font-bold text-white">{vcMessage.name}</h3>
                        <p className="text-xs text-purple-200 font-semibold">{vcMessage.title}</p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm text-purple-100 leading-relaxed font-medium">
                      <h3 className="text-lg sm:text-xl font-bold font-outfit text-white border-b border-purple-700/60 pb-2">
                        Message from Vice Chancellor
                      </h3>
                      <div className="whitespace-pre-line">
                        {vcMessage.message}
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Mission & Objective */}
              {missionObjective && (missionObjective.aboutTitle || missionObjective.objectiveTitle) && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                      <Target className="w-6 h-6 text-purple-600" />
                      Our Mission & Objective
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-purple-50/50 p-5 rounded-xl border border-purple-100/60 space-y-2">
                      <h3 className="text-base font-bold text-purple-900">
                        {missionObjective.aboutTitle || "About USICT CRC"}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {missionObjective.aboutText}
                      </p>
                    </div>
                    <div className="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100/60 space-y-2">
                      <h3 className="text-base font-bold text-indigo-900">
                        {missionObjective.objectiveTitle || "Our Placement Objective"}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                        {missionObjective.objectiveText}
                      </p>
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Notice Board */}
              {noticeBoard && noticeBoard.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-outfit text-slate-900">USICT Notice Board & Drive Alerts</h3>
                      <p className="text-xs text-slate-500">Latest announcements from Corporate Relation Cell</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {noticeBoard.map((item, idx) => (
                      <div key={idx} className="bg-purple-50/60 border border-purple-100 rounded-xl p-4 flex flex-col justify-between space-y-2 hover:bg-purple-50 transition-colors">
                        <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-purple-900 text-white self-start">
                          {item.date}
                        </span>
                        <p className="text-xs sm:text-sm font-semibold text-purple-950 leading-snug">
                          {item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>
          )}

          {/* PLACEMENT BROCHURE SECTION */}
          {(activeTab === "all" || activeTab === "brochure") && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  Placement Brochure & Official Reports
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Download our official brochure and comprehensive placement performance reports
                </p>
              </div>

              {/* PDF Viewer Container */}
              {brochure && brochure.link && (
                <div className="space-y-4">
                  <div className="w-full h-[500px] sm:h-[650px] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <iframe
                      src={brochure.link}
                      title="USICT Placement Brochure PDF"
                      className="w-full h-full border-0"
                    />
                  </div>
                  <div className="text-center">
                    <a
                      href={brochure.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-800 to-indigo-800 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md hover:from-purple-900 hover:to-indigo-900 transition-all"
                    >
                      <FileText className="w-4 h-4" /> Download USoICT Placement Brochure (2025-26) PDF
                    </a>
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {/* FOR RECRUITERS SECTION */}
          {(activeTab === "all" || activeTab === "recruiter") && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                  For Corporate Recruiters
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Why partner with USICT Gautam Buddha University for your talent acquisition needs
                </p>
              </div>

              {/* Why GBU? */}
              {whyGbu && (
                <div className="bg-slate-50 p-5 rounded-2xl border-l-4 border-purple-600 space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit">Why Recruit from GBU?</h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {whyGbu}
                  </p>
                </div>
              )}

              {/* Guidelines for Recruiters */}
              {placementGuidelines && placementGuidelines.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Campus Recruitment Process & Guidelines
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {placementGuidelines.map((guideline, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <ChevronRight className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{guideline}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recruiter Registration Form */}
              {recruiterFormUrl && (
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Corporate Recruiter Interest Form
                  </h3>
                  <div className="w-full h-[550px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                    <iframe
                      src={recruiterFormUrl}
                      title="Corporate Recruiter Form"
                      className="w-full h-full border-0"
                    />
                  </div>
                </div>
              )}

              {/* Placement Coordinators */}
              {coordinators && coordinators.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Placement Coordinators
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {coordinators.map((coord, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
                        <img
                          src={coord.image}
                          alt={coord.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-purple-300 shadow-sm shrink-0"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <div className="min-w-0">
                          <h4 className="text-base font-bold text-slate-900 truncate">{coord.name}</h4>
                          <p className="text-xs font-semibold text-purple-700">{coord.role}</p>
                          <a href={`mailto:${coord.email}`} className="text-xs text-indigo-600 hover:underline font-semibold block pt-1 truncate">
                            Email: {coord.email}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {/* PLACEMENT RECORDS SECTION */}
          {(activeTab === "all" || activeTab === "records") && (
            <div className="space-y-8">
              {/* Program Enrollment Tables */}
              {((btechPrograms && btechPrograms.length > 0) || (otherPrograms && otherPrograms.length > 0)) && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                      <GraduationCap className="w-6 h-6 text-indigo-600" />
                      Strength of Students in Different Programs
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* B.Tech Specializations Table */}
                    {btechPrograms && btechPrograms.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-100 space-y-3">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-indigo-600" />
                          4 Year B. Tech Programes
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-700">
                            <thead className="bg-white text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                              <tr>
                                <th className="py-2 px-3 rounded-l-lg">Program Specialization</th>
                                <th className="py-2 px-3 text-right rounded-r-lg">Students</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/60 font-medium">
                              {btechPrograms.map((prog, i) => (
                                <tr key={i} className="hover:bg-white transition-colors">
                                  <td className="py-2 px-3 flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: prog.color || "#4F46E5" }}
                                    />
                                    {prog.name}
                                  </td>
                                  <td className="py-2 px-3 text-right font-bold text-indigo-600">
                                    {prog.students}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Other Programs Table */}
                    {otherPrograms && otherPrograms.length > 0 && (
                      <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-100 space-y-3">
                        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                          <Award className="w-4 h-4 text-purple-600" />
                          Other Programes
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-xs text-slate-700">
                            <thead className="bg-white text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                              <tr>
                                <th className="py-2 px-3 rounded-l-lg">Program Name</th>
                                <th className="py-2 px-3 text-right rounded-r-lg">Students</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/60 font-medium">
                              {otherPrograms.map((prog, i) => (
                                <tr key={i} className="hover:bg-white transition-colors">
                                  <td className="py-2 px-3">{prog.name}</td>
                                  <td className="py-2 px-3 text-right font-bold text-purple-600">
                                    {prog.enrollment}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.section>
              )}

              {/* Year-wise Growth & Sector Distribution */}
              {((growth && growth.length > 0) || (sectorDistribution && sectorDistribution.length > 0)) && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                      Placement Growth & Sector Analytics
                    </h2>
                  </div>

                  {/* Growth Grid */}
                  {growth && growth.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Year-wise Placement Rate Growth</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {growth.map((data, index) => (
                          <div
                            key={index}
                            className="text-center p-3 bg-purple-50/60 rounded-xl border border-purple-100"
                          >
                            <div className="text-xl font-bold text-purple-700">{data.rate}</div>
                            <div className="text-xs text-slate-500 font-medium">{data.year}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sector Grid */}
                  {sectorDistribution && sectorDistribution.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Industry Sector-wise Distribution</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {sectorDistribution.map((data, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <span className="text-xs font-semibold text-slate-800">{data.sector}</span>
                            <span className="text-xs font-bold text-purple-700 px-2 py-0.5 rounded bg-purple-100">{data.percentage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.section>
              )}
            </div>
          )}

          {/* PLACEMENT RULES SECTION */}
          {(activeTab === "all" || activeTab === "rules") && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-amber-500" />
                  USICT Placement Policy & Rules
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Mandatory guidelines and regulations for all participating USICT students
                </p>
              </div>

              <div className="space-y-6">
                {/* General Rules */}
                {placementPolicy?.registrationRules && (
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-purple-600" /> Registration & Participation Policy
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {placementPolicy.registrationRules}
                    </p>
                  </div>
                )}

                {/* Offers Policy */}
                {placementPolicy?.offersPolicy && (
                  <div className="bg-amber-50/60 p-4 sm:p-5 rounded-xl border border-amber-100 space-y-2">
                    <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" /> Multiple Placement Offers Policy
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                      {placementPolicy.offersPolicy}
                    </p>
                  </div>
                )}

                {/* No Tolerance Policy */}
                {placementPolicy?.noToleranceRules && (
                  <div className="bg-red-50/50 p-4 sm:p-5 rounded-xl border border-red-100 space-y-3">
                    <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-600" /> No Tolerance Policy
                    </h3>
                    <div className="space-y-2">
                      {placementPolicy.noToleranceRules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-red-950 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code of Conduct */}
                {placementPolicy?.codeOfConduct && (
                  <div className="bg-purple-50/50 p-4 sm:p-5 rounded-xl border border-purple-100 space-y-3">
                    <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" /> USICT Code of Conduct in Campus Drives
                    </h3>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <p><strong>Attire:</strong> {placementPolicy.codeOfConduct.attire}</p>
                      <p><strong>Documents:</strong> {placementPolicy.codeOfConduct.documents}</p>
                      <p><strong>Electronic Gadgets:</strong> {placementPolicy.codeOfConduct.gadgets}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {/* PLACEMENT GALLERY SECTION */}
          {(activeTab === "all" || activeTab === "gallery") && (
            <div className="space-y-8">
              {/* Gallery Overview */}
              {galleryOverviewText && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center gap-2">
                    <ImageIcon className="w-6 h-6 text-purple-600" />
                    Gallery Overview | USICT
                  </h2>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium whitespace-pre-line">
                    {galleryOverviewText}
                  </div>
                </motion.section>
              )}

              {/* Placement Event Photos Grid */}
              {galleryImages && galleryImages.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6 text-amber-500" />
                      We Congratulate You On Being Placed At
                    </h2>
                    <p className="text-xs text-slate-500">Placement drive glimpses & congratulations gallery</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {galleryImages.map((imgUrl, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden shadow-sm border border-slate-100 aspect-square group bg-slate-100">
                        <img
                          src={imgUrl}
                          alt={`Placement celebration ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Top Achievers */}
              {achievers && achievers.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6 text-amber-500" />
                      Top Achievers (2024)
                    </h2>
                    <p className="text-xs text-slate-500">Celebrating our students placed at premier global technology firms</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {achievers.map((achiever, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-700 to-indigo-700 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-sm">
                            {achiever.name.split(" ").map(n=>n[0]).join("")}
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm font-bold text-slate-900 truncate">{achiever.name}</h3>
                            <p className="text-xs text-slate-500 truncate">{achiever.program}</p>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                          <span className="text-slate-600 font-medium">{achiever.company}</span>
                          <span className="font-extrabold text-purple-700 text-sm">{achiever.package}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}

              {/* Recruiter Logo Gallery */}
              {recruitersData && recruitersData.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                      <Building2 className="w-6 h-6 text-purple-600" />
                      Corporate Partners Gallery
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Leading companies visiting USICT Gautam Buddha University for recruitment
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-2">
                    {recruitersData.map((company, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center justify-center gap-2 hover:bg-white hover:shadow-md transition-all h-24"
                      >
                        <div className="h-12 w-full flex items-center justify-center overflow-hidden">
                          <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `https://logo.clearbit.com/${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-700 text-center truncate w-full">
                          {company.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>
          )}

        </div>
      </div>
    </SearchableWrapper>
  );
};

export default PlacementDashboard;
