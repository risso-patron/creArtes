# Studio CreArtes - AI Coding Instructions

## Project Overview
Professional landing page + portfolio for Studio CreArtes, a graphic design studio in Panama targeting SMEs. Fully functional site with custom turquoise branding, real service offerings, dark/light mode system, and conversion-focused UX.

**Stack:** Vanilla HTML5, CSS3, JavaScript (ES6+) - No frameworks  
**Status:** Production-ready with ongoing optimization

## Architecture & Structure

### File Organization
```
creArtes/
├── index.html          # Single-page site (807 lines) - all sections in one file
├── css/
│   ├── main.css        # Complete styles (2605 lines) with CSS variables
│   └── main-backup.css # Backup of previous design (DO NOT DELETE)
├── js/
│   └── main.js         # All interactions (522 lines) - vanilla JS only
├── assets/
│   └── Logo-Creartes.webp  # Studio logo (optimized WebP)
└── Image/              # Additional images (legacy, check before use)
```

**Critical:** This is a **single-page application** - all sections are in `index.html`. Don't split into multiple HTML files.

## Design System & Branding

### Color Palette (CSS Variables in `:root`)
**Brand Colors:**
- `--turquesa: #077a7a` - Primary brand color (sacred, don't change)
- `--turquesa-dark: #055555` - Hover states
- `--turquesa-light: #099999` - Accents

**Theme System (Dark/Light Mode):**
- **Default:** Dark mode (`data-theme="dark"`)
- **Black is primary:** `--background: #000000` in dark mode
- **Toggle:** Button in header switches themes, saves to `localStorage`
- **Variables change:** `--text-primary`, `--background`, `--background-card`, etc.

```css
/* Dark mode (default) */
:root {
  --background: #000000;
  --text-primary: #ffffff;
}

/* Light mode */
[data-theme="light"] {
  --background: #ffffff;
  --text-primary: #000000;
}
```

### Typography
- **Primary:** `--font-primary: 'Roboto', 'Lato', sans-serif` - body text
- **Secondary:** `--font-secondary: 'Montserrat', 'Open Sans', sans-serif` - headings
- **Headings:** Always use `.highlight` span for brand color on key words

## Critical Patterns & Conventions

### 1. **Responsive Design (Mobile-First)**
All components must work across:
- Mobile: `< 480px`
- Tablet: `480px - 1024px`  
- Desktop: `> 1024px`

Use `clamp()` for fluid typography:
```css
font-size: clamp(2rem, 4vw, 3rem);
```

### 2. **Smooth Scroll & Animations**
- **Scroll behavior:** `scroll-behavior: smooth` in `html`
- **Intersection Observer:** Used for fade-ins (`.fade-in` class)
- **Threshold:** `0.1` with `rootMargin: "0px 0px -50px 0px"`

Example pattern:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
}, { threshold: 0.1 });
```

### 3. **Navigation & Sections**
**Sections:** `#inicio`, `#servicios`, `#nosotros`, `#portafolio`, `#contacto`  
**Nav links:** Anchor links with `href="#section-id"`  
**Mobile nav:** Toggle with hamburger button (#navToggle)

```javascript
// Mobile menu closes on link click
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});
```

### 4. **Form Handling (Contact Form)**
- **No backend:** Form redirects to WhatsApp with pre-filled message
- **Validation:** Email regex, required fields check in JS
- **Success state:** Hides form, shows `#formSuccess`, auto-redirects to WhatsApp

```javascript
// WhatsApp integration pattern
const whatsappUrl = `https://wa.me/506934707?text=${encodeURIComponent(message)}`;
window.open(whatsappUrl, '_blank');
```

### 5. **CTA Buttons & Conversion**
**Primary CTA:** `.btn-whatsapp` - green WhatsApp button  
**Secondary CTA:** `.btn-primary` - turquoise brand button

**WhatsApp number:** `+50769347097` (consistent across all CTAs)  
**Email:** `Contacto@studiocreartes.com`

## Content Strategy

### Services (5 Categories - REAL)
1. 🎨 Diseño Gráfico Creativo
2. 📣 Publicidad y Marketing Visual
3. 💻 Soluciones Web y Digitales
4. 🎁 Artículos Promocionales
5. 📱 Asesoría y Gestión de Contenidos

**Pattern:** Each service card has icon, title, description, features list, CTA button

### Brand Voice & Messaging
- **Misión:** Creatividad accesible con profesionalismo
- **Visión:** Ser referente para marcas emergentes en Panamá
- **Valores:** Creatividad accesible, Profesionalismo, Colaboración

**Tone:** Warm, professional, empowering - speaks to SMEs with limited budgets

## Development Workflows

### Testing Locally
```bash
# Navigate to project
cd c:\Users\luisr\Repo-de-desarrollo\creArtes

# Start Python server
python -m http.server 8080

# Open in browser
http://localhost:8080
```

### CSS Editing Rules
1. **Never remove backup:** `main-backup.css` is intentional
2. **Use variables:** Always reference CSS variables, never hardcode colors
3. **Dark/light both:** Test changes in both themes
4. **Preserve specificity:** Maintain existing cascade order

### JavaScript Patterns
- **No jQuery:** Vanilla JS only
- **Event delegation:** Used for dynamic elements
- **LocalStorage:** Only for theme preference (`theme` key)
- **Console logs:** Remove before production (some `[v0]` logs still present)

### Performance Considerations
- **Images:** Use WebP format (see `Logo-Creartes.webp`)
- **Lazy loading:** `loading="lazy"` on images below fold
- **Video:** Hero video from CDN (Coverr), autoplay muted loop
- **Fonts:** Preconnect to Google Fonts

## Common Tasks

### Adding a New Section
1. Add anchor `id="section-name"` to `<section>`
2. Add nav link in header: `<a href="#section-name">Label</a>`
3. Apply `.fade-in` class for scroll animations
4. Use `.container` or `.container-sm` for width constraints

### Modifying Colors
1. Change CSS variable in `:root` (dark mode)
2. Mirror change in `[data-theme="light"]` if needed
3. Test contrast ratios (WCAG AA minimum)
4. **DO NOT** change `--turquesa` without client approval

### Adding Interactive Elements
1. Follow existing patterns (see FAQ accordion, lightbox gallery)
2. Use `IntersectionObserver` for scroll-triggered animations
3. Add ARIA labels for accessibility
4. Test keyboard navigation

## Documentation References

- **README.md** - Project overview, structure, usage
- **TEMA_DARK_LIGHT.md** - Complete theme system documentation
- **CAMBIOS_IMPLEMENTADOS.md** - Change log of customizations
- **GUIA_PERSONALIZACION.md** - Customization guide for client

## Critical Don'ts

❌ **Never** change the turquoise color (`#077a7a`) without approval  
❌ **Never** delete `main-backup.css` - it's intentional backup  
❌ **Never** add frameworks (React, Vue, etc.) - keep it vanilla  
❌ **Never** change WhatsApp number without verification  
❌ **Never** remove dark mode as default - client preference  
❌ **Never** split into multi-page - it's a single-page design

## Quick Wins for Optimization

1. **SEO:** Add OpenGraph meta tags (currently missing)
2. **Performance:** Minify CSS/JS for production
3. **Accessibility:** Audit with Lighthouse (target 95+ score)
4. **Images:** Optimize portfolio images (some from Unsplash CDN)
5. **Forms:** Add honeypot field for spam protection

## Context for AI Agents

This is a **real business site** for SMEs in Panama. Changes must:
- Respect existing brand identity (turquoise, black, modern)
- Maintain conversion focus (CTAs, WhatsApp, contact form)
- Keep code simple for client maintenance
- Work perfectly on mobile (primary traffic source)
- Load fast (SME clients have slower connections)

When suggesting changes, always explain **why** it helps the business, not just the technical improvement.
