import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { invictusVariants } from '../../data/site'

// Left and right edge of the page container, so the rail starts and ends in line
// with every other section.
const edge = 'pl-5 pr-5 sm:pl-8 sm:pr-8 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]'

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
    <div ref={wrapRef} data-cursor="invert" className="relative bg-night" style={{ height: `calc(100svh + ${distance}px)` }}>
      {/* Content sits below the header and above the progress bar, not floating mid-screen. */}
      <section className="sticky top-0 isolate flex h-[100svh] flex-col overflow-hidden pb-[max(1.25rem,4svh)] pt-[max(5.5rem,12svh)] text-cream" aria-label="INVICTUS formulations">
        {/* deep field green, lit from the top right, with a faint grid */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_85%_at_85%_10%,#1b6b3a_0%,#0e3a20_45%,#07130d_100%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[.06] [background-image:linear-gradient(#f5f2ea_1px,transparent_1px),linear-gradient(90deg,#f5f2ea_1px,transparent_1px)] [background-size:64px_64px]" />

        <motion.div ref={trackRef} style={{ x }} className={`flex min-h-0 w-max flex-1 items-center gap-6 will-change-transform ${edge}`}>
          <div className="flex w-[80vw] max-w-[400px] shrink-0 flex-col justify-center pr-4 sm:w-[380px] sm:pr-10">
            <p className="eyebrow !text-lime">04 · Speciality liquids</p>
            <h2 className="mt-4 font-display text-5xl leading-[.9] sm:text-6xl">INVICTUS<span className="mt-3 block font-serif text-2xl font-medium italic leading-tight tracking-normal text-lime sm:text-[1.75rem]">one name, six precise formulations.</span></h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-cream/65">Balanced NPK, targeted NP and NK liquids, and micronutrient concentrates — each colour-coded on the pack so the right one is easy to pick.</p>
            <Link to="/products/speciality-liquid-fertilizer/invictus" className="btn-lime mt-8 w-fit">Explore INVICTUS <ArrowUpRight size={15} /></Link>
          </div>
          {invictusVariants.map((v, i) => (
            <article key={v.name + i} className="group relative flex h-full max-h-[600px] w-[72vw] max-w-[340px] shrink-0 flex-col overflow-hidden rounded-[2rem] bg-cream p-6 text-night shadow-[0_30px_60px_-25px_rgba(0,0,0,.6)] sm:w-[300px]">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-lime" />
              <div className="absolute -right-16 top-10 h-56 w-56 rounded-full bg-sand transition duration-700 group-hover:scale-125" />
              <div className="relative flex items-center justify-between text-[10px] font-bold uppercase tracking-[.2em] text-night/45">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span>{v.type}</span>
              </div>
              <div className="relative flex min-h-0 flex-1 items-center justify-center py-4">
                <img src={v.image} alt={`INVICTUS ${v.name}`} loading="lazy" decoding="async" className="h-full max-h-[340px] w-auto object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,.18)] transition duration-700 group-hover:-translate-y-2 group-hover:rotate-[-3deg]" />
              </div>
              <h3 className="font-display text-3xl leading-none text-night">{v.name}</h3>
              <p className="mt-2 text-sm leading-6 text-night/60">{v.detail}</p>
            </article>
          ))}
        </motion.div>

        <div className="container-page mt-[max(1rem,3svh)] shrink-0">
          <div className="h-[2px] w-full overflow-hidden rounded bg-cream/15">
            <motion.div style={{ scaleX: bar }} className="h-full origin-left bg-lime" />
          </div>
        </div>
      </section>
    </div>
  )
}
