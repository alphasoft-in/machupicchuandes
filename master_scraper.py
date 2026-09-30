import requests
from bs4 import BeautifulSoup
import re
import time

slug_to_id = {
    'choquequirao-trek-machu-picchu-6d': 'choquequirao-6d',
    'waqrapukara-trek-1d': 'waqrapukara',
    'salkantay-inca-trail-7d': 'salkantay-inca-7d',
    '1-day-inca-trail': '1-day-inca-trail',
    'luxury-inca-trail-2d': 'luxury-short-inca',
    'extended-sacred-valley-tour-vip': 'vip-sacred-valley',
    'luxury-salkantay-trek-5d': 'luxury-salkantay',
    'classic-inca-trail': 'classic-inca-trail',
    'pallay-punchu-trek-1d': 'pallay-punchu',
    'rainbow-mountain-peru-vinicunca': 'rainbow-mountain',
    'salkantay-short-inca-trail-6d': 'salkantay-inca-6d',
    'qeswachaca-bridge-1d': 'qeswachaka',
    'private-inca-trail-4d': 'private-inca',
    'huchuy-qosqo-trek-3d2n': 'huchuy-qosqo-3d',
    'luxury-inca-trail-5d': 'luxury-inca',
    'choquequirao-trek-5d4n': 'choquequirao-5d',
    'ausangate-trek-3d': 'ausangate-3d',
    'ausangate-trek-5d': 'ausangate-5d',
    'short-inca-trail': 'short-inca',
    'walking-tour-cusco-half-day': 'walking-tour',
    'luxury-sacred-valley-machu-picchu-2d': 'luxury-sacred-valley',
    'maras-moray-salt-mines-1d': 'maras-moray',
    'choquequirao-trek-machu-picchu-9d': 'choquequirao-9d',
    'inca-jungle-trail-4d': 'inca-jungle',
    'machu-picchu-highlights-4d': 'machu-highlights',
    'lares-trek-4d': 'lares-trek',
    'machu-picchu-tour-by-train': 'machu-train',
    'inca-quarry-trail-4d': 'inca-quarry',
    'tomaccaya-salkantay-mistico-3d': 'tomaccaya-mistico',
    'city-tour-cusco-half-day': 'cusco-city',
    'palccoyo-rainbow-mountain-1d': 'palccoyo',
    'humantay-lake-day-hike': 'humantay-lake',
    'salkantay-trek-4d3n': 'salkantay-4d',
    'ausangate-trek-4d': 'ausangate-4d',
    'ancascocha-trek-5d': 'ancascocha-trek',
    'premium-inca-trail': 'premium-inca',
    'south-valley-tour': 'south-valley',
    'choquequirao-trek-4d3n': 'choquequirao-4d',
    'classic-salkantay-5d4n': 'classic-salkantay',
    'huchuy-qosqo-1d': 'huchuy-qosqo-1d',
    'hidden-valley-trek-5d4n': 'tomaccaya-hidden',
    'sacred-valley-tour-1d': 'sacred-valley'
}

def escape_str(s):
    return s.replace("`", "\\`")

