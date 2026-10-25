import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Compass, Factory, FlaskConical, Handshake, Leaf, Microscope, PackageCheck, ShieldCheck, Sprout, Target, Truck, Users } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import CategoryCard from '../components/CategoryCard'
import { DiaText } from '../components/ui/text-dia'
import { categories, company, products } from '../data/site'
import { details, filled } from '../data/details'
import mark from '../assets/mark.svg'
import { seoFor } from '../data/seo'
import { useSeo } from '../lib/useSeo'

/** Closing band shared by the three pages. */
function NextStep({ title, to, label }: { title: string; to: string; label: string }) {
  return (
    <section className="px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-forest px-6 py-16 text-cream sm:px-12 lg:py-24">
        <img src={mark} alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-8 -right-6 -z-10 h-[120%] w-auto opacity-[.08] brightness-0 invert" />
        <div className="container-page flex flex-col gap-8 !px-0 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-2xl font-serif text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
          <Link to={to} className="btn-lime w-fit">{label} <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

/* ───────────────────────────── Our Mission ───────────────────────────── */

const principles = [
  { icon: Microscope, title: 'Innovation', text: 'Keep learning, improving and building a portfolio ready for changing agricultural needs.' },
  { icon: ShieldCheck, title: 'Sustainability', text: 'Support responsible agricultural thinking and long-term stewardship of soil and natural resources.' },
  { icon: Handshake, title: 'Partnership', text: 'Build dependable relationships across the agricultural ecosystem.' },
  { icon: Users, title: 'Farmer-focused', text: 'Keep practical agricultural needs at the centre of product thinking.' },
]

export function Mission() {
  useSeo(seoFor('/mission'))
  return (
    <>
      <PageHero eyebrow="Our Mission" title="Growing better. Together.">A clear point of view on better agriculture, responsible farming and long-term agricultural growth.</PageHero>

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container-page grid gap-4 md:grid-cols-2">
          {[
            { icon: Compass, k: 'Our Vision', text: 'A future where agricultural inputs are approached with greater care, clarity and scientific intent.', cls: 'bg-night text-cream' },
            { icon: Target, k: 'Our Mission', text: 'Develop and supply thoughtful agricultural solutions aligned with modern farming needs.', cls: 'bg-forest text-cream' },
          ].map(({ icon: Icon, k, text, cls }, i) => (
            <Reveal key={k} delay={i * 0.08} className="h-full">
              <article className={`relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[2rem] p-8 sm:p-10 ${cls}`}>
                <img src={mark} alt="" aria-hidden="true" className="pointer-events-none absolute -right-10 -top-6 h-64 w-auto opacity-[.07] brightness-0 invert" />
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream/10 text-lime"><Icon size={22} strokeWidth={1.7} /></span>
                <h2 className="mt-auto pt-16 text-xs font-semibold uppercase tracking-[.24em] text-lime">{k}</h2>
                <p className="mt-4 font-serif text-3xl leading-[1.15] sm:text-4xl">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20 lg:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="eyebrow">Our values</p>
              <h2 className="section-title">Principles that shape the journey.</h2>
              <p className="mt-5 max-w-sm text-base leading-7 text-night/60">Four commitments behind every product we develop and every relationship we build.</p>
            </Reveal>
          </div>
          <ol className="space-y-4">
            {principles.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <li className="group flex gap-5 rounded-[1.75rem] bg-cream p-6 transition duration-500 hover:-translate-y-1 hover:shadow-soft sm:gap-7 sm:p-8">
                  <span className="font-display text-4xl font-extrabold leading-none text-night/15 transition group-hover:text-forest sm:text-5xl">0{i + 1}</span>
                  <div>
                    <div className="flex items-center gap-3"><Icon className="text-forest" size={22} strokeWidth={1.7} /><h3 className="text-2xl">{title}</h3></div>
                    <p className="mt-3 max-w-lg text-base leading-7 text-night/60">{text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-page text-center">
          <Reveal>
            <p className="eyebrow justify-center">The direction</p>
            <p className="mx-auto mt-6 max-w-4xl font-serif text-4xl leading-[1.1] text-night sm:text-5xl lg:text-6xl">Confident enough to innovate. <span className="text-forest">Grounded enough to stay useful.</span></p>
          </Reveal>
        </div>
      </section>

      <NextStep title="See the portfolio these principles produced." to="/products" label="Explore the portfolio" />
    </>
  )
}

/* ──────────────────────────────── About ──────────────────────────────── */

function AboutIntro() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div ref={ref} className="container-page grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
        <Reveal>
          <p className="eyebrow">Who we are</p>
          <h2 className="section-title">Modern agricultural inputs, thoughtfully made.</h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-night/65 sm:text-lg">
            <p>{company.name} works across fertilizer and crop-input categories including organic fertilizers, biostimulants, biofertilizers and speciality liquid fertilizers.</p>
            <p>Our brand philosophy combines agriculture, science, quality, sustainability and professionalism in one cohesive direction — so every pack is clear about what it contains and what it is for.</p>
            {details.history.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Reveal>
        <div className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[460px]">
          <div className="absolute inset-0 rounded-full bg-sand" />
          <div className="absolute inset-[12%] rounded-full border border-forest/20" />
          <motion.div style={{ y }} className="absolute inset-0 flex items-end justify-center pb-[14%]">
            {['powerzone', 'ontop', 'invictus'].map((s, i) => {
              const p = products.find(x => x.slug === s)!
              return <img key={s} src={p.image} alt={p.name} loading="lazy" className="w-auto object-contain drop-shadow-[0_24px_24px_rgba(7,19,13,.25)]" style={{ height: ['68%', '52%', '60%'][i], marginLeft: i ? '-10%' : 0, zIndex: [1, 3, 2][i] }} />
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export function About() {
  useSeo(seoFor('/about'))
  const facts = [
    ...(filled(details.foundedYear) ? [{ value: String(details.foundedYear), label: 'Founded' }] : []),
    { value: 'Ahmedabad', label: 'Headquartered in Gujarat' },
    { value: String(categories.length), label: 'Product categories' },
    { value: String(products.length), label: 'Product lines' },
    ...details.stats,
  ]
  const lists = [
    { show: filled(details.facilities), icon: Factory, title: 'Facilities', items: details.facilities },
    { show: filled(details.certifications), icon: BadgeCheck, title: 'Registrations & certifications', items: details.certifications },
  ].filter(l => l.show)

  return (
    <>
      <PageHero eyebrow="About Krishivam" title={company.name}>An agricultural input and fertilizer company focused on developing and supplying modern agricultural solutions.</PageHero>

      <div className="border-b border-night/10 bg-cream">
        {/* Phones: the city gets its own full-width row, the numbers sit in pairs below. */}
        <dl className={`container-page grid grid-cols-2 gap-px py-6 sm:py-10 ${['lg:grid-cols-1', 'lg:grid-cols-2', 'lg:grid-cols-3', 'lg:grid-cols-4'][Math.min(facts.length, 4) - 1]} lg:divide-x lg:divide-night/10`}>
          {facts.slice(0, 4).map((f, i) => (
            <Reveal key={f.label} delay={i * 0.05} className={`py-4 lg:px-8 lg:py-3 ${f.value === 'Ahmedabad' ? 'col-span-2 border-b border-night/10 lg:col-span-1 lg:border-b-0' : 'pr-3'}`}>
              <dd className="font-display text-[2rem] font-extrabold leading-none text-night sm:text-4xl">{f.value}</dd>
              <dt className="mt-2 text-[11px] font-semibold uppercase tracking-[.16em] text-night/50 sm:text-xs">{f.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>

      <AboutIntro />

      <section className="bg-night py-20 text-center text-cream lg:py-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow justify-center !text-lime">Our belief</p>
            <p className="mx-auto mt-6 max-w-4xl font-serif text-[2.6rem] leading-[1.1] sm:text-6xl lg:text-7xl">
              <span className="block">Nature’s strength.</span>
              <span className="block text-lime">Science’s <DiaText words={['promise.', 'precision.', 'progress.', 'care.']} className="italic" /></span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">What we do</p>
            <h2 className="section-title">A focused portfolio.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {categories.map((c, i) => <CategoryCard key={c.slug} category={c} index={i} />)}
          </div>
        </div>
      </section>

      {lists.length > 0 && (
        <section className="bg-sand py-16 sm:py-20 lg:py-28">
          <div className={`container-page grid gap-5 ${lists.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {lists.map(({ icon: Icon, title, items }) => (
              <Reveal key={title}>
                <div className="h-full rounded-[2rem] bg-cream p-8">
                  <Icon className="text-forest" strokeWidth={1.7} />
                  <h3 className="mt-6 text-2xl">{title}</h3>
                  <ul className="mt-5 space-y-3">{items.map(x => <li key={x} className="flex gap-3 text-night/70"><PackageCheck size={18} className="mt-0.5 shrink-0 text-forest" />{x}</li>)}</ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {filled(details.team) && (
        <section className="py-16 sm:py-20 lg:py-28">
          <div className="container-page">
            <Reveal><p className="eyebrow">Leadership</p><h2 className="section-title">The people behind Krishivam.</h2></Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {details.team.map(t => (
                <Reveal key={t.name}>
                  <div className="rounded-[1.75rem] border border-night/10 bg-white p-6">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-sand font-display text-xl font-extrabold text-forest">{t.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
                    <h3 className="mt-6 text-xl">{t.name}</h3>
                    <p className="mt-1 text-sm text-night/55">{t.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <NextStep title="Let’s talk about what your crops need." to="/contact" label="Contact Krishivam" />
    </>
  )
}

/* ─────────────────────────────── Services ─────────────────────────────── */

const services = [
  { icon: Sprout, title: 'Agricultural Product Solutions', lead: 'The right input for the crop in front of you.' },
  { icon: Truck, title: 'Dealer & Distributor Support', lead: 'Working alongside the partners who carry our range.' },
  { icon: Leaf, title: 'Crop Nutrition Guidance', lead: 'Matching nutrition to the stage your crop is at.' },
  { icon: FlaskConical, title: 'Product Knowledge & Technical Support', lead: 'Clear answers on what is in each pack and how to use it.' },
  { icon: Handshake, title: 'Customized Agricultural Solutions', lead: 'Conversations that start from your specific requirement.' },
]

export function Services() {
  useSeo(seoFor('/services'))
  return (
    <>
      <PageHero eyebrow="Services" title="Support for the agricultural journey.">Beyond the pack: the ways Krishivam works with farmers, dealers and partners.</PageHero>

      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container-page">
          <ol className="divide-y divide-night/10 border-y border-night/10">
            {services.map(({ icon: Icon, title, lead }, i) => {
              const text = details.services[title]
              return (
                <Reveal key={title} delay={0.03 * i}>
                  <li className="group grid gap-5 py-8 transition-colors sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 lg:py-10">
                    <span className="font-display text-5xl font-extrabold leading-none text-night/15 transition group-hover:text-forest lg:text-6xl">0{i + 1}</span>
                    <div>
                      <div className="flex items-center gap-3"><Icon size={22} strokeWidth={1.7} className="shrink-0 text-forest" /><h2 className="text-2xl sm:text-3xl">{title}</h2></div>
                      <p className="mt-2 text-base text-night/60 sm:text-lg">{lead}</p>
                      {filled(text) && <p className="mt-3 max-w-2xl text-base leading-7 text-night/70">{text}</p>}
                    </div>
                    <Link to="/contact" className="inline-flex w-fit items-center gap-2 rounded-full border border-night/15 px-5 py-2.5 font-display text-sm font-bold transition group-hover:border-forest group-hover:bg-forest group-hover:text-cream">Ask us <ArrowUpRight size={15} /></Link>
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20 lg:py-28">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Behind every service</p>
            <h2 className="section-title">A portfolio built to be explained.</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-night/60">Every Krishivam product states what it contains on the pack — which makes guidance straightforward and honest.</p>
            <Link to="/products" className="btn-primary mt-8">Browse products <ArrowUpRight size={15} /></Link>
          </Reveal>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Link to={`/products/${c.slug}`} className="group flex h-full min-h-[150px] flex-col justify-between rounded-[1.5rem] bg-cream p-5 transition hover:-translate-y-1 hover:shadow-soft">
                  <span className="text-xs font-semibold uppercase tracking-[.16em] text-forest">{c.products.length} {c.products.length === 1 ? 'product' : 'products'}</span>
                  <span className="flex items-end justify-between gap-2"><span className="font-display text-lg font-bold leading-tight sm:text-xl">{c.name}</span><ArrowUpRight size={18} className="shrink-0 transition group-hover:rotate-45" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <NextStep title="Have a requirement in mind? Tell us about it." to="/contact" label="Start a conversation" />
    </>
  )
}
