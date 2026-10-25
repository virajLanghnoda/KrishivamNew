import { useEffect } from 'react'
import { OG_IMAGE, SITE, type PageSeo } from '../data/seo'

function meta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

/** Keep the document head in step with the page on screen. */
export function useSeo(seo: PageSeo) {
  const { path, title, description, noindex, jsonLd } = seo
  const ld = JSON.stringify(jsonLd ?? [])

  useEffect(() => {
    const url = `${SITE}${path === '/' ? '/' : path}`
    document.title = title
    meta('name', 'description', description)
    meta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large')
    meta('property', 'og:title', title)
    meta('property', 'og:description', description)
    meta('property', 'og:url', url)
    meta('property', 'og:image', OG_IMAGE)
    meta('name', 'twitter:title', title)
    meta('name', 'twitter:description', description)

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    // Page-level structured data sits in its own tag; the organisation block in
    // index.html stays put.
    document.getElementById('page-jsonld')?.remove()
    const items = JSON.parse(ld) as unknown[]
    if (items.length) {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.id = 'page-jsonld'
      s.textContent = JSON.stringify(items.length === 1 ? items[0] : items)
      document.head.appendChild(s)
    }
  }, [path, title, description, noindex, ld])
}
