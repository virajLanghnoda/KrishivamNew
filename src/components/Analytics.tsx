import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { details } from '../data/details'
import { loaderDone } from '../lib/loader'

// Google Analytics 4, switched on by details.googleAnalyticsId. The tag loads
// only after the first screen is up, so it never competes with the page itself,
// and every route change is sent as its own page_view.
const ID = details.googleAnalyticsId.trim()
let started = false

function start() {
  if (started || !ID) return
  started = true
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
  if (ID && started) window.gtag?.('event', event, params)
}

export default function Analytics() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (!ID) return
    // A short wait lets the new page set its own <title> first.
    const send = () => {
      start()
      window.gtag?.('event', 'page_view', { page_path: pathname + search, page_location: window.location.href, page_title: document.title })
    }
    if (loaderDone()) {
      const t = window.setTimeout(send, 300)
      return () => window.clearTimeout(t)
    }
    window.addEventListener('kl:done', send, { once: true })
    return () => window.removeEventListener('kl:done', send)
  }, [pathname, search])

  return null
}
