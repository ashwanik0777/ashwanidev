import { asArray, asText, pickText } from "./fieldUtils";

/*
 * What the public faculty profile actually has to show.
 *
 * The dashboard editor seeds every new row with defaults (a status, a type, the
 * current year), so a row the faculty added and never filled in still looks like
 * data. An entry only counts here when its main field (title, name, degree...)
 * is filled. The tabs read their lists from `facultySections`, and the page
 * hides every tab, sub-tab and section whose list is empty, so the same rule
 * decides both what is shown and what is hidden.
 */

const filled = (list, keys) =>
  asArray(list).filter((item) => (typeof item === "string" ? asText(item) : pickText(item, keys)));

export const facultySections = (profile) => {
  const tabData = profile?.tabData || {};
  const patents = filled(tabData.publications?.patents, ["title", "name"]);

  return {
    shortBio: asText(profile?.shortBio),
    fullBio: asText(profile?.fullBio),
    researchAreas: filled(profile?.researchAreas, ["title", "name"]),

    qualifications: filled(tabData.qualifications?.qualifications, ["degree", "institution", "specialization"]),
    experience: filled(tabData.qualifications?.experience, ["position", "institution", "department"]),

    certifications: filled(tabData.certifications?.certifications, ["title", "name"]),
    professionalDevelopment: filled(tabData.certifications?.professionalDevelopment, ["title", "programName", "name"]),

    teachingPhilosophy: asText(tabData.teaching?.philosophy),
    courses: filled(tabData.teaching?.courses, ["name", "title", "courseTitle", "code", "courseCode"]),

    administrativeRoles: filled(tabData.administration?.administrativeRoles, ["role", "title", "position"]),
    committees: filled(tabData.administration?.committees, ["name", "title"]),

    projects: filled(tabData.researchProjects?.projects, ["title", "name"]),
    phdScholars: filled(tabData.researchGroup?.phdScholars, ["name"]),
    postdocs: filled(tabData.researchGroup?.postdocs, ["name"]),
    researchAssistants: filled(tabData.researchGroup?.researchAssistants, ["name"]),

    publications: filled(tabData.publications?.publications, ["title", "name", "chapterTitle", "bookTitle"]),
    // The dashboard saves patents under publications.patents; older profiles used patents.patents.
    patents: patents.length ? patents : filled(tabData.patents?.patents, ["title", "name"]),

    talks: filled(tabData.talks?.invitedTalks, ["title", "topic", "event", "eventName", "conference"]),

    awards: filled(tabData.awards?.awards, ["title", "name"]),
    socialActivities: filled(tabData.socialImpact?.socialActivities, ["title", "name"]),

    otherMessage: asText(tabData.other?.message),
  };
};

/** Whether each profile tab has anything to show. */
export const TAB_HAS_DATA = {
  overview: (s) => Boolean(s.shortBio || s.fullBio || s.researchAreas.length),
  qualifications: (s) => s.qualifications.length > 0 || s.experience.length > 0,
  certifications: (s) => s.certifications.length > 0 || s.professionalDevelopment.length > 0,
  teaching: (s) => Boolean(s.teachingPhilosophy) || s.courses.length > 0,
  administration: (s) => s.administrativeRoles.length > 0 || s.committees.length > 0,
  "research-projects": (s) =>
    s.projects.length > 0 || s.phdScholars.length > 0 || s.postdocs.length > 0 || s.researchAssistants.length > 0,
  publications: (s) => s.publications.length > 0 || s.patents.length > 0,
  talks: (s) => s.talks.length > 0,
  awards: (s) => s.awards.length > 0 || s.socialActivities.length > 0,
  other: (s) => Boolean(s.otherMessage),
};

/** Stat tiles with nothing to count (0, "", "--") are left out. */
export const withValue = (stats) =>
  stats.filter(({ value }) => {
    if (typeof value === "number") return Number.isFinite(value) && value > 0;
    const text = asText(value);
    return text !== "" && text !== "0" && !/^[-—]+$/.test(text);
  });
