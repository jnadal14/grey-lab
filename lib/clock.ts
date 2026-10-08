import { site } from '@/content/site'

const loadedAt = Date.now()

/** Current time, shifted to site.demoNow while the pitch demo is on. */
export function now(): number {
  if (!site.demoNow) return Date.now()
  return new Date(site.demoNow).getTime() + (Date.now() - loadedAt)
}
