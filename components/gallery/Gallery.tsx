'use client'

import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLenis } from 'lenis/react'
import Media from '../Media'
import { categories, gallery, type Category, type GalleryItem } from '@/content/gallery'
import { getMedia } from '@/lib/media'

type Filter = Category | 'all'

function Lightbox({ items, index, onClose, onStep }: { items: GalleryItem[]; index: number; onClose: () => void; onStep: (d: number) => void }) {
  const item = items[index]
  const m = getMedia(item.key)

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [onClose, onStep])

  return (
    <motion.div
      className="fixed inset-0 z-[65] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <motion.div
        layoutId={`photo-${item.key}`}
        className="relative max-h-full overflow-hidden rounded-lg"
        style={{ aspectRatio: `${m.width} / ${m.height}`, width: `min(92vw, calc(84svh * ${m.width / m.height}))` }}
        onClick={e => e.stopPropagation()}
        transition={{ type: 'spring', stiffness: 260, damping: 32 }}
      >
        <Media id={item.key} alt="" fill sizes="92vw" className="object-contain" />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-sm text-fog">
        <span className="eyebrow">Photo · {m.credit}</span>
        <span className="tabular-nums">{index + 1} / {items.length}</span>
      </div>
      <button type="button" onClick={e => { e.stopPropagation(); onStep(-1) }} aria-label="Previous photo" className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border hairline bg-ink/60 text-xl hover:border-bone/60">←</button>
      <button type="button" onClick={e => { e.stopPropagation(); onStep(1) }} aria-label="Next photo" className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border hairline bg-ink/60 text-xl hover:border-bone/60">→</button>
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid size-12 place-items-center rounded-full border hairline bg-ink/60 hover:border-bone/60">✕</button>
    </motion.div>
  )
}

/**
 * Filterable photo grid. Switching tabs lets the photos re-flow with layout
 * animations; opening one morphs it from its tile into the viewer.
 */
export default function Gallery({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<number | null>(null)
  const lenis = useLenis()

  const items = useMemo(() => {
    const list = filter === 'all' ? gallery : gallery.filter(g => g.category === filter)
    return limit ? list.slice(0, limit) : list
  }, [filter, limit])

  const counts = useMemo(() => ({
    all: gallery.length,
    concert: gallery.filter(g => g.category === 'concert').length,
    shoot: gallery.filter(g => g.category === 'shoot').length,
  }), [])

  useEffect(() => {
    if (open === null) return
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    return () => { lenis?.start(); document.documentElement.style.overflow = '' }
  }, [open, lenis])

  const step = useCallback((d: number) => setOpen(i => (i === null ? i : (i + d + items.length) % items.length)), [items.length])
  const close = useCallback(() => setOpen(null), [])

  return (
    <LayoutGroup>
      <div role="tablist" aria-label="Filter photos" className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c.id}
            role="tab"
            type="button"
            aria-selected={filter === c.id}
            onClick={() => setFilter(c.id)}
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium uppercase tracking-[0.14em] transition-colors ${filter === c.id ? 'text-ink' : 'text-fog hover:text-bone'}`}
          >
            {filter === c.id && <motion.span layoutId="gallery-tab" className="absolute inset-0 rounded-full bg-bone" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
            <span className="relative">{c.label} <span className="ml-1 text-[0.7em] opacity-60">{counts[c.id]}</span></span>
          </button>
        ))}
      </div>

      <motion.ul layout className="gallery-grid mt-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((g, i) => {
            const m = getMedia(g.key)
            return (
              <motion.li
                key={g.key}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 300, damping: 34 }}
                className={m.portrait ? 'row-span-2' : ''}
              >
                <button type="button" onClick={() => setOpen(i)} className="group relative block h-full w-full overflow-hidden rounded-lg bg-smoke" data-cursor="View" aria-label={`Open ${g.category} photo ${i + 1}, by ${m.credit}`}>
                  <motion.div layoutId={`photo-${g.key}`} className="absolute inset-0">
                    <Media id={g.key} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw" className="object-cover transition-[transform,filter] duration-700 ease-out-expo group-hover:scale-105" />
                  </motion.div>
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-ink/90 to-transparent p-3 text-left text-[0.65rem] uppercase tracking-[0.18em] text-fog transition-transform duration-500 group-hover:translate-y-0">
                    {g.category === 'shoot' ? 'Shoot' : 'Concert'} · {m.credit}
                  </span>
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
      </motion.ul>

      <AnimatePresence>
        {open !== null && items[open] && <Lightbox items={items} index={open} onClose={close} onStep={step} />}
      </AnimatePresence>
    </LayoutGroup>
  )
}
