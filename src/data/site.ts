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

export type Category = { slug: string; name: string; description: string; products: string[]; icon: string; accent: string; tone: 'light' | 'dark' }
export type Spec = { label: string; value: string }
export type Variant = { name: string; detail: string; type: string; image: string; accent: string }
export type Product = {
  slug: string
  name: string
  category: string
  categorySlug: string
  positioning: string
  tagline?: string
  image?: string
  accent: string
  highlights?: string[]
  specs?: Spec[]
  /** Share of each active, in percent, as printed on the pack. */
  composition?: { label: string; value: number }[]
  variants?: Variant[]
}

export const company = {
  name: 'Krishivam Agriscience Private Limited',
  short: 'Krishivam',
  tagline: 'Nurturing Nature. Enriching Lives.',
  promise: 'Cultivating Tomorrow',
  phone: '9924489348',
  location: 'Satellite, Ahmedabad, Gujarat, India',
}

export const categories: Category[] = [
  { slug: 'organic-fertilizer', name: 'Organic Fertilizer', description: 'Natural-origin agricultural nutrition that builds soil health season after season.', products: ['Powerzone'], icon: 'sprout', accent: '#2f5d2a', tone: 'light' },
  { slug: 'biostimulants', name: 'Biostimulants', description: 'Solutions focused on supporting modern crop management, vigour and flowering.', products: ['Ontop', 'Anthos', 'Floki'], icon: 'activity', accent: '#3b2a20', tone: 'dark' },
  { slug: 'biofertilizer', name: 'Biofertilizer', description: 'Biological agricultural inputs for stronger roots and healthier plants.', products: ['Mycosh'], icon: 'leaf', accent: '#6f7f3a', tone: 'light' },
  { slug: 'speciality-liquid-fertilizer', name: 'Speciality Liquid Fertilizer', description: 'Precisely formulated liquid nutrition — macro, secondary and micronutrients.', products: ['INVICTUS', 'VALHALLA', 'Ragnar', 'Oden'], icon: 'flask', accent: '#4a1430', tone: 'dark' },
]

export const invictusVariants: Variant[] = [
  { name: 'NPK 11:11:08', detail: 'Fortified with Zinc & Boron (suspension)', type: 'Liquid Fertilizer', image: invictusNpk, accent: '#c4511a' },
  { name: 'NP 7-21-0', detail: 'Fortified NP liquid', type: 'Liquid Fertilizer', image: invictusNp, accent: '#0f8a86' },
  { name: 'NK 06:00:18', detail: 'Fortified with Calcium, Magnesium & Boron', type: 'Liquid Fertilizer', image: invictusNk, accent: '#1d4f9c' },
  { name: 'Zinc 39.5%', detail: 'Zinc oxide suspension concentrate', type: 'Micronutrient', image: invictusZinc, accent: '#7aa62a' },
  { name: 'Calcium 11%', detail: 'Concentrated liquid calcium, 100% water soluble', type: 'Liquid Fertilizer', image: invictusCalcium, accent: '#c8135a' },
  { name: 'Boron Ethanolamine', detail: 'Micronutrient fertilizer', type: 'Micronutrient', image: invictusBoron, accent: '#9b1d6a' },
  { name: 'Boron Ethanolamine', detail: 'Micronutrient fertilizer — teal edition', type: 'Micronutrient', image: invictusBoronTeal, accent: '#1f7f7c' },
]

