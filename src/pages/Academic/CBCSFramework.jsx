import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Sliders,
  Zap,
  Award,
  ShieldCheck
} from 'lucide-react';

import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

// Minimal academic dataset representing GBU's Choice Based Credit System (CBCS)
const GBU_CBCS_HERO = {
  title: "Choice Based Credit System (CBCS)",
  description: "Gautam Buddha University adopts the Choice Based Credit System (CBCS) to offer students a flexible, multidisciplinary academic framework, empowering learners to customize their educational journey.",
  bgTheme: 7
};

const GBU_CBCS_WHAT = [
  {
    id: "core",
    card_title: "Core Courses",
    card_desc: "Mandatory foundation subjects in the primary discipline ensuring depth of subject matter mastery required for the degree program.",
    icon: BookOpen,
    tag: "Mandatory"
  },
  {
    id: "elective",
    card_title: "Elective Courses",
    card_desc: "Flexible choices from within or outside the department, allowing students to specialize in niche areas or explore lateral domains.",
    icon: Sliders,
    tag: "Flexible"
  },
  {
    id: "ability",
    card_title: "Ability Enhancement",
    card_desc: "Skill-oriented courses including communication skills, environmental science, and technical applications designed to boost employability.",
    icon: Zap,
    tag: "Skill-Based"
  },
  {
    id: "credit",
    card_title: "Credit Accumulation",
    card_desc: "Students earn credits based on continuous evaluation of lectures, tutorials, and practical work (L-T-P structure) for credit transfer.",
    icon: Award,
    tag: "Standardized"
  }
];

const GBU_CBCS_GRADING = [
  { grade: "O", points: 10, percentage_range: "91% - 100%", description: "Outstanding", status: "Pass" },
  { grade: "A+", points: 9, percentage_range: "81% - 90%", description: "Excellent", status: "Pass" },
  { grade: "A", points: 8, percentage_range: "71% - 80%", description: "Very Good", status: "Pass" },
  { grade: "B+", points: 7, percentage_range: "61% - 70%", description: "Good", status: "Pass" },
  { grade: "B", points: 6, percentage_range: "51% - 60%", description: "Above Average", status: "Pass" },
  { grade: "C", points: 5, percentage_range: "41% - 50%", description: "Average", status: "Pass" },
  { grade: "P", points: 4, percentage_range: "40%", description: "Pass", status: "Pass" },
  { grade: "F", points: 0, percentage_range: "< 40%", description: "Fail", status: "Fail" },
  { grade: "Ab", points: 0, percentage_range: "Absent", description: "Absent", status: "Fail" }
];

const GBU_CBCS_BENEFITS = [
  {
    title: "Student-Centric Learning",
    desc: "Allows students to choose interdisciplinary, intra-disciplinary, and skill-based courses tailored to their personal capabilities and career aspirations."
  },
  {
    title: "Customizable Academic Pace",
    desc: "Promotes modern pedagogy where learners can design their own curriculum combinations and pace their study schedule."
  },
  {
    title: "Global Evaluation Standard",
    desc: "Standardized 10-point grading system aligned with UGC guidelines makes it seamless for international institutions and employers to assess academic achievements."
  },
  {
    title: "Inter-Departmental Mobility",
    desc: "Enables frictionless credit transfer across different departments and schools within Gautam Buddha University."
  },
  {
    title: "Enhanced Employability",
    desc: "Equips students with core discipline expertise alongside practical skill development and interdisciplinary knowledge."
  },
  {
    title: "International Compatibility",
    desc: "Facilitates global academic mobility as the semester credit system matches European and North American credit transfer norms (ECTS)."
  }
];

