import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

// Port of osmosupply's "Parallax Scrolling" (21st.dev). Same build: four stacked
// layers inside a tall header, each pushed down by a different share of its own
// height as the header scrolls away (70 / 55 / 40 / 10 %), so the far layers lag
// and the scene opens up in depth. The original pulls in GSAP + ScrollTrigger +
// Lenis for this; the site already runs Lenis and Framer Motion, so the timeline is
// a few useTransforms instead. The photo layers are replaced by an SVG farm scene
// drawn in the brand palette - a few KB, sharp at any size.

const LAYERS = [70, 55, 40, 10] as const

function useLayer(progress: MotionValue<number>, yPercent: number) {
  return useTransform(progress, [0, 1], ['0%', `${yPercent}%`])
}

/** Deterministic pseudo-random, so the wheat field is identical on every render. */
const rand = (n: number) => {
  const x = Math.sin(n * 127.1) * 43758.5453
  return x - Math.floor(x)
}

const STALKS = Array.from({ length: 46 }, (_, i) => {
  const x = (i / 45) * 1480 - 20 + (rand(i) - 0.5) * 30
  const h = 150 + rand(i + 9) * 170
  const lean = (rand(i + 3) - 0.5) * 60
  return { x, h, lean, i }
})

function Stalk({ x, h, lean, i }: { x: number; h: number; lean: number; i: number }) {
  const top = 900 - h
  const tipX = x + lean
  // Grains run up the last third of the stalk, alternating sides.
  const grains = Array.from({ length: 7 }, (_, k) => {
    const t = 0.66 + (k / 7) * 0.34
    const gx = x + lean * t * t
    const gy = 900 - h * t
    const side = k % 2 ? 1 : -1
    return <ellipse key={k} cx={gx + side * 5} cy={gy} rx="4.2" ry="10" transform={`rotate(${side * 28 + lean * 0.3} ${gx + side * 5} ${gy})`} />
  })
  return (
    <g opacity={0.82 + rand(i + 5) * 0.18}>
      <path d={`M${x} 900 Q ${x + lean * 0.2} ${top + h * 0.45} ${tipX} ${top}`} fill="none" stroke="currentColor" strokeWidth="3" />
      <path d={`M${x} ${900 - h * 0.35} q ${-30 - rand(i) * 20} ${-25} ${-46} ${-70}`} fill="none" stroke="currentColor" strokeWidth="2.4" />
      {grains}
    </g>
  )
}

const Sky = () => (
  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <linearGradient id="px-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f5f2ea" />
        <stop offset=".62" stopColor="#f1e3bd" />
        <stop offset="1" stopColor="#e9cf8e" />
      </linearGradient>
      <radialGradient id="px-sun" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffe7a3" />
        <stop offset=".35" stopColor="#f5c867" stopOpacity=".85" />
        <stop offset="1" stopColor="#f5c867" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1440" height="900" fill="url(#px-sky)" />
    <circle cx="980" cy="470" r="260" fill="url(#px-sun)" />
    <circle cx="980" cy="470" r="70" fill="#fbe1a0" />
  </svg>
)

const FarHills = () => (
  <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <path d="M0 520 C150 470 300 455 450 480 S 760 545 930 505 S 1260 430 1440 470 V900 H0Z" fill="#b9c79a" />
    <path d="M0 575 C200 535 380 540 560 565 S 900 600 1100 560 S 1340 535 1440 545 V900 H0Z" fill="#9fb57c" />
  </svg>
)

const Fields = () => (
  <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <clipPath id="px-field">
        <path d="M0 640 C220 595 430 605 640 632 S 1020 688 1220 645 S 1390 615 1440 622 V900 H0Z" />
      </clipPath>
    </defs>
    <path d="M0 640 C220 595 430 605 640 632 S 1020 688 1220 645 S 1390 615 1440 622 V900 H0Z" fill="#5f8f3e" />
    <g clipPath="url(#px-field)" stroke="#7fae54" strokeWidth="5" opacity=".7">
      {Array.from({ length: 31 }, (_, k) => {
        const off = k - 15
        return <line key={k} x1={720 + off * 22} y1="610" x2={720 + off * 150} y2="900" />
      })}
    </g>
    <path d="M0 735 C260 700 520 712 760 735 S 1180 770 1440 732 V900 H0Z" fill="#3f6f2c" />
  </svg>
)

const Foreground = () => (
  <svg className="h-full w-full text-ink" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <g fill="currentColor">{STALKS.map(s => <Stalk key={s.i} {...s} />)}</g>
    <path d="M0 830 C300 810 620 822 900 836 S 1300 846 1440 828 V900 H0Z" fill="currentColor" />
  </svg>
)

export interface ParallaxScrollingProps {
  /** Rendered in the title layer, which travels at the middle speed. */
  title: ReactNode
  /** Content that the scene hands over to as it scrolls away. */
  children?: ReactNode
}

export function ParallaxScrolling({ title, children }: ParallaxScrollingProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Reduced motion: every layer stays put.
  const still = useMotionValue(0)
  const progress = reduce ? still : scrollYProgress
  const y1 = useLayer(progress, LAYERS[0])
  const y2 = useLayer(progress, LAYERS[1])
  const y3 = useLayer(progress, LAYERS[2])
  const y4 = useLayer(progress, LAYERS[3])

  return (
    <div className="relative">
      <section className="relative">
        <div ref={ref} className="relative h-[115svh] min-h-[640px] overflow-hidden">
          <Sky />
          <motion.div style={{ y: y1 }} className="absolute inset-0 will-change-transform"><FarHills /></motion.div>
          <motion.div style={{ y: y2 }} className="absolute inset-0 will-change-transform"><Fields /></motion.div>
          <motion.div style={{ y: y3 }} className="absolute inset-0 flex items-start justify-center pt-[16svh] will-change-transform">
            {title}
          </motion.div>
          <motion.div style={{ y: y4 }} className="absolute inset-0 will-change-transform"><Foreground /></motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-b from-transparent to-ink" />
        </div>
      </section>
      {children}
    </div>
  )
}

export default ParallaxScrolling
