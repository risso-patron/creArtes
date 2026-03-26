# 🌓 Sistema de Tema Dark/Light - Studio CreArtes

## 📋 Descripción General

La web de Studio CreArtes ahora cuenta con un sistema de cambio de tema entre **Modo Oscuro** (Dark) y **Modo Claro** (Light), con el negro como color principal según las preferencias del cliente.

---

## 🎨 Paleta de Colores

### Colores Base
- **Negro**: `#000000` - Color principal del cliente
- **Blanco**: `#ffffff` - Color de contraste
- **Turquesa**: `#077a7a` - Color de acento
- **Turquesa Oscuro**: `#055555` - Variante oscura
- **Turquesa Claro**: `#099999` - Variante clara

### Modo Dark (Predeterminado) 🌙
```css
--background: #000000 (Negro)
--background-alt: #1a1a1a (Gris muy oscuro)
--background-card: #0d0d0d (Casi negro)
--text-primary: #ffffff (Blanco)
--text-secondary: #e0e0e0 (Gris claro)
--text-light: #a0a0a0 (Gris medio)
--border-color: #2a2a2a (Gris oscuro)
```

**Características visuales:**
- Fondo negro profundo
- Texto blanco brillante
- Cards con fondo gris muy oscuro (#0d0d0d)
- Bordes sutiles en gris oscuro
- Sombras más pronunciadas para profundidad
- Acentos en turquesa (#077a7a)

### Modo Light ☀️
```css
--background: #ffffff (Blanco)
--background-alt: #f8f8f8 (Gris muy claro)
--background-card: #ffffff (Blanco)
--text-primary: #000000 (Negro)
--text-secondary: #333333 (Gris oscuro)
--text-light: #666666 (Gris medio)
--border-color: #e0e0e0 (Gris claro)
```

**Características visuales:**
- Fondo blanco limpio
- Texto negro nítido
- Cards con fondo blanco
- Bordes en gris claro
- Sombras suaves y delicadas
- Acentos en turquesa (#077a7a)

---

## 🔧 Implementación Técnica

### 1. Variables CSS (`css/main.css`)
```css
/* Variables base en :root (modo dark por defecto) */
:root {
  --primary-color: var(--turquesa);
  --text-primary: var(--blanco);
  --background: var(--negro);
  /* ... más variables */
}

/* Variables para modo light */
[data-theme="light"] {
  --text-primary: var(--negro);
  --background: var(--blanco);
  --background-card: var(--blanco);
  /* ... más variables */
}
```

### 2. HTML Toggle Button (`index.html`)
Ubicado en el header después del menú de navegación:

```html
<button class="theme-toggle" id="themeToggle" aria-label="Cambiar tema">
  <svg class="sun-icon">...</svg>  <!-- Visible en modo light -->
  <svg class="moon-icon">...</svg> <!-- Visible en modo dark -->
</button>
```

**Características del botón:**
- Diseño circular con borde
- Iconos de sol/luna que rotan al cambiar
- Hover con rotación de 20 grados
- Responsive (más pequeño en mobile)

### 3. JavaScript (`js/main.js`)
```javascript
// Inicializar tema desde localStorage o usar 'dark' por defecto
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

// Toggle al hacer click
themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});
```

**Funcionalidades:**
- Guarda preferencia en `localStorage`
- Recuerda la elección del usuario entre visitas
- Modo dark como predeterminado
- Transiciones suaves entre temas

---

## 🎯 Elementos Actualizados

### Componentes con soporte de tema:
✅ **Header/Navigation**
- Fondo adaptativo (`var(--background-card)`)
- Texto y bordes con colores variables

✅ **Hero Section**
- Fondo principal (`var(--background)`)
- Títulos y textos adaptativos

✅ **Service Cards**
- Fondo de cards (`var(--background-card)`)
- Bordes y sombras variables

✅ **About Cards** (Misión, Visión, Valores)
- Actualizado desde colores hardcodeados
- Efectos hover con opacidad adaptativa
- Bordes y fondos dinámicos

✅ **Buttons**
- Color primario turquesa en ambos modos
- Texto adaptativo según contraste

✅ **Forms & Inputs**
- Bordes y fondos variables
- Placeholder text adaptativo

✅ **Footer**
- Fondo y texto adaptativos
- Links con color primario

---

## 📱 Responsive Design

### Mobile (< 640px)
```css
.theme-toggle {
  width: 36px;  /* Más pequeño */
  height: 36px;
  margin-left: 0.5rem;
}

.theme-toggle svg {
  width: 18px;
  height: 18px;
}
```

### Desktop (> 640px)
```css
.theme-toggle {
  width: 40px;
  height: 40px;
  margin-left: 1rem;
}
```

---

## 🔍 Transiciones y Animaciones

### Toggle Button
- **Transform rotation**: 20deg en hover
- **Icon transition**: Rotación 90deg + scale 0/1
- **Border color**: Cambia a turquesa en hover

### Theme Switch
- **Transition**: `all 0.3s ease` en todos los elementos
- **Color fade**: Suave cambio entre paletas
- **No flash**: Carga desde localStorage antes de renderizar

---

## 📝 Uso para el Cliente

### Cambiar de tema:
1. Hacer clic en el botón circular con icon de sol/luna (esquina superior derecha)
2. El tema cambia instantáneamente
3. La preferencia se guarda automáticamente
4. Al volver a visitar la web, se carga el último tema usado

### Comportamiento predeterminado:
- **Primera visita**: Modo Dark (negro principal) 🌙
- **Visitas posteriores**: Último tema seleccionado

---

## 🎨 Personalización Futura

Para ajustar colores, editar en `css/main.css`:

```css
:root {
  /* Cambiar colores base aquí */
  --turquesa: #077a7a;  /* Color de acento */
  --negro: #000000;     /* Color principal dark */
  --blanco: #ffffff;    /* Color principal light */
}
```

Para cambiar el tema predeterminado, editar en `js/main.js`:
```javascript
const currentTheme = localStorage.getItem('theme') || 'light'; // Cambiar a 'light'
```

---

## ✅ Compatibilidad

- ✅ Chrome/Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Móviles iOS/Android
- ✅ Tablets

---

## 🚀 Próximas Mejoras (Opcionales)

- [ ] Detección automática de preferencia del sistema (`prefers-color-scheme`)
- [ ] Animación de transición más elaborada al cambiar tema
- [ ] Más variantes de color (ej: tema azul, rojo)
- [ ] Accesibilidad mejorada (alto contraste)

---

**Versión**: 1.0  
**Fecha**: Noviembre 2025  
**Diseñado para**: Studio CreArtes - Panamá
