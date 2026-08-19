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

function getTokens(str) {
  return cleanString(str).split(' ').filter(t => t.length >= 2);
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
  const tokenMap = [];

  facultyList.forEach(fac => {
    if (fac.id) idMap.set(fac.id.toUpperCase(), fac);
    if (fac.name) {
      const cn = cleanString(fac.name);
      if (cn) cleanNameMap.set(cn, fac);
      const tokens = getTokens(fac.name);
      if (tokens.length > 0) tokenMap.push({ fac, cn, tokens });
    }
  });

  const pathsList = [];

  files.forEach((filename) => {
    if (filename.startsWith('.') || filename === 'index.php') return;

    const relPath = `/assets/Faculty/${filename}`;

    // 0. Extract Faculty ID
    const idMatch = filename.match(/^([A-Z]{2,6}-F\d{4})/i);
    if (idMatch) {
      byFacultyId[idMatch[1].toUpperCase()] = relPath;
    }

    // 1. Extract email
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
    } else {
      // Token fuzzy match fallback
      const baseTokens = getTokens(nameWithoutExt);
      if (baseTokens.length >= 1) {
        let maxScore = 0;
        let bestCandidate = null;

        tokenMap.forEach(({ fac, tokens }) => {
          let matchCount = 0;
          baseTokens.forEach(bt => {
            if (tokens.includes(bt)) matchCount += 1;
            else if (tokens.some(t => t.includes(bt) || bt.includes(t))) matchCount += 0.6;
          });

          const score = matchCount / Math.max(baseTokens.length, tokens.length);
          if (score > maxScore && score >= 0.5) {
            maxScore = score;
            bestCandidate = fac;
          }
        });

        if (bestCandidate) {
          matchedFac = bestCandidate;
        }
      }
    }

    pathsList.push({
      id: matchedFac ? matchedFac.id : (idMatch ? idMatch[1].toUpperCase() : ""),
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
  console.log(`   - Total image paths with IDs: ${pathsList.filter(p => p.id !== "").length}/${pathsList.length}`);
}

runMapping();
