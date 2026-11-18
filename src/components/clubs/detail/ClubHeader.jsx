import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, CalendarClock, Check, ChevronRight, Flag, Mail, Share2, UserPlus, UserRound, Users } from "lucide-react";
import { categoryTone } from "../clubModel";
import { CONTAINER, categoryIcon, imageSrc } from "../clubUi";
import { ClubLogo, Glyph } from "./ClubParts";

const FACT_COLUMNS = { 1: "sm:grid-cols-1", 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" };

const ClubHeader = ({ club, breadcrumbs, school }) => {
  const [copied, setCopied] = useState(false);
  const BannerIcon = categoryIcon(club.category);

  const facts = [
    club.memberCount > 0 && { icon: Users, label: "Members", value: club.memberCount.toLocaleString("en-IN") },
    club.foundedYear && { icon: Flag, label: "Founded", value: club.foundedYear },
    club.policies.meetingFrequency && { icon: CalendarClock, label: "Meetings", value: club.policies.meetingFrequency },
    club.team.facultyCoordinator.name && { icon: UserRound, label: "Faculty Advisor", value: club.team.facultyCoordinator.name },
  ].filter(Boolean);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: club.name, text: club.tagline || club.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* the visitor closed the share sheet */
    }
  };

  const join = club.joinLink
    ? { href: /^https?:\/\//i.test(club.joinLink) ? club.joinLink : `https://${club.joinLink}`, label: "Join the Club", icon: UserPlus, external: true }
    : club.contact.email
      ? { href: `mailto:${club.contact.email}`, label: "Contact the Club", icon: Mail }
      : null;

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className={`${CONTAINER} pt-4 sm:pt-6`}>
        <nav aria-label="Breadcrumb" className="overflow-hidden">
          <ol className="no-scrollbar flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-xs font-medium text-slate-500 sm:text-sm">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />}
                {crumb.to ? (
                  <Link to={crumb.to} className="transition-colors hover:text-blue-700">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="max-w-[16rem] truncate text-slate-800">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="animate-club-fade relative mt-4 overflow-hidden rounded-2xl bg-blue-50 ring-1 ring-slate-200 sm:rounded-3xl">
          {club.banner ? (
            <img
              src={imageSrc(club.banner, 2000)}
              alt={`${club.name} banner`}
              className="aspect-[3/1] min-h-[150px] w-full object-cover sm:min-h-[220px]"
            />
          ) : (
            <div className="flex aspect-[3/1] min-h-[150px] items-center justify-center sm:min-h-[220px]">
              <BannerIcon className="h-20 w-20 text-blue-200 sm:h-28 sm:w-28" strokeWidth={1.25} />
            </div>
          )}
        </div>

        <div className="relative flex flex-col gap-4 px-1 pb-6 pt-1 sm:flex-row sm:items-end sm:gap-6 sm:px-6">
          {/* self-start so the negative margin lifts the logo onto the banner in the row layout too */}
          <div className="relative z-10 -mt-12 shrink-0 self-start sm:-mt-16">
            <ClubLogo
              club={club}
              className="h-24 w-24 rounded-2xl border-4 border-white shadow-lg sm:h-32 sm:w-32"
              iconClassName="h-10 w-10 sm:h-12 sm:w-12"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${categoryTone(club.category)}`}>{club.category}</span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">{school ? school.code : "University"}</span>
            </div>
            <h1 className="mt-2 font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-blue-950 sm:text-4xl">{club.name}</h1>
            {club.tagline && <p className="mt-1.5 text-base text-slate-600 sm:text-lg">{club.tagline}</p>}
            {school && school.name !== school.code && (
              <Link to={`/schools/${school.code}`} className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-blue-700">
                <Building2 className="h-4 w-4 shrink-0" /> {school.name}
              </Link>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {join && (
              <a
                href={join.href}
                {...(join.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
              >
                <join.icon className="h-4 w-4" /> {join.label}
              </a>
            )}
            <button
              type="button"
              onClick={share}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
              {copied ? "Link copied" : "Share"}
            </button>
          </div>
        </div>

        {facts.length > 0 && (
          <dl className={`mb-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 min-[420px]:grid-cols-2 min-[420px]:[&>*:last-child:nth-child(odd)]:col-span-2 sm:[&>*:last-child:nth-child(odd)]:col-span-1 ${FACT_COLUMNS[facts.length]}`}>
            {facts.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 bg-white p-4 transition-colors hover:bg-slate-50">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Glyph icon={icon} className="h-5 w-5" />
                </span>
                {/* Value shown above its label */}
                <div className="flex min-w-0 flex-col-reverse">
                  <dt className="text-xs font-medium text-slate-500">{label}</dt>
                  <dd className="line-clamp-2 font-display text-[15px] font-bold leading-snug text-slate-900" title={String(value)}>
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
};

export default ClubHeader;
