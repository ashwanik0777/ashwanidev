import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Brain,
  Zap,
  Shield,
  Database,
  Search,
  ChevronDown,
  ChevronUp,
  User,
  X
} from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";

const iconMap = {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Brain,
  Zap,
  Shield,
  Database,
};

const FacultyResearchCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 260;
  const isLongText = item.profile && item.profile.length > maxLength;

  // Split research areas by comma or semicolon
  const researchAreasList = item.researchArea
    ? item.researchArea.split(/[,;]/).map((a) => a.trim()).filter(Boolean)
    : [];

  // Generate initials for avatar
  const initials = item.name
    .replace(/^Dr\.\s*|Prof\.\s*/i, "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
      <div>
        {/* Header: Avatar, Name & Designation */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
            {initials || <User className="w-5 h-5" />}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-slate-900 font-outfit leading-snug">
              {item.name}
            </h3>
            {item.designation && (
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full inline-block mt-1">
                {item.designation}
              </span>
            )}
          </div>
        </div>

        {/* Research Area Badges */}
        {researchAreasList.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 inline" />
              Research Areas
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {researchAreasList.map((area, aIdx) => (
                <span
                  key={aIdx}
                  className="text-xs bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-1 rounded-md font-medium border border-slate-200/80 transition-colors"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Research Profile Text */}
        {item.profile && (
          <div className="mt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Research Profile
            </h4>
            <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {isLongText && !isExpanded
                ? `${item.profile.slice(0, maxLength)}...`
                : item.profile}
            </div>
          </div>
        )}
      </div>

      {/* Read More / Show Less Toggle Button */}
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors self-start"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Read Full Profile <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

const ResearchArea = ({ hero, stats, domains, funding, collaborations, facultyProfiles = [], sectionTitle }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaculty = facultyProfiles.filter((f) => {
    const term = searchTerm.toLowerCase();
    return (
      f.name.toLowerCase().includes(term) ||
      (f.researchArea && f.researchArea.toLowerCase().includes(term)) ||
      (f.profile && f.profile.toLowerCase().includes(term))
    );
  });

  return (
    <>
      <BannerSection title={hero.title} subtitle={hero.subtitle} bgTheme={1} />

      {stats && stats.length > 0 && (
        <StatsCard
          stats={stats.map((item) => ({
            icon: item.icon,
            number: item.number,
            numberText: typeof item.number === "string" ? item.number : undefined,
            subtitle: item.label,
          }))}
        />
      )}

      {/* Faculty Research Profiles Section */}
      {facultyProfiles && facultyProfiles.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-slate-200">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
                  {sectionTitle || "Faculty Research Areas & Profiles"}
                </h2>
                <p className="text-slate-600 text-sm mt-1.5 max-w-2xl">
                  Explore academic expertise, research domains, publications, and scientific achievements of our faculty members.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80 shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search faculty or research area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
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

            {/* Results Count Banner */}
            <div className="flex items-center justify-between mb-6 text-xs text-slate-500 font-medium">
              <span>
                Showing <strong className="text-slate-800">{filteredFaculty.length}</strong> of{" "}
                <strong className="text-slate-800">{facultyProfiles.length}</strong> Faculty Members
              </span>
              {searchTerm && (
                <span>
                  Filtering by: <em className="text-blue-600 font-semibold">"{searchTerm}"</em>
                </span>
              )}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {filteredFaculty.map((item, idx) => (
                <FacultyResearchCard key={idx} item={item} />
              ))}
            </div>

            {filteredFaculty.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm mt-6">
                <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No Faculty Profiles Found</h3>
                <p className="text-sm text-slate-500 mt-1">
                  No profiles matched your query "{searchTerm}". Try searching for another keyword.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  Clear Search Filter
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {domains && domains.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Major Research Domains
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {domains.map((domain, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${domain.bg} p-8 rounded-xl`}
                >
                  <div className="flex items-center mb-6">
                    <domain.icon className={`h-12 w-12 ${domain.color} mr-4`} />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {domain.title}
                      </h3>
                      <p className={`${domain.color} font-semibold`}>
                        {domain.tagline}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-700 mb-6">
                    {domain.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <span
                          className={`w-2 h-2 ${domain.color} rounded-full mt-2 mr-3 flex-shrink-0`}
                        />
                        <div>
                          <strong>{point.title}</strong>
                          <p className="text-sm text-gray-600">{point.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Key Faculty:</strong> {domain.faculty}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Research Projects:</strong> {domain.projects} |{" "}
                      <strong>Funding:</strong> {domain.funding}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {((funding && funding.length > 0) || (collaborations && collaborations.length > 0)) && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            {funding && funding.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Research Funding Sources
                </h2>
                <div className="space-y-4">
                  {funding.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-lg ${item.bg}`}
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                      </div>
                      <span className={`${item.color} font-bold`}>{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {collaborations && collaborations.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  International Collaborations
                </h2>
                <div className="space-y-6">
                  {collaborations.map((item, index) => (
                    <div key={index} className={`border-l-4 pl-6 ${item.border}`}>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                      <p className="text-xs text-gray-500">{item.extra}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default function ResearchPage() {
  const { shortCode } = useParams();
  const [researchAreaData, setResearchAreaData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/research/research-area-profile.jsx`);
        setResearchAreaData(module.researchAreaData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/research/research-area-profile.jsx");
          setResearchAreaData(fallback.researchAreaData);
        } catch {
          setResearchAreaData(null);
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

  if (!researchAreaData) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Research data not available.</div>;
  }

  const stats = (researchAreaData.stats || []).map((item) => ({
    ...item,
    icon: iconMap[item.iconName] || BookOpen,
  }));

  const domains = (researchAreaData.domains || []).map((domain) => ({
    ...domain,
    icon: iconMap[domain.iconName] || Brain,
  }));

  const hero = researchAreaData.hero || {
    title: researchAreaData.heading || "Research",
    subtitle: researchAreaData.subheading || "",
  };

  return (
    <ResearchArea
      hero={hero}
      stats={stats}
      domains={domains}
      funding={researchAreaData.funding || []}
      collaborations={researchAreaData.collaborations || []}
      facultyProfiles={researchAreaData.facultyProfiles || []}
      sectionTitle={researchAreaData.sectionTitle || researchAreaData.heading}
    />
  );
}
