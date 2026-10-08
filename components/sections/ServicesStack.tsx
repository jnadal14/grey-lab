'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import Media from '../Media'
import Button from '../Button'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { services, servicesIntro, type Service } from '@/content/services'

function Card({ s, i, total, progress }: { s: Service; i: number; total: number; progress: MotionValue<number> }) {
  // Each card shrinks and dims a little as the ones after it stack on top.
  const start = i / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i - 1) * 0.045])
  const dim = useTransform(progress, [start, 1], [0, (total - i - 1) * 0.18])

  return (
    // Phones in landscape are too short to stack cards, so they just flow.
    <div className="sticky min-h-[60svh] md:h-[70svh] md:min-h-[420px] short:static short:h-auto short:min-h-0" style={{ top: `calc(7rem + ${i * 1.25}rem)` }}>
      <motion.article
        style={{ scale, transformOrigin: 'top center' }}
        className="relative grid h-full min-h-[inherit] grid-cols-[minmax(0,2fr)_minmax(0,3fr)] overflow-hidden rounded-2xl border hairline bg-smoke md:grid-cols-2 md:rounded-3xl"
      >
        <motion.div
          className="relative min-h-48 overflow-hidden"
          initial={{ clipPath: 'inset(12% 12% 12% 12% round 1.25rem)' }}
          whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0rem)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Media id={s.image} alt={s.title} fill sizes="(min-width: 768px) 50vw, 40vw" className="object-cover" />
        </motion.div>
        <div className="flex flex-col justify-between gap-6 p-5 md:p-12">
          <div className="flex items-center justify-between">
            <span className="display text-5xl md:text-8xl">0{i + 1}</span>
            <span className="eyebrow hidden sm:block">{String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          </div>
          <div>
            <h3 className="display text-[clamp(1.75rem,min(4.4vw,10svh),4.25rem)]">{s.title}</h3>
            <p className="mt-3 max-w-md text-[1.05rem] leading-snug text-fog md:mt-5 md:text-xl">{s.body}</p>
          </div>
        </div>
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.article>
    </div>
  )
}

export default function ServicesStack() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section id="services" className="relative bg-ink pb-24 md:pb-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 border-t hairline pt-16 md:flex-row md:items-end md:pt-24">
          <div>
            <Reveal><p className="eyebrow">Services</p></Reveal>
            <SplitText text={servicesIntro.title} className="display mt-4 text-giant" />
          </div>
          <Reveal className="max-w-sm">
            <p className="text-2xl leading-snug text-fog">{servicesIntro.body}</p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-14 space-y-[8vh] short:space-y-6">
          {services.map((s, i) => (
            <Card key={s.id} s={s} i={i} total={services.length} progress={scrollYProgress} />
          ))}
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center gap-4">
          <Button href="/get-involved/">Inquire here</Button>
          <Button href="/about/#services" variant="ghost">About our services</Button>
        </Reveal>
      </div>
    </section>
  )
}
