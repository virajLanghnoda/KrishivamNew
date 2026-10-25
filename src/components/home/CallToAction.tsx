import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { company } from '../../data/site'
import TextReveal from '../TextReveal'

export default function CallToAction() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  // The panel grows out toward the page edges as it arrives. clip-path only
  // repaints, so this never triggers layout on scroll.
  const clipPath = useTransform(scrollYProgress, [0, 1], ['inset(0% 5% 0% 5% round 64px)', 'inset(0% 1% 0% 1% round 32px)'])

  return (
    <section className="bg-cream pb-6 sm:pb-10">
      <motion.div ref={ref} style={{ clipPath }} className="relative isolate overflow-hidden bg-forest px-6 py-24 text-cream sm:px-12 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_50%_at_0%_0%,rgba(197,232,108,.28),transparent_70%),radial-gradient(40%_50%_at_100%_100%,rgba(212,162,60,.32),transparent_70%)]" />
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow justify-center !text-lime">Let’s talk</p>
          <TextReveal as="h2" inView text="Let’s grow something together." className="mx-auto mt-5 max-w-4xl font-display text-6xl leading-[.92] sm:text-7xl lg:text-8xl" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-cream/70">Product enquiries, dealership conversations or a question about a crop — the Krishivam team is a call away.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="btn-lime">Send an enquiry <ArrowUpRight size={16} /></Link>
            <a href={`tel:${company.phone}`} className="btn-ghost-light"><Phone size={16} /> {company.phone}</a>
          </div>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-cream/60"><MapPin size={15} /> {company.location}</p>
        </div>
      </motion.div>
    </section>
  )
}
