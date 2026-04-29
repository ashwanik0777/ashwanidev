export const SCHOOLS_META = [
  {
    code: "ict",
    name: "School of Information and Communication Technology",
    shortName: "ICT",
    apiParam: "soict",
    matchTokens: ["ict", "information & communication technology", "soict", "usict"],
    departments: [
      {
        id: "cse",
        name: "Department of Computer Science & Engineering",
        shortName: "CSE",
      },
      {
        id: "it",
        name: "Department of Information Technology",
        shortName: "IT",
      },
      {
        id: "ece",
        name: "Department of Electronics & Communication Engineering",
        shortName: "ECE",
      },
      {
        id: "cyber-security",
        name: "Department of Cyber Security",
        shortName: "Cyber Security",
      },
      {
        id: "coedt",
        name: "COEIDrone Technologies",
        shortName: "COEIDrone",
      },
      {
        id: "raem",
        name: "COEIRAEM",
        shortName: "COEIRAEM",
      },
    ],
  },
  {
    code: "biotechnology",
    name: "School of Biotechnology",
    shortName: "Biotechnology",
    apiParam: "sbt",
    matchTokens: ["biotechnology", "sbt"],
    departments: [
      { id: "biotechnology", name: "Department of Biotechnology", shortName: "Biotech" },
      { id: "bioinformatics", name: "Department of Bioinformatics", shortName: "Bioinformatics" },
      { id: "life-sciences", name: "Department of Life Sciences", shortName: "Life Sciences" },
    ],
  },
  {
    code: "buddhist",
    name: "School of Buddhist Studies & Civilization",
    shortName: "Buddhist Studies",
    apiParam: "sbsc",
    matchTokens: ["buddhist", "buddhist studies", "sbsc"],
    departments: [
      { id: "buddhist-studies", name: "Department of Buddhist Studies", shortName: "Buddhist" },
      { id: "civilization", name: "Department of Civilization Studies", shortName: "Civilization" },
    ],
  },
  {
    code: "engineering",
    name: "School of Engineering",
    shortName: "Engineering",
    apiParam: "soe",
    matchTokens: ["engineering", "soe"],
    departments: [
      { id: "mechanical", name: "Department of Mechanical Engineering", shortName: "Mechanical" },
      { id: "civil", name: "Department of Civil Engineering", shortName: "Civil" },
      { id: "electrical", name: "Department of Electrical Engineering", shortName: "Electrical" },
      { id: "electronics", name: "Department of Electronics Engineering", shortName: "Electronics" },
    ],
  },
  {
    code: "law",
    name: "School of Law, Justice and Governance",
    shortName: "Law",
    apiParam: "sol",
    matchTokens: ["law", "legal", "justice", "sol"],
    departments: [
      { id: "law-governance", name: "Department of Law & Governance", shortName: "Law" },
      { id: "corporate", name: "Department of Corporate & Business Law", shortName: "Corporate" },
    ],
  },
  {
    code: "management",
    name: "School of Management",
    shortName: "Management",
    apiParam: "som",
    matchTokens: ["management", "som"],
    departments: [
      { id: "general-management", name: "Department of General Management", shortName: "Management" },
      { id: "finance", name: "Department of Finance", shortName: "Finance" },
      { id: "marketing", name: "Department of Marketing", shortName: "Marketing" },
    ],
  },
  {
    code: "humanities",
    name: "School of Humanities & Social Sciences",
    shortName: "Humanities",
    apiParam: "shss",
    matchTokens: ["humanities", "social sciences", "shss"],
    departments: [
      { id: "psychology", name: "Department of Psychology", shortName: "Psychology" },
      { id: "sociology", name: "Department of Sociology", shortName: "Sociology" },
      { id: "literature", name: "Department of Literature", shortName: "Literature" },
    ],
  },
  {
    code: "vocational",
    name: "School of Vocational Studies & Applied Sciences",
    shortName: "Vocational",
    apiParam: "svs",
    matchTokens: ["vocational", "applied sciences", "svs"],
    departments: [
      { id: "applied-sciences", name: "Department of Applied Sciences", shortName: "Applied" },
      { id: "skill-development", name: "Department of Skill Development", shortName: "Skills" },
    ],
  },
];

export const getSchoolByCode = (code) =>
  SCHOOLS_META.find((school) => school.code === code) || null;

export const getSchoolByApiParam = (apiParam) =>
  SCHOOLS_META.find((school) => school.apiParam === apiParam) || null;

export const getSchoolByName = (name) => {
  if (!name) return null;
  const needle = String(name).toLowerCase();
  return (
    SCHOOLS_META.find((school) =>
      [school.name, school.shortName, school.code, school.apiParam]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase() === needle)
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