const CBCSFramework = () => {
  const [heroData] = useState(GBU_CBCS_HERO);
  const [whatData] = useState(GBU_CBCS_WHAT);
  const [grading] = useState(GBU_CBCS_GRADING);
  const [benefits] = useState(GBU_CBCS_BENEFITS);

  return (
    <SearchableWrapper>
      <div className="bg-slate-50/50 min-h-screen text-slate-800 selection:bg-blue-100 selection:text-blue-900 pb-12 sm:pb-16">
        {/* Hero Banner */}
        <BannerSection
          title={heroData.title}
          subtitle={heroData.description}
          bgTheme={heroData.bgTheme || 7}
        />

        {/* What is CBCS Section */}
        <section className="pt-6 pb-10 sm:pt-8 sm:pb-14 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-2 border border-blue-200/60">
              Curriculum Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Understanding CBCS Structure
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
              The Choice Based Credit System (CBCS) provides a modular &lsquo;cafeteria&rsquo; approach in higher education, enabling students to choose courses according to their learning goals, aptitude, and career path.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {whatData.map((item) => {
              const CardIcon = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200/60">
                        <CardIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/50">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.card_title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.card_desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 10-Point Grading System Section */}
        <section className="py-8 sm:py-12 bg-white border-y border-slate-200/70 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2 border border-emerald-200/60">
                Evaluation Scheme
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                10-Point Grading Scale
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Transparent and continuous assessment criteria standardized in accordance with UGC guidelines.
              </p>
            </div>

            {/* Mobile Card View (< sm) */}
            <div className="sm:hidden space-y-2.5">
              {grading.map((grade, index) => (
                <div 
                  key={index} 
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                    grade.status === 'Fail' 
                      ? 'bg-rose-50/40 border-rose-200/70' 
                      : 'bg-white border-slate-200/90 shadow-xs'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="inline-flex items-center justify-center w-10 h-10 text-sm font-bold font-mono text-slate-900 bg-slate-100 border border-slate-200 rounded-lg shrink-0">
                      {grade.grade}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900 truncate">{grade.description}</span>
                        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/80 font-mono shrink-0">
                          {grade.points} Pts
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-mono mt-0.5">
                        Range: <span className="font-semibold text-slate-700">{grade.percentage_range}</span>
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 ml-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                      grade.status === 'Fail' 
                        ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                        : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${grade.status === 'Fail' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                      {grade.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (hidden on mobile < sm) */}
            <div className="hidden sm:block overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs uppercase tracking-wider font-semibold">
                    <th className="py-3.5 px-4 sm:px-6">Letter Grade</th>
                    <th className="py-3.5 px-4 text-center">Grade Point</th>
                    <th className="py-3.5 px-4">Marks Range</th>
                    <th className="py-3.5 px-4">Description</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {grading.map((grade, index) => (
                    <tr
                      key={index}
                      className={`transition-colors hover:bg-slate-50/80 ${grade.status === 'Fail' ? 'bg-rose-50/20' : index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                        }`}
                    >
                      <td className="py-3 px-4 sm:px-6 font-medium">
                        <span className="inline-flex items-center justify-center min-w-[36px] px-2.5 py-1 text-xs font-bold font-mono text-slate-900 bg-slate-100 border border-slate-200 rounded">
                          {grade.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-blue-700 font-mono text-sm sm:text-base">
                        {grade.points}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-600 text-xs sm:text-sm">
                        {grade.percentage_range}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {grade.description}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${grade.status === 'Fail'
                          ? 'bg-rose-100 text-rose-700 border border-rose-200/80'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200/80'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${grade.status === 'Fail' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                          {grade.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-slate-400 inline" />
                <span>UGC Compliant 10-Point Absolute & Relative Grading Scheme</span>
              </span>
            </div>
          </div>
        </section>

        {/* Key Benefits of CBCS */}
        <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-6 sm:mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 mb-2 border border-indigo-200/60">
              Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Benefits of Choice Based Credit System
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {benefits.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200"
              >
                <div className="flex items-start space-x-3.5">
                  <div className="p-1 rounded-full bg-emerald-50 text-emerald-600 mt-0.5 shrink-0 border border-emerald-100">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SearchableWrapper>
  );
};

export default CBCSFramework;


