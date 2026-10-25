import { useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Check, Phone } from 'lucide-react'
import ProductVisual from '../components/ProductVisual'
import Reveal from '../components/Reveal'
import TextReveal from '../components/TextReveal'
import { company, findProduct, productHref, products } from '../data/site'
import NotFound from './NotFound'
import { notFoundSeo, productSeo } from '../data/seo'
import { useSeo } from '../lib/useSeo'

export default function Product() {
  const { categorySlug, productSlug } = useParams()
  const p = findProduct(categorySlug, productSlug)
  useSeo(p ? productSeo(p, p.image ? new URL(p.image, window.location.origin).href : undefined) : notFoundSeo)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const packY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const packRotate = useTransform(scrollYProgress, [0, 1], [0, -6])
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 1.25])
  if (!p) return <NotFound />
  const related = products.filter(x => x.categorySlug === p.categorySlug && x.slug !== p.slug).concat(products.filter(x => x.categorySlug !== p.categorySlug)).slice(0, 3)
  const maxShare = Math.max(...(p.composition?.map(c => c.value) ?? [1]))

  return (
    <>
      <section ref={heroRef} className="relative isolate overflow-hidden bg-night pb-16 pt-32 text-cream lg:min-h-[100svh] lg:pb-0 lg:pt-0">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(60% 60% at 72% 50%, rgba(27,107,58,.55), transparent 70%), radial-gradient(40% 40% at 10% 90%, rgba(197,232,108,.12), transparent 70%)` }} />
        <div className="container-page grid gap-10 lg:min-h-[100svh] lg:grid-cols-[1.05fr_.95fr] lg:items-center">
          <div className="lg:pt-24">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center gap-2 text-xs font-semibold text-cream/50">
              <Link to="/products" className="hover:text-cream">Products</Link><span>/</span>
              <Link to={`/products/${p.categorySlug}`} className="hover:text-cream">{p.category}</Link>
            </motion.div>
            <p className="eyebrow mt-8 !text-lime">{p.tagline ?? p.category}</p>
            <TextReveal as="h1" text={p.name} delay={0.1} className="notranslate mt-4 font-display text-[clamp(3.2rem,15vw,9rem)] leading-[.9]" />
            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="mt-7 max-w-xl text-lg leading-8 text-cream/65">{p.positioning}</motion.p>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }} className="mt-9 flex flex-wrap gap-3">
              <Link to={`/contact?product=${encodeURIComponent(p.name)}`} className="btn-lime">Enquire now <ArrowUpRight size={15} /></Link>
              <a href={`tel:${company.phone}`} className="btn-ghost-light"><Phone size={15} /> Call {company.phone}</a>
            </motion.div>
          </div>
          <div className="relative flex h-[420px] items-center justify-center sm:h-[520px] lg:h-[80svh]">
            <motion.div style={{ scale: ringScale }} className="absolute aspect-square w-[80%] max-w-[520px] rounded-full border border-cream/10" />
            <motion.div style={{ scale: ringScale }} className="absolute aspect-square w-[55%] max-w-[360px] rounded-full border border-lime/20" />
            <motion.div style={{ y: packY, rotate: packRotate }} initial={{ opacity: 0, y: 60, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="relative h-[85%] w-full">
              <ProductVisual product={p} eager className="h-full w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {(p.highlights || p.composition || p.description) && (
        <section className="py-20 lg:py-28">
          <div className="container-page grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <p className="eyebrow">Why <span translate="no" className="notranslate">{p.name}</span></p>
              <h2 className="section-title">Made to do one job well.</h2>
            </Reveal>
            <div>
              {p.description && <p className="mb-8 text-lg leading-8 text-night/65">{p.description}</p>}
              {p.crops && (
                <div className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-[.18em] text-night/45">Recommended crops</p>
                  <ul className="mt-3 flex flex-wrap gap-2">{p.crops.map(c => <li key={c} className="rounded-full bg-sand px-4 py-2 text-sm font-medium text-night/75">{c}</li>)}</ul>
                </div>
              )}
              {p.highlights && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {p.highlights.map((h, i) => (
                    <Reveal key={h} delay={i * 0.05}>
                      <div className="flex items-center gap-3 rounded-2xl border border-night/10 bg-white p-5">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime text-night"><Check size={16} strokeWidth={2.5} /></span>
                        <span className="text-sm font-semibold">{h}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              )}
              {p.composition && (
                <Reveal delay={0.1}>
                  <div className="mt-6 rounded-[2rem] bg-night p-7 text-cream sm:p-9">
                    <p className="text-[11px] font-bold uppercase tracking-[.22em] text-lime">Composition, as labelled</p>
                    <div className="mt-6 space-y-5">
                      {p.composition.map((c, i) => (
                        <div key={c.label}>
                          <div className="flex items-baseline justify-between"><span className="text-sm font-semibold text-cream/80">{c.label}</span><span className="font-display text-3xl font-extrabold">{c.value}%</span></div>
                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-cream/10">
                            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: Math.max(c.value / maxShare, 0.015) }} viewport={{ once: true }} transition={{ duration: 1.3, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }} className="h-full origin-left rounded-full bg-gradient-to-r from-forest to-lime" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {p.variants && (
        <section className="bg-sand py-20 lg:py-28">
          <div className="container-page">
            <Reveal>
              <p className="eyebrow">The <span translate="no" className="notranslate">{p.name}</span> family</p>
              <h2 className="section-title">Pick the formulation your crop needs.</h2>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {p.variants.map((v, i) => (
                <Reveal key={v.name + i} delay={(i % 4) * 0.05}>
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-cream p-6">
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-forest" />
                    <div className="flex h-60 items-center justify-center"><img src={v.image} alt={`${p.name} ${v.name}`} loading="lazy" className="h-full w-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,.18)] transition duration-700 group-hover:-translate-y-2" /></div>
                    <p className="mt-4 text-[10px] font-bold uppercase tracking-[.18em] text-night/45">{v.type}</p>
                    <h3 className="mt-1 font-display text-3xl font-bold leading-none text-night">{v.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-night/60">{v.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 lg:py-28">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <p className="eyebrow">Product information</p>
              <h2 className="section-title">At a glance.</h2>
              <p className="mt-5 max-w-sm leading-7 text-night/60">Full technical details, crop recommendations and dosage guidance are available from the Krishivam team on request.</p>
            </Reveal>
            <Reveal delay={0.08}>
              <dl className="divide-y divide-night/10 rounded-[2rem] border border-night/10 bg-white px-7">
                {[{ label: 'Category', value: p.category }, ...(p.tagline ? [{ label: 'Type', value: p.tagline }] : []), ...(p.specs ?? [])].map(s => (
                  <div key={s.label} className="grid gap-1 py-5 sm:grid-cols-[200px_1fr]">
                    <dt className="text-[11px] font-bold uppercase tracking-[.18em] text-night/40">{s.label}</dt>
                    <dd className="text-sm font-semibold text-night/80">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="mt-20 overflow-hidden rounded-[2.5rem] bg-forest p-8 text-cream sm:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="eyebrow !text-lime">Interested in this product?</p>
                <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">Let’s talk about <span translate="no" className="notranslate">{p.name}</span>.</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link className="btn-lime" to={`/contact?product=${encodeURIComponent(p.name)}`}>Enquire now <ArrowUpRight size={15} /></Link>
                <a className="btn-ghost-light" href={`tel:${company.phone}`}><Phone size={15} /> {company.phone}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20">
        <div className="container-page">
          <p className="eyebrow">You may also like</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map(r => (
              <Link key={r.slug} to={productHref(r)} className="group flex items-center gap-5 rounded-[1.75rem] bg-cream p-5 transition hover:-translate-y-1 hover:shadow-lift">
                <ProductVisual product={r} className="h-28 w-24 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.18em] text-forest">{r.category}</p>
                  <p className="mt-1 font-display text-3xl font-bold leading-none">{r.name}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold">View <ArrowUpRight size={13} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
