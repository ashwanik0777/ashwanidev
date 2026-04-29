const SCHOOL_META = {
  ict: {
    name: "Information & Communication Technology",
    matchTokens: ["ict", "information & communication technology", "soict", "usict"],
    apiParam: "soict",
  },
  biotechnology: {
    name: "Biotechnology",
    matchTokens: ["biotechnology", "sbt"],
    apiParam: "sbt",
  },
  buddhist: {
    name: "Buddhist Studies & Civilization",
    matchTokens: ["buddhist", "buddhist studies", "sbsc"],
    apiParam: "sbsc",
  },
  engineering: {
    name: "Engineering",
    matchTokens: ["engineering", "soe"],
    apiParam: "soe",
  },
  humanities: {
    name: "Humanities & Social Sciences",
    matchTokens: ["humanities", "social sciences", "shss"],
    apiParam: "shss",
  },
  law: {
    name: "Law, Justice and Governance",
    matchTokens: ["law", "legal", "justice", "sol"],
    apiParam: "sol",
  },
  management: {
    name: "Management",
    matchTokens: ["management", "som"],
    apiParam: "som",
  },
  vocational: {
    name: "Vocational Studies & Applied Sciences",
    matchTokens: ["vocational", "applied sciences", "svs"],
    apiParam: "svs",
  },
};

export const getSchoolMeta = (shortCode) => {
  if (!shortCode) {
    return { name: "GBU", matchTokens: ["gbu"] };
  }

  return SCHOOL_META[shortCode] || {
    name: shortCode.toUpperCase(),
    matchTokens: [String(shortCode).toLowerCase()],
  };
};
