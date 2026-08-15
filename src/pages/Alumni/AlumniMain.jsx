import React, { useState } from "react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";
import BannerSection from "../../components/HeroBanner";
import {
  aboutGBUAA,
  alumniStats,
  portalActions,
  executiveCommittee,
  notableAlumniList,
  officialContactInfo,
} from "../../Data/alumniData";
import {
  Users,
  Globe,
  Briefcase,
  ExternalLink,
  Search,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  UserCheck,
  ShieldCheck,
  CreditCard,
  Sparkles,
} from "lucide-react";

export default function AlumniMain() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAlumni = notableAlumniList.filter(
    (alumnus) =>
      alumnus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alumnus.year.includes(searchTerm)
  );

  return (
    <SearchableWrapper>
      {/* Top Page Hero Banner */}
      <BannerSection
        title="GBU Alumni Association (GBUAA)"
        bgTheme={1}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 pb-20 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
          
          {/* Top Card: About GBUAA */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-md hover:shadow-lg transition-all space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              About GBUAA
            </h1>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {aboutGBUAA.description}
            </p>
          </div>

          {/* Quick Action Portals */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Alumni Services & Quick Actions
              </h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {portalActions.map((action, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {idx === 0 && <UserCheck className="w-6 h-6" />}
                      {idx === 1 && <ShieldCheck className="w-6 h-6" />}
                      {idx === 2 && <Sparkles className="w-6 h-6" />}
                      {idx === 3 && <CreditCard className="w-6 h-6" />}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {action.description}
                    </p>
                  </div>

                  <a
                    href={action.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white font-semibold rounded-xl text-xs transition-all"
                  >
                    <span>{action.btnText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Official Key Stats Bar */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {alumniStats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                    {i === 0 && <Users className="w-6 h-6" />}
                    {i === 1 && <Globe className="w-6 h-6" />}
                    {i === 2 && <Briefcase className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {stat.label}
                    </h3>
                    <p className="text-xs text-slate-600">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GBUAA Executive Committee */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                GBUAA Executive Committee
              </h2>
              <div className="w-24 h-1 bg-blue-500 mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {executiveCommittee.map((exec, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-600 bg-slate-100 shrink-0 shadow-sm">
                        <img
                          src={exec.image}
                          alt={exec.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/150?text=GBUAA";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {exec.name}
                        </h3>
                        <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block mt-1">
                          {exec.post}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed border-l-2 border-blue-500 pl-3 italic">
                      "{exec.desc}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">
                      Executive Officer
                    </span>
                    {exec.linkedInUrl && (
                      <a
                        href={exec.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Distinguished & Notable Alumni */}
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Distinguished Alumni
              </h2>

              {/* Search input */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search alumni name or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAlumni.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-600 bg-slate-100 shrink-0 shadow-sm">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/150?text=Alumni";
                          }}
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-base font-bold text-slate-900 truncate">
                          {item.name}
                        </h3>
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md inline-block mt-1">
                          Batch: {item.year}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase">
                      Distinguished Alumnus
                    </span>
                    <a
                      href={item.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>View LinkedIn</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GBUAA Official Contact Information Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-100 shadow-md hover:shadow-lg transition-all space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900">
              GBUAA Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold mb-0.5">Official Email</div>
                  <a
                    href={`mailto:${officialContactInfo.email}`}
                    className="font-bold text-blue-600 text-sm hover:underline"
                  >
                    {officialContactInfo.email}
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold mb-0.5">Helpline Phone</div>
                  <a
                    href={`tel:${officialContactInfo.phone}`}
                    className="font-bold text-slate-900 text-sm hover:underline"
                  >
                    {officialContactInfo.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-semibold mb-0.5">Office Address</div>
                  <span className="font-medium text-slate-700 text-xs leading-relaxed block">
                    {officialContactInfo.address}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </SearchableWrapper>
  );
}
