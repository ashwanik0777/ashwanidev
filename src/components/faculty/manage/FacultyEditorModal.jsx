import React, { useEffect, useMemo } from "react";
import { AlertTriangle, BookOpen, Camera, FileText, Info, Loader2, Lock, Mail, Plus, RefreshCw, Trash2, User, X } from "lucide-react";
import ImageUploadField from "../../ui/ImageUploadField";
import FileUploadField from "../../ui/FileUploadField";
import { FacultyAvatar } from "../dashboard/SidebarNav";
import { completionTone, departmentChoices, linkWarning } from "./facultyForm";
import { getCompleteness } from "../dashboard/profileStats";

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

const Field = ({ label, required, hint, error, children, className = "" }) => (
  <div className={className}>
    <span className="mb-1.5 block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-rose-500">*</span>}
    </span>
    {children}
    {error ? (
      <span className="mt-1.5 block text-xs font-medium text-rose-600">{error}</span>
    ) : (
      hint && <span className="mt-1.5 block text-xs text-slate-500">{hint}</span>
    )}
  </div>
);

const Section = ({ icon, title, note, children }) => {
  const Icon = icon;
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 ring-1 ring-sky-100">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-slate-900">{title}</h4>
          {note && <p className="mt-0.5 text-xs text-slate-500">{note}</p>}
        </div>
      </div>
      {children}
    </section>
  );
};

