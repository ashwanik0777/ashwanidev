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

export const RESEARCH_CENTERS = [
  {
    id: 1,
    name: "Center of Excellence in Drone Technologies (CEDT)",
    shortName: "CEDT - GBURIF",
    school: "School of Information & Communication Technology",
    established: 2022,
    head: "Dr. Vimlesh Kumar",
    location: "AIC-GBU Incubation Complex",
    description: "DGCA-certified drone pilot training and UAV research facility. Specializes in drone flight testing, autonomous aerial navigation, agricultural payload integration, and tactical UAV defense systems.",
    facilities: ["UAV Flight Arena", "DGCA Flight Simulator", "Drone Assembly & Maintenance Lab", "Payload Testing Unit"],
    researchAreas: ["Drone Technologies", "Autonomous Navigation", "Aerial Intelligence"],
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    portalLink: "https://cedtgbu.wixsite.com/home"
  },
  {
    id: 2,
    name: "Center of Excellence in Renewable Energy & Advanced Manufacturing (REAM)",
    shortName: "REAM - GBURIF",
    school: "School of Engineering",
    established: 2021,
    head: "Dr. Anurag Singh Bhagat",
    location: "GBURIF Research Block",
    description: "Advanced research center dedicated to solar-wind microgrid integration, thermal protection coating materials, EV drivetrain benchmarking, battery management systems, and additive manufacturing.",
    facilities: ["Microgrid Controller Bench", "EV Battery Management System Lab", "3D Additive Printer", "Thermal Coating Station"],
    researchAreas: ["Renewable Energy", "EV Infrastructure", "Advanced Manufacturing"],
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    portalLink: "https://gburif.org/coe.php"
  },
  {
    id: 3,
    name: "Center of Excellence in Artificial Intelligence & Robotics (CoE-AI)",
    shortName: "CoE-AI - GBURIF",
    school: "School of Information & Communication Technology",
    established: 2020,
    head: "Dr. Vidushi Sharma",
    location: "SOICT AI Research Lab",
    description: "Interdisciplinary AI research hub focusing on deep learning, computer vision algorithms, NLP voice-interactive humanoid robotics, edge AI deployment, and predictive smart analytics.",
    facilities: ["NVIDIA GPU HPC Cluster", "Humanoid Robotics Rig", "Computer Vision Workstations", "Edge AI Bench"],
    researchAreas: ["Artificial Intelligence", "Robotics", "Deep Learning"],
    image: "/coe_ai_robotics.png",
    portalLink: "https://gburif.org/coe.php"
  }
];

export const SCHOOL_BADGES = SCHOOL_MODULES.reduce((acc, school) => {
  if (school.admissionsLabel && school.schoolBadge) {
    acc[school.admissionsLabel] = school.schoolBadge;
  }
  return acc;
}, {});

export const getSchoolModuleByCode = (code) =>
  SCHOOL_MODULES.find((school) => school.SCHOOL_CODE === code);
