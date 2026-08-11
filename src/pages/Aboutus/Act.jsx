import React from "react";
import {
  FileText,
  FileDown,
  ExternalLink,
  Shield,
  Scale,
  Award,
  CheckCircle2,
  BookMarked,
  Building2
} from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const actData = [
  {
    id: "gbu-act-2002",
    title: "Gautam Buddha University Act, 2002",
    subtitle: "U.P. Act No. 9 of 2002",
    badge: "Primary Legislation",
    icon: Scale,
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50/70 border-blue-100",
    description:
      "Under Article 200 of the Constitution of India, The Governor approved Uttar Pradesh Gautam Buddha University Bill, 2002, passed by the Uttar Pradesh Legislature on 5 September 2002. Enacted in the 53rd year of the Republic of India, this foundational Act establishes Gautam Buddha University as a premier state university.",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/Programfiles/Act_10Jan18.pdf",
    buttonText: "Read Gautam Buddha University Act",
    keyHighlights: [
      "Passed by UP Legislature on 5th September 2002",
      "Enacted under Article 200 of the Constitution of India",
      "Empowers degree awarding status under UGC Act 1956"
    ]
  },
  {
    id: "amended-act-2013",
    title: "GBU Amendment Act / Ordinance, 2013",
    subtitle: "Uttar Pradesh Amendment Ordinance 2013",
    badge: "Legislative Amendment",
    icon: Shield,
    color: "from-indigo-600 to-purple-700",
    bgColor: "bg-indigo-50/70 border-indigo-100",
    description:
      "Promulgated by the Governor of Uttar Pradesh under clause (1) of Article 213 of the Constitution of India. This Amendment Ordinance enacts strategic updates to governance structures, administrative frameworks, and statutory authority of the university.",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/Programfiles/AmendedAct_10Jan18.pdf",
    buttonText: "Read Gautam Buddha University (Amendment) Act",
    keyHighlights: [
      "Promulgated under Article 213(1) of the Constitution",
      "Revises statutory authorities and governance councils",
      "Enhances institutional autonomy & operational guidelines"
    ]
  },
  {
    id: "gbu-statute-2007",
    title: "Gautam Buddha University First Statutes, 2007",
    subtitle: "Statutory Framework under Section 24",
    badge: "First Statutes",
    icon: BookMarked,
    color: "from-blue-700 to-cyan-700",
    bgColor: "bg-cyan-50/70 border-cyan-100",
    description:
      "In pursuance of provisions of section 24 of the Uttar Pradesh Gautam Buddha University Act 2002 (U.P. Act No. 9 of 2002), the Gautam Buddha Education Society enacted 'The Uttar Pradesh's First Statutes, 2007', defining official roles, appointments, and board powers.",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/Programfiles/Statute_10Jan18.pdf",
    buttonText: "Read Gautam Buddha University Statute",
    keyHighlights: [
      "Enacted pursuant to Section 24 of UP Act No. 9 of 2002",
      "Defines powers of Chancellor, Vice Chancellor & Deans",
      "Outlines faculty appointment rules & administrative cadre"
    ]
  },
  {
    id: "approved-ordinance",
    title: "GBU Approved First Amended Ordinance",
    subtitle: "Administrative & Service Regulations",
    badge: "Service Regulations",
    icon: FileText,
    color: "from-slate-700 to-blue-900",
    bgColor: "bg-slate-50 border-slate-200",
    description:
      "Compilation of the first amended Ordinances providing detailed operational rules for Schools of Studies, Academic Council, International Students Affairs, fee structures, employee conduct rules, leave rules, and service regulations for existing employees.",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/Programfiles/ApprovedOrdinance_10Jan18.pdf",
    buttonText: "Read Approved Ordinance",
    keyHighlights: [
      "Governs Schools of Studies & Academic Council norms",
      "Defines international student admissions & fee schedules",
      "Details employee conduct & service regulations"
    ]
  },
  {
    id: "academic-ordinance",
    title: "GBU Academic Ordinance",
    subtitle: "Academic Regulations & Evaluation Norms",
    badge: "Academic Guidelines",
    icon: Award,
    color: "from-sky-600 to-blue-800",
    bgColor: "bg-sky-50/70 border-sky-100",
    description:
      "Comprehensive regulatory code governing academic programs, Choice Based Credit System (CBCS), examination schemes, continuous evaluation, attendance requirements, and degree award criteria across all undergraduate, postgraduate, and doctoral studies.",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/Programfiles/academic_Odinance.pdf",
    buttonText: "Read Academic Ordinance",
    keyHighlights: [
      "Sets credit framework for UG, PG & Ph.D. degrees",
      "Establishes grading policy & examination guidelines",
      "Outlines attendance minimums & academic discipline"
    ]
  }
];

const Act = () => {
  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 pb-24">
        {/* Banner Section */}
        <BannerSection
          title="GBU Act, Statute and Ordinance"
          subtitle="Constitutional Framework, Enactments, Statutes & University Ordinances"
          bgTheme={1}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Legislative Overview Banner Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-md border border-blue-100 mb-12 relative overflow-hidden bg-gradient-to-br from-blue-50/70 via-slate-50 to-white">
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-blue-100/50 rounded-full blur-2xl" />
            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold border border-blue-200">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>State University Governance</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  Legal & Statutory Foundation of Gautam Buddha University
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Established by the Government of Uttar Pradesh under UP Act No. 9 of 2002, Gautam Buddha University functions under statutory Acts, Statutes, and Ordinances approved by the Governor of Uttar Pradesh and the University Executive Authorities.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm text-xs text-gray-600">
                  <span className="font-bold text-gray-900 block text-sm mb-1">State Act No. 9 of 2002</span>
                  Passed by UP Legislature & Approved by Hon'ble Governor of UP.
                </div>
                <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm text-xs text-gray-600">
                  <span className="font-bold text-gray-900 block text-sm mb-1">UGC 12-B Recognition</span>
                  Empowered under Section 22 of the UGC Act, 1956.
                </div>
              </div>
            </div>
          </div>

          {/* Acts & Statutes List */}
          <div className="space-y-8">
            {actData.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 sm:p-10 relative overflow-hidden group"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Left Icon & Header */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <div
                          className={`p-3 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-md shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block mb-1">
                            {item.badge}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {item.subtitle}
                      </p>

                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Highlights */}
                      <div className="grid sm:grid-cols-3 gap-3 pt-2">
                        {item.keyHighlights.map((hl, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-2 text-xs text-gray-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Download Button Section */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50/80 rounded-2xl border border-slate-100 text-center space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <FileDown className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 font-semibold block uppercase tracking-wider">
                          Official PDF Document
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 mt-0.5">
                          Download & Read PDF
                        </h4>
                      </div>
                      <a
                        href={item.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold rounded-xl text-xs transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <span>{item.buttonText}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default Act;
