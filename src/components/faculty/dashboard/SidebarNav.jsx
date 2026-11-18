import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe, LayoutDashboard, LogOut, Menu, Save, X } from "lucide-react";
import { FACULTY_NAV_GROUPS, SECTION_ICONS } from "./constants";
import { resolveFacultyImage } from "../../../utils/imageUtils";

export const FacultyAvatar = ({ profile, className = "" }) => (
  <img
    src={resolveFacultyImage(profile?.image_url, profile?.image, profile?.name, profile?.email, profile?.id)}
    alt={profile?.name || "Faculty"}
    className={`object-cover object-top ${className}`}
  />
);

const groupOf = (sectionId) => FACULTY_NAV_GROUPS.find((group) => group.sections.includes(sectionId))?.id;

// Same width as Tailwind's lg breakpoint, where the fixed sidebar takes over from the slide-in menu.
const DESKTOP_QUERY = "(min-width: 1024px)";

const SidebarNav = ({
  sections,
  activeSection,
  onSelect,
  onViewPublic,
  onLogout,
  profile,
  counts = {},
  isDirty,
  saving,
  onSave,
}) => {
  // One group open at a time, as in the admin sidebar, so the list never outgrows the screen.
  const [openGroup, setOpenGroup] = useState(() => groupOf(activeSection));
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Opening a section from elsewhere (dashboard shortcuts) also opens its group.
  useEffect(() => {
    const group = groupOf(activeSection);
    if (group) setOpenGroup(group);
  }, [activeSection]);

  // While the phone menu is open: the page behind does not scroll, Escape closes it, and it closes
  // by itself if the screen becomes wide enough for the fixed sidebar (e.g. a tablet turned sideways).
  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onWidthChange = () => desktop.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onWidthChange);

    const menuButton = menuButtonRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onWidthChange);
      menuButton?.focus();
    };
  }, [menuOpen]);

  const choose = (sectionId) => {
    onSelect(sectionId);
    setMenuOpen(false);
  };

  const toggleGroup = (groupId) => setOpenGroup((current) => (current === groupId ? null : groupId));

  const byId = new Map(sections.map((section) => [section.id, section]));
  const groups = FACULTY_NAV_GROUPS
    .map((group) => ({ ...group, items: group.sections.map((id) => byId.get(id)).filter(Boolean) }))
    .filter((group) => group.items.length);
  const grouped = new Set(groups.flatMap((group) => group.sections));
  const standalone = sections.filter((section) => !grouped.has(section.id));

  const countBadge = (count, isActive) =>
    count > 0 && (
      <span
        className={`ml-auto min-w-6 rounded-md px-1.5 py-0.5 text-center text-[11px] font-semibold ${
          isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
        }`}
      >
        {count}
      </span>
    );

  // A top-level item with no sub tabs: Dashboard, Grievance.
  const renderItem = (section, icon = SECTION_ICONS[section.id] || LayoutDashboard, label = section.label) => {
    const Icon = icon;
    const isActive = activeSection === section.id;
    return (
      <button
        key={section.id}
        type="button"
        onClick={() => choose(section.id)}
        aria-current={isActive ? "page" : undefined}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
          isActive ? "bg-sky-600 text-white shadow-sm" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? "" : "text-slate-400"}`} />
        <span className="truncate">{label}</span>
        {countBadge(counts[section.id], isActive)}
      </button>
    );
  };

  const renderGroup = (group) => {
    if (group.items.length === 1) return renderItem(group.items[0], group.icon, group.label);

    const isOpen = openGroup === group.id;
    const hasActive = group.sections.includes(activeSection);
    const GroupIcon = group.icon;
    return (
      <div key={group.id}>
        <button
          type="button"
          onClick={() => toggleGroup(group.id)}
          aria-expanded={isOpen}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition hover:bg-slate-100 ${
            hasActive ? "text-sky-700" : "text-slate-700 hover:text-slate-900"
          }`}
        >
          <GroupIcon className={`h-[18px] w-[18px] shrink-0 ${hasActive ? "text-sky-600" : "text-slate-400"}`} />
          <span className="flex-1 truncate">{group.label}</span>
          <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div className="relative mb-1 ml-[1.35rem] mt-0.5 space-y-0.5 border-l border-slate-200 pl-3">
            {group.items.map((section) => {
              const Icon = SECTION_ICONS[section.id] || LayoutDashboard;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => choose(section.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition ${
                    isActive ? "bg-sky-600 font-semibold text-white shadow-sm" : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {isActive && <span className="absolute -left-[13px] top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sky-600" />}
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? "" : "text-slate-400"}`} />
                  <span className="truncate">{section.label}</span>
                  {countBadge(counts[section.id], isActive)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // The sidebar's contents, shared by the fixed desktop sidebar and the phone menu.
  const renderPanel = (inMenu) => (
    <>
      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
        <img src="/assets/logo1.png" alt="GBU" className="h-9 w-9 shrink-0 object-contain" />
        <p className="flex-1 truncate font-display text-base font-bold tracking-tight text-slate-900">Faculty Dashboard</p>
        {inMenu && (
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="custom-scrollbar flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
        {groups.map(renderGroup)}
        {standalone.map((section) => renderItem(section))}
      </nav>

      <div className="space-y-2 border-t border-slate-100 p-3">
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            onViewPublic();
          }}
          className="group flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 text-left transition hover:border-sky-300 hover:bg-sky-50"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white">
            <Globe className="h-[18px] w-[18px]" />
          </span>
          <span className="flex-1 text-sm font-semibold text-slate-800">View Live Profile</span>
          <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-sky-600" />
        </button>

        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-2.5 ring-1 ring-slate-200">
          <FacultyAvatar profile={profile} className="h-10 w-10 shrink-0 rounded-full border-2 border-white shadow-sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-bold text-slate-900" title={profile?.name}>{profile?.name || "Faculty"}</p>
            <p className="truncate text-xs text-slate-500" title={profile?.designation}>{profile?.designation}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onLogout();
            }}
            title="Logout"
            aria-label="Logout"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-rose-100 hover:text-rose-600"
          >
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Phones and tablets: an app bar fixed to the top, with the menu button */}
      <div className="fixed inset-x-0 top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur lg:hidden">
        <div className="flex items-center gap-2 px-3 py-2">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50"
          >
            <Menu className="h-5 w-5" />
          </button>
          <img src="/assets/logo1.png" alt="GBU" className="h-8 w-8 shrink-0 object-contain" />
          <p className="min-w-0 flex-1 truncate font-display text-sm font-bold tracking-tight text-slate-900">Faculty Dashboard</p>
          {isDirty ? (
            <button
              type="button"
              onClick={onSave}
              disabled={saving}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-sky-600 px-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50"
            >
              <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save"}
            </button>
          ) : (
            <button
              type="button"
              onClick={onViewPublic}
              aria-label="View live profile"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white transition hover:bg-sky-700"
            >
              <Globe className="h-[18px] w-[18px]" />
            </button>
          )}
        </div>
      </div>
      {/* Keeps the page content below the fixed bar */}
      <div className="h-14 shrink-0 lg:hidden" aria-hidden="true" />

      {menuOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="animate-backdrop-in absolute inset-0 bg-slate-900/50" onClick={() => setMenuOpen(false)} />
          <div className="animate-drawer-in absolute inset-y-0 left-0 flex w-[85%] max-w-xs flex-col bg-white shadow-2xl">
            {renderPanel(true)}
          </div>
        </div>
      )}

      {/* Desktop: full-height sidebar */}
      <aside className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:flex lg:h-full lg:w-72 lg:shrink-0 lg:flex-col">
        {renderPanel(false)}
      </aside>
    </>
  );
};

export default SidebarNav;
