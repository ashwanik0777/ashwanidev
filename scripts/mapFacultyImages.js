import fs from 'fs';
import path from 'path';

const facultyDir = 'd:/MY Projects/GBU SMART CAMPUS/public/assets/Faculty';
const outputFile = 'd:/MY Projects/GBU SMART CAMPUS/src/Data/facultyImageRegistry.json';

function cleanString(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/dr\.|dr|prof\.|prof|mr\.|mr|ms\.|ms|shri|smt\.|smt/gi, '')
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

  files.forEach((filename) => {
    if (filename.startsWith('.') || filename === 'index.php') return;

    const relPath = `/assets/Faculty/${filename}`;

    // 1. Try extracting email
    const emailMatch = filename.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
    if (emailMatch) {
      const fullEmail = emailMatch[1].toLowerCase();
      byEmail[fullEmail] = relPath;

      // Extract username before @
      const username = fullEmail.split('@')[0];
      if (username && username.length >= 3) {
        byUsername[username] = relPath;
      }
    }

    // 2. Map by cleaned filename (without extension)
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
    const cleaned = cleanString(nameWithoutExt);
    if (cleaned.length >= 3) {
      byCleanName[cleaned] = relPath;
    }
  });

  const registry = {
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
  console.log(`✅ Successfully generated faculty image registry at ${outputFile}`);
  console.log(`   - Mapped by Email: ${Object.keys(byEmail).length}`);
  console.log(`   - Mapped by Username: ${Object.keys(byUsername).length}`);
  console.log(`   - Mapped by Name: ${Object.keys(byCleanName).length}`);
}

runMapping();
