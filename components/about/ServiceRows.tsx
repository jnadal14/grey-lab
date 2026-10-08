'use client'

import { motion } from 'motion/react'
import Media from '../Media'
import Parallax from '../motion/Parallax'
import Reveal from '../motion/Reveal'
import { services } from '@/content/services'

/** The four services in alternating image/text rows, as on greylab.ca/work-with-us. */
export default function ServiceRows() {
  return (
    <div className="space-y-16 md:space-y-32">
      {services.map((s, i) => (
        <article key={s.id} id={`service-${s.id}`} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-center gap-5 sm:grid-cols-12 sm:gap-10 md:gap-16">
          <motion.div
            className={`relative aspect-[4/5] overflow-hidden rounded-xl sm:col-span-5 md:col-span-6 md:rounded-2xl ${i % 2 ? 'sm:order-2 sm:col-start-8 md:col-start-7' : ''}`}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          >
            <Parallax offset={50} className="absolute -inset-y-16 inset-x-0">
              <div className="relative h-full w-full">
                <Media id={s.image} alt={s.title} fill sizes="(min-width: 768px) 50vw, 40vw" className="object-cover" />
              </div>
            </Parallax>
          </motion.div>
          <div className={`sm:col-span-7 md:col-span-5 ${i % 2 ? 'sm:order-1 sm:col-start-1' : 'md:col-start-8'}`}>
            <Reveal><span className="display text-5xl md:text-9xl">0{i + 1}</span></Reveal>
            <Reveal delay={0.05}><h3 className="display mt-2 text-[clamp(1.75rem,min(5vw,12svh),4.75rem)] md:mt-4">{s.title}</h3></Reveal>
            <Reveal delay={0.1}><p className="mt-3 text-[1.05rem] leading-snug text-fog md:mt-5 md:text-2xl">{s.body}</p></Reveal>
          </div>
        </article>
      ))}
    </div>
  )
}
