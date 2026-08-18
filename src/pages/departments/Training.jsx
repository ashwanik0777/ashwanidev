import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, Users, Award, Building, TrendingUp, CheckCircle } from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";



// ✅ Reusable Program Card
const ProgramCard = ({ bg, icon, title, subtitle, items, footer }) => (
  <div className={`bg-gradient-to-br ${bg} p-8 rounded-xl`}>
    <div className="flex items-center mb-6">
      {icon}
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <p className="font-semibold">{subtitle}</p>
      </div>
    </div>
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{item.detail1}</span>
            <span>{item.detail2}</span>
          </div>
        </div>
      ))}
    </div>
    <div className={`mt-6 p-4 ${footer.bg} rounded-lg`}>
      <p className={`text-sm ${footer.textColor}`}>
        <strong>{footer.label}</strong> {footer.value}
      </p>
      <p className={`text-xs ${footer.textColor2}`}>{footer.note}</p>
    </div>
  </div>
);

// ✅ Reusable Consultancy Block
const ConsultancyBlock = ({ title, services }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
    <div className="space-y-4">
      {services.map((srv, idx) => (
        <div key={idx} className={`border-l-4 ${srv.border} pl-6`}>
          <h4 className="text-lg font-semibold text-gray-900">{srv.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{srv.desc}</p>
          <ul className="text-xs text-gray-500 space-y-1">
            {srv.points.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

// ✅ Reusable Success Story Card
const SuccessCard = ({ from, iconColor, quote, client, fields, details }) => {
  const resolvedClient = client || details?.client || "Client";
  const resolvedFields = fields || details?.fields || [];
  return (
    <div className={`bg-gradient-to-br ${from} p-6 rounded-xl`}>
      <div className="flex items-center mb-4">
        <CheckCircle className={`h-8 w-8 ${iconColor} mr-3`} />
        <h3 className="text-lg font-semibold text-gray-900">{resolvedClient}</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">{quote}</p>
      <div className="text-xs text-gray-500">
        {resolvedFields.map((f, i) => (
          <p key={i}>
            <strong>{f.label}:</strong> {f.value}
          </p>
        ))}
      </div>
    </div>
  );
};

// ✅ Main TrainingConsultancy Page with Props
const TrainingConsultancy = ({ hero, stats, overview, trainingPrograms, technicalConsultancy, businessConsultancy, successStories, schoolCode }) => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <BannerSection
        title={hero.title}
        subtitle={hero.subtitle}
        bgTheme={9}
      />

      {/* Stats */}
      {stats && stats.length > 0 && (
        <StatsCard
          stats={stats.map((item) => ({
            icon: item.Icon,
            numberText: item.number,
            subtitle: item.label
          }))}
        />
      )}

      {/* Overview Section */}
      {overview && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {overview.lead && (
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 md:p-10 rounded-2xl shadow-lg mb-12">
              <h2 className="text-2xl md:text-3xl font-bold font-outfit mb-4">
                Empowering Corporates & Engineers
              </h2>
              <p className="text-blue-100 text-base md:text-lg leading-relaxed font-normal">
                {overview.lead}
              </p>
            </div>
          )}

          {overview.highlights && overview.highlights.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {overview.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold text-slate-900 font-outfit mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600 shrink-0" />
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {overview.callToAction && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center max-w-4xl mx-auto shadow-sm">
              <p className="text-slate-800 text-base md:text-lg font-medium mb-4">
                {overview.callToAction.text}
              </p>
              <a
                href={overview.callToAction.link || (schoolCode ? `/schools/${schoolCode}/research-area` : "/schools/SOICT/research-area")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors shadow-md hover:shadow-lg"
              >
                {overview.callToAction.buttonText || "Explore Faculty Research Profiles →"}
              </a>
            </div>
          )}
        </section>
      )}

      {/* Training Programs */}
      {trainingPrograms && trainingPrograms.length > 0 && (
        <section className="py-16 px-4 bg-white max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Training Programs</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trainingPrograms.map((tp, i) => <ProgramCard key={i} {...tp} />)}
          </div>
        </section>
      )}

      {/* Consultancy Services */}
      {((technicalConsultancy && technicalConsultancy.length > 0) || (businessConsultancy && businessConsultancy.length > 0)) && (
        <section className="py-16 px-4 bg-gray-50 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Consultancy Services</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {technicalConsultancy && technicalConsultancy.length > 0 && <ConsultancyBlock title="Technical Consultancy" services={technicalConsultancy} />}
            {businessConsultancy && businessConsultancy.length > 0 && <ConsultancyBlock title="Business Consultancy" services={businessConsultancy} />}
          </div>
        </section>
      )}

      {/* Success Stories */}
      {successStories && successStories.length > 0 && (
        <section className="py-16 px-4 bg-white max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.map((s, i) => <SuccessCard key={i} {...s} />)}
          </div>
        </section>
      )}
    </div>
  );
};

// ✅ Export with dynamic school-specific data loading
export default function TrainingConsultancyPage() {
  const { shortCode } = useParams();
  const [tcData, setTcData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/research/training-consultancy.jsx`);
        setTcData(module.trainingConsultancyData);
      } catch {
        // Fallback: use inline SOICT defaults
        setTcData({
          hero: {
            title: "TRAINING AND CONSULTANCY",
            subtitle: "Comprehensive training programs and consultancy services to bridge the gap between academia and industry.",
          },
          stats: [
            { Icon: Users, number: "5000+", label: "Professionals Trained", color: "text-green-600" },
            { Icon: Building, number: "200+", label: "Corporate Partners", color: "text-blue-600" },
            { Icon: Award, number: "150+", label: "Training Programs", color: "text-purple-600" },
            { Icon: TrendingUp, number: "98%", label: "Satisfaction Rate", color: "text-orange-600" },
          ],
          trainingPrograms: [],
          technicalConsultancy: [],
          businessConsultancy: [],
          successStories: [],
        });
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

  if (!tcData) return null;

  // Resolve icon components from icon name strings
  const iconMap = { Briefcase, Users, Award };
  const resolvedPrograms = (tcData.trainingPrograms || []).map(tp => ({
    ...tp,
    icon: tp.icon && typeof tp.icon === 'string'
      ? React.createElement(iconMap[tp.icon] || Briefcase, { className: `h-12 w-12 ${tp.iconColor || 'text-blue-600'} mr-4` })
      : tp.icon || <Briefcase className="h-12 w-12 text-blue-600 mr-4" />,
  }));

  return (
    <TrainingConsultancy
      hero={tcData.hero}
      stats={tcData.stats}
      overview={tcData.overview}
      trainingPrograms={resolvedPrograms}
      technicalConsultancy={tcData.technicalConsultancy}
      businessConsultancy={tcData.businessConsultancy}
      successStories={tcData.successStories}
      schoolCode={(shortCode || "SOICT").toUpperCase()}
    />
  );
}
