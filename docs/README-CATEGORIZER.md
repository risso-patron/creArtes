# 🎨 Studio CreArtes - Categorizador de Portafolio

## Para el Cliente

¡Hola! Este es un visor interactivo para organizar las imágenes de tu portafolio.

### 📋 Cómo Usar

1. **Abre el sitio** que te enviamos
2. **Revisa cada imagen** y asígnale una categoría:
   - 🎨 **Branding**: Logos, identidad visual, brandbooks
   - 📣 **Publicidad**: Vallas, rótulos, vinil, letreros
   - 💻 **Web & Digital**: Sitios web, landing pages, ecommerce
   - 🎁 **Merchandising**: Camisetas, tazas, artículos promocionales
   - 📱 **Redes Sociales**: Posts, stories, contenido digital

3. **Usa los filtros** arriba para ver solo imágenes de una categoría
4. **Cuando termines**, haz clic en "Generar Script de Renombrado"
5. **Envíanos el script** que aparece (cópialo y pégalo en un email o WhatsApp)

### ⏱️ Tiempo Estimado
Aproximadamente 10-15 minutos para categorizar las 41 imágenes.

### 💡 Consejos
- Puedes cambiar la categoría de una imagen en cualquier momento
- El progreso se muestra en la barra inferior
- No te preocupes si no estás seguro de alguna, podemos ajustarlo después

### 📞 ¿Dudas?
Contáctanos por WhatsApp: +50769347097

---

## Para el Desarrollador

### Deploy a Vercel

```bash
# Instalar Vercel CLI (si no lo tienes)
npm i -g vercel

# Navegar a la carpeta del proyecto
cd e:\Dev\@Clientes\creArtes

# Deploy
vercel --prod
```

### Estructura
```
creArtes/
├── image-categorizer.html  # Aplicación principal
├── crearte/                # Carpeta con las 41 imágenes + 7 videos
│   └── *.jpeg             # Imágenes del portafolio
├── vercel.json            # Configuración de Vercel
└── README-CATEGORIZER.md  # Este archivo
```

### Después del Deploy
1. Comparte el link de Vercel con el cliente
2. El cliente categoriza las imágenes
3. El cliente copia el script generado
4. Ejecutas el script en PowerShell para organizar las imágenes

### Notas
- Las imágenes se cargan desde `/crearte/`
- El script generado crea la estructura en `assets/portfolio/`
- Compatible con todos los navegadores modernos
