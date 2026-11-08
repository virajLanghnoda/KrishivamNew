import { useLang } from '../lib/i18n'
import { TEMPLATES } from '../lib/translations'

/**
 * A sentence with a name in it, e.g. "Why {name}". Hindi and Gujarati put the
 * name in a different place, so each language has its own template; the name
 * itself always stays as written.
 */
export default function Fill({ text, name }: { text: string; name: string }) {
  const lang = useLang()
  const tpl = lang === 'en' ? text : TEMPLATES[text]?.[lang] ?? text
  const [before, after = ''] = tpl.split('{name}')
  return <span translate="no" className="notranslate">{before}<span>{name}</span>{after}</span>
}
