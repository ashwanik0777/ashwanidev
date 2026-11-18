import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  CircleDot,
  ExternalLink,
  ImagePlus,
  Info,
  LayoutTemplate,
  Loader2,
  Lock,
  Plus,
  Quote,
  RotateCcw,
  Save,
  School,
  Trash2,
} from "lucide-react";
import ImageCropModal from "../ui/ImageCropModal";
import { uploadImage } from "../../services/uploadService";
import { parseImageUrl } from "../../utils/imageUtils";
import { ensureStorage, iconButton, inputClass, move, primaryButton, secondaryButton, uploadError } from "../clubs/clubUi";
import { Field, ListEditor, PhotoInput } from "../clubs/manage/fields";
import { MAX_ABOUT_CARDS, MAX_BANNERS, homePageFromConfig, loadStaticHomeConfig, normalizeHomePage } from "./homePageModel";

const cardClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6";

const CardTitle = ({ icon, title, hint, children }) => {
  const Icon = icon;
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-lg font-bold tracking-tight text-slate-900">{title}</h2>
          {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
        </div>
      </div>
      {children}
    </div>
  );
};

/* ── Banner images ── */

const BannerImages = ({ images, onChange, folder }) => {
  const inputRef = useRef(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const full = images.length >= MAX_BANNERS;

  const pick = async (file) => {
    if (inputRef.current) inputRef.current.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return setError("Choose a JPG, PNG or WebP image.");
    setError("");
    try {
      await ensureStorage();
      setCropSrc(URL.createObjectURL(file));
    } catch (err) {
      setError(uploadError(err));
    }
  };
  const closeCrop = () => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc(null);
  };
  const upload = async (blob) => {
    closeCrop();
    setBusy(true);
    try {
      const result = await uploadImage(new File([blob], "banner.webp", { type: blob.type || "image/webp" }), folder);
      if (!result?.url) throw new Error("The upload did not return a link.");
      onChange([...images, result.url]);
    } catch (err) {
      setError(uploadError(err));
    } finally {
      setBusy(false);
    }
  };
  const addLink = () => {
    if (!link.trim() || full) return;
    onChange([...images, link.trim()]);
    setLink("");
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((url, index) => (
          <div key={`${index}-${url}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition hover:border-slate-300 hover:shadow-sm">
            <div className="relative aspect-[3/1] bg-slate-100">
              <img src={parseImageUrl(url, 900)} alt={`Banner ${index + 1}`} className="h-full w-full object-cover" />
              <span className="absolute left-2 top-2 rounded-md bg-slate-900/70 px-2 py-0.5 text-[11px] font-semibold text-white">{index === 0 ? "Shown first" : `#${index + 1}`}</span>
            </div>
            <div className="flex items-center justify-end gap-1 border-t border-slate-200 bg-white px-2 py-1.5">
              <button type="button" className={iconButton} onClick={() => onChange(move(images, index, index - 1))} disabled={index === 0} aria-label="Move earlier">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" className={iconButton} onClick={() => onChange(move(images, index, index + 1))} disabled={index === images.length - 1} aria-label="Move later">
                <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" className={`${iconButton} hover:bg-rose-50 hover:text-rose-600`} onClick={() => onChange(images.filter((_, i) => i !== index))} aria-label="Remove banner">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        {!full && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="flex aspect-[3/1] flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700 disabled:opacity-60 sm:aspect-auto sm:min-h-[8rem]"
          >
            {busy ? <Loader2 className="h-6 w-6 animate-spin text-sky-600" /> : <ImagePlus className="h-6 w-6" />}
            <span className="text-sm font-semibold">{busy ? "Uploading..." : "Add banner image"}</span>
            <span className="text-[11px] text-slate-400">Wide photo, 1920 × 640</span>
          </button>
        )}
      </div>
      {!full && (
        <div className="mt-3 flex gap-2">
          <input className={inputClass} value={link} onChange={(e) => setLink(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLink())} placeholder="Or paste an image link" />
          <button type="button" className={secondaryButton} onClick={addLink} disabled={!link.trim()}>
            Add
          </button>
        </div>
      )}
      {error && <p className="mt-2 text-sm font-medium text-rose-600">{error}</p>}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
      <ImageCropModal open={!!cropSrc} imageSrc={cropSrc} aspectRatio={3} hint="Phones show the middle of the photo, so keep the main subject centred" onCropDone={upload} onClose={closeCrop} />
    </div>
  );
};

/* ── Editor ── */

const emptyCard = () => ({ title: "", text: "", points: [], tags: [] });

/**
 * The school home page editor shared by the School dashboard (Home) and the Admin dashboard
 * (Schools > Basic Settings). Until a school saves here, it opens with what the website shows today.
 * onSave({ homePage, schoolName }) stores it and resolves to false when the save failed.
 */
const SchoolHomeEditor = ({ schoolCode, schoolName, storedContent, canEditName = false, onSave }) => {
  const saved = useMemo(() => normalizeHomePage(storedContent?.homePage), [storedContent]);
  const [state, setState] = useState({ loading: !saved, form: saved, baseline: saved ? JSON.stringify({ form: saved, name: schoolName }) : "" });
  const [name, setName] = useState(schoolName || "");
  const [isSaved, setIsSaved] = useState(!!saved);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Not saved from the dashboard yet: start from the school's built-in page.
  useEffect(() => {
    if (saved) return undefined;
    let cancelled = false;
    loadStaticHomeConfig(schoolCode).then((config) => {
      if (cancelled) return;
      const form = homePageFromConfig(config);
      setState({ loading: false, form, baseline: JSON.stringify({ form, name: schoolName || "" }) });
    });
    return () => {
      cancelled = true;
    };
  }, [saved, schoolCode, schoolName]);

  const { form, loading, baseline } = state;
  const dirty = !!form && JSON.stringify({ form, name }) !== baseline;
  const savedDean = useMemo(() => (baseline ? JSON.parse(baseline).form.dean : null), [baseline]);
  // A different dean with the previous dean's photo still in place.
  const oldPhotoForNewDean =
    !!form && !!savedDean?.photo && form.dean.photo === savedDean.photo && !!form.dean.name && form.dean.name.trim().toLowerCase() !== savedDean.name.trim().toLowerCase();

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (loading || !form) {
    return (
      <div className={`${cardClass} flex items-center justify-center gap-2 py-16 text-sm text-slate-500`}>
        <Loader2 className="h-4 w-4 animate-spin" /> Loading the home page...
      </div>
    );
  }

  const setForm = (update) => setState((s) => ({ ...s, form: typeof update === "function" ? update(s.form) : update }));
  const setDean = (key, value) => setForm((f) => ({ ...f, dean: { ...f.dean, [key]: value } }));
  const setAbout = (patch) => setForm((f) => ({ ...f, about: { ...f.about, ...patch } }));
  const setCard = (index, key, value) => setAbout({ cards: form.about.cards.map((card, i) => (i === index ? { ...card, [key]: value } : card)) });
  const folder = `gbu-website/${schoolCode || "general"}/home`;

  const resetToBuiltIn = async () => {
    const config = await loadStaticHomeConfig(schoolCode);
    setForm(homePageFromConfig(config));
  };

  const save = async () => {
    if (canEditName && !name.trim()) {
      setError("School name cannot be empty.");
      return;
    }
    const dean = form.dean;
    if (!dean.name && (dean.designation || dean.photo || dean.shortMessage || dean.message)) {
      setError("Add the dean's name, or clear the dean's details.");
      return;
    }
    setError("");
    setSaving(true);
    const homePage = { ...normalizeHomePage(form), updatedAt: new Date().toISOString() };
    const ok = await onSave({ homePage, schoolName: name.trim() });
    setSaving(false);
    if (ok !== false) {
      setIsSaved(true);
      setState((s) => ({ ...s, baseline: JSON.stringify({ form: s.form, name }) }));
    }
  };

  const status = dirty
    ? { tone: "bg-amber-50 text-amber-700 ring-amber-200", icon: CircleDot, label: "Unsaved changes" }
    : isSaved
      ? { tone: "bg-emerald-50 text-emerald-700 ring-emerald-200", icon: CheckCircle2, label: "Live on the website" }
      : { tone: "bg-sky-50 text-sky-700 ring-sky-200", icon: Info, label: "Showing the current website content" };
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      {/* Save bar, kept in view while scrolling the form */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm backdrop-blur">
        <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold ring-1 ${status.tone}`}>
          <StatusIcon className="h-3.5 w-3.5" /> {status.label}
        </span>
        {error && <span className="text-sm font-medium text-rose-600">{error}</span>}
        <div className="ml-auto flex flex-wrap gap-2">
          <a href={`/schools/${schoolCode}`} target="_blank" rel="noopener noreferrer" className={secondaryButton}>
            <ExternalLink className="h-4 w-4" /> View Page
          </a>
          <button type="button" className={primaryButton} onClick={save} disabled={!dirty || saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <section className={cardClass}>
        <CardTitle icon={School} title="School" />
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_200px]">
          {canEditName ? (
            <Field label="School name" hint="Used on announcements, faculty profiles and registration requests.">
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
          ) : (
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">School name</span>
              <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700" title="Set by the university admin">
                <span className="truncate">{name}</span>
                <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              </div>
            </div>
          )}
          <div>
            <span className="mb-1.5 block text-sm font-medium text-slate-700">School code</span>
            <div className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-semibold text-slate-700">
              {schoolCode}
              <Lock className="h-4 w-4 shrink-0 text-slate-400" />
            </div>
          </div>
        </div>
      </section>

      <section className={cardClass}>
        <CardTitle icon={LayoutTemplate} title="Banner Images" hint="The slideshow at the top of the school page. Leave it empty to use the default banners.">
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
            {form.heroImages.length} / {MAX_BANNERS}
          </span>
        </CardTitle>
        <BannerImages images={form.heroImages} onChange={(heroImages) => setForm((f) => ({ ...f, heroImages }))} folder={folder} />
      </section>

      <section className={cardClass}>
        <CardTitle icon={Info} title="About Us" hint="The cards under the banner, such as Vision and Mission.">
          {form.about.cards.length < MAX_ABOUT_CARDS && (
            <button type="button" className={secondaryButton} onClick={() => setAbout({ cards: [...form.about.cards, emptyCard()] })}>
              <Plus className="h-4 w-4" /> Add card
            </button>
          )}
        </CardTitle>
        <Field label="Section heading" className="mb-5 max-w-md">
          <input className={inputClass} value={form.about.heading} onChange={(e) => setAbout({ heading: e.target.value })} placeholder="About Us" />
        </Field>
        <div className="grid gap-4 xl:grid-cols-2">
          {form.about.cards.map((card, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-slate-300 sm:p-5">
              <div className="mb-3 flex items-center gap-1">
                <span className="mr-auto text-xs font-bold uppercase tracking-wider text-slate-500">Card {index + 1}</span>
                <button type="button" className={iconButton} onClick={() => setAbout({ cards: move(form.about.cards, index, index - 1) })} disabled={index === 0} aria-label="Move up">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" className={iconButton} onClick={() => setAbout({ cards: move(form.about.cards, index, index + 1) })} disabled={index === form.about.cards.length - 1} aria-label="Move down">
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button type="button" className={`${iconButton} hover:bg-rose-50 hover:text-rose-600`} onClick={() => setAbout({ cards: form.about.cards.filter((_, i) => i !== index) })} aria-label="Remove card">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <Field label="Title">
                  <input className={`${inputClass} bg-white`} value={card.title} onChange={(e) => setCard(index, "title", e.target.value)} placeholder="e.g. Vision" />
                </Field>
                <Field label="Text">
                  <textarea className={`${inputClass} min-h-32 bg-white`} value={card.text} onChange={(e) => setCard(index, "text", e.target.value)} placeholder="Leave a blank line between paragraphs." />
                </Field>
                <ListEditor label="Points" items={card.points} onChange={(points) => setCard(index, "points", points)} placeholder="A point" addLabel="Add point" max={12} />
                <ListEditor label="Highlights (small tags)" items={card.tags} onChange={(tags) => setCard(index, "tags", tags)} placeholder="e.g. Est. 2009" addLabel="Add highlight" max={8} />
              </div>
            </div>
          ))}
        </div>
        {form.about.cards.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">No cards: the default About Us cards are shown.</p>}
      </section>

      <section className={cardClass}>
        <CardTitle icon={Quote} title="Dean's Message" hint="Shown on the school page, the About > Dean page and the Contact page." />
        <div className="grid gap-6 lg:grid-cols-[180px_minmax(0,1fr)]">
          <div>
            <span className="mb-1.5 block text-sm font-medium text-slate-700">Photo</span>
            <div className="mb-3 aspect-[3/4] w-36 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {form.dean.photo ? (
                <img src={parseImageUrl(form.dean.photo, 400)} alt={form.dean.name} className="h-full w-full object-cover object-top" />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">No photo</div>
              )}
            </div>
            <PhotoInput value={form.dean.photo} onChange={(url) => setDean("photo", url)} folder={folder} aspectRatio={3 / 4} shape="rect" label="Photo" cropHint="Portrait 3:4, face near the top" showThumb={false} />
            {oldPhotoForNewDean && (
              <p className="mt-2 rounded-lg bg-amber-50 px-2.5 py-2 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
                This is the previous dean's photo. Upload the new dean's photo or remove it.
              </p>
            )}
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Dean's name">
                <input className={inputClass} value={form.dean.name} onChange={(e) => setDean("name", e.target.value)} placeholder="e.g. Dr. A. Kumar" />
              </Field>
              <Field label="Designation">
                <input className={inputClass} value={form.dean.designation} onChange={(e) => setDean("designation", e.target.value)} placeholder="e.g. Dean, School of ICT" />
              </Field>
            </div>
            <Field label="Short message" hint="On the school home page, with a Read full message link.">
              <textarea className={`${inputClass} min-h-24`} value={form.dean.shortMessage} onChange={(e) => setDean("shortMessage", e.target.value)} />
            </Field>
            <Field label="Full message" hint="On the About > Dean page. Leave a blank line between paragraphs.">
              <textarea className={`${inputClass} min-h-48`} value={form.dean.message} onChange={(e) => setDean("message", e.target.value)} />
            </Field>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <button type="button" onClick={resetToBuiltIn} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">
          <RotateCcw className="h-3.5 w-3.5" /> Load the default content into the form
        </button>
      </div>
    </div>
  );
};

export default SchoolHomeEditor;
