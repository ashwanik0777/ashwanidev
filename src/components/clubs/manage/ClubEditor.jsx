import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ExternalLink,
  FileText,
  ImageIcon,
  Images,
  Info,
  Link2,
  Loader2,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";
import ImageUploadField from "../../ui/ImageUploadField";
import { uploadFile, uploadImage } from "../../../services/uploadService";
import { parseImageUrl } from "../../../utils/imageUtils";
import {
  CLUB_CATEGORIES,
  OFFICE_BEARERS,
  SOCIAL_PLATFORMS,
  categoryTone,
  normalizeClub,
  parseEventDate,
  validateClub,
} from "../clubModel";
import { ClubLogo, Glyph } from "../detail/ClubParts";
import ConfirmDialog from "./ConfirmDialog";
import { ensureStorage, iconButton, inputClass, move, primaryButton, secondaryButton, uploadError } from "../clubUi";
import { Field, ListEditor, PhotoInput, StepHeading } from "./fields";

const STEPS = [
  { id: "basics", label: "Basic Details", icon: Info },
  { id: "media", label: "Logo & Banner", icon: ImageIcon },
  { id: "about", label: "About", icon: BookOpen },
  { id: "team", label: "Team", icon: Users },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "gallery", label: "Gallery", icon: Images },
  { id: "guidelines", label: "Guidelines", icon: ShieldCheck },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "contact", label: "Contact & Links", icon: Link2 },
];
const STEP_OF_ERROR = { name: "basics", description: "about", events: "events", reports: "reports" };
const MAX_PHOTOS = 30;
const newId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

/* A collapsible card for one event, report or member. */
const ItemCard = ({ index, title, subtitle, open, onToggle, onUp, onDown, onRemove, isFirst, isLast, children }) => (
  <div className={`rounded-2xl border bg-white transition ${open ? "border-sky-200 shadow-sm" : "border-slate-200 hover:border-slate-300"}`}>
    <div className="flex items-center gap-2 p-3 sm:p-4">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex min-w-0 flex-1 items-center gap-3 text-left">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600">{index + 1}</span>
        <span className="min-w-0">
          <span className={`block truncate text-sm font-semibold ${title ? "text-slate-900" : "italic text-slate-400"}`}>{title || "Untitled"}</span>
          {subtitle && <span className="block truncate text-xs text-slate-500">{subtitle}</span>}
        </span>
      </button>
      <button type="button" className={`${iconButton} hidden sm:flex`} onClick={onUp} disabled={isFirst} aria-label="Move up">
        <ArrowUp className="h-4 w-4" />
      </button>
      <button type="button" className={`${iconButton} hidden sm:flex`} onClick={onDown} disabled={isLast} aria-label="Move down">
        <ArrowDown className="h-4 w-4" />
      </button>
      <button type="button" className={`${iconButton} hover:bg-rose-50 hover:text-rose-600`} onClick={onRemove} aria-label="Remove" title="Remove">
        <Trash2 className="h-4 w-4" />
      </button>
      <button type="button" className={iconButton} onClick={onToggle} aria-label={open ? "Collapse" : "Expand"}>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
    {open && <div className="border-t border-slate-100 p-4 sm:p-5">{children}</div>}
  </div>
);

const EmptyBlock = ({ icon, text, action }) => (
  <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 ring-1 ring-slate-200">
      <Glyph icon={icon} className="h-6 w-6" />
    </span>
    <p className="mt-3 text-sm text-slate-500">{text}</p>
    {action && <div className="mt-4">{action}</div>}
  </div>
);

