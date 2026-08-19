import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Award, DollarSign, Users, CheckCircle, Building, Search, X, BookOpen } from "lucide-react";
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

const ResearchPublications = ({ publications = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = publications.filter((pub) => {
    const term = searchTerm.toLowerCase();
    return typeof pub === "string"
      ? pub.toLowerCase().includes(term)
      : (pub.citation && pub.citation.toLowerCase().includes(term));
  });

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 pb-6 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
            Research Publications
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Browse peer-reviewed journal publications and scientific contributions.
          </p>
        </div>

        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search publication, author, journal..."
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

      <div className="text-xs text-slate-500 font-medium mb-4">
        Showing <strong className="text-slate-800">{filtered.length}</strong> of{" "}
        <strong className="text-slate-800">{publications.length}</strong> Publications
      </div>

      <div className="space-y-4">
        {filtered.map((pub, idx) => {
          const isObj = typeof pub === "object" && pub !== null;
          const text = isObj ? pub.citation || `${pub.authors} (${pub.year}). ${pub.title}. ${pub.journal}${pub.volume ? `, ${pub.volume}` : ""}.` : pub;
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-200 hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-blue-100 font-mono">
                {pub.sno || idx + 1}
              </div>
              <div className="min-w-0 flex-1 space-y-1.5">
                {isObj && (pub.category || pub.department || pub.year) && (
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {pub.category && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                        {pub.category}
                      </span>
                    )}
                    {pub.year && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {pub.year}
                      </span>
                    )}
                    {pub.department && (
                      <span className="text-[11px] font-semibold text-purple-700 ml-auto">
                        {pub.department}
                      </span>
                    )}
                  </div>
                )}
                {isObj && pub.title ? (
                  <>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-outfit">
                      {pub.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed font-sans">
                      <strong className="text-slate-800 font-semibold">{pub.authors}</strong> ({pub.year}). <span className="italic text-slate-700">{pub.journal}</span>{pub.volume ? `, ${pub.volume}` : ""}.
                    </p>
                  </>
                ) : (
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed font-sans">
                    {text}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

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
    publications,
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

      {publications && publications.length > 0 && (
        <ResearchPublications publications={publications} />
      )}
    </div>
  );
};

export default ResearchProjects;
