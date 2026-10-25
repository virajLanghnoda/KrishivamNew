import { useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import CategoryCard from '../components/CategoryCard'
import ProductVisual from '../components/ProductVisual'
import Reveal from '../components/Reveal'
import { categories, productHref, products } from '../data/site'
import { cn } from '../lib/utils'
import { seoFor } from '../data/seo'
import { useSeo } from '../lib/useSeo'

export default function Products() {
  useSeo(seoFor('/products'))
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string | null>(null)
  const filtered = products.filter(p => (!cat || p.categorySlug === cat) && `${p.name} ${p.category} ${p.tagline ?? ''}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <>
      <PageHero eyebrow="Portfolio" title="Agricultural solutions, thoughtfully developed.">Explore Krishivam’s product architecture across four focused agricultural-input categories.</PageHero>

      <section className="py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Browse by category</p>
            <h2 className="section-title">A focused portfolio.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {categories.map((c, i) => <CategoryCard key={c.slug} category={c} index={i} />)}
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 lg:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Reveal>
              <p className="eyebrow">All products</p>
              <h2 className="section-title">Find the right product.</h2>
            </Reveal>
            <label className="flex w-full max-w-sm items-center gap-3 rounded-full border border-night/10 bg-cream px-5 py-3.5 text-sm focus-within:border-forest">
              <Search size={16} className="text-night/40" aria-hidden="true" />
              <span className="sr-only">Search products</span>
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search products" className="w-full bg-transparent outline-none placeholder:text-night/40" />
            </label>
          </div>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {[{ slug: null, name: 'All' }, ...categories].map(c => (
              <button key={c.name} type="button" aria-pressed={cat === c.slug} onClick={() => setCat(c.slug)} className={cn('min-h-[40px] cursor-pointer rounded-full px-4 text-sm font-semibold transition', cat === c.slug ? 'bg-night text-cream' : 'bg-cream text-night/70 hover:text-night')}>
                {c.name}
              </button>
            ))}
          </div>

          <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
                  <Link to={productHref(p)} className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream p-6 transition duration-500 hover:-translate-y-1 hover:shadow-lift">
                    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-sand">
                      <ProductVisual product={p} className="h-[88%] w-full transition duration-700 group-hover:-translate-y-2 group-hover:scale-[1.03]" />
                    </div>
                    <span className="mt-5 text-[10px] font-bold uppercase tracking-[.18em] text-forest">{p.category}</span>
                    <h3 className="mt-1 font-display text-3xl leading-none">{p.name}</h3>
                    {p.tagline && <p className="mt-2 text-sm text-night/55">{p.tagline}</p>}
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-bold">View product <ArrowUpRight size={13} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {!filtered.length && <p className="mt-10 text-night/60">No products match “{q}”. Try another name or category.</p>}
        </div>
      </section>
    </>
  )
}
