import type { MediaKey } from '@/lib/media'

export type GreylabEvent = {
  slug: string
  name: string
  /** Display title, split so the year can be styled on its own. */
  title: [string, string]
  blurb: string
  start: string // ISO, venue local time
  doors?: string
  venue: { name: string; address: string; city: string }
  ages?: string
  price?: string
  lineup: string[]
  poster: MediaKey
  ticketUrl?: string
}

const hollywood = { name: 'Hollywood Theatre', address: '3123 W Broadway', city: 'Vancouver, BC' }

export const upcoming: GreylabEvent = {
  slug: 'homecoming-fest-26',
  name: "Homecoming Fest 26'",
  title: ['Homecoming', "Fest 26'"],
  blurb:
    "Greylab's first mid-week bash featuring a diverse stellar lineup of Vancouver's finest bands.",
  start: '2026-09-23T19:00:00-07:00',
  doors: '7:00 PM',
  venue: hollywood,
  ages: 'All ages',
  price: '$25 advance',
  lineup: ['Spank Williams', 'LÖLÄ', 'Jian & Kitten Co.', 'Trip Switch', 'Tiger Really', 'Worrywart'],
  poster: 'poster-homecoming',
  ticketUrl: 'https://www.greylab.ca/store',
}

export const past: GreylabEvent[] = [
  {
    slug: 'summerfest-26',
    name: "Summerfest 26'",
    title: ['Summerfest', "26'"],
    blurb: "Greylab's first annual summer bash. A 7 band festival hosted at the Hollywood Theatre.",
    start: '2026-07-18T19:00:00-07:00',
    venue: hollywood,
    ages: 'All ages',
    price: '$25 advance',
    lineup: ['Chopping Spree', 'Chronic Fatigue', 'Petty Crime', 'Infidelity', 'Benzonn', 'Wait//less', 'Blue Rivera'],
    poster: 'poster-summerfest',
  },
  {
    slug: 'crash-test-fest',
    name: 'Crash Test Fest',
    title: ['Crash Test', 'Fest'],
    blurb: "Greylab's first show back. The first 6 band festival hosted at the Hollywood Theatre.",
    start: '2026-02-05T19:00:00-08:00',
    venue: hollywood,
    lineup: ['Tiger Really', 'Felisha & The Jazz Rejects', 'Chronic Fatigue', 'Reverend Ape', 'Cherry Pick', 'Sundress'],
    poster: 'poster-crashtest',
  },
]
