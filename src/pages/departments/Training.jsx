import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, Users, Award, Building, TrendingUp, CheckCircle, Download } from "lucide-react";
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
const TrainingConsultancy = ({ hero, stats, overview, trainingPrograms, technicalConsultancy, businessConsultancy, successStories, schoolCode, pdfUrl, workshopsList }) => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <BannerSection
        title={hero.title}
        subtitle={hero.subtitle}
        bgTheme={9}
      />

      {/* PDF Download Button */}
      {pdfUrl && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 flex justify-end">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            Download Complete Training & Workshop Details (PDF)
          </a>
        </div>
      )}

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
        <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {overview.lead && (
            <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 text-white p-8 md:p-10 rounded-2xl shadow-xl border border-purple-900/50 mb-10">
              <div className="inline-block px-3 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
                School of Buddhist Studies & Civilization
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-outfit text-white mb-4">
                Overview & Leadership
              </h2>
              <p className="text-purple-100/90 text-base md:text-lg leading-relaxed font-normal">
                {overview.lead}
              </p>
            </div>
          )}

          {overview.highlights && overview.highlights.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
              {overview.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-outfit mb-3 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-purple-700" />
                      </div>
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {overview.callToAction && (
            <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border border-purple-200/80 rounded-2xl p-8 text-center max-w-4xl mx-auto shadow-sm">
              <p className="text-slate-800 text-base md:text-lg font-medium mb-4">
                {overview.callToAction.text}
              </p>
              <a
                href={overview.callToAction.link || (schoolCode ? `/schools/${schoolCode}/research-area` : "/schools/SOICT/research-area")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {overview.callToAction.buttonText || "Explore Faculty Research Profiles →"}
              </a>
            </div>
          )}
        </section>
      )}

      {/* Training Programs */}
      {trainingPrograms && trainingPrograms.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/60">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
              Training Programs & Courses
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Structured meditation courses, weekly stress management, and intensive residential retreats
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {trainingPrograms.map((tp, i) => <ProgramCard key={i} {...tp} />)}
          </div>
        </section>
      )}

      {/* Short-Term Workshops & Symposia Table */}
      {workshopsList && workshopsList.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/60">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-outfit">
              Short-Term Workshops & Symposia (2014 – Present)
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              Chronological record of workshops, national conventions, and international symposia conducted at Mahatma Jyotiba Phule Dhyan Kendra, GBU
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-gradient-to-r from-slate-900 via-purple-950 to-indigo-950 text-white font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-4 px-5 text-center w-16">S.No.</th>
                    <th className="py-4 px-5 w-48">Date</th>
                    <th className="py-4 px-5">Workshop / Program Title</th>
                    <th className="py-4 px-5 w-64">Organized By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/80 font-medium">
                  {workshopsList.map((ws, idx) => (
                    <tr key={idx} className="hover:bg-purple-50/50 transition-colors">
                      <td className="py-3.5 px-5 text-center font-semibold text-slate-400">{idx + 1}</td>
                      <td className="py-3.5 px-5 font-bold text-purple-800 whitespace-nowrap">{ws.date}</td>
                      <td className="py-3.5 px-5 font-bold text-slate-900">{ws.title}</td>
                      <td className="py-3.5 px-5 text-slate-600 font-medium">{ws.organizer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
      pdfUrl={tcData.pdfUrl}
      workshopsList={tcData.workshopsList}
      schoolCode={(shortCode || "SOICT").toUpperCase()}
    />
  );
}
