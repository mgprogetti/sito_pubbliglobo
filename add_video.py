
import re

service_ids = [
    'imbiancature',
    'ristrutturazioni',
    'bagni',
    'pavimenti',
    'porte',
    'infissi',
    'inferriate',
    'traslochi',
    'zanzariere'
]

video_html = """
                <!-- Video -->
                <div class="video-container">
                    <h3>Video di Presentazione</h3>
                    <div class="video-wrapper">
                        <iframe src="https://www.youtube.com/embed/D0UnqGm_miA?si=0RB6Jfr6l_7W4DMK" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>"""

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Identifica le sezioni dei servizi
    # Pattern: Cerca <section id="SERVICE_ID" ...> ... <div class="gallery-container"> ... </div> (chiusura gallery) ... </div> (chiusura container)
    
    for service_id in service_ids:
        print(f"Processing service: {service_id}")
        
        # Trova l'inizio della sezione
        section_start = content.find(f'<section id="{service_id}"')
        if section_start == -1:
            print(f"❌ Section {service_id} not found")
            continue
            
        # Trova la fine della sezione (la prossima section o fine file)
        next_section = content.find('<section id=', section_start + 1)
        if next_section == -1:
            section_end = content.find('</main>')
        else:
            section_end = next_section
            
        section_content = content[section_start:section_end]
        
        # Trova il punto di inserimento: dopo la chiusura di gallery-container
        # La struttura è:
        # <div class="gallery-container">
        #    ...
        # </div>
        # </div> <!-- container closing -->
        
        # Cerchiamo l'ultimo div gallery-container dentro la sezione
        gallery_idx = section_content.find('class="gallery-container"')
        if gallery_idx == -1:
             print(f"❌ Gallery container not found in {service_id}")
             continue
             
        # Troviamo la chiusura del gallery-container. 
        # Sappiamo che è indentato e c'è </div> seguito da </div> (container) seguito da </div> (section content?? no section content doesn't close)
        # Vediamo il pattern:
        #                <div class="gallery-dots"></div>
        #            </div>
        #        </div>
        #    </div>
        # </section>
        
        # Cerchiamo il data-gallery="{service_id}" per essere sicuri
        # Ma data-gallery potrebbe avere un nome diverso (es bagni vs bagno)
        
        # Usiamo un approccio basato sul testo: cerchiamo la chiusura della gallery
        # che è tipicamente prima della chiusura del container che è prima della chiusura section
        
        # Cerchiamo la stringa "</section>" relativa a questa section
        section_close_tag = section_content.rfind('</section>')
        
        if section_close_tag == -1:
            print(f"❌ Section close tag not found in {service_id}")
            continue
            
        # Risaliamo da </section>:
        # </div> (container)
        # </div> (page-content? no, page-content chiude prima di gallery-container se non errato? Fammi controllare struttura)
        
        # Struttura:
        # <div class="container">
        #    <div class="page-content">...</div>
        #    <div class="gallery-container">...</div>
        # </div>
        
        # Quindi vogliamo inserire PRIMA dell'ultimo </div> che precede </section>
        
        # Troviamo l'ultimo </div> prima di </section>
        container_close = section_content.rfind('</div>', 0, section_close_tag)
        
        # Inseriamo prima di questo div
        insertion_point = section_start + container_close
        
        # Verifica se il video c'è già
        if 'class="video-container"' in section_content:
             print(f"⚠️ Video already present in {service_id}")
             continue
        
        # Inserimento
        content = content[:insertion_point] + video_html + "\n" + content[insertion_point:]
        
        print(f"✅ Added video to {service_id}")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    process_file('index.html')
