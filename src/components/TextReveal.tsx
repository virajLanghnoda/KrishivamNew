import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../lib/utils'
import { useLang } from '../lib/i18n'

/** Words slide up out of a mask, one after another. */
/** `play` holds the reveal back (e.g. until the loader lifts); `inView` waits for scroll instead. */
export default function TextReveal({ text, className, delay = 0, as: Tag = 'span', inView = false, play = true }: { text: string; className?: string; delay?: number; as?: 'span' | 'h1' | 'h2' | 'p'; inView?: boolean; play?: boolean }) {
  const reduce = useReducedMotion()
  // Translated, the sentence stays whole so Google translates it as one phrase.
  const lang = useLang()
  if (lang !== 'en') return <Tag className={cn('block', className)}>{text}</Tag>
  const words = text.split(' ')
  const trigger = inView ? { whileInView: 'show', viewport: { once: true, margin: '-60px' } } : { animate: play ? 'show' : 'hide' }
  return (
    <Tag className={cn('block', className)} aria-label={text}>
      <motion.span initial={reduce ? 'show' : 'hide'} {...trigger} transition={{ staggerChildren: 0.07, delayChildren: delay }} className="block" aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span className="inline-block" variants={{ hide: { y: '110%' }, show: { y: '0%' } }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              {w}{i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
