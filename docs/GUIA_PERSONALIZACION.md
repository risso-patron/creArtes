# 📖 GUÍA RÁPIDA - Personalización de Studio CreArtes Website

## 🎯 Instrucciones Paso a Paso

### Para Personas Sin Experiencia Técnica

Esta guía te ayudará a realizar cambios comunes sin romper el sitio.

---

## ✏️ TAREA 1: Cambiar Número de WhatsApp

**¿Dónde?** En todo el sitio hay un número de WhatsApp: `50712345678`

### Paso 1: Abre el archivo `index.html`
- Haz doble clic en `index.html`
- Se abrirá en tu navegador
- Presiona `Ctrl+U` para ver el código

### Paso 2: Usa Buscar y Reemplazar
- Presiona `Ctrl+H` (Buscar y Reemplazar)
- Busca: `50712345678`
- Reemplaza con: `+507XXXXXXXX` (tu número real)
- Haz clic en "Reemplazar todo"

### Paso 3: Guarda cambios
- Presiona `Ctrl+S`
- Actualiza el navegador (F5)
- ¡Listo! Tu nuevo número aparecerá en todos los botones

---

## 🎨 TAREA 2: Cambiar Colores de Marca

**¿Dónde?** En `css/main.css` (líneas 1-40)

### Paso 1: Abre `css/main.css`
- Con editor de texto (Notepad++, VS Code, Sublime)
- O simplemente Bloc de Notas

### Paso 2: Busca la sección de colores
```css
:root {
  --primary-color: #0B9B9B;      ← AQUÍ
  --secondary-color: #00D9D9;    ← AQUÍ
  --accent-color: #0B9B9B;       ← AQUÍ
}
```

### Paso 3: Reemplaza los códigos hex
- `#0B9B9B` = Tu color primario
- `#00D9D9` = Tu color secundario
- `#0B9B9B` = Tu color de acento

**Ejemplo**: Si quieres cambiar a rojo:
```css
--primary-color: #FF0000;      /* Rojo */
--secondary-color: #FF6666;    /* Rojo claro */
--accent-color: #FF0000;       /* Rojo */
```

### Paso 4: Guarda y recarga
- Presiona `Ctrl+S`
- Actualiza el navegador (F5)
- ¡Todos los colores cambiaron!

---

## 🖼️ TAREA 3: Cambiar Logo

**¿Dónde?** En `assets/logo-creartes.svg`

### Opción A: Reemplazar el archivo
1. Prepara tu nuevo logo en formato SVG o PNG
2. Renómbralo a `logo-creartes.svg`
3. Reemplaza el archivo en la carpeta `assets/`
4. Actualiza el navegador (F5)

### Opción B: Editar el SVG actual
1. Abre `assets/logo-creartes.svg` con un editor de texto
2. Modifica los valores en la sección de `<text>`
3. Cambia los colores en `<linearGradient>`
4. Guarda y recarga

---

## ✍️ TAREA 4: Cambiar Textos en el Sitio

**¿Dónde?** En `index.html`

### Paso 1: Identifica la sección que quieres cambiar

Cada sección tiene un comentario:
```html
<!-- Section 1: Hero -->
<!-- Section 2: Servicios -->
<!-- Section 3: Nosotros - Misión, Visión, Valores -->
<!-- Section 4: Portafolio -->
```

### Paso 2: Abre `index.html` en un editor
- VS Code, Sublime Text, o Bloc de Notas
- Presiona `Ctrl+F` para buscar

### Paso 3: Ejemplos de cambios comunes

**Cambiar título del héroe:**
```html
ANTES:
<h1 class="hero-title">
    Studio CreArtes: <span class="highlight">Soluciones Creativas</span>...
</h1>

DESPUÉS:
<h1 class="hero-title">
    Mi Nueva Empresa: <span class="highlight">Lo que hacemos</span>...
</h1>
```

**Cambiar descripción:**
```html
ANTES:
<p class="hero-subtitle">
    Combinamos profesionalismo con creatividad...
</p>

DESPUÉS:
<p class="hero-subtitle">
    Mi nuevo texto aquí...
</p>
```

### Paso 4: Guarda y recarga
- `Ctrl+S` para guardar
- F5 para recargar en navegador

---

## 🎯 TAREA 5: Agregar Nuevo Servicio

**¿Dónde?** En `index.html`, sección "Servicios"

### Paso 1: Encuentra el código de servicios
Busca: `<!-- Section 2: Servicios -->`

### Paso 2: Copia un servicio existente
```html
<div class="servicio-card">
    <span class="servicio-icon">🎨</span>
    <h3 class="servicio-title">Diseño Gráfico Creativo</h3>
    <p class="servicio-description">
        Creamos identidades visuales...
    </p>
    <ul class="servicio-features">
        <li>Creación de logotipos únicos</li>
        <li>Branding corporativo completo</li>
    </ul>
    <a href="#contacto" class="btn btn-primary servicio-cta">Solicitar Info</a>
</div>
```

### Paso 3: Personaliza
```html
<div class="servicio-card">
    <span class="servicio-icon">🆕</span>                    ← Cambia emoji
    <h3 class="servicio-title">Mi Nuevo Servicio</h3>        ← Cambia título
    <p class="servicio-description">
        Describe tu nuevo servicio aquí...                    ← Cambia descripción
    </p>
    <ul class="servicio-features">
        <li>Característica 1</li>                             ← Cambia features
        <li>Característica 2</li>
    </ul>
    <a href="#contacto" class="btn btn-primary servicio-cta">Solicitar Info</a>
</div>
```

