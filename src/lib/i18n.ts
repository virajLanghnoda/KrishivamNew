import { useEffect, useState } from 'react'
import { DICT, PATTERNS } from './translations'
import { categories, invictusVariants, products } from '../data/catalog'

/*
 * English, Hindi and Gujarati, translated by hand.
 *
 * The site is written in English. Picking another language stores the choice in
 * localStorage, and a small translator swaps every piece of visible English text
 * (and placeholders, labels, alt text and the tab title) for its hand-written
 * Hindi or Gujarati version from translations.ts, as the page renders and changes.
 * Product names, formulation names, the brand, numbers, phone and email stay in
 * English. Anything without a translation also stays in English (in development
 * it is listed in `window.__klMissing`, so new copy is easy to spot and add).
 * Elements marked translate="no" are left alone; the header and menus use their
 * own labels through useT().
 */

export type Lang = 'en' | 'hi' | 'gu'

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'हि' },
  { code: 'gu', label: 'ગુજરાતી', short: 'ગુ' },
]

const KEY = 'kl-lang'
const EVENT = 'kl:lang'

/**
 * The device's own language (phone or browser settings, on iOS and Android alike).
 * Only Hindi and Gujarati are picked up; anything else, or nothing, means English.
 */
function detected(): Lang {
  try {
    const first = (navigator.languages?.[0] || navigator.language || '').toLowerCase()
    const base = first.split(/[-_]/)[0]
    return base === 'hi' || base === 'gu' ? base : 'en'
  } catch {
    return 'en'
  }
}

/** The visitor's own pick from the switcher, else the device language. */
function stored(): Lang {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'en' || v === 'hi' || v === 'gu') return v
  } catch { /* private mode: fall through to the device language */ }
  return detected()
}

export const currentLang = stored

// ── The translator ───────────────────────────────────────────────────────────

// Names that are never translated, so a label like "Biostimulants - Floxi" can be
// translated part by part.
const KEEP = new Set([
  'Krishivam', 'Krishivam Agriscience', 'Krishivam Agriscience Private Limited', 'Instagram', 'Facebook',
  ...products.map(p => p.name), ...invictusVariants.flatMap(v => [v.name, `INVICTUS ${v.name}`]),
])
// Emails and pack sizes ("20 kg", "1 L", "15 ml") read the same in every language.
const AS_IS = /@|^[\d.,\s-]+\s?(kg|g|L|ml)$/
const SEPARATORS = [' | ', ' · ', ' - ']
const ATTRS = ['placeholder', 'aria-label', 'title', 'alt'] as const
const SKIP = 'script,style,noscript,#kl,[translate="no"],.notranslate'

let lang: Lang = 'en'
const missing = new Set<string>()

function lookup(text: string, l: Exclude<Lang, 'en'>): string | undefined {
  const key = text.replace(/\s+/g, ' ').trim()
  const hit = DICT[key]
  if (hit) return hit[l]
  for (const [re, make] of PATTERNS) {
    const m = key.match(re)
    if (m) return make(m, l)
  }
  // A list of names: "Ontop, Anthos, Floxi"
  if (key.split(', ').every(p => KEEP.has(p))) return key
  // "Organic Fertilizer - Powerzone", "02 · The range", "Page | Krishivam Agriscience"
  for (const sep of SEPARATORS) {
    if (!key.includes(sep)) continue
    const parts = key.split(sep)
    const out = parts.map(p => (KEEP.has(p) || !/[A-Za-z]/.test(p) ? p : lookup(p, l)))
    if (out.every(Boolean) && out.some((o, i) => o !== parts[i])) return out.join(sep)
  }
  return undefined
}

function translate(text: string): string {
  if (lang === 'en' || !/[A-Za-z]/.test(text)) return text
  const out = lookup(text, lang)
  if (out !== undefined) {
    // Keep the node's own leading and trailing spaces.
    const lead = text.match(/^\s*/)![0]
    const trail = text.match(/\s*$/)![0]
    return lead + out + trail
  }
  const key = text.replace(/\s+/g, ' ').trim()
  if (import.meta.env.DEV && !KEEP.has(key) && !AS_IS.test(key) && !missing.has(key)) {
    missing.add(key)
    ;(window as Window & { __klMissing?: string[] }).__klMissing = [...missing]
  }
  return text
}

