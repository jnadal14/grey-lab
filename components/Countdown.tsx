'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { now } from '@/lib/clock'

type Parts = { d: number; h: number; m: number; s: number }

function remaining(target: number): Parts {
  const t = Math.max(0, target - now())
  return {
    d: Math.floor(t / 864e5),
    h: Math.floor((t / 36e5) % 24),
    m: Math.floor((t / 6e4) % 60),
    s: Math.floor((t / 1e3) % 60),
  }
}

/** One digit column that rolls when its value changes. */
function Unit({ value, label, size }: { value: number; label: string; size: 'sm' | 'lg' }) {
  const text = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className={`relative overflow-hidden font-display tabular-nums leading-none ${size === 'lg' ? 'text-[clamp(2.5rem,min(7vw,16svh),6.5rem)]' : 'text-2xl'}`}>
        <span className="invisible">{text}</span>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={text}
            className="absolute inset-0 text-center"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className={`eyebrow ${size === 'lg' ? 'mt-2' : 'mt-1 !text-[0.55rem]'}`}>{label}</span>
    </div>
  )
}

export default function Countdown({ to, size = 'lg' }: { to: string; size?: 'sm' | 'lg' }) {
  const target = new Date(to).getTime()
  const [parts, setParts] = useState<Parts | null>(null)

  useEffect(() => {
    const tick = () => setParts(remaining(target))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [target])

  // Rendered empty on the server: the time only makes sense in the browser.
  const p = parts ?? { d: 0, h: 0, m: 0, s: 0 }
  return (
    <div className={`flex ${size === 'lg' ? 'gap-6 md:gap-10' : 'gap-3'} ${parts ? '' : 'opacity-0'}`} role="timer" aria-label={parts ? `${p.d} days, ${p.h} hours, ${p.m} minutes until doors` : undefined}>
      <Unit value={p.d} label="Days" size={size} />
      <Unit value={p.h} label="Hrs" size={size} />
      <Unit value={p.m} label="Min" size={size} />
      <Unit value={p.s} label="Sec" size={size} />
    </div>
  )
}
