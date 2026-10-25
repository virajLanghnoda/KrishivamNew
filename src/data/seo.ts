/*
 * Titles, descriptions and structured data for every page.
 *
 * Read in two places: by the app (useSeo) to update the head as you navigate,
 * and by the build (vite.config.ts) to write a real HTML file per page plus the
 * sitemap - so search engines and link previews get the right tags without
 * running any JavaScript. Imports only plain data, never images.
 */
import { categories, company, products, type Category, type Product } from './catalog'
import { details } from './details'

export const SITE = details.siteUrl.replace(/\/$/, '')
export const BRAND = 'Krishivam Agriscience'
export const OG_IMAGE = `${SITE}/og-image.png`

export type PageSeo = {
  path: string
  title: string
  description: string
  noindex?: boolean
  jsonLd?: Record<string, unknown>[]
}

const crumbs = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE}${path}` })),
})

const page = (path: string, title: string, description: string, extra: Partial<PageSeo> = {}): PageSeo => ({ path, title, description, ...extra })

export const staticPages: PageSeo[] = [
  page('/', `${BRAND} | Organic Fertilizer, Biostimulant & Liquid Fertilizer Company in Ahmedabad`,
    `${company.name}, Ahmedabad, Gujarat — organic fertilizer, biostimulants, biofertilizer and speciality liquid fertilizers (NPK, calcium, zinc, boron) for healthier soils and stronger crops.`),
  page('/products', `Fertilizer & Biostimulant Products | ${BRAND}`,
    'Explore Krishivam’s portfolio: Powerzone organic manure, Mycosh biofertilizer, Ontop and Floxi biostimulants, and the INVICTUS, VALHALLA, Ragnar and Oden speciality liquid fertilizers.',
    { jsonLd: [crumbs([['Home', '/'], ['Products', '/products']])] }),
  page('/services', `Services for Farmers & Dealers | ${BRAND}`,
    'Agricultural product solutions, dealer and distributor support, crop nutrition guidance and technical support from Krishivam Agriscience, Ahmedabad.'),
  page('/mission', `Our Mission & Values | ${BRAND}`,
    'Krishivam’s vision, mission and values — innovation, sustainability, partnership and farmer-focused agricultural solutions.'),
  page('/about', `About Us | ${company.name}`,
    `${company.name} is an agricultural input and fertilizer company in Satellite, Ahmedabad, developing organic fertilizers, biostimulants, biofertilizers and speciality liquid fertilizers.`),
  page('/contact', `Contact Us | ${BRAND}, Ahmedabad`,
    `Contact Krishivam Agriscience for product and dealership enquiries. Call ${company.phone} or email ${company.email}. Satellite, Ahmedabad, Gujarat.`),
  page('/coming-soon', `New Products Coming Soon | ${BRAND}`, 'New agricultural solutions from Krishivam Agriscience, coming soon.'),
]

export function categorySeo(c: Category): PageSeo {
  const names = c.products.join(', ')
  return page(`/products/${c.slug}`, `${c.name} — ${names} | ${BRAND}`,
    `${c.description} Krishivam ${c.name.toLowerCase()} range: ${names}. Made for Indian farming by Krishivam Agriscience, Ahmedabad.`,
    { jsonLd: [crumbs([['Home', '/'], ['Products', '/products'], [c.name, `/products/${c.slug}`]])] })
}

export function productSeo(p: Product, image?: string): PageSeo {
  const path = `/products/${p.categorySlug}/${p.slug}`
  const kind = p.tagline ?? p.category
  return page(path, `${p.name} — ${kind} | ${BRAND}`, `${p.name} by Krishivam Agriscience: ${p.positioning}`, {
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: p.name,
        description: p.positioning,
        category: p.category,
        brand: { '@type': 'Brand', name: 'Krishivam' },
        manufacturer: { '@id': `${SITE}/#organization` },
        url: `${SITE}${path}`,
        ...(image ? { image } : {}),
      },
      crumbs([['Home', '/'], ['Products', '/products'], [p.category, `/products/${p.categorySlug}`], [p.name, path]]),
    ],
  })
}

/** Every indexable page, for the sitemap and the prerendered head tags. */
export const allPages = (): PageSeo[] => [...staticPages, ...categories.map(categorySeo), ...products.map(p => productSeo(p))]

export const notFoundSeo = page('/404', `Page not found | ${BRAND}`, 'The page you are looking for could not be found.', { noindex: true })

export const seoFor = (path: string) => staticPages.find(p => p.path === path)!
