// Simple asset generator using sharp to export PNGs from SVG
// Install sharp at the root: added as devDependency and wired via npm script
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = (p) => resolve(__dirname, p)

async function run() {
  const primary = out('./autoaid360_logo.svg')
  const mono = out('./autoaid360_logo_mono.svg')

  await sharp(primary).resize(1024, 1024, { fit: 'contain', background: 'white' }).png().toFile(out('./logo-regular.png'))
  await sharp(primary).resize(1200, 400, { fit: 'contain', background: 'white' }).png().toFile(out('./logo-horizontal.png'))
  await sharp(primary).resize(32, 32, { fit: 'contain', background: 'white' }).png().toFile(out('./favicon-32.png'))
  await sharp(primary).resize(16, 16, { fit: 'contain', background: 'white' }).png().toFile(out('./favicon-16.png'))
  console.log('Brand PNGs generated in /brand')
}

run().catch((e) => { console.error(e); process.exit(1) })

