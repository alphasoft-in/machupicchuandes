import json
import re

with open('src/data/tours.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# I will use a simple regex approach to extract blocks of each tour, but since they are JS objects, 
# it's better to just convert it to JSON if possible, but it's TypeScript. 
# So I'll parse it using a custom lightweight JS object parser or regex.

def parse_tours(text):
    # Find all occurrences of "id: 'something'"
    results = []
    # match each id block
    matches = list(re.finditer(r"id:\s*'([^']+)'", text))
    for i in range(len(matches)):
        start = matches[i].start()
        end = matches[i+1].start() if i + 1 < len(matches) else len(text)
        block = text[start:end]
        
        t_id = matches[i].group(1)
        
        # Check duration
        duration_match = re.search(r"duration:\s*'([^']+)'", block)
        duration = duration_match.group(1) if duration_match else "Unknown"
        
        # Check itinerary array size. We can count occurrences of "{ day:" inside this block
        days = len(re.findall(r"\{\s*day:\s*\d+", block))
        
        # Check if itinerary word exists
        has_itinerary = "itinerary:" in block
        
        results.append({
            'id': t_id,
            'duration': duration,
            'has_itinerary': has_itinerary,
            'days_count': days
        })
    return results

tours = parse_tours(content)
missing = []
for t in tours:
    # try to extract a number from duration
    dur_num = 1
    m = re.search(r'(\d+)\s*(Días|Days|D|Day|día)', t['duration'], re.IGNORECASE)
    if m:
        dur_num = int(m.group(1))
    else:
        # half-day or similar
        dur_num = 1
        
    if not t['has_itinerary'] or t['days_count'] != dur_num:
        missing.append((t['id'], t['duration'], t['has_itinerary'], t['days_count']))

print(f"Total tours found (including en & es): {len(tours)}")
print("Tours with missing or mismatched itineraries:")
for m in missing:
    print(f"ID: {m[0]}, Duration: {m[1]}, Has Itinerary: {m[2]}, Days Found: {m[3]}")
