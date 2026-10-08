const tz = 'America/Vancouver'

export const formatDate = (iso: string, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-CA', { timeZone: tz, ...opts }).format(new Date(iso))

/** "Wed, Sept 23" style. */
export const longDate = (iso: string) =>
  formatDate(iso, { weekday: 'short', month: 'short', day: 'numeric' }).replace('Sep ', 'Sept ')

export const year = (iso: string) => formatDate(iso, { year: 'numeric' })
