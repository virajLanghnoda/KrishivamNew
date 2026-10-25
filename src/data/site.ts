import powerzone from '../assets/products/powerzone.webp'
import ontop from '../assets/products/ontop.webp'
import mycosh from '../assets/products/mycosh.webp'
import valhalla from '../assets/products/valhalla.webp'
import ragnar from '../assets/products/ragnar.webp'
import oden from '../assets/products/oden.webp'
import invictusBoron from '../assets/products/invictus-boron.webp'
import invictusBoronTeal from '../assets/products/invictus-boron-teal.webp'
import invictusNpk from '../assets/products/invictus-npk.webp'
import invictusNp from '../assets/products/invictus-np.webp'
import invictusNk from '../assets/products/invictus-nk.webp'
import invictusZinc from '../assets/products/invictus-zinc.webp'
import invictusCalcium from '../assets/products/invictus-calcium.webp'
import floxi from '../assets/products/floxi.webp'
import { details } from './details'
import * as catalog from './catalog'

export { company, categories, values } from './catalog'
export type { Tone, Category, Spec } from './catalog'
export type Variant = catalog.Variant & { image: string }
export type Product = Omit<catalog.Product, 'variants'> & { image?: string; variants?: Variant[] }

const productImages: Record<string, string> = { powerzone, mycosh, ontop, floxi, invictus: invictusNpk, valhalla, ragnar, oden }
const variantImages: Record<string, string> = {
  npk: invictusNpk, np: invictusNp, nk: invictusNk, zinc: invictusZinc, calcium: invictusCalcium, boron: invictusBoron, 'boron-teal': invictusBoronTeal,
}

export const invictusVariants: Variant[] = catalog.invictusVariants.map(v => ({ ...v, image: variantImages[v.id] }))

export const products: Product[] = catalog.products.map(p => ({
  ...p,
  image: productImages[p.slug],
  variants: p.variants?.map(v => ({ ...v, image: variantImages[v.id] })),
}))

// Anything added in details.ts → productDetails is merged over the pack facts.
for (const p of products) {
  const extra = details.productDetails[p.slug]
  if (!extra) continue
  if (extra.description) p.description = extra.description
  if (extra.crops?.length) p.crops = extra.crops
  if (extra.highlights?.length) p.highlights = extra.highlights
  if (extra.specs?.length) p.specs = [...(p.specs ?? []), ...extra.specs]
}

export const productHref = (p: { slug: string; categorySlug: string }) => `/products/${p.categorySlug}/${p.slug}`
export const productByName = (name: string) => products.find(p => p.name.toLowerCase() === name.toLowerCase())
export const findProduct = (categorySlug?: string, slug?: string) =>
  products.find(p => p.categorySlug === categorySlug && (p.slug === slug || (slug !== undefined && p.aliases?.includes(slug))))
