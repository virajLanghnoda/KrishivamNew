import { useEffect, useState } from 'react'

/*
 * English, Hindi and Gujarati through Google Translate.
 *
 * The site is written in English. Picking another language stores the choice in
 * localStorage, sets Google's `googtrans` cookie and loads Google's translate
 * script, which rewrites the page text in place. English visitors never download
 * the script. Brand and product names carry translate="no" so "Ontop" or
 * "INVICTUS" are never turned into ordinary words, and the word-by-word text
 * animations render as whole sentences when translated, so Google sees (and
 * translates) complete, meaningful sentences.
 */

export type Lang = 'en' | 'hi' | 'gu'

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'हि' },
  { code: 'gu', label: 'ગુજરાતી', short: 'ગુ' },
]

const KEY = 'kl-lang'
const EVENT = 'kl:lang'

function stored(): Lang {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'hi' || v === 'gu' ? v : 'en'
  } catch {
    return 'en'
  }
}

export const currentLang = stored

function setCookie(value: string | null) {
  const host = window.location.hostname
  const domains = ['', `; domain=${host}`, host.includes('.') ? `; domain=.${host.split('.').slice(-2).join('.')}` : '']
  for (const d of domains) {
    document.cookie = value ? `googtrans=${value}; path=/${d}` : `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`
  }
}

declare global {
  interface Window {
    google?: { translate?: { TranslateElement: new (opts: Record<string, unknown>, id: string) => unknown } }
    klTranslateInit?: () => void
  }
}

let loading = false

/** Load Google's translate script once; the cookie tells it which language to show. */
function loadGoogle() {
  if (loading) return
  loading = true
  let host = document.getElementById('google_translate_element')
  if (!host) {
    host = document.createElement('div')
    host.id = 'google_translate_element'
    host.setAttribute('aria-hidden', 'true')
    host.style.display = 'none'
    document.body.appendChild(host)
  }
  window.klTranslateInit = () => {
    const T = window.google?.translate?.TranslateElement
    if (T) new T({ pageLanguage: 'en', includedLanguages: 'en,hi,gu', autoDisplay: false }, 'google_translate_element')
  }
  const s = document.createElement('script')
  s.src = 'https://translate.google.com/translate_a/element.js?cb=klTranslateInit'
  s.async = true
  document.body.appendChild(s)
}

/** Switch language. Back to English reloads, which is the only clean way to undo Google's rewrite. */
export function setLang(lang: Lang) {
  const prev = stored()
  try { localStorage.setItem(KEY, lang) } catch { /* private mode: the cookie still carries it */ }
  document.documentElement.lang = lang === 'en' ? 'en-IN' : `${lang}-IN`
  if (lang === 'en') {
    setCookie(null)
    if (prev !== 'en') window.location.reload()
    return
  }
  setCookie(`/en/${lang}`)
  window.dispatchEvent(new Event(EVENT))
  // Already loaded: drive Google's own (hidden) language menu; otherwise load it.
  const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo')
  if (combo) {
    combo.value = lang
    combo.dispatchEvent(new Event('change'))
  } else {
    loadGoogle()
  }
}

/** Apply the saved language on start-up (called once from main.tsx). */
export function initLang() {
  const lang = stored()
  if (lang === 'en') { setCookie(null); return }
  document.documentElement.lang = `${lang}-IN`
  setCookie(`/en/${lang}`)
  loadGoogle()
}

/** The language on screen; re-renders when it changes. */
export function useLang() {
  const [lang, set] = useState<Lang>(stored)
  useEffect(() => {
    const on = () => set(stored())
    window.addEventListener(EVENT, on)
    return () => window.removeEventListener(EVENT, on)
  }, [])
  return lang
}

// Google translates short menu labels too literally ("Our Mission" comes back as
// "our special work"), so the site's own chrome uses these hand-written labels
// and is marked translate="no". Everything else is left to Google.
const UI: Record<string, { hi: string; gu: string }> = {
  'Home': { hi: 'होम', gu: 'હોમ' },
  'Products': { hi: 'उत्पाद', gu: 'ઉત્પાદનો' },
  'Services': { hi: 'सेवाएँ', gu: 'સેવાઓ' },
  'Our Mission': { hi: 'हमारा मिशन', gu: 'અમારું મિશન' },
  'About': { hi: 'हमारे बारे में', gu: 'અમારા વિશે' },
  'Contact': { hi: 'संपर्क', gu: 'સંપર્ક' },
  'Get in Touch': { hi: 'संपर्क करें', gu: 'સંપર્ક કરો' },
  'All products': { hi: 'सभी उत्पाद', gu: 'બધા ઉત્પાદનો' },
  'Explore the complete portfolio': { hi: 'पूरी उत्पाद श्रृंखला देखें', gu: 'સંપૂર્ણ ઉત્પાદન શ્રેણી જુઓ' },
  'or call': { hi: 'या कॉल करें', gu: 'અથવા કૉલ કરો' },
  'Language': { hi: 'भाषा', gu: 'ભાષા' },
  'Organic Fertilizer': { hi: 'जैविक उर्वरक', gu: 'સેન્દ્રિય ખાતર' },
  'Biofertilizer': { hi: 'जैव उर्वरक', gu: 'જૈવિક ખાતર' },
  'Biostimulants': { hi: 'बायोस्टिमुलेंट', gu: 'બાયોસ્ટિમ્યુલન્ટ' },
  'Speciality Liquid Fertilizer': { hi: 'विशेष तरल उर्वरक', gu: 'વિશેષ પ્રવાહી ખાતર' },
}

/** Hand-translated labels for the header and menus. */
export function useT() {
  const lang = useLang()
  return (text: string) => (lang === 'en' ? text : UI[text]?.[lang] ?? text)
}
