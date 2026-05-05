import { SCHOOLS_META, resolveSchool } from "../Data/schoolsMeta";

const SCHOOL_META = SCHOOLS_META.reduce((acc, school) => {
  acc[school.code] = {
    name: school.name,
    shortName: school.shortName,
    slug: school.slug,
    matchTokens: school.matchTokens || [],
    apiParam: school.slug || school.code.toLowerCase(),
  };
  return acc;
}, {});

export const getSchoolMeta = (shortCode) => {
  if (!shortCode) {
    return { name: "GBU", matchTokens: ["gbu"], apiParam: "" };
  }

  // Try direct match first
  if (SCHOOL_META[shortCode]) {
    return SCHOOL_META[shortCode];
  }

  // Try resolving via resolveSchool (handles legacy codes like "ict")
  const resolved = resolveSchool(shortCode);
  if (resolved && SCHOOL_META[resolved.code]) {
    return SCHOOL_META[resolved.code];
  }

  return {
    name: shortCode.toUpperCase(),
    matchTokens: [String(shortCode).toLowerCase()],
    apiParam: String(shortCode).toLowerCase(),
  };
};
