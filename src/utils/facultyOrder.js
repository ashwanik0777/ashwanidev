/*
 * The order faculty are listed in across the site: the faculty directory, the school
 * faculty pages and the school dashboard's Faculty Management table.
 * By designation first, then by name (A–Z) within the same designation.
 */

export const getDesignationPriority = (designation) => {
  const desc = (designation || "").toLowerCase();

  const isDean = desc.includes("dean");
  const isAssociate = desc.includes("associate");
  const isAssistant = desc.includes("assistant");
  const isVisiting = desc.includes("visiting") || desc.includes("recognising") || desc.includes("recognizing") || desc.includes("recognised");
  const isAdjunct = desc.includes("adjunct");
  const isProf = desc.includes("prof");
  const isHod = desc.includes("hod") || desc.includes("head");

  // OCFD (contract) faculty always come last, after every permanent designation
  if (desc.includes("ocfd")) return 11;

  // 1. Professor and Dean
  if (isDean && !isAssociate && !isAssistant) return 1;

  // 2. Professor (plain professor, not associate/assistant/dean)
  if (isProf && !isAssociate && !isAssistant && !isVisiting && !isAdjunct && !isDean) return 2;

  // 3. Recognizing / Visiting Professors
  if (isVisiting) return 3;

  // 4. Adjunct Professors
  if (isAdjunct) return 4;

  // 5. Associate Professor and Dean
  if (isDean && isAssociate) return 5;

  // 6. Assistant Professor and Dean(I/C)
  if (isDean && isAssistant) return 6;

  // 7. Associate Professor
  if (isAssociate) return 7;

  // 8. Assistant Professor and HoD
  if (isAssistant && isHod) return 8;

  // 9. Assistant Professor
  if (isAssistant) return 9;

  return 10;
};

/** Array.sort comparator for faculty objects ({ designation | title, name }). */
export const sortFaculty = (a, b) => {
  const pA = getDesignationPriority(a.designation || a.title);
  const pB = getDesignationPriority(b.designation || b.title);
  if (pA !== pB) return pA - pB;

  // Sort alphabetically by name within the same category
  return (a.name || "").localeCompare(b.name || "");
};
