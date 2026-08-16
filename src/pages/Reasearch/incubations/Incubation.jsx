import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FileText,
  Target,
  Users,
  Building2,
  Mail,
  ExternalLink,
  CheckCircle,
  ShieldCheck,
} from "lucide-react";

import Focus from "./Focus";
import Team from "./Team";
import Services from "./Services";
import ContactUs from "./ContactUs";

import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";
import BannerSection from "../../../components/HeroBanner.jsx";
import { incubationExactData } from "../../../Data/incubationData.js";

const tabsList = [
  { id: "about", label: "About Us", icon: FileText },
  { id: "objectives", label: "Objectives & Focus", icon: Target },
  { id: "team", label: "Team", icon: Users },
  { id: "facilities", label: "Facilities", icon: Building2 },
  { id: "contact", label: "Contact Us", icon: Mail },
];

const Incubation = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "about";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const currentTabParam = searchParams.get("tab");
    if (currentTabParam && currentTabParam !== activeTab) {
      setActiveTab(currentTabParam);
    }
  }, [searchParams]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId }, { replace: true });
    const contentElem = document.getElementById("incubation-content-section");
    if (contentElem) {
      contentElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50/50 pb-12 sm:pb-20">
        {/* Banner Section */}
        <BannerSection
          title="GBU Incubation Centre"
          bgTheme={5}
        />

        {/* Navigation Tab Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3">
            
            {/* Scrollable Tabs List */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-1 w-full sm:w-auto no-scrollbar shrink">
              {tabsList.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer active:scale-95 touch-manipulation ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/80 border border-transparent"
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Official Web Link Button */}
            <a
              href={incubationExactData.weblink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ml-auto"
            >
              <span>gburif.org</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-600" />
            </a>

          </div>
        </div>

        {/* Main Tab Content Display Area */}
        <div id="incubation-content-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
          
          {/* TAB 1: ABOUT US (Background & Registered Body Info ONLY - Zero repetition) */}
          {activeTab === "about" && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-slate-200/80 shadow-xs w-full space-y-6 sm:space-y-8">
              
              {/* Background Section */}
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-600 pl-3 sm:pl-4 py-0.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Background</h2>
                </div>

                <p className="text-slate-700 leading-relaxed text-xs sm:text-base">
                  {incubationExactData.background.startupIndiaText}
                </p>

                <p className="text-slate-700 leading-relaxed text-xs sm:text-base">
                  {incubationExactData.background.dippText}
                </p>

                {/* UP Policy Callout Quote */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 relative shadow-2xs">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-base mb-2 sm:mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0" />
                    Uttar Pradesh Start UP Policy, 2020
                  </h3>
                  <blockquote className="text-slate-600 text-xs sm:text-base italic leading-relaxed mb-3 sm:mb-4">
                    {incubationExactData.background.upPolicyText}
                  </blockquote>
                  <a
                    href={incubationExactData.background.upPolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold text-xs hover:underline"
                  >
                    (https://startinup.up.gov.in/welcome/startup_policy_2020)
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Authorized Categories */}
                <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xs mt-4">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-base mb-3 sm:mb-4">
                    {incubationExactData.background.categoriesTitle}
                  </h3>
                  <ul className="space-y-2.5 sm:space-y-3 text-slate-700 text-xs sm:text-base">
                    {incubationExactData.background.categories.map((cat, index) => (
                      <li key={index} className="flex items-start gap-2.5 sm:gap-3">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{cat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* GBU Incubation Centre Registered Body */}
              <div className="bg-indigo-50/60 border border-indigo-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {incubationExactData.registeredBody.title}
                </h3>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-base">
                  {incubationExactData.registeredBody.text}
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: OBJECTIVES & FOCUS AREAS */}
          {activeTab === "objectives" && <Focus />}

          {/* TAB 3: TEAM */}
          {activeTab === "team" && <Team />}

          {/* TAB 4: FACILITIES */}
          {activeTab === "facilities" && <Services />}

          {/* TAB 5: CONTACT US */}
          {activeTab === "contact" && <ContactUs />}

        </div>
      </div>
    </SearchableWrapper>
  );
};

export default Incubation;
