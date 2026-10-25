import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import { details } from '../data/details'
import Logo from './Logo'
import { categories, company, productHref, products } from '../data/site'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-night text-cream">
      <div className="container-page relative pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light className="h-16" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-cream/60">{company.tagline}<br />Science-driven agricultural solutions for modern farming needs.</p>
            <Link to="/contact" className="btn-lime mt-8">Start a conversation <ArrowUpRight size={15} /></Link>
            {Object.values(details.social).some(Boolean) && (
              <div className="mt-8 flex flex-wrap gap-2">
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
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[.24em] text-cream/40">Products</h3>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-cream/70">
              {products.map(p => <Link key={p.slug} to={productHref(p)} className="transition hover:text-lime">{p.name}</Link>)}
            </div>
            <div className="mt-8 space-y-3 border-t border-cream/10 pt-6 text-sm text-cream/70">
              <a href={`tel:${company.phone}`} className="flex items-center gap-2 transition hover:text-lime"><Phone size={15} /> {company.phone}</a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 break-all transition hover:text-lime"><Mail size={15} className="shrink-0" /> {company.email}</a>
              <p className="flex items-start gap-2"><MapPin size={15} className="mt-0.5 shrink-0" /> {company.location}</p>
            </div>
          </div>
        </div>
      </div>
      <p aria-hidden="true" className="pointer-events-none mt-16 select-none whitespace-nowrap text-center font-display text-[19vw] font-extrabold leading-[.8] text-cream/[.05]">Krishivam</p>
      <div className="container-page relative flex flex-col gap-3 border-t border-cream/10 py-6 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {company.name}. All Rights Reserved.</span>
        <span className="font-serif text-base italic text-cream/60">{company.promise}</span>
      </div>
    </footer>
  )
}
