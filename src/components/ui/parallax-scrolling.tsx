import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

// Port of osmosupply's "Parallax Scrolling" (21st.dev). Same build: four stacked
// layers inside a tall header, each pushed down by a different share of its own
// height as the header scrolls away (70 / 55 / 40 / 10 %), so the far layers lag
// and the scene opens up in depth. The original pulls in GSAP + ScrollTrigger +
// Lenis for this; the site already runs Lenis and Framer Motion, so the timeline is
// a few useTransforms instead. The photo layers are replaced by an SVG farm scene
// drawn only in the brand palette (at different strengths) - a few KB, sharp at any
// size - and a tractor that drives across the field as the page scrolls.

const LAYERS = [70, 55, 40, 10] as const
const C = { night: '#07130d', forest: '#1b6b3a', lime: '#c5e86c', cream: '#f5f2ea', sand: '#ebe4d2' }

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
        <stop offset="0" stopColor={C.cream} />
        <stop offset="1" stopColor={C.sand} />
      </linearGradient>
      <radialGradient id="px-sun" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor={C.lime} stopOpacity=".7" />
        <stop offset="1" stopColor={C.lime} stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="1440" height="900" fill="url(#px-sky)" />
    <circle cx="980" cy="470" r="260" fill="url(#px-sun)" />
    <circle cx="980" cy="470" r="66" fill={C.lime} opacity=".75" />
  </svg>
)

const FarHills = () => (
  <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <path d="M0 520 C150 470 300 455 450 480 S 760 545 930 505 S 1260 430 1440 470 V900 H0Z" fill={C.forest} opacity=".22" />
    <path d="M0 575 C200 535 380 540 560 565 S 900 600 1100 560 S 1340 535 1440 545 V900 H0Z" fill={C.forest} opacity=".38" />
  </svg>
)

/** The line the tractor drives along: a little inside the main field's crest. */
const RIDGE_X = [-400, 0, 220, 430, 640, 830, 1020, 1220, 1330, 1440, 1900]
const RIDGE_Y = [682, 682, 655, 655, 674, 700, 708, 686, 670, 664, 664]
const REAR_R = 34
const FRONT_R = 20

function Tractor({ x }: { x: MotionValue<number> }) {
  const y = useTransform(x, RIDGE_X, RIDGE_Y)
  // A light rumble so it reads as driving over furrows, not sliding.
  const bodyY = useTransform(x, v => Math.sin(v * 0.09) * 1.4)
  // Wheels roll exactly as far as the tractor travels.
  const rear = useTransform(x, v => (v / (2 * Math.PI * REAR_R)) * 360)
  const front = useTransform(x, v => (v / (2 * Math.PI * FRONT_R)) * 360)
  const spin = { transformBox: 'fill-box' as const, transformOrigin: 'center' }
  const spokes = (r: number) => [0, 45, 90, 135].map(a => (
    <line key={a} x1={-r * 0.78} y1="0" x2={r * 0.78} y2="0" transform={`rotate(${a})`} stroke={C.sand} strokeOpacity=".55" strokeWidth="2.4" />
  ))

  return (
    <motion.g style={{ x, y, scale: 1.2 }}>
      {/* dust kicked up behind the rear wheel */}
      <g fill={C.sand}>
        {[0, 1, 2].map(i => <circle key={i} className="tractor-puff" cx={-92} cy={-12} r={9 + i * 2} style={{ animationDelay: `${i * 0.5}s` }} />)}
      </g>
      <motion.g style={{ y: bodyY }}>
        {/* exhaust */}
        <rect x="52" y="-96" width="6" height="40" rx="2" fill={C.night} />
        {[0, 1].map(i => <circle key={i} className="tractor-smoke" cx="55" cy="-104" r={6 + i * 3} fill={C.night} opacity=".25" style={{ animationDelay: `${i * 0.8}s` }} />)}
        {/* cab */}
        <rect x="-86" y="-128" width="78" height="9" rx="4" fill={C.lime} />
        <path d="M-80 -119 V-56 M-14 -119 V-56" stroke={C.night} strokeWidth="5" strokeLinecap="round" />
        <rect x="-77" y="-114" width="60" height="50" rx="4" fill={C.cream} opacity=".55" />
        {/* body and hood */}
        <path d="M-92 -54 H-20 V-70 H62 Q84 -70 86 -48 V-30 H-92Z" fill={C.lime} />
        <path d="M-20 -70 H62 Q84 -70 86 -48" fill="none" stroke={C.forest} strokeWidth="3" />
        <rect x="-2" y="-62" width="58" height="4" rx="2" fill={C.forest} opacity=".6" />
        <circle cx="83" cy="-42" r="5" fill={C.cream} />
        <rect x="-96" y="-32" width="186" height="8" rx="4" fill={C.night} />
        {/* rear fender */}
        <path d="M-92 -38 A42 42 0 0 1 -6 -38" fill="none" stroke={C.forest} strokeWidth="7" strokeLinecap="round" transform="translate(0 4)" />
      </motion.g>
      {/* wheels */}
      <g transform={`translate(-48 ${-REAR_R})`}>
        <circle r={REAR_R} fill={C.night} />
        <circle r={REAR_R - 3} fill="none" stroke={C.forest} strokeWidth="3" strokeDasharray="5 6" />
        <motion.g style={{ rotate: rear, ...spin }}>{spokes(REAR_R)}</motion.g>
        <circle r="9" fill={C.lime} />
      </g>
      <g transform={`translate(58 ${-FRONT_R})`}>
        <circle r={FRONT_R} fill={C.night} />
        <motion.g style={{ rotate: front, ...spin }}>{spokes(FRONT_R)}</motion.g>
        <circle r="6" fill={C.lime} />
      </g>
    </motion.g>
  )
}

