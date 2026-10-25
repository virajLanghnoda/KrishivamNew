import type { Tone } from '../data/site'

/** Surface, text and border classes for each category tone. */
export const toneClasses: Record<Tone, string> = {
  white: 'bg-white text-night border-night/10',
  forest: 'bg-forest text-cream border-cream/10',
  sand: 'bg-sand text-night border-night/10',
  night: 'bg-night text-cream border-cream/10',
}

export const isDark = (t: Tone) => t === 'forest' || t === 'night'
