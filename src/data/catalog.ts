/*
 * Plain catalogue data: company, categories and products, with no images.
 * Kept free of asset imports so the build (vite.config.ts) can read it too, to
 * write the sitemap and per-page SEO tags. Images are attached in site.ts.
 */
/** Which palette surface a category card sits on. */
export type Tone = 'white' | 'forest' | 'sand' | 'night'
export type Category = { slug: string; name: string; description: string; products: string[]; icon: string; tone: Tone }
export type Spec = { label: string; value: string }
export type Variant = { id: string; name: string; detail: string; type: string }
export type Product = {
  slug: string
  name: string
  category: string
  categorySlug: string
  positioning: string
  tagline?: string
  /** Longer description, from details.ts. */
  description?: string
  /** Recommended crops, from details.ts. */
  crops?: string[]
  /** Older URLs this product was reachable at. */
  aliases?: string[]
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
  email: 'krishivamagriscience@gmail.com',
  location: 'Satellite, Ahmedabad, Gujarat, India',
}

export const categories: Category[] = [
  { slug: 'organic-fertilizer', name: 'Organic Fertilizer', description: 'Natural-origin agricultural nutrition that builds soil health season after season.', products: ['Powerzone'], icon: 'sprout', tone: 'sand' },
  { slug: 'biofertilizer', name: 'Biofertilizer', description: 'Biological agricultural inputs for stronger roots and healthier plants.', products: ['Mycosh'], icon: 'leaf', tone: 'white' },
  { slug: 'biostimulants', name: 'Biostimulants', description: 'Solutions focused on supporting modern crop management, vigour and flowering.', products: ['Ontop', 'Anthos', 'Floxi'], icon: 'activity', tone: 'forest' },
  { slug: 'speciality-liquid-fertilizer', name: 'Speciality Liquid Fertilizer', description: 'Precisely formulated liquid nutrition - macro, secondary and micronutrients.', products: ['INVICTUS', 'VALHALLA', 'Ragnar', 'Oden'], icon: 'flask', tone: 'night' },
]

export const invictusVariants: Variant[] = [
  { id: 'npk', name: 'NPK 11:11:08', detail: 'Fortified with Zinc & Boron (suspension)', type: 'Liquid Fertilizer' },
  { id: 'np', name: 'NP 7-21-0', detail: 'Fortified NP liquid', type: 'Liquid Fertilizer' },
  { id: 'nk', name: 'NK 06:00:18', detail: 'Fortified with Calcium, Magnesium & Boron', type: 'Liquid Fertilizer' },
  { id: 'zinc', name: 'Zinc 39.5%', detail: 'Zinc oxide suspension concentrate', type: 'Micronutrient' },
  { id: 'calcium', name: 'Calcium 11%', detail: 'Concentrated liquid calcium, 100% water soluble', type: 'Liquid Fertilizer' },
  { id: 'boron', name: 'Boron Ethanolamine', detail: 'Micronutrient fertilizer', type: 'Micronutrient' },
  { id: 'boron-teal', name: 'Boron Ethanolamine', detail: 'Micronutrient fertilizer - teal edition', type: 'Micronutrient' },
]

