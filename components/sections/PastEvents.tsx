'use client'

import { motion } from 'motion/react'
import Media from '../Media'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import Parallax from '../motion/Parallax'
import { past, type GreylabEvent } from '@/content/events'
import { formatDate } from '@/lib/format'

function EventCard({ e, i }: { e: GreylabEvent; i: number }) {
  return (
    <Reveal delay={i * 0.1} y={60} className={i % 2 ? 'md:mt-24' : ''}>
      <motion.article initial="rest" whileHover="hover" animate="rest" className="group" data-cursor="Past show">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-smoke">
          <Parallax offset={30} className="absolute -inset-y-10 inset-x-0">
            <motion.div className="relative h-full w-full" variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              <Media id={e.poster} alt={`${e.name} poster`} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          </Parallax>
          {/* Lineup slides up over the poster on hover. */}
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/90 to-transparent p-6 pt-20"
            variants={{ rest: { y: '101%' }, hover: { y: '0%' } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="eyebrow">Lineup</p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {e.lineup.map(b => <li key={b} className="display text-2xl">{b}</li>)}
            </ul>
          </motion.div>
          <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 text-xs uppercase tracking-[0.16em] backdrop-blur">
            {formatDate(e.start, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="display text-4xl md:text-5xl">{e.name}</h3>
            <p className="mt-2 max-w-sm leading-snug text-fog">{e.blurb}</p>
          </div>
          <span className="eyebrow shrink-0 pt-2">{e.lineup.length} bands</span>
        </div>
      </motion.article>
    </Reveal>
  )
}

export default function PastEvents() {
  return (
    <section className="relative bg-coal py-24 md:py-36">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div>
            <SplitText text="Past events" className="display text-giant" />
          </div>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 md:gap-10 lg:mx-auto lg:max-w-5xl">
          {past.map((e, i) => <EventCard key={e.slug} e={e} i={i} />)}
        </div>
      </div>
    </section>
  )
}
