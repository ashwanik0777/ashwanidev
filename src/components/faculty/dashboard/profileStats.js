// Counts and profile-completeness figures shared by the sidebar and the dashboard overview.

const listLength = (value) => (Array.isArray(value) ? value.length : 0);
const hasText = (value) => typeof value === "string" && value.trim().length > 0;

export const getSectionCounts = (profile) => {
  const tab = profile?.tabData || {};
  const group = tab.researchGroup || {};
  return {
    "qualifications": listLength(tab.qualifications?.qualifications) + listLength(tab.qualifications?.experience),
    "certifications": listLength(tab.certifications?.certifications) + listLength(tab.certifications?.professionalDevelopment),
    "teaching": listLength(tab.teaching?.courses),
    "administration": listLength(tab.administration?.administrativeRoles) + listLength(tab.administration?.committees),
    "research-projects":
      listLength(tab.researchProjects?.projects) +
      listLength(group.phdScholars) + listLength(group.postdocs) + listLength(group.researchAssistants),
    "publications": listLength(tab.publications?.publications) + listLength(tab.patents?.patents),
    "talks": listLength(tab.talks?.invitedTalks),
    "awards": listLength(tab.awards?.awards) + listLength(tab.socialImpact?.socialActivities),
  };
};

export const getHeadlineStats = (profile) => {
  const tab = profile?.tabData || {};
  const publications = listLength(tab.publications?.publications);
  return {
    publications: publications || Number(profile?.publications) || 0,
    projects: listLength(tab.researchProjects?.projects),
    phdScholars: listLength(tab.researchGroup?.phdScholars),
    talks: listLength(tab.talks?.invitedTalks),
    awards: listLength(tab.awards?.awards),
  };
};

// Each check is one thing a visitor looks for on the public profile, and the section where it is added.
export const getCompleteness = (profile) => {
  const tab = profile?.tabData || {};
  const checks = [
    { label: "Profile photo", section: "personal-details", done: hasText(profile?.image_url) },
    { label: "Specialization", section: "personal-details", done: hasText(profile?.specialization) },
    { label: "Short biography", section: "personal-details", done: hasText(profile?.shortBio) },
    { label: "Full biography", section: "personal-details", done: hasText(profile?.fullBio) },
    { label: "Phone or office", section: "personal-details", done: hasText(profile?.phone) || hasText(profile?.office) },
    { label: "CV", section: "personal-details", done: hasText(profile?.cv) },
    { label: "Google Scholar or ORCID", section: "personal-details", done: hasText(profile?.googleScholar) || hasText(profile?.orcid) },
    { label: "Research areas", section: "personal-details", done: listLength(profile?.researchAreas) > 0 },
    { label: "Degrees", section: "qualifications", done: listLength(tab.qualifications?.qualifications) > 0 },
    { label: "Work experience", section: "qualifications", done: listLength(tab.qualifications?.experience) > 0 },
    // Total experience is worked out from these dates, so an entry without a start date counts for nothing.
    {
      label: "Start dates on all experience entries",
      section: "qualifications",
      done: (tab.qualifications?.experience || []).every((entry) => hasText(entry?.from)),
    },
    { label: "Courses taught", section: "teaching", done: listLength(tab.teaching?.courses) > 0 },
    { label: "Publications", section: "publications", done: listLength(tab.publications?.publications) > 0 },
  ];
  const done = checks.filter((item) => item.done).length;
  return { percent: Math.round((done / checks.length) * 100), checks };
};
