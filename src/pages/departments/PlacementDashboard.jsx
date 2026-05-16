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
} from "lucide-react";

import CampusRecruiters from "../Placement/CampusRecruiters";
import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const insideIconMap = {
  BarChart2,
  Users,
  Briefcase,
  Target,
};

const PlacementDashboard = () => {
  const { shortCode } = useParams();
  const [placementData, setPlacementData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/placement.jsx`);
        setPlacementData(module.placementData);
      } catch (err) {
        // Fallback to SOICT
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!placementData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Placement data not available for this school.
      </div>
    );
  }

  const {
    hero,
    placementStats,
    achievers,
    placementRules,
    missionObjective,
    insideItems,
    brochure,
    report,
    growth,
    sectorDistribution,
    departmentPlacement,
    packageDistribution,
    ugPgStats,
    domesticInternational,
    reportDownloadLabel,
    contactInfo,
  } = placementData;

  const placementStatsData = [
    {
      icon: Users,
      number: placementStats.totalStudents,
      title: "Total Students",
      iconColor: "blue",
    },
    {
      icon: CheckCircle,
      number: placementStats.placedStudents,
      title: "Placed Students",
      iconColor: "green",
    },
    {
      icon: TrendingUp,
      numberText: `${placementStats.placementRate}%`,
      title: "Placement Rate",
      iconColor: "purple",
    },
    {
      icon: Award,
      numberText: `${placementStats.highestPackage} LPA`,
      title: "Highest Package",
      iconColor: "orange",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <SearchableWrapper>
      <div className=" py-10 bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <BannerSection
          title={hero.title}
          subtitle={hero.subtitle}
          bgTheme={hero.bgTheme}
        />
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-12">
          {/* Stats Overview */}
          <StatsCard stats={placementStatsData} />

          {/* Mission & Objective */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center justify-center">
                <Target className="w-8 h-8 mr-3 text-blue-600" />
                Our Mission & Objective
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  {missionObjective.aboutTitle}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {missionObjective.aboutText}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">
                  {missionObjective.objectiveTitle}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {missionObjective.objectiveText}
                </p>
              </div>
            </div>
          </motion.section>
          {/* What's Inside Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What's Inside?
              </h2>
              <div className="space-y-4">
                {insideItems.map((item) => {
                  const Icon = insideIconMap[item.iconName] || BarChart2;

                  return (
                  <div
                    key={item.title}
                    className="flex items-center space-x-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl"
                  >
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${item.accent} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
                })}
              </div>
            </div>

            {/* Brochure Preview */}
            <div className="text-center">
              <div
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl inline-block hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() =>
                  window.open(brochure.link, "_blank")
                }
              >
                <div className="w-64 h-80 bg-gradient-to-b from-blue-600 to-blue-400 rounded-lg flex items-center justify-center text-white shadow-2xl">
                  <div className="text-center">
                    <BookOpen className="h-20 w-20 mx-auto mb-6" />
                    <div className="font-bold text-xl mb-2">Placement</div>
                    <div className="font-bold text-xl mb-2">Brochure</div>
                    <div className="text-md opacity-90">{brochure.year}</div>
                  </div>
                </div>
                <p className="text-gray-800 mt-4 text-md">Click to preview</p>
              </div>
            </div>
            {/* Report Preview */}
            <div className="text-center">
              <div
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl inline-block hover:shadow-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                onClick={() =>
                  window.open(report.link, "_blank")
                }
              >
                <div className="w-64 h-80 bg-gradient-to-b from-purple-600 to-purple-400  rounded-lg flex items-center justify-center text-white shadow-2xl">
                  <div className="text-center">
                    <BookOpen className="h-20 w-20 mx-auto mb-6" />
                    <div className="font-bold text-xl mb-2">Placement</div>
                    <div className="font-bold text-xl mb-2">Report</div>
                    <div className="text-md opacity-90">{report.year}</div>
                  </div>
                </div>
                <p className="text-gray-800 mt-4 text-md">Click to preview</p>
              </div>
            </div>
          </div>

          {/* Placement Statistics */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-8 ">
              <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center justify-center pt-8">
                <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
                Placement Statistics
              </h2>
              <p className="text-slate-600">
                Comprehensive analysis of our placement performance
              </p>
            </div>

            {/* Year-wise Growth */}
            <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Year-wise Placement Growth
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {growth.map((data, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100"
                  >
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      {data.rate}
                    </div>
                    <div className="text-slate-600 text-sm">{data.year}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sector-wise and Department-wise Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Sector-wise Distribution */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Sector-wise Distribution
                </h3>
                <div className="space-y-4">
                  {sectorDistribution.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${data.color} mr-3`}
                        />
                        <span className="font-medium text-slate-800">
                          {data.sector}
                        </span>
                      </div>
                      <span className="font-bold text-slate-700">
                        {data.percentage}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Department-wise Stats */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Department-wise Placement
                </h3>
                <div className="space-y-4">
                  {departmentPlacement.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${data.color} mr-3`}
                        />
                        <span className="font-medium text-slate-800">
                          {data.dept}
                        </span>
                      </div>
                      <span className="font-bold text-green-600">
                        {data.rate}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Package Distribution and UG vs PG */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Package Distribution */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  Package Distribution Analysis
                </h3>
                <div className="space-y-4">
                  {packageDistribution.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full ${data.color} mr-3`}
                        />
                        <span className="font-medium text-slate-800">
                          {data.range}
                        </span>
                      </div>
                      <span className="font-bold text-slate-700 text-lg">
                        {data.percentage}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* UG vs PG and Domestic vs International */}
              <div className="space-y-6">
                {/* UG vs PG */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    UG vs PG Placement Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {ugPgStats.ug}
                      </div>
                      <div className="text-sm text-slate-600">
                        Undergraduate
                      </div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {ugPgStats.pg}
                      </div>
                      <div className="text-sm text-slate-600">Postgraduate</div>
                    </div>
                  </div>
                </div>

                {/* Domestic vs International */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-blue-600" />
                    Domestic vs International Offers
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {domesticInternational.domestic}
                      </div>
                      <div className="text-sm text-slate-600">Domestic</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        {domesticInternational.international}
                      </div>
                      <div className="text-sm text-slate-600">
                        International
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Report Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                {reportDownloadLabel}
              </motion.button>
            </div>
          </motion.section>
          {/* Achiever Detailed Cards */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className=" bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-8 shadow-lg text-white mb-16"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-black mb-4 flex items-center justify-center">
                <Trophy className="w-8 h-8 mr-3 text-blue-600" />
                Top Achievers 2024
              </h1>
              <p className="text-gray-900">
                Celebrating our students' outstanding achievements
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievers.map((achiever, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border shadow-md border-blue-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-15 h-15  rounded-full overflow-hidden">
                      <img
                        src={
                          achiever.image ||
                          " https://cdn-icons-png.flaticon.com/512/21/21104.png"
                        }
                        alt={achiever.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-slate-800">
                        {achiever.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {achiever.program}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Company</span>
                      <span className="font-medium text-slate-800">
                        {achiever.company}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Package</span>
                      <span className="font-bold text-green-600 text-lg">
                        {achiever.package}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
          {/* Top Recruiters */}
          <CampusRecruiters />

          {/* Placement Rules */}
          <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 mr-3 text-blue-600" />
                Placement Rules & Guidelines
              </h2>
              <p className="text-slate-600">
                Important guidelines for all placement activities
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                  {placementRules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-slate-700">{rule}</p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-bold text-blue-800 mb-4 text-lg">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-blue-700">
                      {contactInfo.people[0]?.name}
                    </p>
                    <p className="text-blue-600 text-sm">
                      {contactInfo.people[0]?.role}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-700">
                      {contactInfo.people[1]?.name}
                    </p>
                    <p className="text-blue-600 text-sm">
                      {contactInfo.people[1]?.role}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-blue-200">
                    <div className="flex items-center text-blue-600 text-sm mb-1">
                      <Mail className="w-4 h-4 mr-2" />
                      {contactInfo.emails[0]}
                    </div>
                    <div className="flex items-center text-blue-600 text-sm">
                      <Mail className="w-4 h-4 mr-2" />
                      {contactInfo.emails[1]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default PlacementDashboard;
