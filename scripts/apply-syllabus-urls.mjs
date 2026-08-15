import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dataRoot = path.join(root, "src", "Data", "schools");
const downloadsRoot = path.join(root, "public", "gbu_downloads");
const schoolsPublicRoot = path.join(root, "public", "schools");

const DEPT_FOLDERS = {
  "computer-science--engineering": "cse",
  "information-technology": "it",
  "electronics--communication-engineering": "ece",
};

/** deptFile (without .jsx) -> program title -> PDF path relative to public/gbu_downloads */
const SYLLABUS_MAP = {
  "SOICT/departments/computer-science--engineering": {
    "B.Tech Computer Science & Engineering":
      "SOICT/documents/Prog-Str-BTechCSE-Batch-2026-30.pdf",
    "M.Tech Computer Science & Engineering":
      "SOICT/documents/MTech_CSE_Syllabus_WP.pdf",
    "PhD Computer Science": "SOICT/documents/PHD.pdf",
  },
  "SOICT/departments/information-technology": {
    "B.Tech Information Technology":
      "SOICT/documents/2026_2030_B.Tech._IT_.docx.pdf",
    "M.Tech Information Technology":
      "SOICT/documents/M.Tech_Syllabus_Software_Engineering.pdf",
    "Ph.D. in Information Technology": "SOICT/documents/PHD.pdf",
  },
  "SOICT/departments/electronics--communication-engineering": {
    "B.Tech Electronics & Communication Engineering":
      "SOICT/documents/Syllabus_B.Tech(ECE)-2024_onward_.pdf",
    "M.Tech Electronics & Communication Engineering":
      "SOICT/documents/M.Tech._Wireless_Communication_and_Networks_Scheme_and_Syllabi.pdf",
    "PhD Electronics & Communication": "SOICT/documents/PHD.pdf",
  },
  "SOE/departments/civil": {
    "B.Tech Civil Engineering": "SOE/pdfs/Syllabus_CivilEngg_April23.pdf",
    "M.Tech Structural Engineering":
      "SOE/pdfs/M.Tech_StructuralEngg_CStr_May2023.pdf",
    "M.Tech Environmental Engineering":
      "SOE/pdfs/Mtech_Geotechnical_GeoEnvrtEnggCStr_May2023.pdf",
    "Ph.D. in Civil Engineering": "SOE/pdfs/CourseStr_CivilEngg_April23.pdf",
  },
  "SOE/departments/mechanical": {
    "B.Tech Mechanical Engineering":
      "SOE/pdfs/B._Tech_MechEngg_CStr_April2023.pdf",
    "M.Tech Thermal Engineering": "SOE/pdfs/M._Tech_Thermal_ME_Syllabus.pdf",
    "M.Tech Production & Industrial Engineering":
      "SOE/pdfs/M._Tech_Design_Manufng__ThermalEngg_CStr_April2023.pdf",
    "Ph.D. in Mechanical Engineering": "SOE/pdfs/PhD_ME_May2023.pdf",
  },
  "SOE/departments/electrical": {
    "B.Tech Electrical Engineering":
      "SOE/pdfs/4yrBTech_Electrical_CompEngg_May2023.pdf",
    "Integrated B.Tech–M.Tech/MBA (EE)":
      "SOE/pdfs/IntegratedBTech_MTech_MBA_May2023.pdf",
    "M.Tech Power Systems / Power Electronics":
      "SOE/pdfs/M.Tech.__WP_Electrical_All.pdf",
    "Ph.D. in Electrical Engineering":
      "SOE/pdfs/PhD_ElectricalElectronicsEngg_May2023.pdf",
  },
  "SOE/departments/automobile": {
    "B.Tech Automobile Engineering":
      "SOE/pdfs/BTech_ME__AutomobileIndustrialEnggCStr_Fac.pdf",
    "Ph.D. in Automobile Engineering": "SOE/pdfs/PhD_ME_May2023.pdf",
  },
  "SOBT/departments/biotechnology": {
    "Integrated B.Tech–M.Tech Biotechnology":
      "SOBT/pdfs/CStr_IntBTechMTech-2023onwards.pdf",
    "M.Sc Biotechnology (DBT Sponsored)":
      "SOBT/pdfs/Course_Struture_M.Sc._Biotech.pdf",
    "M.Tech Biotechnology": "SOBT/pdfs/Course_Struture_MTech_2020_onwards.pdf",
    "Ph.D. in Biotechnology":
      "SOBT/pdfs/Course_Structure_PHD_2020_onwards.pdf",
  },
  "SOBT/departments/bioinformatics": {
    "M.Sc Bioinformatics & Genomics":
      "SOBT/pdfs/MSc_Bioinformatics_CourseContent.pdf",
    "Ph.D. in Bioinformatics":
      "SOBT/pdfs/Course_Structure_PHD_2020_onwards.pdf",
  },
  "SOBT/departments/molecular": {
    "M.Sc Molecular Medicine": "SOBT/pdfs/MSc-MolMed-CStr.pdf",
    "M.Sc Microbial Biotechnology":
      "SOBT/pdfs/CStr-MSc-LSM-16apr25.pdf",
    "Ph.D. in Molecular Biology / Microbiology":
      "SOBT/pdfs/Course_Structure_PHD_2020_onwards.pdf",
  },
  "SOVS/departments/applied-physics": {
    "B.Sc. (Hons.) Physics": "SOVSAS/pdfs/B.ScH-Physics-CSsyllabus.pdf",
    "M.Sc. Applied Physics":
      "SOVSAS/pdfs/CBCS-M.Sc.Physics-CS-Syllabus-2024-26.pdf",
    "Ph.D. Applied Physics": "SOVSAS/pdfs/Ph.D_Physics_CS_Aug2023.pdf",
  },
  "SOVS/departments/applied-chemistry": {
    "B.Sc. (Hons.) Chemistry": "SOVSAS/pdfs/B.Sc_Hons._Chem_June2023.pdf",
    "M.Sc. Applied Chemistry":
      "SOVSAS/pdfs/M.Sc_Chemistry_Syllabus_June2023.pdf",
    "Ph.D. Applied Chemistry": "SOVSAS/pdfs/M.Sc_Chemistry_Syllabus_June2023.pdf",
  },
  "SOVS/departments/applied-mathematics": {
    "B.Sc. (Hons.) Mathematics": "SOVSAS/pdfs/BSC_MES_CStr_May2023.pdf",
    "M.Sc. Applied Mathematics": "SOVSAS/pdfs/BTech_MathsComputing.pdf",
    "Ph.D. Applied Mathematics": "SOVSAS/pdfs/PhD_Maths.pdf",
  },
  "SOVS/departments/environmental-science": {
    "M.Sc. Environmental Sciences":
      "SOVSAS/pdfs/CStr__MScEnvScience_April23.pdf",
    "Ph.D. Environmental Sciences":
      "SOVSAS/pdfs/Syll_PhD_DES_Specific_April23.pdf",
  },
  "SOVS/departments/food-processing-technology": {
    "B.Tech. Food Processing & Technology":
      "SOVSAS/pdfs/B.Tech_FPT_CStr_May2023.pdf",
    "B.Voc. Food Processing": "SOVSAS/pdfs/B.Tech_FPT_CStr_May2023.pdf",
    "M.Tech. Food Processing & Technology":
      "SOVSAS/pdfs/PhD_FPT_CS_21March24.pdf",
    "Ph.D. Food Processing & Technology":
      "SOVSAS/pdfs/PhD_FPT_CS_21March24.pdf",
  },
  "SOHSS/departments/economics": {
    "B.A. (Hons.) Economics": "SOHSS/pdfs/BA-Eco-CStr.pdf",
    "M.A. Economics": "SOHSS/pdfs/CStr-Eco-Uptd-Mar2025.pdf",
    "Ph.D. Economics": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/english": {
    "B.A. (Hons.) English": "SOHSS/pdfs/structure_of-BA_English-NEP.pdf",
    "M.A. English": "SOHSS/pdfs/MA-English-CStr.pdf",
    "Ph.D. English": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/history-civilization": {
    "B.A. (Hons.) History": "SOHSS/pdfs/History-CStrt.pdf",
    "M.A. History": "SOHSS/pdfs/History-CStrt.pdf",
    "Ph.D. History": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/indian-languages": {
    "B.A. (Hons.) Hindi": "SOHSS/pdfs/CStr-Hindi-March2025.pdf",
    "M.A. Hindi": "SOHSS/pdfs/CStr-Hindi-March2025.pdf",
    "B.A. (Hons.) Sanskrit": "SOHSS/pdfs/BA_Sanskrit_CStr.pdf",
    "M.A. Urdu": "SOHSS/pdfs/CStr-Hindi-March2025.pdf",
    "Ph.D. Hindi": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/political-science": {
    "B.A. (Hons.) Political Science":
      "SOHSS/pdfs/DeptBrochure-CStr-PolSci1.pdf",
    "M.A. Political Science": "SOHSS/pdfs/DeptBrochure-CStr-PolSci1.pdf",
    "M.A. Political Science & International Relations":
      "SOHSS/pdfs/BA_PIR_STr_May2023.pdf",
    "Ph.D. Political Science": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/psychology": {
    "B.A./B.Sc. (Hons.) Applied Psychology with Research":
      "SOHSS/pdfs/Psychology_MentalHealth_CStr_May2023.pdf",
    "M.A./M.Sc. Applied Psychology":
      "SOHSS/pdfs/Psychology_MentalHealth_CStr_May2023.pdf",
    "M.Phil. Clinical Psychology":
      "SOHSS/pdfs/Psychology_MentalHealth_CStr_May2023.pdf",
    "Ph.D. Psychology": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/sociology": {
    "M.A. Sociology": "SOHSS/pdfs/MA-Sociology-Ctr2025.pdf",
    "Ph.D. Sociology": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/public-administration": {
    "M.A. Public Administration": "SOHSS/pdfs/Structure_-PhD.pdf",
    "Ph.D. Public Administration": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/social-work": {
    "BSW (Bachelor of Social Work)": "SOHSS/pdfs/CStr-SocialWork-NEP.pdf",
    "MSW (Master of Social Work)": "SOHSS/pdfs/CStr-SocialWork-NEP.pdf",
    "Ph.D. Social Work": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/education-training": {
    "B.Ed.": "SOHSS/pdfs/BeD_Prog.pdf",
    "B.Sc B.Ed./B.Com. B.Ed./B.A. B.Ed. ITEP":
      "SOHSS/pdfs/ITEP_CourseStructure.pdf",
    "BPES (Bachelor of Physical Education & Sports)":
      "SOHSS/pdfs/BPES_CStr_May2023.pdf",
    "M.A. Education": "SOHSS/pdfs/CStr-Education-25.pdf",
    "Ph.D. Education": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/library-information-science": {
    "B.Lib.I.Sc.": "SOHSS/pdfs/Cstr-Libsci.pdf",
    "M.Lib.I.Sc.": "SOHSS/pdfs/Cstr-Libsci.pdf",
    "Ph.D. Library & Information Science": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOHSS/departments/mass-communication": {
    "B.A. (Hons.) Journalism & Mass Communication":
      "SOHSS/pdfs/BAJMC_NEP.pdf",
    "M.A. Mass Communication": "SOHSS/pdfs/MMC.pdf",
    "M.A. Linguistics": "SOHSS/pdfs/MA_Linguistics_ProgramStr_May2023.pdf",
    "M.A. Journalism & Mass Communication": "SOHSS/pdfs/MJMC-CStr.pdf",
    "Ph.D. Mass Communication": "SOHSS/pdfs/Structure_-PhD.pdf",
  },
  "SOM/departments/business-management": {
    "MBA (Full-Time)": "SOM/pdfs/MBA-Course_Structure.docx.pdf",
    "Dual Degree BBA+MBA": "SOM/pdfs/DualDegreeBBA-MBA-COutline17apr25.pdf",
    "B.Com (Honours)": "SOM/pdfs/BCom-_Syllabus-17Apr25.pdf",
    "MBA (Business Analytics & Data Science)":
      "SOM/pdfs/MBA(Business_Analytics_and_Data_Science)_course_work.docx.pdf",
    "Ph.D. (Business Management)": "SOM/pdfs/PhD-CStr-17apr25.pdf",
  },
  "SOM/departments/finance": {
    "MBA — Finance Specialization": "SOM/pdfs/MBA-Course_Structure.docx.pdf",
  },
  "SOM/departments/marketing": {
    "MBA — Marketing Specialization": "SOM/pdfs/MBA-Course_Structure.docx.pdf",
  },
  "SOM/departments/human-resource-management": {
    "MBA — HRM Specialization": "SOM/pdfs/MBA-Course_Structure.docx.pdf",
  },
  "SOL/departments/law-governance": {
    "B.A. LL.B. (Hons.)":
      "SOLJG/pdfs/SoLaw_Integrated_5yrBALLB_CStructure_15Dec21.pdf",
    "LL.M. (1 Year Full-Time)":
      "SOLJG/pdfs/LL.M_One_Year_Programme_Course_Structure.pdf",
    "LL.M. (2 Year Weekend Programme)":
      "SOLJG/pdfs/LL.M_One_Year_Programme_Course_Structure.pdf",
    "Ph.D. in Law":
      "SOLJG/pdfs/SoLaw_PHD_CourseStructureContent_15Dec2021.pdf",
  },
};

