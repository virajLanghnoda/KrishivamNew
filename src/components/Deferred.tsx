import { useEffect, useRef, useState, type ReactNode } from 'react'
import { loaderDone } from '../lib/loader'

/**
 * Batch 3 of the load: holds a below-the-fold section back until the reader is
 * within a couple of screens of it, or the browser is idle after the loader lifts
 * (staggered by `order`), whichever comes first. Pair with React.lazy so the
 * section's code and images only download when they are about to be needed.
 */
export default function Deferred({ children, minHeight = '100svh', order = 0 }: { children: ReactNode; minHeight?: string; order?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShow(true) }, { rootMargin: '200% 0px' })
    io.observe(el)

    let timer = 0
    const idle = () => { timer = window.setTimeout(() => setShow(true), 1200 + order * 900) }
    if (loaderDone()) idle(); else window.addEventListener('kl:done', idle, { once: true })
    return () => { io.disconnect(); clearTimeout(timer); window.removeEventListener('kl:done', idle) }
  }, [show, order])

  return show ? <>{children}</> : <div ref={ref} style={{ minHeight }} aria-hidden="true" />
}
