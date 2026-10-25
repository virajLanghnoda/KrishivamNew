import { useEffect, useRef } from 'react'

/**
 * Over sections marked `data-cursor="invert"` a soft disc follows the pointer and
 * inverts whatever is beneath it (mix-blend-mode: difference). It swells over
 * headings and shrinks over links and buttons so the target stays readable.
 * Mouse and trackpad only: touch screens and reduced-motion visitors never see it.
 */
export default function InvertCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = ref.current
    if (!dot) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return

    let x = -100, y = -100, cx = x, cy = y, size = 0, goal = 0, frame = 0, running = false

    const loop = () => {
      cx += (x - cx) * 0.22
      cy += (y - cy) * 0.22
      size += (goal - size) * 0.18
      dot.style.transform = `translate3d(${cx - size / 2}px, ${cy - size / 2}px, 0)`
      dot.style.width = dot.style.height = `${size}px`
      if (Math.abs(x - cx) + Math.abs(y - cy) + Math.abs(goal - size) > 0.3) frame = requestAnimationFrame(loop)
      else running = false
    }
    const kick = () => { if (!running) { running = true; frame = requestAnimationFrame(loop) } }

    const aim = (target: Element | null) => {
      if (!target?.closest('[data-cursor="invert"]')) goal = 0
      else if (target.closest('a, button, input, textarea, select, [role="button"]')) goal = 34
      else if (target.closest('h1, h2, h3, [data-cursor-grow]')) goal = 132
      else goal = 76
      kick()
    }
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX
      y = e.clientY
      aim(e.target as Element | null)
    }
    // Scrolling moves the page under a still pointer, so look again.
    const scroll = () => { if (x >= 0) aim(document.elementFromPoint(x, y)) }
    const leave = () => { goal = 0; kick() }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('scroll', scroll, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', scroll)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] h-0 w-0 rounded-full bg-white mix-blend-difference will-change-transform" />
}
