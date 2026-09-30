import requests
from bs4 import BeautifulSoup
import re

base_url = 'https://peruandestrekking.com/en/'
r = requests.get(base_url)
soup = BeautifulSoup(r.text, 'html.parser')

links = set()
for a in soup.find_all('a', href=True):
    href = a['href']
    if '/en/tours/' in href:
        links.add(href)
        
def parse_tour(url):
    full_url = url if url.startswith('http') else f"https://peruandestrekking.com{url}"
    print(f"Fetching: {full_url}")
    try:
        r = requests.get(full_url)
        if r.status_code != 200:
            return None
        s = BeautifulSoup(r.text, 'html.parser')
        
        # Title is usually the only h1
        h1 = s.find('h1')
        title = h1.text.strip() if h1 else "Unknown"
        
        return title
    except Exception as e:
        print(e)
        return None

titles = []
for l in links:
    t = parse_tour(l)
    if t:
        titles.append(t)
        
print("--- TITLES ---")
for t in titles:
    print(t)
