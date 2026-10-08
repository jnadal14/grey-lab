import type { Metadata } from 'next'
import Media from '@/components/Media'
import ContactForm from '@/components/ContactForm'
import Parallax from '@/components/motion/Parallax'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import { getInvolved } from '@/content/copy'

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Collaborate with Greylab Productions. Get involved with our projects, or pitch us your own ideas.',
}

export default function GetInvolved() {
  return (
    <>
      <section className="relative flex min-h-[80svh] items-end overflow-hidden pb-16 pt-36 short:min-h-[100svh]">
        <Parallax offset={80} className="absolute -inset-y-24 inset-x-0">
          <div className="relative h-full w-full"><Media id="involved" alt="A guitarist on a dark stage under a single spotlight" fill preload sizes="100vw" className="object-cover object-[50%_30%]" /></div>
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="container-x relative">
          <h1>
            <SplitText as="span" onMount text={getInvolved.title[0]} by="char" stagger={0.035} className="display block text-mega" />
            <SplitText as="span" onMount delay={0.35} text={getInvolved.title[1]} className="display block text-giant text-outline" />
          </h1>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            {getInvolved.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}><p className={i === 0 ? 'text-3xl leading-tight' : 'text-2xl leading-snug text-fog'}>{p}</p></Reveal>
            ))}
            <Reveal delay={0.1}><p className="text-2xl leading-snug text-fog">{getInvolved.cta}</p></Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ContactForm submitLabel="Send" topics={['Get involved', 'Pitch an idea', 'Booking', 'Media', 'Other']} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
