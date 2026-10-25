import { useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { categories, company, productByName } from '../data/site'
import { details, filled } from '../data/details'
import { cn } from '../lib/utils'
import { track } from '../components/Analytics'
import { seoFor } from '../data/seo'
import { useSeo } from '../lib/useSeo'

// Enquiries go through FormSubmit (formsubmit.co): free, no account, no server,
// works the same on Vercel. The very first enquiry makes FormSubmit email the
// company inbox an "Activate form" link - click it once and every enquiry after
// that arrives as a neat table. See WEBSITE.md → "Enquiry form".
const ENDPOINT = `https://formsubmit.co/ajax/${company.email}`

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'phone' | 'email' | 'message', string>>

const productOptions = categories.flatMap(c => c.products.map(name => `${c.name} — ${productByName(name)?.name ?? name}`))

function validate(f: FormData): Errors {
  const e: Errors = {}
  const name = String(f.get('name') ?? '').trim()
  const phone = String(f.get('phone') ?? '').replace(/[\s-]/g, '')
  const email = String(f.get('email') ?? '').trim()
  const message = String(f.get('message') ?? '').trim()
  if (name.length < 2) e.name = 'Please tell us your name.'
  if (!/^(\+?91)?[6-9]\d{9}$/.test(phone)) e.phone = 'Enter a 10-digit mobile number.'
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'That email doesn’t look right.'
  if (message.length < 5) e.message = 'Add a short message so we can help.'
  return e
}

function Field({ label, name, error, children, hint }: { label: string; name: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block" htmlFor={name}>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[.16em] text-night/55">{label}</span>
      {children}
      {error ? <span id={`${name}-error`} role="alert" className="mt-1.5 block text-sm font-medium text-[#b42318]">{error}</span> : hint ? <span className="mt-1.5 block text-xs text-night/45">{hint}</span> : null}
    </label>
  )
}

const inputCls = (bad?: string) => cn(
  'w-full rounded-xl border bg-cream px-4 py-3.5 text-base text-night outline-none transition placeholder:text-night/35 focus:border-forest focus:ring-2 focus:ring-forest/15 sm:text-sm',
  bad ? 'border-[#b42318]/60' : 'border-night/10',
)

export default function Contact() {
  useSeo(seoFor('/contact'))
  const [params] = useSearchParams()
  const preset = params.get('product')
  const presetOption = preset ? productOptions.find(o => o.toLowerCase().endsWith(preset.toLowerCase())) : undefined
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [note, setNote] = useState('')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length) {
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    if (data.get('_honey')) return setStatus('sent') // a bot filled the hidden field
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          Name: data.get('name'),
          Phone: data.get('phone'),
          Email: data.get('email') || '—',
          Product: data.get('product') || '—',
          Message: data.get('message'),
          _subject: `New enquiry from ${data.get('name')} — krishivam.com`,
          _template: 'table',
          _captcha: 'false',
          ...(data.get('email') ? { _replyto: data.get('email') } : {}),
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || String(body.success) !== 'true') throw new Error(body.message || 'Request failed')
      setStatus('sent')
      track('generate_lead', { product: String(data.get('product') || 'general') })
      form.reset()
    } catch (err) {
      setNote(err instanceof Error ? err.message : '')
      setStatus('error')
    }
  }

  const contacts = [
    { icon: Phone, label: 'Phone', value: company.phone, href: `tel:${company.phone}` },
    { icon: Mail, label: 'Email', value: company.email, href: `mailto:${company.email}` },
    filled(details.whatsapp) && { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: `https://wa.me/${details.whatsapp}` },
    { icon: MapPin, label: 'Office', value: filled(details.streetAddress) ? `${details.streetAddress}, ${company.location}` : company.location },
    filled(details.hours) && { icon: Clock, label: 'Hours', value: details.hours },
  ].filter(Boolean) as { icon: typeof Phone; label: string; value: string; href?: string }[]

  return (
    <>
      <PageHero eyebrow="Contact" title="Let’s start a conversation.">For product enquiries, dealership conversations and general business enquiries, connect with Krishivam Agriscience.</PageHero>

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container-page grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-14 [&>*]:min-w-0">
          <Reveal>
            <p className="eyebrow">Contact details</p>
            <h2 className="section-title">We’re easy to reach.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-night/60">Call, write or send the form — the Krishivam team usually replies within one working day.</p>
            <ul className="mt-10 space-y-3">
              {contacts.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sand text-forest transition group-hover:bg-forest group-hover:text-cream"><Icon size={19} /></span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[.18em] text-night/45">{label}</span>
                      <span className="mt-0.5 block font-display text-base font-bold [overflow-wrap:anywhere] text-night sm:text-lg">{value}</span>
                    </span>
                  </>
                )
                return (
                  <li key={label}>
                    {href
                      ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-night/10 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-soft">{inner}</a>
                      : <div className="flex items-center gap-4 rounded-2xl border border-night/10 bg-white p-4">{inner}</div>}
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-[2rem] border border-night/10 bg-white p-6 shadow-soft sm:p-9">
              <AnimatePresence mode="wait" initial={false}>
                {status === 'sent' ? (
                  <motion.div key="sent" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid min-h-[420px] place-items-center text-center" role="status">
                    <div>
                      <CheckCircle2 className="mx-auto text-forest" size={52} strokeWidth={1.5} />
                      <h3 className="mt-6 text-3xl">Thank you — enquiry received.</h3>
                      <p className="mx-auto mt-3 max-w-sm text-night/60">The Krishivam team will get back to you shortly. For anything urgent, call <a className="font-semibold text-forest" href={`tel:${company.phone}`}>{company.phone}</a>.</p>
                      <button type="button" onClick={() => setStatus('idle')} className="btn-secondary mt-8">Send another enquiry</button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} noValidate aria-describedby="form-note">
                    <h3 className="text-2xl">Send an enquiry</h3>
                    <p id="form-note" className="mt-1 text-sm text-night/55">Fields marked * are required.</p>
                    <div className="mt-7 grid gap-5 sm:grid-cols-2">
                      <Field label="Name *" name="name" error={errors.name}>
                        <input id="name" name="name" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={inputCls(errors.name)} />
                      </Field>
                      <Field label="Mobile *" name="phone" error={errors.phone}>
                        <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined} className={inputCls(errors.phone)} />
                      </Field>
                      <Field label="Email" name="email" error={errors.email} hint="Optional — for a written reply.">
                        <input id="email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={inputCls(errors.email)} />
                      </Field>
                      <Field label="Product / Category" name="product">
                        <select id="product" name="product" defaultValue={presetOption ?? ''} className={inputCls()}>
                          <option value="">General enquiry</option>
                          {productOptions.map(o => <option key={o}>{o}</option>)}
                          <option>Dealership / distribution</option>
                        </select>
                      </Field>
                    </div>
                    <div className="mt-5">
                      <Field label="Message *" name="message" error={errors.message}>
                        <textarea id="message" name="message" rows={5} placeholder="Your crop, area, the product you’re interested in…" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} className={cn(inputCls(errors.message), 'resize-none')} />
                      </Field>
                    </div>
                    {/* Honeypot: hidden from people, irresistible to bots. */}
                    <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 opacity-0" />
                    {status === 'error' && (
                      <p role="alert" className="mt-5 rounded-xl bg-sand px-4 py-3 text-sm text-night/75">
                        {/activat/i.test(note) ? 'The enquiry form is being activated — please try again in a few minutes, or ' : 'Your enquiry couldn’t be sent just now. Please try again, or '}
                        call <a className="font-semibold text-forest" href={`tel:${company.phone}`}>{company.phone}</a> / email <a className="font-semibold text-forest" href={`mailto:${company.email}`}>{company.email}</a>.
                      </p>
                    )}
                    <button className="btn-primary mt-6 w-full sm:w-auto" type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <>Submit enquiry <ArrowUpRight size={15} /></>}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>

      {filled(details.mapEmbedUrl) && (
        <section className="container-page pb-20 lg:pb-28">
          <div className="overflow-hidden rounded-[2rem] border border-night/10">
            <iframe title="Krishivam Agriscience office on Google Maps" src={details.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-[360px] w-full border-0 sm:h-[440px]" />
          </div>
        </section>
      )}
    </>
  )
}
