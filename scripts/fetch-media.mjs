// Downloads the source media for the prototype into _source/.
//
// Pages are scraped for Squarespace CDN image URLs so a new photo added to
// greylab.ca or jacksoniseli.com is picked up on the next run. Each file is
// fetched once at 2500w and recorded in _source/sources.json with the page it
// came from, which content/gallery.ts uses for credits.
//
//   node scripts/fetch-media.mjs

import { mkdir, writeFile, readFile, access } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const OUT = path.join(ROOT, '_source')

const GREYLAB = ['', 'about', 'get-involved', 'work-with-us', 'ourwork'].map(p => ({
  owner: 'greylab',
  page: `https://www.greylab.ca/${p}`,
}))
const JACKSON_GALLERIES = ['crashtest', 'sundress', 'chronicfatigue', 'choppingspree',
  'lovejoy', 'cherrypick', 'black-pontiac', 'dance', 'astro']
const JACKSON = [
  { owner: 'jackson', page: 'https://jacksoniseli.com/' },
  ...JACKSON_GALLERIES.map(g => ({ owner: 'jackson', page: `https://jacksoniseli.com/portfolio/${g}` })),
]
// Only Jackson's photos from the Dirty Aesthetic repo (his name is in the filename).
const DA = ['02', '03', '05', '08'].map(n => ({
  owner: 'jackson',
  page: 'https://github.com/jnadal14/dirty-aesthetic',
  url: `https://raw.githubusercontent.com/jnadal14/dirty-aesthetic/main/assets/images/gallery/full/jackson-iseli--${n}.jpg`,
  file: `da--jackson-iseli--${n}.jpg`,
}))

// The header logo is served from static1.squarespace.com, which the page scrape
// below does not match, so it is listed explicitly.
const LOGO = {
  owner: 'greylab',
  page: 'https://www.greylab.ca/',
  url: 'https://images.squarespace-cdn.com/content/v1/68ef723e7dbea90ed7a5e4cb/0e8d12f0-3d95-4608-ae0d-5e6ccac686ff/logotransparent.png?format=2500w',
  file: 'gl--0e8d12f0--logotransparent.png',
}

const CDN = /https:\/\/images\.squarespace-cdn\.com\/content\/v1\/[0-9a-f]+\/([0-9a-f-]{36})\/([^"'?&\s)]+?\.(?:jpe?g|png|webp))/gi
const SKIP = /favicon|Untitled-3\.png/i

const slug = s => decodeURIComponent(s).replace(/\+/g, '-').replace(/[^a-z0-9.-]+/gi, '-').toLowerCase()

async function exists(p) { try { await access(p); return true } catch { return false } }

async function scrape({ owner, page }) {
  const html = await (await fetch(page)).text()
  const found = new Map()
  for (const m of html.matchAll(CDN)) {
    const [url, id, name] = m
    if (SKIP.test(name) || found.has(id)) continue
    const where = page.replace(/https:\/\/(www\.)?/, '').replace(/\/$/, '')
    const prefix = owner === 'greylab' ? 'gl' : `ji--${where.split('/').pop() || 'home'}`
    found.set(id, { owner, page, url: `${url}?format=2500w`, file: `${prefix}--${id.slice(0, 8)}--${slug(name)}` })
  }
  return [...found.values()]
}

const manifestPath = path.join(OUT, 'sources.json')
const manifest = await exists(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {}

await mkdir(OUT, { recursive: true })
const pages = await Promise.all([...GREYLAB, ...JACKSON].map(scrape))
const all = [...pages.flat(), ...DA, LOGO]
const seen = new Set()
let fetched = 0
for (const item of all) {
  if (seen.has(item.file)) continue
  seen.add(item.file)
  const dest = path.join(OUT, item.file)
  if (!(await exists(dest))) {
    const res = await fetch(item.url)
    if (!res.ok) { console.warn(`skip ${res.status} ${item.url}`); continue }
    await writeFile(dest, Buffer.from(await res.arrayBuffer()))
    fetched++
  }
  manifest[item.file] = { owner: item.owner, page: item.page, url: item.url }
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`${seen.size} files (${fetched} new) in _source/`)