function getDeptFolder(deptFile) {
  return DEPT_FOLDERS[deptFile] || deptFile;
}

function copyPdf(relativeSource, deptFolder) {
  const sourcePath = path.join(downloadsRoot, relativeSource);
  const filename = path.basename(relativeSource);
  const targetDir = path.join(schoolsPublicRoot, deptFolder);
  const targetPath = path.join(targetDir, filename);

  if (!fs.existsSync(sourcePath)) {
    console.warn(`Missing source PDF: ${relativeSource}`);
    return null;
  }

  fs.mkdirSync(targetDir, { recursive: true });
  if (!fs.existsSync(targetPath)) {
    fs.copyFileSync(sourcePath, targetPath);
  }
  return `/schools/${deptFolder}/${filename}`;
}

function injectSyllabusUrl(content, title, syllabusUrl) {
  const titlePattern = new RegExp(
    `(title:\\s*"${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?)\\n(\\s*)syllabus:\\s*\\[\\],`,
    "m"
  );

  if (content.includes(`title: "${title}"`) && content.match(titlePattern)) {
    if (content.includes(`title: "${title}"`) && content.includes(`syllabusUrl: "${syllabusUrl}"`)) {
      return content;
    }
    return content.replace(
      titlePattern,
      `$1\n$2syllabusUrl: "${syllabusUrl}",\n$2syllabus: [],`
    );
  }

  // Single-line program objects (SOBSC meditation entries)
  const inlinePattern = new RegExp(
    `(title:\\s*"${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"[\\s\\S]*?)syllabus:\\s*\\[\\]`,
    "m"
  );
  if (inlinePattern.test(content)) {
    return content.replace(
      inlinePattern,
      `$1syllabusUrl: "${syllabusUrl}", syllabus: []`
    );
  }

  console.warn(`Could not inject syllabusUrl for program: ${title}`);
  return content;
}

