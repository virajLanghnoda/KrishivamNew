import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { invictusVariants } from '../../data/site'

/** Vertical scroll drives a horizontal rail of the INVICTUS formulations. */
export default function InvictusRail() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure) }
  }, [])

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <div ref={wrapRef} className="relative bg-sand" style={{ height: `calc(100svh + ${distance}px)` }}>
      <section className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" aria-label="INVICTUS formulations">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-stretch gap-5 pl-5 pr-[8vw] will-change-transform sm:pl-8 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          <div className="flex w-[82vw] max-w-[460px] shrink-0 flex-col justify-center pr-6 sm:w-[420px]">
            <p className="eyebrow">04 · Speciality liquids</p>
            <h2 className="mt-4 font-display text-6xl leading-[.9] text-ink sm:text-7xl">INVICTUS<span className="block italic text-forest">one name, six precise formulations.</span></h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-ink/60">Balanced NPK, targeted NP and NK liquids, and micronutrient concentrates — each colour-coded on the pack so the right one is easy to pick.</p>
            <Link to="/products/speciality-liquid-fertilizer/invictus" className="btn-primary mt-8 w-fit">Explore INVICTUS <ArrowUpRight size={15} /></Link>
          </div>
          {invictusVariants.map((v, i) => (
            <article key={v.name + i} className="group relative flex h-[66svh] min-h-[440px] w-[72vw] max-w-[340px] shrink-0 flex-col overflow-hidden rounded-[2rem] bg-cream p-6 shadow-soft sm:w-[300px]">
              <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: v.accent }} />
              <div className="absolute -right-16 top-10 h-56 w-56 rounded-full opacity-[.13] transition duration-700 group-hover:scale-125" style={{ background: v.accent }} />
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.2em] text-ink/45">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span>{v.type}</span>
              </div>
              <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
                <img src={v.image} alt={`INVICTUS ${v.name}`} loading="lazy" decoding="async" className="h-full max-h-[340px] w-auto object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,.18)] transition duration-700 group-hover:-translate-y-2 group-hover:rotate-[-3deg]" />
              </div>
              <h3 className="font-display text-3xl leading-none" style={{ color: v.accent }}>{v.name}</h3>
              <p className="mt-2 text-sm leading-6 text-ink/60">{v.detail}</p>
            </article>
          ))}
        </motion.div>
        <div className="container-page mt-8">
          <div className="h-[2px] w-full overflow-hidden rounded bg-ink/10">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-forest" />
          </div>
        </div>
      </section>
    </div>
  )
}
