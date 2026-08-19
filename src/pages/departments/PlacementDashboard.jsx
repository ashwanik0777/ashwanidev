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
  ChevronLeft,
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
  Folder,
  ExternalLink,
  UserCheck,
} from "lucide-react";

import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const PlacementDashboard = () => {
  const { shortCode } = useParams();
  const [placementData, setPlacementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [galleryPage, setGalleryPage] = useState(1);

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

  if (placementData?.isSimpleView) {
    const { hero, overview, committee, corporateRelations, brochures } = placementData;
    return (
      <div className="min-h-screen bg-slate-50 selection:bg-purple-200">
        <BannerSection
          title={hero?.title || "Placement & Internship Cell | SOLJG"}
          subtitle={hero?.subtitle || "School of Law, Justice & Governance"}
          bgTheme={hero?.bgTheme || 9}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12">
          
          {/* Overview */}
          {overview && (
            <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-outfit">
                  {overview.title}
                </h2>
              </div>
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                {overview.text}
              </p>
            </section>
          )}

          {/* Committee */}
          {committee && (
            <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-extrabold text-slate-900 font-outfit flex items-center gap-2">
                  <span>👥</span> {committee.title}
                </h2>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 w-fit">
                  Placement and Internship Cell (PIC)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {committee.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/30 transition-all duration-200 flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold text-sm sm:text-base font-outfit">
                        {member.name}
                      </div>
                      <div className="text-xs font-semibold text-purple-700">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Committee Contact Box */}
              {committee.contact && (
                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      Cell Contact Details
                    </div>
                    <div className="text-xs sm:text-sm font-medium text-slate-700">
                      Email: <a href={`mailto:${committee.contact.email}`} className="text-purple-700 font-bold hover:underline">{committee.contact.email}</a>
                      <span className="mx-2">•</span>
                      Phone: <span className="font-bold text-slate-900">{committee.contact.phone}</span>
                    </div>
                  </div>
                  {committee.contact.linkedin && (
                    <a
                      href={committee.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-all duration-200 flex items-center gap-1.5 shrink-0"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              )}
            </section>
          )}

          {/* Placement Brochures */}
          {brochures && brochures.length > 0 && (
            <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                    Official Documents
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-outfit mt-0.5">
                    Placement Brochures & Reports
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 w-fit">
                  Downloads
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {brochures.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/40 transition-all duration-200 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-purple-700">
                        <FileText className="w-5 h-5 shrink-0" />
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 px-2 py-0.5 rounded border border-purple-200">
                          {b.year}
                        </span>
                      </div>
                      <div className="text-slate-900 font-bold text-sm font-outfit">
                        {b.label || b.title}
                      </div>
                    </div>

                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-all duration-150 flex items-center justify-center gap-2"
                    >
                      <span>View File</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Director Corporate Relations */}
          {corporateRelations && (
            <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  Central Corporate Relations Cell (CRC)
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 font-outfit mt-0.5">
                  {corporateRelations.title}
                </h2>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                <div className="text-lg font-bold text-slate-900 font-outfit">
                  {corporateRelations.director}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <div className="text-slate-400 font-semibold uppercase text-[10px]">Phone Numbers</div>
                    {corporateRelations.phones.map((p, i) => (
                      <div key={i} className="font-bold text-slate-800">{p}</div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <div className="text-slate-400 font-semibold uppercase text-[10px]">Email Addresses</div>
                    {corporateRelations.emails.map((e, i) => (
                      <div key={i}>
                        <a href={`mailto:${e}`} className="font-bold text-purple-700 hover:underline">{e}</a>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <div className="text-slate-400 font-semibold uppercase text-[10px]">Official Website</div>
                    <div>
                      <a
                        href={corporateRelations.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-purple-700 hover:underline inline-flex items-center gap-1"
                      >
                        <span>{corporateRelations.website}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
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
    ourObjective,
    coordinators = [],
    pastPlacements = [],
    pastPlacementsFolder,
  } = placementData || {};

  const totalGalleryPages = Math.ceil((galleryImages?.length || 0) / 12);
  const paginatedGalleryImages = activeTab === "gallery"
    ? galleryImages.slice((galleryPage - 1) * 12, galleryPage * 12)
    : galleryImages;

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
    ...(brochure && brochure.link ? [{ id: "brochure", label: "Placement brochure", icon: BookOpen }] : []),
    ...(ourObjective || whyGbu || (placementGuidelines && placementGuidelines.length > 0) || recruiterFormUrl || (coordinators && coordinators.length > 0) ? [{ id: "recruiter", label: "For Recruiter", icon: Briefcase }] : []),
    ...((btechPrograms && btechPrograms.length > 0) || (otherPrograms && otherPrograms.length > 0) || (growth && growth.length > 0) || (sectorDistribution && sectorDistribution.length > 0) || (pastPlacements && pastPlacements.length > 0) ? [{ id: "records", label: "Placement Records", icon: BarChart2 }] : []),
    ...((placementRules && placementRules.length > 0) || placementPolicy?.generalRules?.length || placementPolicy?.registrationRules ? [{ id: "rules", label: "Placement Rules", icon: AlertTriangle }] : []),
    ...(galleryOverviewText || (galleryImages && galleryImages.length > 0) || (achievers && achievers.length > 0) || (recruitersData && recruitersData.length > 0) ? [{ id: "gallery", label: "Placement Gallery", icon: ImageIcon }] : []),
  ];

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50 selection:bg-purple-200">
        {/* Header Hero */}
        <BannerSection
          title={hero.title || `${placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()} Placement Cell`}
          subtitle={hero.subtitle || placementData?.schoolName || "Gautam Buddha University"}
          bgTheme={hero.bgTheme || 3}
        />

        {/* Top Horizontal Sticky Header Sub-Navigation Menu */}
        <div className="sticky top-[64px] z-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-2 sm:py-3">
          <div className="container mx-auto px-3 sm:px-6 max-w-7xl">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 sm:py-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[11px] sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                      isActive
                        ? "bg-purple-900 text-white shadow-md transform -translate-y-0.5"
                        : "bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-purple-900"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-amber-300" : "text-slate-500"}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-3 sm:px-6 max-w-7xl py-6 sm:py-8 space-y-6 sm:space-y-10">

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
                  className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100 space-y-4"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit border-b border-slate-100 pb-3 flex items-center gap-2">
                    <Info className="w-6 h-6 text-purple-600" />
                    Placement Overview | {placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()}
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
                        {missionObjective.aboutTitle || `About ${placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()} Placement Cell`}
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
                      <h3 className="text-lg font-bold font-outfit text-slate-900">{placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()} Notice Board & Drive Alerts</h3>
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
          {(activeTab === "all" || activeTab === "brochure") && brochure && brochure.link && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100 space-y-6"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  Placement Brochure & Official Reports
                </h2>
              </div>

              {/* PDF Viewer Container */}
              {brochure && brochure.link && (
                <div className="space-y-4">
                  <div className="w-full h-[450px] sm:h-[700px] md:h-[850px] lg:h-[950px] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                    <iframe
                      src={brochure.link.includes("drive.google.com") ? brochure.link.replace(/\/view(\?.*)?$/, "/preview") : brochure.link}
                      title={`${placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()} Placement Brochure PDF`}
                      className="w-full h-full border-0"
                    />
                  </div>
                  <div className="text-center">
                    <a
                      href={brochure.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-purple-800 to-indigo-800 text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm shadow-md hover:from-purple-900 hover:to-indigo-900 transition-all text-center leading-snug"
                    >
                      <FileText className="w-4 h-4 shrink-0" /> View / Download {placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()} Placement Brochure PDF
                    </a>
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {/* FOR RECRUITERS SECTION */}
          {(activeTab === "all" || activeTab === "recruiter") && (ourObjective || whyGbu || (placementGuidelines && placementGuidelines.length > 0) || recruiterFormUrl || (coordinators && coordinators.length > 0)) && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100 space-y-6 sm:space-y-8"
            >
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                  For Corporate Recruiters
                </h2>
              </div>

              {/* Our Objective */}
              {ourObjective && (
                <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-purple-950 font-outfit flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" /> Our Objective
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {ourObjective}
                  </p>
                </div>
              )}

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
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit flex items-center justify-center sm:justify-start gap-2">
                      <FileText className="w-5 h-5 text-purple-600 shrink-0" />
                      Corporate Recruiter Interest Form
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Interested in hiring from {placementData?.schoolName || (shortCode || "SOICT").toUpperCase()} Gautam Buddha University? Submit your campus recruitment request online.
                    </p>
                  </div>
                  <a
                    href={recruiterFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-purple-900 hover:bg-purple-950 text-white font-semibold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all shrink-0 text-center"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    Fill Recruiter Form
                  </a>
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
              {!((btechPrograms && btechPrograms.length > 0) ||
                 (otherPrograms && otherPrograms.length > 0) ||
                 (growth && growth.length > 0) ||
                 (sectorDistribution && sectorDistribution.length > 0) ||
                 (pastPlacements && pastPlacements.length > 0)) ? (
                activeTab === "records" && (
                  <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-slate-100 text-center space-y-3"
                  >
                    <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                      <BarChart2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 font-outfit">Placement Records</h3>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto font-medium">
                      Placement records data is currently cleared / being updated for this school.
                    </p>
                  </motion.section>
                )
              ) : (
                <>
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

                  {/* Past Placements Table */}
                  {pastPlacements && pastPlacements.length > 0 && (
                    <motion.section
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <div className="relative inline-block pb-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit">
                              Past Placements
                            </h2>
                            <div className="h-0.5 w-16 bg-amber-500 rounded-full mt-1"></div>
                          </div>
                        </div>

                        {pastPlacementsFolder && (
                          <a
                            href={pastPlacementsFolder}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 text-xs font-semibold bg-purple-50 text-purple-900 hover:bg-purple-100 px-4 py-2 rounded-xl transition-all border border-purple-100 w-full sm:w-auto shrink-0"
                          >
                            <Folder className="w-4 h-4 text-purple-700 shrink-0" />
                            <span>View All Archives in Google Drive</span>
                            <ExternalLink className="w-3.5 h-3.5 opacity-70 shrink-0" />
                          </a>
                        )}
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-slate-200 text-xs font-bold text-slate-800 uppercase tracking-wider">
                              <th className="py-3 px-4 w-28 sm:w-36">Year</th>
                              <th className="py-3 px-4">Details:</th>
                              <th className="py-3 px-4 text-right w-24 sm:w-28">View</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {pastPlacements.map((item, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                                <td className="py-3.5 px-4 font-bold text-slate-900">{item.year}</td>
                                <td className="py-3.5 px-4 font-medium text-slate-700">{item.details}</td>
                                <td className="py-3.5 px-4 text-right">
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-md text-xs font-bold text-white bg-[#6b21a8] hover:bg-[#581c87] active:scale-95 transition-all shadow-sm"
                                  >
                                    View
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.section>
                  )}
                </>
              )}
            </div>
          )}

          {/* PLACEMENT RULES SECTION */}
          {(activeTab === "all" || activeTab === "rules") && (placementRules?.length > 0 || placementPolicy?.generalRules?.length > 0 || placementPolicy?.registrationRules) && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100 space-y-6"
            >
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                  <ShieldAlert className="w-6 h-6 text-amber-500" />
                  {placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()} Placement Policy & Rules
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Mandatory guidelines and regulations for all participating {placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()} students
                </p>
              </div>

              <div className="space-y-6">
                {/* General Rules */}
                {placementPolicy?.generalRules && placementPolicy.generalRules.length > 0 && (
                  <div className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-purple-600" /> General Placement Rules
                    </h3>
                    <div className="space-y-2">
                      {placementPolicy.generalRules.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0 mt-1.5" />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legacy Registration Rules fallback if generalRules not present */}
                {!placementPolicy?.generalRules && placementPolicy?.registrationRules && (
                  <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-100 space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-purple-600" /> Registration & Participation Policy
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {placementPolicy.registrationRules}
                    </p>
                  </div>
                )}

                {/* Placement Offers Policy */}
                {placementPolicy?.offersPolicy && (
                  <div className="bg-amber-50/60 p-4 sm:p-5 rounded-xl border border-amber-100 space-y-2">
                    <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" /> Placement Offers Policy
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                      {placementPolicy.offersPolicy}
                    </p>
                  </div>
                )}

                {/* Information Responsibility */}
                {placementPolicy?.informationResponsibility && (
                  <div className="bg-blue-50/60 p-4 sm:p-5 rounded-xl border border-blue-100 space-y-2">
                    <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2">
                      <Info className="w-4 h-4 text-blue-600" /> Information Responsibility
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
                      {placementPolicy.informationResponsibility}
                    </p>
                  </div>
                )}

                {/* No Tolerance Policy */}
                {placementPolicy?.noToleranceRules && (
                  <div className="bg-red-50/50 p-4 sm:p-5 rounded-xl border border-red-100 space-y-3">
                    <h3 className="text-sm font-bold text-red-900 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-600" /> No Tolerance Policy
                    </h3>
                    <p className="text-xs text-red-800 font-medium">
                      No tolerance policy has been set by the Placement cell for insincere attitude to the company officials if observed in the following:
                    </p>
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

                {/* Second Placement Policy */}
                {placementPolicy?.secondPlacementPolicy && (
                  <div className="bg-emerald-50/50 p-4 sm:p-5 rounded-xl border border-emerald-100 space-y-2">
                    <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" /> Second Placement Policy
                    </h3>
                    {Array.isArray(placementPolicy.secondPlacementPolicy) ? (
                      <div className="space-y-2">
                        {placementPolicy.secondPlacementPolicy.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-950 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                        {placementPolicy.secondPlacementPolicy}
                      </p>
                    )}
                  </div>
                )}

                {/* Off-Campus Offers & Faculty Discretion Grid */}
                {(placementPolicy?.offCampusOffers || placementPolicy?.facultyDiscretion) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {placementPolicy?.offCampusOffers && (
                      <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 space-y-2">
                        <h3 className="text-sm font-bold text-indigo-900 flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-indigo-600" /> Off-Campus Offers
                        </h3>
                        <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed">
                          {placementPolicy.offCampusOffers}
                        </p>
                      </div>
                    )}
                    {placementPolicy?.facultyDiscretion && (
                      <div className="bg-violet-50/50 p-4 rounded-xl border border-violet-100 space-y-2">
                        <h3 className="text-sm font-bold text-violet-900 flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-violet-600" /> Faculty Discretion
                        </h3>
                        <p className="text-xs sm:text-sm text-violet-950 font-medium leading-relaxed">
                          {placementPolicy.facultyDiscretion}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Code of Conduct */}
                {placementPolicy?.codeOfConduct && (
                  <div className="bg-purple-50/50 p-4 sm:p-5 rounded-xl border border-purple-100 space-y-3">
                    <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-600" /> {placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()} Code of Conduct in Campus Drives
                    </h3>
                    {placementPolicy.codeOfConduct.intro && (
                      <p className="text-xs text-purple-800 font-medium">
                        {placementPolicy.codeOfConduct.intro}
                      </p>
                    )}
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
          {(activeTab === "all" || activeTab === "gallery") && (galleryOverviewText || (galleryImages && galleryImages.length > 0) || (achievers && achievers.length > 0) || (recruitersData && recruitersData.length > 0)) && (
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
                    Gallery Overview | {placementData?.schoolCode || (shortCode || "SOICT").toUpperCase()}
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
                  className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                >
                  <div className="text-center max-w-2xl mx-auto space-y-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6 text-amber-500" />
                      We Congratulate You On Being Placed At
                    </h2>
                    <p className="text-xs text-slate-500">Placement drive glimpses & congratulations gallery</p>
                  </div>

                  {activeTab === "all" ? (
                    <div className="relative w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 py-3">
                      <motion.div
                        className="flex gap-4 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                          ease: "linear",
                          duration: 90,
                          repeat: Infinity,
                        }}
                      >
                        {[...galleryImages, ...galleryImages].map((imgUrl, idx) => (
                          <div
                            key={idx}
                            className="w-36 h-36 xs:w-44 xs:h-44 sm:w-56 sm:h-56 rounded-xl overflow-hidden shadow-sm border border-slate-200 shrink-0 bg-slate-100 group"
                          >
                            <img
                              src={imgUrl}
                              alt={`Placement celebration ${idx + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {paginatedGalleryImages.map((imgUrl, idx) => (
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

                      {/* Pagination Controls */}
                      {totalGalleryPages > 1 && (
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-slate-100">
                          <button
                            onClick={() => setGalleryPage((prev) => Math.max(prev - 1, 1))}
                            disabled={galleryPage === 1}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-900 disabled:opacity-40 disabled:hover:bg-slate-100 disabled:hover:text-slate-700 transition-all flex items-center gap-1"
                          >
                            <ChevronLeft className="w-4 h-4" /> Previous
                          </button>

                          <div className="flex items-center gap-1.5">
                            {Array.from({ length: totalGalleryPages }, (_, i) => i + 1).map((pageNum) => (
                              <button
                                key={pageNum}
                                onClick={() => setGalleryPage(pageNum)}
                                className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                                  galleryPage === pageNum
                                    ? "bg-purple-900 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-700 hover:bg-purple-50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => setGalleryPage((prev) => Math.min(prev + 1, totalGalleryPages))}
                            disabled={galleryPage === totalGalleryPages}
                            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-purple-100 hover:text-purple-900 disabled:opacity-40 disabled:hover:bg-slate-100 disabled:hover:text-slate-700 transition-all flex items-center gap-1"
                          >
                            Next <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
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
                  className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100 space-y-6"
                >
                  <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit flex items-center justify-center gap-2">
                      <Building2 className="w-6 h-6 text-purple-600" />
                      Recruiters
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4 pt-2">
                    {recruitersData.map((company, index) => (
                      <div
                        key={index}
                        className="bg-slate-50 border border-slate-100 rounded-xl p-3 sm:p-4 flex items-center justify-center hover:bg-white hover:shadow-md transition-all h-20 sm:h-24"
                      >
                        <div className="h-10 sm:h-14 w-full flex items-center justify-center overflow-hidden">
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
