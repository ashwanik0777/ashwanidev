import re
import json

with open('scratch/alumni_bundle.js', 'r', encoding='utf-8') as f:
    js = f.read()

print("--- SEARCHING FOR COMPONENT LABELS, NAV LINKS AND TEXT BLOCKS ---")

# Find JSX text elements, labels, headings, buttons, and strings
# Search for objects or arrays containing labels/titles/links
text_matches = re.findall(r'>([^<>{}\\\r\n]{3,100})<', js)
clean_texts = sorted(list(set([t.strip() for t in text_matches if len(t.strip()) > 3])))

print(f"Found {len(clean_texts)} JSX text fragments.")

with open('scratch/jsx_texts.txt', 'w', encoding='utf-8') as f:
    for t in clean_texts:
        f.write(t + '\n')

# Find string constants (like nav labels, section titles)
# Search for specific keywords: Alumni, Gautam Buddha, Register, Login, Contact, Events, Card, Executive, Chancellor, Vice, Dean, SOICT, SOM, SOE, SOBT, SOL, SOBSC, SOHSS
keywords = ['alumni', 'gautam', 'buddha', 'register', 'login', 'contact', 'event', 'card', 'executive', 'chancellor', 'vice', 'dean', 'school', 'association', 'membership', 'dev']

relevant_texts = []
for t in clean_texts:
    if any(kw in t.lower() for kw in keywords):
        relevant_texts.append(t)

print(f"Found {len(relevant_texts)} relevant GBU Alumni keywords in JSX text.")
print("\nSample Relevant JSX Text Fragments:")
for t in relevant_texts[:40]:
    print(" -", t)

# Search for long text paragraphs or object literals in JS
paragraphs = re.findall(r'"([^"\r\n]{40,500})"', js)
print(f"\nFound {len(paragraphs)} paragraph strings in JS bundle.")
with open('scratch/paragraphs.txt', 'w', encoding='utf-8') as f:
    for p in paragraphs:
        f.write(p + '\n')

print("\nSample Paragraphs from live site:")
for p in paragraphs[:20]:
    print(" *", p)
