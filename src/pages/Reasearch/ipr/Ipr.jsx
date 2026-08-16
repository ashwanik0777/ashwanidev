import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FileText,
  Users,
  BookOpen,
  Calendar,
  ShieldCheck,
  Award,
  Link2,
  Mail,
} from "lucide-react";

import IPRObjectives from "./IPRObjectives";
import Team from "./Team";
import IprCourses from "./IprCourses";
import IprActivities from "./IprActivities";
import IprPolicy from "./IprPolicy";
import IprList from "./IprList";
import ImportantLinks from "./ImportantLinks";
import ContactDetails from "./ContactDetails";

import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";
import BannerSection from "../../../components/HeroBanner.jsx";

const tabsList = [
  { id: "home", label: "Home", icon: FileText },
  { id: "people", label: "People", icon: Users },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "activities", label: "Activities", icon: Calendar },
  { id: "policy", label: "GBU IPR Policy", icon: ShieldCheck },
  { id: "iprs", label: "GBU IPRs", icon: Award },
  { id: "links", label: "Links", icon: Link2 },
  { id: "contact", label: "Contact Us", icon: Mail },
];

const Ipr = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "home";
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
    // Smooth scroll to tab content area
    const contentElem = document.getElementById("ipr-content-section");
    if (contentElem) {
      contentElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50/50 pb-16 sm:pb-20">
        {/* Banner Section */}
        <BannerSection
          title="IPR Cell"
          subtitle="Intellectual Property Rights Cell • Gautam Buddha University"
          bgTheme={7}
        />

        {/* Navigation Sticky Tab Bar */}
        <div className="sticky top-[4.5rem] md:top-[5.5rem] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2.5">
            <div className="flex items-center justify-start overflow-x-auto scrollbar-none gap-1.5 sm:gap-2 no-scrollbar py-0.5 whitespace-nowrap">
              {tabsList.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50/60 border border-transparent hover:border-blue-100"
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? "text-white" : "text-gray-500"}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Tab Content Display Area */}
        <div id="ipr-content-section" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          {activeTab === "home" && <IPRObjectives />}
          {activeTab === "people" && <Team />}
          {activeTab === "courses" && <IprCourses />}
          {activeTab === "activities" && <IprActivities />}
          {activeTab === "policy" && <IprPolicy />}
          {activeTab === "iprs" && <IprList />}
          {activeTab === "links" && <ImportantLinks />}
          {activeTab === "contact" && <ContactDetails />}
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default Ipr;
