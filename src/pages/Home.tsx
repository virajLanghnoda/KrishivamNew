import Hero from '../components/home/Hero'
import Approach from '../components/home/Approach'
import CategoryStack from '../components/home/CategoryStack'
import InvictusRail from '../components/home/InvictusRail'
import Science from '../components/home/Science'
import Values from '../components/home/Values'
import CallToAction from '../components/home/CallToAction'
import Marquee from '../components/Marquee'
import Reveal from '../components/Reveal'
import TextReveal from '../components/TextReveal'
import { ParallaxScrolling } from '../components/ui/parallax-scrolling'
import { WorksWheel, type WorksWheelItem } from '../components/ui/works-wheel'
import { categories, company, productHref, products } from '../data/site'

const range: WorksWheelItem[] = products
  .filter(p => p.image)
  .map(p => ({ title: p.name, image: p.image!, href: productHref(p), accent: p.accent, subtitle: p.tagline ?? p.category }))

export default function Home() {
  return (
    <>
      <Hero />

      <div className="border-y border-cream/10 bg-night py-6 font-display text-4xl text-cream sm:text-5xl">
        <Marquee items={[...categories.map(c => c.name), company.promise]} />
      </div>

      <ParallaxScrolling
        title={
          <div className="px-5 text-center">
            <p className="eyebrow justify-center">Our promise</p>
            <TextReveal as="h2" inView text={company.promise} className="mt-4 font-display text-[16vw] leading-[.85] text-ink sm:text-[12vw] lg:text-[10rem]" />
          </div>
        }
      >
        <Approach />
      </ParallaxScrolling>

      <section className="bg-ink pt-10 text-cream">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow !text-lime">02 · The range</p>
            <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[.95] sm:text-6xl lg:text-7xl">Every pack, <span className="italic text-lime">one turn at a time.</span></h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-cream/60">Keep scrolling to turn the wheel through the Krishivam range.</p>
          </Reveal>
        </div>
        <WorksWheel items={range} label="The Krishivam Range" action="View product" />
      </section>

      <CategoryStack />
      <InvictusRail />
      <Science />
      <Values />
      <CallToAction />
    </>
  )
}
