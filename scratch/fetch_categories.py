import urllib.request
import json

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

endpoints = [
    "https://nss.onlinegbu.com/api/categories",
    "https://nss.onlinegbu.com/api/category",
    "https://nss.onlinegbu.com/api/events",
    "https://nss.onlinegbu.com/api/projects"
]

for ep in endpoints:
    try:
        req = urllib.request.Request(ep, headers=headers)
        res = urllib.request.urlopen(req).read().decode('utf-8')
        data = json.loads(res)
        print(f"\n=== {ep} ===")
        print(json.dumps(data, indent=2)[:500])
        with open(f"scratch/{ep.split('/')[-1]}.json", "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print(f"Error {ep}: {e}")
