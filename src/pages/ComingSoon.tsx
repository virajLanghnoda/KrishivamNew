import { ArrowUpRight, Sprout } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import { details } from '../data/details'
import { seoFor } from '../data/seo'
import { useSeo } from '../lib/useSeo'

export default function ComingSoon() {
  useSeo(seoFor('/coming-soon'))
  return (
    <>
      <PageHero eyebrow="Coming soon" title="More is taking shape.">New agricultural solutions will be added here as the portfolio expands.</PageHero>
      <section className="py-16 sm:py-24">
        <div className="container-page">
          {details.upcoming.length > 0 && (
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {details.upcoming.map((u, i) => (
                <Reveal key={u.name} delay={i * 0.05}>
                  <div className="h-full rounded-[1.75rem] border border-night/10 bg-white p-7">
                    <Sprout className="text-forest" strokeWidth={1.6} />
                    <h2 className="mt-8 text-2xl">{u.name}</h2>
                    <p className="mt-2 text-night/60">{u.note}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
          <Reveal>
            <div className="max-w-2xl rounded-[2rem] bg-sand p-8 sm:p-12">
              <p className="eyebrow">Stay in touch</p>
              <h2 className="mt-3 text-4xl sm:text-5xl">A growing portfolio, carefully considered.</h2>
              <p className="mt-5 leading-7 text-night/60">Want to hear first when a new Krishivam product launches? Send us a note and we’ll keep you posted.</p>
              <Link to="/contact" className="btn-primary mt-8">Get in touch <ArrowUpRight size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
