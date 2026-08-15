import urllib.request
import ssl
import re
import json
import os

os.makedirs('scratch', exist_ok=True)

ctx = ssl._create_unverified_context()
req = urllib.request.Request('https://alumni.gbu.ac.in/assets/index-9KKSy8b6.js', headers={'User-Agent': 'Mozilla/5.0'})

try:
    js_content = urllib.request.urlopen(req, context=ctx, timeout=20).read().decode('utf-8', errors='ignore')
    print("JS bundle size:", len(js_content))
    with open('scratch/alumni_bundle.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    # Extract routes
    routes = re.findall(r'path:\s*["\']([^"\']+)["\']', js_content)
    print("Routes found:", set(routes))

    # Extract clean text strings / labels / headers
    raw_strings = re.findall(r'"([^"\r\n]{3,150})"', js_content)
    filtered_strings = [s for s in raw_strings if not s.startswith('http') and not s.startswith('rgba') and not s.startswith('M') and not s.startswith('col-')]
    
    with open('scratch/extracted_strings.txt', 'w', encoding='utf-8') as f:
        for s in filtered_strings:
            f.write(s + '\n')
            
    print("Extracted strings count:", len(filtered_strings))

except Exception as e:
    print("Error fetching bundle:", e)
