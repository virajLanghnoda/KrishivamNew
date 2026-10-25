import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight, FlaskConical, Leaf, Sprout } from 'lucide-react'
import Reveal from '../Reveal'

const statement = 'Krishivam Agriscience develops and supplies agricultural fertilizer and crop-input solutions designed around modern farming needs — rooted in agriculture, driven by science.'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">{children}</motion.span>
}

/** Each word lights up as the paragraph scrolls through the viewport. */
function ScrollHighlight({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="font-serif text-[2rem] leading-[1.15] text-cream sm:text-5xl lg:text-[3.6rem]" aria-label={text}>
      {words.map((w, i) => <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>)}
    </p>
  )
}

const pillars = [
  { icon: Sprout, title: 'Nature-led', text: 'Organic and biological inputs that work with the soil, not against it.' },
  { icon: FlaskConical, title: 'Science-minded', text: 'Precise, label-true formulations for measurable crop nutrition.' },
  { icon: Leaf, title: 'Future-focused', text: 'A growing portfolio built for the way farming is changing.' },
]

export default function Approach() {
  return (
    <section className="relative bg-night pb-24 pt-10 text-cream lg:pb-36">
      <div className="container-page">
        <Reveal><p className="eyebrow !text-lime">01 · The Krishivam approach</p></Reveal>
        <div className="mt-8 max-w-5xl"><ScrollHighlight text={statement} /></div>
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
