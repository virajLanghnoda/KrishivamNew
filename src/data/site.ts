export type Category = { slug: string; name: string; description: string; products: string[]; icon: string }
export type Product = { slug: string; name: string; category: string; categorySlug: string; positioning: string }

export const categories: Category[] = [
  { slug: 'organic-fertilizer', name: 'Organic Fertilizer', description: 'Natural-origin agricultural nutrition solutions.', products: ['Powerzone'], icon: 'sprout' },
  { slug: 'biostimulants', name: 'Biostimulants', description: 'Solutions focused on supporting modern crop management.', products: ['Ontop', 'Anthos'], icon: 'activity' },
  { slug: 'biofertilizer', name: 'Biofertilizer', description: 'Biological agricultural input solutions.', products: ['Mycosh'], icon: 'leaf' },
  { slug: 'speciality-liquid-fertilizer', name: 'Speciality Liquid Fertilizer', description: 'Specialized liquid nutrition solutions.', products: ['INVICTUS', 'VALHALLA', 'Ragnar', 'Oden'], icon: 'flask' },
]

export const products: Product[] = [
  { slug: 'powerzone', name: 'Powerzone', category: 'Organic Fertilizer', categorySlug: 'organic-fertilizer', positioning: 'A premium organic fertilizer solution for modern agricultural needs.' },
  { slug: 'ontop', name: 'Ontop', category: 'Biostimulants', categorySlug: 'biostimulants', positioning: 'A focused biostimulant solution designed for contemporary crop-management programs.' },
  { slug: 'anthos', name: 'Anthos', category: 'Biostimulants', categorySlug: 'biostimulants', positioning: 'A modern biostimulant positioned within Krishivam’s crop-input portfolio.' },
  { slug: 'mycosh', name: 'Mycosh', category: 'Biofertilizer', categorySlug: 'biofertilizer', positioning: 'A biological agricultural input solution within the Krishivam portfolio.' },
  { slug: 'invictus', name: 'INVICTUS', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer', positioning: 'A speciality liquid fertilizer solution for modern crop nutrition programs.' },
  { slug: 'valhalla', name: 'VALHALLA', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer', positioning: 'A premium speciality liquid fertilizer within the Krishivam range.' },
  { slug: 'ragnar', name: 'Ragnar', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer', positioning: 'A speciality liquid fertilizer solution developed for agricultural use.' },
  { slug: 'oden', name: 'Oden', category: 'Speciality Liquid Fertilizer', categorySlug: 'speciality-liquid-fertilizer', positioning: 'A modern liquid nutrition solution in the Krishivam product family.' },
]
