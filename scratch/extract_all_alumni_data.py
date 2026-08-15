import re

with open('scratch/alumni_bundle.js', 'r', encoding='utf-8') as f:
    js = f.read()

with open('scratch/all_ui_texts.txt', 'r', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.strip()]

# Let's search for specific sections in JS:
# 1. Navigation items
# 2. Team members / Dev team
# 3. About GBUAA
# 4. Form fields & inputs
# 5. Footers / Header info
# 6. Contact info / addresses / emails / phones

print("=== GBU ALUMNI PORTAL (EXACT DATA FOUND) ===")

print("\n--- 1. TEAM / DEV TEAM / EXECUTIVE MEMBERS FOUND ---")
dev_team = re.findall(r'name:\s*["\']([^"\']+)["\']', js)
print("Names in objects:", set(dev_team))

# Search for designations, roles, emails
emails = re.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', js)
print("\nEmails found:", set(emails))

phones = re.findall(r'\+?91[\s-]?\d{10}|\d{10}', js)
print("\nPhones found:", set(phones[:10]))

print("\n--- 2. ALL RELEVANT UI LABELS & TEXT CONTENT ---")
relevant_keywords = [
    'Alumni', 'GBUAA', 'Gautam Buddha', 'An Ultimate Destination', 
    'Membership', 'Card', 'Register', 'Login', 'Contact', 'Event', 
    'Dinesh', 'Abhishek', 'Developer', 'Designed', 'SuperAdmin',
    'Degree', 'Enrollment', 'School', 'Department', 'Passing', 
    'Occupation', 'Company', 'Designation', 'Address', 'Phone',
    'Email', 'Verification', 'Status', 'Notice', 'Gallery', 'Reunion'
]

matched = []
for line in lines:
    if any(kw.lower() in line.lower() for kw in relevant_keywords):
        if not line.startswith('0 0 ') and not line.startswith('@@') and not 'TypeError' in line:
            matched.append(line)

with open('scratch/matched_alumni_content.txt', 'w', encoding='utf-8') as f:
    for m in sorted(set(matched)):
        f.write(m + '\n')

print(f"Total matched lines: {len(set(matched))}")
print("\nFirst 80 matched lines:")
for m in sorted(set(matched))[:80]:
    print(" •", m)
