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

const ResearchArea = ({ hero, stats, domains, funding, collaborations, facultyProfiles = [] }) => {
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
        <section className="py-12 px-4 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 font-outfit">
                  Faculty Research Areas & Profiles
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Explore research expertise, ongoing investigations, and scientific contributions of our faculty.
                </p>
              </div>
              <div className="w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search faculty or research area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFaculty.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 font-outfit">
                          {item.name}
                        </h3>
                        {item.designation && (
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mt-1">
                            {item.designation}
                          </span>
                        )}
                      </div>
                    </div>

                    {item.researchArea && (
                      <div className="mb-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-blue-600 inline" />
                          Research Area
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {item.researchArea.split(",").map((area, aIdx) => (
                            <span
                              key={aIdx}
                              className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                            >
                              {area.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {item.profile && (
                      <div className="mt-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Research Profile
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                          {item.profile}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredFaculty.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No faculty profiles found matching "{searchTerm}".
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
    />
  );
}
