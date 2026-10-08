import Link from 'next/link'
import Magnetic from './motion/Magnetic'
import { ArrowIcon } from './icons'

type Props = {
  href: string
  children: string
  variant?: 'solid' | 'ghost'
  external?: boolean
  className?: string
  download?: boolean
}

const styles = {
  solid: 'bg-bone text-ink',
  ghost: 'border hairline text-bone hover:border-bone/40',
}

/**
 * Pill button. On hover the label rolls up and a copy rolls in from below,
 * and the whole pill leans toward the cursor.
 */
export default function Button({ href, children, variant = 'solid', external, className = '', download }: Props) {
  const inner = (
    <span className={`group relative inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-2 text-sm font-semibold uppercase tracking-[0.14em] transition-colors ${styles[variant]} ${className}`}>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0">{children}</span>
      </span>
      <span className={`grid size-8 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-45 ${variant === 'ghost' ? 'bg-bone text-ink' : 'bg-ink text-bone'}`}>
        <ArrowIcon className="size-3.5" />
      </span>
    </span>
  )
  return (
    <Magnetic strength={0.25}>
      {external || download ? (
        <a href={href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })} {...(download && { download: true })}>{inner}</a>
      ) : (
        <Link href={href}>{inner}</Link>
      )}
    </Magnetic>
  )
}
