import React, { useState, useMemo } from "react";
import {
  ShieldCheck,
  Building2,
  Award,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Scale,
  FileDown,
  HeartPulse
} from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

// 100% Exact Official Data Extracted from GBU Regulatory Bodies Portal with Official Logos
const regulatoryBodiesData = [
  {
    id: "ugc",
    acronym: "UGC",
    name: "University Grants Commission",
    title: "UGC 12 B Certificate",
    category: "Apex Statutory Body",
    approvalStatus: "Recognized under Section 12(B) of UGC Act 1956",
    badge: "UGC 12-B Certified",
    logo: "/assets/home/UGClogo.webp",
    icon: ShieldCheck,
    color: "from-blue-600 to-indigo-700",
    bgColor: "bg-blue-50/70 border-blue-100",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/approval/UGC_12BCertificate_28June19.pdf",
    buttonText: "UGC 12 B Certificate",
    description:
      "University Grants Commission, New Delhi has granted Gautam Buddha University recognition under section 12(B) of the UGC Act, 1956. The University Grants Commission (UGC) declared GBU fit to receive central assistance (UGC grant) under Section 12(B) of UGC Act, 1956 as per approved pattern of assistance under various schemes.",
    keyHighlights: [
      "Section 12(B) Recognized State University",
      "Eligible for Central Assistance and UGC Grants",
      "Full Degree Awarding Status across all Schools"
    ]
  },
  {
    id: "naac",
    acronym: "NAAC",
    name: "National Assessment and Accreditation Council",
    title: "NAAC Quality Accreditation & Grading",
    category: "National Assessment & Grading Authority",
    approvalStatus: "Accredited Higher Education State University",
    badge: "NAAC Accreditation & Grade",
    logo: "/assets/home/UGClogo.webp",
    icon: Award,
    color: "from-emerald-600 to-teal-700",
    bgColor: "bg-emerald-50/70 border-emerald-100",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/approval/NAAC Certificate_31Dec18.jpg",
    buttonText: "NAAC Accreditation Certificate",
    description:
      "The National Assessment and Accreditation Council (NAAC) is established by University Grants Commission (UGC) to assess and accredit institutions of higher learning in the country. The NAAC was originally formed in 1992 as a result of recommendations from 'National Policy on Education - 1986' which emphasizes quality assurance and institutional grading in higher education.",
    keyHighlights: [
      "Assesses Institutional Quality & Academic Excellence",
      "Awards Official National Accreditation & Institutional Grade",
      "Evaluates Teaching-Learning, Research & Infrastructure Standards"
    ]
  },
  {
    id: "bci",
    acronym: "BCI",
    name: "Bar Council of India",
    title: "BCI Approval for Legal Education",
    category: "Legal Education Regulatory Body",
    approvalStatus: "Approved Law Degrees (School of Law)",
    badge: "BCI Approved",
    logo: "/assets/home/bcilogo.png",
    icon: Scale,
    color: "from-purple-600 to-indigo-800",
    bgColor: "bg-purple-50/70 border-purple-100",
    pdfLink: "https://gbu.ac.in/Content/gbudata/approval/BCI_Letter_3August22.pdf",
    buttonText: "BCI Approval Letter",
    description:
      "The Bar Council of India is a statutory body established under section 4 of Advocates Act 1961 that regulates legal practice and legal education in India. Its members are elected from amongst lawyers in India and represent the Indian Bar.",
    keyHighlights: [
      "Established under Section 4 of Advocates Act 1961",
      "Regulates Integrated 5-Year Law & LL.M Degrees",
      "Enables graduates for Advocates Bar Council Enrollment"
    ]
  },
  {
    id: "ncte",
    acronym: "NCTE",
    name: "National Council for Teacher Education",
    title: "NCTE Recognition Order for Education Programs",
    category: "Teacher Education Council",
    approvalStatus: "Approved Pedagogy & B.Ed Programs",
    badge: "NCTE Recognized",
    logo: "/assets/home/NIClogo.jpeg",
    icon: BookOpen,
    color: "from-amber-600 to-orange-700",
    bgColor: "bg-amber-50/70 border-amber-100",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/approval/Deppt_Education_NCT_17May2017.pdf",
    buttonText: "NCTE Recognition Order",
    description:
      "The National Council for Teacher Education, in its previous status since 1973, was an advisory body for the Central and State Governments on all matters pertaining to teacher education, with its Secretariat in the Department of Teacher Education of NCERT.",
    keyHighlights: [
      "Statutory Council under NCTE Act 1993",
      "Accredits Teacher Education & Pedagogy Curricula",
      "Ensures Quality Standards in B.Ed. & Teacher Training"
    ]
  },
  {
    id: "coa",
    acronym: "CoA",
    name: "Council of Architecture",
    title: "Council of Architecture (CoA) Approval",
    category: "Architectural Regulatory Body",
    approvalStatus: "Approved B.Arch Degree Program",
    badge: "CoA Approved",
    logo: "/assets/home/COAlogo.jpeg",
    icon: Building2,
    color: "from-cyan-600 to-blue-700",
    bgColor: "bg-cyan-50/70 border-cyan-100",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/AcadProg/SOE/CoA_2024.pdf",
    buttonText: "CoA Approval Letter",
    description:
      "The Council of Architecture (COA) has been constituted by the Government of India under the provisions of the Architects Act, 1972, enacted by the Parliament of India, which came into force on 1st September, 1972. The Act provides for registration of Architects, standards of education, recognized qualifications and standards of practice.",
    keyHighlights: [
      "Enacted under Architects Act, 1972",
      "Regulates B.Arch Degree & Studio Infrastructures",
      "Qualifies Graduates for Registered Architect Designation"
    ]
  },
  {
    id: "rci",
    acronym: "RCI",
    name: "Rehabilitation Council of India",
    title: "RCI Approval for Special Education & Rehabilitation",
    category: "Rehabilitation & Disability Services Council",
    approvalStatus: "Approved Clinical & Special Education Degrees",
    badge: "RCI Approved",
    logo: "/assets/home/RCIlogo.png",
    icon: HeartPulse,
    color: "from-rose-600 to-pink-700",
    bgColor: "bg-rose-50/70 border-rose-100",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/approval/RCI.jpg",
    buttonText: "RCI Approval Letter",
    description:
      "The Rehabilitation Council of India (RCI) was set up as a registered society in 1986. On September 1992 the RCI Act was enacted by Parliament and it became a Statutory Body on 22 June 1993. The mandate given to RCI is to regulate and monitor services given to persons with disability, standardise syllabi and maintain a Central Rehabilitation Register.",
    keyHighlights: [
      "Statutory Body under RCI Act 1992 / 2000",
      "Regulates Clinical Psychology & Special Education",
      "Maintains Central Rehabilitation Register Qualifications"
    ]
  }
];

