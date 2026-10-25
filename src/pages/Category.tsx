import { Link, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import ProductVisual from '../components/ProductVisual'
import Reveal from '../components/Reveal'
import { categories, productHref, products } from '../data/site'
import NotFound from './NotFound'

export default function Category() {
  const { categorySlug } = useParams()
  const c = categories.find(x => x.slug === categorySlug)
  if (!c) return <NotFound />
  const items = products.filter(p => p.categorySlug === c.slug)
  const others = categories.filter(x => x.slug !== c.slug)

  return (
    <>
      <PageHero eyebrow={`Products · ${c.name}`} title={c.name}>{c.description}</PageHero>
      <section className="py-20 lg:py-28">
        <div className="container-page">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <p className="eyebrow">{items.length} {items.length === 1 ? 'product' : 'products'}</p>
              <h2 className="section-title">Explore the range.</h2>
            </Reveal>
            <Link to="/products" className="hidden items-center gap-2 text-sm font-bold text-forest sm:inline-flex">All products <ArrowUpRight size={15} /></Link>
          </div>
          <div className="mt-12 space-y-5">
            {items.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link to={productHref(p)} className="group grid overflow-hidden rounded-[2rem] border border-ink/10 bg-white transition duration-500 hover:shadow-lift md:grid-cols-[1.1fr_.9fr]">
                  <div className="flex flex-col p-8 sm:p-10">
                    <span className="font-display text-5xl leading-none text-ink/15">0{i + 1}</span>
                    <p className="mt-10 text-[11px] font-bold uppercase tracking-[.2em] text-forest">{p.tagline ?? c.name}</p>
                    <h3 className="mt-2 font-display text-5xl leading-none sm:text-6xl">{p.name}</h3>
                    <p className="mt-4 max-w-md leading-7 text-ink/60">{p.positioning}</p>
                    {p.highlights && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {p.highlights.map(h => <li key={h} className="rounded-full bg-mist px-3 py-1.5 text-xs font-semibold text-ink/70">{h}</li>)}
                      </ul>
                    )}
                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold">View product <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </div>
                  <div className="relative grid min-h-[320px] place-items-center p-8" style={{ background: `radial-gradient(70% 70% at 50% 55%, ${p.accent}40, ${p.accent}0d 70%)` }}>
                    <ProductVisual product={p} className="h-[300px] w-full transition duration-700 group-hover:-translate-y-2 group-hover:rotate-[-2deg]" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-sand py-20">
        <div className="container-page">
          <p className="eyebrow">Other categories</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {others.map(o => (
              <Link key={o.slug} to={`/products/${o.slug}`} className="group flex items-center justify-between rounded-2xl bg-cream px-6 py-5 transition hover:bg-ink hover:text-cream">
                <span className="font-display text-2xl">{o.name}</span><ArrowUpRight size={18} className="transition group-hover:rotate-45" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
