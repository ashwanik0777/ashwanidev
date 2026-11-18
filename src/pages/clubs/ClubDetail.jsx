import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";
import { getSchoolByCode, listSchools } from "../../services/schoolsService";
import { clubsData } from "../../components/clubs/data/clubsData";
import { OFFICE_BEARERS, clubId, hasGuidelines, isClubVisible, normalizeClub } from "../../components/clubs/clubModel";
import { CONTAINER, hasContact } from "../../components/clubs/clubUi";
import ClubHeader from "../../components/clubs/detail/ClubHeader";
import {
  AboutSection,
  AchievementsSection,
  ContactSection,
  EventsSection,
  GallerySection,
  GuidelinesSection,
  ReportsSection,
  TeamSection,
} from "../../components/clubs/detail/ClubSections";

const findClub = (clubs, id) => (Array.isArray(clubs) ? clubs.find((club) => clubId(club) === id && isClubVisible(club)) : null);

/*
 * Where a club comes from:
 *  - with ?school=CODE: that school's clubs, managed from the School and Admin dashboards;
 *  - without it: the university-level clubs, then every school's clubs.
 * A club that is hidden or deleted in the dashboard has no page.
 */
const loadClub = async (id, schoolCode) => {
  if (schoolCode) {
    const code = schoolCode.toUpperCase();
    const school = await getSchoolByCode(code).catch(() => null);
    const stored = findClub(school?.content?.clubs, id);
    return stored ? { club: stored, school: { code, name: school?.name || code } } : null;
  }

  const universityClub = findClub(clubsData, id);
  if (universityClub) return { club: universityClub, school: null };

  const schools = await listSchools().catch(() => []);
  for (const school of schools) {
    const stored = findClub(school.content?.clubs, id);
    if (stored) return { club: stored, school: { code: school.code, name: school.name || school.code } };
  }
  return null;
};

// Bottom edge of the site's fixed top bars (90px on phones, 100px from sm up).
const siteHeaderBottom = () => {
  let bottom = 0;
  document.querySelectorAll("nav").forEach((element) => {
    if (getComputedStyle(element).position !== "fixed") return;
    const rect = element.getBoundingClientRect();
    if (rect.top < 60 && rect.height > 0 && rect.height < 160 && rect.width >= window.innerWidth * 0.9) bottom = Math.max(bottom, rect.bottom);
  });
  return Math.round(bottom);
};

const LoadingState = () => (
  <div className="min-h-screen bg-slate-50 pb-16" aria-busy="true" aria-label="Loading club">
    <div className="border-b border-slate-200 bg-white">
      <div className={`${CONTAINER} animate-pulse pb-6 pt-6`}>
        <div className="h-4 w-56 rounded bg-slate-200" />
        <div className="mt-4 aspect-[3/1] min-h-[150px] rounded-3xl bg-slate-200 sm:min-h-[220px]" />
        <div className="mt-4 flex items-end gap-6 px-1 sm:px-6">
          <div className="-mt-14 h-24 w-24 rounded-2xl border-4 border-white bg-slate-300 sm:h-32 sm:w-32" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-24 rounded-full bg-slate-200" />
            <div className="h-8 w-2/3 rounded bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
    <div className={`${CONTAINER} mt-8 animate-pulse space-y-8`}>
      <div className="h-72 rounded-2xl bg-white" />
      <div className="h-56 rounded-2xl bg-white" />
    </div>
  </div>
);

const NotFoundState = ({ schoolCode }) => (
  <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
    <div className="animate-club-fade w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
        <SearchX className="h-7 w-7" />
      </span>
      <h1 className="mt-5 font-display text-2xl font-bold text-blue-950">Club not found</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">This club may have been renamed or removed. Browse the clubs from the school page instead.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {schoolCode && (
          <Link to={`/schools/${schoolCode.toUpperCase()}`} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
            <ArrowLeft className="h-4 w-4" /> Back to {schoolCode.toUpperCase()}
          </Link>
        )}
        <Link to="/campus-life/clubs-societies" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">
          Clubs & Societies
        </Link>
      </div>
    </div>
  </div>
);

