import React from "react";
import { useUniversityStats } from "../../hooks/useUniversityStats";
import {
  GraduationCap,
  Star,
  Handshake,
  Trophy,
  Scale,
  User,
  Brain,
  Building2,
  CheckCircle,
  Calendar,
  Medal,
  TreePine,
  Shield,
  Landmark,
  MapPin,
  Wallet,
  BadgeCheck,
} from "lucide-react";
import BannerSection from "../../components/HeroBanner";

// Static class names only, so Tailwind can see them. Solid light tints, no gradients.
const TONES = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100 group-hover:bg-blue-600",
  amber: "bg-amber-50 text-amber-700 ring-amber-100 group-hover:bg-amber-500",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100 group-hover:bg-emerald-600",
  violet: "bg-violet-50 text-violet-700 ring-violet-100 group-hover:bg-violet-600",
  orange: "bg-orange-50 text-orange-700 ring-orange-100 group-hover:bg-orange-500",
};

const IconTile = ({ icon, tone, size = "w-12 h-12", iconSize = "w-6 h-6" }) => {
  const Icon = icon;
  return (
    <div className={`${size} ${TONES[tone]} shrink-0 rounded-xl ring-1 flex items-center justify-center transition-colors duration-300 group-hover:text-white group-hover:ring-transparent`}>
      <Icon className={iconSize} />
    </div>
  );
};

const SectionHeading = ({ title }) => (
  <div className="text-center mb-6 sm:mb-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900">{title}</h2>
    <div className="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
  </div>
);

