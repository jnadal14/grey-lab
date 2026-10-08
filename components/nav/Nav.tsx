'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import Media from '../Media'
import { InstagramIcon } from '../icons'
import { nav, site } from '@/content/site'
import { upcoming } from '@/content/events'
import { formatDate } from '@/lib/format'

const isActive = (path: string, href: string) =>
  !href.includes('#') && (path === href || path === href.replace(/\/$/, ''))

const showDate = formatDate(upcoming.start, { month: 'short', day: 'numeric' }).replace('Sep ', 'Sept ')

/**
 * Same structure as the Dirty Aesthetic header: logo with the next-show ticket
 * pill beside it on the left, plain text links on the right. No hamburger: on
 * narrow screens the links drop to their own row under the logo.
 */
export default function Nav() {
  const path = usePathname()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const { scrollY } = useScroll()

  // Hide while scrolling down, return on any scroll up.
  useMotionValueEvent(scrollY, 'change', y => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(y > prev && y > 160)
    setSolid(y > 40)
  })

  const underline = hover ?? nav.find(n => isActive(path, n.href))?.href ?? null

  const links = (
    <ul className="flex items-center justify-between gap-1 md:justify-end md:gap-6" onMouseLeave={() => setHover(null)}>
      {nav.map(item => (
        <li key={item.href} className="relative">
          <Link
            href={item.href}
            onMouseEnter={() => setHover(item.href)}
            aria-current={isActive(path, item.href) ? 'page' : undefined}
            className="block whitespace-nowrap py-2 text-[clamp(0.9rem,3.6vw,1.05rem)] uppercase tracking-wide text-bone/80 transition-colors hover:text-bone aria-[current=page]:text-bone md:text-[1.15rem]"
          >
            {item.label}
          </Link>
          {underline === item.href && (
            <motion.span layoutId="nav-underline" className="absolute inset-x-0 bottom-1 h-px bg-bone" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]"
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`border-b transition-[background,border-color,backdrop-filter] duration-500 ${solid ? 'hairline bg-ink/75 backdrop-blur-xl' : 'border-transparent bg-gradient-to-b from-ink/60 to-transparent'}`}>
        <div className="container-x flex flex-col gap-1 py-3 md:flex-row md:items-center md:justify-between md:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href="/" aria-label="Greylab home" data-cursor="Home">
                <motion.span whileHover={{ rotate: -8, scale: 1.06 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="block">
                  <Media id="icon" alt="" sizes="48px" className="h-9 w-auto md:h-11" preload />
                </motion.span>
              </Link>
              <Link
                href="/#homecoming"
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-bone/10 px-2.5 pb-[4px] pt-[5px] font-sans text-[0.62rem] font-bold uppercase leading-none tracking-[0.08em] text-bone transition-colors hover:bg-bone hover:text-ink md:text-[0.72rem]"
                aria-label={`Tickets: ${upcoming.name}, ${showDate} at ${upcoming.venue.name}`}
              >
                <span className="hidden sm:inline">{showDate} at {upcoming.venue.name.replace(' Theatre', '')}</span>
                <span className="sm:hidden">{showDate} tickets</span>
              </Link>
            </div>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Greylab on Instagram (${site.instagram.handle})`} className="p-2 text-bone/80 transition-colors hover:text-bone md:hidden">
              <InstagramIcon className="size-5" />
            </a>
          </div>

          <nav aria-label="Primary" className="flex items-center gap-6">
            <div className="flex-1 md:flex-none">{links}</div>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Greylab on Instagram (${site.instagram.handle})`} className="hidden p-1 text-bone/80 transition-colors hover:text-bone md:block">
              <InstagramIcon className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
