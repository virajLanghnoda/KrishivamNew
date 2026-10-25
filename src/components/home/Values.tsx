import type { PointerEvent } from 'react'
import { Handshake, Leaf, Microscope, ShieldCheck, Sprout, Users } from 'lucide-react'
import { values } from '../../data/site'
import Reveal from '../Reveal'
import { cn } from '../../lib/utils'

const icons = [Leaf, Sprout, Microscope, ShieldCheck, Handshake, Users]
// Bento spans on large screens: two wide tiles framing four regular ones.
const spans = ['lg:col-span-2', '', '', '', '', 'lg:col-span-2']

/** A soft light follows the cursor across each tile (CSS variables, no re-render). */
const track = (e: PointerEvent<HTMLDivElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

export default function Values() {
  return (
    <section className="bg-cream py-24 lg:py-36">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">06 · What guides us</p>
          <h2 className="section-title">Growing better. <span className="italic text-forest">Together.</span></h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = icons[i]
            const feature = i === 0 || i === 5
            return (
              <Reveal key={v.title} delay={(i % 3) * 0.06} className={spans[i]}>
                <div
                  onPointerMove={track}
                  className={cn(
                    'group relative h-full min-h-[240px] overflow-hidden rounded-[2rem] border p-7 transition duration-500 hover:-translate-y-1',
                    feature ? 'border-transparent bg-forest text-cream' : 'border-ink/10 bg-white text-ink',
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(260px circle at var(--x) var(--y), ${feature ? 'rgba(197,232,108,.22)' : 'rgba(27,107,58,.10)'}, transparent 70%)` }} />
                  <Icon className={feature ? 'text-lime' : 'text-forest'} strokeWidth={1.6} />
                  <h3 className={cn('relative mt-14 font-display leading-none', feature ? 'text-5xl' : 'text-3xl')}>{v.title}</h3>
                  <p className={cn('relative mt-3 max-w-md text-sm leading-6', feature ? 'text-cream/70' : 'text-ink/55')}>{v.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
