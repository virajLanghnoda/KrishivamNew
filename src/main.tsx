import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource-variable/manrope'
import '@fontsource-variable/inter'
import '@fontsource/playfair-display/500.css'
import '@fontsource/playfair-display/500-italic.css'
import './index.css'
import Layout from './components/Layout'
import SmoothScroll from './components/SmoothScroll'
import PageLoader from './components/PageLoader'
import Analytics from './components/Analytics'
import { loaderDone } from './lib/loader'
import Home from './pages/Home'

// Home ships in the main bundle; every other page is its own small chunk. Once
// the first screen is up, the browser fetches them quietly in the background, so
// tapping a menu link later opens the page instantly - even on a slow line.
const pages = {
  products: () => import('./pages/Products'),
  category: () => import('./pages/Category'),
  product: () => import('./pages/Product'),
  info: () => import('./pages/InfoPages'),
  contact: () => import('./pages/Contact'),
  comingSoon: () => import('./pages/ComingSoon'),
  notFound: () => import('./pages/NotFound'),
}
const Products = lazy(pages.products)
const Category = lazy(pages.category)
const Product = lazy(pages.product)
const Services = lazy(() => pages.info().then(m => ({ default: m.Services })))
const Mission = lazy(() => pages.info().then(m => ({ default: m.Mission })))
const About = lazy(() => pages.info().then(m => ({ default: m.About })))
const Contact = lazy(pages.contact)
const ComingSoon = lazy(pages.comingSoon)
const NotFound = lazy(pages.notFound)

function prefetchPages() {
  const run = () => Object.values(pages).forEach(load => load().catch(() => {}))
  const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => void }).requestIdleCallback
  if (idle) idle(run); else setTimeout(run, 1500)
}
if (loaderDone()) prefetchPages(); else window.addEventListener('kl:done', prefetchPages, { once: true })

function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <SmoothScroll>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:categorySlug" element={<Category />} />
              <Route path="/products/:categorySlug/:productSlug" element={<Product />} />
              <Route path="/services" element={<Services />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </SmoothScroll>
    </BrowserRouter>
  )
}

// Batch 1 is in: the app has started. The loader lifts once the fonts are here
// too (or after a short wait, so a slow font never holds the page hostage).
window.__klStage?.(0.6)
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 3000))]).then(() => {
  window.__klStage?.(0.85)
  window.__klFinish?.()
})
