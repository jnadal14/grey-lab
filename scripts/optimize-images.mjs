// Builds web copies of every image in media-list.mjs.
//
// Photos and posters → public/media/<key>-<width>.webp at each width in
// WIDTHS (never upscaled). Brand marks keep their alpha and are written as a
// webp at 256w and 960w. Writes content/media.json with each key's
// intrinsic size, available widths, credit and a tiny blur placeholder, which
// lib/media.ts and the custom next/image loader read.
//
//   node scripts/optimize-images.mjs        (skips files already built)
//   node scripts/optimize-images.mjs --force

import { readdir, mkdir, writeFile, access, rm } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { BRAND, POSTERS, PHOTOS } from './media-list.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, '_source')
const OUT = path.join(ROOT, 'public', 'media')
const MANIFEST = path.join(ROOT, 'content', 'media.json')
export const WIDTHS = [480, 828, 1280, 1920]
const force = process.argv.includes('--force')

const exists = p => access(p).then(() => true, () => false)
const sources = await readdir(SRC)
const resolve = prefix => {
  const hit = sources.find(f => f.startsWith(prefix))
  if (!hit) throw new Error(`No master in _source/ for ${prefix}`)
  return path.join(SRC, hit)
}

// Brand marks: trim transparent padding, and turn an opaque white-on-black
// mark (the small icon) into white on transparent so it sits on any colour.
async function prepareMark(file, knockout) {
  if (!knockout) return sharp(file).trim().png().toBuffer()
  const { data, info } = await sharp(file).greyscale().raw().toBuffer({ resolveWithObject: true })
  const px = info.width * info.height
  const rgba = Buffer.alloc(px * 4, 255)
  for (let i = 0; i < px; i++) rgba[i * 4 + 3] = data[i * info.channels]
  return sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).trim().png().toBuffer()
}

await mkdir(OUT, { recursive: true })
const manifest = {}
const written = new Set()

const groups = [
  [BRAND, { widths: [256, 960], quality: 85, alpha: true }],
  [POSTERS, { widths: [480, 828, 1280], quality: 82 }],
  [PHOTOS, { widths: WIDTHS, quality: 78 }],
]

for (const [list, opts] of groups) {
  await Promise.all(Object.entries(list).map(async ([key, { prefix, credit, knockout }]) => {
    const file = resolve(prefix)
    const input = opts.alpha ? await prepareMark(file, knockout) : file
    const { width, height } = await sharp(input).rotate().metadata()
    const widths = opts.widths.filter(w => w <= width)
    if (!widths.length) widths.push(width)
    for (const w of widths) {
      const out = path.join(OUT, `${key}-${w}.webp`)
      written.add(path.basename(out))
      if (!force && await exists(out)) continue
      await sharp(input).rotate().resize({ width: w }).webp({ quality: opts.quality, alphaQuality: 100, effort: 5 }).toFile(out)
    }
    const blur = opts.alpha ? undefined : 'data:image/webp;base64,' +
      (await sharp(file).rotate().resize({ width: 16 }).webp({ quality: 40 }).toBuffer()).toString('base64')
    manifest[key] = { w: width, h: height, widths, credit, ...(blur && { blur }) }
  }))
}

// Remove copies of keys that are no longer in media-list.mjs.
for (const f of await readdir(OUT)) if (!written.has(f)) await rm(path.join(OUT, f))

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n')
console.log(`${Object.keys(sorted).length} images, ${written.size} files in public/media/`)
