import { lazy, Suspense, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

const ShaderAnimation = lazy(() => import('./ui/shader-animation'))

export default function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section data-cursor="invert" className="relative isolate overflow-hidden bg-night pb-14 pt-32 text-cream sm:pb-20 sm:pt-40 lg:pb-28 lg:pt-48">
      {/* Same rings, strength and legibility shade as the home hero. */}
      <div className="absolute inset-0 -z-20">
        <Suspense fallback={null}><ShaderAnimation /></Suspense>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(90%_80%_at_15%_70%,rgba(7,19,13,.95),rgba(7,19,13,.55)_55%,rgba(7,19,13,.2))]" />
      <div className="container-page">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow !text-lime">{eyebrow}</motion.p>
        <TextReveal as="h1" text={title} delay={0.1} className="mt-5 max-w-5xl font-display text-[clamp(2.5rem,9.5vw,6.5rem)] leading-[.95]" />
        {children && (
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }} className="mt-7 max-w-2xl text-base leading-7 text-cream/65 sm:text-lg">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
