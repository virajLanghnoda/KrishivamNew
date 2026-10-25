import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { productByName, type Category } from '../data/site'
import Reveal from './Reveal'
import { cn } from '../lib/utils'
import { isDark, toneClasses } from '../lib/tone'

export default function CategoryCard({ category, index }: { category: Category; index: number }) {
  const dark = isDark(category.tone)
  const shots = category.products.map(productByName).filter(p => p?.image).slice(0, 2)
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <Link
        to={`/products/${category.slug}`}
        className={cn('group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[2rem] border p-6 sm:min-h-[340px] sm:p-7 transition duration-500 hover:-translate-y-1 hover:shadow-lift', toneClasses[category.tone])}
      >
        <div className="flex items-start justify-between">
          <span className={cn('font-display text-5xl font-extrabold leading-none', dark ? 'text-cream/30' : 'text-night/20')}>0{index + 1}</span>
          <span className={cn('grid h-11 w-11 place-items-center rounded-full transition duration-500 group-hover:rotate-45', dark ? 'bg-cream/10 group-hover:bg-lime group-hover:text-night' : 'bg-night/5 group-hover:bg-night group-hover:text-cream')}><ArrowUpRight size={18} /></span>
        </div>
        {/* Phones: packs in their own row under the number; wider: tucked bottom-right. */}
        <div className="pointer-events-none relative mt-2 flex h-44 items-end justify-center sm:absolute sm:bottom-0 sm:right-4 sm:mt-0 sm:h-[62%] sm:justify-end">
          {shots.map((p, k) => <img key={p!.slug} src={p!.image} alt="" loading="lazy" className="h-full w-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,.25)] transition duration-700 group-hover:-translate-y-2" style={{ height: `${100 - k * 14}%`, marginLeft: k ? '-14%' : 0 }} />)}
        </div>
        <div className="relative mt-auto pt-6 sm:max-w-[58%] sm:pt-24">
          <p className={cn('text-[10px] font-bold uppercase tracking-[.2em]', dark ? 'text-lime' : 'text-forest')}>{category.products.length} {category.products.length === 1 ? 'Product' : 'Products'}</p>
          <h3 className="mt-2 font-display text-4xl leading-none">{category.name}</h3>
          <p className={cn('mt-3 text-sm leading-6', dark ? 'text-cream/60' : 'text-night/60')}>{category.description}</p>
        </div>
      </Link>
    </Reveal>
  )
}
