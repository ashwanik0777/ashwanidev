import React from "react";
import {
  BookOpen,
  Camera,
  GraduationCap,
  Link,
  Lock,
  Mail,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import Field from "./Field";
import { FacultyAvatar } from "./SidebarNav";
import { cardClass, inputClass } from "./constants";
import ImageUploadField from "../../ui/ImageUploadField";
import FileUploadField from "../../ui/FileUploadField";

const CardTitle = ({ icon, title }) => {
  const Icon = icon;
  return (
    <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-600 text-white">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <h2 className="font-display text-lg font-bold tracking-tight text-slate-900">{title}</h2>
    </div>
  );
};

// Department, school and email are set by the school; the faculty update API does not change them.
const LockedField = ({ label, value }) => (
  <Field label={label}>
    <div className="relative">
      <input className={`${inputClass} pr-9`} value={value || ""} disabled readOnly />
      <span title="Set by your school admin" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        <Lock className="h-4 w-4" />
      </span>
    </div>
  </Field>
);

const ProfileForms = ({
  activeSection,
  profile,
  tagsInput,
  onUpdateField,
  onUpdateTags,
  onUpdateResearchArea,
  onAddResearchArea,
  onRemoveResearchArea,
  newAreaTitle,
  newAreaDesc,
  setNewAreaTitle,
  setNewAreaDesc,
}) => {
  if (activeSection !== "personal-details") return null;

  return (
    <div className="space-y-6">
      {/* Photo and general information */}
      <section className={cardClass}>
        <CardTitle icon={User} title="General Information" />
        <div className="grid gap-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
          <div className="space-y-3">
            <span className="block text-sm font-medium text-slate-700">Profile Photo</span>
            <div className="relative mx-auto w-40 lg:mx-0">
              <FacultyAvatar profile={profile} className="h-[13.33rem] w-40 rounded-2xl border border-slate-200 bg-slate-100 shadow-sm" />
              <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-md bg-slate-900/70 px-2 py-0.5 text-[10px] font-semibold text-white">
                <Camera className="h-3 w-3" /> 3:4 portrait
              </span>
            </div>
           
            <ImageUploadField
              label=""
              value={profile.image_url || ""}
              onChange={(url) => onUpdateField("image_url", url)}
              aspectRatio={3 / 4}
              folder="faculty/photos"
              showPreview={false}
              cropHint="This exact frame is shown on your public profile."
            />
          </div>

          <div className="grid content-start gap-4 md:grid-cols-2">
            <Field label="Full Name">
              <input
                className={inputClass}
                value={profile.name || ""}
                onChange={(e) => onUpdateField("name", e.target.value)}
                placeholder="e.g. Dr. Jane Doe"
              />
            </Field>
            <Field label="Designation">
              <input
                className={inputClass}
                value={profile.designation || ""}
                onChange={(e) => onUpdateField("designation", e.target.value)}
                placeholder="e.g. Assistant Professor"
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Specialization">
                <input
                  className={inputClass}
                  value={profile.specialization || ""}
                  onChange={(e) => onUpdateField("specialization", e.target.value)}
                  placeholder="e.g. Artificial Intelligence, NLP"
                />
              </Field>
            </div>
            <LockedField label="Department" value={profile.department} />
            <LockedField label="School" value={profile.school} />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className={cardClass}>
        <CardTitle icon={Mail} title="Contact Details" />
        <div className="grid gap-4 md:grid-cols-3">
          <LockedField label="Email Address" value={profile.email} />
          <Field label="Phone Number">
            <input
              className={inputClass}
              type="tel"
              value={profile.phone || ""}
              onChange={(e) => onUpdateField("phone", e.target.value)}
              placeholder="e.g. 0120-2344200"
            />
          </Field>
          <Field label="Office Location">
            <input
              className={inputClass}
              value={profile.office || ""}
              onChange={(e) => onUpdateField("office", e.target.value)}
              placeholder="e.g. Room 102, SOICT Building"
            />
          </Field>
        </div>
      </section>

      {/* Links, CV and tags */}
      <section className={cardClass}>
        <CardTitle icon={Link} title="CV, Profiles & Links" />
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="CV Document (PDF)">
              <FileUploadField
                label=""
                value={profile.cv || ""}
                onChange={(url) => onUpdateField("cv", url)}
                accept=".pdf"
                maxSize={10 * 1024 * 1024}
                folder="faculty/cv"
              />
            </Field>
            <Field label="Personal / Faculty Website">
              <input
                className={inputClass}
                value={profile.faculty_url || ""}
                onChange={(e) => onUpdateField("faculty_url", e.target.value)}
                placeholder="https://..."
              />
            </Field>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Google Scholar">
              <input
                className={inputClass}
                value={profile.googleScholar || ""}
                onChange={(e) => onUpdateField("googleScholar", e.target.value)}
                placeholder="https://scholar.google.com/..."
              />
            </Field>
            <Field label="ORCID">
              <input
                className={inputClass}
                value={profile.orcid || ""}
                onChange={(e) => onUpdateField("orcid", e.target.value)}
                placeholder="https://orcid.org/..."
              />
            </Field>
            <Field label="LinkedIn">
              <input
                className={inputClass}
                value={profile.linkedin || ""}
                onChange={(e) => onUpdateField("linkedin", e.target.value)}
                placeholder="https://www.linkedin.com/in/..."
              />
            </Field>
          </div>
          <Field label="Profile Tags">
            <input
              className={inputClass}
              value={tagsInput}
              onChange={(e) => onUpdateTags(e.target.value)}
              placeholder="Comma separated, e.g. Machine Learning, NLP, Data Science"
            />
          </Field>
        </div>
      </section>

      {/* Biography */}
      <section className={cardClass}>
        <CardTitle icon={GraduationCap} title="Biography & Academic Summary" />
        <div className="space-y-4">
          <Field label="Education Summary">
            <input
              className={inputClass}
              value={profile.education || ""}
              onChange={(e) => onUpdateField("education", e.target.value)}
              placeholder="e.g. B.Tech (IIT D), M.Tech (IIT D), Ph.D (IISc)"
            />
          </Field>
          <Field label="Short Biography">
            <textarea
              className={`${inputClass} min-h-24`}
              value={profile.shortBio || ""}
              onChange={(e) => onUpdateField("shortBio", e.target.value)}
              placeholder="A brief description of your professional focus..."
            />
          </Field>
          <Field label="Full Biography">
            <textarea
              className={`${inputClass} min-h-48`}
              value={profile.fullBio || ""}
              onChange={(e) => onUpdateField("fullBio", e.target.value)}
              placeholder="Detailed professional biography and career milestones..."
            />
          </Field>
        </div>
      </section>

      {/* Research areas */}
      <section className={cardClass}>
        <CardTitle icon={BookOpen} title="Research Areas" />
        <div className="space-y-3">
          {(profile.researchAreas || []).map((area, index) => (
            <div key={`area-${index}`} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div className="space-y-3">
                  <input
                    className={inputClass}
                    value={area.title || ""}
                    onChange={(e) => onUpdateResearchArea(index, "title", e.target.value)}
                    placeholder="Area title"
                  />
                  <textarea
                    className={`${inputClass} min-h-20`}
                    value={area.description || ""}
                    onChange={(e) => onUpdateResearchArea(index, "description", e.target.value)}
                    placeholder="Area description"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveResearchArea(index)}
                  className="inline-flex h-10 items-center gap-2 self-start rounded-lg border border-rose-200 bg-rose-50 px-3 text-sm font-medium text-rose-700 hover:bg-rose-100"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            </div>
          ))}
          {(profile.researchAreas || []).length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 py-6 text-center text-xs text-slate-500">
              No research areas added yet.
            </p>
          )}
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-3 font-display text-sm font-bold text-slate-800">Add Research Area</p>
          <div className="grid gap-3">
            <input
              className={inputClass}
              value={newAreaTitle}
              onChange={(e) => setNewAreaTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className={`${inputClass} min-h-20`}
              value={newAreaDesc}
              onChange={(e) => setNewAreaDesc(e.target.value)}
              placeholder="Description"
            />
            <button
              type="button"
              onClick={onAddResearchArea}
              disabled={!newAreaTitle.trim() || !newAreaDesc.trim()}
              className="inline-flex items-center justify-center gap-1.5 justify-self-start rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus className="h-4 w-4" /> Add Area
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileForms;
