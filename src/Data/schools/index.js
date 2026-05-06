import * as SOICT from "./SOICT";
import * as SOBT from "./SOBT";
import * as SOE from "./SOE";
import * as SOBSC from "./SOBSC";
import * as SOL from "./SOL";
import * as SOM from "./SOM";
import * as SOHSS from "./SOHSS";
import * as SOVS from "./SOVS";

export const SCHOOL_MODULES = [SOICT, SOBT, SOE, SOBSC, SOL, SOM, SOHSS, SOVS];

export const SCHOOL_DIRECTORY = SCHOOL_MODULES.map((school) => ({
  code: school.SCHOOL_CODE,
  name: school.SCHOOL_NAME,
  short: school.SCHOOL_SHORT,
  contactInfo: school.contactInfo,
  aboutData: school.aboutData,
  departmentPages: school.departmentPages,
  researchPages: school.researchPages,
}));

export const SCHOOL_CARDS = SCHOOL_MODULES.map((school) => ({
  ...school.schoolCard,
  code: school.SCHOOL_CODE,
  name: school.SCHOOL_NAME,
  path: school.schoolCard?.path || `/schools/${school.SCHOOL_CODE}`,
}));

export const SCHOOL_FILTERS = [
  "All Schools",
  ...SCHOOL_MODULES.map((school) => school.SCHOOL_NAME),
];

export const SCHOOL_DEPARTMENTS = SCHOOL_MODULES.flatMap((school) =>
  (school.departmentPages || []).map((dept) => ({
    schoolCode: school.SCHOOL_CODE,
    schoolName: school.SCHOOL_NAME,
    id: dept.id,
    name: dept.name,
    path: dept.path,
  }))
);

export const ADMISSIONS_CATEGORIES = SCHOOL_MODULES.reduce((acc, school) => {
  if (school.admissionsKey && school.admissions) {
    acc[school.admissionsKey] = school.admissions;
  }
  return acc;
}, {});

export const ADMISSIONS_SCHOOL_BUTTONS = SCHOOL_MODULES
  .filter((school) => school.admissionsKey)
  .map((school) => ({
    id: school.admissionsKey,
    label: school.admissionsShortLabel || school.admissionsKey,
    tooltip: school.admissionsLabel || school.admissionsKey,
  }));

export const COURSE_APPLICATIONS = SCHOOL_MODULES.reduce((acc, school) => {
  if (school.courseApplicationsKey && school.courseApplications) {
    acc[school.courseApplicationsKey] = school.courseApplications;
  }
  return acc;
}, {});

export const COURSE_APPLICATION_SCHOOLS = SCHOOL_MODULES
  .filter((school) => school.courseApplicationsKey)
  .map((school) => ({
    id: school.courseApplicationsKey,
    label: school.courseApplicationsLabel || school.courseApplicationsKey,
  }));

export const RESEARCH_CENTERS = SCHOOL_MODULES.flatMap(
  (school) => school.researchCenters || []
);

export const SCHOOL_BADGES = SCHOOL_MODULES.reduce((acc, school) => {
  if (school.admissionsLabel && school.schoolBadge) {
    acc[school.admissionsLabel] = school.schoolBadge;
  }
  return acc;
}, {});

export const getSchoolModuleByCode = (code) =>
  SCHOOL_MODULES.find((school) => school.SCHOOL_CODE === code);
