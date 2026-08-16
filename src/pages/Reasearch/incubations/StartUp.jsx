import React, { useState } from "react";
import {
  UserCog,
  HandCoins,
  Settings,
  Scale,
  Handshake,
  GraduationCap,
  Search,
  ExternalLink,
  Building2,
  Tag,
  Sparkles,
  Rocket
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";
import StatsCard from "../../../components/StatsCard.jsx";
import { incubationStats, incubationStartups, incubationAbout } from "../../../Data/incubationData.js";

const StartUp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");

  const supportServices = [
    {
      title: "Mentorship Program",
      description: "One-on-one guidance from 28+ industry experts, CEOs, and scientists",
      icon: UserCog,
    },
    {
      title: "Funding & Seed Grants",
      description: "Access to seed funds, ATAL grant support, angel networks, and VC pitching",
      icon: HandCoins,
    },
    {
      title: "Technical Infrastructure",
      description: "State-of-the-art R&D labs, 3D printing, computing servers, and testing equipment",
      icon: Settings,
    },
    {
      title: "Legal & IP Support",
      description: "Patent filing assistance, trademark registration, and regulatory compliance",
      icon: Scale,
    },
    {
      title: "Market Access & Alliances",
      description: "Industry connections, government scheme linkages, and corporate partnerships",
      icon: Handshake,
    },
    {
      title: "Skill & Business Training",
      description: "Capacity building workshops, pitch prep, and entrepreneurship bootcamps",
      icon: GraduationCap,
    },
  ];

  const applicationSteps = [
    { title: "Submit Application", description: "Submit your innovative idea via the online incubation portal form" },
    { title: "Expert Screening", description: "Technical committee evaluates feasibility and market potential" },
    { title: "Selection Pitch", description: "Present your venture to the AIC-GBU advisory panel" },
    { title: "Onboarding & Support", description: "Get co-working space, lab access, mentorship & funding support" },
  ];

  const sectors = [
    "All",
    "Agriculture, Food & Beverages",
    "IT/ITeS, FinTech & Emerging Technologies",
    "Education, EdTech & Social Impact",
    "Healthcare & Life-Sciences",
    "Infrastructure",
    "Others (Diverse Industries)"
  ];

  const filteredStartups = incubationStartups.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subsector.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.stage.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSector =
      selectedSector === "All" || item.sector.includes(selectedSector) || (selectedSector === "Others" && item.sector.includes("Others"));

    return matchesSearch && matchesSector;
  });

  const getStageBadgeColor = (stage) => {
    const s = stage.toLowerCase();
    if (s.includes("proto")) return "bg-amber-100 text-amber-800 border-amber-200";
    if (s.includes("idea")) return "bg-blue-100 text-blue-800 border-blue-200";
    if (s.includes("early") || s.includes("traction")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (s.includes("scal")) return "bg-purple-100 text-purple-800 border-purple-200";
    if (s.includes("accel")) return "bg-indigo-100 text-indigo-800 border-indigo-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <SearchableWrapper>
      <section className="bg-white py-20 px-4 sm:px-10 md:px-20 border-t border-gray-100" id="startups">
        <div className="max-w-7xl mx-auto">
          
          {/* Key Metrics Header */}
          <div className="mb-16 text-center">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
              Impact & Statistics
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-3">
              Incubation Ecosystem Overview
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full mb-10"></div>
            
            <StatsCard stats={incubationStats} />
          </div>

          {/* Startups Portfolio Section */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-10 mb-24 shadow-sm">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-indigo-600 uppercase bg-white px-4 py-1.5 rounded-full border border-slate-200 shadow-xs mb-3">
                <Building2 className="w-4 h-4 text-indigo-600" />
                Portfolio Directory
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                Incubatee Ventures Portfolio ({incubationStartups.length}+ Companies)
              </h3>
              <p className="text-slate-600 text-base max-w-2xl mx-auto mt-2">
                Explore the startups and innovative tech ventures nurtured by AIC-GBU across diverse focus areas.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
              {/* Search */}
              <div className="relative w-full md:w-80">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search startups, sectors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
                />
              </div>

              {/* Sector Dropdown / Pills */}
              <div className="w-full md:w-auto overflow-x-auto flex gap-2 no-scrollbar pb-2 md:pb-0">
                {sectors.map((sec, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSector(sec)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                      selectedSector === sec
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {sec === "All" ? "All Sectors" : sec.split(",")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Startups Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
              <AnimatePresence>
                {filteredStartups.map((startup, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="group bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-bold text-slate-400">
                          {startup.id}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getStageBadgeColor(startup.stage)}`}>
                          {startup.stage}
                        </span>
                      </div>

                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 line-clamp-1">
                        {startup.name}
                      </h4>

                      <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold mb-3">
                        <Tag className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="truncate">{startup.subsector}</span>
                      </div>

                      <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                        {startup.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span className="truncate max-w-[180px]">{startup.sector}</span>
                      <a
                        href={startup.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-indigo-600 font-semibold hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredStartups.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">No incubatee ventures found matching your filter criteria.</p>
              </div>
            )}
          </div>

          {/* Support Services Grid */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
              Support Infrastructure
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-3">
              Startup Support Offerings
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Comprehensive 360-degree ecosystem to assist founders from ideation to scaling
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {supportServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:bg-white hover:border-indigo-100 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-xs border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h5 className="text-xl font-bold mb-3 text-slate-900">
                    {service.title}
                  </h5>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Application Workflow Banner */}
          <div className="bg-slate-900 rounded-3xl p-8 md:p-14 text-center text-white relative overflow-hidden shadow-2xl border border-slate-800">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-25"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-25"></div>
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4 border border-indigo-400/30">
                <Rocket className="w-4 h-4 text-indigo-400" />
                Join AIC-GBU Ecosystem
              </span>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Have an Innovative Idea or Tech Venture?
              </h3>
              <p className="text-indigo-200 text-lg mb-12 max-w-2xl mx-auto">
                A simple 4-step process to get incubated at Atal Incubation Centre - GBU
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-left">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-bold border-4 border-slate-800 shrink-0">
                        {index + 1}
                      </div>
                    </div>
                    <h4 className="text-lg font-bold mb-2 text-white">{step.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>

              <a
                href={incubationAbout.formLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-base font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-5 h-5 text-indigo-200" />
                Submit Your Startup Proposal Online
              </a>
            </div>
          </div>
          
        </div>
      </section>
    </SearchableWrapper>
  );
};

export default StartUp;