### Paso 4: Inserta antes del `</div>` que cierra la sección

---

## 📧 TAREA 6: Cambiar Email de Contacto

**¿Dónde?** En `index.html`, busca tu email actual

### Paso 1: Busca todos los emails
- Presiona `Ctrl+H` (Buscar y Reemplazar)
- Busca: `email@example.com` o similar
- Reemplaza con: `tuemailreal@gmail.com`

### Paso 2: Guarda
- `Ctrl+S`

---

## 🖼️ TAREA 7: Cambiar Imágenes

**¿Dónde?** En todo el sitio hay imágenes de Unsplash

### Paso 1: Encuentra todas las imágenes
Busca en `index.html`:
```html
<img src="https://images.unsplash.com/...">
```

### Paso 2: Reemplaza la URL
Opción A: Usa Unsplash (gratuito)
1. Ve a https://unsplash.com
2. Busca "diseño gráfico" o similar
3. Haz clic en una foto
4. Copia la URL de la foto
5. Reemplaza en el HTML

Opción B: Usa tus propias fotos
1. Guarda tu foto en `assets/` con nombre: `mi-foto.jpg`
2. Reemplaza: `src="https://images.unsplash.com/..."` 
3. Con: `src="assets/mi-foto.jpg"`

---

## 🔗 TAREA 8: Agregar Link Nuevo

**Ejemplo**: Agregar enlace a LinkedIn

### Paso 1: Encuentra la sección de contacto
Busca: `<section class="contact-info">`

### Paso 2: Agrega un nuevo item
```html
<div class="contact-item">
    <div class="contact-icon">
        💼
    </div>
    <h3>LinkedIn</h3>
    <a href="https://linkedin.com/in/tuusuario" target="_blank">Ver perfil</a>
</div>
```

### Paso 3: Cambia la URL y el text
- `https://linkedin.com/in/tuusuario` = Tu URL de LinkedIn
- `Ver perfil` = El texto del enlace

---

## 🎓 CONSEJOS DE EDICIÓN

### ✅ HACER
```
✓ Siempre trabaja en un editor de texto (VS Code, Sublime)
✓ Guarda backups antes de hacer cambios grandes
✓ Recarga el navegador (F5) después de cada cambio
✓ Usa Ctrl+Z si algo sale mal (deshacer)
✓ Prueba cambios en móvil también
```

### ❌ NO HACER
```
✗ No edites en Word o Google Docs
✗ No borres etiquetas HTML (<tag>)
✗ No modifiques archivos sin hacer backup
✗ No dejes "TODO" incompleto (HTML puede romperse)
✗ No pruebes solo en desktop
```

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### El sitio se ve roto después de mis cambios

**Solución 1**: Presiona `Ctrl+Shift+Del` (caché vacío)
- Recarga F5

**Solución 2**: Abre DevTools y busca errores
- Presiona F12
- Busca mensajes rojos (errores)

**Solución 3**: Revierte los cambios
- Presiona `Ctrl+Z` múltiples veces
- O reemplaza el archivo original

### Los cambios no se ven

**Soluciones**:
1. Actualiza F5 (o Ctrl+Shift+R para caché completo)
2. Cierra y reabre el navegador
3. Verifica que guardaste con `Ctrl+S`

### El color no cambió

**Verifica**:
1. ¿Editaste `css/main.css`?
2. ¿Guardaste con `Ctrl+S`?
3. ¿Recargaste con F5?
4. ¿Es el código hex correcto? (busca online "color picker")

---

## 📱 PROBAR EN MÓVIL

### Paso 1: En el mismo PC
- Abre DevTools (F12)
- Haz clic en el ícono de móvil
- Prueba responsividad

### Paso 2: En tu celular
- En el navegador ve a: `http://192.168.x.x:8080`
- (Reemplaza x.x con tu IP local)

---

## 🚀 PUBLICACIÓN

Cuando esté listo para publicar:

1. **Revisa todo en local** (http://localhost:8080)
2. **Prueba en móvil** 
3. **Verifica enlaces** (¿todos van a lugares correctos?)
4. **Prueba formulario** (¿envía bien?)
5. **Elige hosting**:
   - Netlify (recomendado - gratis, fácil)
   - GitHub Pages (gratis)
   - Tu servidor web propio

---

## 📞 GUÍA RÁPIDA DE REFERENCIAS

| Cambio | Archivo | Líneas | Dificultad |
|--------|---------|--------|-----------|
| WhatsApp | `index.html` | Por buscar | ⭐ Fácil |
| Colores | `css/main.css` | 1-40 | ⭐ Fácil |
| Logo | `assets/` | 1 archivo | ⭐ Fácil |
| Textos | `index.html` | Varias | ⭐⭐ Media |
| Servicios | `index.html` | 75-150 | ⭐⭐ Media |
| Email | `index.html` | Por buscar | ⭐ Fácil |
| Imágenes | `index.html` | Varias | ⭐⭐ Media |
| CSS avanzado | `css/main.css` | 40+ | ⭐⭐⭐ Difícil |

---

## 🎯 CHECKLIST DE TAREAS COMUNES

- [ ] Cambié mi número de WhatsApp
- [ ] Actualicé mi email de contacto
- [ ] Cambié los colores a los míos
- [ ] Reemplacé el logo
- [ ] Cambié textos principales
- [ ] Agregué mis servicios
- [ ] Actualicé imágenes
- [ ] Probé en móvil
- [ ] Guardé backups
- [ ] Estoy listo para publicar

---

**¡Ahora estás listo para personalizar tu sitio web! 🚀**

Para consultas técnicas avanzadas, contacta a tu desarrollador.
