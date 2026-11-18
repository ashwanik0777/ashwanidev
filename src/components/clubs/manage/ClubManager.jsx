import React, { useMemo, useState } from "react";
import { ExternalLink, Eye, EyeOff, Loader2, Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import {
  categoryTone,
  clubChecklist,
  clubId,
  clubTeamCount,
  emptyClub,
  normalizeClub,
  prepareClubForSave,
  uniqueClubId,
} from "../clubModel";
import { categoryIcon, inputClass, primaryButton } from "../clubUi";
import { ClubLogo } from "../detail/ClubParts";
import { parseImageUrl } from "../../../utils/imageUtils";
import ClubEditor from "./ClubEditor";
import ConfirmDialog from "./ConfirmDialog";

const iconAction =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-40";

/**
 * Club management for one school, shared by the School and Admin dashboards.
 * onSaveClubs(nextClubs) stores the whole list and resolves to false when the save failed.
 */
const ClubManager = ({ clubs = [], schoolCode, onSaveClubs, onMessage }) => {
  const [editor, setEditor] = useState(null); // { index: number | null, club }
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const rows = useMemo(() => clubs.map((raw, index) => ({ raw, index, club: normalizeClub(raw) })), [clubs]);
  const categories = useMemo(() => ["All", ...new Set(rows.map((row) => row.club.category))], [rows]);
  const visibleCount = rows.filter((row) => row.club.isActive).length;

  const term = query.trim().toLowerCase();
  const filtered = rows.filter(
    ({ club }) =>
      (category === "All" || club.category === category) &&
      (!term || [club.name, club.tagline, club.category, club.team.facultyCoordinator.name].some((value) => value.toLowerCase().includes(term))),
  );

  const persist = async (next, successText) => {
    try {
      const ok = await onSaveClubs(next);
      if (ok === false) return false;
      if (successText) onMessage?.(successText);
      return true;
    } catch (error) {
      onMessage?.(`Failed to save clubs: ${error?.message || "please try again"}`, true);
      return false;
    }
  };

  const saveClub = async (form) => {
    const isNew = editor.index === null;
    // An existing club keeps its id, so links to its page keep working after a rename.
    const id = isNew ? uniqueClubId(form.name, clubs) : clubId(clubs[editor.index]) || uniqueClubId(form.name, clubs);
    const prepared = prepareClubForSave({ ...form, id });
    const next = isNew ? [...clubs, prepared] : clubs.map((club, index) => (index === editor.index ? prepared : club));
    setSaving(true);
    const ok = await persist(next, isNew ? `"${prepared.name}" was created.` : `"${prepared.name}" was saved.`);
    setSaving(false);
    if (ok) setEditor(null);
  };

  const toggleVisible = async ({ raw, index, club }) => {
    setBusyId(club.id);
    const next = clubs.map((item, i) => (i === index ? { ...raw, isActive: !club.isActive, updatedAt: new Date().toISOString() } : item));
    await persist(next, club.isActive ? `"${club.name}" is now hidden from the website.` : `"${club.name}" is now shown on the website.`);
    setBusyId(null);
  };

  const confirmDelete = async () => {
    const { index, club } = pendingDelete;
    setBusyId(club.id);
    const ok = await persist(clubs.filter((_, i) => i !== index), `"${club.name}" was deleted.`);
    setBusyId(null);
    if (ok) setPendingDelete(null);
  };

  const pageUrl = (club) => `/club/${encodeURIComponent(club.id)}?school=${encodeURIComponent(schoolCode || "")}`;

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className={`${inputClass} pl-10`} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search clubs by name, category or advisor" aria-label="Search clubs" />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">{rows.length} {rows.length === 1 ? "club" : "clubs"}</span>
          <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">{visibleCount} on website</span>
          {rows.length - visibleCount > 0 && <span className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">{rows.length - visibleCount} hidden</span>}
          <button type="button" className={`${primaryButton} ml-auto lg:ml-2`} onClick={() => setEditor({ index: null, club: emptyClub() })}>
            <Plus className="h-4 w-4" /> Add Club
          </button>
        </div>
      </div>

      {categories.length > 2 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                category === item ? "bg-sky-600 text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:text-sky-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {rows.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
            <Users className="h-7 w-7" />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-slate-900">No clubs yet</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">Add your school's first club. It will appear on the school page with its own club page.</p>
          <button type="button" className={`${primaryButton} mt-5`} onClick={() => setEditor({ index: null, club: emptyClub() })}>
            <Plus className="h-4 w-4" /> Add Club
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">No club matches your search.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((row) => {
            const { club, index } = row;
            const checklist = clubChecklist(club);
            const done = checklist.filter((item) => item.done).length;
            const missing = checklist.filter((item) => !item.done).map((item) => item.label);
            const BannerIcon = categoryIcon(club.category);
            const busy = busyId === club.id;
            const stats = [
              { label: "Members", value: club.memberCount },
              { label: "Team", value: clubTeamCount(club) },
              { label: "Events", value: club.events.length },
              { label: "Photos", value: club.gallery.length },
            ];
            return (
              <article
                key={`${club.id}-${index}`}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg ${club.isActive ? "border-slate-200" : "border-dashed border-slate-300"}`}
              >
                <div className="relative overflow-hidden">
                  {club.banner ? (
                    <img src={parseImageUrl(club.banner, 900)} alt="" className={`aspect-[3/1] w-full object-cover transition duration-500 group-hover:scale-[1.03] ${club.isActive ? "" : "grayscale"}`} />
                  ) : (
                    <div className="flex aspect-[3/1] w-full items-center justify-center bg-blue-50">
                      <BannerIcon className="h-10 w-10 text-blue-200" />
                    </div>
                  )}
                  <span
                    className={`absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-sm ${
                      club.isActive ? "bg-emerald-600 text-white" : "bg-slate-700 text-white"
                    }`}
                  >
                    {club.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    {club.isActive ? "On website" : "Hidden"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5">
                  <div className="relative z-10 -mt-7 self-start">
                    <ClubLogo club={club} className="h-14 w-14 rounded-xl border-4 border-white shadow-md" iconClassName="h-6 w-6" />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 font-display text-base font-bold leading-snug text-slate-900">{club.name || "Untitled club"}</h3>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1 ${categoryTone(club.category)}`}>{club.category}</span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{club.tagline || club.description || "No description yet"}</p>

                  <dl className="mt-4 grid grid-cols-4 divide-x divide-slate-200 rounded-xl bg-slate-50 py-2.5 ring-1 ring-slate-100">
                    {stats.map(({ label, value }) => (
                      <div key={label} className="flex flex-col-reverse items-center px-1 text-center">
                        <dt className="text-[11px] text-slate-500">{label}</dt>
                        <dd className="font-display text-base font-bold text-slate-900">{value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-4" title={missing.length ? `Missing: ${missing.join(", ")}` : "Everything is filled in"}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-600">Page completeness</span>
                      <span className={`font-semibold ${done === checklist.length ? "text-emerald-600" : "text-slate-700"}`}>
                        {done}/{checklist.length}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className={`h-full rounded-full transition-all duration-500 ${done === checklist.length ? "bg-emerald-500" : "bg-sky-600"}`} style={{ width: `${(done / checklist.length) * 100}%` }} />
                    </div>
                    {missing.length > 0 && <p className="mt-1.5 truncate text-[11px] text-slate-400">Missing: {missing.join(", ")}</p>}
                  </div>

                  <div className="mt-auto flex items-center gap-2 pt-5">
                    <button type="button" className={`${primaryButton} flex-1`} onClick={() => setEditor({ index, club: row.raw })} disabled={busy}>
                      <Pencil className="h-4 w-4" /> Edit
                    </button>
                    <a
                      href={pageUrl(club)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${iconAction} hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 ${club.isActive ? "" : "pointer-events-none opacity-40"}`}
                      title={club.isActive ? "View club page" : "Hidden clubs have no public page"}
                      aria-label="View club page"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      className={`${iconAction} hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700`}
                      onClick={() => toggleVisible(row)}
                      disabled={busy}
                      title={club.isActive ? "Hide from website" : "Show on website"}
                      aria-label={club.isActive ? "Hide from website" : "Show on website"}
                    >
                      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : club.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      className={`${iconAction} hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600`}
                      onClick={() => setPendingDelete(row)}
                      disabled={busy}
                      title="Delete club"
                      aria-label="Delete club"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {editor && (
        <ClubEditor
          key={editor.index ?? "new"}
          initialClub={editor.club}
          isNew={editor.index === null}
          schoolCode={schoolCode}
          saving={saving}
          onCancel={() => setEditor(null)}
          onSave={saveClub}
        />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this club?"
        message={pendingDelete ? `"${pendingDelete.club.name}" and its page will be removed from the website. This cannot be undone. To take it down for a while, hide it instead.` : ""}
        confirmLabel="Delete Club"
        busy={!!pendingDelete && busyId === pendingDelete.club.id}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default ClubManager;
