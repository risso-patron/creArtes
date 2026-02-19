# 📸 INSTRUCCIONES PARA IMÁGENES DEL PORTAFOLIO

## ⚡ ACCIÓN REQUERIDA

Necesitas agregar las imágenes de tus 3 proyectos reales para que aparezcan en el portafolio.

---

## 📁 UBICACIÓN DE LAS IMÁGENES

**Carpeta destino:** `e:\Dev\@Clientes\creArtes\crearte\`

---

## 🖼️ IMÁGENES NECESARIAS (por proyecto)

### **PROYECTO 1: Home Power PTY**
Archivos que tienes:
- `screenshot-desktop.png` E:\Dev\@Personales\portfolio\assets\images\projects\homepowerpty.com\screenshot-desktop.png
- `screenshot-mobile.png`E:\Dev\@Personales\portfolio\assets\images\projects\homepowerpty.com\screenshot-mobile.png
- `screenshot-detail.png` E:\Dev\@Personales\portfolio\assets\images\projects\homepowerpty.com\screenshot-detail.png

**Renombrar a:**
- `homepower-desktop.png` → Convertir a WebP → `homepower-desktop.webp`

**Especificaciones:**
- Dimensiones: 600×400px (proporción 3:2)
- Formato: WebP
- Calidad: 85%

---

### **PROYECTO 2: SOMOS Properties**
Archivos que tienes:
- `screenshot-desktop.png`E:\Dev\@Personales\portfolio\assets\images\projects\somosproperties.com\screenshot-desktop.png
- `screenshot-mobile..png` (doble punto)E:\Dev\@Personales\portfolio\assets\images\projects\somosproperties.com\screenshot-mobile..png
- `screenshot-detail.png`E:\Dev\@Personales\portfolio\assets\images\projects\somosproperties.com\screenshot-detail.png

**Renombrar a:**
- `somosproperties-desktop.png` → Convertir a WebP → `somosproperties-desktop.webp`

**Especificaciones:**
- Dimensiones: 600×400px (proporción 3:2)
- Formato: WebP
- Calidad: 85%

---

### **PROYECTO 3: HostPro Panama**
Archivos que tienes:
- `screenshot_desktop.png` (guión bajo)E:\Dev\@Personales\portfolio\assets\images\projects\hostpropanama.com\screenshot_desktop.png
- `screenshot-desktop.png` (guión medio - duplicado?)E:\Dev\@Personales\portfolio\assets\images\projects\hostpropanama.com\screenshot-desktop.png
- `screenshot-mobile.png`E:\Dev\@Personales\portfolio\assets\images\projects\hostpropanama.com\screenshot-mobile.png
- `screenshot-detail.png`E:\Dev\@Personales\portfolio\assets\images\projects\hostpropanama.com\screenshot-detail.png

**Renombrar a:**
- `hostpro-desktop.png` → Convertir a WebP → `hostpro-desktop.webp`

**Especificaciones:**
- Dimensiones: 600×400px (proporción 3:2)
- Formato: WebP
- Calidad: 85%

---

## 🛠️ CÓMO CONVERTIR A WEBP

### **Opción 1: Online (rápido)**
1. Ve a https://squoosh.app/
2. Sube tu PNG
3. Selecciona formato WebP en el panel derecho
4. Ajusta calidad a 85
5. Redimensiona a 600×400px si es necesario
6. Descarga

### **Opción 2: Script automático (avanzado)**
Ya tienes un script en el proyecto: `convert-to-webp.js`

```bash
# Primero, coloca las 3 imágenes renombradas en /crearte/:
# - homepower-desktop.png
# - somosproperties-desktop.png
# - hostpro-desktop.png

# Luego ejecuta:
node convert-to-webp.js
```

### **Opción 3: Herramienta local**
Usa [XnConvert](https://www.xnview.com/en/xnconvert/) (gratis):
1. Agrega las 3 imágenes
2. Acciones → Redimensionar → 600×400px
3. Output → Formato WebP → Calidad 85
4. Convertir

---

## ✅ CHECKLIST ANTES DE SUBIR

- [ ] Imágenes renombradas correctamente
- [ ] Formato WebP
- [ ] Dimensiones 600×400px
- [ ] Calidad/peso optimizado (< 100KB cada una)
- [ ] Guardadas en `/crearte/`

---

## 📋 NOMBRES FINALES ESPERADOS

```
e:\Dev\@Clientes\creArtes\crearte\
├── homepower-desktop.webp          ← Home Power PTY
├── somosproperties-desktop.webp    ← SOMOS Properties  
└── hostpro-desktop.webp            ← HostPro Panama
```

---

## 🚀 DESPUÉS DE SUBIR

1. Refresca el navegador (`Ctrl + Shift + R` para limpiar caché)
2. Verifica que las imágenes carguen correctamente
3. Si hay errores, revisa la consola (F12) del navegador

---

## 💡 NOTA IMPORTANTE

**Mientras tanto:** El sitio está configurado con rutas a estas imágenes. Si aún no las subes, verás iconos de "imagen no encontrada". Esto es normal y se arreglará automáticamente cuando agregues los archivos.

**Placeholder temporal:** Puedes usar `portfolio-risso-digital.png` que ya existe si necesitas una imagen temporal.

---

## ❓ AYUDA

Si tienes problemas o preguntas sobre las imágenes, avísame y te ayudo con:
- Captura de pantalla de los sitios
- Conversión a WebP
- Optimización de peso
- Cualquier ajuste necesario
