@echo off
REM ========================================
REM Script de Minificación para Studio CreArtes
REM ========================================
REM
REM PREREQUISITOS:
REM 1. Instalar Node.js desde https://nodejs.org/
REM 2. Ejecutar en terminal: npm install -g clean-css-cli uglify-js html-minifier
REM
REM USO:
REM   Doble click en este archivo o ejecutar: minify.bat
REM
REM ========================================

echo.
echo ========================================
echo   MINIFICACION STUDIO CREARTES
echo ========================================
echo.

REM Verificar si existe node
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado.
    echo Por favor instala Node.js desde: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Verificando herramientas...
where cleancss >nul 2>nul
if %errorlevel% neq 0 (
    echo [INFO] Instalando clean-css-cli...
    call npm install -g clean-css-cli
)

where uglifyjs >nul 2>nul
if %errorlevel% neq 0 (
    echo [INFO] Instalando uglify-js...
    call npm install -g uglify-js
)

where html-minifier >nul 2>nul
if %errorlevel% neq 0 (
    echo [INFO] Instalando html-minifier...
    call npm install -g html-minifier
)

echo.
echo [2/4] Minificando CSS...
call cleancss -o css\main.min.css css\main.css
if %errorlevel% equ 0 (
    echo [OK] CSS minificado: css\main.min.css
) else (
    echo [ERROR] Error al minificar CSS
)

echo.
echo [3/4] Minificando JavaScript...
call uglifyjs js\main.js -o js\main.min.js -c -m
if %errorlevel% equ 0 (
    echo [OK] JavaScript minificado: js\main.min.js
) else (
    echo [ERROR] Error al minificar JavaScript
)

echo.
echo [4/4] Minificando HTML...
call html-minifier --collapse-whitespace --remove-comments --minify-css true --minify-js true -o index.min.html index.html
if %errorlevel% equ 0 (
    echo [OK] HTML minificado: index.min.html
) else (
    echo [ERROR] Error al minificar HTML
)

echo.
echo ========================================
echo   RESUMEN DE ARCHIVOS
echo ========================================

if exist css\main.min.css (
    for %%A in ("css\main.css") do set size_css_orig=%%~zA
    for %%A in ("css\main.min.css") do set size_css_min=%%~zA
    echo CSS Original:    %size_css_orig% bytes
    echo CSS Minificado:  %size_css_min% bytes
)

if exist js\main.min.js (
    for %%A in ("js\main.js") do set size_js_orig=%%~zA
    for %%A in ("js\main.min.js") do set size_js_min=%%~zA
    echo JS Original:     %size_js_orig% bytes
    echo JS Minificado:   %size_js_min% bytes
)

echo.
echo ========================================
echo   PROXIMO PASO
echo ========================================
echo.
echo Para usar los archivos minificados en produccion:
echo 1. Abre index.html
echo 2. Cambia:  href="css/main.css"  por  href="css/main.min.css"
echo 3. Cambia:  src="js/main.js"     por  src="js/main.min.js"
echo.
echo O usa index.min.html directamente (ya tiene todo minificado)
echo.
pause
