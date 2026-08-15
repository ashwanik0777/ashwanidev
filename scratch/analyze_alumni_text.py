import re

with open('scratch/alumni_bundle.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Find strings of length >= 4 containing english letters/spaces/punctuation
strings = re.findall(r'"([A-Za-z0-9\s\,\.\?\!\:\;\-\_\'\@\/\(\)\&\+\%\#]{4,200})"', js)
strings += re.findall(r"'([A-Za-z0-9\s\,\.\?\!\:\;\-\_\'\@\/\(\)\&\+\%\#]{4,200})'", js)

# Filter out JS keywords, CSS classes, SVG paths, standard react attributes
ignore_list = ['className', 'onClick', 'onChange', 'flex', 'grid', 'hidden', 'text-', 'bg-', 'px-', 'py-', 'border', 'rounded', 'hover:', 'md:', 'lg:', 'sm:', 'absolute', 'relative', 'items-', 'justify-', 'duration-', 'transition-', 'w-full', 'h-full', 'min-h-', 'max-w-']

cleaned = []
for s in set(strings):
    if not any(ig in s for ig in ignore_list) and not s.startswith('http') and len(s.split()) >= 1:
        cleaned.append(s.strip())

print(f"Total extracted potential content strings: {len(cleaned)}")

# Let's filter strings that look like actual UI labels or text content (capitalized or multi-word)
ui_texts = [s for s in cleaned if len(s) > 3 and not s.islower() and not s.isupper()]
ui_texts.sort()

with open('scratch/all_ui_texts.txt', 'w', encoding='utf-8') as f:
    for s in ui_texts:
        f.write(s + '\n')

print(f"Wrote {len(ui_texts)} UI text candidates to scratch/all_ui_texts.txt")

# Print top 60 multi-word UI strings
multi_word = [s for s in ui_texts if len(s.split()) >= 2 and not any(c in s for c in ['{', '}', '[', ']', '=', '<', '>'])]
print("\nSample Multi-word Content & Labels:")
for s in sorted(multi_word)[:60]:
    print(" -", s)
