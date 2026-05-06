import React from "react";
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
import { researchAreaData } from "../../Data/schools/SOICT/research/research-area-profile";

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

const ResearchArea = ({ hero, stats, domains, funding, collaborations }) => {
  return (
    <>
      <BannerSection title={hero.title} subtitle={hero.subtitle} bgTheme={1} />

      <StatsCard
        stats={stats.map((item) => ({
          icon: item.icon,
          number: item.number,
          numberText: typeof item.number === "string" ? item.number : undefined,
          subtitle: item.label,
        }))}
      />

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

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
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
        </div>
      </section>
    </>
  );
};

export default function ResearchPage() {
  const stats = researchAreaData.stats.map((item) => ({
    ...item,
    icon: iconMap[item.iconName] || BookOpen,
  }));

  const domains = researchAreaData.domains.map((domain) => ({
    ...domain,
    icon: iconMap[domain.iconName] || Brain,
  }));

  return (
    <ResearchArea
      hero={researchAreaData.hero}
      stats={stats}
      domains={domains}
      funding={researchAreaData.funding}
      collaborations={researchAreaData.collaborations}
    />
  );
}
