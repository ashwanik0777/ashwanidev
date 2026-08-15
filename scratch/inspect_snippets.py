import re

with open('scratch/alumni_bundle.js', 'r', encoding='utf-8') as f:
    js = f.read()

def search_text_around(keyword, radius=400):
    pos = [m.start() for m in re.finditer(re.escape(keyword), js, re.IGNORECASE)]
    print(f"\n--- OCCURRENCES FOR '{keyword}' ({len(pos)} found) ---")
    for p in pos[:5]:
        snippet = js[max(0, p-50):min(len(js), p+radius)]
        snippet_clean = re.sub(r'[\r\n\t]+', ' ', snippet)
        print(">>>", snippet_clean[:350])

search_text_around("GBUAA")
search_text_around("President")
search_text_around("Developer")
search_text_around("Membership Card")
search_text_around("0120")
