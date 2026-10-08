'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { site } from '@/content/site'

type Props = { topics?: string[]; submitLabel?: string; compact?: boolean }

const field = 'peer w-full border-b hairline bg-transparent pb-3 pt-6 font-[family-name:var(--font-body)] text-xl text-bone outline-none transition-colors placeholder:text-transparent focus:border-bone'
const label = 'pointer-events-none absolute left-0 top-6 text-fog transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-[0.18em] peer-focus:text-bone peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:tracking-[0.18em] uppercase'

/**
 * Contact form posting to Formspree (site.formspreeId), like the Dirty
 * Aesthetic site. Until an id is set it confirms locally and says so.
 */
export default function ContactForm({ topics = ['Booking a show', 'Event media', 'Backline & tech', 'Management', 'Collaboration', 'Something else'], submitLabel = 'Send it', compact }: Props) {
  const [topic, setTopic] = useState(topics[0])
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const data = new FormData(ev.currentTarget)
    data.set('topic', topic)
    if (!site.formspreeId) { setState('sent'); return }
    setState('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      setState(res.ok ? 'sent' : 'error')
    } catch { setState('error') }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {state === 'sent' ? (
          <motion.div key="sent" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-10" role="status">
            <p className="display text-6xl text-bone">Got it.</p>
            <p className="mt-3 max-w-md text-fog">
              {site.formspreeId ? 'Thanks for reaching out. Someone from the Greylab team will get back to you soon.' : 'Demo build: this form is not connected to an inbox yet, so nothing was sent.'}
            </p>
            <button type="button" onClick={() => setState('idle')} className="mt-6 text-sm uppercase tracking-[0.16em] text-fog underline underline-offset-4 hover:text-bone">Send another</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <fieldset>
              <legend className="eyebrow mb-3">What&apos;s it about?</legend>
              <div className="flex flex-wrap gap-2">
                {topics.map(t => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setTopic(t)}
                    aria-pressed={topic === t}
                    className={`relative rounded-full border px-4 py-2 text-sm transition-colors ${topic === t ? 'border-bone text-ink' : 'hairline text-fog hover:text-bone'}`}
                  >
                    {topic === t && <motion.span layoutId={`topic-${compact ? 'c' : 'f'}`} className="absolute inset-0 rounded-full bg-bone" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                    <span className="relative">{t}</span>
                  </button>
                ))}
              </div>
            </fieldset>
            <div className={`grid gap-8 ${compact ? '' : 'md:grid-cols-2'}`}>
              <div className="relative"><input id="name" name="name" required placeholder="Name" className={field} /><label htmlFor="name" className={label}>Name</label></div>
              <div className="relative"><input id="email" name="email" type="email" required placeholder="Email" className={field} /><label htmlFor="email" className={label}>Email</label></div>
            </div>
            <div className="relative"><textarea id="message" name="message" required rows={compact ? 3 : 5} placeholder="Message" className={`${field} resize-none`} /><label htmlFor="message" className={label}>Tell us about it</label></div>
            <div className="flex items-center gap-6">
              <button type="submit" disabled={state === 'sending'} className="group inline-flex h-14 items-center gap-3 rounded-full bg-bone pl-7 pr-2 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.03] disabled:opacity-60">
                {state === 'sending' ? 'Sending…' : submitLabel}
                <span className="grid size-10 place-items-center rounded-full bg-ink text-bone transition-transform duration-500 group-hover:rotate-45">↗</span>
              </button>
              {state === 'error' && <p className="text-sm text-bone" role="alert">That didn&apos;t send. Try again, or DM us on Instagram.</p>}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
