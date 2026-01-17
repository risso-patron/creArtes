const fs = require('fs');
const path = require('path');

// Solución alternativa sin dependencias externas
// Usaremos un servicio online API o crearemos WebP manualmente

const sourceDir = path.join(__dirname, 'crearte');
const files = fs.readdirSync(sourceDir);

const jpegFiles = files.filter(f => f.endsWith('.jpeg') || f.endsWith('.jpg'));

console.log('📸 Archivos JPEG encontrados:', jpegFiles.length);
console.log('\n🔄 Para convertir a WebP, necesitas instalar Sharp primero:');
console.log('   npm install --save-dev sharp --legacy-peer-deps');
console.log('\n📋 Lista de archivos a convertir:');
jpegFiles.forEach((file, i) => {
  console.log(`  ${i + 1}. ${file} → ${file.replace(/\.jpe?g$/, '.webp')}`);
});

console.log('\n✅ Una vez instalado Sharp, ejecuta este script nuevamente.');
console.log('   node convert-to-webp.js --convert');

// Si se ejecuta con --convert y Sharp está disponible
if (process.argv.includes('--convert')) {
  try {
    const sharp = require('sharp');
    
    console.log('\n🚀 Iniciando conversión...\n');
    
    let converted = 0;
    const promises = jpegFiles.map(async (file) => {
      const inputPath = path.join(sourceDir, file);
      const outputPath = path.join(sourceDir, file.replace(/\.jpe?g$/, '.webp'));
      
      try {
        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);
        
        const inputStats = fs.statSync(inputPath);
        const outputStats = fs.statSync(outputPath);
        const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
        
        converted++;
        console.log(`✓ ${file} → ${path.basename(outputPath)} (${savings}% más ligero)`);
      } catch (err) {
        console.error(`✗ Error en ${file}:`, err.message);
      }
    });
    
    Promise.all(promises).then(() => {
      console.log(`\n✅ Conversión completada: ${converted}/${jpegFiles.length} archivos`);
    });
    
  } catch (err) {
    console.error('\n❌ Sharp no está instalado. Ejecuta:');
    console.error('   npm install --save-dev sharp --legacy-peer-deps\n');
  }
}
