@echo off
cd /d e:\Dev\@Clientes\creArtes
git add css\main-new.css index.html js\main.js
git commit -m "feat: UX optimization - hero rewrite, services first, simplified form"
git push origin master
echo.
echo === Resultado del push ===
pause
