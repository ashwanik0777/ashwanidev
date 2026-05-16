export const SCHOOLS_META = [
  {
    code: "SOICT",
    name: "School of Information & Communication Technology",
    shortName: "ICT",
    slug: "soict",
    matchTokens: ["ict", "information & communication technology", "soict", "usict"],
    departments: [
      { id: "cse", name: "Department of Computer Science & Engineering", shortName: "CSE" },
      { id: "it", name: "Department of Information Technology", shortName: "IT" },
      { id: "ece", name: "Department of Electronics & Communication Engineering", shortName: "ECE" },
      // { id: "cyber-security", name: "Department of Cyber Security", shortName: "Cyber Security" },
      // { id: "coedt", name: "COEIDrone Technologies", shortName: "COEIDrone" },
      // { id: "raem", name: "COEIRAEM", shortName: "COEIRAEM" },
    ],
  },
  {
    code: "SOBT",
    name: "School of Biotechnology",
    shortName: "Biotechnology",
    slug: "sobt",
    matchTokens: ["biotechnology", "sobt", "sbt"],
    departments: [
      { id: "biotechnology", name: "Department of Biotechnology", shortName: "Biotech" },
      { id: "bioinformatics", name: "Department of Bioinformatics & Computational Biology", shortName: "Bioinformatics" },
      { id: "molecular", name: "Department of Molecular Medicine & Microbial Biotechnology", shortName: "Molecular Medicine" },
    ],
  },
  {
    code: "SOBSC",
    name: "School of Buddhist Studies & Civilization",
    shortName: "Buddhist Studies",
    slug: "sobsc",
    matchTokens: ["buddhist", "buddhist studies", "sobsc", "sbsc"],
    departments: [
      { id: "buddhist-studies", name: "Department of Buddhist Studies", shortName: "Buddhist" },
      { id: "civilization", name: "Department of Civilization Studies", shortName: "Civilization" },
    ],
  },
  {
    code: "SOE",
    name: "School of Engineering",
    shortName: "Engineering",
    slug: "soe",
    matchTokens: ["engineering", "soe"],
    departments: [
      { id: "mechanical", name: "Department of Mechanical Engineering", shortName: "Mechanical" },
      { id: "civil", name: "Department of Civil Engineering", shortName: "Civil" },
      { id: "electrical", name: "Department of Electrical Engineering", shortName: "Electrical" },
      { id: "electronics", name: "Department of Electronics Engineering", shortName: "Electronics" },
    ],
  },
  {
    code: "SOL",
    name: "School of Law, Justice & Governance",
    shortName: "Law",
    slug: "sol",
    matchTokens: ["law", "legal", "justice", "sol"],
    departments: [
      { id: "law-governance", name: "Department of Law & Governance", shortName: "Law" },
      { id: "corporate", name: "Department of Corporate & Business Law", shortName: "Corporate" },
    ],
  },
  {
    code: "SOM",
    name: "School of Management",
    shortName: "Management",
    slug: "som",
    matchTokens: ["management", "som"],
    departments: [
      { id: "general-management", name: "Department of General Management", shortName: "Management" },
      { id: "finance", name: "Department of Finance", shortName: "Finance" },
      { id: "marketing", name: "Department of Marketing", shortName: "Marketing" },
    ],
  },
  {
    code: "SOHSS",
    name: "School of Humanities & Social Sciences",
    shortName: "Humanities",
    slug: "sohss",
    matchTokens: ["humanities", "social sciences", "sohss", "shss"],
    departments: [
      { id: "psychology", name: "Department of Psychology", shortName: "Psychology" },
      { id: "sociology", name: "Department of Sociology", shortName: "Sociology" },
      { id: "literature", name: "Department of Literature", shortName: "Literature" },
    ],
  },
  {
    code: "SOVS",
    name: "School of Vocational Studies & Applied Sciences",
    shortName: "Vocational",
    slug: "sovs",
    matchTokens: ["vocational", "applied sciences", "sovs", "svs"],
    departments: [
      { id: "applied-sciences", name: "Department of Applied Sciences", shortName: "Applied" },
      { id: "skill-development", name: "Department of Skill Development", shortName: "Skills" },
    ],
  },
];

export const getSchoolByCode = (code) =>
  SCHOOLS_META.find(
    (school) => school.code.toLowerCase() === String(code || "").toLowerCase()
  ) || null;

export const getSchoolBySlug = (slug) =>
  SCHOOLS_META.find(
    (school) => school.slug === String(slug || "").toLowerCase()
  ) || null;

export const getSchoolByName = (name) => {
  if (!name) return null;
  const needle = String(name).toLowerCase();
  return (
    SCHOOLS_META.find((school) =>
      [school.name, school.shortName, school.code, school.slug]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase() === needle)
    ) || null
  );
};

/** Resolve a shortCode from the URL (e.g. "SOICT", "soict", or legacy "ict") to a SCHOOLS_META entry */
export const resolveSchool = (shortCode) => {
  if (!shortCode) return null;
  const needle = String(shortCode).toLowerCase();
  return (
    SCHOOLS_META.find(
      (s) =>
        s.code.toLowerCase() === needle ||
        s.slug === needle ||
        s.shortName.toLowerCase() === needle ||
        s.matchTokens.includes(needle)
    ) || null
  );
};

export const getDepartmentsForSchool = (code) => {
  const school = getSchoolByCode(code);
  return school?.departments || [];
};

export const matchDepartmentId = (code, departmentName) => {
  if (!departmentName) return "";
  const departments = getDepartmentsForSchool(code);
  const needle = String(departmentName).toLowerCase();
  const exact = departments.find(
    (dept) => String(dept.name).toLowerCase() === needle
  );
  if (exact) return exact.id;

  const partial = departments.find((dept) =>
    needle.includes(String(dept.shortName || dept.name).toLowerCase())
  );
  return partial?.id || "";
};

/** Legacy compatibility — resolve by API param or slug */
export const getSchoolByApiParam = (apiParam) => {
  if (!apiParam) return null;
  return resolveSchool(apiParam);
};
