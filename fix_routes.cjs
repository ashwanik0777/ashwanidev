const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const files = execSync('grep -rn "event-calendar" src/ | cut -d: -f1 | sort | uniq').toString().trim().split('\n');

files.forEach(file => {
  if (!file) return;
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace string literals
  content = content.replace(/\/announcements\/event-calendar\/\$\{/g, '/announcements/event/${');
  content = content.replace(/\/announcements\/event-calendar/g, '/announcements/event');
  content = content.replace(/slug: "event-calendar"/g, 'slug: "event"');
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file}`);
});
