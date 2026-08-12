import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileText, Download, ExternalLink, Award, BookOpen, GraduationCap, Building2, ShieldCheck, Sparkles } from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import ButtonGroup from "../../components/TabsData.jsx";

const ViceChancellor = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabs = ['Overview', 'Education_Career', 'Leadership_Roles', 'Research_Awards', 'Vision'];

  const tabContent = {
    Overview: {
      title: "Executive Summary & Profile",
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify">
            Prof. Rana Pratap Singh is an eminent academic leader, researcher, and Vice-Chancellor of Gautam Buddha University. With over three decades of distinguished service in higher education and cancer research, he previously served as Rector / Pro-Vice-Chancellor, Dean of Students, and Chairperson of the Special Centre for Systems Medicine at Jawaharlal Nehru University (JNU), New Delhi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-1">
                <Building2 className="w-4 h-4" />
                Global Academic Positions
              </div>
              <p className="text-xs text-gray-600">
                Visiting Professor at Johns Hopkins University (USA), Adjunct Professor at University of Colorado (USA), and former Visiting Scientist at UC Riverside (USA).
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-1">
                <BookOpen className="w-4 h-4" />
                Research Impact & Citations
              </div>
              <p className="text-xs text-gray-600">
                193+ Publications with over 16,000+ citations, h-index of 77, and i10-index of 153. Over 90 research papers in high-impact journals (IF &gt; 5.0).
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://www.gbu.ac.in/Content/about/VC%20Profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
            <a
              href="https://rpscancerlab.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-slate-300 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-teal-600" />
              <span>Visit RPS Cancer Lab</span>
            </a>
          </div>
        </div>
      )
    },
    Education_Career: {
      title: "Educational Qualifications & International Career",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-teal-600" />
              Academic Degrees
            </h4>
            <div className="space-y-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-gray-900 text-sm">Ph.D. in Life Sciences / Cancer Biology</h5>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">2000</span>
                </div>
                <p className="text-xs text-gray-600">Jawaharlal Nehru University (JNU), New Delhi, India</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-gray-900 text-sm">M.Sc. in Life Sciences (All India Rank 1)</h5>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">1993</span>
                </div>
                <p className="text-xs text-gray-600">Jawaharlal Nehru University (JNU), New Delhi, India</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-gray-900 text-sm">B.Sc. (Zoology, Botany, Chemistry)</h5>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">1990</span>
                </div>
                <p className="text-xs text-gray-600">Ewing Christian College, University of Allahabad, U.P., India</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              Key International & Academic Appointments
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>Visiting Professor (2024–2025):</strong> Johns Hopkins University, Baltimore, MD, USA.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>Adjunct Professor (2023–Present):</strong> Skaggs School of Pharmacy & Pharmaceutical Sciences, University of Colorado, Aurora, USA.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>Concurrent Professor (2021–2024):</strong> Special Centre for Systems Medicine, JNU, New Delhi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>Professor of Cancer Biology (2012–Present):</strong> School of Life Sciences, JNU, New Delhi.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>Visiting Scientist (2014):</strong> University of California Riverside, CA, USA.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>Research Faculty & Post-Doc (2000–2006):</strong> University of Colorado Denver & AMC Cancer Research Center, USA.</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    Leadership_Roles: {
      title: "Academic Governance & Administrative Leadership",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              University Leadership Positions
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-purple-50/70 p-3.5 rounded-xl border border-purple-100">
                <h5 className="font-bold text-purple-900 text-sm">Rector / Pro-Vice Chancellor</h5>
                <p className="text-xs text-purple-800">Jawaharlal Nehru University (JNU), New Delhi (2017–2022)</p>
              </div>
              <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100">
                <h5 className="font-bold text-blue-900 text-sm">President, IIC-JNU</h5>
                <p className="text-xs text-blue-800">Institutional Innovation Council, JNU (2019–2022)</p>
              </div>
              <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100">
                <h5 className="font-bold text-emerald-900 text-sm">Chairperson, Systems Medicine</h5>
                <p className="text-xs text-emerald-800">Special Centre for Systems Medicine, JNU (2021–2022)</p>
              </div>
              <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-100">
                <h5 className="font-bold text-amber-900 text-sm">Dean of Students</h5>
                <p className="text-xs text-amber-800">Jawaharlal Nehru University, New Delhi (2016–2017)</p>
              </div>
              <div className="bg-teal-50/70 p-3.5 rounded-xl border border-teal-100 sm:col-span-2">
                <h5 className="font-bold text-teal-900 text-sm">Dean of Students' Welfare & Founding School Dean</h5>
                <p className="text-xs text-teal-800">Central University of Gujarat (CUG), Gandhinagar (2010–2012)</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-600" />
              National Policy & Expert Advisory Committees
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>Co-Chair, DBT Technical Expert Committee:</strong> Cancer Disease Biology, Dept. of Biotechnology, Govt. of India (2022–2025).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>Co-Chairman, DRDO LSRB Panel:</strong> Physiology of Extreme Environment & Behavioural Sciences, DRDO, Govt. of India.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>UGC Expert Committee Member:</strong> Formulation of UGC Regulations-2018 for teacher appointments and NEP-2020 execution.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                <span><strong>Board Member SERB:</strong> Department of Science and Technology (DST), Govt. of India (2018–2021).</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    Research_Awards: {
      title: "Research Contributions, Publications & Honors",
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-teal-50 p-3 rounded-xl border border-teal-100">
              <p className="text-xl sm:text-2xl font-black text-teal-800">193+</p>
              <p className="text-[11px] text-teal-700 font-semibold">Publications</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
              <p className="text-xl sm:text-2xl font-black text-blue-800">16,000+</p>
              <p className="text-[11px] text-blue-700 font-semibold">Citations</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl border border-purple-100">
              <p className="text-xl sm:text-2xl font-black text-purple-800">77</p>
              <p className="text-[11px] text-purple-700 font-semibold">h-index</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-xl border border-amber-100">
              <p className="text-xl sm:text-2xl font-black text-amber-800">90+</p>
              <p className="text-[11px] text-amber-700 font-semibold">IF &gt; 5.0 Papers</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Major Awards & International Fellowships
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-gray-700">
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900">DHR-ICMR International Fellowship (2023–24):</span>
                <span className="text-gray-700"> Senior Biomedical Scientist Award at Johns Hopkins University, Baltimore, USA.</span>
              </div>
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-900">Indo-US Science Technology Forum (IUSSTF) 2019 Award:</span>
                <span className="text-gray-700"> Established Virtual Networked Centre for Integrative Cancer Biology with Stanford University & OHSU, USA.</span>
              </div>
              <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900">ICMR International Fellowship (2013–14):</span>
                <span className="text-gray-700"> Young Biomedical Scientist Award at University of California Riverside, USA.</span>
              </div>
              <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-200">
                <span className="font-bold text-purple-900">U.S. Dept. of Defense Post-doctoral Award (2003–05):</span>
                <span className="text-gray-700"> U.S. Army Medical Research Command Post-doctoral Trainee Award for Prostate Cancer Research.</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    Vision: {
      title: "Strategic Vision & Institutional Mandate",
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify">
            Under the guidance of Hon'ble Chancellor Shri Yogi Adityanath Ji, Gautam Buddha University is dedicated to achieving international benchmarks in quality, innovation, and holistic education.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
              <h5 className="font-bold text-teal-900 text-sm mb-1">Academic Innovation</h5>
              <p className="text-xs text-teal-800">Integrating 4IR disciplines like AI, Robotics, Data Science, and Biotech with holistic learning.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h5 className="font-bold text-blue-900 text-sm mb-1">Global Research Partnerships</h5>
              <p className="text-xs text-blue-800">Fostering high-impact collaborative research networks with leading world universities.</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <h5 className="font-bold text-amber-900 text-sm mb-1">Ethical & National Ethos</h5>
              <p className="text-xs text-amber-800">Blending modern scientific advancement with ancient wisdom, Buddhist philosophy, and moral values.</p>
            </div>
          </div>
        </div>
      )
    }
  };

  const tabButtons = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Education_Career', label: 'Education & Career' },
    { id: 'Leadership_Roles', label: 'Leadership Roles' },
    { id: 'Research_Awards', label: 'Research & Awards' },
    { id: 'Vision', label: 'Vision' }
  ];

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50">
        {/* Hero Banner */}
        <BannerSection
          title="Vice-Chancellor's Message"
          subtitle="Academic Leadership, Innovation, and Vision"
          bgTheme={4}
        />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">

          {/* Top Profile & Message Box */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-stretch mb-8 sm:mb-12">
            {/* Vice Chancellor Card */}
            <div className="w-full lg:w-1/3 shrink-0 flex flex-col">
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-slate-200 text-center h-full flex flex-col justify-between">
                <div>
                  <div className="w-full max-w-[220px] sm:max-w-[260px] h-[260px] sm:h-[320px] mx-auto mb-3.5 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden shadow-md ring-4 ring-teal-500/15 border border-teal-500/20">
                    <img
                      src="/assets/prof.jpeg"
                      alt="Prof. Rana Pratap Singh"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <span className="inline-block bg-teal-50 text-teal-800 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-teal-100 mb-1.5">
                    Executive Leadership
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">Prof. Rana Pratap Singh</h3>
                  <p className="text-xs sm:text-sm font-semibold text-teal-700 mt-1">Vice-Chancellor</p>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium">Gautam Buddha University</p>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 italic">Ph.D. (JNU), F-ICMR, F-DHR</p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 space-y-2 sm:space-y-2.5 text-left">
                  <div className="bg-slate-50 p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-200/80 flex items-center gap-2 sm:gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-teal-600 shrink-0"></div>
                    <span className="text-[11px] sm:text-xs text-slate-700 font-semibold">30+ Years Academic & Research Leadership</span>
                  </div>
                  <div className="bg-slate-50 p-2 sm:p-2.5 rounded-lg border border-slate-200/80 flex items-center gap-2 sm:gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>
                    <span className="text-[11px] sm:text-xs text-slate-700 font-medium">Former Rector / Pro-VC, JNU New Delhi</span>
                  </div>
                  <div className="bg-slate-50 p-2 sm:p-2.5 rounded-lg border border-slate-200/80 flex items-center gap-2 sm:gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></div>
                    <span className="text-[11px] sm:text-xs text-slate-700 font-medium">Visiting Professor, Johns Hopkins Univ., USA</span>
                  </div>
                  <div className="bg-slate-50 p-2 sm:p-2.5 rounded-lg border border-slate-200/80 flex items-center gap-2 sm:gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-600 shrink-0"></div>
                    <span className="text-[11px] sm:text-xs text-slate-700 font-medium">193+ Publications & 16,000+ Citations (h-index 77)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Narrative */}
            <div className="w-full lg:w-2/3 bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="text-3xl sm:text-4xl text-teal-600 font-serif leading-none mb-2">"</div>
                <div className="space-y-3 sm:space-y-4 text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify">
                  <p>
                    It is a great honour and privilege to work under the able leadership of hon’ble Chief Minister, Shri Yogi Adityanath Ji, the hon’ble Chancellor of Gautam Buddha University.
                  </p>
                  <p>
                    Gautam Buddha University stands as a beacon of knowledge, innovation, and inclusivity, committed to shaping the future of education, research, and societal transformation. Rooted in the values of wisdom, compassion, and excellence, our university fosters an environment where intellectual pursuits align with ethical responsibility and social commitment.
                  </p>
                  <p>
                    In an era marked by rapid technological advancements and evolving global challenges, we strive to equip our students with the skills, creativity, and moral compass necessary to lead with integrity. Our academic ecosystem nurtures a culture of inquiry, critical thinking, and interdisciplinary research, ensuring that our graduates emerge as thought leaders and change-makers who contribute meaningfully to society.
                  </p>
                  <p>
                    With a steadfast focus on holistic development, Gautam Buddha University integrates tradition with modernity, blending the wisdom of ancient knowledge systems with contemporary scientific and technological advancements. We remain dedicated to fostering innovation, entrepreneurship, and sustainable solutions that address societal needs while upholding the values of equity, justice, and inclusivity.
                  </p>
                  <p>
                    As we continue our journey toward becoming a globally recognized university, I invite faculty, students, scholars, and industry leaders to collaborate in our shared mission of academic excellence, cultivation of research and innovation, and transformative impact. Together, let us build a future that is enlightened, empowered, and enduring.
                  </p>
                </div>
                <div className="text-3xl sm:text-4xl text-teal-600 font-serif leading-none text-right mt-1 sm:mt-2">"</div>
              </div>
              <div className="mt-4 sm:mt-6 text-right border-t border-slate-100 pt-3 sm:pt-4">
                <p className="text-sm sm:text-base font-bold text-teal-800">Prof. Rana Pratap Singh</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Vice-Chancellor, Gautam Buddha University</p>
              </div>
            </div>
          </div>

          {/* Know the Vice-Chancellor Section */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 text-slate-800">
              Profile & Leadership Details
            </h2>

            {/* Custom Responsive Tabs (No Truncation) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-center mb-6 max-w-full">
              {tabButtons.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-[#008c95] text-white shadow-md shadow-teal-500/20 scale-[1.02]"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 shadow-sm"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content Panel */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#008c95] shrink-0" />
                {tabContent[activeTab].title}
              </h3>
              <div>
                {tabContent[activeTab].content}
              </div>
            </div>

          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default ViceChancellor;
