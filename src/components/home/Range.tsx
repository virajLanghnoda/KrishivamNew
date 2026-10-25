import Reveal from '../Reveal'
import { WorksWheel, type WorksWheelItem } from '../ui/works-wheel'
import { productHref, products } from '../../data/site'

const range: WorksWheelItem[] = products
  .filter(p => p.image)
  .map(p => ({ title: p.name, image: p.image!, href: productHref(p), subtitle: p.tagline ?? p.category }))

/** The product range on the Works Wheel. */
export default function Range() {
  return (
    <section data-cursor="invert" className="bg-night pt-10 text-cream">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow !text-lime">02 · The range</p>
          <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[.95] sm:text-6xl lg:text-7xl">Every pack, <span className="text-lime">one turn at a time.</span></h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-cream/60">Keep scrolling to turn the wheel through the Krishivam range.</p>
        </Reveal>
      </div>
      <WorksWheel items={range} label="Top Products" showLabel={false} action="View product" />
    </section>
  )
}
