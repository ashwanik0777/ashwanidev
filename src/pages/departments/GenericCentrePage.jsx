import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Scale, Award, BookOpen, Users, CheckCircle, Mail, Gavel, Landmark, ShieldCheck, Phone, MapPin } from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import AboutSection from "../../components/departments/coedt/AboutCEDT";
import FacilitiesSwiper from "../../components/departments/coedt/FacilitiesSwiper";

/**
 * Generic Centre Page — Dynamically loads centre/unit data from
 * Data/schools/{schoolCode}/about/{centreId}.jsx and renders
 * the hero, about, facilities, and key activities sections.
 */
const GenericCentrePage = () => {
  const { shortCode } = useParams();
  const location = window.location.pathname;
  const centreId = location.split("/").filter(Boolean).pop();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOBSC").toUpperCase();
        // Map URL centreId to actual about file name
        const fileMap = {
          "meditation-mindfulness-centre": "meditation-mindfulness",
        };
        const fileName = fileMap[centreId] || centreId;
        const module = await import(`../../Data/schools/${schoolCode}/about/${fileName}.jsx`);
        // Try multiple export name patterns
        const exportData =
          module.legalAidData ||
          module.mootCourtData ||
          module.centreBuddhistStudiesData ||
          module.paliSanskritStudiesData ||
          module.heritageArchaeologyData ||
          module.meditationMindfulnessData ||
          Object.values(module).find((v) => v && typeof v === "object" && v.hero);
        setData(exportData || null);
      } catch (err) {
        console.warn(`Centre data not found for ${shortCode}/${centreId}`, err);
        setData(null);
      }
      setLoading(false);
    };
    loadData();
  }, [shortCode, centreId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Centre/Unit data not available.
      </div>
    );
  }

  return (
    <div>
      {data.customLayout === "legalAid" ? (
        <div className="min-h-screen bg-slate-50 selection:bg-purple-200">
          <BannerSection
            title={data.hero.title}
            subtitle={data.hero.subtitle}
            bgTheme={data.hero.bgTheme || 9}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
            
            {/* Legal Aid Booklet Download Card */}
            {data.bookletUrl && (
              <div className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-white to-purple-50 border border-purple-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl shrink-0 font-bold">
                    📖
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded border border-purple-200">
                      Official Document
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit mt-1">
                      {data.bookletTitle || "Legal Aid Booklet"}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Click to view and download the official Legal Aid Booklet presentation reference file.
                    </p>
                  </div>
                </div>
                <a
                  href={data.bookletUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Download Legal Aid Booklet</span>
                </a>
              </div>
            )}

            {/* Overview & Objectives */}
            {data.overviewSection && (

              <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      Constitutional & Statutory Mandate
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
                      {data.overviewSection.title}
                    </h2>
                  </div>
                </div>

                <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-medium">
                  {data.overviewSection.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.overviewSection.objectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/40 transition-all duration-300 space-y-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                        0{idx + 1}
                      </div>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg font-outfit">
                        {obj.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {obj.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Infrastructure & Achievements */}
            {data.infrastructureSection && (
              <section className="space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit tracking-tight">
                    {data.infrastructureSection.title}
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base font-medium">
                    {data.infrastructureSection.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {data.infrastructureSection.cards.map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                          {card.badge}
                        </span>
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-outfit">
                        {card.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {data.infrastructureSection.facilitiesText && (
                  <div className="p-6 rounded-2xl bg-purple-50/80 border border-purple-200/90 text-slate-800 text-sm font-medium flex items-center gap-3">
                    <span className="text-xl">🏢</span>
                    <span>{data.infrastructureSection.facilitiesText}</span>
                  </div>
                )}
              </section>
            )}

            {/* Who is Entitled for Free Legal Services */}
            {data.entitlementSection && (
              <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                      Section 12, Legal Services Authorities Act, 1987
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit mt-1">
                      {data.entitlementSection.title}
                    </h2>
                  </div>
                  {data.entitlementSection.incomeCeilingBadge && (
                    <span className="px-4 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold shrink-0">
                      {data.entitlementSection.incomeCeilingBadge}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.entitlementSection.categories.map((cat, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
                      <span className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed">
                        {cat}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Contact & Faculty Coordinators */}
            {data.contact && (
              <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 max-w-4xl mx-auto">
                <div className="text-center space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit">
                    {data.contact.title}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">
                    Faculty Coordinators & Official Communication Desk
                  </p>
                </div>

                {data.contact.office && (
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <MapPin className="w-4 h-4 text-purple-700 shrink-0" />
                    <span>{data.contact.office}</span>
                  </div>
                )}

                {data.contact.coordinators && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {data.contact.coordinators.map((c, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                        <div className="font-bold text-slate-900 text-sm sm:text-base">{c.name}</div>
                        <div className="text-xs text-purple-700 font-semibold">{c.designation}</div>
                        {c.role && (
                          <span className="inline-block px-2.5 py-0.5 mt-1 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                            {c.role}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
                  {data.contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-700" />
                      <span className="font-semibold text-slate-400">Email:</span>
                      <a href={`mailto:${data.contact.email}`} className="text-purple-700 font-bold hover:underline">
                        {data.contact.email}
                      </a>
                    </div>
                  )}
                  {data.contact.phoneNumbers && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-700" />
                      <span className="font-semibold text-slate-400">Phone:</span>
                      <span className="font-bold text-slate-900">
                        {data.contact.phoneNumbers.join(", ")}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            )}

          </div>
        </div>
      ) : data.customLayout === "mootCourt" ? (

        <div className="min-h-screen bg-slate-50 selection:bg-purple-200">
          <BannerSection
            title={data.hero.title}
            subtitle={data.hero.subtitle}
            bgTheme={data.hero.bgTheme || 9}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
            
            {/* Overview & BCI Mandate */}
            {data.overviewSection && (
              <section className="space-y-8">
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                      <Landmark className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                        School of Law, Justice & Governance
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit">
                        {data.overviewSection.title}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
                    {data.overviewSection.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {data.overviewSection.bciBadge && (
                    <div className="p-6 rounded-2xl bg-purple-50/80 border border-purple-200/90 text-slate-900 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 shrink-0">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-purple-800 text-xs font-bold uppercase tracking-wider">
                            {data.overviewSection.bciBadge}
                          </div>
                          <div className="text-sm sm:text-base font-semibold text-slate-800 mt-0.5">
                            {data.overviewSection.bciText}
                          </div>
                        </div>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-white text-purple-800 border border-purple-200 text-xs font-bold shrink-0 shadow-xs">
                        Mandatory Subject & 3 Evaluated Rounds / Year
                      </span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Moot Court Society */}
            {data.societySection && (
              <section className="space-y-8">
                <div className="text-center max-w-3xl mx-auto space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-outfit tracking-tight">
                    {data.societySection.title}
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base font-medium">
                    {data.societySection.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                  {data.societySection.cards.map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                            {card.icon === "Users" && <Users className="w-6 h-6" />}
                            {card.icon === "Award" && <Award className="w-6 h-6" />}
                            {card.icon === "BookOpen" && <BookOpen className="w-6 h-6" />}
                            {card.icon === "Scale" && <Gavel className="w-6 h-6" />}
                          </div>
                          <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
                            {card.badge}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-outfit">
                          {card.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* National Competition & Dignitaries */}
            {data.nationalCompetitionSection && (
              <section className="space-y-8">
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-8">
                  <div className="text-center max-w-3xl mx-auto space-y-2">
                    <span className="px-3.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold uppercase tracking-wider">
                      Flagship National Event
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-slate-900 tracking-tight mt-2">
                      {data.nationalCompetitionSection.title}
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base font-medium">
                      {data.nationalCompetitionSection.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.nationalCompetitionSection.dignitaries.map((d, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/40 transition-all duration-300 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded border border-purple-200">
                            {d.badge}
                          </span>
                          <Landmark className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="font-bold text-slate-900 text-base font-outfit">
                          {d.name}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                          {d.role}
                        </div>
                      </div>
                    ))}
                  </div>

                  {data.nationalCompetitionSection.extraNote && (
                    <div className="text-center pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-500 font-medium italic">
                      ✨ {data.nationalCompetitionSection.extraNote}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Contact & Faculty Coordinators */}
            {data.contact && (
              <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm space-y-6 max-w-4xl mx-auto">
                <div className="text-center space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-outfit">
                    {data.contact.title}
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm font-medium">
                    Faculty Coordinators & Official Communication Desk
                  </p>
                </div>

                {data.contact.coordinators && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {data.contact.coordinators.map((c, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-1">
                        <div className="font-bold text-slate-900 text-sm sm:text-base">{c.name}</div>
                        <div className="text-xs text-purple-700 font-semibold">{c.designation}</div>
                        {c.role && (
                          <span className="inline-block px-2.5 py-0.5 mt-1 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-bold">
                            {c.role}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {data.contact.email && (
                  <div className="text-center pt-4 border-t border-slate-100 flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-purple-700" />
                    <span className="text-xs font-semibold uppercase text-slate-400">Official Email: </span>
                    <a href={`mailto:${data.contact.email}`} className="text-purple-700 font-bold hover:underline text-sm">
                      {data.contact.email}
                    </a>
                  </div>
                )}
              </section>
            )}

          </div>
        </div>
      ) : (
        <div>
          {data.hero && (
            <BannerSection
              title={data.hero.title}
              subtitle={data.hero.subtitle}
              bgTheme={data.hero.bgTheme || 5}
            />
          )}

      {data.about && (
        <AboutSection
          sectionTitle="About Us"
          visionTitle={data.about.visionTitle}
          visionDescription={data.about.visionDescription}
          missionTitle={data.about.missionTitle}
          missionPoints={data.about.missionPoints}
          storyTitle={data.about.storyTitle}
          storyText={data.about.storyText}
          whatWeDoTitle={data.about.whatWeDoTitle}
          whatWeDoText={data.about.whatWeDoText}
          commitmentTitle={data.about.commitmentTitle}
          commitmentText={data.about.commitmentText}
          photos={data.about.photos}
        />
      )}

      {data.facilities && data.facilities.length > 0 && (
        <FacilitiesSwiper
          sectionTitle="Our Facilities"
          facilities={data.facilities}
        />
      )}

      {/* Key Activities Section */}
      {data.keyActivities && data.keyActivities.length > 0 && (
        <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Key Activities & Programs
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Discover our flagship initiatives and regular programs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.keyActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
                    <h3 className="text-lg font-bold text-gray-800">
                      {activity.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {activity.description}
                  </p>
                  {activity.date && (
                    <div className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full inline-block">
                      📅 {activity.date}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact & Faculty Coordinators Section */}
      {data.contact && (
        <section className="py-12 px-6 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 font-outfit text-center">
              {data.contact.title || "Contact & Faculty Coordinators"}
            </h2>
            {data.contact.coordinators && data.contact.coordinators.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Faculty Coordinators
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.contact.coordinators.map((c, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="font-bold text-slate-900 text-sm">{c.name}</div>
                      <div className="text-xs text-purple-700 font-medium mt-0.5">{c.role || c.designation}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {data.contact.email && (
              <div className="text-center pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold uppercase text-slate-400">Email: </span>
                <a href={`mailto:${data.contact.email}`} className="text-purple-700 font-bold hover:underline text-sm">
                  {data.contact.email}
                </a>
              </div>
            )}
          </div>
        </section>
      )}
        </div>
      )}
    </div>
  );
};

export default GenericCentrePage;
