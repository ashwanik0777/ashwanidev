import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Award, DollarSign, Users, CheckCircle, Building } from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";

const iconMap = {
  Award,
  DollarSign,
  Users,
  CheckCircle,
  Building,
};

const OngoingProjects = ({ projects = [] }) => (
  <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit mb-8 pb-4 border-b border-slate-200">
      Ongoing Sponsored Research Projects
    </h2>
    <div className="space-y-6">
      {projects.map((proj, i) => (
        <div
          key={i}
          className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              {proj.status || "Ongoing Project"}
            </span>
            {proj.grant && (
              <span className="text-sm font-bold text-blue-700 bg-blue-50 border border-blue-100 px-3.5 py-1 rounded-full">
                Grant Received: {proj.grant}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit mb-4 leading-snug">
            {proj.title}
          </h3>

          {proj.description && (
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Research Project Description
              </h4>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {proj.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
            {proj.teamMembers && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Team Members
                </h4>
                <p className="text-slate-800 font-semibold">
                  {proj.teamMembers}
                </p>
              </div>
            )}

            {proj.fundingAgency && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Funding Agency
                </h4>
                <p className="text-slate-800 font-medium">
                  {proj.fundingAgency}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const ResearchProjects = () => {
  const { shortCode } = useParams();
  const [researchProjectsData, setResearchProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/research/research-projects.jsx`);
        setResearchProjectsData(module.researchProjectsData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/research/research-projects.jsx");
          setResearchProjectsData(fallback.researchProjectsData);
        } catch {
          setResearchProjectsData(null);
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

  if (!researchProjectsData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Research projects data not available.
      </div>
    );
  }

  const {
    hero,
    stats,
    ongoingProjects,
  } = researchProjectsData;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <BannerSection
        title={hero?.title || "RESEARCH PROJECTS"}
        subtitle={hero?.description || hero?.subtitle || "Sponsored Research Projects & Initiatives"}
        bgTheme={1}
      />
      {stats && stats.length > 0 && (
        <StatsCard
          stats={stats.map((item) => ({
            icon: iconMap[item.icon] || Award,
            number: item.value,
            subtitle: item.label,
          }))}
        />
      )}

      {ongoingProjects && ongoingProjects.length > 0 && (
        <OngoingProjects projects={ongoingProjects} />
      )}
    </div>
  );
};

export default ResearchProjects;
