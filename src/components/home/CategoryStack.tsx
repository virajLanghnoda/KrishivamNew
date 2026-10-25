import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { categories, productByName, productHref, type Category } from '../../data/site'
import Reveal from '../Reveal'
import { cn } from '../../lib/utils'
import { cardSurface } from '../../lib/tone'

/** One card in the stack: pins under the navbar, then shrinks back as the next slides over it. */
function StackCard({ c, i, total, progress }: { c: Category; i: number; total: number; progress: MotionValue<number> }) {
  const scale = useTransform(progress, [i / total, 1], [1, 1 - (total - i) * 0.035])
  const items = c.products.map(productByName).filter(p => p !== undefined)
  const shots = items.filter(p => p.image)
  return (
    <div className="sticky h-[80svh] min-h-[min(540px,88svh)] lg:h-[78svh]" style={{ top: `calc(92px + ${i * 22}px)` }}>
      <motion.article
        style={{ scale }}
        className={cn('relative grid h-full origin-top overflow-hidden rounded-[2rem] border p-7 shadow-soft sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:p-14', cardSurface(i))}
      >
        <div className="relative z-10 flex min-h-0 flex-col">
          <div className="flex items-center gap-4">
            <span className="font-display text-5xl font-extrabold leading-none sm:text-6xl text-night/20">0{i + 1}</span>
            <span className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[.2em] border-night/15 text-night/60">
              {c.products.length} {c.products.length === 1 ? 'Product' : 'Products'}
            </span>
          </div>
          <h3 className="mt-5 font-display text-[2.1rem] leading-[.95] sm:mt-8 sm:text-6xl lg:text-7xl">{c.name}</h3>
          <p className="mt-4 line-clamp-3 max-w-md text-[15px] leading-6 sm:mt-5 sm:line-clamp-none sm:text-base sm:leading-7 text-night/60">{c.description}</p>
          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {items.map(p => (
              <Link key={p.slug} to={productHref(p)} translate="no" className="notranslate rounded-full px-3.5 py-1.5 text-sm font-semibold transition sm:px-4 sm:py-2 bg-night/5 text-night hover:bg-night hover:text-cream">{p.name}</Link>
            ))}
          </div>
          {/* Phones and tablets: the packs fill the space between the copy and the link. */}
          {shots.length > 0 && (
            <div className="pointer-events-none relative -mx-2 flex min-h-[150px] flex-1 items-end justify-center pt-5 lg:hidden">
              <div className="absolute bottom-2 left-1/2 h-[55%] w-[80%] -translate-x-1/2 rounded-[50%] blur-2xl bg-forest/10" />
              {shots.slice(0, 3).map((p, k) => (
                <img key={p.slug} src={p.image} alt="" loading="lazy" decoding="async" className="relative w-auto max-w-[46%] object-contain drop-shadow-[0_18px_18px_rgba(7,19,13,.3)]" style={{ height: shots.length > 1 ? `${100 - k * 12}%` : '100%', marginLeft: k ? '-7%' : 0, zIndex: 3 - k }} />
              ))}
            </div>
          )}
          <Link to={`/products/${c.slug}`} className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-forest/25 px-5 py-2.5 text-sm font-bold text-forest transition hover:border-forest hover:bg-forest hover:text-cream lg:mt-auto">
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
              className="relative max-h-[78%] w-auto object-contain drop-shadow-[0_30px_30px_rgba(7,19,13,.3)]"
              style={{ height: shots.length > 1 ? `${78 - k * 8}%` : '82%', marginLeft: k ? '-8%' : 0, marginBottom: '7%', zIndex: 3 - k }}
            />
          ))}
        </div>
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
          <p className="mt-5 max-w-2xl text-lg leading-8 text-night/60">A focused portfolio across organic fertilizers, biostimulants, biofertilizers and speciality liquid fertilizers.</p>
        </Reveal>
        <div ref={ref} className="mt-14 space-y-[12svh] pb-[4svh]">
          {categories.map((c, i) => <StackCard key={c.slug} c={c} i={i} total={categories.length} progress={scrollYProgress} />)}
        </div>
      </div>
    </section>
  )
}
