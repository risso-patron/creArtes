#!/usr/bin/env python3
"""
Script para convertir las imágenes PNG del portafolio a WebP
"""
import os
from PIL import Image

# Directorio donde están las imágenes
crearte_dir = os.path.join(os.path.dirname(__file__), 'crearte')

# Archivos a convertir
files_to_convert = [
    'homepower-desktop.png',
    'somosproperties-desktop.png',
    'hostpro-desktop.png'
]

print("🚀 Convirtiendo imágenes PNG a WebP...\n")

for filename in files_to_convert:
    input_path = os.path.join(crearte_dir, filename)
    
    if not os.path.exists(input_path):
        print(f"❌ No se encontró: {filename}")
        continue
    
    # Generar nombre de salida
    output_filename = filename.replace('.png', '.webp')
    output_path = os.path.join(crearte_dir, output_filename)
    
    try:
        # Abrir imagen
        img = Image.open(input_path)
        
        # Obtener dimensiones originales
        original_width, original_height = img.size
        
        # Redimensionar si es necesario (máximo 600x400 manteniendo aspecto)
        max_width = 600
        max_height = 400
        
        if original_width > max_width or original_height > max_height:
            ratio = min(max_width / original_width, max_height / original_height)
            new_width = int(original_width * ratio)
            new_height = int(original_height * ratio)
            img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            print(f"📐 {filename}: redimensionado de {original_width}×{original_height} a {new_width}×{new_height}")
        
        # Guardar como WebP
        img.save(output_path, 'webp', quality=85, method=6)
        
        # Calcular ahorro de espacio
        input_size = os.path.getsize(input_path)
        output_size = os.path.getsize(output_path)
        savings = ((1 - output_size / input_size) * 100)
        
        print(f"✅ {filename} → {output_filename}")
        print(f"   Tamaño: {input_size//1024}KB → {output_size//1024}KB ({savings:.1f}% más ligero)\n")
        
    except Exception as e:
        print(f"❌ Error al convertir {filename}: {str(e)}\n")

print("✨ Conversión completada!")