export const products: Product[] = [
  {
    slug: 'powerzone', name: 'Powerzone', category: 'Organic Fertilizer', categorySlug: 'organic-fertilizer',
    positioning: 'A premium organic manure in granule form, made for soils that need to keep giving.',
    tagline: 'Organic Manure · Granules',
    highlights: ['Improves soil health', 'Enhances crop growth', 'Increases yield', 'Sustains soil fertility'],
    specs: [{ label: 'Type', value: 'Organic manure (granules)' }, { label: 'Certification mark', value: '100% organic' }, { label: 'Pack size', value: '20 kg' }],
  },
  {
    slug: 'mycosh', name: 'Mycosh', category: 'Biofertilizer', categorySlug: 'biofertilizer',
    positioning: 'A biological input for stronger roots and healthier plants, with an assured cell count.',
    tagline: 'Stronger Roots, Healthier Plant',
    highlights: ['Boosts root development', 'Faster plant recovery', '100% organic', 'Assured cell count'],
  },
  {
    slug: 'ontop', name: 'Ontop', category: 'Biostimulants', categorySlug: 'biostimulants',
    positioning: 'A premium triple-action biostimulant combining humic acid, seaweed and protein hydrolysate.',
    tagline: 'Premium Triple-Action Biostimulant',
    highlights: ['Triple-action formulation', 'Humic acid base', 'Seaweed enriched', 'Protein hydrolysate'],
    composition: [{ label: 'Humic acid', value: 50 }, { label: 'Seaweed', value: 30 }, { label: 'Protein hydrolysate', value: 20 }],
    specs: [{ label: 'Dosage (field)', value: '300-350 g per acre' }, { label: 'Dosage (spray)', value: '20-30 g per 15 L pump' }, { label: 'Pack size', value: '500 g' }],
  },
  {
    slug: 'anthos', name: 'Anthos', category: 'Biostimulants', categorySlug: 'biostimulants',
    positioning: 'A modern biostimulant positioned within Krishivam’s crop-input portfolio.',
  },
  {
    slug: 'floxi', name: 'Floxi', category: 'Biostimulants', categorySlug: 'biostimulants', aliases: ['floki'],
    positioning: 'A cytokinin-based floral enhancer that supports flower bud development, flowering and fruit formation.',
    tagline: 'Floral Enhancer',
    highlights: ['Reduces pre-harvest flower drop', 'Reduces pre-harvest fruit drop', 'Stimulates flower generation by about 20-30%', 'Provides additional energy for better yield', 'Fixes nutrient imbalance', 'Eco-friendly and cost-effective'],
    specs: [{ label: 'Active', value: 'Cytokinin (source: Zea mays kernel)' }, { label: 'Application', value: 'Foliar spray' }, { label: 'Dose', value: '1-1.5 ml per 1 L water' }, { label: 'Pack size', value: '15 ml' }],
  },
  {
    slug: 'invictus', name: 'INVICTUS', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer',
    positioning: 'One name, a family of precise liquid formulations - from balanced NPK to targeted micronutrients.',
    tagline: 'Speciality Liquid Fertilizer Range',
    highlights: ['NPK, NP and NK liquids', 'Calcium, Zinc and Boron', 'Suspension formulations', '100% water-soluble options'],
    variants: invictusVariants,
  },
  {
    slug: 'valhalla', name: 'VALHALLA', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer',
    positioning: 'A fortified calcium suspension enriched with zinc and boron.',
    tagline: 'Fortified Calcium Suspension',
    highlights: ['High calcium content', 'Zinc fortified', 'Boron fortified', 'Liquid suspension'],
    composition: [{ label: 'Calcium (Ca)', value: 21 }, { label: 'Zinc (Zn)', value: 1.5 }, { label: 'Boron (B)', value: 0.1 }],
    specs: [{ label: 'Type', value: 'Liquid fertilizer' }, { label: 'Pack size', value: '1 L' }],
  },
  {
    slug: 'ragnar', name: 'Ragnar', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer',
    positioning: 'Calcium nitrate fortified with magnesium, as a fully water-soluble suspension.',
    tagline: 'Calcium Nitrate + Magnesium',
    highlights: ['Calcium nitrate base', 'Fortified with magnesium', '100% water soluble', 'Liquid suspension'],
    specs: [{ label: 'Type', value: 'Mixture of liquid fertilizer' }, { label: 'Solubility', value: '100% water soluble' }],
  },
  {
    slug: 'oden', name: 'Oden', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer',
    positioning: 'A boron ethanolamine micronutrient fertilizer for targeted boron nutrition.',
    tagline: 'Boron Ethanolamine',
    highlights: ['Boron ethanolamine', 'Micronutrient fertilizer', 'Liquid formulation', 'Easy to apply'],
    specs: [{ label: 'Type', value: 'Micronutrient fertilizer' }, { label: 'Pack size', value: '1 L' }],
  },
]


export const values = [
  { title: 'Our Vision', text: 'A future where agricultural inputs are approached with greater care, clarity and scientific intent.' },
  { title: 'Our Mission', text: 'Develop and supply thoughtful agricultural solutions aligned with modern farming needs.' },
  { title: 'Innovation', text: 'Keep learning, improving and building a portfolio ready for changing agricultural needs.' },
  { title: 'Sustainability', text: 'Support responsible agricultural thinking and long-term stewardship of soil and natural resources.' },
  { title: 'Partnership', text: 'Build dependable relationships across the agricultural ecosystem.' },
  { title: 'Farmer-focused', text: 'Keep practical agricultural needs at the centre of product thinking.' },
]
