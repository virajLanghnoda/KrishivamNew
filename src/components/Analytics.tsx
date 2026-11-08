import { details } from '../data/details'

// Google tag container, switched on by details.googleTagId. The tag itself sits in
// index.html's <head> (so Google's setup check can find it), and the container's
// own settings count page views, including menu navigation inside the site. If the
// head tag is ever removed, this file loads it itself.
const ID = details.googleTagId.trim()

function ensureTag() {
  if (!ID || typeof window.gtag === 'function') return
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // gtag expects the arguments object itself, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.gtag('js', new Date())
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtm.js?id=${ID}`
  document.head.appendChild(s)
}

/** Report a custom event (e.g. an enquiry sent). Does nothing without an ID. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (!ID) return
  ensureTag()
  window.gtag?.('event', event, params)
}

export default function Analytics() {
  ensureTag()
  return null
}
