import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { categories, company, productByName, productHref } from '../data/site'
import { LangMenu, LangTabs } from './LangSwitch'
import { useT } from '../lib/i18n'
import { useLenis } from './SmoothScroll'
import { cn } from '../lib/utils'
import { loaderDone } from '../lib/loader'

const links = [['Services', '/services'], ['Our Mission', '/mission'], ['About', '/about']] as const
const mobileLinks = [['Home', '/'], ['Products', '/products'], ...links, ['Contact', '/contact']] as const

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const t = useT()
  const location = useLocation()
  const lenis = useLenis()
  const { scrollY } = useScroll()

  // Turn solid once past the hero's top edge; tuck away while scrolling down.
  useMotionValueEvent(scrollY, 'change', y => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setHidden(y > 400 && y > prev && !mega)
  })

  useEffect(() => { setOpen(false); setMega(false); setProductsOpen(false) }, [location.pathname])
  useEffect(() => {
    if (open) lenis?.stop(); else if (loaderDone()) lenis?.start()
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open, lenis])

  const light = !solid && !open
  const navCls = ({ isActive }: { isActive: boolean }) => cn('relative font-display text-sm font-semibold transition-colors', light ? 'text-cream/80 hover:text-cream' : 'text-night/70 hover:text-night', isActive && (light ? 'text-cream' : 'text-night'))

  return (
    <motion.header
      translate="no"
      initial={false}
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn('fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500', solid || open ? 'bg-cream/85 shadow-[0_1px_0_rgba(14,31,22,.08)] backdrop-blur-xl' : 'bg-transparent')}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Link to="/" aria-label="Krishivam home" className="shrink-0"><Logo light={light} className="h-11 sm:h-12" /></Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
          <NavLink to="/" end className={navCls}>{t('Home')}</NavLink>
          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button type="button" aria-expanded={mega} onClick={() => setMega(v => !v)} className={cn('flex cursor-pointer items-center gap-1 font-display text-sm font-semibold transition-colors', light ? 'text-cream/80 hover:text-cream' : 'text-night/70 hover:text-night')}>
              {t('Products')} <ChevronDown size={15} className={cn('transition-transform', mega && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {mega && (
                // Centred with Framer's own x: a Tailwind translate would be overwritten by
                // the animated transform and push the panel off the right edge. Tall
                // menus scroll inside the panel on short laptop screens.
                <motion.div style={{ x: '-50%' }} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.25 }} className="fixed left-1/2 top-[40px] w-[min(860px,calc(100vw-2rem))] pt-9">
                  <div data-lenis-prevent className="grid max-h-[calc(100svh-96px)] grid-cols-4 gap-2 overflow-y-auto overscroll-contain rounded-3xl border border-night/10 bg-cream p-3 shadow-lift">
                    {categories.map((c, i) => (
                      <div key={c.slug} className="rounded-2xl p-4 transition-colors hover:bg-white">
                        <Link to={`/products/${c.slug}`} className="text-[10px] font-bold uppercase tracking-[.2em] text-forest hover:text-night">0{i + 1} · {t(c.name)}</Link>
                        <div className="mt-3 space-y-1.5">
                          {c.products.map(name => {
                            const p = productByName(name)
                            return p ? (
                              <Link key={name} to={productHref(p)} className="group flex items-center gap-2 text-sm text-night/70 transition hover:text-night">
                                <span className="h-1.5 w-1.5 rounded-full bg-forest/40 transition group-hover:scale-150 group-hover:bg-forest" /><span translate="no" className="notranslate">{p.name}</span>
                              </Link>
                            ) : null
                          })}
                        </div>
                      </div>
                    ))}
                    <Link to="/products" className="col-span-4 mt-1 flex items-center justify-between rounded-2xl bg-night px-5 py-3.5 text-sm font-semibold text-cream transition hover:bg-forest">
                      {t('Explore the complete portfolio')} <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {links.map(([label, to]) => <NavLink key={to} to={to} className={navCls}>{t(label)}</NavLink>)}
          <LangMenu light={light} />
          <Link to="/contact" className={light ? 'btn-lime !min-h-0 !px-5 !py-2.5' : 'btn-primary !min-h-0 !px-5 !py-2.5'}>{t('Get in Touch')} <ArrowUpRight size={15} /></Link>
        </nav>

        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} className={cn('grid h-11 w-11 cursor-pointer place-items-center rounded-full border transition lg:hidden', light ? 'border-cream/25 text-cream' : 'border-night/15 text-night')} onClick={() => setOpen(v => !v)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100svh - 76px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-y-auto border-t border-night/10 bg-cream lg:hidden"
            data-lenis-prevent
            // Any link closes the menu - including one to the page already open,
            // which doesn't change the route and so wouldn't close it otherwise.
            onClick={e => { if ((e.target as Element).closest('a')) setOpen(false) }}
          >
            <nav className="container-page flex min-h-full flex-col pb-6 pt-3" aria-label="Mobile">
              {mobileLinks.map(([label, to], i) => (
                <motion.div key={to} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 + i * 0.035 }} className="border-b border-night/10">
                  {to === '/products' ? (
                    <>
                      <button type="button" aria-expanded={productsOpen} onClick={() => setProductsOpen(v => !v)} className="flex w-full cursor-pointer items-center justify-between py-3.5 font-display text-lg font-semibold text-night">
                        {t(label)}
                        <ChevronDown size={18} className={cn('text-night/40 transition-transform', productsOpen && 'rotate-180')} />
                      </button>
                      <AnimatePresence initial={false}>
                        {productsOpen && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                            <div className="space-y-4 pb-4">
                              {categories.map(c => (
                                <div key={c.slug}>
                                  <Link to={`/products/${c.slug}`} className="text-[11px] font-semibold uppercase tracking-[.18em] text-forest">{t(c.name)}</Link>
                                  <div className="mt-2 flex flex-wrap gap-1.5">
                                    {c.products.map(name => {
                                      const p = productByName(name)
                                      return p ? <Link key={name} to={productHref(p)} translate="no" className="notranslate rounded-full bg-night/5 px-3.5 py-2 text-sm font-medium text-night/80 active:bg-night active:text-cream">{p.name}</Link> : null
                                    })}
                                  </div>
                                </div>
                              ))}
                              <Link to="/products" className="flex items-center justify-between rounded-2xl bg-night px-4 py-3 text-sm font-semibold text-cream">{t('All products')} <ArrowUpRight size={16} /></Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink to={to} end={to === '/'} className={({ isActive }) => cn('flex items-center justify-between py-3.5 font-display text-lg font-semibold', isActive ? 'text-forest' : 'text-night')}>
                      {t(label)}<ArrowUpRight size={17} className="text-night/30" />
                    </NavLink>
                  )}
                </motion.div>
              ))}
              <div className="mt-6"><LangTabs /></div>
              <div className="mt-auto pt-8">
                <Link to="/contact" className="btn-primary w-full">{t('Get in Touch')} <ArrowUpRight size={15} /></Link>
                <a href={`tel:${company.phone}`} className="mt-3 block text-center text-sm text-night/55">{t('or call')} {company.phone}</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
