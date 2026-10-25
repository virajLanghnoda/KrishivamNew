import * as React from 'react'
import { Link } from 'react-router-dom'
import { useScroll } from 'framer-motion'
import { cn } from '../../lib/utils'
import { scrollToY, useLenis } from '../SmoothScroll'

// Adapted from crafterui's "Works Wheel" (21st.dev).
//
// At rest the work sits in a ring around a title, each card tangent to the circle.
// Scrolling blows the ring open into a vertical drum: the card at the front lies
// flat and full size, the ones above and below rotate away into hard perspective.
// Keep scrolling and the drum brings the next piece up from below to the front.
//
// The original turns on wheel/drag inside its own box, which fights page scroll
// (and Lenis). Here the section pins and page scroll *is* the turn, with a short
// dwell on every item so each product rests at the front before the next arrives.
// Geometry, easing and the single rAF pass writing transforms are unchanged.

export interface WorksWheelItem {
  title: string
  image: string
  href?: string
  subtitle?: string
}

export interface WorksWheelProps {
  items: WorksWheelItem[]
  label?: string
  action?: string
  className?: string
}

const CARD_H = 0.52
const CARD_MAX_W = 0.44
const CARD_RATIO = 1.45
const STEP = 40
const DRUM = 2.22
const LENS = 2.7
const RING_R = 1.14
const BOW = 1.82
const TITLE = 0.1
const INDEX = 0.04
const CULL = 1.6
const EASE = 0.14
/** Share of the pinned scroll spent opening the ring into the drum. */
const OPEN = 0.14

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (t: number) => t * t * (3 - 2 * t)
const rad = (deg: number) => (deg * Math.PI) / 180
const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)))

function place(ringDeg: number, drumDeg: number, ringR: number, drumR: number, bow: number, m: number) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  )
}

/** Page-scroll progress (0..1) to wheel turn: 0 ring, 1 first item, 1+n item n. */
function turnFor(p: number, last: number) {
  if (p <= OPEN) return smooth(clamp(p / OPEN, 0, 1))
  const q = ((p - OPEN) / (1 - OPEN)) * last
  const n = Math.floor(q)
  const f = q - n
  // Hold each item at the front for the middle half of its stretch of scroll.
  return 1 + Math.min(last, n + smooth(clamp((f - 0.25) / 0.5, 0, 1)))
}

