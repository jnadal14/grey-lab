import { upcoming as e } from '@/content/events'
import { site } from '@/content/site'

// Built once at export time into out/homecoming-fest-26.ics.
export const dynamic = 'force-static'

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

export function GET() {
  const start = new Date(e.start)
  const end = new Date(start.getTime() + 5 * 36e5)
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Greylab Productions//Events//EN',
    'BEGIN:VEVENT',
    `UID:${e.slug}@greylab.ca`,
    `DTSTAMP:${stamp(start)}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${e.name}`,
    `DESCRIPTION:${e.lineup.join(' / ')}. ${[e.ages, e.price].filter(Boolean).join(', ')}. ${site.url}`,
    `LOCATION:${e.venue.name}\\, ${e.venue.address}\\, ${e.venue.city}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } })
}
