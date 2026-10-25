import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, FlaskConical, Leaf, Sprout } from 'lucide-react'
import Reveal from '../Reveal'

const statement = 'Krishivam Agriscience develops and supplies agricultural fertilizer and crop-input solutions designed around modern farming needs — rooted in agriculture, driven by science.'
// The statement is set in two voices: the plain sentence in bold sans, and its
// closing promise as a large serif line in a living lime gradient.
const lead = 'Krishivam Agriscience develops and supplies agricultural fertilizer and crop-input solutions designed around modern farming needs —'
const promise = ['Rooted in agriculture,', 'driven by science.']
const accents = new Set(['Krishivam', 'Agriscience', 'fertilizer', 'crop-input', 'modern', 'farming'])
const gradient = 'bg-[linear-gradient(100deg,#c5e86c_0%,#f1f7d2_45%,#c5e86c_70%,#8fcf6a_100%)] bg-[length:220%_auto] bg-clip-text text-transparent'

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, ['0.35em', '0em'])
  const filter = useTransform(progress, range, ['blur(6px)', 'blur(0px)'])
  return <motion.span style={{ opacity, y, filter }} className={`mr-[0.25em] inline-block ${accent ? gradient : ''}`}>{children}</motion.span>
}

/** Each word sharpens into place as the paragraph scrolls through the viewport. */
function ScrollHighlight() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  const words = lead.split(' ')
  // Lead words light up over the first 70% of the run, the promise over the rest.
  const share = 0.7 / words.length
  const promiseOpacity = useTransform(scrollYProgress, [0.68, 0.92], [0, 1])
  const promiseY = useTransform(scrollYProgress, [0.68, 0.92], [40, 0])
  const underline = useTransform(scrollYProgress, [0.82, 1], [0, 1])
  return (
    <div ref={ref}>
      <p className="sr-only">{statement}</p>
      <p aria-hidden="true" className="font-display text-[1.85rem] font-semibold leading-[1.12] tracking-[-0.035em] text-cream sm:text-[2.6rem] lg:text-[3.25rem]">
        {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i * share, (i + 1) * share]} accent={accents.has(w)}>{w}</Word>)}
      </p>
      <motion.p aria-hidden="true" style={{ opacity: promiseOpacity, y: promiseY }} className="mt-6 font-serif text-[2.6rem] italic leading-[1.02] sm:text-6xl lg:text-[5.4rem]">
        <span className={`block animate-[sheen_7s_ease-in-out_infinite_alternate] pb-1 ${gradient}`}>{promise[0]}</span>
        <span className="relative inline-block">
          <span className={`block animate-[sheen_7s_ease-in-out_infinite_alternate] pb-2 ${gradient}`}>{promise[1]}</span>
          <motion.span style={{ scaleX: underline }} className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-lime to-lime/0" />
        </span>
      </motion.p>
    </div>
  )
}

const pillars = [
  { icon: Sprout, title: 'Nature-led', text: 'Organic and biological inputs that work with the soil, not against it.' },
  { icon: FlaskConical, title: 'Science-minded', text: 'Precise, label-true formulations for measurable crop nutrition.' },
  { icon: Leaf, title: 'Future-focused', text: 'A growing portfolio built for the way farming is changing.' },
]

export default function Approach() {
  return (
    <section data-cursor="invert" className="relative isolate overflow-hidden bg-night pb-24 pt-10 text-cream lg:pb-36">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-24 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(197,232,108,.12),transparent_65%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[620px] w-[620px] rounded-full bg-[radial-gradient(circle,rgba(27,107,58,.35),transparent_65%)]" />
      <div className="container-page">
        <Reveal><p className="eyebrow !text-lime">01 · The Krishivam approach</p></Reveal>
        <div className="mt-8 max-w-6xl"><ScrollHighlight /></div>
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-cream/10 bg-cream/[.03] p-7 transition duration-500 hover:-translate-y-1 hover:border-lime/40 hover:bg-cream/[.06]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-lime/10 text-lime transition group-hover:bg-lime group-hover:text-night"><Icon size={22} strokeWidth={1.6} /></span>
                <h3 className="mt-10 font-display text-3xl">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-cream/55">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-lime transition hover:gap-3">Discover Krishivam <ArrowUpRight size={15} /></Link>
        </Reveal>
      </div>
    </section>
  )
}