// The English each node or attribute had, and what it was last set to.
const textEn = new WeakMap<Text, string>()
const textOut = new WeakMap<Text, string>()
const attrEn = new WeakMap<Element, Record<string, string>>()
const attrOut = new WeakMap<Element, Record<string, string>>()

const skipped = (el: Element | null) => !el || !!el.closest(SKIP)

function doText(node: Text) {
  if (skipped(node.parentElement)) return
  const now = node.nodeValue ?? ''
  // A value we did not write is new English from React.
  if (textOut.get(node) !== now) textEn.set(node, now)
  const out = translate(textEn.get(node)!)
  textOut.set(node, out)
  if (out !== now) node.nodeValue = out
}

function doAttr(el: Element, name: string) {
  if (skipped(el)) return
  const now = el.getAttribute(name)
  if (now == null) return
  const en = attrEn.get(el) ?? {}
  const done = attrOut.get(el) ?? {}
  if (done[name] !== now) en[name] = now
  const out = translate(en[name])
  done[name] = out
  attrEn.set(el, en)
  attrOut.set(el, done)
  if (out !== now) el.setAttribute(name, out)
}

function doTree(root: Node) {
  if (root.nodeType === Node.TEXT_NODE) return doText(root as Text)
  if (root.nodeType !== Node.ELEMENT_NODE) return
  const el = root as Element
  if (skipped(el)) return
  for (const a of ATTRS) if (el.hasAttribute(a)) doAttr(el, a)
  el.querySelectorAll(ATTRS.map(a => `[${a}]`).join(',')).forEach(e => ATTRS.forEach(a => e.hasAttribute(a) && doAttr(e, a)))
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  for (let n = walk.nextNode(); n; n = walk.nextNode()) doText(n as Text)
}

let titleEn = ''
let titleOut = ''
function doTitle() {
  if (document.title !== titleOut) titleEn = document.title
  titleOut = translate(titleEn)
  if (document.title !== titleOut) document.title = titleOut
}

let watching = false
function watch() {
  if (watching) return
  watching = true
  new MutationObserver(records => {
    for (const r of records) {
      if (r.type === 'characterData') doText(r.target as Text)
      else if (r.type === 'attributes') doAttr(r.target as Element, r.attributeName!)
      else r.addedNodes.forEach(doTree)
    }
  }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...ATTRS] })
  new MutationObserver(doTitle).observe(document.head, { subtree: true, childList: true, characterData: true })
}

function apply(next: Lang) {
  lang = next
  document.documentElement.lang = next === 'en' ? 'en-IN' : `${next}-IN`
  doTree(document.body)
  doTitle()
  watch()
}

// Older visits may carry Google Translate's cookie from before; clear it so it
// can never kick in again.
function clearGoogleCookie() {
  const host = window.location.hostname
  for (const d of ['', `; domain=${host}`, host.includes('.') ? `; domain=.${host.split('.').slice(-2).join('.')}` : '']) {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`
  }
}

/** Switch language in place. */
export function setLang(next: Lang) {
  try { localStorage.setItem(KEY, next) } catch { /* private mode: lasts for this visit */ }
  apply(next)
  window.dispatchEvent(new Event(EVENT))
}

/** Apply the saved (or device) language on start-up (called once from main.tsx). */
export function initLang() {
  if (document.cookie.includes('googtrans')) clearGoogleCookie()
  apply(stored())
}

/** The language on screen; re-renders when it changes. */
export function useLang() {
  const [l, set] = useState<Lang>(stored)
  useEffect(() => {
    const on = () => set(stored())
    window.addEventListener(EVENT, on)
    return () => window.removeEventListener(EVENT, on)
  }, [])
  return l
}

// The header and menus are marked translate="no" and use these labels directly.
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
  ...Object.fromEntries(categories.map(c => [c.name, DICT[c.name]])),
}

/** Hand-translated labels for the header and menus. */
export function useT() {
  const l = useLang()
  return (text: string) => (l === 'en' ? text : UI[text]?.[l] ?? text)
}
