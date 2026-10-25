import { Sprout } from 'lucide-react'
import type { Product } from '../data/site'
import { cn } from '../lib/utils'

/** The cut-out pack shot, or a typographic stand-in for products not yet photographed. */
export default function ProductVisual({ product, className, imgClassName, eager = false }: { product: Product; className?: string; imgClassName?: string; eager?: boolean }) {
  if (product.image) {
    return (
      <div className={cn('relative flex items-center justify-center', className)}>
        <img src={product.image} alt={`${product.name} — ${product.tagline ?? product.category}`} loading={eager ? 'eager' : 'lazy'} decoding="async" className={cn('h-auto max-h-full w-auto max-w-full object-contain drop-shadow-[0_30px_35px_rgba(7,19,13,.28)]', imgClassName)} />
      </div>
    )
  }
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <div className="relative grid aspect-[3/4] h-full max-w-full place-items-center overflow-hidden rounded-[2rem] border border-white/20 text-cream shadow-lift" style={{ background: `linear-gradient(160deg, ${product.accent}, #07130d)` }}>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/15" />
        <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full border border-white/10" />
        <div className="relative px-6 text-center">
          <Sprout className="mx-auto text-lime" size={34} strokeWidth={1.3} />
          <p className="mt-4 font-display text-4xl leading-none">{product.name}</p>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[.22em] text-cream/60">{product.tagline ?? product.category}</p>
        </div>
      </div>
    </div>
  )
}
