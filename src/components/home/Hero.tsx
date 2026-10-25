import { lazy, Suspense, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import TextReveal from '../TextReveal'
import mark from '../../assets/mark.svg'
import { useLoaderDone } from '../../lib/loader'

const ShaderAnimation = lazy(() => import('../ui/shader-animation'))

const stats = [
  ['4', 'Categories'],
  ['9', 'Product lines'],
  ['6', 'Formulations'],
] as const

/** Brand seal: the K mark inside a slowly turning ring of text. */
function Seal() {
  const text = 'KRISHIVAM AGRISCIENCE • CULTIVATING TOMORROW • '
  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow motion-reduce:animate-none" aria-hidden="true">
        <defs><path id="seal-ring" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" /></defs>
        <text fill="currentColor" fontSize="11.2" fontWeight="700" letterSpacing="4.1"><textPath href="#seal-ring">{text}</textPath></text>
      </svg>
      <div className="absolute inset-[24%] grid place-items-center rounded-full border border-cream/15 bg-cream/[.04] backdrop-blur-sm">
        <img src={mark} alt="" className="h-[62%] w-auto brightness-0 invert-[.93] sepia-[.2]" />
      </div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  // Wait until the loader has slid most of the way off, so the entrance is seen.
  const ready = useLoaderDone(450)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // A gentle drift only: a bigger one pushed the stats out of the hero's bottom edge.
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const sealRotate = useTransform(scrollYProgress, [0, 1], [0, 90])
  const show = ready ? 'show' : 'hide'
  const rise = { hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

  return (
    <section ref={ref} data-cursor="invert" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-night text-cream">
      <div className="absolute inset-0 -z-20">
        <Suspense fallback={null}><ShaderAnimation /></Suspense>
      </div>
      {/* Keep the copy legible over the brightest rings. */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_80%_at_15%_85%,rgba(7,19,13,.95),rgba(7,19,13,.55)_55%,rgba(7,19,13,.2))]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-night" />

      <motion.div style={{ rotate: sealRotate }} initial={{ opacity: 0, scale: 0.8 }} animate={ready ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} className="absolute right-[7%] top-[22%] hidden w-[min(22vw,300px)] text-cream/70 lg:block">
        <Seal />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="container-page relative w-full pb-16 pt-36 lg:pb-20">
        <motion.p variants={rise} initial="hide" animate={show} transition={{ duration: 0.7 }} className="eyebrow !text-lime">Agriscience · Ahmedabad, India</motion.p>
        <h1 className="mt-6 max-w-5xl font-display text-[3.4rem] leading-[.9] sm:text-7xl lg:text-[6.6rem]">
          <TextReveal text="Nurturing Nature." delay={0.1} play={ready} />
          <TextReveal text="Enriching Lives." delay={0.3} play={ready} className="text-lime" />
        </h1>
        <motion.p variants={rise} initial="hide" animate={show} transition={{ duration: 0.8, delay: 0.6 }} className="mt-7 max-w-xl text-base leading-7 text-cream/70 sm:text-lg">
          Science-driven agricultural solutions for healthier soils, stronger crops and more abundant harvests.
        </motion.p>
        <motion.div variants={rise} initial="hide" animate={show} transition={{ duration: 0.8, delay: 0.75 }} className="mt-9 flex flex-wrap gap-3">
          <Link className="btn-lime" to="/products">Explore Products <ArrowUpRight size={16} /></Link>
          <Link className="btn-ghost-light" to="/contact">Contact Us</Link>
        </motion.div>

        {/* One compact strip, three equal cells, so it stays on a single line even on phones. */}
        <motion.dl variants={{ hide: { opacity: 0 }, show: { opacity: 1 } }} initial="hide" animate={show} transition={{ duration: 1, delay: 1 }} className="mt-10 grid w-full max-w-lg grid-cols-3 divide-x divide-cream/15 rounded-2xl border border-cream/15 bg-cream/[.04] backdrop-blur-sm sm:mt-12">
          {stats.map(([n, l]) => (
            <div key={l} className="flex flex-col items-center gap-1 px-2 py-3 text-center sm:flex-row sm:justify-center sm:gap-3 sm:px-4 sm:py-4 sm:text-left">
              <dt className="sr-only">{l}</dt>
              <dd className="font-display text-2xl font-extrabold leading-none text-lime sm:text-3xl">{n}</dd>
              <dd className="text-[10px] font-semibold uppercase leading-tight tracking-[.14em] text-cream/60 sm:text-[11px]">{l}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 1.3 }} className="absolute bottom-6 right-6 hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-cream/50 sm:flex">
        <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}><ArrowDown size={14} /></motion.span> Scroll
      </motion.div>
    </section>
  )
}
