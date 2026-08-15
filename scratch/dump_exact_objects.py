import re
import json

with open('scratch/alumni_bundle.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Extract executive team (F9 array snippet)
exec_team_match = re.search(r'\[\{dp:[^\]]+\}\]', js)
if exec_team_match:
    with open('scratch/exec_team.txt', 'w', encoding='utf-8') as f:
        f.write(exec_team_match.group(0))

# Extract all array definitions containing name, title, desc, etc.
object_arrays = re.findall(r'\[\s*\{[^\}]{10,1000}\}\s*\]', js)
with open('scratch/all_object_arrays.txt', 'w', encoding='utf-8') as f:
    for i, arr in enumerate(object_arrays):
        f.write(f"--- ARRAY {i} ---\n{arr}\n\n")

print(f"Extracted {len(object_arrays)} object arrays from bundle.")