export const products: Product[] = [
  {
    slug: 'powerzone', name: 'Powerzone', category: 'Organic Fertilizer', categorySlug: 'organic-fertilizer',
    positioning: 'A premium organic manure in granule form, made for soils that need to keep giving.',
    tagline: 'Organic Manure · Granules', image: powerzone, accent: '#2f5d2a',
    highlights: ['Improves soil health', 'Enhances crop growth', 'Increases yield', 'Sustains soil fertility'],
    specs: [{ label: 'Type', value: 'Organic manure (granules)' }, { label: 'Certification mark', value: '100% organic' }, { label: 'Pack size', value: '20 kg' }],
  },
  {
    slug: 'ontop', name: 'Ontop', category: 'Biostimulants', categorySlug: 'biostimulants',
    positioning: 'A premium triple-action biostimulant combining humic acid, seaweed and protein hydrolysate.',
    tagline: 'Premium Triple-Action Biostimulant', image: ontop, accent: '#3b2a20',
    highlights: ['Triple-action formulation', 'Humic acid base', 'Seaweed enriched', 'Protein hydrolysate'],
    composition: [{ label: 'Humic acid', value: 50 }, { label: 'Seaweed', value: 30 }, { label: 'Protein hydrolysate', value: 20 }],
    specs: [{ label: 'Dosage (field)', value: '300–350 g per acre' }, { label: 'Dosage (spray)', value: '20–30 g per 15 L pump' }, { label: 'Pack size', value: '500 g' }],
  },
  {
    slug: 'anthos', name: 'Anthos', category: 'Biostimulants', categorySlug: 'biostimulants',
    positioning: 'A modern biostimulant positioned within Krishivam’s crop-input portfolio.', accent: '#7a4b2a',
  },
  {
    slug: 'floki', name: 'Floki', category: 'Biostimulants', categorySlug: 'biostimulants',
    positioning: 'A floral enhancer biostimulant for crops where flowering sets the harvest.', tagline: 'Floral Enhancer', accent: '#b0476f',
  },
  {
    slug: 'mycosh', name: 'Mycosh', category: 'Biofertilizer', categorySlug: 'biofertilizer',
    positioning: 'A biological input for stronger roots and healthier plants, with an assured cell count.',
    tagline: 'Stronger Roots, Healthier Plant', image: mycosh, accent: '#6f7f3a',
    highlights: ['Boosts root development', 'Faster plant recovery', '100% organic', 'Assured cell count'],
  },
  {
    slug: 'invictus', name: 'INVICTUS', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer',
    positioning: 'One name, a family of precise liquid formulations — from balanced NPK to targeted micronutrients.',
    tagline: 'Speciality Liquid Fertilizer Range', image: invictusNpk, accent: '#c4511a',
    highlights: ['NPK, NP and NK liquids', 'Calcium, Zinc and Boron', 'Suspension formulations', '100% water-soluble options'],
    variants: invictusVariants,
  },
  {
    slug: 'valhalla', name: 'VALHALLA', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer',
    positioning: 'A fortified calcium suspension enriched with zinc and boron.',
    tagline: 'Fortified Calcium Suspension', image: valhalla, accent: '#5b0f2e',
    highlights: ['High calcium content', 'Zinc fortified', 'Boron fortified', 'Liquid suspension'],
    composition: [{ label: 'Calcium (Ca)', value: 21 }, { label: 'Zinc (Zn)', value: 1.5 }, { label: 'Boron (B)', value: 0.1 }],
    specs: [{ label: 'Type', value: 'Liquid fertilizer' }, { label: 'Pack size', value: '1 L' }],
  },
  {
    slug: 'ragnar', name: 'Ragnar', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer',
    positioning: 'Calcium nitrate fortified with magnesium, as a fully water-soluble suspension.',
    tagline: 'Calcium Nitrate + Magnesium', image: ragnar, accent: '#6a5aa8',
    highlights: ['Calcium nitrate base', 'Fortified with magnesium', '100% water soluble', 'Liquid suspension'],
    specs: [{ label: 'Type', value: 'Mixture of liquid fertilizer' }, { label: 'Solubility', value: '100% water soluble' }],
  },
  {
    slug: 'oden', name: 'Oden', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer',
    positioning: 'A boron ethanolamine micronutrient fertilizer for targeted boron nutrition.',
    tagline: 'Boron Ethanolamine', image: oden, accent: '#8e1a5c',
    highlights: ['Boron ethanolamine', 'Micronutrient fertilizer', 'Liquid formulation', 'Easy to apply'],
    specs: [{ label: 'Type', value: 'Micronutrient fertilizer' }, { label: 'Pack size', value: '1 L' }],
  },
]

export const productHref = (p: Product) => `/products/${p.categorySlug}/${p.slug}`
export const productByName = (name: string) => products.find(p => p.name.toLowerCase() === name.toLowerCase())

export const values = [
  { title: 'Our Vision', text: 'A future where agricultural inputs are approached with greater care, clarity and scientific intent.' },
  { title: 'Our Mission', text: 'Develop and supply thoughtful agricultural solutions aligned with modern farming needs.' },
  { title: 'Innovation', text: 'Keep learning, improving and building a portfolio ready for changing agricultural needs.' },
  { title: 'Sustainability', text: 'Support responsible agricultural thinking and long-term stewardship of soil and natural resources.' },
  { title: 'Partnership', text: 'Build dependable relationships across the agricultural ecosystem.' },
  { title: 'Farmer-focused', text: 'Keep practical agricultural needs at the centre of product thinking.' },
]
