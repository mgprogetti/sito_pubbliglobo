#!/usr/bin/env python3
"""
Script per generare le 9 pagine di servizio HTML
"""

services = [
    {
        "id": "imbiancature",
        "title": "Imbiancature Professionali",
        "subtitle": "Tinteggiatura Professionale",
        "description": [
            "I nostri servizi di imbiancatura includono la preparazione accurata delle superfici, la scelta di pitture di alta qualità e l'applicazione professionale per garantire un risultato duraturo e impeccabile. Lavoriamo con le migliori marche di vernici, offrendo un'ampia gamma di colori e finiture.",
            "Che si tratti di un appartamento, un ufficio o un'intera abitazione, il nostro team è in grado di gestire progetti di qualsiasi dimensione con precisione e cura dei dettagli. Utilizziamo tecniche moderne per minimizzare i tempi di esecuzione senza compromettere la qualità."
        ],
        "image": "header-imbiancature.jpg",
        "alt": "Imbiancature professionali"
    },
    {
        "id": "ristrutturazioni",
        "title": "Ristrutturazioni Chiavi in Mano",
        "subtitle": "Ristrutturazioni Complete",
        "description": [
            "Offriamo un servizio completo di ristrutturazione chiavi in mano, dalla progettazione iniziale alla consegna finale. Ci occupiamo di tutti gli aspetti del progetto: demolizioni, murature, impianti elettrici e idraulici, pavimenti, rivestimenti e finiture.",
            "Il nostro approccio chiavi in mano ti libera da ogni preoccupazione, permettendoti di avere un unico interlocutore per l'intero progetto. Coordiniamo tutti i professionisti coinvolti e garantiamo il rispetto dei tempi e del budget concordati."
        ],
        "image": "header-ristrutturazioni.jpg",
        "alt": "Ristrutturazioni chiavi in mano"
    },
    {
        "id": "bagni",
        "title": "Rifacimento Bagni",
        "subtitle": "Ristrutturazione Completa del Bagno",
        "description": [
            "Trasformiamo il tuo bagno in uno spazio moderno, funzionale e di design. Ci occupiamo di ogni aspetto della ristrutturazione: dalla demolizione alla posa di nuove piastrelle, dall'installazione di sanitari e rubinetteria all'impianto idraulico ed elettrico.",
            "Lavoriamo con materiali di alta qualità e seguiamo le ultime tendenze del design, garantendo risultati che uniscono estetica e praticità. Il nostro obiettivo è creare bagni che rispecchino il tuo stile personale e migliorino la qualità della vita quotidiana."
        ],
        "image": "header-bagni.jpg",
        "alt": "Rifacimento bagni moderni"
    },
    {
        "id": "pavimenti",
        "title": "Pavimenti in Parquet e Gres",
        "subtitle": "Installazione Pavimenti di Qualità",
        "description": [
            "Offriamo un servizio completo di posa pavimenti in parquet e gres porcellanato. Il parquet dona calore e eleganza agli ambienti, mentre il gres porcellanato offre resistenza e facilità di manutenzione. Entrambe le soluzioni sono disponibili in un'ampia gamma di finiture e formati.",
            "Il nostro team di posatori esperti garantisce un lavoro preciso e accurato, con particolare attenzione ai dettagli e alle rifiniture. Utilizziamo solo materiali di prima qualità e tecniche di posa all'avanguardia per assicurare la massima durata nel tempo."
        ],
        "image": "header-pavimenti.jpg",
        "alt": "Pavimenti in parquet e gres"
    },
    {
        "id": "porte",
        "title": "Porte Interne e Porte Blindate",
        "subtitle": "Installazione Porte di Sicurezza e Design",
        "description": [
            "Installiamo porte interne di design e porte blindate di sicurezza. Le nostre porte interne combinano estetica e funzionalità, disponibili in vari materiali, finiture e stili per adattarsi perfettamente al tuo arredamento.",
            "Per la sicurezza della tua abitazione, offriamo porte blindate certificate con elevati standard di protezione. Ogni porta viene installata con precisione da tecnici specializzati, garantendo perfetto funzionamento e massima sicurezza."
        ],
        "image": "header-porte.jpg",
        "alt": "Porte interne e porte blindate"
    },
    {
        "id": "infissi",
        "title": "Finestre e Infissi",
        "subtitle": "Installazione Infissi Moderni",
        "description": [
            "Offriamo un servizio completo di installazione e sostituzione di infissi e finestre, utilizzando materiali di prima qualità come PVC, alluminio e legno. I nostri infissi garantiscono isolamento termico e acustico superiore, contribuendo al risparmio energetico e al comfort della tua abitazione.",
            "Ogni progetto viene personalizzato in base alle esigenze specifiche del cliente, con particolare attenzione all'estetica e alla funzionalità. Il nostro team di esperti ti guiderà nella scelta della soluzione più adatta al tuo immobile."
        ],
        "image": "header-infissi.jpg",
        "alt": "Finestre e infissi moderni"
    },
    {
        "id": "inferriate",
        "title": "Inferriate di Sicurezza",
        "subtitle": "Protezione per la Tua Casa",
        "description": [
            "Installiamo inferriate di sicurezza su misura per proteggere la tua abitazione. Le nostre inferriate combinano sicurezza e design, realizzate in ferro battuto o acciaio con finiture personalizzabili per integrarsi perfettamente con l'estetica del tuo edificio.",
            "Ogni inferriata viene progettata e installata secondo le normative di sicurezza vigenti, garantendo massima protezione senza compromettere l'aspetto estetico. Offriamo soluzioni fisse e rimovibili per ogni esigenza."
        ],
        "image": "header-inferriate.jpg",
        "alt": "Inferriate di sicurezza"
    },
    {
        "id": "traslochi",
        "title": "Servizio Traslochi",
        "subtitle": "Traslochi Professionali",
        "description": [
            "Offriamo un servizio traslochi completo e professionale per privati e aziende. Il nostro team esperto si occupa di ogni fase del trasloco: imballaggio, carico, trasporto e scarico dei tuoi beni con la massima cura e attenzione.",
            "Utilizziamo materiali di imballaggio di qualità e mezzi di trasporto adeguati per garantire la sicurezza dei tuoi mobili e oggetti. Offriamo anche servizi di smontaggio e rimontaggio mobili, oltre a soluzioni di deposito temporaneo."
        ],
        "image": "header-traslochi.jpg",
        "alt": "Servizio traslochi professionale"
    },
    {
        "id": "zanzariere",
        "title": "Zanzariere",
        "subtitle": "Installazione Zanzariere su Misura",
        "description": [
            "Installiamo zanzariere su misura per finestre e porte, proteggendo la tua casa da insetti e zanzare senza rinunciare all'aria fresca. Offriamo diverse tipologie: zanzariere fisse, a rullo, plissettate e scorrevoli.",
            "Ogni zanzariera viene realizzata su misura per adattarsi perfettamente alle tue aperture. Utilizziamo materiali resistenti e duraturi, con reti di alta qualità che garantiscono lunga durata e facile manutenzione."
        ],
        "image": "header-zanzariere.jpg",
        "alt": "Zanzariere su misura"
    }
]

