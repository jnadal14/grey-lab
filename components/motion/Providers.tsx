'use client'

import { ReactLenis } from 'lenis/react'
import { MotionConfig, useReducedMotion } from 'motion/react'

/**
 * Site-wide motion setup. Lenis gives the weighted, interpolated scroll that
 * Framer sites have; Motion's scroll hooks read the same native scroll
 * position, so the two never disagree. Both step aside when the visitor asks
 * for reduced motion.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 260, damping: 32 }}>
      {reduce ? children : (
        <ReactLenis root options={{ lerp: 0.1, anchors: { offset: -80 }, allowNestedScroll: true }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  )
}
