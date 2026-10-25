import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Languages } from 'lucide-react'
import { LANGS, setLang, useLang, useT } from '../lib/i18n'
import { cn } from '../lib/utils'

/** Desktop: a compact pill that opens a three-language menu. */
export function LangMenu({ light }: { light: boolean }) {
  const lang = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = LANGS.find(l => l.code === lang)!

  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', close)
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', esc) }
  }, [open])

  return (
    <div ref={ref} className="relative notranslate" translate="no">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}`}
        onClick={() => setOpen(v => !v)}
        className={cn('flex h-10 cursor-pointer items-center gap-1.5 rounded-full border px-3 text-sm font-semibold transition', light ? 'border-cream/25 text-cream hover:border-cream/60' : 'border-night/15 text-night hover:border-night/40')}
      >
        <Languages size={15} strokeWidth={1.8} />
        <span>{current.short}</span>
        <ChevronDown size={14} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-[calc(100%+10px)] w-44 origin-top-right overflow-hidden rounded-2xl border border-night/10 bg-cream p-1.5 shadow-lift"
          >
            {LANGS.map(l => (
              <li key={l.code} role="option" aria-selected={l.code === lang}>
                <button
                  type="button"
                  onClick={() => { setOpen(false); if (l.code !== lang) setLang(l.code) }}
                  className={cn('flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition', l.code === lang ? 'bg-night text-cream' : 'text-night hover:bg-white')}
                >
                  <span className="font-semibold">{l.label}</span>
                  {l.code === lang ? <Check size={15} /> : <span className="text-xs text-night/40">{l.short}</span>}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Mobile menu: all three languages side by side, one tap each. */
export function LangTabs() {
  const lang = useLang()
  const t = useT()
  return (
    <div className="notranslate" translate="no">
      <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[.2em] text-night/45"><Languages size={14} /> {t('Language')}</p>
      <div role="radiogroup" aria-label="Language" className="mt-3 grid grid-cols-3 gap-1 rounded-full bg-night/5 p-1">
        {LANGS.map(l => (
          <button
            key={l.code}
            type="button"
            role="radio"
            aria-checked={l.code === lang}
            onClick={() => { if (l.code !== lang) setLang(l.code) }}
            className={cn('cursor-pointer rounded-full py-2.5 text-sm font-semibold transition', l.code === lang ? 'bg-night text-cream shadow-sm' : 'text-night/70')}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  )
}
