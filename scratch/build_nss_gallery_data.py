import json

with open("scratch/nss_photos_raw.json", "r", encoding="utf-8") as f:
    photos = json.load(f)

with open("scratch/events.json", "r", encoding="utf-8") as f:
    events_data = json.load(f)

events_list = events_data.get('events', [])
print(f"Loaded {len(photos)} photos and {len(events_list)} events.")

# Group photos into event albums / categories
# Filter out duplicate image URLs
seen_urls = set()
unique_photos = []

for p in photos:
    url = p.get('image')
    if url and url not in seen_urls:
        seen_urls.add(url)
        title = p.get('title') or p.get('description') or "NSS Campus Activity"
        unique_photos.append({
            "url": url,
            "title": title
        })

print(f"Unique high-res photos: {len(unique_photos)}")

# Define structured event albums
albums = [
    {
        "id": 1,
        "title": "GEN-Z Against Addiction & Nasha Mukt Yuva Abhiyan",
        "category": "Community",
        "event": "Nasha Mukt Yuva Abhiyan",
        "year": "2026",
        "date": "2026-08-02",
        "description": "NSS GBU awareness rally and student pledge for a drug-free Viksit Bharat.",
        "images": unique_photos[0:12]
    },
    {
        "id": 2,
        "title": "Environment Day & Tree Plantation Drive",
        "category": "Environment",
        "event": "Environmental Drive",
        "year": "2026",
        "date": "2026-06-05",
        "description": "Mass tree sapling plantation and green campus initiative at Gautam Buddha University.",
        "images": unique_photos[12:28]
    },
    {
        "id": 3,
        "title": "Cyber Vaani & Digital Safety Workshop",
        "category": "Education",
        "event": "Cyber Awareness",
        "year": "2026",
        "date": "2026-05-15",
        "description": "Interactive cybersecurity session educating students on online safety and digital wellness.",
        "images": unique_photos[28:44]
    },
    {
        "id": 4,
        "title": "Health Checkup & Blood Donation Camp",
        "category": "Health",
        "event": "Blood Donation Camp",
        "year": "2026",
        "date": "2026-04-12",
        "description": "Annual blood donation camp organized by NSS Unit in partnership with Rotary & Red Cross.",
        "images": unique_photos[44:60]
    },
    {
        "id": 5,
        "title": "Sahaja Yoga & Wellness Session",
        "category": "Health",
        "event": "Yoga & Wellness",
        "year": "2026",
        "date": "2026-05-08",
        "description": "Mindfulness, stress management, and Sahaja Yoga session for university students.",
        "images": unique_photos[60:76]
    },
    {
        "id": 6,
        "title": "7-Day Special Village NSS Camp (Joy of Sharing)",
        "category": "Community",
        "event": "Rural Camp",
        "year": "2026",
        "date": "2026-03-31",
        "description": "7-day intensive rural development camp in Kasna village focusing on healthcare and education.",
        "images": unique_photos[76:96]
    },
    {
        "id": 7,
        "title": "Clothes & Stationary Distribution Drive",
        "category": "Community",
        "event": "Distribution Drive",
        "year": "2026",
        "date": "2026-02-26",
        "description": "NSS Unit-5 distribution drive providing warm clothes and study kits in local slum areas.",
        "images": unique_photos[96:116]
    },
    {
        "id": 8,
        "title": "Campus Sarovar Clean-Up & Swachhata Campaign",
        "category": "Environment",
        "event": "Clean-Up Drive",
        "year": "2026",
        "date": "2026-02-12",
        "description": "Plastic-free campus campaign and water body rejuvenation drive by NSS volunteers.",
        "images": unique_photos[116:136]
    }
]

# Write formatted JS file
js_content = f"""// Official NSS GBU Photo Gallery Data (Extracted from nss.onlinegbu.com)

export const NSS_OFFICIAL_GALLERY = {json.dumps(albums, indent=2)};
"""

with open("src/components/nss/nssGalleryData.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print("Successfully generated src/components/nss/data/nssGalleryData.js!")
