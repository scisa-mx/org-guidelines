// Copia los escenarios de cada docs/features/<feature>/<feature>.feature a su <feature>.md,
// dentro del bloque <!-- feature:start --> ... <!-- feature:end --> (05.15: el .feature es la
// fuente de verdad y el .md se exporta de él). Si el .md no existe, lo crea con un esqueleto.
//
// Uso:  node exportar-features.js <ruta-del-proyecto>
//       node exportar-features.js <ruta-del-proyecto> --revisar   (no escribe; falla si algún .md está desactualizado)
const fs = require('node:fs');
const path = require('node:path');

const raiz = process.argv[2];
const soloRevisar = process.argv.includes('--revisar');
if (!raiz) {
  console.error('Uso: node exportar-features.js <ruta-del-proyecto> [--revisar]');
  process.exit(2);
}

const dirFeatures = path.join(raiz, 'docs', 'features');
if (!fs.existsSync(dirFeatures)) {
  console.error(`No existe ${dirFeatures}`);
  process.exit(2);
}

const INICIO = '<!-- feature:start -->';
const FIN = '<!-- feature:end -->';
const bloque = (gherkin) => `${INICIO}\n\`\`\`gherkin\n${gherkin.trimEnd()}\n\`\`\`\n${FIN}`;

const esqueleto = (nombre, gherkin) => {
  const titulo = (gherkin.match(/^\s*Característica:\s*(.+)$/m) || [, nombre])[1].trim();
  return `# Feature: ${titulo}

## 1. Descripción

<Qué hace y qué problema resuelve.>

## 2. Actores

- **<Rol>**: <qué hace en este flujo>.

## 3. Reglas del sistema

- <Regla de negocio.>

## 4. Escenarios

${bloque(gherkin)}
`;
};

let desactualizados = 0;
for (const nombre of fs.readdirSync(dirFeatures).sort()) {
  const carpeta = path.join(dirFeatures, nombre);
  const archivoFeature = path.join(carpeta, `${nombre}.feature`);
  if (!fs.statSync(carpeta).isDirectory() || !fs.existsSync(archivoFeature)) continue;

  const gherkin = fs.readFileSync(archivoFeature, 'utf8');
  const archivoMd = path.join(carpeta, `${nombre}.md`);
  const actual = fs.existsSync(archivoMd) ? fs.readFileSync(archivoMd, 'utf8') : null;

  let nuevo;
  if (actual === null) {
    nuevo = esqueleto(nombre, gherkin);
  } else {
    const i = actual.indexOf(INICIO);
    const f = actual.indexOf(FIN);
    nuevo = i >= 0 && f > i
      ? actual.slice(0, i) + bloque(gherkin) + actual.slice(f + FIN.length)
      : `${actual.trimEnd()}\n\n## Escenarios\n\n${bloque(gherkin)}\n`;
  }

  if (nuevo === actual) {
    console.log(`  al día       ${nombre}`);
    continue;
  }
  desactualizados++;
  if (soloRevisar) {
    console.log(`  desactualizado ${nombre}`);
  } else {
    fs.writeFileSync(archivoMd, nuevo);
    console.log(`  ${actual === null ? 'creado      ' : 'actualizado '} ${nombre}`);
  }
}

if (soloRevisar && desactualizados > 0) process.exit(1);