def parse_page(url):
    try:
        r = requests.get(url, timeout=10)
        if r.status_code != 200: return None
        soup = BeautifulSoup(r.text, 'html.parser')
        lines = list(soup.stripped_strings)
        
        itinerary = []
        included = []
        not_included = []
        
        state = 'SEARCHING_ITINERARY'
        current_day = None
        current_title = ""
        current_desc = []
        
        for i in range(len(lines)):
            line = lines[i]
            
            # Switch modes based on headers
            if line == '✅ What is Included' or line == '✅ Qué Incluye' or line == 'What is Included' or 'Qué Incluye' in line:
                # Save last day if exists
                if current_day:
                    itinerary.append({'day': current_day, 'title': current_title, 'desc': '\n'.join(current_desc)})
                    current_day = None
                state = 'INCLUDED'
                continue
            elif line == '✕ Not Included' or line == '✕ No Incluye' or line == 'Not Included' or 'No Incluye' in line:
                state = 'NOT_INCLUDED'
                continue
            elif '🏔️ Direct Cusco Concierge' in line or 'Reserva Directa' in line or 'Chat With Coordinator' in line:
                if state in ['INCLUDED', 'NOT_INCLUDED']:
                    break # end of relevant sections
                    
            if state == 'SEARCHING_ITINERARY' or state == 'PARSING_DAY':
                # Look for day header like "Day 1: ..." or "Día 1: ..."
                day_match = re.match(r'^(Day|Día)\s*(\d+)[:\-]?\s*(.*)$', line, re.IGNORECASE)
                if day_match:
                    if current_day:
                        itinerary.append({'day': current_day, 'title': current_title, 'desc': '\n'.join(current_desc).strip()})
                    current_day = int(day_match.group(2))
                    current_title = day_match.group(3).strip()
                    current_desc = []
                    state = 'PARSING_DAY'
                elif state == 'PARSING_DAY' and current_day:
                    # ignore just digits (the floating numbers in elementor)
                    if line.isdigit(): continue
                    # check if we ran past the itinerary (e.g. into the Book Direct section)
                    if '🏔️ Book Direct' in line or 'Reserva Directa' in line:
                        state = 'SEARCHING_ITINERARY'
                        itinerary.append({'day': current_day, 'title': current_title, 'desc': '\n'.join(current_desc).strip()})
                        current_day = None
                    else:
                        current_desc.append(line)
            
            elif state == 'INCLUDED':
                if line != '✓' and not line.isdigit():
                    included.append(f"✓{line}")
            elif state == 'NOT_INCLUDED':
                if line != '—' and line != '✕' and not line.isdigit():
                    not_included.append(f"—{line}")
                    
        return {'itinerary': itinerary, 'included': included, 'not_included': not_included}
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def build_js_string(data):
    # Builds the replacement string for the tour block
    res = "itinerary: [\n"
    for day in data['itinerary']:
        desc = escape_str(day['desc'])
        title = day['title'].replace("'", "\\'")
        res += f"        {{ day: {day['day']}, title: '{title}', description: `{desc}` }},\n"
    res += "      ],\n      included: ["
    inc_strings = [f"'{inc.replace(chr(39), chr(92)+chr(39))}'" for inc in data['included']]
    res += ", ".join(inc_strings)
    res += "],\n      notIncluded: ["
    not_inc_strings = [f"'{ninc.replace(chr(39), chr(92)+chr(39))}'" for ninc in data['not_included']]
    res += ", ".join(not_inc_strings)
    res += "]\n    }"
    return res

with open('src/data/tours.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for slug, t_id in slug_to_id.items():
    print(f"Processing {t_id}...")
    for lang in ['en', 'es']:
        url = f"https://peruandestrekking.com/{lang}/tours/{slug}"
        data = parse_page(url)
        if data and data['itinerary']:
            js_snippet = build_js_string(data)
            
            # The regex will target the specific tour object in the TS file and replace its internals
            # from the image property down to its closing bracket.
            # We search for: id: 't_id', ... image: '...' ... }
            
            # We must be careful because EN and ES share the same ID. 
            # English section is before es: [ 
            es_index = content.find('es: [')
            
            if lang == 'en':
                # search in content[:es_index]
                pattern = r"(id:\s*'" + re.escape(t_id) + r"'.*?image:\s*'[^']+')(?:.*?)(?=\n\s*\},|\n\s*\}\n)"
                # Actually, replacing using re.sub with a custom function is better to respect bounds
                def repl_en(m):
                    return m.group(1) + ",\n      " + js_snippet[:-6] # remove the \n    }
                
                # Extract first part
                part1 = content[:es_index]
                part1 = re.sub(pattern, repl_en, part1, flags=re.DOTALL | re.IGNORECASE)
                content = part1 + content[es_index:]
            else:
                # search in content[es_index:]
                pattern = r"(id:\s*'" + re.escape(t_id) + r"'.*?image:\s*'[^']+')(?:.*?)(?=\n\s*\},|\n\s*\}\n)"
                def repl_es(m):
                    return m.group(1) + ",\n      " + js_snippet[:-6]
                
                part2 = content[es_index:]
                part2 = re.sub(pattern, repl_es, part2, flags=re.DOTALL | re.IGNORECASE)
                content = content[:es_index] + part2
                
with open('src/data/tours.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done scraping and updating!")
