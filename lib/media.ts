import manifest from '@/content/media.json'

type Entry = { w: number; h: number; widths: number[]; credit: string; blur?: string }
const media = manifest as Record<string, Entry>

export type MediaKey = keyof typeof manifest

export function getMedia(key: MediaKey) {
  const m = media[key]
  return {
    src: `/media/${key}@${m.widths.join(',')}`,
    width: m.w,
    height: m.h,
    blur: m.blur,
    credit: m.credit,
    portrait: m.h > m.w * 1.05,
  }
}
