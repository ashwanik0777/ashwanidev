import urllib.request
import re
import json

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

# Fetch the Photo-Gallery Next.js page data if available
url = "https://nss.onlinegbu.com/Photo-Gallery"
req = urllib.request.Request(url, headers=headers)
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Find all JS bundle URLs
    js_links = re.findall(r'/_next/static/chunks/[^\s"]+\.js', html)
    print("Found JS links:", len(js_links))
    
    all_found_images = []
    
    for link in js_links:
        full_url = f"https://nss.onlinegbu.com{link}"
        try:
            r = urllib.request.urlopen(urllib.request.Request(full_url, headers=headers)).read().decode('utf-8')
            # Extract any Cloudinary / AWS S3 / upload URLs or image strings
            urls = re.findall(r'https?://[^\s"\'\\]+\.(?:png|jpg|jpeg|webp)', r)
            if urls:
                print(f"{link} -> {len(urls)} images")
                all_found_images.extend(urls)
        except Exception as e:
            pass

    print("Total Unique Extracted Images:", len(set(all_found_images)))
    for img in list(set(all_found_images))[:20]:
        print("  -", img)

    # Test potential photo gallery APIs
    test_endpoints = [
        "https://nss.onlinegbu.com/api/gallery/photos",
        "https://nss.onlinegbu.com/api/photos",
        "https://nss.onlinegbu.com/api/event",
        "https://nss.onlinegbu.com/api/media",
        "https://nss.onlinegbu.com/api/highlights",
        "https://nss.onlinegbu.com/api/images",
        "https://nss.onlinegbu.com/api/gallery-images",
        "https://nss.onlinegbu.com/api/v1/events",
        "https://nss.onlinegbu.com/api/v1/gallery"
    ]
    
    for ep in test_endpoints:
        try:
            res = urllib.request.urlopen(urllib.request.Request(ep, headers=headers)).read().decode('utf-8')
            print(f"Success from {ep}: {res[:200]}")
        except Exception as e:
            pass

except Exception as e:
    print("Error:", e)
