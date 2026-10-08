import type { Metadata } from 'next'
import Link from 'next/link'
import Media from '@/components/Media'
import Reveal from '@/components/motion/Reveal'
import { articles } from '@/content/articles'
import { formatDate } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles from Greylab Productions.',
}

export default function Articles() {
  return (
    <section className="container-x min-h-[70svh] pb-32 pt-40 md:pt-48">
      <Reveal><h1 className="display text-giant">Articles</h1></Reveal>
      {articles.length ? (
        <ul className="mt-16 grid gap-10 md:grid-cols-2">
          {articles.map(a => (
            <li key={a.slug}>
              <Link href={`/articles/${a.slug}/`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                  <Media id={a.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <p className="eyebrow mt-5">{formatDate(a.date, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <h2 className="display mt-2 text-4xl">{a.title}</h2>
                <p className="mt-2 text-fog">{a.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Reveal delay={0.1}>
          <p className="mt-6 text-2xl text-ash">Under construction. Check back soon.</p>
        </Reveal>
      )}
    </section>
  )
}
