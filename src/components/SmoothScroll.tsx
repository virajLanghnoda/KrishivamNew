import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

const LenisContext = createContext<Lenis | null>(null)

/** The shared Lenis instance, or null when reduced motion keeps native scrolling. */
export const useLenis = () => useContext(LenisContext)

/** Scroll the page to a y position, through Lenis when it is running. */
export function scrollToY(lenis: Lenis | null, y: number, immediate = false) {
  if (lenis) lenis.scrollTo(y, { immediate, duration: 1.1 })
  else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' })
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: true })
    setLenis(instance)
    return () => { instance.destroy(); setLenis(null) }
  }, [])

  // A new route always starts at the top.
  useEffect(() => { scrollToY(lenis, 0, true) }, [pathname, lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
