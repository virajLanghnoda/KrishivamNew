import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import TextReveal from '../TextReveal'
import { products } from '../../data/site'

const ShaderAnimation = lazy(() => import('../ui/shader-animation'))

const hero = ['powerzone', 'valhalla', 'ontop'].map(s => products.find(p => p.slug === s)!)

const stats = [
  ['4', 'Product categories'],
  ['9', 'Product lines'],
  ['6', 'INVICTUS formulations'],
] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const packsY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night text-cream">
      <div className="absolute inset-0 -z-20">
        <Suspense fallback={null}><ShaderAnimation /></Suspense>
      </div>
      {/* Keep the copy legible over the brightest rings. */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_80%_at_15%_85%,rgba(7,19,13,.95),rgba(7,19,13,.5)_55%,rgba(7,19,13,.15))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-night" />

      <motion.div style={{ y: packsY }} className="pointer-events-none absolute bottom-[12%] right-[3%] hidden h-[50svh] w-[36vw] max-w-[560px] xl:block" aria-hidden="true">
        {hero.map((p, i) => (
          <motion.img
            key={p.slug}
            src={p.image}
            alt=""
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, y: 60, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: [-6, 3, 6][i] }}
            transition={{ duration: 1.2, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,.55)]"
            style={{ height: ['92%', '74%', '58%'][i], left: ['2%', '40%', '54%'][i], zIndex: [1, 2, 3][i] }}
          />
        ))}
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="container-page relative w-full pb-16 pt-36 lg:pb-20">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="eyebrow !text-lime">Agriscience · Ahmedabad, India</motion.p>
        <h1 className="mt-6 max-w-4xl font-display text-[3.6rem] leading-[.88] sm:text-8xl lg:text-[7rem]">
          <TextReveal text="Nurturing Nature." delay={0.15} />
          <TextReveal text="Enriching Lives." delay={0.35} className="italic text-lime" />
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-7 max-w-xl text-base leading-7 text-cream/70 sm:text-lg">
          Science-driven agricultural solutions for healthier soils, stronger crops and more abundant harvests.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.85 }} className="mt-9 flex flex-wrap gap-3">
          <Link className="btn-lime" to="/products">Explore Products <ArrowUpRight size={16} /></Link>
          <Link className="btn-ghost-light" to="/contact">Contact Us</Link>
        </motion.div>

        <motion.dl initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.1 }} className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-cream/15 pt-6">
          {stats.map(([n, l]) => (
            <div key={l}>
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-4xl leading-none text-cream sm:text-5xl">{n}</dd>
              <dd className="mt-2 text-[11px] font-semibold uppercase tracking-[.16em] text-cream/50">{l}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-6 right-6 hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-cream/50 sm:flex">
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={14} /></motion.span> Scroll
      </motion.div>
    </section>
  )
}
