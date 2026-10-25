import { useEffect, useState, type HTMLAttributes } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { useLang } from '../../lib/i18n'

// Adapted from 21st.dev's "Dia Text". Each word rises in through a blur, and a
// band of colour sweeps across it before it settles to the text colour. Uses
// framer-motion (already in the project) instead of the separate `motion`
// package, and a brand palette instead of the original blue/orange/pink.

export interface DiaTextProps extends HTMLAttributes<HTMLSpanElement> {
  words: string[]
  /** Time each word stays on screen, in ms. */
  duration?: number
  /** The colours that sweep across a word as it arrives. */
  colors?: string[]
}

export function DiaText({ words, duration = 2400, colors = ['#c5e86c', '#f3d57c', '#8fcf6a', '#f5f2ea'], className, ...props }: DiaTextProps) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const lang = useLang()
  // Translated pages keep the first word still, so Google translates one stable phrase.
  const still = reduce || lang !== 'en'

  useEffect(() => {
    if (still) return
    const id = window.setInterval(() => setIndex(i => (i + 1) % words.length), duration)
    return () => window.clearInterval(id)
  }, [words.length, duration, still])

  if (still) return <span className={className} {...props}>{words[0]}</span>

  return (
    <span className={cn('relative inline-block overflow-hidden align-bottom', className)} style={{ verticalAlign: 'bottom' }} {...props}>
      <span className="sr-only">{words.join(', ')}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          aria-hidden="true"
          initial={{ y: '100%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-100%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ y: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 }, filter: { duration: 0.25 } }}
          className="absolute inset-0 inline-block whitespace-nowrap"
        >
          <motion.span
            className="inline-block bg-clip-text pb-[0.12em]"
            style={{
              WebkitTextFillColor: 'transparent',
              backgroundImage: `linear-gradient(90deg, currentColor 50%, ${colors.join(', ')})`,
              backgroundSize: '250% 100%',
            }}
            initial={{ backgroundPosition: '100% 0%' }}
            animate={{ backgroundPosition: '0% 0%' }}
            transition={{ duration: 0.9, ease: 'easeInOut', delay: 0.1 }}
          >
            {words[index]}
          </motion.span>
        </motion.span>
      </AnimatePresence>
      {/* Holds the width of the current word so the line doesn't jump. */}
      <span className="invisible whitespace-nowrap pb-[0.12em]" aria-hidden="true">{words[index]}</span>
    </span>
  )
}

export default DiaText