const LoadingBody = () => (
  <div className="space-y-4" aria-hidden="true">
    {[0, 1, 2].map((block) => (
      <div key={block} className="rounded-2xl border border-slate-200 p-5">
        <div className="mb-4 h-4 w-40 animate-pulse rounded bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2">
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
              <div className="h-10 animate-pulse rounded-xl bg-slate-100" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * Add / edit one faculty profile from the school dashboard. Holds every field the public
 * profile shows in its header and Overview tab; qualifications, publications and the other
 * tabs stay with the faculty member's own dashboard and are never sent from here.
 */
const FacultyEditorModal = ({
  editor,
  schoolCode,
  schoolName,
  onChange,
  onClose,
  onSave,
  onRetry,
}) => {
  const { form, profile, isNew, loading, loadError, saving, saveError, errors = {} } = editor;
  const set = (key) => (value) => onChange({ [key]: value });
  const setFromInput = (key) => (event) => onChange({ [key]: event.target.value });

  const departments = useMemo(() => departmentChoices(schoolCode, form.department), [schoolCode, form.department]);
  // Live: the figure moves as fields are filled in. Tab data (degrees, courses...) comes from the saved profile.
  const completeness = useMemo(
    () => (isNew || !profile ? null : getCompleteness({ ...profile, ...form })),
    [isNew, profile, form],
  );
  const missing = completeness?.checks.filter((check) => !check.done) || [];
  const tone = completeness ? completionTone(completeness.percent) : null;
  const blocked = loading || Boolean(loadError) || saving;

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape" && !saving) onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, saving]);

  const areas = form.researchAreas || [];
  const updateArea = (index, patch) => onChange({ researchAreas: areas.map((area, i) => (i === index ? { ...area, ...patch } : area)) });
  const removeArea = (index) => onChange({ researchAreas: areas.filter((_, i) => i !== index) });
  const addArea = () => onChange({ researchAreas: [...areas, { title: "", description: "" }] });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-labelledby="faculty-editor-title">
      <div className="flex max-h-[96vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-slate-100 bg-slate-50 shadow-2xl sm:max-h-[92vh] sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 sm:py-4">
          <FacultyAvatar profile={{ ...profile, ...form }} className="h-12 w-9 shrink-0 rounded-lg border border-slate-200 bg-slate-100" />
          <div className="min-w-0 flex-1">
            <h3 id="faculty-editor-title" className="truncate text-base font-bold text-slate-950">
              {isNew ? "Add Faculty Profile" : form.name || "Edit Faculty Profile"}
            </h3>
            <p className="truncate text-xs text-slate-500">
              {isNew ? "A login is created and the details are emailed to the faculty member." : [profile?.id, form.designation].filter(Boolean).join(" · ")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Completion */}
        {completeness && !loading && (
          <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="font-semibold text-slate-800">Profile completion</span>
              <span className={`font-bold ${tone.text}`}>{completeness.percent}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className={`h-full rounded-full transition-all duration-500 ${tone.bar}`} style={{ width: `${completeness.percent}%` }} />
            </div>
            {missing.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-500">Missing:</span>
                {missing.map((check) => (
                  <span key={check.label} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                    {check.label}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          {loading ? (
            <LoadingBody />
          ) : loadError ? (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
              <AlertTriangle className="h-6 w-6 text-rose-500" />
              <p className="text-sm font-medium text-rose-800">{loadError}</p>
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Try again
              </button>
            </div>
          ) : (
            <>
              <Section icon={User} title="Basic details" note="Shown at the top of the faculty profile page.">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Full name" required error={errors.name}>
                    <input className={inputClass} value={form.name} onChange={setFromInput("name")} placeholder="e.g. Dr. Jane Doe" />
                  </Field>
                  <Field label="Designation" required error={errors.designation}>
                    <input className={inputClass} value={form.designation} onChange={setFromInput("designation")} placeholder="e.g. Assistant Professor" />
                  </Field>
                  <Field label="School" hint="Faculty are always added to your own school.">
                    <div className="relative">
                      <input className={`${inputClass} pr-9`} value={schoolName || schoolCode} disabled readOnly />
                      <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    </div>
                  </Field>
                  <Field label="Department" required error={errors.department}>
                    <select className={inputClass} value={form.department} onChange={setFromInput("department")}>
                      <option value="">Select department</option>
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>
                          {dept.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Specialization" className="md:col-span-2">
                    <input className={inputClass} value={form.specialization} onChange={setFromInput("specialization")} placeholder="e.g. Artificial Intelligence, Natural Language Processing" />
                  </Field>
                </div>
              </Section>

              <Section icon={Mail} title="Contact details">
                <div className="grid gap-4 md:grid-cols-3">
                  <Field label="Email" required error={errors.email} hint={isNew ? "Login details are sent here." : ""}>
                    <input className={inputClass} type="email" value={form.email} onChange={setFromInput("email")} placeholder="name@gbu.ac.in" />
                  </Field>
                  <Field label="Phone" error={errors.phone}>
                    <input
                      className={inputClass}
                      type="tel"
                      value={form.phone}
                      onChange={(event) => onChange({ phone: event.target.value.replace(/[^0-9+\-\s(),/]/g, "").slice(0, 40) })}
                      placeholder="e.g. 9876543210"
                    />
                  </Field>
                  <Field label="Office">
                    <input className={inputClass} value={form.office} onChange={setFromInput("office")} placeholder="e.g. Room 102, SOICT Building" />
                  </Field>
                </div>
              </Section>

              <Section icon={Camera} title="Profile photo" note="3:4 portrait. This exact frame is shown on the profile page.">
                <div className="grid gap-5 sm:grid-cols-[9rem_minmax(0,1fr)]">
                  <FacultyAvatar profile={{ ...profile, ...form }} className="mx-auto h-48 w-36 rounded-2xl border border-slate-200 bg-slate-100 shadow-sm sm:mx-0" />
                  <ImageUploadField
                    label=""
                    value={form.image_url}
                    onChange={set("image_url")}
                    aspectRatio={3 / 4}
                    recommendedSize="600×800"
                    folder={`gbu-website/${schoolCode || "general"}/faculty`}
                    showPreview={false}
                  />
                </div>
              </Section>

              <Section icon={FileText} title="CV and profile links" note="Each one shows as a button on the profile page once it is filled in.">
                <div className="space-y-4">
                  <Field label="CV (PDF)">
                    <FileUploadField
                      label=""
                      value={form.cv}
                      onChange={set("cv")}
                      accept=".pdf"
                      maxSize={10 * 1024 * 1024}
                      folder={`gbu-website/${schoolCode || "general"}/faculty/cv`}
                    />
                  </Field>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Field label="Google Scholar" hint={linkWarning(form, "googleScholar")}>
                      <input className={inputClass} value={form.googleScholar} onChange={setFromInput("googleScholar")} placeholder="https://scholar.google.com/..." />
                    </Field>
                    <Field label="ORCID" hint={linkWarning(form, "orcid")}>
                      <input className={inputClass} value={form.orcid} onChange={setFromInput("orcid")} placeholder="https://orcid.org/0000-..." />
                    </Field>
                    <Field label="LinkedIn" hint={linkWarning(form, "linkedin")}>
                      <input className={inputClass} value={form.linkedin} onChange={setFromInput("linkedin")} placeholder="https://www.linkedin.com/in/..." />
                    </Field>
                  </div>
                </div>
              </Section>

              <Section icon={Info} title="About" note="The Overview tab of the profile page.">
                <div className="space-y-4">
                  <Field label="Short biography" hint="Shown first; the full biography opens with Read More.">
                    <textarea className={`${inputClass} min-h-24`} value={form.shortBio} onChange={setFromInput("shortBio")} placeholder="Two or three lines on their work and focus" />
                  </Field>
                  <Field label="Full biography">
                    <textarea className={`${inputClass} min-h-40`} value={form.fullBio} onChange={setFromInput("fullBio")} placeholder="Career, achievements and current work" />
                  </Field>
                </div>
              </Section>

              <Section icon={BookOpen} title="Research areas" note="Listed on the Overview tab.">
                <div className="space-y-3">
                  {areas.map((area, index) => (
                    <div key={index} className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
                      <div className="flex items-start gap-2">
                        <div className="grid flex-1 gap-2">
                          <input
                            className={inputClass}
                            value={area.title}
                            onChange={(event) => updateArea(index, { title: event.target.value })}
                            placeholder="Area, e.g. Machine Learning"
                            aria-label={`Research area ${index + 1}`}
                          />
                          <textarea
                            className={`${inputClass} min-h-16`}
                            value={area.description}
                            onChange={(event) => updateArea(index, { description: event.target.value })}
                            placeholder="Short description (optional)"
                            aria-label={`Research area ${index + 1} description`}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeArea(index)}
                          aria-label={`Remove research area ${index + 1}`}
                          className="rounded-lg border border-transparent p-2 text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addArea}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-sky-300 bg-sky-50/60 px-3 py-2 text-xs font-semibold text-sky-700 transition hover:border-sky-400 hover:bg-sky-50"
                  >
                    <Plus className="h-4 w-4" /> Add research area
                  </button>
                </div>
              </Section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-end sm:px-6 sm:py-4">
          {saveError && (
            <p className="flex items-start gap-1.5 text-xs font-medium text-rose-600 sm:mr-auto" role="alert">
              <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {saveError}
            </p>
          )}
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={blocked}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {saving ? "Saving..." : isNew ? "Add Faculty" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacultyEditorModal;
