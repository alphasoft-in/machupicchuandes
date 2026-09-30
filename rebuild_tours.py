import requests
from bs4 import BeautifulSoup
import re
import json
import difflib

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

import os
images = []
for root, dirs, files in os.walk('public/images'):
    for f in files:
        if f.endswith(('.avif', '.webp', '.png', '.jpg')):
            images.append(os.path.join(root, f).replace('\\', '/').replace('public/', '/'))

def get_best_image(slug, tid):
    # Try exact match on filename
    for img in images:
        if slug in img or tid in img: return img
    
    # Fuzzy match
    names = [i.split('/')[-1].split('.')[0] for i in images]
    matches = difflib.get_close_matches(slug, names, n=1, cutoff=0.3)
    if matches:
        for img in images:
            if matches[0] in img: return img
            
    matches = difflib.get_close_matches(tid, names, n=1, cutoff=0.3)
    if matches:
        for img in images:
            if matches[0] in img: return img
    return '/images/hero.avif'

def get_category(tid):
    if '1d' in tid or 'city' in tid or 'tour' in tid or tid in ['rainbow-mountain', 'palccoyo', 'humantay-lake', 'maras-moray', 'south-valley', 'sacred-valley', 'qeswachaka', 'waqrapukara', 'pallay-punchu']:
        return 'Express'
    if 'luxury' in tid or 'vip' in tid: return 'VIP'
    if 'ausangate' in tid: return 'High Altitude'
    if 'choquequirao' in tid or '7d' in tid or '9d' in tid: return 'Expedition'
    return 'Classic'
    
def escape_str(s):
    return s.replace("`", "\\`")

def parse_page(url, tid):
    try:
        r = requests.get(url, timeout=10)
        if r.status_code != 200: return None
        soup = BeautifulSoup(r.text, 'html.parser')
        
        # Get title
        h1 = soup.find('h1')
        title = h1.text.strip() if h1 else 'Unknown Title'
        
        # Get Description (first paragraph after title usually)
        # We can extract it by finding "Expedition Overview" or "Resumen de la Expedición"
        desc = "Incredible trek in the Andes."
        lines = list(soup.stripped_strings)
        for i, l in enumerate(lines):
            if l in ['Expedition Overview', 'Resumen de la Expedición'] and i + 1 < len(lines):
                desc = lines[i+1]
                break
                
        # Duration from title
        duration = '1 Day'
        match = re.search(r'(\d+[D|d])', title)
        if match:
            d = match.group(1).upper()
            duration = f"{d[0]} Days" if d != '1D' else '1 Day'
        
        itinerary = []
        included = []
        not_included = []
        
        state = 'SEARCHING_ITINERARY'
        current_day = None
        current_title = ""
        current_desc = []
        
        for i in range(len(lines)):
            line = lines[i]
            
            if line in ['✅ What is Included', '✅ Qué Incluye'] or 'What is Included' in line or 'Qué Incluye' in line:
                if current_day:
                    itinerary.append({'day': current_day, 'title': current_title, 'desc': '\n'.join(current_desc).strip()})
                    current_day = None
                state = 'INCLUDED'
                continue
            elif line in ['✕ Not Included', '✕ No Incluye'] or 'Not Included' in line or 'No Incluye' in line:
                state = 'NOT_INCLUDED'
                continue
            elif '🏔️ Direct Cusco Concierge' in line or 'Reserva Directa' in line or 'Chat With Coordinator' in line:
                if state in ['INCLUDED', 'NOT_INCLUDED']: break
                    
            if state == 'SEARCHING_ITINERARY' or state == 'PARSING_DAY':
                day_match = re.match(r'^(Day|Día)\s*(\d+)[:\-]?\s*(.*)$', line, re.IGNORECASE)
                if day_match:
                    if current_day:
                        itinerary.append({'day': current_day, 'title': current_title, 'desc': '\n'.join(current_desc).strip()})
                    current_day = int(day_match.group(2))
                    current_title = day_match.group(3).strip()
                    current_desc = []
                    state = 'PARSING_DAY'
                elif state == 'PARSING_DAY' and current_day:
                    if line.isdigit(): continue
                    if '🏔️ Book Direct' in line or 'Reserva Directa' in line:
                        state = 'SEARCHING_ITINERARY'
                        itinerary.append({'day': current_day, 'title': current_title, 'desc': '\n'.join(current_desc).strip()})
                        current_day = None
                    else:
                        current_desc.append(line)
            
            elif state == 'INCLUDED':
                if line != '✓' and not line.isdigit(): included.append(f"✓{line}")
            elif state == 'NOT_INCLUDED':
                if line not in ['—', '✕'] and not line.isdigit(): not_included.append(f"—{line}")
                
        return {
            'id': tid,
            'title': title,
            'desc': desc,
            'duration': duration,
            'category': get_category(tid),
            'image': get_best_image(url.split('/')[-1], tid),
            'itinerary': itinerary,
            'included': included,
            'not_included': not_included
        }
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

def build_js_block(data):
    res = f"    {{\n      id: '{data['id']}',\n      category: '{data['category']}',\n      duration: '{data['duration']}',\n"
    res += f"      title: '{data['title'].replace(chr(39), chr(92)+chr(39))}',\n"
    res += f"      description: '{data['desc'].replace(chr(39), chr(92)+chr(39))}',\n"
    res += f"      image: '{data['image']}',\n"
    res += "      itinerary: [\n"
    for day in data['itinerary']:
        res += f"        {{ day: {day['day']}, title: '{day['title'].replace(chr(39), chr(92)+chr(39))}', description: `{escape_str(day['desc'])}` }},\n"
    res += "      ],\n      included: ["
    res += ", ".join([f"'{i.replace(chr(39), chr(92)+chr(39))}'" for i in data['included']])
    res += "],\n      notIncluded: ["
    res += ", ".join([f"'{i.replace(chr(39), chr(92)+chr(39))}'" for i in data['not_included']])
    res += "]\n    }"
    return res

output_ts = "export const tours = {\n  en: [\n"
for slug, tid in slug_to_id.items():
    print(f"Fetching EN {tid}")
    d = parse_page(f"https://peruandestrekking.com/en/tours/{slug}", tid)
    if d: output_ts += build_js_block(d) + ",\n"
output_ts += "  ],\n  es: [\n"
for slug, tid in slug_to_id.items():
    print(f"Fetching ES {tid}")
    d = parse_page(f"https://peruandestrekking.com/es/tours/{slug}", tid)
    if d: output_ts += build_js_block(d) + ",\n"
output_ts += "  ]\n};\n"

with open('src/data/tours.ts', 'w', encoding='utf-8') as f:
    f.write(output_ts)
print("COMPLETELY REBUILT TOURS.TS!")