const ClubEditor = ({ initialClub, isNew, schoolCode, saving, onCancel, onSave }) => {
  // Members get an id while editing so their cards keep their place when reordered.
  const [initial] = useState(() => {
    const club = normalizeClub(initialClub);
    return { ...club, team: { ...club.team, members: club.team.members.map((member) => ({ ...member, id: newId("member") })) } };
  });
  const [form, setForm] = useState(initial);
  const initialJson = useMemo(() => JSON.stringify(initial), [initial]);
  const [step, setStep] = useState("basics");
  const [errors, setErrors] = useState({});
  const [confirmClose, setConfirmClose] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [galleryState, setGalleryState] = useState({ busy: "", error: "", link: "" });
  const [reportUpload, setReportUpload] = useState({ id: null, error: "" });
  const bodyRef = useRef(null);
  const galleryInputRef = useRef(null);
  const reportInputRef = useRef(null);

  const folder = `gbu-website/${schoolCode || "general"}/clubs`;
  const dirty = JSON.stringify(form) !== initialJson;

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const setIn = (group, key, value) => setForm((f) => ({ ...f, [group]: { ...f[group], [key]: value } }));
  const setPerson = (key, field, value) => setForm((f) => ({ ...f, team: { ...f.team, [key]: { ...f.team[key], [field]: value } } }));
  const setListItem = (key, index, field, value) => setForm((f) => ({ ...f, [key]: f[key].map((item, i) => (i === index ? { ...item, [field]: value } : item)) }));
  const setMember = (index, field, value) =>
    setForm((f) => ({ ...f, team: { ...f.team, members: f.team.members.map((m, i) => (i === index ? { ...m, [field]: value } : m)) } }));

  const requestClose = () => (dirty ? setConfirmClose(true) : onCancel());

  // The page behind stays still; Escape closes (asking first when there are edits).
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);
  useEffect(() => {
    const onKeyDown = (event) => {
      // The crop window handles its own keys while it is open.
      if (event.key === "Escape" && !confirmClose && !document.querySelector(".fixed.bg-black\\/80")) requestClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const goStep = (id) => {
    setStep(id);
    setOpenItem(null);
    bodyRef.current?.scrollTo({ top: 0 });
  };

  const save = async () => {
    const found = validateClub(form);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      goStep(STEP_OF_ERROR[first] || "basics");
      return;
    }
    await onSave(form);
  };

  const stepCount = {
    team: [form.team.facultyCoordinator, ...OFFICE_BEARERS.map(({ key }) => form.team[key])].filter((p) => p?.name).length + form.team.members.length,
    events: form.events.length,
    gallery: form.gallery.length,
    reports: form.reports.length,
  };
  const stepHasError = (id) => Object.keys(errors).some((key) => STEP_OF_ERROR[key] === id);

  /* ── Gallery uploads ── */
  const addPhotos = async (fileList) => {
    const files = [...(fileList || [])].filter((file) => file.type.startsWith("image/")).slice(0, MAX_PHOTOS - form.gallery.length);
    if (galleryInputRef.current) galleryInputRef.current.value = "";
    if (!files.length) return;
    try {
      await ensureStorage();
    } catch (err) {
      setGalleryState((s) => ({ ...s, error: uploadError(err) }));
      return;
    }
    let failed = 0;
    for (let i = 0; i < files.length; i += 1) {
      setGalleryState((s) => ({ ...s, busy: `Uploading ${i + 1} of ${files.length}...`, error: "" }));
      try {
        const result = await uploadImage(files[i], `${folder}/gallery`);
        if (!result?.url) throw new Error("No link returned");
        setForm((f) => ({ ...f, gallery: [...f.gallery, { id: newId("photo"), url: result.url, caption: "" }] }));
      } catch {
        failed += 1;
      }
    }
    setGalleryState((s) => ({ ...s, busy: "", error: failed ? `${failed} photo${failed > 1 ? "s" : ""} could not be uploaded. Try again.` : "" }));
  };

  const addPhotoLink = () => {
    const url = galleryState.link.trim();
    if (!url) return;
    setForm((f) => ({ ...f, gallery: [...f.gallery, { id: newId("photo"), url, caption: "" }] }));
    setGalleryState((s) => ({ ...s, link: "" }));
  };

  /* ── Report file upload ── */
  const pickReportFile = (id) => {
    setReportUpload({ id, error: "" });
    reportInputRef.current?.click();
  };
  const uploadReport = async (file) => {
    if (reportInputRef.current) reportInputRef.current.value = "";
    const id = reportUpload.id;
    if (!file || !id) return;
    setReportUpload({ id, error: "", busy: true });
    try {
      await ensureStorage();
      const result = await uploadFile(file, `${folder}/reports`);
      if (!result?.url) throw new Error("The upload did not return a link.");
      setForm((f) => ({ ...f, reports: f.reports.map((r) => (r.id === id ? { ...r, link: result.url } : r)) }));
      setReportUpload({ id: null, error: "" });
    } catch (err) {
      setReportUpload({ id, error: uploadError(err) });
    }
  };

  /* ── Steps ── */
  const renderBasics = () => (
    <>
      <StepHeading title="Basic Details" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Club name" required error={errors.name} className="md:col-span-2">
          <input className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Robotics & Automation Club" autoFocus={isNew} />
        </Field>
        <Field label="Tagline" className="md:col-span-2">
          <input className={inputClass} value={form.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="One short line, e.g. Build. Code. Compete." maxLength={120} />
        </Field>
        <Field label="Category" required>
          <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
            {[...new Set([...CLUB_CATEGORIES, form.category])].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Founded in (year)">
          <input className={inputClass} inputMode="numeric" maxLength={4} value={form.foundedYear} onChange={(e) => set("foundedYear", e.target.value.replace(/[^0-9]/g, ""))} placeholder="e.g. 2019" />
        </Field>
        <Field label="Number of members">
          <input className={inputClass} type="number" min="0" value={form.memberCount || ""} onChange={(e) => set("memberCount", Math.max(0, Number(e.target.value) || 0))} placeholder="e.g. 60" />
        </Field>
        <div>
          <span className="mb-1.5 block text-sm font-medium text-slate-700">Visible on website</span>
          <button
            type="button"
            role="switch"
            aria-checked={form.isActive}
            onClick={() => set("isActive", !form.isActive)}
            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${form.isActive ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-slate-50 text-slate-600"}`}
          >
            <span className="font-medium">{form.isActive ? "Shown on the school page" : "Hidden from the website"}</span>
            <span className={`relative h-6 w-11 shrink-0 rounded-full transition ${form.isActive ? "bg-emerald-500" : "bg-slate-300"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${form.isActive ? "left-[22px]" : "left-0.5"}`} />
            </span>
          </button>
        </div>
      </div>
    </>
  );

  const renderMedia = () => (
    <>
      <StepHeading title="Logo & Banner" />
      {/* How the top of the club page will look */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="relative">
          {form.banner ? (
            <img src={parseImageUrl(form.banner, 1200)} alt="" className="aspect-[3/1] w-full object-cover" />
          ) : (
            <div className="flex aspect-[3/1] w-full items-center justify-center bg-blue-50 text-sm font-medium text-blue-300">Banner image</div>
          )}
        </div>
        <div className="flex items-end gap-3 px-4 pb-4">
          <div className="relative z-10 -mt-8 shrink-0 self-start">
            <ClubLogo club={form} className="h-16 w-16 rounded-xl border-4 border-white shadow-md" iconClassName="h-7 w-7" />
          </div>
          <div className="min-w-0 pt-2">
            <p className="truncate font-display text-base font-bold text-blue-950">{form.name || "Club name"}</p>
            <span className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ${categoryTone(form.category)}`}>{form.category}</span>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <ImageUploadField label="Club logo" value={form.logo} onChange={(url) => set("logo", url)} aspectRatio={1} recommendedSize="Square, 400 × 400" folder={folder} showPreview={false} />
        <ImageUploadField label="Banner image" value={form.banner} onChange={(url) => set("banner", url)} aspectRatio={3} recommendedSize="Wide, 1800 × 600" folder={folder} showPreview={false} />
      </div>
    </>
  );

  const renderAbout = () => (
    <>
      <StepHeading title="About the Club" />
      <div className="space-y-6">
        <Field label="Description" required error={errors.description}>
          <textarea className={`${inputClass} min-h-32`} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="What the club does and who it is for." />
        </Field>
        <ListEditor label="Objectives" items={form.objectives} onChange={(value) => set("objectives", value)} placeholder="An objective" addLabel="Add objective" max={12} />
        <Field label="History">
          <textarea className={`${inputClass} min-h-24`} value={form.history} onChange={(e) => set("history", e.target.value)} placeholder="When and how the club started, key milestones." />
        </Field>
        <ListEditor label="Achievements" items={form.achievements} onChange={(value) => set("achievements", value)} placeholder="An achievement" addLabel="Add achievement" max={20} />
      </div>
    </>
  );

  const renderPerson = (key, label, withEmail = false) => {
    const person = form.team[key];
    return (
      <div key={key} className="rounded-2xl border border-slate-200 p-4 transition hover:border-slate-300 sm:p-5">
        <p className="mb-4 text-sm font-semibold text-slate-900">{label}</p>
        <PhotoInput value={person.photo} onChange={(url) => setPerson(key, "photo", url)} folder={`${folder}/team`} cropHint="Square crop, face in the centre" />
        <div className={`mt-4 grid gap-3 ${withEmail ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          <Field label="Name">
            <input className={inputClass} value={person.name} onChange={(e) => setPerson(key, "name", e.target.value)} placeholder="Full name" />
          </Field>
          <Field label={withEmail ? "Department" : "Programme / Year"}>
            <input className={inputClass} value={person.department} onChange={(e) => setPerson(key, "department", e.target.value)} placeholder={withEmail ? "e.g. Computer Science" : "e.g. B.Tech CSE, 3rd Year"} />
          </Field>
          {withEmail && (
            <Field label="Email">
              <input className={inputClass} type="email" value={person.email} onChange={(e) => setPerson(key, "email", e.target.value)} placeholder="name@gbu.ac.in" />
            </Field>
          )}
        </div>
      </div>
    );
  };

  const renderTeam = () => (
    <>
      <StepHeading title="Team" />
      <div className="space-y-4">
        {renderPerson("facultyCoordinator", "Faculty Advisor", true)}
        {OFFICE_BEARERS.map(({ key, label }) => renderPerson(key, label))}
      </div>

      <div className="mt-8">
        <StepHeading title="Core Members">
          <button
            type="button"
            className={secondaryButton}
            onClick={() => {
              const id = newId("member");
              setForm((f) => ({ ...f, team: { ...f.team, members: [...f.team.members, { id, name: "", role: "", department: "", email: "", photo: "" }] } }));
              setOpenItem(id);
            }}
          >
            <Plus className="h-4 w-4" /> Add member
          </button>
        </StepHeading>
        {form.team.members.length === 0 ? (
          <EmptyBlock icon={Users} text="Add other team members such as leads and coordinators." />
        ) : (
          <div className="space-y-3">
            {form.team.members.map((member, index) => {
              const key = member.id;
              return (
                <ItemCard
                  key={key}
                  index={index}
                  title={member.name}
                  subtitle={[member.role, member.department].filter(Boolean).join(" · ")}
                  open={openItem === key}
                  onToggle={() => setOpenItem(openItem === key ? null : key)}
                  isFirst={index === 0}
                  isLast={index === form.team.members.length - 1}
                  onUp={() => setForm((f) => ({ ...f, team: { ...f.team, members: move(f.team.members, index, index - 1) } }))}
                  onDown={() => setForm((f) => ({ ...f, team: { ...f.team, members: move(f.team.members, index, index + 1) } }))}
                  onRemove={() => setForm((f) => ({ ...f, team: { ...f.team, members: f.team.members.filter((_, i) => i !== index) } }))}
                >
                  <PhotoInput value={member.photo} onChange={(url) => setMember(index, "photo", url)} folder={`${folder}/team`} cropHint="Square crop, face in the centre" />
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <Field label="Name">
                      <input className={inputClass} value={member.name} onChange={(e) => setMember(index, "name", e.target.value)} placeholder="Full name" />
                    </Field>
                    <Field label="Role">
                      <input className={inputClass} value={member.role} onChange={(e) => setMember(index, "role", e.target.value)} placeholder="e.g. Design Lead" />
                    </Field>
                    <Field label="Programme / Year">
                      <input className={inputClass} value={member.department} onChange={(e) => setMember(index, "department", e.target.value)} placeholder="e.g. MCA, 1st Year" />
                    </Field>
                  </div>
                </ItemCard>
              );
            })}
          </div>
        )}
      </div>
    </>
  );

  const addEvent = () => {
    const id = newId("event");
    setForm((f) => ({ ...f, events: [{ id, title: "", date: "", venue: "", description: "", image: "", link: "" }, ...f.events] }));
    setOpenItem(id);
  };

  const renderEvents = () => (
    <>
      <StepHeading title="Events">
        <button type="button" className={secondaryButton} onClick={addEvent}>
          <Plus className="h-4 w-4" /> Add event
        </button>
      </StepHeading>
      {errors.events && <p className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-700"><AlertCircle className="h-4 w-4" /> {errors.events}</p>}
      {form.events.length === 0 ? (
        <EmptyBlock icon={CalendarDays} text="No events yet. Upcoming events show first on the club page." action={<button type="button" className={primaryButton} onClick={addEvent}><Plus className="h-4 w-4" /> Add event</button>} />
      ) : (
        <div className="space-y-3">
          {form.events.map((event, index) => {
            const isIsoOrEmpty = !event.date || !!parseEventDate(event.date);
            return (
              <ItemCard
                key={event.id}
                index={index}
                title={event.title}
                subtitle={[event.date && (parseEventDate(event.date)?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) || event.date), event.venue].filter(Boolean).join(" · ")}
                open={openItem === event.id}
                onToggle={() => setOpenItem(openItem === event.id ? null : event.id)}
                isFirst={index === 0}
                isLast={index === form.events.length - 1}
                onUp={() => set("events", move(form.events, index, index - 1))}
                onDown={() => set("events", move(form.events, index, index + 1))}
                onRemove={() => set("events", form.events.filter((_, i) => i !== index))}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Event title" required className="md:col-span-2">
                    <input className={inputClass} value={event.title} onChange={(e) => setListItem("events", index, "title", e.target.value)} placeholder="e.g. Annual Hackathon" />
                  </Field>
                  <div>
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">Date</span>
                    {isIsoOrEmpty ? (
                      <input className={inputClass} type="date" value={event.date} onChange={(e) => setListItem("events", index, "date", e.target.value)} />
                    ) : (
                      <div className="flex gap-2">
                        <input className={inputClass} value={event.date} onChange={(e) => setListItem("events", index, "date", e.target.value)} />
                        <button type="button" className={secondaryButton} onClick={() => setListItem("events", index, "date", "")}>
                          Pick date
                        </button>
                      </div>
                    )}
                  </div>
                  <Field label="Venue">
                    <input className={inputClass} value={event.venue} onChange={(e) => setListItem("events", index, "venue", e.target.value)} placeholder="e.g. Seminar Hall, SOICT" />
                  </Field>
                  <Field label="Description" className="md:col-span-2">
                    <textarea className={`${inputClass} min-h-24`} value={event.description} onChange={(e) => setListItem("events", index, "description", e.target.value)} placeholder="What happens at the event." />
                  </Field>
                  <Field label="Link (registration or details)">
                    <input className={inputClass} value={event.link} onChange={(e) => setListItem("events", index, "link", e.target.value)} placeholder="https://..." />
                  </Field>
                  <div>
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">Event image</span>
                    <PhotoInput value={event.image} onChange={(url) => setListItem("events", index, "image", url)} folder={`${folder}/events`} aspectRatio={4 / 3} shape="rect" label="Image" />
                  </div>
                </div>
              </ItemCard>
            );
          })}
        </div>
      )}
    </>
  );

  const renderGallery = () => (
    <>
      <StepHeading title="Gallery">
        <span className="text-xs font-medium text-slate-500">
          {form.gallery.length} / {MAX_PHOTOS} photos
        </span>
      </StepHeading>
      <button
        type="button"
        onClick={() => galleryInputRef.current?.click()}
        disabled={!!galleryState.busy || form.gallery.length >= MAX_PHOTOS}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addPhotos(e.dataTransfer.files);
        }}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-sky-400 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {galleryState.busy ? <Loader2 className="h-7 w-7 animate-spin text-sky-600" /> : <Upload className="h-7 w-7 text-slate-400" />}
        <span className="text-sm font-semibold text-slate-700">{galleryState.busy || "Click or drop photos here"}</span>
        <span className="text-xs text-slate-500">Select several photos at once. JPG, PNG or WebP.</span>
      </button>
      <input ref={galleryInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(e) => addPhotos(e.target.files)} />
      <div className="mt-3 flex gap-2">
        <input
          className={inputClass}
          value={galleryState.link}
          onChange={(e) => setGalleryState((s) => ({ ...s, link: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPhotoLink())}
          placeholder="Or paste an image link"
        />
        <button type="button" className={secondaryButton} onClick={addPhotoLink} disabled={!galleryState.link.trim() || form.gallery.length >= MAX_PHOTOS}>
          Add
        </button>
      </div>
      {galleryState.error && <p className="mt-3 text-sm font-medium text-rose-600">{galleryState.error}</p>}

      {form.gallery.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {form.gallery.map((photo, index) => (
            <div key={photo.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-sm">
              <div className="relative aspect-[4/3] bg-slate-100">
                <img src={parseImageUrl(photo.url, 600)} alt={photo.caption} className="h-full w-full object-cover" />
                <div className="absolute right-2 top-2 flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
                  <button type="button" onClick={() => set("gallery", move(form.gallery, index, index - 1))} disabled={index === 0} aria-label="Move left" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-600 shadow-sm transition hover:bg-white disabled:opacity-40">
                    <ArrowUp className="h-4 w-4 -rotate-90" />
                  </button>
                  <button type="button" onClick={() => set("gallery", move(form.gallery, index, index + 1))} disabled={index === form.gallery.length - 1} aria-label="Move right" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-slate-600 shadow-sm transition hover:bg-white disabled:opacity-40">
                    <ArrowDown className="h-4 w-4 -rotate-90" />
                  </button>
                  <button type="button" onClick={() => set("gallery", form.gallery.filter((_, i) => i !== index))} aria-label="Remove photo" className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-rose-600 shadow-sm transition hover:bg-rose-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <input
                className="w-full border-0 border-t border-slate-100 px-3 py-2.5 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:bg-sky-50"
                value={photo.caption}
                onChange={(e) => setListItem("gallery", index, "caption", e.target.value)}
                placeholder="Caption (optional)"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );

  const renderGuidelines = () => (
    <>
      <StepHeading title="Membership & Guidelines" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Meetings">
          <input className={inputClass} value={form.policies.meetingFrequency} onChange={(e) => setIn("policies", "meetingFrequency", e.target.value)} placeholder="e.g. Every Friday, 4 PM" />
        </Field>
        <Field label="Meeting venue">
          <input className={inputClass} value={form.policies.meetingVenue} onChange={(e) => setIn("policies", "meetingVenue", e.target.value)} placeholder="e.g. Robotics Lab, SOICT" />
        </Field>
      </div>
      <div className="mt-6 space-y-6">
        <ListEditor label="Who can join" items={form.policies.eligibility} onChange={(value) => setIn("policies", "eligibility", value)} placeholder="An eligibility rule" addLabel="Add rule" />
        <ListEditor label="Code of conduct" items={form.policies.codeOfConduct} onChange={(value) => setIn("policies", "codeOfConduct", value)} placeholder="A rule members follow" addLabel="Add rule" />
        <ListEditor label="Roles & responsibilities" items={form.policies.responsibilities} onChange={(value) => setIn("policies", "responsibilities", value)} placeholder="e.g. Secretary: keeps minutes and notices" addLabel="Add role" />
      </div>
    </>
  );

  const addReport = () => {
    const id = newId("report");
    setForm((f) => ({ ...f, reports: [{ id, title: "", year: "", summary: "", link: "" }, ...f.reports] }));
    setOpenItem(id);
  };

  const renderReports = () => (
    <>
      <StepHeading title="Reports">
        <button type="button" className={secondaryButton} onClick={addReport}>
          <Plus className="h-4 w-4" /> Add report
        </button>
      </StepHeading>
      {errors.reports && <p className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-700"><AlertCircle className="h-4 w-4" /> {errors.reports}</p>}
      <input ref={reportInputRef} type="file" accept=".pdf,.doc,.docx,application/pdf" className="hidden" onChange={(e) => uploadReport(e.target.files?.[0])} />
      {form.reports.length === 0 ? (
        <EmptyBlock icon={FileText} text="Add annual or event reports. A report shows a View button when it has a file or link." action={<button type="button" className={primaryButton} onClick={addReport}><Plus className="h-4 w-4" /> Add report</button>} />
      ) : (
        <div className="space-y-3">
          {form.reports.map((report, index) => {
            const uploading = reportUpload.busy && reportUpload.id === report.id;
            return (
              <ItemCard
                key={report.id}
                index={index}
                title={report.title}
                subtitle={[report.year, report.link ? "File attached" : ""].filter(Boolean).join(" · ")}
                open={openItem === report.id}
                onToggle={() => setOpenItem(openItem === report.id ? null : report.id)}
                isFirst={index === 0}
                isLast={index === form.reports.length - 1}
                onUp={() => set("reports", move(form.reports, index, index - 1))}
                onDown={() => set("reports", move(form.reports, index, index + 1))}
                onRemove={() => set("reports", form.reports.filter((_, i) => i !== index))}
              >
                <div className="grid gap-4 md:grid-cols-3">
                  <Field label="Title" required className="md:col-span-2">
                    <input className={inputClass} value={report.title} onChange={(e) => setListItem("reports", index, "title", e.target.value)} placeholder="e.g. Annual Report 2025-26" />
                  </Field>
                  <Field label="Year">
                    <input className={inputClass} value={report.year} onChange={(e) => setListItem("reports", index, "year", e.target.value)} placeholder="e.g. 2025-26" />
                  </Field>
                  <Field label="Summary" className="md:col-span-3">
                    <textarea className={`${inputClass} min-h-20`} value={report.summary} onChange={(e) => setListItem("reports", index, "summary", e.target.value)} placeholder="What the report covers." />
                  </Field>
                  <div className="md:col-span-3">
                    <span className="mb-1.5 block text-sm font-medium text-slate-700">Report file or link</span>
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <input className={inputClass} value={report.link} onChange={(e) => setListItem("reports", index, "link", e.target.value)} placeholder="https://... or upload a PDF" />
                      <button type="button" className={`${secondaryButton} shrink-0`} onClick={() => pickReportFile(report.id)} disabled={uploading}>
                        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} {uploading ? "Uploading..." : "Upload PDF"}
                      </button>
                      {report.link && (
                        <a href={parseImageUrl(report.link)} target="_blank" rel="noopener noreferrer" className={`${secondaryButton} shrink-0`}>
                          <ExternalLink className="h-4 w-4" /> Open
                        </a>
                      )}
                    </div>
                    {reportUpload.id === report.id && reportUpload.error && <p className="mt-1.5 text-xs font-medium text-rose-600">{reportUpload.error}</p>}
                  </div>
                </div>
              </ItemCard>
            );
          })}
        </div>
      )}
    </>
  );

  const renderContact = () => (
    <>
      <StepHeading title="Contact & Links" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Club email">
          <input className={inputClass} type="email" value={form.contact.email} onChange={(e) => setIn("contact", "email", e.target.value)} placeholder="club@gbu.ac.in" />
        </Field>
        <Field label="Phone">
          <input className={inputClass} value={form.contact.phone} onChange={(e) => setIn("contact", "phone", e.target.value)} placeholder="+91 ..." />
        </Field>
        <Field label="Join / membership form link" hint="Shows a Join the Club button on the club page." className="md:col-span-2">
          <input className={inputClass} value={form.joinLink} onChange={(e) => set("joinLink", e.target.value)} placeholder="https://forms.gle/..." />
        </Field>
      </div>
      <p className="mb-3 mt-8 text-sm font-semibold text-slate-900">Social media</p>
      <div className="grid gap-4 md:grid-cols-2">
        {SOCIAL_PLATFORMS.map(({ key, label, placeholder }) => (
          <Field key={key} label={label}>
            <input className={inputClass} value={form.socialMedia[key]} onChange={(e) => setIn("socialMedia", key, e.target.value)} placeholder={placeholder} />
          </Field>
        ))}
      </div>
    </>
  );

  const renderers = {
    basics: renderBasics,
    media: renderMedia,
    about: renderAbout,
    team: renderTeam,
    events: renderEvents,
    gallery: renderGallery,
    guidelines: renderGuidelines,
    reports: renderReports,
    contact: renderContact,
  };
  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const errorCount = Object.keys(errors).length;

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-stretch justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={isNew ? "Add club" : "Edit club"}>
      <div className="animate-backdrop-in absolute inset-0 bg-slate-900/50" onClick={requestClose} />
      <div className="animate-panel-in relative flex h-full w-full max-w-6xl flex-col overflow-hidden bg-slate-50 shadow-2xl sm:h-[92vh] sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <ClubLogo club={form} className="h-10 w-10 rounded-xl ring-1 ring-slate-200" iconClassName="h-5 w-5" />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-base font-bold text-slate-900 sm:text-lg">{isNew ? "Add Club" : form.name || "Edit Club"}</h2>
            <p className="text-xs text-slate-500">{isNew ? "New club" : "Editing club"}{dirty ? " · Unsaved changes" : ""}</p>
          </div>
          <button type="button" onClick={requestClose} aria-label="Close" className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* Steps: a sideways strip on phones, a side list on wider screens */}
          <nav className="no-scrollbar flex shrink-0 gap-1 overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 md:w-56 md:flex-col md:overflow-y-auto md:border-b-0 md:border-r md:px-3 md:py-4">
            {STEPS.map(({ id, label, icon }) => {
              const Icon = icon;
              const active = step === id;
              const count = stepCount[id];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => goStep(id)}
                  aria-current={active ? "step" : undefined}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold transition md:py-2.5 ${
                    active ? "bg-sky-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${active ? "" : "text-slate-400"}`} />
                  <span className="whitespace-nowrap md:flex-1">{label}</span>
                  {stepHasError(id) ? (
                    <AlertCircle className={`h-4 w-4 shrink-0 ${active ? "text-white" : "text-rose-500"}`} />
                  ) : (
                    count > 0 && <span className={`rounded-md px-1.5 text-[11px] ${active ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>{count}</span>
                  )}
                </button>
              );
            })}
          </nav>

          <div ref={bodyRef} className="custom-scrollbar min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div key={step} className="animate-club-fade mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              {renderers[step]()}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
          {errorCount > 0 ? (
            <p className="flex min-w-0 flex-1 items-center gap-1.5 text-xs font-medium text-rose-600 sm:text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" /> <span className="truncate">Fix {errorCount === 1 ? "the marked field" : `${errorCount} marked fields`} to save</span>
            </p>
          ) : (
            <div className="hidden flex-1 items-center gap-2 sm:flex">
              <button type="button" className={secondaryButton} onClick={() => goStep(STEPS[stepIndex - 1].id)} disabled={stepIndex === 0}>
                Back
              </button>
              <button type="button" className={secondaryButton} onClick={() => goStep(STEPS[stepIndex + 1].id)} disabled={stepIndex === STEPS.length - 1}>
                Next
              </button>
            </div>
          )}
          <div className="ml-auto flex gap-2">
            <button type="button" className={secondaryButton} onClick={requestClose} disabled={saving}>
              Cancel
            </button>
            <button type="button" className={primaryButton} onClick={save} disabled={saving || (!dirty && !isNew)}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {saving ? "Saving..." : isNew ? "Create Club" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmClose}
        title="Discard changes?"
        message="Your edits to this club have not been saved."
        confirmLabel="Discard"
        onConfirm={() => {
          setConfirmClose(false);
          onCancel();
        }}
        onCancel={() => setConfirmClose(false)}
      />
    </div>,
    document.body,
  );
};

export default ClubEditor;
