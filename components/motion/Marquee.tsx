'use client'

import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap, useReducedMotion } from 'motion/react'
import { useRef } from 'react'

/**
 * Endless ticker that speeds up, and flips direction, with scroll velocity:
 * the "scroll-velocity marquee" pattern from Framer. Children are repeated
 * four times so the loop never shows a gap.
 */
export default function Marquee({ children, speed = 1, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [-1000, 0, 1000], [-1.5, 0, 1.5], { clamp: false })
  const x = useTransform(base, v => `${wrap(-25, 0, v)}%`)
  const dir = useRef(-1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const b = boost.get()
    if (b < 0) dir.current = 1
    else if (b > 0) dir.current = -1
    base.set(base.get() + dir.current * speed * (delta / 1000) * (1 + Math.abs(b)))
  })

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className ?? ''}`}>
      <motion.div className="flex w-max" style={{ x }}>
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="flex shrink-0" aria-hidden={i > 0}>{children}</div>
        ))}
      </motion.div>
    </div>
  )
}
