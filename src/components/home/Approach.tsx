import { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, FlaskConical, Leaf, Sprout } from 'lucide-react'
import Reveal from '../Reveal'
import { useLang } from '../../lib/i18n'

const statement = 'Krishivam Agriscience develops and supplies agricultural fertilizer and crop-input solutions designed around modern farming needs — rooted in agriculture, driven by science.'
const gradient = 'bg-[linear-gradient(100deg,#c5e86c_0%,#f1f7d2_45%,#c5e86c_70%,#8fcf6a_100%)] bg-[length:220%_auto] bg-clip-text text-transparent'

// The sentence as it is read: words fill with ink one after another, the key
// words in a lime gradient with a soft highlight sweeping under them.
const lead: { word: string; accent?: boolean }[] = [
  { word: 'Krishivam', accent: true }, { word: 'Agriscience', accent: true },
  { word: 'develops' }, { word: 'and' }, { word: 'supplies' }, { word: 'agricultural' }, { word: 'fertilizer', accent: true },
  { word: 'and' }, { word: 'crop-input', accent: true }, { word: 'solutions' }, { word: 'designed' }, { word: 'around' },
  { word: 'modern', accent: true }, { word: 'farming', accent: true }, { word: 'needs' }, { word: '—' },
]

/** A word in faint outline that fills with colour from left to right. */
function Word({ word, accent, progress, range }: { word: string; accent?: boolean; progress: MotionValue<number>; range: [number, number] }) {
  const hidden = useTransform(progress, range, [100, 0])
  const clipPath = useMotionTemplate`inset(-0.2em ${hidden}% -0.3em -0.05em)`
  const swipe = useTransform(progress, range, [0, 1])
  return (
    <span className="relative inline-block whitespace-nowrap">
      {accent && <motion.span style={{ scaleX: swipe }} className="absolute inset-x-[-0.08em] bottom-[0.08em] -z-10 h-[0.3em] origin-left rounded-sm bg-lime/[.13]" />}
      <span className="text-cream/[.13]">{word}</span>
      {/* The coloured copy can't be selected, so copied text reads once. */}
      <motion.span style={{ clipPath }} className={`absolute inset-0 select-none ${accent ? gradient : 'text-cream'}`}>{word}</motion.span>
    </span>
  )
}

/** The statement, read by scrolling: ink fills the sentence, then the promise slides together. */
function ScrollStatement() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 0.82', 'end 0.4'] })
  const share = 0.6 / lead.length
  const x1 = useTransform(p, [0.52, 0.86], ['-14%', '0%'])
  const x2 = useTransform(p, [0.56, 0.9], ['14%', '0%'])
  const show = useTransform(p, [0.52, 0.72], [0, 1])
  const draw = useTransform(p, [0.84, 1], [0, 1])
  const badge = useTransform(p, [0.6, 0.9], [-120, 0])
  const badgeBack = useTransform(badge, v => -v)
  return (
    <div ref={ref}>
      <p className="sr-only">{statement}</p>
      <p aria-hidden="true" className="relative isolate font-display text-[1.95rem] font-semibold leading-[1.1] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
        {lead.map((t, i) => (
          <Fragment key={i}>
            <Word word={t.word} accent={t.accent} progress={p} range={[i * share, (i + 1) * share]} />{' '}
          </Fragment>
        ))}
      </p>
      <div aria-hidden="true" className="mt-8 font-serif text-[2.55rem] italic leading-[1.02] sm:mt-10 sm:text-6xl lg:text-[5.6rem]">
        <motion.div style={{ x: x1, opacity: show }} className="flex items-center gap-[0.25em]">
          <motion.span style={{ rotate: badge }} className="hidden h-[0.78em] w-[0.78em] shrink-0 place-items-center rounded-full bg-lime text-night sm:grid"><Sprout className="h-1/2 w-1/2" strokeWidth={2} /></motion.span>
          <span className={`animate-[sheen_7s_ease-in-out_infinite_alternate] pb-[0.08em] ${gradient}`}>Rooted in agriculture,</span>
        </motion.div>
        <motion.div style={{ x: x2, opacity: show }} className="flex items-center gap-[0.25em] sm:justify-end">
          <span className="relative">
            <span className={`animate-[sheen_7s_ease-in-out_infinite_alternate] pb-[0.08em] ${gradient}`}>driven by science.</span>
            {/* a hand-drawn stroke under the promise */}
            <svg viewBox="0 0 300 16" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-0 h-[0.2em] w-full overflow-visible">
              <motion.path d="M3 11 C 70 3, 150 2, 297 8" fill="none" stroke="#c5e86c" strokeWidth="3.2" strokeLinecap="round" style={{ pathLength: draw }} />
            </svg>
          </span>
          <motion.span style={{ rotate: badgeBack }} className="hidden h-[0.78em] w-[0.78em] shrink-0 place-items-center rounded-full border border-lime/50 text-lime sm:grid"><FlaskConical className="h-1/2 w-1/2" strokeWidth={2} /></motion.span>
        </motion.div>
      </div>
    </div>
  )
}

/** Translated pages get the statement as whole sentences, so Google can translate them properly. */
function PlainStatement() {
  return (
    <div>
      <p className="font-display text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.03em] text-cream sm:text-4xl lg:text-5xl">Krishivam Agriscience develops and supplies agricultural fertilizer and crop-input solutions designed around modern farming needs.</p>
      <p className={`mt-8 font-serif text-[2.4rem] italic leading-[1.05] sm:text-6xl ${gradient}`}>Rooted in agriculture, driven by science.</p>
    </div>
  )
}

function Statement() {
  return useLang() === 'en' ? <ScrollStatement /> : <PlainStatement />
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
        <div className="mt-8 max-w-6xl"><Statement /></div>
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
