import Hero from '@/components/sections/Hero'
import FeaturedEvent from '@/components/sections/FeaturedEvent'
import ServicesStack from '@/components/sections/ServicesStack'
import PastEvents from '@/components/sections/PastEvents'
import LatestArticle from '@/components/sections/LatestArticle'
import ContactBlock from '@/components/sections/ContactBlock'
import { upcoming } from '@/content/events'
import { site } from '@/content/site'

// Event structured data so search engines can show the show with date and venue.
const eventJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MusicEvent',
  name: upcoming.name,
  startDate: upcoming.start,
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: upcoming.venue.name,
    address: { '@type': 'PostalAddress', streetAddress: upcoming.venue.address, addressLocality: 'Vancouver', addressRegion: 'BC', addressCountry: 'CA' },
  },
  performer: upcoming.lineup.map(name => ({ '@type': 'MusicGroup', name })),
  organizer: { '@type': 'Organization', name: site.name, url: site.url },
  image: [`${site.url}/media/${upcoming.poster}-1280.webp`],
  description: upcoming.blurb,
  ...(upcoming.ticketUrl && { offers: { '@type': 'Offer', url: upcoming.ticketUrl, price: '25', priceCurrency: 'CAD', availability: 'https://schema.org/InStock' } }),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <Hero />
      <FeaturedEvent />
      <ServicesStack />
      <PastEvents />
      <LatestArticle />
      <ContactBlock />
    </>
  )
}
