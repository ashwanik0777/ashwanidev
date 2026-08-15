import urllib.request
import json

url = "https://nss.onlinegbu.com/api/events"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

req = urllib.request.Request(url, headers=headers)
try:
    res = urllib.request.urlopen(req).read().decode('utf-8')
    data = json.loads(res)
    events = data.get('events', [])
    print(f"Total Events Found: {len(events)}")
    
    formatted_events = []
    
    for idx, item in enumerate(events):
        title = item.get('title', 'NSS Event')
        desc = item.get('description', '')
        event_date = item.get('eventDate', '')
        location = item.get('location', '')
        images = item.get('images', [])
        image_url = item.get('image', '')
        
        # If images list is empty, use main image
        img_list = []
        if images:
            for img in images:
                if isinstance(img, str):
                    img_list.append(img)
                elif isinstance(img, dict) and img.get('url'):
                    img_list.append(img.get('url'))
        if not img_list and image_url:
            img_list.append(image_url)
            
        print(f"\n[{idx+1}] {title}")
        print(f"   Date: {event_date} | Location: {location}")
        print(f"   Images ({len(img_list)}): {img_list[:3]}")
        
        formatted_events.append({
            "id": idx + 1,
            "title": title,
            "description": desc,
            "date": event_date,
            "location": location,
            "images": img_list
        })
        
    with open("scratch/nss_events_all.json", "w", encoding="utf-8") as f:
        json.dump(formatted_events, f, indent=2)
        
    print("\nSaved all events to scratch/nss_events_all.json!")
    
except Exception as e:
    print("Error:", e)
