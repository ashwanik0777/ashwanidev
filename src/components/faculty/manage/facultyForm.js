import { getSchoolByName, matchDepartmentId, resolveSchool } from "../../../Data/schoolsMeta";
import { getCompleteness } from "../dashboard/profileStats";
import { profileLink } from "../../../utils/profileLinks";

/*
 * The school dashboard's faculty editor: turning a saved profile into form values and back.
 *
 * Saved profiles keep the school as its full name ("School of Information & Communication
 * Technology") and the department in more than one spelling ("Computer Science & Engineering"
 * next to "Department of Computer Science & Engineering"). The dropdowns use the school code
 * and the department names from schoolsMeta, so both are matched here before the form opens.
 */

const text = (value) => String(value ?? "").trim();

/** School code for a saved profile, whichever form the school was stored in. */
export const schoolCodeOf = (profile, fallback = "") => {
  const school = resolveSchool(profile?.schoolCode) || getSchoolByName(profile?.school) || resolveSchool(profile?.school);
  return school?.code || fallback;
};

/** Department dropdown entries for a school; a saved department that matches none is kept as its own entry. */
export const departmentChoices = (schoolCode, current = "") => {
  const departments = resolveSchool(schoolCode)?.departments || [];
  const choices = departments.map((dept) => ({ value: dept.name, label: dept.name }));
  const saved = text(current);
  if (saved && !choices.some((choice) => choice.value === saved)) {
    choices.push({ value: saved, label: `${saved} (current)` });
  }
  return choices;
};

/** The saved department as it appears in the dropdown. */
const departmentValue = (schoolCode, department) => {
  const saved = text(department);
  if (!saved) return "";
  const id = matchDepartmentId(schoolCode, saved);
  const match = (resolveSchool(schoolCode)?.departments || []).find((dept) => dept.id === id);
  return match?.name || saved;
};

// Research areas are saved as { title, description }; older rows may hold plain strings.
const toResearchAreas = (areas) =>
  (Array.isArray(areas) ? areas : [])
    .map((area) => (typeof area === "string" ? { title: area, description: "" } : { title: text(area?.title || area?.name), description: text(area?.description) }))
    .filter((area) => area.title || area.description);

export const EMPTY_FACULTY_FORM = {
  name: "",
  designation: "",
  department: "",
  specialization: "",
  email: "",
  phone: "",
  office: "",
  image_url: "",
  cv: "",
  googleScholar: "",
  orcid: "",
  linkedin: "",
  shortBio: "",
  fullBio: "",
  researchAreas: [],
};

/** Form values for a saved profile (or a new one when `profile` is empty). */
export const toFacultyForm = (profile, schoolCode) => {
  const code = schoolCode || schoolCodeOf(profile);
  return {
    ...EMPTY_FACULTY_FORM,
    ...Object.fromEntries(Object.keys(EMPTY_FACULTY_FORM).map((key) => [key, profile?.[key] ?? EMPTY_FACULTY_FORM[key]])),
    department: departmentValue(code, profile?.department),
    researchAreas: toResearchAreas(profile?.researchAreas),
  };
};

/** What the save sends: only the fields this form edits, so qualifications, publications and the rest stay as they are. */
export const toFacultyPayload = (form, schoolCode) => ({
  name: text(form.name),
  designation: text(form.designation),
  department: text(form.department),
  school: schoolCode,
  school_code: schoolCode,
  specialization: text(form.specialization),
  email: text(form.email).toLowerCase(),
  phone: text(form.phone),
  office: text(form.office),
  image_url: text(form.image_url),
  cv: text(form.cv),
  // Typed links are saved as full links ("www.linkedin.com/..." becomes "https://www.linkedin.com/...").
  googleScholar: profileLink(form.googleScholar, "googleScholar") || text(form.googleScholar),
  orcid: profileLink(form.orcid, "orcid") || text(form.orcid),
  linkedin: profileLink(form.linkedin, "linkedin") || text(form.linkedin),
  shortBio: text(form.shortBio),
  fullBio: text(form.fullBio),
  researchAreas: toResearchAreas(form.researchAreas),
});

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Saved numbers include "+91-...", "0120-2344200" and two numbers separated by a comma.
const PHONE = /^[0-9+\-\s(),/]{6,40}$/;

/** Field errors keyed by field name; empty when the form can be saved. */
export const validateFacultyForm = (form) => {
  const errors = {};
  if (!text(form.name)) errors.name = "Enter the faculty member's name.";
  if (!text(form.designation)) errors.designation = "Enter a designation.";
  if (!text(form.department)) errors.department = "Choose a department.";
  if (!text(form.email)) errors.email = "Enter an email address.";
  else if (!EMAIL.test(text(form.email))) errors.email = "This email address does not look right.";
  if (text(form.phone) && !PHONE.test(text(form.phone))) errors.phone = "Use digits, e.g. 9876543210 or 0120-2344200.";
  return errors;
};

/** A note under a link field when what was typed cannot be opened as a link (it is then hidden on the website). */
export const linkWarning = (form, key) =>
  text(form[key]) && !profileLink(form[key], key) ? "This is not a full link, so the website does not show it. Paste the address starting with https://" : "";

/**
 * How complete a profile is, using the same checks the faculty sees in their own dashboard.
 * Null when the list did not include whole profiles (an older backend), so no figure is guessed.
 */
export const completenessOf = (profile) => (profile && "tabData" in profile ? getCompleteness(profile) : null);

/** Colour band for a completion percentage. */
export const completionTone = (percent) => {
  if (percent >= 75) return { bar: "bg-emerald-500", text: "text-emerald-700", chip: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
  if (percent >= 40) return { bar: "bg-amber-500", text: "text-amber-700", chip: "bg-amber-50 text-amber-700 ring-amber-200" };
  return { bar: "bg-rose-500", text: "text-rose-700", chip: "bg-rose-50 text-rose-700 ring-rose-200" };
};
