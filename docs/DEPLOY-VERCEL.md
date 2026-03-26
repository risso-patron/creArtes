# 🚀 Desplegar Categorizador a Vercel

## Opción 1: Deploy Manual (Más Fácil)

### Paso 1: Ir a Vercel
1. Abre https://vercel.com
2. Haz clic en "Sign Up" o "Log In" (puedes usar GitHub, GitLab o email)

### Paso 2: Crear Nuevo Proyecto
1. Haz clic en "Add New..." → "Project"
2. Selecciona "Import Git Repository" o arrastra la carpeta completa

### Paso 3: Configuración
```
Framework Preset: Other
Root Directory: ./
Build Command: (dejar vacío)
Output Directory: ./
```

### Paso 4: Deploy
1. Haz clic en "Deploy"
2. Espera 1-2 minutos
3. Copia el link que te da (ejemplo: `https://studio-creartes-categorizer.vercel.app`)

### Paso 5: Compartir con Cliente
Envía el link por WhatsApp o email:

```
Hola! 👋

Te comparto este link para que categorices las imágenes de tu portafolio:
https://tu-proyecto.vercel.app

Es muy fácil:
1. Abre el link
2. Selecciona la categoría de cada imagen
3. Al final, haz clic en "Generar Script"
4. Copia el texto y envíamelo de vuelta

Tu progreso se guarda automáticamente, así que puedes hacerlo en varios momentos.

Cualquier duda, me avisas! 😊
```

---

## Opción 2: Deploy desde Terminal (Rápido)

### Paso 1: Instalar Vercel CLI
```bash
npm i -g vercel
```

### Paso 2: Navegar a la carpeta
```bash
cd "e:\Dev\@Clientes\creArtes"
```

### Paso 3: Deploy
```bash
vercel --prod
```

Sigue las instrucciones en pantalla:
- Set up and deploy? → **Y**
- Which scope? → Selecciona tu cuenta
- Link to existing project? → **N**
- Project name? → `studio-creartes-categorizer` (o el que quieras)
- In which directory? → `.` (punto)

### Paso 4: Copiar Link
Al terminar, Vercel te dará un link como:
```
https://studio-creartes-categorizer.vercel.app
```

---

## Verificación Post-Deploy

Abre el link y verifica que:
- ✅ Las 41 imágenes se cargan correctamente
- ✅ Los selectores de categoría funcionan
- ✅ El progreso se guarda (recarga la página y debe mantener las selecciones)
- ✅ El botón "Generar Script" funciona
- ✅ El script se puede copiar

---

## Solución de Problemas

### Las imágenes no se cargan
**Causa:** La carpeta `crearte/` no se subió
**Solución:** 
1. Verifica que `.vercelignore` NO incluya `crearte/`
2. Re-deploy: `vercel --prod --force`

### El sitio no se ve bien
**Causa:** CSS no se cargó
**Solución:** Los estilos están inline, debería funcionar siempre. Hard refresh (Ctrl+F5)

### El progreso no se guarda
**Causa:** LocalStorage deshabilitado
**Solución:** Indica al cliente que habilite cookies/localStorage en su navegador

---

## Después que el Cliente Termine

1. **Recibe el script** del cliente por WhatsApp/Email
2. **Guárdalo** como `organizar-imagenes.ps1`
3. **Ejecútalo** en PowerShell:
   ```powershell
   cd "e:\Dev\@Clientes\creArtes\crearte"
   .\organizar-imagenes.ps1
   ```
4. **Verifica** que se crearon las carpetas en `assets/portfolio/`
5. **Continúa** con la integración al sitio web principal

---

## Personalización (Opcional)

### Cambiar el dominio
En Vercel Dashboard:
1. Ve a tu proyecto
2. Settings → Domains
3. Agrega: `categorizar.studiocreartes.com` (si tienes el dominio)

### Agregar contraseña
Para que solo el cliente acceda, agrega en `vercel.json`:
```json
{
  "functions": {
    "image-categorizer.html": {
      "memory": 128,
      "maxDuration": 10
    }
  },
  "env": {
    "PASSWORD": "creartes2025"
  }
}
```

---

## Costos
- **Vercel Plan Hobby:** GRATIS ✅
- Límites: 100GB bandwidth/mes (más que suficiente para esto)
- Sin tarjeta de crédito requerida

---

## Links Útiles
- Vercel Docs: https://vercel.com/docs
- Dashboard: https://vercel.com/dashboard
- Soporte: support@vercel.com
