import { Quote } from 'lucide-react'
import Reveal from '../Reveal'
import { details } from '../../data/details'

/** Words from farmers and dealers. Renders only once details.testimonials has entries. */
export default function Testimonials() {
  const items = details.testimonials
  if (!items.length) return null
  return (
    <section className="bg-sand py-20 lg:py-28">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">In their words</p>
          <h2 className="section-title">Every harvest begins with a promise.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name + i} delay={(i % 3) * 0.06} className="h-full">
              <figure className="flex h-full flex-col rounded-[1.75rem] bg-cream p-7">
                <Quote className="text-forest" size={26} strokeWidth={1.6} aria-hidden="true" />
                <blockquote className="mt-5 flex-1 font-serif text-xl leading-snug text-night sm:text-2xl">“{t.quote}”</blockquote>
                <figcaption className="mt-6 border-t border-night/10 pt-4">
                  <span className="block font-display font-bold text-night">{t.name}</span>
                  <span className="text-sm text-night/55">{t.place}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
