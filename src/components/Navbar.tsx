import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { categories } from '../data/site'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false); const [open, setOpen] = useState(false); const [productsOpen, setProductsOpen] = useState(false)
  const location = useLocation()
  useEffect(() => { const on = () => setScrolled(window.scrollY > 30); window.addEventListener('scroll', on); on(); return () => window.removeEventListener('scroll', on) }, [])
  useEffect(() => { setOpen(false); setProductsOpen(false) }, [location.pathname])
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? 'bg-white/95 shadow-sm backdrop-blur-xl' : 'bg-black/20 backdrop-blur-sm'}`}>
    <div className="container-page flex h-[78px] items-center justify-between gap-6">
      <Link to="/" aria-label="Krishivam home"><Logo compact /></Link>
      <nav className="hidden items-center gap-7 lg:flex">
        <Link className="text-sm font-medium" to="/">Home</Link>
        <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
          <button onClick={() => setProductsOpen(v => !v)} className="flex items-center gap-1 text-sm font-medium">Products <ChevronDown size={15} className={productsOpen ? 'rotate-180 transition' : 'transition'} /></button>
          <AnimatePresence>{productsOpen && <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:8}} className="absolute left-1/2 top-9 w-[720px] -translate-x-1/2 rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
            <div className="grid grid-cols-4 gap-5">{categories.map((c, i) => <div key={c.slug}><Link to={`/products/${c.slug}`} className="text-[11px] font-bold uppercase tracking-[.18em] text-forest">0{i+1} / {c.name}</Link><div className="mt-3 space-y-1.5">{c.products.map(p => { const product = p.toLowerCase().replaceAll(' ', '-'); return <Link key={p} to={`/products/${c.slug}/${product}`} className="block text-sm text-ink/70 transition hover:text-forest">{p}</Link> })}</div></div>)}</div>
          </motion.div>}</AnimatePresence>
        </div>
        <Link className="text-sm font-medium" to="/services">Services</Link><Link className="text-sm font-medium" to="/mission">Our Mission</Link><Link className="text-sm font-medium" to="/about">About Us</Link>
        <Link to="/contact" className="btn-primary px-5 py-2.5">Get in Touch <ArrowUpRight size={15}/></Link>
      </nav>
      <button aria-label={open ? 'Close menu' : 'Open menu'} className="rounded-full border border-ink/10 p-2 lg:hidden" onClick={() => setOpen(v => !v)}>{open ? <X/> : <Menu/>}</button>
    </div>
    <AnimatePresence>{open && <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="border-t border-ink/10 bg-white lg:hidden"><div className="container-page py-5">{[['Home','/'],['Services','/services'],['Our Mission','/mission'],['About Us','/about'],['Contact Us','/contact']].map(([label,to]) => <Link key={to} to={to} className="block border-b border-ink/5 py-3 text-base">{label}</Link>)}<button onClick={() => setProductsOpen(v=>!v)} className="flex w-full items-center justify-between py-3 text-base">Products <ChevronDown className={productsOpen?'rotate-180':''}/></button>{productsOpen && <div className="grid gap-4 pb-3 pl-3">{categories.map(c => <div key={c.slug}><Link to={`/products/${c.slug}`} className="text-xs font-bold uppercase tracking-widest text-forest">{c.name}</Link>{c.products.map(p => <Link key={p} to={`/products/${c.slug}/${p.toLowerCase().replaceAll(' ','-')}`} className="mt-1 block text-sm text-ink/65">{p}</Link>)}</div>)}</div>}<Link to="/contact" className="btn-primary mt-4 w-full">Get in Touch</Link></div></motion.div>}</AnimatePresence>
  </header>
}