# Template per una pagina di servizio
page_template = '''
        <!-- {title_upper} PAGE -->
        <section id="{id}" class="page subpage">
            <div class="page-header">
                <img src="images/{image}" alt="{alt}" loading="lazy">
                <div class="page-header-overlay"></div>
                <h1 class="page-title">{title}</h1>
            </div>
            
            <div class="container">
                <div class="page-content">
                    <h2>{subtitle}</h2>
                    <p>{desc1}</p>
                    <p>{desc2}</p>
                </div>

                <!-- Gallery -->
                <div class="gallery-container">
                    <h3>I Nostri Lavori</h3>
                    <div class="gallery" data-gallery="{id}">
                        <div class="gallery-slides">
                            <div class="gallery-slide active">
                                <img src="images/{image}" alt="{title} 1" loading="lazy">
                            </div>
                            <div class="gallery-slide">
                                <img src="images/{image}" alt="{title} 2" loading="lazy">
                            </div>
                            <div class="gallery-slide">
                                <img src="images/{image}" alt="{title} 3" loading="lazy">
                            </div>
                            <div class="gallery-slide">
                                <img src="images/{image}" alt="{title} 4" loading="lazy">
                            </div>
                        </div>
                        
                        <button class="gallery-control prev" aria-label="Immagine precedente">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="gallery-control next" aria-label="Immagine successiva">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                        
                        <div class="gallery-dots"></div>
                    </div>
                </div>
            </div>
        </section>
'''

# Genera tutte le pagine
all_pages = ""
for service in services:
    page = page_template.format(
        id=service["id"],
        title=service["title"],
        title_upper=service["title"].upper(),
        subtitle=service["subtitle"],
        desc1=service["description"][0],
        desc2=service["description"][1],
        image=service["image"],
        alt=service["alt"]
    )
    all_pages += page

# Salva in un file
with open("service_pages.html", "w", encoding="utf-8") as f:
    f.write(all_pages)

print("Service pages generated successfully!")
print(f"Total pages: {len(services)}")