export function WorksWheel({ items, label = 'The Range', action = 'View', className }: WorksWheelProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const stageRef = React.useRef<HTMLDivElement>(null)
  const wheelRef = React.useRef<HTMLDivElement>(null)
  const cardRefs = React.useRef<(HTMLElement | null)[]>([])
  const labelRef = React.useRef<HTMLDivElement>(null)
  const titleRef = React.useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  const turn = React.useRef(0)
  const [active, setActive] = React.useState(0)
  const [stage, setStage] = React.useState({ w: 0, h: 0 })
  const count = items.length
  const last = Math.max(count - 1, 0)

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })

  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const read = () => setReduced(query.matches)
    read()
    query.addEventListener('change', read)
    return () => query.removeEventListener('change', read)
  }, [])

  React.useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight })
    read()
    const ro = new ResizeObserver(read)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const narrow = stage.w > 0 && stage.w < 768

  const metrics = React.useMemo(() => {
    const { w, h } = stage
    // On phones the card is capped by width, so let it take most of the screen.
    const cardW = Math.min(h * (narrow ? 0.36 : CARD_H) * CARD_RATIO, w * (narrow ? 0.9 : CARD_MAX_W))
    const cardH = cardW / CARD_RATIO
    const drumR = cardH * DRUM
    const ringR = cardH * (narrow ? 1.25 : RING_R)
    const ringScale = count ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1) : 1
    return {
      cardW, cardH, ringR, ringScale, drumR,
      bow: cardH * (narrow ? 0.9 : BOW),
      depth: cardH * LENS,
      title: Math.max(cardH * TITLE, narrow ? 30 : 0),
      index: Math.max(cardH * INDEX, 12),
    }
  }, [stage, count, narrow])

  // One pass per frame while the section is on screen: ease toward the scroll's
  // turn, then write every transform straight to the DOM.
  React.useEffect(() => {
    if (!stage.h) return
    let frame = 0
    let running = false
    const { ringR, ringScale, drumR, bow } = metrics

    const draw = () => {
      if (running) frame = requestAnimationFrame(draw)
      const goal = turnFor(scrollYProgress.get(), last)
      const gap = goal - turn.current
      if (Math.abs(gap) < 0.0005) turn.current = goal
      else turn.current += gap * (reduced ? 1 : EASE)

      const t = turn.current
      const m = clamp(t, 0, 1)
      const pos = Math.max(0, t - 1)
      if (wheelRef.current) wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`

      for (let i = 0; i < count; i++) {
        const d = i - pos
        const card = cardRefs.current[i]
        if (!card) continue
        card.style.transform = place(d * (360 / count), -d * STEP, ringR, drumR, bow, m)
        const hidden = m > 0.5 && Math.abs(d) > CULL
        card.style.opacity = hidden ? '0' : '1'
        card.style.visibility = hidden ? 'hidden' : 'visible'
        card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2))
        const face = card.firstElementChild as HTMLElement | null
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m)
      if (titleRef.current) titleRef.current.style.opacity = String(m)
      const near = clamp(Math.round(pos), 0, last)
      setActive(prev => (prev === near ? prev : near))
    }

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) { running = true; frame = requestAnimationFrame(draw) }
      else if (!entry.isIntersecting) { running = false; cancelAnimationFrame(frame) }
    }, { rootMargin: '100px' })
    if (wrapRef.current) io.observe(wrapRef.current)
    draw()
    return () => { running = false; cancelAnimationFrame(frame); io.disconnect() }
  }, [metrics, stage.h, count, last, reduced, scrollYProgress])

  // Index buttons scroll the page to where that item rests at the front.
  const goTo = (i: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const top = wrap.getBoundingClientRect().top + window.scrollY
    const span = wrap.offsetHeight - window.innerHeight
    const p = OPEN + (last ? i / last : 0) * (1 - OPEN)
    scrollToY(lenis, top + p * span + 2)
  }

  return (
    <div ref={wrapRef} className={cn('relative', className)} style={{ height: `${100 + count * 62}svh` }}>
      <section aria-label={label} className="sticky top-0 h-[100svh] w-full select-none overflow-hidden">
        <div ref={stageRef} className="absolute inset-0" style={{ perspective: `${metrics.depth}px` }}>
          <div ref={wheelRef} className={cn('absolute left-1/2 [transform-style:preserve-3d]', narrow ? 'top-[60%]' : 'top-1/2')}>
            {items.map((item, i) => {
              const style = { width: metrics.cardW, height: metrics.cardH, marginLeft: -metrics.cardW / 2, marginTop: -metrics.cardH / 2 }
              const face = (
                <span
                  className="relative block size-full overflow-hidden rounded-xl shadow-[0_24px_50px_-20px_rgba(0,0,0,.6)]"
                  style={{ background: 'radial-gradient(120% 90% at 72% 42%, rgba(197,232,108,.45), transparent 60%), linear-gradient(135deg, #f5f2ea, #ebe4d2)' }}
                >
                  <span translate="no" className="notranslate absolute left-[6%] top-[9%] max-w-[46%] font-display text-[clamp(1rem,2.4vw,2.2rem)] font-bold leading-none text-night/85">{item.title}</span>
                  {item.subtitle && <span className="absolute bottom-[9%] left-[6%] max-w-[46%] text-[clamp(.55rem,.8vw,.72rem)] font-bold uppercase tracking-[.18em] text-night/50">{item.subtitle}</span>}
                  <img src={item.image} alt={item.title} draggable={false} loading="lazy" decoding="async" className="absolute bottom-[6%] right-[6%] h-[88%] w-[48%] object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,.28)]" />
                  {action && item.href && (
                    <span className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-1 items-center gap-1 rounded-full bg-night/85 px-3 py-1 text-[0.7rem] font-semibold text-cream opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                      {action} →
                    </span>
                  )}
                </span>
              )
              return item.href ? (
                <Link key={item.title} to={item.href} tabIndex={i === active ? 0 : -1} ref={(n: HTMLAnchorElement | null) => { cardRefs.current[i] = n }} className="group absolute [backface-visibility:hidden] focus:outline-none focus-visible:ring-2 focus-visible:ring-lime" style={style} aria-label={`${item.title} — ${item.subtitle ?? ''}`}>
                  {face}
                </Link>
              ) : (
                <div key={item.title} ref={n => { cardRefs.current[i] = n }} className="group absolute [backface-visibility:hidden]" style={style}>{face}</div>
              )
            })}
          </div>
        </div>

        <div ref={labelRef} className="pointer-events-none absolute inset-0 grid place-items-center text-center font-display font-extrabold leading-none tracking-tight text-cream" style={{ fontSize: metrics.title }}>
          {label}
        </div>
        <div
          ref={titleRef}
          className={cn(
            'pointer-events-none absolute font-display leading-none tracking-tight text-cream opacity-0',
            // On phones the title sits in its own band at the top, over a fade, so the
            // card turning away above the front one slips underneath it.
            narrow ? 'left-0 right-0 top-0 z-[200] bg-[linear-gradient(to_bottom,#07130d_0%,#07130d_72%,rgba(7,19,13,0))] px-5 pb-12 pt-[calc(76px+2svh)] text-center' : 'left-[4%] top-1/2 max-w-[22%] -translate-y-1/2',
          )}
          style={{ fontSize: metrics.title }}
          aria-live="polite"
        >
          <span key={active} className="block"><span translate="no" className="notranslate">{items[active]?.title}</span>
          <span className="mt-3 block font-sans text-xs font-bold uppercase tracking-[.22em] text-lime">{items[active]?.subtitle}</span></span>
        </div>

        {!narrow && (
          <ol className="absolute right-[2.5%] top-1/2 -translate-y-1/2 text-right leading-[1.9] text-cream/40" style={{ fontSize: metrics.index }}>
            {items.map((item, i) => (
              <li key={item.title}>
                <button type="button" onClick={() => goTo(i)} className={cn('cursor-pointer transition-colors hover:text-cream focus:outline-none focus-visible:text-lime', i === active && 'font-semibold text-lime')}>
                  {String(i + 1).padStart(2, '0')} · <span translate="no" className="notranslate">{item.title}</span>
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  )
}

export default WorksWheel