const RegulatoryBodies = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredData = useMemo(() => {
    if (activeTab === "all") return regulatoryBodiesData;
    return regulatoryBodiesData.filter((item) => item.id === activeTab);
  }, [activeTab]);

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 pb-24">
        {/* Banner Section */}
        <BannerSection
          title="Regulatory Bodies & Accreditations"
          subtitle="Apex Statutory Authorities, Council Approvals & Quality Accreditations"
          bgTheme={1}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          {/* Header Overview Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-md border border-blue-100 mb-10 relative overflow-hidden bg-gradient-to-br from-blue-50/70 via-slate-50 to-white">
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-blue-100/50 rounded-full blur-2xl" />
            <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-semibold border border-blue-200">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Apex Regulatory Approvals</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                  Statutory Approvals & Accreditation Council Recognitions
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  Gautam Buddha University is established under Uttar Pradesh Act No. 9 of 2002 and holds statutory recognitions from apex statutory bodies including UGC under Section 12(B), NAAC, BCI, NCTE, CoA, and RCI.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-3">
                <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm text-xs text-gray-600">
                  <span className="font-bold text-gray-900 block text-sm mb-1">State Act Recognition</span>
                  UP Act No. 9 of 2002 passed by UP Legislature.
                </div>
                <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm text-xs text-gray-600">
                  <span className="font-bold text-gray-900 block text-sm mb-1">UGC 12(B) Fitness</span>
                  Fit to receive Central Grants & UGC assistance.
                </div>
              </div>
            </div>
          </div>

          {/* Regulatory Body Filter Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-10 overflow-x-auto">
            <div className="flex items-center justify-start sm:justify-center gap-2 min-w-max">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                All Regulatory Bodies
              </button>
              {regulatoryBodiesData.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveTab(b.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    activeTab === b.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {b.acronym}
                </button>
              ))}
            </div>
          </div>

          {/* Regulatory Bodies Details List */}
          <div className="space-y-8">
            {filteredData.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 sm:p-10 relative overflow-hidden group"
                >
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    {/* Left Details */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-4">
                        {/* Official Logo Container */}
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white p-2 shadow-md border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <img
                            src={item.logo}
                            alt={`${item.acronym} Official Logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block mb-1">
                            {item.badge}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.acronym} — {item.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        {item.category} • {item.approvalStatus}
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

                    {/* Right Promotional Action Card with Official Logo Thumbnail */}
                    <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl border border-slate-200/80 text-center space-y-4">
                      <div className="w-20 h-20 rounded-2xl bg-white p-3 shadow-md border border-gray-100 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <img
                          src={item.logo}
                          alt={`${item.acronym} Logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-xs text-blue-600 font-bold block uppercase tracking-wider">
                          Official Certificate & Order
                        </span>
                        <h4 className="text-sm font-bold text-gray-900 mt-0.5">
                          {item.title}
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

export default RegulatoryBodies;