const Fields = ({ tractorX }: { tractorX: MotionValue<number> }) => (
  <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs>
      <clipPath id="px-field">
        <path d="M0 640 C220 595 430 605 640 632 S 1020 688 1220 645 S 1390 615 1440 622 V900 H0Z" />
      </clipPath>
    </defs>
    <path d="M0 640 C220 595 430 605 640 632 S 1020 688 1220 645 S 1390 615 1440 622 V900 H0Z" fill={C.forest} opacity=".72" />
    <g clipPath="url(#px-field)" stroke={C.lime} strokeWidth="5" opacity=".3">
      {Array.from({ length: 31 }, (_, k) => {
        const off = k - 15
        return <line key={k} x1={720 + off * 22} y1="610" x2={720 + off * 150} y2="900" />
      })}
    </g>
    <Tractor x={tractorX} />
    <path d="M0 735 C260 700 520 712 760 735 S 1180 770 1440 732 V900 H0Z" fill={C.forest} />
  </svg>
)

const Foreground = () => (
  <svg className="h-full w-full text-night" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
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
  // The tractor's drive spans the whole time the scene is on screen, from the
  // moment it rises into view until it has scrolled away.
  const { scrollYProgress: passage } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  // Reduced motion: every layer stays put and the tractor parks mid-field.
  const still = useMotionValue(0)
  const parked = useMotionValue(0.45)
  const progress = reduce ? still : scrollYProgress
  const y1 = useLayer(progress, LAYERS[0])
  const y2 = useLayer(progress, LAYERS[1])
  const y3 = useLayer(progress, LAYERS[2])
  const y4 = useLayer(progress, LAYERS[3])
  const tractorX = useTransform(reduce ? parked : passage, [0.18, 0.72], [-260, 1640])

  return (
    <div className="relative">
      <section className="relative">
        <div ref={ref} className="relative h-[115svh] min-h-[640px] overflow-hidden">
          <Sky />
          <motion.div style={{ y: y1 }} className="absolute inset-0 will-change-transform"><FarHills /></motion.div>
          <motion.div style={{ y: y2 }} className="absolute inset-0 will-change-transform"><Fields tractorX={tractorX} /></motion.div>
          <motion.div style={{ y: y3 }} className="absolute inset-0 flex items-start justify-center pt-[16svh] will-change-transform">
            {title}
          </motion.div>
          <motion.div style={{ y: y4 }} className="absolute inset-0 will-change-transform"><Foreground /></motion.div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-b from-transparent to-night" />
        </div>
      </section>
      {children}
    </div>
  )
}

export default ParallaxScrolling
