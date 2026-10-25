import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { details } from '../data/details'
import Logo from './Logo'
import { categories, company, productHref, products } from '../data/site'

export default function Footer() {
  return (
    <footer data-cursor="invert" className="relative overflow-hidden bg-night text-cream">
      <div className="container-page relative pt-16 lg:pt-24">
        {/* Phones: brand on top, then two columns. Wide: five columns, contact last. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.35fr_.8fr_1.05fr_1fr_1.3fr] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Logo light className="h-16" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-cream/60">{company.tagline}<br />Science-driven agricultural solutions for modern farming needs.</p>
            <Link to="/contact" className="btn-lime mt-7">Start a conversation <ArrowUpRight size={15} /></Link>
            {Object.values(details.social).some(Boolean) && (
              <div className="mt-7 flex flex-wrap gap-2">
                {Object.entries(details.social).filter(([, url]) => url).map(([name, url]) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer" className="rounded-full border border-cream/15 px-4 py-2 text-xs font-semibold capitalize text-cream/70 transition hover:border-lime hover:text-lime">{name}</a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[.24em] text-cream/40">Company</h3>
            <div className="mt-5 space-y-3 text-sm text-cream/70">
              {[['About Us', '/about'], ['Our Mission', '/mission'], ['Services', '/services'], ['Contact', '/contact']].map(([l, to]) => <Link key={to} className="block transition hover:text-lime" to={to}>{l}</Link>)}
            </div>
          </div>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[.24em] text-cream/40">Categories</h3>
            <div className="mt-5 space-y-3 text-sm text-cream/70">
              {categories.map(c => <Link key={c.slug} className="block transition hover:text-lime" to={`/products/${c.slug}`}>{c.name}</Link>)}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[11px] font-bold uppercase tracking-[.24em] text-cream/40">Products</h3>
            <div className="mt-5 grid grid-cols-3 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-cream/70">
              {products.map(p => <Link key={p.slug} to={productHref(p)} translate="no" className="notranslate transition hover:text-lime">{p.name}</Link>)}
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h3 className="text-[11px] font-bold uppercase tracking-[.24em] text-cream/40">Get in touch</h3>
            <div className="mt-5 space-y-4 text-sm text-cream/70">
              <a href={`tel:${company.phone}`} className="group flex items-center gap-3 transition hover:text-lime"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream/[.06] text-lime transition group-hover:bg-lime group-hover:text-night"><Phone size={15} /></span>{company.phone}</a>
              <a href={`mailto:${company.email}`} className="group flex items-center gap-3 transition hover:text-lime"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream/[.06] text-lime transition group-hover:bg-lime group-hover:text-night"><Mail size={15} /></span><span className="min-w-0 break-all">{company.email}</span></a>
              <p className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-cream/[.06] text-lime"><MapPin size={15} /></span>{company.location}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-page relative mt-14 flex flex-col gap-3 border-t border-cream/10 py-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {company.name}. All Rights Reserved.</span>
        <span className="font-serif text-base italic text-cream/60">{company.promise}</span>
      </div>
    </footer>
  )
}
