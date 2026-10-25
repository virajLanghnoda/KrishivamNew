import { Sprout } from 'lucide-react'
import { cn } from '../lib/utils'

/** An endless ticker. Pure CSS transform, so it never touches layout. */
export default function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span>{t}</span>
          <Sprout aria-hidden="true" size={16} strokeWidth={1.6} className="text-lime" />
        </span>
      ))}
    </div>
  )
  return (
    <div className={cn('overflow-hidden', className)} aria-label={items.join(', ')}>
      <div className="flex w-max animate-marquee will-change-transform motion-reduce:animate-none" aria-hidden="true">
        {row}
        {row}
      </div>
    </div>
  )
}
