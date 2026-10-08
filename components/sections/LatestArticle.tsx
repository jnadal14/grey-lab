import Link from 'next/link'
import Media from '../Media'
import Reveal from '../motion/Reveal'
import { ArrowIcon } from '../icons'
import { articles } from '@/content/articles'
import { formatDate } from '@/lib/format'

/** Latest article plus a link to the archive. Until there are any, a plain placeholder. */
export default function LatestArticle() {
  const latest = articles[0]
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6 border-b hairline pb-6">
          <Reveal><h2 className="display text-huge">Articles</h2></Reveal>
          <Reveal>
            <Link href="/articles/" className="group inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.16em] text-fog hover:text-bone">
              View all <ArrowIcon className="size-4 transition-transform group-hover:rotate-45" />
            </Link>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          {latest ? (
            <Link href={`/articles/${latest.slug}/`} className="group grid gap-8 md:grid-cols-2" data-cursor="Read">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <Media id={latest.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="eyebrow">{formatDate(latest.date, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                <h3 className="display mt-3 text-5xl">{latest.title}</h3>
                <p className="mt-4 text-fog">{latest.excerpt}</p>
              </div>
            </Link>
          ) : (
            <p className="text-2xl text-ash">Under construction. Check back soon.</p>
          )}
        </Reveal>
      </div>
    </section>
  )
}
