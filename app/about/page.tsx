import type { Metadata } from 'next'
import Media from '@/components/Media'
import Button from '@/components/Button'
import ContactForm from '@/components/ContactForm'
import Gallery from '@/components/gallery/Gallery'
import ServiceRows from '@/components/about/ServiceRows'
import Parallax from '@/components/motion/Parallax'
import Reveal from '@/components/motion/Reveal'
import SplitText from '@/components/motion/SplitText'
import Marquee from '@/components/motion/Marquee'
import { about, community } from '@/content/copy'
import { services, servicesIntro } from '@/content/services'

export const metadata: Metadata = {
  title: 'About',
  description: 'Greylab Productions: originally a DIY venue in Vancouver, BC, now a collaborative live media project.',
}

export default function About() {
  return (
    <>
      {/* Who are we? */}
      <section className="relative overflow-hidden pb-24 pt-36 md:pb-36 md:pt-48">
        <div className="container-x">
          <SplitText as="h1" onMount text={about.title} by="char" stagger={0.04} className="display text-mega" />
          <div className="mt-14 grid gap-14 md:grid-cols-12">
            <div className="space-y-6 md:col-span-6 lg:col-span-5">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className={i === 0 ? 'text-3xl leading-tight text-bone' : 'text-2xl leading-snug text-fog'}>{p}</p>
                </Reveal>
              ))}
            </div>
            <div className="relative h-[30rem] sm:h-[36rem] md:col-span-6 md:col-start-7 md:h-[44rem]">
              <Parallax offset={60} className="absolute left-0 top-0 h-[70%] w-[62%] overflow-hidden rounded-2xl">
                <div className="relative h-full w-full"><Media id="about-1" alt="A singer leaning into the crowd under blue light" fill sizes="(min-width: 768px) 30vw, 60vw" className="object-cover" /></div>
              </Parallax>
              <Parallax offset={-40} className="absolute bottom-0 right-0 h-[60%] w-[55%] overflow-hidden rounded-2xl ring-8 ring-ink">
                <div className="relative h-full w-full"><Media id="about-3" alt="A packed room shot from the back of the stage" fill sizes="(min-width: 768px) 28vw, 55vw" className="object-cover" /></div>
              </Parallax>
              <Parallax offset={110} className="absolute bottom-[18%] left-[8%] hidden h-[26%] w-[30%] overflow-hidden rounded-xl ring-8 ring-ink md:block">
                <div className="relative h-full w-full"><Media id="about-2" alt="" fill sizes="15vw" className="object-cover" /></div>
              </Parallax>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y hairline py-4">
        <Marquee speed={0.8}>
          {services.map(s => (
            <span key={s.id} className="display flex items-center text-4xl text-bone md:text-5xl"><span className="px-6">{s.title}</span><span className="text-ash">✦</span></span>
          ))}
        </Marquee>
      </div>

      {/* Work With Us */}
      <section id="services" className="py-24 md:py-36">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl">
            <div className="absolute inset-0">
              <Parallax offset={60} className="absolute -inset-y-20 inset-x-0">
                <div className="relative h-full w-full"><Media id="pit" alt="A wide shot of the pit in front of the stage" fill sizes="100vw" className="object-cover" /></div>
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
            </div>
            <div className="relative px-6 py-16 md:px-14 md:py-32 short:py-12">
              <SplitText text={servicesIntro.title} className="display max-w-3xl text-giant" />
              <Reveal delay={0.1}><p className="mt-6 max-w-lg text-2xl leading-snug text-fog">{servicesIntro.body}</p></Reveal>
              <Reveal delay={0.15} className="mt-10"><Button href="/get-involved/">Inquire now</Button></Reveal>
            </div>
          </div>

          <div className="mt-20 md:mt-36"><ServiceRows /></div>
        </div>
      </section>

      {/* Our Work */}
      <section id="work" className="border-t hairline bg-coal py-24 md:py-36">
        <div className="container-x">
          <SplitText text="Our work" className="display mb-12 text-giant" />
          <Gallery />
        </div>
      </section>

      {/* Community message form */}
      <section className="py-24 md:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SplitText text={community.title} className="display text-huge" />
            <Reveal delay={0.1}><p className="mt-6 max-w-md text-2xl leading-snug text-fog">{community.body}</p></Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ContactForm topics={['Message', 'Thought', 'Feedback']} submitLabel="Send" compact />
          </Reveal>
        </div>
      </section>
    </>
  )
}
