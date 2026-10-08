'use client'

import { motion, useMotionTemplate, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Media from '../Media'
import ContactForm from '../ContactForm'
import SplitText from '../motion/SplitText'
import Reveal from '../motion/Reveal'
import { getInvolved } from '@/content/copy'

/**
 * The crowd photo opens out from an inset card to full-bleed, then stays
 * pinned as the background while the contact form scrolls up over it.
 */
export default function ContactBlock() {
  const spacer = useRef<HTMLDivElement>(null)
  // 0 when the section's top enters the bottom of the screen, 1 once a full
  // screen has scrolled past the pin: the photo's whole opening move.
  const { scrollYProgress } = useScroll({ target: spacer, offset: ['start end', 'end start'] })
  const inset = useTransform(scrollYProgress, [0.25, 0.75], [14, 0])
  const radius = useTransform(scrollYProgress, [0.25, 0.75], [28, 0])
  const clipPath = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)`
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1])
  const shade = useTransform(scrollYProgress, [0.7, 1], [0, 0.8])

  return (
    <section id="contact" className="relative bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath }}>
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Media id="crowdsurf" alt="" fill sizes="100vw" className="object-cover" />
          </motion.div>
          <motion.div aria-hidden className="absolute inset-0 bg-ink" style={{ opacity: shade }} />
        </motion.div>
      </div>

      <div className="relative -mt-[100svh]">
        <div ref={spacer} aria-hidden className="h-[100svh]" />
        <div className="flex min-h-[100svh] items-center py-24 md:py-36">
          <div className="container-x grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SplitText text="Get in touch" className="display text-huge" />
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-md text-2xl leading-snug text-bone/85">{getInvolved.cta}</p>
              </Reveal>
            </div>
            <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
              <ContactForm compact />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
