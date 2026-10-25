import { useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { invictusVariants } from '../../data/site'

// A row of seedlings, tiled along the furrow the tractor leaves behind.
const SPROUTS = `url("data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='22' height='14'><path d='M11 14V7' stroke='#8fcf6a' stroke-width='1.4' stroke-linecap='round'/><path d='M11 9C8.5 5 5.5 5 4 6c1.6 2.6 4.4 3.6 7 3z' fill='#8fcf6a'/><path d='M11 8c2-4.4 5.4-5 7-4-1.2 3-4 4.4-7 4z' fill='#c5e86c'/></svg>")}")`
const spin = { transformBox: 'fill-box' as const, transformOrigin: 'center' }

/** Scroll progress as a tractor crossing a field, planting a row of seedlings behind it. */
function TractorProgress({ progress }: { progress: MotionValue<number> }) {
  const left = useTransform(progress, v => `calc(${v * 100}% - ${v * 58}px)`)
  const planted = useTransform(progress, v => `inset(0 ${100 - v * 100}% 0 0)`)
  const rear = useTransform(progress, v => v * 1600)
  const front = useTransform(progress, v => v * 2600)
  const bob = useTransform(progress, v => Math.sin(v * 160) * 0.8)
  return (
    <div className="relative h-14" aria-hidden="true">
      {/* only ground the tractor has covered is shown: the furrow and seedlings behind it */}
      <motion.div style={{ clipPath: planted }} className="absolute inset-x-0 bottom-1 h-[3px] rounded-full bg-gradient-to-r from-[#5a3d26] via-forest to-lime" />
      <motion.div style={{ clipPath: planted, backgroundImage: SPROUTS, backgroundSize: '22px 14px' }} className="absolute inset-x-0 bottom-[7px] h-[14px] bg-repeat-x" />
      <motion.div style={{ left }} className="absolute bottom-[3px] w-[58px]">
        <svg viewBox="0 0 64 44" className="h-auto w-full overflow-visible">
          {/* exhaust puffs */}
          <g fill="#f5f2ea" opacity=".35">
            <circle className="mini-puff" cx="46" cy="4" r="2.6" />
            <circle className="mini-puff" cx="46" cy="4" r="3.4" style={{ animationDelay: '.9s' }} />
          </g>
          <motion.g style={{ y: bob }}>
            <rect x="44.5" y="6" width="3" height="11" rx="1" fill="#07130d" />
            {/* cab */}
            <path d="M8 6h20l3 16H8z" fill="#c5e86c" />
            <path d="M11 9h14.5l2 10H11z" fill="#f5f2ea" opacity=".5" />
            <rect x="6" y="4" width="24" height="3" rx="1.5" fill="#1b6b3a" />
            {/* hood and chassis */}
            <path d="M28 16h22c4 0 6 2.4 6 6v6H28z" fill="#c5e86c" />
            <path d="M30 19h18" stroke="#1b6b3a" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="55" cy="21" r="1.6" fill="#f5f2ea" />
            <rect x="4" y="26" width="54" height="3.2" rx="1.6" fill="#07130d" />
          </motion.g>
          {/* wheels */}
          <g transform="translate(17 32)">
            <circle r="11" fill="#07130d" />
            <circle r="9.4" fill="none" stroke="#1b6b3a" strokeWidth="1.6" strokeDasharray="2.4 2.6" />
            <motion.g style={{ rotate: rear, ...spin }}>
              <path d="M-7 0H7M0 -7V7M-5 -5L5 5M-5 5L5 -5" stroke="#ebe4d2" strokeOpacity=".55" strokeWidth="1.4" />
            </motion.g>
            <circle r="3" fill="#c5e86c" />
          </g>
          <g transform="translate(49 36)">
            <circle r="7" fill="#07130d" />
            <motion.g style={{ rotate: front, ...spin }}>
              <path d="M-4.5 0H4.5M0 -4.5V4.5" stroke="#ebe4d2" strokeOpacity=".55" strokeWidth="1.2" />
            </motion.g>
            <circle r="2" fill="#c5e86c" />
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

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

        {/* --edge lines the rail up with the page container at every width. */}
        <div className="relative flex min-h-0 flex-1 flex-col [--edge:1.25rem] sm:[--edge:2rem] lg:[--edge:max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          {/* The intro stays put. On phones it sits above the rail; on wider screens it is
              frozen on the left and the bottles slide in underneath a fade. */}
          <div className="relative z-10 shrink-0 px-[var(--edge)] pb-4 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:w-[calc(var(--edge)+480px)] lg:flex-col lg:justify-center lg:bg-[linear-gradient(90deg,#07130d_0%,rgba(8,26,16,.97)_58%,rgba(9,30,18,.75)_80%,transparent_100%)] lg:pb-0 lg:pr-20">
            <p className="eyebrow !text-lime">04 · Speciality liquids</p>
            <h2 className="mt-3 font-display text-4xl leading-[.9] sm:mt-4 sm:text-6xl">INVICTUS<span className="mt-2 block font-serif text-xl font-medium italic leading-tight tracking-normal text-lime sm:mt-3 sm:text-[1.75rem]">one name, six precise formulations.</span></h2>
            <p className="mt-6 hidden max-w-sm text-base leading-7 text-cream/65 sm:block">Balanced NPK, targeted NP and NK liquids, and micronutrient concentrates - each colour-coded on the pack so the right one is easy to pick.</p>
            <Link to="/products/speciality-liquid-fertilizer/invictus" className="btn-lime mt-4 w-fit !min-h-[42px] !py-2.5 sm:mt-8 sm:!min-h-[48px] sm:!py-3.5">Explore INVICTUS <ArrowUpRight size={15} /></Link>
          </div>

          <motion.div ref={trackRef} style={{ x }} className="flex min-h-0 w-max flex-1 items-center gap-6 pl-[var(--edge)] pr-[var(--edge)] will-change-transform lg:pl-[calc(var(--edge)+500px)]">
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
        </div>

        <div className="container-page mt-[max(0.5rem,2svh)] shrink-0">
          <TractorProgress progress={bar} />
        </div>
      </section>
    </div>
  )
}
