import React from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Circle,
  FileText,
  FolderOpen,
  Globe,
  Mail,
  MapPin,
  Mic,
  Pencil,
  Phone,
  Users,
} from "lucide-react";
import { FacultyAvatar } from "./SidebarNav";
import { SECTION_ICONS, cardClass, primaryButtonClass, secondaryButtonClass } from "./constants";
import { getCompleteness, getHeadlineStats, getSectionCounts } from "./profileStats";
import { calculateExperienceMonths, formatExperience } from "../../../utils/facultyExperience";

const SHORTCUT_SECTIONS = [
  { id: "qualifications", label: "Qualifications", unit: ["entry", "entries"] },
  { id: "teaching", label: "Teaching", unit: ["course", "courses"] },
  { id: "research-projects", label: "Research", unit: ["entry", "entries"] },
  { id: "publications", label: "Publications", unit: ["entry", "entries"] },
  { id: "certifications", label: "Certifications", unit: ["entry", "entries"] },
  { id: "administration", label: "Administration", unit: ["entry", "entries"] },
  { id: "talks", label: "Invited Talks", unit: ["talk", "talks"] },
  { id: "awards", label: "Awards", unit: ["entry", "entries"] },
];

const SectionHeading = ({ children, aside }) => (
  <div className="mb-4 flex items-center justify-between gap-3">
    <h3 className="font-display text-lg font-bold tracking-tight text-slate-900">{children}</h3>
    {aside}
  </div>
);

const DashboardOverview = ({ profile, onNavigate, onOpenPublic }) => {
  const stats = getHeadlineStats(profile);
  const counts = getSectionCounts(profile);
  const { percent, checks } = getCompleteness(profile);
  const missing = checks.filter((item) => !item.done);
  const experienceEntries = profile?.tabData?.qualifications?.experience || [];
  const experienceMonths = calculateExperienceMonths(experienceEntries);
  // Entries without dates add nothing to the total; say so instead of showing "0 yr".
  const experience = experienceMonths || !experienceEntries.length ? formatExperience(experienceMonths) : "Add dates";

  const statCards = [
    { label: "Experience", value: experience, icon: Briefcase, tone: "bg-sky-600" },
    { label: "Publications", value: stats.publications, icon: FileText, tone: "bg-indigo-600" },
    { label: "Projects", value: stats.projects, icon: FolderOpen, tone: "bg-violet-600" },
    { label: "PhD Scholars", value: stats.phdScholars, icon: Users, tone: "bg-emerald-600" },
    { label: "Invited Talks", value: stats.talks, icon: Mic, tone: "bg-amber-500" },
    { label: "Awards", value: stats.awards, icon: Award, tone: "bg-rose-600" },
  ];

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-24 bg-sky-700 sm:h-28" />
        <div className="flex flex-col gap-5 px-5 pb-6 sm:flex-row sm:items-end sm:px-6">
          <FacultyAvatar
            profile={profile}
            className="-mt-16 h-40 w-[7.5rem] shrink-0 rounded-2xl border-4 border-white bg-slate-100 shadow-md sm:-mt-20"
          />
          <div className="min-w-0 flex-1 sm:pb-1">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">{profile?.name || "Your name"}</h2>
            <p className="mt-0.5 font-semibold text-sky-700">{profile?.designation || "Designation not set"}</p>
            {profile?.school && <p className="mt-1.5 text-sm font-semibold text-slate-700">{profile.school}</p>}
            {profile?.department && <p className="text-sm text-slate-500">{profile.department}</p>}
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              {profile?.email && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5"><Mail className="h-3.5 w-3.5 text-slate-400" />{profile.email}</span>
              )}
              {profile?.phone && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5"><Phone className="h-3.5 w-3.5 text-slate-400" />{profile.phone}</span>
              )}
              {profile?.office && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" />{profile.office}</span>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:pb-1">
            <button type="button" onClick={() => onNavigate("personal-details")} className={primaryButtonClass}>
              <Pencil className="h-4 w-4" /> Edit Profile
            </button>
            <button type="button" onClick={onOpenPublic} className={secondaryButtonClass}>
              <Globe className="h-4 w-4" /> View Live Profile
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 2xl:grid-cols-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-4 sm:p-5">
              <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${card.tone} text-white`}>
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-lg font-extrabold leading-tight tracking-tight text-slate-900 sm:text-2xl">{card.value}</p>
                <p className="mt-0.5 truncate text-[11px] font-semibold uppercase tracking-wide text-slate-500 sm:text-xs">{card.label}</p>
              </div>
            </div>
          );
        })}
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <section className={cardClass}>
          <SectionHeading
            aside={
              <span className={`font-display text-2xl font-extrabold ${percent === 100 ? "text-emerald-600" : "text-sky-700"}`}>{percent}%</span>
            }
          >
            Profile Completeness
          </SectionHeading>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all ${percent === 100 ? "bg-emerald-500" : "bg-sky-600"}`}
              style={{ width: `${percent}%` }}
            />
          </div>
          {missing.length === 0 ? (
            <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" /> Profile complete
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-slate-100">
              {missing.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.section)}
                    className="group flex w-full items-center gap-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:text-sky-700"
                  >
                    <Circle className="h-4 w-4 shrink-0 text-slate-300 group-hover:text-sky-600" />
                    <span className="flex-1">{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-sky-600" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className={cardClass}>
          <SectionHeading>Profile Sections</SectionHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            {SHORTCUT_SECTIONS.map(({ id, label, unit }) => {
              const Icon = SECTION_ICONS[id] || BookOpen;
              const count = counts[id] || 0;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onNavigate(id)}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-sky-400 hover:shadow-sm"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-sky-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-900">{label}</span>
                    <span className="block text-xs text-slate-500">{count ? `${count} ${unit[count === 1 ? 0 : 1]}` : "Nothing added yet"}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-sky-600" />
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardOverview;
