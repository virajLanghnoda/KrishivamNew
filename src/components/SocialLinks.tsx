import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'
import { details, filled } from '../data/details'
import { cn } from '../lib/utils'

// The profiles filled in under details.social, in this order, each with its icon.
const NETWORKS = [
  { key: 'instagram', label: 'Instagram', handle: 'Follow us', icon: Instagram },
  { key: 'facebook', label: 'Facebook', handle: 'Like our page', icon: Facebook },
  { key: 'linkedin', label: 'LinkedIn', handle: 'Connect with us', icon: Linkedin },
  { key: 'youtube', label: 'YouTube', handle: 'Watch our videos', icon: Youtube },
] as const

export const socials = NETWORKS
  .filter(n => filled(details.social[n.key]))
  .map(n => ({ ...n, href: details.social[n.key] }))

/** A row of round icon buttons. `tone` picks colours for dark (footer) or light backgrounds. */
export default function SocialLinks({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  if (!socials.length) return null
  return (
    <ul className={cn('flex flex-wrap items-center gap-2.5', className)}>
      {socials.map(({ key, label, icon: Icon, href }) => (
        <li key={key}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Krishivam on ${label}`}
            title={label}
            className={cn(
              'grid h-11 w-11 place-items-center rounded-full border transition duration-300 hover:-translate-y-0.5',
              tone === 'dark'
                ? 'border-cream/15 bg-cream/[.04] text-cream/80 hover:border-lime hover:bg-lime hover:text-night'
                : 'border-night/10 bg-white text-forest hover:border-forest hover:bg-forest hover:text-cream',
            )}
          >
            <Icon size={18} strokeWidth={1.8} />
          </a>
        </li>
      ))}
    </ul>
  )
}
