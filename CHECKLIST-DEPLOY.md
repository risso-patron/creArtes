# ✅ Checklist de Deployment - Categorizador Studio CreArtes

## Pre-Deploy

- [ ] Verificar que todas las 41 imágenes están en `crearte/`
- [ ] Probar localmente en http://localhost:8080/image-categorizer.html
- [ ] Confirmar que las imágenes cargan correctamente
- [ ] Probar selección de categorías
- [ ] Verificar que localStorage guarda el progreso (recargar página)
- [ ] Probar generación de script
- [ ] Revisar que el script se puede copiar

---

## Deploy a Vercel

### Opción A: Vercel Dashboard (Recomendado para primera vez)

1. - [ ] Ir a https://vercel.com/new
2. - [ ] Hacer login (GitHub, GitLab o Email)
3. - [ ] Seleccionar "Import Git Repository" o arrastra carpeta
4. - [ ] Framework: **Other**
5. - [ ] Root Directory: `./`
6. - [ ] Build Command: (vacío)
7. - [ ] Output Directory: `./`
8. - [ ] Click "Deploy"
9. - [ ] Esperar 1-2 minutos
10. - [ ] Copiar URL generada

### Opción B: Vercel CLI (Rápido)

```bash
# 1. Instalar Vercel CLI (solo primera vez)
npm i -g vercel

# 2. Navegar a carpeta
cd "e:\Dev\@Clientes\creArtes"

# 3. Deploy
vercel --prod

# 4. Seguir instrucciones en pantalla
```

- [ ] Comando ejecutado sin errores
- [ ] URL generada correctamente

---

## Post-Deploy

### Verificación Técnica

- [ ] Abrir URL en navegador
- [ ] Verificar que carga la página principal
- [ ] Confirmar que se ven las 41 imágenes
- [ ] Probar un selector de categoría
- [ ] Recargar página → verificar que guardó
- [ ] Probar generación de script
- [ ] Copiar script → verificar contenido
- [ ] Probar en mobile (responsive)
- [ ] Probar en diferentes navegadores:
  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari (iOS si es posible)
  - [ ] Edge

### Testing de Usuario

- [ ] Categorizar 3-5 imágenes de prueba
- [ ] Usar filtros para ver categorías específicas
- [ ] Cambiar categoría de una imagen ya seleccionada
- [ ] Cerrar y reabrir → verificar persistencia
- [ ] Generar script con las 5 imágenes
- [ ] Verificar que el script tiene sentido

---

## Compartir con Cliente

### Preparar Mensaje

- [ ] Copiar URL de Vercel
- [ ] Abrir `MENSAJE-CLIENTE.txt`
- [ ] Personalizar mensaje con el link real
- [ ] Reemplazar [TU-LINK] con la URL real
- [ ] Agregar nombre del cliente

### Enviar

- [ ] Enviar por WhatsApp **O**
- [ ] Enviar por Email
- [ ] Confirmar que el cliente recibió el mensaje
- [ ] Confirmar que el cliente puede abrir el link

---

## Durante el Proceso del Cliente

### Soporte

- [ ] Estar disponible para dudas
- [ ] Revisar si el cliente tiene problemas
- [ ] Si necesita ayuda, ofrecer:
  - [ ] Llamada de 5 minutos para explicar
  - [ ] Video tutorial rápido
  - [ ] Hacerlo juntos en videollamada

### Seguimiento

Después de 1-2 días si no hay respuesta:
- [ ] Mensaje de seguimiento: "Hola! ¿Pudiste revisar el link de las imágenes?"
- [ ] Ofrecer ayuda si hay confusión

---

## Recibir Script del Cliente

### Al Recibir

- [ ] Cliente envió el script completo
- [ ] Copiar y guardar en archivo: `organizar-imagenes.ps1`
- [ ] Verificar que tiene comandos PowerShell válidos
- [ ] Confirmar número de imágenes categorizadas

### Ejecutar Script

```powershell
# 1. Abrir PowerShell en la carpeta crearte
cd "e:\Dev\@Clientes\creArtes\crearte"

# 2. Verificar contenido
Get-Content organizar-imagenes.ps1

# 3. Ejecutar
.\organizar-imagenes.ps1
```

- [ ] Script ejecutado sin errores
- [ ] Carpetas creadas en `../assets/portfolio/`
- [ ] Imágenes copiadas correctamente
- [ ] Verificar nombres: `branding-01.jpg`, `publicidad-01.jpg`, etc.

---

## Verificación Final

### Estructura de Carpetas

```
assets/
└── portfolio/
    ├── branding/
    │   ├── branding-01.jpg
    │   ├── branding-02.jpg
    │   └── ...
    ├── publicidad/
    │   └── ...
    ├── web-digital/
    │   └── ...
    ├── merchandising/
    │   └── ...
    └── redes-sociales/
        └── ...
```

- [ ] Todas las carpetas creadas
- [ ] Imágenes en las carpetas correctas
- [ ] Nombres consistentes y ordenados

### Resumen

- [ ] Total de imágenes categorizadas: _____ / 41
- [ ] Branding: _____ imágenes
- [ ] Publicidad: _____ imágenes
- [ ] Web: _____ imágenes
- [ ] Merchandising: _____ imágenes
- [ ] Redes Sociales: _____ imágenes

---

## Próximos Pasos

- [ ] Optimizar imágenes a WebP
- [ ] Integrar al portafolio en index.html
- [ ] Agregar filtros de categoría
- [ ] Implementar lightbox con imágenes reales
- [ ] Agregar descripciones de proyectos
- [ ] Testing final del portafolio completo

---

## Notas

**Fecha de deploy:** _____________  
**URL de Vercel:** _____________  
**Fecha envío a cliente:** _____________  
**Fecha recepción script:** _____________  
**Imágenes categorizadas:** _____ / 41  
**Observaciones:**

_____________________________________________
_____________________________________________
_____________________________________________

---

## Contacto de Emergencia

Si algo falla:
- **Vercel Support:** support@vercel.com
- **Docs:** https://vercel.com/docs
- **Dashboard:** https://vercel.com/dashboard

---

✅ **¡Todo listo para deploy!**
