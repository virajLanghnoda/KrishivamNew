import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { animate, motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { products, productHref, type Product } from '../../data/site'
import Reveal from '../Reveal'

function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  useEffect(() => {
    if (!inView || !ref.current) return
    const node = ref.current
    const controls = animate(0, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: v => { node.textContent = v.toFixed(decimals) } })
    return () => controls.stop()
  }, [inView, value, decimals])
  return <span ref={ref}>{(0).toFixed(decimals)}</span>
}

function Spotlight({ p, scaleTo }: { p: Product; scaleTo: number }) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-cream/10 bg-cream/[.03] p-7 sm:p-10">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-50 transition duration-700 group-hover:opacity-80" style={{ background: `radial-gradient(closest-side, ${p.accent}, transparent)` }} />
      <div className="relative grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[.22em] text-lime">{p.tagline}</p>
          <h3 className="mt-3 font-display text-5xl leading-none text-cream">{p.name}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-cream/55">{p.positioning}</p>
        </div>
        <img src={p.image} alt={p.name} loading="lazy" decoding="async" className="h-40 w-auto justify-self-start object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,.5)] transition duration-700 group-hover:-translate-y-2 sm:h-48" />
      </div>
      <div className="relative mt-8 space-y-5">
        {p.composition!.map((c, i) => (
          <div key={c.label}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold text-cream/80">{c.label}</span>
              <span className="font-display text-3xl text-cream"><Counter value={c.value} decimals={c.value % 1 ? 1 : 0} />%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream/10">
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: Math.max(c.value / scaleTo, 0.015) }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 1.4, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} className="h-full origin-left rounded-full bg-gradient-to-r from-leaf to-lime" />
            </div>
          </div>
        ))}
      </div>
      {p.specs && (
        <dl className="relative mt-8 grid grid-cols-2 gap-4 border-t border-cream/10 pt-6">
          {p.specs.map(s => (
            <div key={s.label}>
              <dt className="text-[10px] font-bold uppercase tracking-[.18em] text-cream/40">{s.label}</dt>
              <dd className="mt-1 text-sm font-semibold text-cream/85">{s.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <Link to={productHref(p)} className="relative mt-8 inline-flex items-center gap-2 text-sm font-bold text-lime transition hover:gap-3">View {p.name} <ArrowUpRight size={15} /></Link>
    </div>
  )
}

export default function Science() {
  const ontop = products.find(p => p.slug === 'ontop')!
  const valhalla = products.find(p => p.slug === 'valhalla')!
  return (
    <section className="relative overflow-hidden bg-night py-24 text-cream lg:py-36">
      <div className="grain pointer-events-none absolute inset-0 opacity-[.06] mix-blend-overlay" />
      <div className="container-page relative">
        <Reveal>
          <p className="eyebrow !text-lime">05 · Science on the label</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[.95] sm:text-6xl lg:text-7xl">What goes in the pack, <span className="italic text-lime">stated plainly.</span></h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/60">Every Krishivam formulation is defined by what it contains. Here are two of them, straight from the label.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <Reveal><Spotlight p={ontop} scaleTo={50} /></Reveal>
          <Reveal delay={0.1}><Spotlight p={valhalla} scaleTo={25} /></Reveal>
        </div>
      </div>
    </section>
  )
}
