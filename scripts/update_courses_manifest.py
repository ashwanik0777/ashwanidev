import os
import json
import csv

COURSES_DIR = "public/courses"
INDEX_JSON = os.path.join(COURSES_DIR, "COURSES_INDEX.json")
MANIFEST_CSV = os.path.join(COURSES_DIR, "COURSES_MANIFEST.csv")

SCHOOL_NAMES = {
    "SOBT": "School of Biotechnology",
    "SOE": "School of Engineering",
    "SOICT": "School of Information and Communication Technology",
    "SOL": "School of Law, Justice & Governance",
    "SOM": "School of Management",
    "SOVS": "School of Vocational Studies and Applied Sciences",
    "SOVSAS": "School of Vocational Studies and Applied Sciences",
    "SOHSS": "School of Humanities and Social Sciences",
    "SOBSC": "School of Buddhist Studies and Civilization",
}

# Folder name to school code
DIR_TO_CODE = {
    "sobt": "SOBT",
    "soe": "SOE",
    "soict": "SOICT",
    "sol": "SOL",
    "som": "SOM",
    "sovs": "SOVS",
    "sovsas": "SOVS",
    "sohss": "SOHSS",
    "sobsc": "SOBSC",
}

courses = []
schools_found = set()

for root, dirs, files in os.walk(COURSES_DIR):
    for f in sorted(files):
        if not f.lower().endswith(".pdf"):
            continue
        full_path = os.path.join(root, f)
        rel_path = os.path.relpath(full_path, COURSES_DIR).replace("\\", "/")
        parts = rel_path.split("/")
        if len(parts) >= 3:
            school_dir = parts[0]
            dept_dir = parts[1]
        elif len(parts) == 2:
            school_dir = parts[0]
            dept_dir = "buddhist-studies" if school_dir.lower() == "sobsc" else "general"
        else:
            continue
            
        school_code = DIR_TO_CODE.get(school_dir.lower(), school_dir.upper())
        school_name = SCHOOL_NAMES.get(school_code, school_code)
        schools_found.add(school_code)
        size_bytes = os.path.getsize(full_path)
        size_kb = round(size_bytes / 1024, 2)
        size_mb = round(size_bytes / (1024 * 1024), 2)
        web_url = f"/courses/{rel_path}"
        courses.append({
            "school_code": school_code,
            "school_name": school_name,
            "department": dept_dir,
            "filename": f,
            "web_url": web_url,
            "size_bytes": size_bytes,
            "size_kb": size_kb,
            "size_mb": size_mb
        })

courses.sort(key=lambda x: (x["school_code"], x["department"], x["filename"]))

index_data = {
    "total_courses_count": len(courses),
    "schools": sorted(list(schools_found)),
    "courses": courses
}

with open(INDEX_JSON, "w", encoding="utf-8") as jf:
    json.dump(index_data, jf, indent=2)

with open(MANIFEST_CSV, "w", newline="", encoding="utf-8") as cf:
    writer = csv.writer(cf)
    writer.writerow(["school_code", "school_name", "department", "filename", "web_url", "size_bytes", "size_kb", "size_mb"])
    for c in courses:
        writer.writerow([
            c["school_code"],
            c["school_name"],
            c["department"],
            c["filename"],
            c["web_url"],
            c["size_bytes"],
            c["size_kb"],
            c["size_mb"]
        ])

print(f"Total courses: {len(courses)}")
print(f"Schools: {sorted(list(schools_found))}")
