import React from "react";
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Plus,
  Trash2,
  FileText,
  Link,
  Award,
  Briefcase,
  Phone,
  Hash,
  Globe
} from "lucide-react";
import Field from "./Field";
import { inputClass } from "./constants";

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
  onUpdateTabDataField,
}) => {
  if (activeSection !== "personal-details") return null;

  return (
    <div className="space-y-6">
      {/* 1. General Information Card */}
      <div className="rounded-2xl border border-stone-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">
          <User className="h-5 w-5 text-stone-800" /> General Information
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
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
          <Field label="Specialization">
            <input
              className={inputClass}
              value={profile.specialization || ""}
              onChange={(e) => onUpdateField("specialization", e.target.value)}
              placeholder="e.g. Artificial Intelligence, NLP"
            />
          </Field>
          <Field label="Department">
            <input
              className={inputClass}
              value={profile.department || ""}
              onChange={(e) => onUpdateField("department", e.target.value)}
              placeholder="e.g. Department of Computer Science"
            />
          </Field>
          <Field label="School">
            <input
              className={inputClass}
              value={profile.school || ""}
              onChange={(e) => onUpdateField("school", e.target.value)}
              placeholder="e.g. SOICT"
            />
          </Field>
        </div>
      </div>

      {/* 2. Stats & Highlights Card */}
      <div className="rounded-2xl border border-stone-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">
          <Award className="h-5 w-5 text-stone-800" /> Stats &amp; Highlights
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Experience (Years)">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={profile.experience_years || 0}
              onChange={(e) => onUpdateField("experience_years", Number(e.target.value || 0))}
            />
          </Field>
          <Field label="Total Publications">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={profile.publications || 0}
              onChange={(e) => onUpdateField("publications", Number(e.target.value || 0))}
            />
          </Field>
          <Field label="Talks Delivered">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={Number(profile.tabData?.talksCount ?? 0)}
              onChange={(e) => onUpdateTabDataField("talksCount", Number(e.target.value) || 0)}
            />
          </Field>
          <Field label="Projects count">
            <input
              className={inputClass}
              type="number"
              min="0"
              value={Number(profile.tabData?.projectsCount ?? 0)}
              onChange={(e) => onUpdateTabDataField("projectsCount", Number(e.target.value) || 0)}
            />
          </Field>
        </div>
      </div>

      {/* 3. Contact & Location Card */}
      <div className="rounded-2xl border border-stone-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">
          <Mail className="h-5 w-5 text-stone-800" /> Contact Details
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Email Address">
            <input
              className={inputClass}
              type="email"
              value={profile.email || ""}
              onChange={(e) => onUpdateField("email", e.target.value)}
              placeholder="e.g. jane.doe@gbu.ac.in"
            />
          </Field>
          <Field label="Phone Number">
            <input
              className={inputClass}
              type="tel"
              value={profile.phone || ""}
              onChange={(e) => onUpdateField("phone", e.target.value)}
              placeholder="e.g. +91-9999999999"
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
      </div>

      {/* 4. Profile Links & Tags Card */}
      <div className="rounded-2xl border border-stone-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">
          <Link className="h-5 w-5 text-stone-800" /> External Profiles &amp; Links
        </h2>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Faculty Profile Website URL">
              <input
                className={inputClass}
                value={profile.faculty_url || ""}
                onChange={(e) => onUpdateField("faculty_url", e.target.value)}
                placeholder="https://..."
              />
            </Field>
            <Field label="Profile Image Link/URL">
              <input
                className={inputClass}
                value={profile.image_url || ""}
                onChange={(e) => onUpdateField("image_url", e.target.value)}
                placeholder="https://..."
              />
            </Field>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="CV Document URL Link">
              <input
                className={inputClass}
                value={profile.cv || ""}
                onChange={(e) => onUpdateField("cv", e.target.value)}
                placeholder="https://..."
              />
            </Field>
            <Field label="Google Scholar Profile Link">
              <input
                className={inputClass}
                value={profile.googleScholar || ""}
                onChange={(e) => onUpdateField("googleScholar", e.target.value)}
                placeholder="https://scholar.google.com/..."
              />
            </Field>
            <Field label="ORCID Profile Link">
              <input
                className={inputClass}
                value={profile.orcid || ""}
                onChange={(e) => onUpdateField("orcid", e.target.value)}
                placeholder="https://orcid.org/..."
              />
            </Field>
          </div>
          <Field label="Profile Tags (comma separated)">
            <input
              className={inputClass}
              value={tagsInput}
              onChange={(e) => onUpdateTags(e.target.value)}
              placeholder="e.g. Machine Learning, NLP, Data Science"
            />
          </Field>
        </div>
      </div>

      {/* 5. Biography & Academic Summary Card */}
      <div className="rounded-2xl border border-stone-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">
          <GraduationCap className="h-5 w-5 text-stone-800" /> Biography &amp; Academic Summary
        </h2>
        <div className="space-y-4">
          <Field label="Education Summary">
            <input
              className={inputClass}
              value={profile.education || ""}
              onChange={(e) => onUpdateField("education", e.target.value)}
              placeholder="e.g. B.Tech (IIT D), M.Tech (IIT D), Ph.D (IISc)"
            />
          </Field>
          <Field label="Short Biography (for preview panels)">
            <textarea
              className={`${inputClass} min-h-20`}
              value={profile.shortBio || ""}
              onChange={(e) => onUpdateField("shortBio", e.target.value)}
              placeholder="A brief 1-2 sentence description of your professional focus..."
            />
          </Field>
          <Field label="Full Biography (detailed summary of achievements)">
            <textarea
              className={`${inputClass} min-h-36`}
              value={profile.fullBio || ""}
              onChange={(e) => onUpdateField("fullBio", e.target.value)}
              placeholder="Detailed professional biography and career milestones..."
            />
          </Field>
        </div>
      </div>

      {/* 6. Research Areas List Builder Card */}
      <div className="rounded-2xl border border-stone-300 bg-white p-5 shadow-sm">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-stone-900 border-b border-stone-100 pb-2">
          <BookOpen className="h-5 w-5 text-stone-800" /> Research Areas
        </h2>
        <div className="space-y-3">
          {(profile.researchAreas || []).map((area, index) => (
            <div key={`area-${index}`} className="rounded-xl border border-stone-200 p-3 bg-stone-50">
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
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 text-sm font-medium text-rose-700 hover:bg-rose-100 self-start"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-stone-200 bg-stone-50/50 p-4">
          <p className="mb-3 text-sm font-semibold text-stone-700">Add New Research Area</p>
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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-3 py-2 text-sm font-semibold text-white hover:bg-stone-800"
            >
              <Plus className="h-4 w-4" /> Add Area
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForms;
