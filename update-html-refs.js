const fs = require('fs');
const path = require('path');

// Script para actualizar referencias JPEG → WebP en index.html

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf-8');

const replacements = [
  // Servicios
  { old: 'src="crearte/fachada-optica-rosa-01.jpeg"', new: 'src="crearte/fachada-optica-rosa-01.webp"' },
  { old: 'src="crearte/neon-logo-corporativo-06.jpeg"', new: 'src="crearte/neon-logo-corporativo-06.webp"' },
  { old: 'src="crearte/neon-corazon-valentine-04.jpeg"', new: 'src="crearte/neon-corazon-valentine-04.webp"' },
  { old: 'src="crearte/neon-sharik-15.jpeg"', new: 'src="crearte/neon-sharik-15.webp"' },
  { old: 'src="crearte/merchandising-arroz-rico-01.jpeg"', new: 'src="crearte/merchandising-arroz-rico-01.webp"' },
  
  // Portfolio
  { old: 'src="crearte/packaging-arroz-rico-01.jpeg"', new: 'src="crearte/packaging-arroz-rico-01.webp"' },
  { old: 'src="crearte/rollup-banco-01.jpeg"', new: 'src="crearte/rollup-banco-01.webp"' },
  { old: 'src="crearte/fachada-interior-04.jpeg"', new: 'src="crearte/fachada-interior-04.webp"' },
];

let count = 0;
replacements.forEach(({ old, new: replacement }) => {
  if (html.includes(old)) {
    html = html.replace(new RegExp(old, 'g'), replacement);
    count++;
    console.log(`✓ ${old.match(/crearte\/(.*?)"/)[1]} → WebP`);
  }
});

fs.writeFileSync(indexPath, html, 'utf-8');
console.log(`\n✅ ${count} referencias actualizadas a WebP en index.html`);
