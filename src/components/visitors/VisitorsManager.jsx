import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Eye, EyeOff, Info, Loader2, Pencil, Plus, Save, Trash2, UserRound, X } from "lucide-react";
import { parseImageUrl } from "../../utils/imageUtils";
import { inputClass, iconButton, move, primaryButton, secondaryButton } from "../clubs/clubUi";
import { Field, PhotoInput } from "../clubs/manage/fields";
import ConfirmDialog from "../clubs/manage/ConfirmDialog";
import { formatVisitDate, hasSavedVisitors, normalizeVisitor, visitorInitials, visitorsFromContent } from "./visitorsModel";

const imageSrc = (url) => (url.startsWith("/") && !url.startsWith("/uploads/") ? url : parseImageUrl(url, 500));
const newId = () => `visitor-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
const emptyVisitor = () => ({ id: "", name: "", designation: "", photo: "", visitDate: "", link: "", isActive: true });

const Photo = ({ visitor, className = "" }) => {
  const [failed, setFailed] = useState("");
  return visitor.photo && failed !== visitor.photo ? (
    <img src={imageSrc(visitor.photo)} alt={visitor.name} onError={() => setFailed(visitor.photo)} className={`h-full w-full object-cover object-top ${className}`} />
  ) : (
    <div className={`flex h-full w-full items-center justify-center bg-blue-50 font-display text-3xl font-extrabold text-blue-700 ${className}`}>
      {visitorInitials(visitor.name) || <UserRound className="h-10 w-10 text-blue-300" />}
    </div>
  );
};

/* ── Add / edit one visitor ── */
const VisitorEditor = ({ initial, isNew, saving, onCancel, onSave }) => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const dirty = JSON.stringify(form) !== JSON.stringify(initial);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => event.key === "Escape" && !document.querySelector(".fixed.bg-black\\/80") && onCancel();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onCancel]);

  const submit = () => {
    const found = {};
    if (!form.name.trim()) found.name = "Name is required";
    if (!form.designation.trim()) found.designation = "Add who they are, e.g. their post";
    setErrors(found);
    if (!Object.keys(found).length) onSave(normalizeVisitor(form));
  };

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={isNew ? "Add visitor" : "Edit visitor"}>
      <div className="animate-backdrop-in absolute inset-0 bg-slate-900/50" onClick={onCancel} />
      <div className="animate-panel-in relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4">
          <h2 className="flex-1 font-display text-lg font-bold text-slate-900">{isNew ? "Add Visitor" : "Edit Visitor"}</h2>
          <button type="button" onClick={onCancel} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="custom-scrollbar flex-1 overflow-y-auto p-5 sm:p-6">
          <div className="grid gap-6 sm:grid-cols-[180px_minmax(0,1fr)]">
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Photo</span>
              <div className="mb-3 aspect-[4/5] w-40 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:w-full">
                <Photo visitor={form} />
              </div>
              <PhotoInput value={form.photo} onChange={(url) => set("photo", url)} folder="gbu-website/GBU/visitors" aspectRatio={4 / 5} shape="rect" label="Photo" cropHint="Portrait 4:5, face near the top" showThumb={false} />
              <input className={`${inputClass} mt-3 text-xs`} value={form.photo} onChange={(e) => set("photo", e.target.value)} placeholder="Or paste an image link" />
            </div>
            <div className="space-y-4">
              <Field label="Name" required error={errors.name}>
                <input className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Shri Yogi Adityanath" autoFocus={isNew} />
              </Field>
              <Field label="Designation" required error={errors.designation} hint="Shown just below the name.">
                <input className={inputClass} value={form.designation} onChange={(e) => set("designation", e.target.value)} placeholder="e.g. Hon'ble Chief Minister, Uttar Pradesh" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Month of visit" hint="Optional.">
                  <input className={inputClass} type="month" value={form.visitDate.slice(0, 7)} onChange={(e) => set("visitDate", e.target.value)} />
                </Field>
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-slate-700">Visible on website</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.isActive}
                    onClick={() => set("isActive", !form.isActive)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-sm transition ${form.isActive ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-slate-50 text-slate-600"}`}
                  >
                    <span className="font-medium">{form.isActive ? "Shown" : "Hidden"}</span>
                    <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${form.isActive ? "bg-emerald-500" : "bg-slate-300"}`}>
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${form.isActive ? "left-[22px]" : "left-0.5"}`} />
                    </span>
                  </button>
                </div>
              </div>
              <Field label="Link" hint="Optional: a news article about the visit. The card opens it.">
                <input className={inputClass} value={form.link} onChange={(e) => set("link", e.target.value)} placeholder="https://... or /announcements/news/..." />
              </Field>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-3">
          <button type="button" className={secondaryButton} onClick={onCancel} disabled={saving}>
            Cancel
          </button>
          <button type="button" className={primaryButton} onClick={submit} disabled={saving || (!dirty && !isNew)}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {saving ? "Saving..." : isNew ? "Add Visitor" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

/**
 * Admin dashboard > Distinguished Visitors. content: the university row's content;
 * onSave(list) stores the whole list and resolves to false when the save failed.
 */
const VisitorsManager = ({ content, onSave }) => {
  const visitors = useMemo(() => visitorsFromContent(content), [content]);
  const saved = hasSavedVisitors(content);
  const [editor, setEditor] = useState(null); // { index: number | null, visitor }
  const [busy, setBusy] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const persist = async (next, key) => {
    setBusy(key);
    const ok = await onSave(next);
    setBusy(null);
    return ok !== false;
  };

  const saveVisitor = async (visitor) => {
    const isNew = editor.index === null;
    const entry = { ...visitor, id: visitor.id || newId() };
    const next = isNew ? [...visitors, entry] : visitors.map((v, i) => (i === editor.index ? entry : v));
    if (await persist(next, "editor")) setEditor(null);
  };

  const visibleCount = visitors.filter((v) => v.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900">Distinguished Visitors</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">{visitors.length} visitors</span>
            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">{visibleCount} on home page</span>
            {saved ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> Saved
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                <Info className="h-3.5 w-3.5" /> Showing the starting list; any change saves it here
              </span>
            )}
          </div>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className={secondaryButton}>
          <ExternalLink className="h-4 w-4" /> View Home Page
        </a>
        <button type="button" className={primaryButton} onClick={() => setEditor({ index: null, visitor: emptyVisitor() })}>
          <Plus className="h-4 w-4" /> Add Visitor
        </button>
      </div>

      {visitors.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
            <UserRound className="h-7 w-7" />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-slate-900">No visitors</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-500">The section is hidden on the home page until you add a visitor.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {visitors.map((visitor, index) => {
            const visited = formatVisitDate(visitor.visitDate);
            const isBusy = busy === visitor.id;
            return (
              <article
                key={visitor.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg ${visitor.isActive ? "border-slate-200" : "border-dashed border-slate-300"}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
                  <Photo visitor={visitor} className={`transition duration-500 group-hover:scale-[1.03] ${visitor.isActive ? "" : "grayscale"}`} />
                  <span className="absolute left-3 top-3 rounded-md bg-slate-900/70 px-2 py-0.5 text-[11px] font-semibold text-white">#{index + 1}</span>
                  <span className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm ${visitor.isActive ? "bg-emerald-600" : "bg-slate-700"}`}>
                    {visitor.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    {visitor.isActive ? "Shown" : "Hidden"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-base font-bold leading-snug text-slate-900">{visitor.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{visitor.designation}</p>
                  {visited && <p className="mt-1 text-xs font-medium text-sky-700">Visited {visited}</p>}
                  <div className="mt-auto flex items-center gap-1.5 pt-4">
                    <button type="button" className={`${primaryButton} flex-1 py-2`} onClick={() => setEditor({ index, visitor })} disabled={!!busy}>
                      <Pencil className="h-4 w-4" /> Edit
                    </button>
                    <button type="button" className={`${iconButton} h-9 w-9`} aria-label="Move earlier" title="Move earlier" disabled={index === 0 || !!busy} onClick={() => persist(move(visitors, index, index - 1), visitor.id)}>
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button type="button" className={`${iconButton} h-9 w-9`} aria-label="Move later" title="Move later" disabled={index === visitors.length - 1 || !!busy} onClick={() => persist(move(visitors, index, index + 1), visitor.id)}>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className={`${iconButton} h-9 w-9 hover:bg-amber-50 hover:text-amber-700`}
                      aria-label={visitor.isActive ? "Hide from home page" : "Show on home page"}
                      title={visitor.isActive ? "Hide from home page" : "Show on home page"}
                      disabled={!!busy}
                      onClick={() => persist(visitors.map((v, i) => (i === index ? { ...v, isActive: !v.isActive } : v)), visitor.id)}
                    >
                      {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : visitor.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <button type="button" className={`${iconButton} h-9 w-9 hover:bg-rose-50 hover:text-rose-600`} aria-label="Delete visitor" title="Delete" disabled={!!busy} onClick={() => setPendingDelete({ index, visitor })}>
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
        <VisitorEditor
          key={editor.index ?? "new"}
          initial={editor.visitor}
          isNew={editor.index === null}
          saving={busy === "editor"}
          onCancel={() => setEditor(null)}
          onSave={saveVisitor}
        />
      )}

      <ConfirmDialog
        open={!!pendingDelete}
        title="Delete this visitor?"
        message={pendingDelete ? `"${pendingDelete.visitor.name}" will be removed from the home page. To take them off for a while, hide them instead.` : ""}
        confirmLabel="Delete"
        busy={busy === "delete"}
        onConfirm={async () => {
          if (await persist(visitors.filter((_, i) => i !== pendingDelete.index), "delete")) setPendingDelete(null);
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default VisitorsManager;
