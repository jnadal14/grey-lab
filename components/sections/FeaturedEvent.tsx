'use client'

import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { useRef } from 'react'
import Media from '../Media'
import Button from '../Button'
import Countdown from '../Countdown'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { upcoming as e } from '@/content/events'
import { formatDate, longDate } from '@/lib/format'

/** Poster that tilts toward the cursor in 3D. */
function TiltPoster() {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const glare = useTransform(ry, [-10, 10], [0, 100], { clamp: true })
  const glareBg = useTransform(glare, x => `radial-gradient(circle at ${x}% 30%, rgba(255,255,255,.35), transparent 55%)`)

  function move(ev: React.PointerEvent<HTMLDivElement>) {
    if (ev.pointerType !== 'mouse') return
    const r = ev.currentTarget.getBoundingClientRect()
    ry.set(((ev.clientX - r.left) / r.width - 0.5) * 16)
    rx.set(-((ev.clientY - r.top) / r.height - 0.5) * 16)
  }
  function leave() { rx.set(0); ry.set(0) }

  return (
    <div style={{ perspective: 1200 }} onPointerMove={move} onPointerLeave={leave}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="relative overflow-hidden rounded-xl shadow-[0_40px_120px_-20px_rgba(0,0,0,.9)] ring-1 ring-bone/10"
      >
        <Media id={e.poster} alt={`${e.name} poster: ${e.lineup.join(', ')}. ${longDate(e.start)}, ${e.venue.name}.`} sizes="(min-width: 1024px) 40vw, 90vw" className="h-auto w-full" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ background: glareBg }}
        />
      </motion.div>
    </div>
  )
}

export default function FeaturedEvent() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const ghostX = useTransform(scrollYProgress, [0, 1], ['10%', '-40%'])

  const meta = [
    { k: 'Date', v: formatDate(e.start, { weekday: 'long', month: 'long', day: 'numeric' }) },
    { k: 'Doors', v: e.doors ?? 'TBA' },
    { k: 'Venue', v: `${e.venue.name}, ${e.venue.address}` },
    { k: 'Entry', v: [e.ages, e.price].filter(Boolean).join(' · ') },
  ]

  return (
    <section id="homecoming" ref={ref} className="relative overflow-clip bg-ink py-24 md:py-36">
      <motion.p aria-hidden style={{ x: ghostX }} className="display text-outline pointer-events-none absolute top-10 whitespace-nowrap text-[min(22vw,45svh)] opacity-40">
        Homecoming · Homecoming
      </motion.p>

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-md lg:sticky lg:top-28 lg:max-w-none short:max-w-[16rem]">
            <Reveal y={60}>
              <TiltPoster />
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow">Greylab presents</p></Reveal>
          <h2 className="mt-5">
            <SplitText as="span" by="char" stagger={0.035} text={e.title[0]} className="display block text-[clamp(3rem,min(9.5vw,22svh),9.5rem)]" />
            <SplitText as="span" by="char" stagger={0.05} delay={0.3} text={e.title[1]} className="display block text-[clamp(3rem,min(9.5vw,22svh),9.5rem)] text-outline" />
          </h2>
          <Reveal delay={0.1}><p className="mt-8 max-w-xl text-2xl leading-snug text-fog">{e.blurb}</p></Reveal>

          <Reveal delay={0.15} className="mt-12 border-y hairline py-8">
            <p className="eyebrow mb-5">Doors in</p>
            <Countdown to={e.start} />
          </Reveal>

          <dl className="mt-4 grid sm:grid-cols-2">
            {meta.map((m, i) => (
              <Reveal key={m.k} delay={i * 0.06} className="border-b hairline py-5 sm:odd:pr-6">
                <dt className="eyebrow">{m.k}</dt>
                <dd className="mt-1 text-lg">{m.v}</dd>
              </Reveal>
            ))}
          </dl>

          <div className="mt-16">
            <Reveal><p className="eyebrow">The lineup</p></Reveal>
            <ol className="mt-4">
              {e.lineup.map((band, i) => (
                <li key={band} className="group border-b hairline">
                  <Reveal delay={i * 0.05} y={24} blur={false} className="flex items-baseline gap-5 py-3 md:py-4">
                    <span className="w-8 shrink-0 font-sans text-xs tabular-nums text-ash transition-colors group-hover:text-bone">{String(i + 1).padStart(2, '0')}</span>
                    <span className="display text-[clamp(2rem,min(5.5vw,13svh),4.75rem)] text-bone/85 transition-[color,transform,letter-spacing] duration-500 ease-out-expo group-hover:translate-x-3 group-hover:tracking-wide group-hover:text-bone">
                      {band}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal className="mt-14 flex flex-wrap gap-3">
            {e.ticketUrl && <Button href={e.ticketUrl} variant="solid" external>Get tickets</Button>}
            <Button href={`/${e.slug}.ics`} variant="ghost" download>Add to calendar</Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
