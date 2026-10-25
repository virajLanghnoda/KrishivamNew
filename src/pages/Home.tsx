import { lazy, Suspense, type ReactNode } from 'react'
import Hero from '../components/home/Hero'
import Marquee from '../components/Marquee'
import Deferred from '../components/Deferred'
import { categories, company } from '../data/site'
import { details } from '../data/details'
import { seoFor } from '../data/seo'
import { useSeo } from '../lib/useSeo'

// The page arrives in batches so a slow connection gets something useful first:
//   1. the loader and the hero (main bundle, no photos)
//   2. the parallax farm scene, as soon as the loader lifts
//   3. everything below, one section at a time, when the reader nears it or the
//      browser is idle - each with its own code chunk and lazy-loaded images.
const FarmScene = lazy(() => import('../components/home/FarmScene'))
const Range = lazy(() => import('../components/home/Range'))
const CategoryStack = lazy(() => import('../components/home/CategoryStack'))
const InvictusRail = lazy(() => import('../components/home/InvictusRail'))
const Values = lazy(() => import('../components/home/Values'))
const Testimonials = lazy(() => import('../components/home/Testimonials'))
const CallToAction = lazy(() => import('../components/home/CallToAction'))

function Batch({ order, minHeight, children }: { order: number; minHeight: string; children: ReactNode }) {
  return (
    <Deferred order={order} minHeight={minHeight}>
      <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>{children}</Suspense>
    </Deferred>
  )
}

export default function Home() {
  useSeo(seoFor('/'))
  return (
    <>
      <Hero />

      <div className="border-y border-cream/10 bg-night py-4 font-display text-lg font-bold text-cream/90 sm:text-xl">
        <Marquee items={[...categories.map(c => c.name), company.promise]} />
      </div>

      <Batch order={0} minHeight="230svh"><FarmScene /></Batch>
      <Batch order={1} minHeight="600svh"><Range /></Batch>
      <Batch order={2} minHeight="500svh"><CategoryStack /></Batch>
      <Batch order={3} minHeight="200svh"><InvictusRail /></Batch>
      <Batch order={4} minHeight="100svh"><Values /></Batch>
      {details.testimonials.length > 0 && <Batch order={5} minHeight="60svh"><Testimonials /></Batch>}
      <Batch order={5} minHeight="200svh"><CallToAction /></Batch>
    </>
  )
}
