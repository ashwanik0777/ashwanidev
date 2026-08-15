import urllib.request
import re
import json

url = "https://nss.onlinegbu.com/Photo-Gallery"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

req = urllib.request.Request(url, headers=headers)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    print("Fetched HTML length:", len(html))
    
    # Find all JS chunk URLs
    js_files = re.findall(r'src="(/_next/static/chunks/[^"]+)"', html)
    print("JS Chunks:", js_files)
    
    all_events = []
    
    for js_path in js_files:
        js_url = f"https://nss.onlinegbu.com{js_path}"
        try:
            js_req = urllib.request.Request(js_url, headers=headers)
            js_content = urllib.request.urlopen(js_req).read().decode('utf-8')
            print(f"Inspecting {js_path} (len={len(js_content)})")
            
            # Search for image links or JSON objects
            imgs = re.findall(r'https?://[^\s"\']+\.(?:jpg|jpeg|png|webp)', js_content, re.IGNORECASE)
            if imgs:
                print(f"  Found {len(imgs)} images in {js_path}:", imgs[:5])
                
        except Exception as e:
            print(f"Error reading {js_url}: {e}")

    # Also test API endpoints if any
    api_urls = [
        "https://nss.onlinegbu.com/api/gallery",
        "https://nss.onlinegbu.com/api/events",
        "https://nss.onlinegbu.com/api/photo-gallery",
        "https://nss-dash.onlinegbu.com/api/gallery",
        "https://nss-dash.onlinegbu.com/api/events"
    ]
    for api in api_urls:
        try:
            api_req = urllib.request.Request(api, headers=headers)
            res = urllib.request.urlopen(api_req).read().decode('utf-8')
            print(f"API Response from {api}:", res[:300])
        except Exception as e:
            print(f"API {api} failed: {e}")

except Exception as e:
    print("Error:", e)
