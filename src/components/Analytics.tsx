import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { details } from '../data/details'

// Google Analytics 4, switched on by details.googleAnalyticsId. Google's tag sits
// in index.html's <head> (so Google's setup check can find it) with automatic
// page views turned off; this component sends a page_view for every route,
// including menu navigation inside the site. If the head tag is ever removed,
// it loads the tag itself.
const ID = details.googleAnalyticsId.trim()

function ensureTag() {
  if (!ID || typeof window.gtag === 'function') return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', ID, { send_page_view: false })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`
  document.head.appendChild(s)
}

/** Report a custom event (e.g. an enquiry sent). Does nothing without an ID. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (ID) window.gtag?.('event', event, params)
}

export default function Analytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!ID) return
    ensureTag()
    // A short wait lets the new page set its own <title> first.
    const t = window.setTimeout(() => {
      window.gtag?.('event', 'page_view', { send_to: ID, page_path: pathname + search, page_location: window.location.href, page_title: document.title })
    }, 300)
    return () => window.clearTimeout(t)
  }, [pathname, search])

  return null
}
