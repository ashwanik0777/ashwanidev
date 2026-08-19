import fs from 'fs';
import path from 'path';

const facultyDir = 'd:/MY Projects/GBU SMART CAMPUS/public/assets/Faculty';
const facultyListPath = 'd:/MY Projects/GBU SMART CAMPUS/src/Data/facultyList.json';
const outputFile = 'd:/MY Projects/GBU SMART CAMPUS/src/Data/facultyImageRegistry.json';
const pathsOutputFile = 'd:/MY Projects/GBU SMART CAMPUS/src/Data/facultyImagePaths.json';

function cleanString(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/\b(hon'ble|mr|ms|mrs|dr|prof|ar|shri|sh|smt|justice)\b\.?/gi, '')
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function runMapping() {
  if (!fs.existsSync(facultyDir)) {
    console.error(`Faculty image directory not found at ${facultyDir}`);
    return;
  }

  const files = fs.readdirSync(facultyDir);
  console.log(`🔍 Scanning ${files.length} images in ${facultyDir}...`);

  const byEmail = {};
  const byUsername = {};
  const byCleanName = {};
  const byFacultyId = {};

  let facultyList = [];
  if (fs.existsSync(facultyListPath)) {
    try {
      facultyList = JSON.parse(fs.readFileSync(facultyListPath, 'utf8'));
    } catch (e) {
      facultyList = [];
    }
  }

  const idMap = new Map();
  const cleanNameMap = new Map();
  facultyList.forEach(fac => {
    if (fac.id) idMap.set(fac.id.toUpperCase(), fac);
    if (fac.name) cleanNameMap.set(cleanString(fac.name), fac);
  });

  const pathsList = [];

  files.forEach((filename) => {
    if (filename.startsWith('.') || filename === 'index.php') return;

    const relPath = `/assets/Faculty/${filename}`;

    // 0. Try extracting Faculty ID (e.g., SOICT-F0001, SOE-F0024)
    const idMatch = filename.match(/^([A-Z]{2,6}-F\d{4})/i);
    if (idMatch) {
      byFacultyId[idMatch[1].toUpperCase()] = relPath;
    }

    // 1. Try extracting email
    const emailMatch = filename.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    if (emailMatch) {
      const fullEmail = emailMatch[1].toLowerCase();
      byEmail[fullEmail] = relPath;

      const username = fullEmail.split('@')[0];
      if (username && username.length >= 3) {
        byUsername[username] = relPath;
      }
    }

    // 2. Map by cleaned filename
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const cleaned = cleanString(nameWithoutExt);
    if (cleaned.length >= 3) {
      byCleanName[cleaned] = relPath;
    }

    // Match image for facultyImagePaths.json
    let matchedFac = null;
    if (idMatch && idMap.has(idMatch[1].toUpperCase())) {
      matchedFac = idMap.get(idMatch[1].toUpperCase());
    } else if (cleanNameMap.has(cleaned)) {
      matchedFac = cleanNameMap.get(cleaned);
    }

    pathsList.push({
      id: matchedFac ? matchedFac.id : "",
      facultyName: matchedFac ? matchedFac.name : nameWithoutExt,
      filename: filename,
      path: relPath
    });
  });

  const registry = {
    byFacultyId,
    byEmail,
    byUsername,
    byCleanName,
    totalFilesScanned: files.length,
    updatedAt: new Date().toISOString()
  };

  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(registry, null, 2));
  fs.writeFileSync(pathsOutputFile, JSON.stringify(pathsList, null, 2));

  console.log(`✅ Successfully generated faculty image registry at ${outputFile}`);
  console.log(`✅ Successfully generated faculty image paths list at ${pathsOutputFile}`);
  console.log(`   - Mapped by Faculty ID: ${Object.keys(byFacultyId).length}`);
  console.log(`   - Mapped by Email: ${Object.keys(byEmail).length}`);
  console.log(`   - Mapped by Username: ${Object.keys(byUsername).length}`);
  console.log(`   - Mapped by Name: ${Object.keys(byCleanName).length}`);
}

runMapping();
