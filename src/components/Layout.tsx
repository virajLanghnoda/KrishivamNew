import type { ReactNode } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import InvertCursor from './InvertCursor'

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  return (
    <>
      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-lime" />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-night focus:px-4 focus:py-2 focus:text-cream">Skip to content</a>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main id="main" key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      <InvertCursor />
    </>
  )
}
