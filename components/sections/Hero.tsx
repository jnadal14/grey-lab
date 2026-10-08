'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Media from '../Media'
import Countdown from '../Countdown'
import Marquee from '../motion/Marquee'
import { ArrowIcon } from '../icons'
import { upcoming } from '@/content/events'
import { longDate } from '@/lib/format'

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const logoY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink short:min-h-[360px]" aria-label="Greylab">
      {/* Photo: settles in from a slight zoom, then drifts with scroll. */}
      <motion.div className="absolute inset-0" style={{ y: imgY, scale: imgScale }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18, filter: 'brightness(0.2)' }}
          animate={{ scale: 1, filter: 'brightness(1)' }}
          transition={{ duration: 2.2, ease }}
        >
          <Media id="hero" alt="A packed Hollywood Theatre crowd facing a band under purple stage light" fill preload sizes="100vw" className="object-cover object-[50%_40%]" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,9,.75)_100%)]" />

      {/* Logo revealed through a rising mask. */}
      <motion.div style={{ y: logoY, opacity: fade }} className="absolute inset-0 flex items-center justify-center px-6 pb-24 short:justify-start short:pb-10 short:pl-[max(6vw,env(safe-area-inset-left))]">
        <motion.div
          className="w-[min(58vw,22rem,38svh)] md:w-[min(30vw,24rem,40svh)]"
          initial={{ clipPath: 'inset(100% 0 0 0)', y: 40 }}
          animate={{ clipPath: 'inset(0% 0 0 0)', y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.35 }}
        >
          <h1 className="sr-only">Greylab Productions: live music and media, Vancouver</h1>
          <Media id="logo" alt="" preload sizes="(min-width: 768px) 30vw, 58vw" className="h-auto w-full drop-shadow-[0_10px_40px_rgba(0,0,0,.6)]" />
        </motion.div>
      </motion.div>

      {/* Next event card. */}
      <motion.div
        style={{ opacity: fade }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 1.1 }}
        className="absolute inset-x-0 bottom-14 md:bottom-20 short:bottom-12"
      >
        <div className="container-x flex justify-center md:justify-end">
          <Link
            href="#homecoming"
            className="group flex w-full items-center gap-5 rounded-2xl border hairline bg-ink/55 p-3 pr-5 backdrop-blur-xl transition-colors hover:border-bone/40 md:w-auto"
            data-cursor="Tickets"
          >
            <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg short:h-14 short:w-11">
              <Media id={upcoming.poster} alt="" fill sizes="64px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-fog">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-bone opacity-75" /><span className="relative inline-flex size-2 rounded-full bg-bone" /></span>
                Next up
              </p>
              <p className="display mt-1 text-2xl">{upcoming.name}</p>
              <p className="text-xs text-fog">{longDate(upcoming.start)} · {upcoming.venue.name}</p>
            </div>
            <div className="hidden border-l hairline pl-5 sm:block"><Countdown to={upcoming.start} size="sm" /></div>
            <ArrowIcon className="size-5 shrink-0 text-bone transition-transform duration-500 group-hover:rotate-45" />
          </Link>
        </div>
      </motion.div>

      {/* Ticker along the bottom edge. */}
      <div className="absolute inset-x-0 bottom-0 border-t hairline bg-ink/70 py-2.5 backdrop-blur-md">
        <Marquee speed={0.8}>
          {[upcoming.name, longDate(upcoming.start), upcoming.venue.name, upcoming.ages ?? '', upcoming.price ?? '', ...upcoming.lineup].filter(Boolean).map((t, i) => (
            <span key={i} className="flex items-center text-[0.72rem] font-medium uppercase tracking-[0.24em] text-fog">
              <span className="px-5">{t}</span><span className="text-ash">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
