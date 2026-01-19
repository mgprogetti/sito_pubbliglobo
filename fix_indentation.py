#!/usr/bin/env python3
"""
Script per correggere l'indentazione delle sezioni servizi
"""
import re

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# IDs delle sezioni servizi da correggere
service_ids = ['imbiancature', 'ristrutturazioni', 'bagni', 'pavimenti', 'porte', 'infissi', 'inferriate', 'traslochi', 'zanzariere']

# Trova le linee che contengono le sezioni servizi e correggi l'indentazione
in_service_section = False
service_depth = 0
fixed_lines = []

for i, line in enumerate(lines):
    # Controlla se questa linea inizia una sezione servizio
    for service_id in service_ids:
        if f'<section id="{service_id}"' in line:
            in_service_section = True
            # Conta gli spazi iniziali
            current_indent = len(line) - len(line.lstrip())
            # Dovrebbe avere 8 spazi (2 livelli di indentazione)
            if current_indent > 8:
                # Rimuovi 4 spazi extra
                line = line[4:]
            break
    
    # Se siamo in una sezione servizio, correggi l'indentazione
    if in_service_section:
        # Conta gli spazi iniziali
        current_indent = len(line) - len(line.lstrip())
        # Se ha più di 8 spazi e non è vuota, rimuovi 4 spazi
        if current_indent > 8 and line.strip():
            line = line[4:]
        
        # Controlla se questa linea chiude la sezione
        if '</section>' in line and line.strip() == '</section>':
            in_service_section = False
    
    fixed_lines.append(line)

# Salva il file corretto
with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(fixed_lines)

print("Indentazione corretta con successo!")
print(f"Processate {len(lines)} linee")
