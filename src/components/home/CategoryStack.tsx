import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { categories, productByName, productHref, type Category } from '../../data/site'
import Reveal from '../Reveal'
import { cn } from '../../lib/utils'

/** One card in the stack: pins under the navbar, then shrinks back as the next slides over it. */
function StackCard({ c, i, total, progress }: { c: Category; i: number; total: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.035])
  const dark = c.tone === 'dark'
  const items = c.products.map(productByName).filter(p => p !== undefined)
  const shots = items.filter(p => p.image)
  return (
    <div className="sticky h-[78svh] min-h-[540px]" style={{ top: `calc(92px + ${i * 22}px)` }}>
      <motion.article
        style={{ scale, background: dark ? `linear-gradient(140deg, ${c.accent}, #07130d)` : `linear-gradient(140deg, #fbf9f3, ${c.accent}22)` }}
        className={cn('relative grid h-full origin-top overflow-hidden rounded-[2rem] border p-7 sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-14', dark ? 'border-white/10 text-cream' : 'border-ink/10 text-ink')}
      >
        <div className="relative z-10 flex flex-col">
          <div className="flex items-center gap-4">
            <span className={cn('font-display text-6xl leading-none', dark ? 'text-cream/30' : 'text-ink/20')}>0{i + 1}</span>
            <span className={cn('rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[.2em]', dark ? 'border-cream/20 text-cream/70' : 'border-ink/15 text-ink/60')}>
              {c.products.length} {c.products.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>
          <h3 className="mt-8 font-display text-5xl leading-[.95] sm:text-6xl lg:text-7xl">{c.name}</h3>
          <p className={cn('mt-5 max-w-md text-base leading-7', dark ? 'text-cream/65' : 'text-ink/60')}>{c.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {items.map(p => (
              <Link key={p.slug} to={productHref(p)} className={cn('rounded-full px-4 py-2 text-sm font-semibold transition', dark ? 'bg-cream/10 text-cream hover:bg-lime hover:text-night' : 'bg-ink/5 text-ink hover:bg-ink hover:text-cream')}>{p.name}</Link>
            ))}
          </div>
          <Link to={`/products/${c.slug}`} className={cn('mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-bold', dark ? 'text-lime' : 'text-forest')}>
            Explore category <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] items-end justify-center lg:flex">
          {shots.slice(0, 3).map((p, k) => (
            <img
              key={p.slug}
              src={p.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="relative max-h-[78%] w-auto object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,.3)]"
              style={{ height: shots.length > 1 ? `${78 - k * 8}%` : '82%', marginLeft: k ? '-8%' : 0, marginBottom: '7%', zIndex: 3 - k }}
            />
          ))}
        </div>
        {shots[0] && <img src={shots[0].image} alt="" loading="lazy" className="pointer-events-none absolute -bottom-6 -right-6 h-[42%] w-auto object-contain opacity-90 lg:hidden" />}
      </motion.article>
    </div>
  )
}

export default function CategoryStack() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">03 · Portfolio</p>
          <h2 className="section-title">Four categories. One standard of care.</h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/60">A focused portfolio across organic fertilizers, biostimulants, biofertilizers and speciality liquid fertilizers.</p>
        </Reveal>
        <div ref={ref} className="mt-14 space-y-[12svh] pb-[4svh]">
          {categories.map((c, i) => <StackCard key={c.slug} c={c} i={i} total={categories.length} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  )
}
