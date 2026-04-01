@echo off
cd /d "e:\Dev\@Clientes\creArtes"
git add css/main-new.css index.html js/main.js
git commit -m "feat: UX optimization - hero copy, services first, simplified form, removed fake testimonials"
git config remote.origin.url https://github.com/risso-patron/creArtes
git push origin master
echo Done.
pause
