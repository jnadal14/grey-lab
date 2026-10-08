'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Media from '../Media'
import { InstagramIcon, YouTubeIcon } from '../icons'
import { nav, site } from '@/content/site'

export default function Footer() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  // The tagline lines slide in from opposite sides as the footer arrives.
  const left = useTransform(scrollYProgress, [0, 1], ['-30%', '0%'])
  const right = useTransform(scrollYProgress, [0, 1], ['30%', '0%'])

  return (
    <footer ref={ref} className="relative overflow-hidden border-t hairline bg-coal pb-[env(safe-area-inset-bottom)] pt-16 text-center md:pt-24">
      <div aria-hidden className="select-none text-[clamp(3rem,min(12vw,24svh),12.5rem)]">
        <motion.p style={{ x: left }} className="display whitespace-nowrap text-bone">Live music</motion.p>
        <motion.p style={{ x: right }} className="display -mt-[0.04em] whitespace-nowrap text-outline">and media</motion.p>
        <motion.p style={{ x: left }} className="display -mt-[0.04em] whitespace-nowrap text-bone">Starts here</motion.p>
      </div>
      <h2 className="sr-only">{site.tagline}</h2>

      <div className="container-x mt-14 flex flex-col items-center gap-8">
        <Link href="/" aria-label="Greylab home">
          <Media id="icon" alt="" sizes="48px" className="h-12 w-auto opacity-90 transition-opacity hover:opacity-100" />
        </Link>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 uppercase tracking-wide">
            {nav.map(n => (
              <li key={n.href}><Link href={n.href} className="text-fog transition-colors hover:text-bone">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-5 text-fog">
          <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-1 transition-colors hover:text-bone"><InstagramIcon className="size-5" /></a>
          <a href={site.youtube.url} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-1 transition-colors hover:text-bone"><YouTubeIcon className="size-5" /></a>
        </div>
      </div>

      <p className="container-x mt-12 max-w-2xl border-t hairline py-6 font-sans text-xs leading-relaxed text-ash">
        © {new Date().getFullYear()} Greylab Productions Ltd. {site.copyright}
      </p>
    </footer>
  )
}
