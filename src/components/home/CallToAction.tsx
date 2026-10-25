import { useRef, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, MapPin, MessageSquareText, Phone } from 'lucide-react'
import { company } from '../../data/site'
import TextReveal from '../TextReveal'
import mark from '../../assets/mark.svg'

/** A soft light follows the cursor across the panel (CSS variables, no re-render). */
const track = (e: PointerEvent<HTMLDivElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`)
}

const actions = [
  { icon: MessageSquareText, label: 'Send an enquiry', detail: 'Products, dealership or crop questions', to: '/contact' },
  { icon: Phone, label: `Call ${company.phone}`, detail: 'Talk to the Krishivam team', href: `tel:${company.phone}` },
  { icon: MapPin, label: 'Satellite, Ahmedabad', detail: 'Gujarat, India', to: '/contact' },
]

export default function CallToAction() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  // The panel opens out toward the page edges as it arrives; clip-path only repaints.
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(4% 4% 0% 4% round 48px)', 'inset(0% 0% 0% 0% round 28px)'])
  const markY = useTransform(scrollYProgress, [0, 1], ['30%', '0%'])

  return (
    <section className="bg-cream px-3 pb-3 sm:px-5 sm:pb-5">
      <motion.div ref={ref} style={{ clipPath }} onPointerMove={track} className="group relative isolate overflow-hidden bg-night text-cream">
        {/* fine grid and a cursor-following glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.07] [background-image:linear-gradient(#f5f2ea_1px,transparent_1px),linear-gradient(90deg,#f5f2ea_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: 'radial-gradient(420px circle at var(--x) var(--y), rgba(197,232,108,.16), transparent 70%)' }} />
        <motion.img style={{ y: markY }} src={mark} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-[90%] w-auto opacity-[.07] brightness-0 invert" />

        <div className="container-page grid gap-14 py-20 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:py-28">
          <div>
            <p className="eyebrow !text-lime">Let’s talk</p>
            <TextReveal as="h2" inView text="Let’s grow something together." className="mt-6 max-w-2xl font-display text-5xl leading-[.95] sm:text-6xl lg:text-7xl" />
            <p className="mt-6 max-w-md text-base leading-7 text-cream/60">Product enquiries, dealership conversations or a question about a crop — the Krishivam team is a call away.</p>
          </div>

          <div className="space-y-3">
            {actions.map(({ icon: Icon, label, detail, to, href }, i) => {
              const inner = (
                <>
                  <span className={i === 0 ? 'grid h-12 w-12 shrink-0 place-items-center rounded-full bg-night text-lime' : 'grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream/10 text-lime transition group-hover/row:bg-lime group-hover/row:text-night'}><Icon size={20} strokeWidth={1.8} /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold leading-tight sm:text-xl">{label}</span>
                    <span className={i === 0 ? 'block text-sm text-night/60' : 'block text-sm text-cream/50'}>{detail}</span>
                  </span>
                  <ArrowUpRight size={20} className="shrink-0 transition duration-300 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5" />
                </>
              )
              const cls = i === 0
                ? 'group/row flex items-center gap-4 rounded-2xl bg-lime p-4 pr-5 text-night transition duration-300 hover:-translate-y-0.5'
                : 'group/row flex items-center gap-4 rounded-2xl border border-cream/10 bg-cream/[.03] p-4 pr-5 transition duration-300 hover:-translate-y-0.5 hover:border-lime/40 hover:bg-cream/[.06]'
              return (
                <motion.div key={label} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                  {href ? <a href={href} className={cls}>{inner}</a> : <Link to={to!} className={cls}>{inner}</Link>}
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
