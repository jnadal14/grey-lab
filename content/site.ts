export const site = {
  name: 'Greylab Productions',
  short: 'Greylab',
  tagline: 'Live music and media starts here',
  url: 'https://www.greylab.ca',
  city: 'Vancouver, BC',
  instagram: { handle: '@greylabyvr', url: 'https://www.instagram.com/greylabyvr/' },
  youtube: { handle: '@GreylabProductions', url: 'https://www.youtube.com/@GreylabProductions' },
  // Formspree form id. Leave empty and forms show a "not connected yet" notice
  // instead of sending.
  formspreeId: '',
  copyright:
    'All media on this site are the property of Greylab Productions Ltd. and are provided for your enjoyment. For licensed use or inquiries, please contact us directly.',
  // Pitch demo: the site behaves as if today were this date, so Homecoming
  // Fest 26' reads as the upcoming show. Set to null for the real site.
  demoNow: '2026-09-09T12:00:00-07:00' as string | null,
}

export const nav = [
  { label: 'Services', href: '/about/#services' },
  { label: 'Our Work', href: '/about/#work' },
  { label: 'Articles', href: '/articles/' },
  { label: 'About', href: '/about/' },
  { label: 'Get Involved', href: '/get-involved/' },
] as const