export default function AboutUsPage() {
  // Campus acreage comes from the shared university-stats source.
  const universityStats = useUniversityStats();

  const recognitions = [
    {
      id: 1,
      title: "UGC Recognition",
      body: "University Grants Commission of India",
      details: "F.9-18/2009 (CRP-I) dated 13 May 2009 under section 2(f) of UGC Act 1956. Empowered to award degrees under section 22 of the UGC Act 1956.",
      icon: GraduationCap,
      tone: "blue"
    },
    {
      id: 2,
      title: "NAAC Accredited",
      body: "B+ Grade Accreditation",
      details: "Recognised under UGC Section 12B and NAAC accredited with B+ Grade, ensuring quality education standards.",
      icon: Star,
      tone: "amber"
    },
    {
      id: 3,
      title: "AIU Membership",
      body: "Association of Indian Universities",
      details: "Granted membership of the Association of Indian Universities, connecting us with premier institutions across India.",
      icon: Handshake,
      tone: "emerald"
    },
    {
      id: 4,
      title: "ISO Certified",
      body: "ISO 9001:2008 Certification",
      details: "Accredited by Joint Accreditation System of Australia & New Zealand (JAS-ANZ), vide 1015QBC26 for quality management.",
      icon: Trophy,
      tone: "violet"
    }
  ];

  const approvals = [
    {
      title: "Bar Council of India",
      program: "5-Year Integrated B.A. LLB Programme",
      school: "School of Law, Justice, & Governance",
      description: "Approved program preparing students for legal practice with comprehensive curriculum.",
      icon: Scale,
      tone: "blue"
    },
    {
      title: "National Council for Teacher Education (NCTE)",
      program: "Two-Year B.Ed. Programme",
      school: "Department of Education & Training, School of Humanities & Social Sciences",
      description: "NCTE recognized program for aspiring educators and teaching professionals.",
      icon: User,
      tone: "emerald"
    },
    {
      title: "Rehabilitation Council of India",
      program: "M.Phil. (Clinical Psychology) - 2 Years Programme",
      school: "Department of Psychology & Mental Health, School of Humanities & Social Sciences",
      description: "Specialized program for clinical psychology professionals and mental health practitioners.",
      icon: Brain,
      tone: "violet"
    },
    {
      title: "Council of Architecture, India",
      program: "B.Arch. and M.Arch. Programmes in Architecture and Planning",
      school: "Department of Architecture & Planning, School of Engineering",
      description: "Professional architecture programs approved for practice and higher studies.",
      icon: Building2,
      tone: "orange"
    }
  ];

  const stats = [
    { value: universityStats.acres_campus, label: "Acres of Green Campus", icon: TreePine, tone: "emerald" },
    { value: "18+", label: "Years of Academic Excellence", icon: Calendar, tone: "blue" },
    { value: "B+", label: "NAAC Accreditation", icon: Medal, tone: "amber" },
    { value: "4+", label: "Statutory Approvals", icon: Shield, tone: "violet" },
  ];

  // The overview's key facts at a glance (all taken from the text below them).
  const keyFacts = [
    { label: "Established", value: "Uttar Pradesh Act (9) of 2002", icon: Landmark },
    { label: "First academic session", value: "August 2008", icon: Calendar },
    { label: "Campus", value: `${universityStats.acres_campus} acres, Greater Noida`, icon: MapPin },
    { label: "Funded by", value: "NOIDA & Greater Noida Authority (GNIDA)", icon: Wallet },
    { label: "Recognition", value: "UGC 2(f) & 12B, AIU member", icon: BadgeCheck },
  ];

  return (
    <div className="min-h-screen bg-white">
      <BannerSection
        title="Gautam Buddha University"
        subtitle="A Journey of Excellence in Education"
        bgTheme={11}
      />

      {/* Key numbers: one strip overlapping the banner's lower edge, thin dividers between the cells */}
      <section className="relative z-10 -mt-4 sm:-mt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-md">
            {stats.map((stat) => (
              // Phones: icon above the number, so the label gets the full cell width
              <div key={stat.label} className="group flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-4 bg-white p-4 sm:p-5 transition-colors duration-300 hover:bg-slate-50">
                <IconTile icon={stat.icon} tone={stat.tone} size="w-10 h-10 sm:w-12 sm:h-12" iconSize="w-5 h-5 sm:w-6 sm:h-6" />
                <div className="min-w-0">
                  <div className="text-2xl sm:text-3xl font-extrabold leading-none tracking-tight text-blue-900">{stat.value}</div>
                  <div className="mt-1.5 text-xs sm:text-sm font-medium leading-snug text-slate-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Overview: the story on the left, key facts beside it */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="About the University" />
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* justify-all: these paragraphs are justified (see index.css); short card text below stays left-aligned */}
            <div className="justify-all lg:col-span-8 space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p>
                <strong className="text-slate-900">Gautam Buddha University</strong>, established by the <strong className="text-slate-900">Uttar Pradesh Act (9) of 2002</strong>,
                commenced its first academic session at its 511 acres lush green campus at Greater Noida in <strong className="text-slate-900">August 2008</strong>.
              </p>
              <p>
                The University is fully funded by the <strong className="text-slate-900">New Okhla Industrial Development Authority (NOIDA)</strong>
                {" "}and the <strong className="text-slate-900">Greater Noida Industrial Development Authority (GNIDA)</strong>, both undertakings of the
                Government of Uttar Pradesh.
              </p>
              <p>
                The University is <strong className="text-slate-900">recognized by the University Grants Commission</strong> under UGC Act and is a
                member of the <strong className="text-slate-900">Association of Indian Universities</strong>. All academic programmes offered by the
                University are recognised by the University Grants Commission of India and various other Statutory Bodies and Councils.
              </p>
            </div>

            <aside className="lg:col-span-4 rounded-2xl border border-slate-200 bg-slate-50 p-5" aria-label="Key facts">
              <h3 className="text-sm font-bold uppercase tracking-wide text-blue-900 mb-3">At a glance</h3>
              <dl className="divide-y divide-slate-200">
                {keyFacts.map((fact) => {
                  const Icon = fact.icon;
                  return (
                    <div key={fact.label} className="flex items-start gap-3 py-2.5 first:pt-0 last:pb-0">
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 ring-1 ring-slate-200">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-slate-500">{fact.label}</dt>
                        <dd className="text-sm font-semibold text-slate-900">{fact.value}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-6 sm:py-8 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Recognised & Accredited" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {recognitions.map((recognition) => (
              <div
                key={recognition.id}
                className="group flex flex-col bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <IconTile icon={recognition.icon} tone={recognition.tone} />
                <h3 className="mt-4 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                  {recognition.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-blue-700">{recognition.body}</p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{recognition.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statutory Approvals */}
      <section className="py-6 sm:py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Statutory Approvals" />
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-5">
            {approvals.map((approval) => (
              <div
                key={approval.title}
                className="group flex gap-4 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <IconTile icon={approval.icon} tone={approval.tone} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                      {approval.title}
                    </h3>
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approved
                    </span>
                  </div>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div>
                      <dt className="text-xs font-medium text-slate-500">Programme</dt>
                      <dd className="font-semibold text-slate-800">{approval.program}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-slate-500">School / Department</dt>
                      <dd className="text-slate-700">{approval.school}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{approval.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
