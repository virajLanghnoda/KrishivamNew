import type { ReactNode } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
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
      {/* Each page fades in with a CSS animation. A JS exit-then-enter fade could
          stall at opacity 0 (a blank page) when the next page's code was still
          loading or a phone dropped frames mid-switch; CSS always finishes. */}
      <main id="main" key={location.pathname} className="animate-[page-in_.45s_cubic-bezier(.22,1,.36,1)_both]">
        {children}
      </main>
      <Footer />
      <InvertCursor />
    </>
  )
}
