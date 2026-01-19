#!/usr/bin/env python3
"""
Script per aggiungere align-items: center al .nav-menu
"""

with open('styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Trova la sezione .nav-menu dentro @media (min-width: 768px)
# e aggiungi align-items: center dopo box-shadow: none;

old_text = """    .nav-menu {
        display: flex;
        flex-direction: row;
        position: static;
        padding: 0;
        box-shadow: none;
    }"""

new_text = """    .nav-menu {
        display: flex;
        flex-direction: row;
        position: static;
        padding: 0;
        box-shadow: none;
        align-items: center;
    }"""

if old_text in content:
    content = content.replace(old_text, new_text)
    with open('styles.css', 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Aggiunto align-items: center al .nav-menu")
else:
    print("❌ Testo non trovato - il file potrebbe essere già stato modificato")
