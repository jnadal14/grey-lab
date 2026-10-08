'use client'

import { motion, type HTMLMotionProps } from 'motion/react'

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number; blur?: boolean }

/** Fades content up into place the first time it scrolls into view. */
export default function Reveal({ delay = 0, y = 32, blur = true, children, ...rest }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: blur ? 'blur(8px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
