import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { categories, productByName, productHref } from '../data/site'
import { useLenis } from './SmoothScroll'
import { cn } from '../lib/utils'

const links = [['Services', '/services'], ['Our Mission', '/mission'], ['About', '/about']] as const

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [mega, setMega] = useState(false)
  const location = useLocation()
  const lenis = useLenis()
  const { scrollY } = useScroll()

  // Turn solid once past the hero's top edge; tuck away while scrolling down.
  useMotionValueEvent(scrollY, 'change', y => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    setHidden(y > 400 && y > prev && !mega)
  })

  useEffect(() => { setOpen(false); setMega(false) }, [location.pathname])
  useEffect(() => {
    if (open) lenis?.stop(); else lenis?.start()
    document.documentElement.style.overflow = open ? 'hidden' : ''
  }, [open, lenis])

  const light = !solid && !open
  const navCls = ({ isActive }: { isActive: boolean }) => cn('relative text-sm font-semibold transition-colors', light ? 'text-cream/80 hover:text-cream' : 'text-ink/70 hover:text-ink', isActive && (light ? 'text-cream' : 'text-ink'))

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn('fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500', solid || open ? 'bg-cream/85 shadow-[0_1px_0_rgba(14,31,22,.08)] backdrop-blur-xl' : 'bg-transparent')}
    >
      <div className="container-page flex h-[76px] items-center justify-between gap-6">
        <Link to="/" aria-label="Krishivam home" className="shrink-0"><Logo light={light} className="h-11 sm:h-12" /></Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          <NavLink to="/" end className={navCls}>Home</NavLink>
          <div className="relative" onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
            <button type="button" aria-expanded={mega} onClick={() => setMega(v => !v)} className={cn('flex cursor-pointer items-center gap-1 text-sm font-semibold transition-colors', light ? 'text-cream/80 hover:text-cream' : 'text-ink/70 hover:text-ink')}>
              Products <ChevronDown size={15} className={cn('transition-transform', mega && 'rotate-180')} />
            </button>
            <AnimatePresence>
              {mega && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} transition={{ duration: 0.25 }} className="absolute left-1/2 top-full w-[820px] -translate-x-1/2 pt-5">
                  <div className="grid grid-cols-4 gap-2 rounded-3xl border border-ink/10 bg-cream p-3 shadow-lift">
                    {categories.map((c, i) => (
                      <div key={c.slug} className="rounded-2xl p-4 transition-colors hover:bg-white">
                        <Link to={`/products/${c.slug}`} className="text-[10px] font-bold uppercase tracking-[.2em] text-forest hover:text-ink">0{i + 1} · {c.name}</Link>
                        <div className="mt-3 space-y-1.5">
                          {c.products.map(name => {
                            const p = productByName(name)
                            return p ? (
                              <Link key={name} to={productHref(p)} className="group flex items-center gap-2 text-sm text-ink/70 transition hover:text-ink">
                                <span className="h-1.5 w-1.5 rounded-full transition group-hover:scale-150" style={{ background: p.accent }} />{p.name}
                              </Link>
                            ) : null
                          })}
                        </div>
                      </div>
                    ))}
                    <Link to="/products" className="col-span-4 mt-1 flex items-center justify-between rounded-2xl bg-ink px-5 py-3.5 text-sm font-semibold text-cream transition hover:bg-forest">
                      Explore the complete portfolio <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {links.map(([label, to]) => <NavLink key={to} to={to} className={navCls}>{label}</NavLink>)}
          <Link to="/contact" className={light ? 'btn-lime !min-h-0 !px-5 !py-2.5' : 'btn-primary !min-h-0 !px-5 !py-2.5'}>Get in Touch <ArrowUpRight size={15} /></Link>
        </nav>

        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} className={cn('grid h-11 w-11 cursor-pointer place-items-center rounded-full border transition lg:hidden', light ? 'border-cream/25 text-cream' : 'border-ink/15 text-ink')} onClick={() => setOpen(v => !v)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'calc(100svh - 76px)' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="overflow-y-auto border-t border-ink/10 bg-cream lg:hidden" data-lenis-prevent>
            <div className="container-page flex min-h-full flex-col py-6">
              {[['Home', '/'], ['Products', '/products'], ...links, ['Contact', '/contact']].map(([label, to], i) => (
                <motion.div key={to} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                  <Link to={to} className="flex items-center justify-between border-b border-ink/10 py-4 font-display text-4xl text-ink">{label}<ArrowUpRight size={20} className="text-ink/30" /></Link>
                </motion.div>
              ))}
              <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5">
                {categories.map(c => (
                  <div key={c.slug}>
                    <Link to={`/products/${c.slug}`} className="text-[10px] font-bold uppercase tracking-[.2em] text-forest">{c.name}</Link>
                    {c.products.map(name => { const p = productByName(name); return p ? <Link key={name} to={productHref(p)} className="mt-1.5 block text-sm text-ink/70">{p.name}</Link> : null })}
                  </div>
                ))}
              </div>
              <Link to="/contact" className="btn-primary mt-auto w-full">Get in Touch <ArrowUpRight size={15} /></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