const ClubDetail = () => {
  const { clubId: routeClubId } = useParams();
  const [searchParams] = useSearchParams();
  const schoolCode = searchParams.get("school");
  const [state, setState] = useState({ loading: true, club: null, school: null });
  const [activeSection, setActiveSection] = useState("");
  const [tabsTop, setTabsTop] = useState(null); // set while the tab bar is pinned under the site header
  const tabsRef = useRef(null);
  const tabsSlotRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setState({ loading: true, club: null, school: null });
    loadClub(routeClubId, schoolCode)
      .catch(() => null)
      .then((found) => {
        if (cancelled) return;
        setState({ loading: false, club: found ? normalizeClub(found.club) : null, school: found?.school || null });
        window.scrollTo(0, 0);
      });
    return () => {
      cancelled = true;
    };
  }, [routeClubId, schoolCode]);

  const { loading, club, school } = state;

  useEffect(() => {
    if (!club) return undefined;
    const previousTitle = document.title;
    document.title = `${club.name} | Gautam Buddha University`;
    return () => {
      document.title = previousTitle;
    };
  }, [club]);

  const sections = club
    ? [
        { id: "about", label: "About", show: !!(club.description || club.objectives.length || club.history) },
        { id: "achievements", label: "Achievements", show: club.achievements.length > 0 },
        { id: "team", label: "Team", show: !!club.team.facultyCoordinator.name || OFFICE_BEARERS.some(({ key }) => club.team[key].name) || club.team.members.length > 0 },
        { id: "events", label: "Events", show: club.events.length > 0 },
        { id: "gallery", label: "Gallery", show: club.gallery.length > 0 },
        { id: "guidelines", label: "Guidelines", show: hasGuidelines(club) },
        { id: "reports", label: "Reports", show: club.reports.length > 0 },
        { id: "contact", label: "Contact", show: hasContact(club) },
      ].filter((section) => section.show)
    : [];
  const sectionKey = sections.map((section) => section.id).join(",");

  /* Highlights the tab of the section being read, and pins the tab bar under the site header.
     The bar is pinned in script because the site sets overflow-x on <body>, which turns off
     CSS position: sticky on every page. */
  useEffect(() => {
    if (!sectionKey) return undefined;
    const ids = sectionKey.split(",");
    let frame = 0;
    const update = () => {
      frame = 0;
      const slot = tabsSlotRef.current;
      if (slot) {
        const headerBottom = siteHeaderBottom();
        setTabsTop(slot.getBoundingClientRect().top <= headerBottom ? headerBottom : null);
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = ids[0];
      if (atBottom) {
        current = ids[ids.length - 1];
      } else {
        ids.forEach((id) => {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top <= 200) current = id;
        });
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionKey]);

  // Keeps the active tab visible when the tab strip scrolls sideways on phones.
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.querySelector(`[data-section="${activeSection}"]`);
    if (!strip || !tab) return;
    const left = tab.offsetLeft - strip.offsetLeft;
    if (left < strip.scrollLeft || left + tab.offsetWidth > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: Math.max(0, left - 16), behavior: "smooth" });
    }
  }, [activeSection]);

  if (loading) return <LoadingState />;
  if (!club) return <NotFoundState schoolCode={schoolCode} />;

  const breadcrumbs = school
    ? [{ label: "Home", to: "/" }, { label: school.code, to: `/schools/${school.code}` }, { label: "Clubs" }, { label: club.name }]
    : [{ label: "Home", to: "/" }, { label: "Clubs & Societies", to: "/campus-life/clubs-societies" }, { label: club.name }];

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50 pb-16">
        <ClubHeader club={club} school={school} breadcrumbs={breadcrumbs} />

        {sections.length > 1 && (
          // The slot keeps the bar's height in the page while the bar itself is pinned.
          <div ref={tabsSlotRef} className="h-[49px]">
            <nav
              aria-label="Club sections"
              style={tabsTop !== null ? { top: tabsTop } : undefined}
              className={`z-30 border-b border-slate-200 bg-white/95 backdrop-blur ${tabsTop !== null ? "fixed inset-x-0 shadow-sm" : "relative"}`}
            >
              <div className={CONTAINER}>
                <div ref={tabsRef} className="no-scrollbar relative flex gap-1 overflow-x-auto">
                  {sections.map(({ id, label }) => {
                    const isActive = activeSection === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        data-section={id}
                        onClick={() => goTo(id)}
                        aria-current={isActive ? "true" : undefined}
                        className={`flex h-12 shrink-0 items-center border-b-2 px-3 text-sm font-semibold transition-colors duration-200 sm:px-4 ${
                          isActive ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-900"
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>
          </div>
        )}

        {/* One full-width column: each section lays its own content out across the width. */}
        <main className={`${CONTAINER} mt-6 space-y-6 sm:mt-8 sm:space-y-8`}>
          {sections.some((s) => s.id === "about") && <AboutSection club={club} />}
          {sections.some((s) => s.id === "achievements") && <AchievementsSection club={club} />}
          {sections.some((s) => s.id === "team") && <TeamSection club={club} />}
          {sections.some((s) => s.id === "events") && <EventsSection club={club} />}
          {sections.some((s) => s.id === "gallery") && <GallerySection club={club} />}
          {sections.some((s) => s.id === "guidelines") && <GuidelinesSection club={club} />}
          {sections.some((s) => s.id === "reports") && <ReportsSection club={club} />}
          {sections.some((s) => s.id === "contact") && <ContactSection club={club} />}
        </main>
      </div>
    </SearchableWrapper>
  );
};

export default ClubDetail;
