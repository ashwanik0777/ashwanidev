import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowRight,
  CalendarDays,
  CalendarClock,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  FileText,
  History,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Target,
  Trophy,
  UserCheck,
  UserPlus,
  X,
} from "lucide-react";
import { OFFICE_BEARERS, formatEventDate, isUpcoming, parseEventDate, sortEvents } from "../clubModel";
import { imageSrc, socialEntries } from "../clubUi";
import { Avatar, Glyph, Section, SocialLinks, SubHeading } from "./ClubParts";

const withProtocol = (url) => (/^(https?:|mailto:|\/)/i.test(url) ? url : `https://${url}`);

/* ── About ── */

const ObjectiveItem = ({ index, text }) => (
  <li className="group flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition duration-200 hover:border-blue-200 hover:bg-blue-50">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white font-display text-sm font-bold text-blue-700 ring-1 ring-blue-100 transition duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
      {String(index + 1).padStart(2, "0")}
    </span>
    <span className="pt-1 text-sm leading-6 text-slate-700">{text}</span>
  </li>
);

// Description and story on the left, objectives beside them on wide screens.
export const AboutSection = ({ club }) => {
  const hasText = !!(club.description || club.history);
  const hasObjectives = club.objectives.length > 0;
  const split = hasText && hasObjectives;

  return (
    <Section id="about" title={`About ${club.name}`}>
      <div className={split ? "grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-10" : ""}>
        {hasText && (
          <div className={split ? "" : "max-w-4xl"}>
            {club.description && <p className="whitespace-pre-line text-[15px] leading-7 text-slate-700 sm:text-base sm:leading-8">{club.description}</p>}
            {club.history && (
              <div className={club.description ? "mt-8" : ""}>
                <SubHeading icon={History}>Our Story</SubHeading>
                <p className="mt-4 whitespace-pre-line rounded-r-xl border-l-4 border-blue-600 bg-blue-50 p-4 text-sm leading-7 text-slate-700 sm:p-5 sm:text-[15px]">
                  {club.history}
                </p>
              </div>
            )}
          </div>
        )}

        {hasObjectives && (
          <div className={split ? "" : hasText ? "mt-8" : ""}>
            <SubHeading icon={Target}>Objectives</SubHeading>
            <ol className={`mt-4 grid gap-3 ${split ? "" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {club.objectives.map((objective, index) => (
                <ObjectiveItem key={`${index}-${objective}`} index={index} text={objective} />
              ))}
            </ol>
          </div>
        )}
      </div>
    </Section>
  );
};

/* ── Achievements ── */

// Columns follow the number of cards, so a short list never leaves an empty column.
const COUNT_COLUMNS = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3" };
const countColumns = (count) => COUNT_COLUMNS[Math.min(count, 3)];

export const AchievementsSection = ({ club }) => (
  <Section id="achievements" title="Achievements">
    <ul className={`grid gap-4 ${countColumns(club.achievements.length)}`}>
      {club.achievements.map((achievement, index) => (
        <li
          key={`${index}-${achievement}`}
          className="flex gap-3.5 rounded-xl border border-slate-200 bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
            <Trophy className="h-5 w-5" />
          </span>
          <span className="pt-1.5 text-sm leading-6 text-slate-700">{achievement}</span>
        </li>
      ))}
    </ul>
  </Section>
);

/* ── Team ── */

// Faculty advisor and office bearers share one centred row of cards; the advisor's is tinted.
// The row is as wide as its cards need, so four or five people sit on one line on desktop.
const TEAM_ROW = {
  1: "max-w-xs grid-cols-1",
  2: "max-w-xl grid-cols-2",
  3: "max-w-3xl grid-cols-2 sm:grid-cols-3",
  4: "max-w-5xl grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
};
const PersonCard = ({ person, featured = false }) => (
  <div
    className={`group flex flex-col items-center rounded-2xl border p-4 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-5 ${
      featured ? "border-blue-100 bg-blue-50 hover:border-blue-200" : "border-slate-200 bg-white hover:border-blue-200"
    }`}
  >
    <Avatar
      name={person.name}
      photo={person.photo}
      onTint={featured}
      className={`h-16 w-16 text-lg ring-4 transition duration-300 sm:h-20 sm:w-20 sm:text-xl ${featured ? "ring-white" : "ring-slate-50 group-hover:ring-blue-50"}`}
    />
    <p className="mt-3 font-display text-sm font-bold leading-snug text-slate-900 sm:mt-4 sm:text-[15px]">{person.name}</p>
    <span className={`mt-2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${featured ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-700"}`}>{person.role}</span>
    {person.department && <p className="mt-2 text-xs leading-5 text-slate-500">{person.department}</p>}
    {person.email && (
      <a href={`mailto:${person.email}`} className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 transition hover:text-blue-900 hover:underline">
        <Mail className="h-3.5 w-3.5" /> Email
      </a>
    )}
  </div>
);

const MEMBER_COLUMNS = { 1: "sm:max-w-sm", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" };

export const TeamSection = ({ club }) => {
  const advisor = club.team.facultyCoordinator;
  const bearers = OFFICE_BEARERS.map(({ key, label }) => ({ ...club.team[key], role: club.team[key].role || label })).filter((p) => p.name);
  const members = club.team.members;

  return (
    <Section id="team" title="Our Team">
      {(advisor.name || bearers.length > 0) && (
        <div className={`mx-auto grid gap-4 ${TEAM_ROW[bearers.length + (advisor.name ? 1 : 0)]}`}>
          {advisor.name && <PersonCard person={{ ...advisor, role: advisor.role || "Faculty Advisor" }} featured />}
          {bearers.map((person) => (
            <PersonCard key={`${person.role}-${person.name}`} person={person} />
          ))}
        </div>
      )}

      {members.length > 0 && (
        <div className={advisor.name || bearers.length ? "mt-8 border-t border-slate-100 pt-8" : ""}>
          <SubHeading>Core Members</SubHeading>
          <ul className={`mt-4 grid gap-3 ${MEMBER_COLUMNS[Math.min(members.length, 4)]}`}>
            {members.map((member, index) => (
              <li
                key={`${index}-${member.name}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition duration-200 hover:border-blue-200 hover:bg-blue-50"
              >
                <Avatar name={member.name} photo={member.photo} className="h-11 w-11 text-sm" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{member.name}</p>
                  <p className="truncate text-xs text-slate-500">{[member.role, member.department].filter(Boolean).join(" · ")}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
};

/* ── Events ── */

const DateBlock = ({ value }) => {
  const date = parseEventDate(value);
  if (!date) {
    return (
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
        <CalendarDays className="h-6 w-6" />
      </span>
    );
  }
  return (
    <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition duration-200 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
      <span className="text-[11px] font-semibold uppercase tracking-wider">{date.toLocaleDateString("en-IN", { month: "short" })}</span>
      <span className="font-display text-2xl font-extrabold leading-none">{date.getDate()}</span>
    </span>
  );
};

const EVENTS_SHOWN = 6;

export const EventsSection = ({ club }) => {
  const [showAll, setShowAll] = useState(false);
  const events = sortEvents(club.events);
  const visible = showAll ? events : events.slice(0, EVENTS_SHOWN);

  return (
    <Section
      id="events"
      title="Events"
      action={<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{events.length} {events.length === 1 ? "event" : "events"}</span>}
    >
      {/* Two columns on desktop; an odd last card takes the full row instead of leaving a gap. */}
      <div className={`grid gap-4 ${visible.length > 1 ? "lg:grid-cols-2 lg:[&>*:last-child:nth-child(odd)]:col-span-2" : ""}`}>
        {visible.map((event) => {
          const upcoming = isUpcoming(event);
          const when = formatEventDate(event.date);
          return (
            <article
              key={event.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:border-blue-200 hover:shadow-lg sm:flex-row"
            >
              {event.image && (
                // The photo fills the card's height instead of setting it, so a tall photo never stretches the row.
                <div className="relative h-48 shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:min-h-44 sm:w-44 xl:w-52">
                  <img src={imageSrc(event.image, 800)} alt={event.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
              )}
              <div className="flex flex-1 gap-4 p-5">
                <DateBlock value={event.date} />
                <div className="min-w-0 flex-1">
                  {upcoming && (
                    <span className="mb-1.5 inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">Upcoming</span>
                  )}
                  <h3 className="font-display text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">{event.title}</h3>
                  {(when || event.venue) && (
                    <p className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
                      {when && (
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarClock className="h-4 w-4 text-slate-400" /> {when}
                        </span>
                      )}
                      {event.venue && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-slate-400" /> {event.venue}
                        </span>
                      )}
                    </p>
                  )}
                  {event.description && <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-slate-600">{event.description}</p>}
                  {event.link && (
                    <a
                      href={withProtocol(event.link)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 transition-all hover:gap-2.5 hover:text-blue-800"
                    >
                      Event details <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {events.length > EVENTS_SHOWN && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-5 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          {showAll ? "Show fewer events" : `Show all ${events.length} events`}
        </button>
      )}
    </Section>
  );
};

/* ── Gallery ── */

const Lightbox = ({ photos, index, onClose, onMove }) => {
  const photo = photos[index];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onMove(1);
      if (event.key === "ArrowLeft") onMove(-1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onMove]);

  const navButton = "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25";

  return createPortal(
    <div className="animate-backdrop-in fixed inset-0 z-[10000] flex flex-col bg-slate-950/95" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <div className="flex items-center justify-between px-4 py-3 text-sm text-white/80 sm:px-6">
        <span className="font-semibold">
          {index + 1} / {photos.length}
        </span>
        <button type="button" onClick={onClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/15 hover:text-white">
          <X className="h-6 w-6" />
        </button>
      </div>
      {/* A click anywhere outside the photo and the buttons closes the viewer */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        {photos.length > 1 && (
          <button type="button" onClick={(event) => { event.stopPropagation(); onMove(-1); }} aria-label="Previous photo" className={`${navButton} left-2 sm:left-4`}>
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        <img key={photo.url} src={imageSrc(photo.url, 2000)} alt={photo.caption || "Club photo"} onClick={(event) => event.stopPropagation()} className="animate-club-fade max-h-full max-w-full rounded-lg object-contain" />
        {photos.length > 1 && (
          <button type="button" onClick={(event) => { event.stopPropagation(); onMove(1); }} aria-label="Next photo" className={`${navButton} right-2 sm:right-4`}>
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
      {photo.caption && <p className="px-6 pb-6 text-center text-sm text-white/90" onClick={(event) => event.stopPropagation()}>{photo.caption}</p>}
    </div>,
    document.body,
  );
};

const PHOTOS_SHOWN = 8;
const GALLERY_COLUMNS = { 1: "grid-cols-1 max-w-2xl", 2: "grid-cols-2", 3: "grid-cols-2 sm:grid-cols-3", 4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" };

export const GallerySection = ({ club }) => {
  const photos = club.gallery;
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? photos : photos.slice(0, PHOTOS_SHOWN);

  const move = useCallback((step) => setOpenIndex((current) => (current + step + photos.length) % photos.length), [photos.length]);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <Section
      id="gallery"
      title="Gallery"
      action={<span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{photos.length} {photos.length === 1 ? "photo" : "photos"}</span>}
    >
      <div className={`grid gap-3 ${GALLERY_COLUMNS[Math.min(photos.length, 4)]}`}>
        {visible.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            aria-label={photo.caption ? `Open photo: ${photo.caption}` : `Open photo ${index + 1}`}
          >
            <img src={imageSrc(photo.url, 800)} alt={photo.caption || ""} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-slate-900/0 transition duration-300 group-hover:bg-slate-900/20" />
            {photo.caption && (
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-slate-900/75 px-3 py-2 text-left text-xs font-medium text-white transition duration-300 group-hover:translate-y-0">
                {photo.caption}
              </span>
            )}
          </button>
        ))}
      </div>
      {photos.length > PHOTOS_SHOWN && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          className="mt-5 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          {showAll ? "Show fewer photos" : `Show all ${photos.length} photos`}
        </button>
      )}
      {openIndex !== null && <Lightbox photos={photos} index={openIndex} onClose={close} onMove={move} />}
    </Section>
  );
};

/* ── Membership & Guidelines ── */

const GUIDELINE_GROUPS = [
  { key: "eligibility", title: "Who Can Join", icon: UserCheck },
  { key: "codeOfConduct", title: "Code of Conduct", icon: ShieldCheck },
  { key: "responsibilities", title: "Roles & Responsibilities", icon: ClipboardList },
];
const GUIDELINE_COLUMNS = { 1: "", 2: "md:grid-cols-2", 3: "lg:grid-cols-3" };

export const GuidelinesSection = ({ club }) => {
  const groups = GUIDELINE_GROUPS.filter(({ key }) => club.policies[key].length);
  const { meetingFrequency, meetingVenue } = club.policies;

  return (
    <Section id="guidelines" title="Membership & Guidelines">
      {(meetingFrequency || meetingVenue) && (
        <div className="mb-6 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
          {meetingFrequency && (
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200">
                <CalendarClock className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-xs font-medium text-slate-500">Meetings</p>
                <p className="text-sm font-semibold text-slate-900">{meetingFrequency}</p>
              </div>
            </div>
          )}
          {meetingVenue && (
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 ring-1 ring-slate-200">
                <MapPin className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-xs font-medium text-slate-500">Venue</p>
                <p className="text-sm font-semibold text-slate-900">{meetingVenue}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {groups.length > 0 && (
        <div className={`grid gap-4 ${GUIDELINE_COLUMNS[groups.length]}`}>
          {groups.map(({ key, title, icon }) => (
            <div key={key} className="rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:border-blue-200 hover:shadow-md">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Glyph icon={icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-bold text-slate-900">{title}</h3>
              </div>
              <ul className="mt-4 space-y-2.5">
                {club.policies[key].map((item, index) => (
                  <li key={`${index}-${item}`} className="flex gap-2.5 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-blue-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};

/* ── Reports ── */

export const ReportsSection = ({ club }) => (
  <Section id="reports" title="Reports">
    <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200">
      {club.reports.map((report) => (
        <li key={report.id} className="group flex flex-col gap-3 bg-white p-4 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:p-5">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
            <FileText className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-slate-900">{report.title}</h3>
              {report.year && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">{report.year}</span>}
            </div>
            {report.summary && <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{report.summary}</p>}
          </div>
          {report.link && (
            <a
              href={withProtocol(report.link)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 sm:self-center"
            >
              View <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </li>
      ))}
    </ul>
  </Section>
);

/* ── Get in touch ── */

const formatUpdated = (value) => {
  const date = new Date(value);
  return value && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "";
};

// Join call to action on the left; email, phone and social links on the right.
export const ContactSection = ({ club }) => {
  const joinHref = club.joinLink ? withProtocol(club.joinLink) : "";
  const { email, phone } = club.contact;
  const updated = formatUpdated(club.updatedAt);

  return (
    <section id="contact" data-club-section className="animate-club-fade scroll-mt-40 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 sm:scroll-mt-44">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center lg:gap-12">
        <div className="flex gap-4 sm:gap-5">
          <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 ring-1 ring-blue-100 sm:flex">
            <UserPlus className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <h2 className="font-display text-xl font-bold tracking-tight text-blue-950 sm:text-2xl">{joinHref ? `Want to be part of ${club.name}?` : `Get in touch with ${club.name}`}</h2>
            <p className="mt-1.5 text-sm leading-6 text-slate-600">
              {joinHref ? "Fill in the membership form and the club team will get back to you." : "Write to the club team or follow the club for updates."}
            </p>
            {(joinHref || email) && (
              <div className="mt-5 flex flex-wrap gap-2">
                {joinHref && (
                  <a
                    href={joinHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-md"
                  >
                    <UserPlus className="h-4 w-4" /> Join the Club
                  </a>
                )}
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-100"
                  >
                    <Mail className="h-4 w-4" /> Email Us
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {(email || phone || socialEntries(club).length > 0) && (
          <div className="space-y-2 rounded-2xl bg-white p-4 ring-1 ring-blue-100 sm:p-5">
            {email && (
              <a href={`mailto:${email}`} className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-blue-50">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-white">
                  <Mail className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0 break-all text-sm font-medium text-slate-700 group-hover:text-blue-700">{email}</span>
              </a>
            )}
            {phone && (
              <a href={`tel:${phone.replace(/[^0-9+]/g, "")}`} className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-blue-50">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-white">
                  <Phone className="h-[18px] w-[18px]" />
                </span>
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{phone}</span>
              </a>
            )}
            {socialEntries(club).length > 0 && (
              <div className={email || phone ? "border-t border-slate-100 px-2 pt-3" : "px-2"}>
                <p className="mb-2.5 text-xs font-medium text-slate-500">Follow the club</p>
                <SocialLinks club={club} />
              </div>
            )}
          </div>
        )}
      </div>
      {updated && <p className="border-t border-blue-100 px-6 py-3 text-xs text-slate-500 sm:px-8">Page last updated on {updated}</p>}
    </section>
  );
};
