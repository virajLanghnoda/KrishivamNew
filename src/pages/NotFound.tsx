import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { notFoundSeo } from '../data/seo'
import { useSeo } from '../lib/useSeo'

export default function NotFound() {
  useSeo(notFoundSeo)
  return (
    <>
      <PageHero eyebrow="404 · Not found" title="This page has moved.">The page you’re looking for could not be found. Return to the Krishivam home page or explore the product portfolio.</PageHero>
      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/products" className="btn-secondary">Explore Products</Link>
        </div>
      </section>
    </>
  )
}
