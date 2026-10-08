import type { Metadata, Viewport } from 'next'
import { Bayon, Familjen_Grotesk, Vina_Sans } from 'next/font/google'
import { ViewTransition } from 'react'
import Providers from '@/components/motion/Providers'
import Cursor from '@/components/motion/Cursor'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/sections/Footer'
import { site } from '@/content/site'
import './globals.css'

const bayon = Bayon({ weight: '400', subsets: ['latin'], variable: '--font-bayon', display: 'swap' })
const vina = Vina_Sans({ weight: '400', subsets: ['latin'], variable: '--font-vina', display: 'swap' })
const familjen = Familjen_Grotesk({ subsets: ['latin'], variable: '--font-familjen', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.tagline}`, template: `%s · ${site.short}` },
  description:
    'Greylab Productions is a Vancouver live music and media company: showrunning, full event media coverage, backline and technical crew, and artist management.',
  openGraph: { type: 'website', siteName: site.name, locale: 'en_CA', images: ['/og.jpg'] },
  twitter: { card: 'summary_large_image' },
  // Pitch prototype: keep it out of search results until it replaces greylab.ca.
  robots: { index: false, follow: false },
}

export const viewport: Viewport = { themeColor: '#0a0a09', colorScheme: 'dark' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={`${bayon.variable} ${vina.variable} ${familjen.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-bone focus:px-4 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <Providers>
          <Nav />
          <ViewTransition>
            <main id="main">{children}</main>
          </ViewTransition>
          <Footer />
        </Providers>
        <Cursor />
        <div className="grain" aria-hidden />
      </body>
    </html>
  )
}
