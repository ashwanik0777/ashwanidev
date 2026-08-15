import urllib.request
import json

url = "https://nss.onlinegbu.com/api/photos"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

req = urllib.request.Request(url, headers=headers)
try:
    res = urllib.request.urlopen(req).read().decode('utf-8')
    photos = json.loads(res)
    print(f"Total Photos Received from API: {len(photos)}")
    
    with open("scratch/nss_photos_raw.json", "w", encoding="utf-8") as f:
        json.dump(photos, f, indent=2)
        
    print("Dumped raw JSON to scratch/nss_photos_raw.json")
    
    # Analyze unique categories and image URLs
    categories = set()
    valid_photos = []
    
    for idx, item in enumerate(photos):
        img_url = item.get('image', '')
        title = item.get('title') or item.get('description') or f"NSS Event Photo #{idx+1}"
        cat_id = item.get('categoryId', 'General')
        
        valid_photos.append({
            "id": idx + 1,
            "title": title,
            "image": img_url,
            "categoryId": cat_id,
            "raw": item
        })
        
    print(f"Extracted {len(valid_photos)} valid photo cards!")
    
    with open("scratch/nss_photos_parsed.json", "w", encoding="utf-8") as f:
        json.dump(valid_photos, f, indent=2)
        
    for p in valid_photos[:10]:
        print(f"[{p['id']}] {p['title']} => {p['image']}")

except Exception as e:
    print("Error:", e)
