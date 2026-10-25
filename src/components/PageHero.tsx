import { lazy, Suspense, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

const ShaderAnimation = lazy(() => import('./ui/shader-animation'))

export default function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section data-cursor="invert" className="relative isolate overflow-hidden bg-night pb-14 pt-32 text-cream sm:pb-20 sm:pt-40 lg:pb-28 lg:pt-48">
      <div className="absolute inset-0 -z-10 opacity-60">
        <Suspense fallback={null}><ShaderAnimation quality={0.5} /></Suspense>
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_70%_at_20%_60%,rgba(7,19,13,.92),rgba(7,19,13,.55)_60%,rgba(7,19,13,.85))]" />
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
