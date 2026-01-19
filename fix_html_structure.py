#!/usr/bin/env python3
"""
Script per correggere la struttura HTML - spostare le sezioni servizi fuori dalla sezione home
"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Trova la fine della sezione home (prima del tag </section> che chiude home)
# Le sezioni servizi iniziano con "<!-- IMBIANCATURE PROFESSIONALI PAGE -->"
service_marker = "<!-- IMBIANCATURE PROFESSIONALI PAGE -->"

if service_marker in content:
    # Trova l'indice dove iniziano le sezioni servizi
    service_start_idx = content.find(service_marker)
    
    # Trova l'ultimo </section> prima delle sezioni servizi (chiude la sezione home)
    before_services = content[:service_start_idx]
    home_end_idx = before_services.rfind('</section>')
    
    if home_end_idx == -1:
        print("ERROR: Could not find home section closing tag")
        exit(1)
    
    # Trova dove finiscono le sezioni servizi (prima di <!-- CHI SIAMO PAGE -->)
    chi_siamo_marker = "<!-- CHI SIAMO PAGE -->"
    if chi_siamo_marker not in content:
        print("ERROR: Could not find Chi Siamo marker")
        exit(1)
    
    chi_siamo_idx = content.find(chi_siamo_marker)
    
    # Estrai le tre parti
    part1 = content[:home_end_idx + len('</section>')]  # Fino alla fine di home
    service_sections = content[service_start_idx:chi_siamo_idx]  # Le 9 sezioni servizi
    part3 = content[chi_siamo_idx:]  # Da Chi Siamo in poi
    
    # Ricostruisci il file con le sezioni servizi fuori da home
    new_content = part1 + '\n\n' + service_sections + '\n' + part3
    
    # Salva il file corretto
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("HTML structure fixed successfully!")
    print(f"Moved service sections from position {service_start_idx} to after home section")
else:
    print("ERROR: Service marker not found in HTML")
    exit(1)
