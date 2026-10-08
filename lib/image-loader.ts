// next/image loader for the static export.
//
// <Media> passes src as "/media/<key>@<w1>,<w2>,…" listing the widths that
// scripts/optimize-images.mjs actually wrote for that key. The loader picks
// the smallest written width that covers the requested one, so the browser
// never fetches a file that doesn't exist.
import { withBase } from './base-path'

export default function mediaLoader({ src, width }: { src: string; width: number }) {
  const at = src.lastIndexOf('@')
  if (at === -1) return withBase(src)
  const base = src.slice(0, at)
  const widths = src.slice(at + 1).split(',').map(Number)
  const pick = widths.find(w => w >= width) ?? widths[widths.length - 1]
  return withBase(`${base}-${pick}.webp`)
}
