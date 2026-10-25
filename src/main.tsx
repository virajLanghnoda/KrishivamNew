import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import SmoothScroll from './components/SmoothScroll'
import Home from './pages/Home'

// Home ships in the main bundle; every other page loads on first visit.
const Products = lazy(() => import('./pages/Products'))
const Category = lazy(() => import('./pages/Category'))
const Product = lazy(() => import('./pages/Product'))
const Services = lazy(() => import('./pages/InfoPages').then(m => ({ default: m.Services })))
const Mission = lazy(() => import('./pages/InfoPages').then(m => ({ default: m.Mission })))
const About = lazy(() => import('./pages/InfoPages').then(m => ({ default: m.About })))
const Contact = lazy(() => import('./pages/Contact'))
const ComingSoon = lazy(() => import('./pages/ComingSoon'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <Layout>
          <Suspense fallback={<div className="min-h-[100svh] bg-night" />}>
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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
