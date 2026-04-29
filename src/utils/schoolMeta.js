import { SCHOOLS_META } from "../Data/schoolsMeta";

const SCHOOL_META = SCHOOLS_META.reduce((acc, school) => {
  acc[school.code] = {
    name: school.name,
    matchTokens: school.matchTokens || [],
    apiParam: school.apiParam || "",
  };
  return acc;
}, {});

export const getSchoolMeta = (shortCode) => {
  if (!shortCode) {
    return { name: "GBU", matchTokens: ["gbu"] };
  }

  return SCHOOL_META[shortCode] || {
    name: shortCode.toUpperCase(),
    matchTokens: [String(shortCode).toLowerCase()],
  };
};
