
import re

services = [
    {'id': 'imbiancature', 'name': 'Imbiancature'},
    {'id': 'ristrutturazioni', 'name': 'Ristrutturazioni'},
    {'id': 'bagni', 'name': 'Bagni'},
    {'id': 'pavimenti', 'name': 'Pavimenti'},
    {'id': 'porte', 'name': 'Porte'},
    {'id': 'infissi', 'name': 'Infissi'},
    {'id': 'inferriate', 'name': 'Inferriate'},
    {'id': 'traslochi', 'name': 'Traslochi'},
    {'id': 'zanzariere', 'name': 'Zanzariere'}
]

def generate_nav_html(current_service_id):
    links_html = ""
    for service in services:
        if service['id'] == current_service_id:
            continue
        links_html += f'<a href="#{service["id"]}" class="service-pill">{service["name"]}</a>\n'
    
    return f"""
                <!-- Service Navigation -->
                <div class="service-nav-container">
                    <h3>Esplora Altri Servizi</h3>
                    <div class="service-pills">
                        {links_html}
                    </div>
                </div>"""

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    for service in services:
        service_id = service['id']
        print(f"Processing service: {service_id}")
        
        # Trova l'inizio della sezione
        section_start = content.find(f'<section id="{service_id}"')
        if section_start == -1:
            print(f"❌ Section {service_id} not found")
            continue
            
        # Trova la fine della sezione
        next_section = content.find('<section id=', section_start + 1)
        if next_section == -1:
             # Cerca </main> se è l'ultima sezione
             # O meglio, cerca la chiusura della sezione corrente
             section_end_tag = content.find('</section>', section_start)
             if section_end_tag != -1:
                 section_end = section_end_tag + 10
             else:
                 section_end = len(content)
        else:
            section_end = next_section
            
        section_content = content[section_start:section_end]
        
        # Trova il punto di inserimento: dopo il video-container
        video_idx = section_content.find('class="video-container"')
        
        if video_idx == -1:
             print(f"❌ Video container not found in {service_id}")
             continue
             
        # Troviamo la chiusura del div video-container.
        # Struttura: <div class="video-container"> ... </div>
        # Attenzione ai div annidati.
        # Cerchiamo </div> dopo video-container
        
        # Facciamo una ricerca più robusta. Cerchiamo la chiusura del video container.
        # Sappiamo che il video container contiene un h3 e un video-wrapper e un iframe.
        # <div class="video-container"> ... </div>
        
        # Troviamo il primo </div> dopo "video-wrapper" (che chiude wrapper)
        # e poi il successivo </div> (che chiude container)
        
        wrapper_idx = section_content.find('class="video-wrapper"', video_idx)
        if wrapper_idx == -1:
            print(f"❌ Wrapper not found in {service_id}")
            continue
            
        # Trova chiusura wrapper
        wrapper_close = section_content.find('</div>', wrapper_idx)
        # Trova chiusura container (il prossimo div dopo wrapper_close)
        container_close = section_content.find('</div>', wrapper_close + 6)
        
        if container_close == -1:
             print(f"❌ Container close not found in {service_id}")
             continue
             
        insertion_relative_pos = container_close + 6 # dopo </div>
        insertion_point = section_start + insertion_relative_pos
        
        # Verifica se la nav c'è già
        if 'class="service-nav-container"' in section_content:
             print(f"⚠️ Navigation already present in {service_id}")
             continue
        
        # Genera HTML specifico per questa pagina (escludendo se stessa)
        nav_html = generate_nav_html(service_id)
        
        # Inserimento
        content = content[:insertion_point] + nav_html + content[insertion_point:]
        
        print(f"✅ Added navigation to {service_id}")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    process_file('index.html')
