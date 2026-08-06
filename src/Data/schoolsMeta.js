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
      { id: "biotechnology", name: "Biotechnology", shortName: "Biotech" },
      { id: "bioinformatics", name: "Bioinformatics & Computational Biology", shortName: "Bioinformatics" },
      { id: "molecular", name: "Molecular Medicine & Microbial Biotechnology", shortName: "Molecular Medicine" },
    ],
  },
  {
    code: "SOBSC",
    name: "School of Buddhist Studies & Civilization",
    shortName: "Buddhist Studies",
    slug: "sobsc",
    matchTokens: ["buddhist", "buddhist studies", "sobsc", "sbsc"],
    departments: [
      { id: "buddhist-studies", name: "Buddhist Studies & Civilization", shortName: "Buddhist Studies" },
    ],
  },
  {
    code: "SOE",
    name: "School of Engineering",
    shortName: "Engineering",
    slug: "soe",
    matchTokens: ["engineering", "soe"],
    departments: [
      { id: "mechanical", name: "Mechanical Engineering", shortName: "Mechanical" },
      { id: "civil", name: "Civil Engineering", shortName: "Civil" },
      { id: "electrical", name: "Electrical Engineering", shortName: "Electrical" },
      { id: "automobile", name: "Automobile Engineering", shortName: "Automobile" },
      { id: "architecture", name: "Architecture & Planning", shortName: "Architecture" },
    ],
  },
  {
    code: "SOL",
    name: "School of Law, Justice & Governance",
    shortName: "Law",
    slug: "sol",
    matchTokens: ["law", "legal", "justice", "sol"],
    departments: [
      { id: "law-governance", name: "Law, Justice & Governance", shortName: "Law" },
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
      { id: "business-management", name: "Management", shortName: "Management" },
      { id: "finance", name: "Finance (Specialization)", shortName: "Finance" },
      { id: "marketing", name: "Marketing (Specialization)", shortName: "Marketing" },
      { id: "human-resource-management", name: "HRM (Specialization)", shortName: "HRM" },
    ],
  },
  {
    code: "SOHSS",
    name: "School of Humanities & Social Sciences",
    shortName: "Humanities",
    slug: "sohss",
    matchTokens: ["humanities", "social sciences", "sohss", "shss"],
    departments: [
      { id: "english", name: "Department of English & Modern European Languages", shortName: "English" },
      { id: "indian-languages", name: "Department of Indian Languages & Literature", shortName: "Indian Languages" },
      { id: "mass-communication", name: "Department of Mass Communication & Media Studies", shortName: "Mass Communication" },
      { id: "economics", name: "Department of Economics, Planning & Development", shortName: "Economics" },
      { id: "education-training", name: "Department of Education & Training", shortName: "Education" },
      { id: "history-civilization", name: "Department of History & Civilization", shortName: "History" },
      { id: "political-science", name: "Department of Political Science & International Relations", shortName: "Political Science" },
      { id: "psychology", name: "Department of Psychology & Mental Health", shortName: "Psychology" },
      { id: "public-administration", name: "Department of Public Administration, Governance & Policy Research", shortName: "Public Admin" },
      { id: "social-work", name: "Department of Social Work", shortName: "Social Work" },
      { id: "sociology", name: "Department of Sociology", shortName: "Sociology" },
      { id: "library-information-science", name: "Department of Library & Information Science", shortName: "Library Science" },
    ],
  },
  {
    code: "SOVS",
    name: "School of Vocational Studies & Applied Sciences",
    shortName: "Vocational",
    slug: "sovs",
    matchTokens: ["vocational", "applied sciences", "sovs", "svs"],
    departments: [
      { id: "applied-mathematics", name: "Department of Applied Mathematics", shortName: "Mathematics" },
      { id: "applied-chemistry", name: "Department of Applied Chemistry", shortName: "Chemistry" },
      { id: "applied-physics", name: "Department of Applied Physics", shortName: "Physics" },
      { id: "environmental-science", name: "Environmental Science", shortName: "Environmental Science" },
      { id: "food-processing-technology", name: "Food Processing Technology", shortName: "Food Tech" },
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
  const needle = String(departmentName).toLowerCase().replace(/^department of\s+/i, "").trim();
  
  const exact = departments.find(
    (dept) => String(dept.name).toLowerCase().replace(/^department of\s+/i, "").trim() === needle
  );
  if (exact) return exact.id;

  const partial = departments.find((dept) => {
    const deptNeedle = String(dept.shortName || dept.name).toLowerCase().replace(/^department of\s+/i, "").trim();
    return needle.includes(deptNeedle) || deptNeedle.includes(needle);
  });
  return partial?.id || "";
};

/** Legacy compatibility — resolve by API param or slug */
export const getSchoolByApiParam = (apiParam) => {
  if (!apiParam) return null;
  return resolveSchool(apiParam);
};
