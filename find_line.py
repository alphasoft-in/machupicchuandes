with open('src/data/tours.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()
for i, line in enumerate(lines):
    if 'luxury-inca' in line:
        print(f"Found on line {i+1}")