let updatedFiles = 0;
let linkedPrograms = 0;
let missingPrograms = 0;

for (const [relPath, programs] of Object.entries(SYLLABUS_MAP)) {
  const filePath = path.join(dataRoot, ...relPath.split("/")) + ".jsx";
  if (!fs.existsSync(filePath)) {
    console.warn(`Department file not found: ${filePath}`);
    continue;
  }

  const deptFile = path.basename(relPath.split("/").pop());
  const deptFolder = getDeptFolder(deptFile);
  let content = fs.readFileSync(filePath, "utf8");
  let fileChanged = false;

  for (const [title, pdfRelPath] of Object.entries(programs)) {
    const syllabusUrl = copyPdf(pdfRelPath, deptFolder);
    if (!syllabusUrl) {
      missingPrograms++;
      continue;
    }

    const next = injectSyllabusUrl(content, title, syllabusUrl);
    if (next !== content) {
      content = next;
      fileChanged = true;
      linkedPrograms++;
    } else if (!content.includes(`title: "${title}"`)) {
      console.warn(`Program title not found in ${relPath}: ${title}`);
      missingPrograms++;
    }
  }

  if (fileChanged) {
    fs.writeFileSync(filePath, content, "utf8");
    updatedFiles++;
  }
}

console.log(`Updated ${updatedFiles} department files.`);
console.log(`Linked ${linkedPrograms} programs to syllabus PDFs.`); 
if (missingPrograms) {
  console.log(`${missingPrograms} program links could not be applied.`);
}
