import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { loaderDone } from '../lib/loader'

const LenisContext = createContext<Lenis | null>(null)

/** The shared Lenis instance, or null when reduced motion keeps native scrolling. */
export const useLenis = () => useContext(LenisContext)

/** Scroll the page to a y position, through Lenis when it is running. */
export function scrollToY(lenis: Lenis | null, y: number, immediate = false) {
  // `force` still scrolls while Lenis is paused (e.g. the mobile menu is open).
  if (lenis) lenis.scrollTo(y, { immediate, duration: 1.1, force: true })
  else window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' })
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const { pathname } = useLocation()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, autoRaf: true })
    setLenis(instance)
    // Hold the page still while the loader is up.
    const release = () => instance.start()
    if (!loaderDone()) { instance.stop(); window.addEventListener('kl:done', release, { once: true }) }
    return () => { window.removeEventListener('kl:done', release); instance.destroy(); setLenis(null) }
  }, [])

  // A new route always starts at the top - once now, and again after the page
  // transition swaps the new page in (the old one fades out for 0.3 s first).
  useEffect(() => {
    scrollToY(lenis, 0, true)
    const t = window.setTimeout(() => { lenis?.resize(); scrollToY(lenis, 0, true) }, 340)
    return () => window.clearTimeout(t)
  }, [pathname, lenis])

  // Clicking a link to the page you are already on glides back to the top.
  useEffect(() => {
    const click = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.origin !== window.location.origin) return
      if (a.pathname === window.location.pathname && !a.hash) scrollToY(lenis, 0)
    }
    // Capture phase: read the current path before the router navigates.
    document.addEventListener('click', click, true)
    return () => document.removeEventListener('click', click, true)
  }, [lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
