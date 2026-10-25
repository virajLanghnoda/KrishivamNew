/*
 * ════════════════════════════════════════════════════════════════════════════
 *   KRISHIVAM — DETAILS FOR YOU TO FILL IN
 * ════════════════════════════════════════════════════════════════════════════
 *
 *   This is the one file for company facts that only you can supply.
 *
 *   • Every field is optional. Leave it empty ('' or []) and the website simply
 *     hides that part — visitors never see a blank or a "[to be added]" note.
 *   • Fill a field in and it appears on the site automatically, in the right
 *     place and in the right style. Nothing else needs editing.
 *   • After editing, run `npm run build` (or push to GitHub and let Vercel build).
 *
 *   Product facts printed on the packs live in src/data/site.ts. Use
 *   `productDetails` below to add anything the packs don't say.
 * ════════════════════════════════════════════════════════════════════════════
 */

export type ProductExtra = {
  /** A paragraph or two describing the product. */
  description?: string
  /** Crops it is recommended for, e.g. ['Cotton', 'Groundnut', 'Vegetables']. */
  crops?: string[]
  /** Extra rows for the product's "At a glance" table. */
  specs?: { label: string; value: string }[]
  /** Benefit points, shown as ticks. Replaces the pack-derived list if given. */
  highlights?: string[]
}

export const details = {
  // ── Analytics ──────────────────────────────────────────────────────────────
  // Google Analytics 4 → Admin → Data streams → your web stream → Measurement ID.
  // Looks like 'G-ABC123XYZ9'. Leave empty and no analytics code is loaded.
  googleAnalyticsId: 'G-9HBHPKBVWH',

  // ── Website address ────────────────────────────────────────────────────────
  // The live domain, without a trailing slash. Used for SEO (canonical links,
  // sitemap, social share previews).
  siteUrl: 'https://krishivam.com',

  // ── Office address ─────────────────────────────────────────────────────────
  // The Floxi pack lists the registered office as:
  //   "Workflo GF-0?1, Mauryansh Elanza, Shyamal Cross Rd, Nr. Parekh Hospital,
  //    Satellite, Ahmedabad 380015, Gujarat"
  // The unit number is unclear on the pack, so it is not published yet. Confirm
  // it and paste the full line below.
  streetAddress: '',
  postalCode: '380015',
  // Google Maps → search the office → Share → Embed a map → copy only the
  // https://www.google.com/maps/embed?... link from inside src="...".
  mapEmbedUrl: '',
  // Office hours, e.g. 'Mon–Sat, 10:00–18:30'.
  hours: '',

  // ── Contact extras ─────────────────────────────────────────────────────────
  // WhatsApp number with country code and no spaces, e.g. '919924489348'.
  whatsapp: '',
  social: {
    instagram: '', // full profile URL
    facebook: '',
    linkedin: '',
    youtube: '',
  },

  // ── About page ─────────────────────────────────────────────────────────────
  // Year the company was founded, e.g. 2024. Shown as a fact on the About page.
  foundedYear: '',
  // Your story, one string per paragraph.
  history: [] as string[],
  // Manufacturing / storage / lab facilities, one line each.
  facilities: [] as string[],
  // Registrations, licences and certifications, e.g. 'FCO registered',
  // 'ISO 9001:2015', 'Bio-stimulant licence NO/IQ/QC-5/...'.
  certifications: [] as string[],
  // Leadership, e.g. { name: 'Full Name', role: 'Director' }.
  team: [] as { name: string; role: string }[],
  // Headline numbers, e.g. { value: '500+', label: 'Dealers across Gujarat' }.
  // Only add numbers you can stand behind.
  stats: [] as { value: string; label: string }[],

  // ── Services page ──────────────────────────────────────────────────────────
  // One description per service, keyed by its title. A service with no text
  // here still shows its title and icon.
  services: {
    'Agricultural Product Solutions': '',
    'Dealer & Distributor Support': '',
    'Crop Nutrition Guidance': '',
    'Product Knowledge & Technical Support': '',
    'Customized Agricultural Solutions': '',
  } as Record<string, string>,

  // ── Testimonials ───────────────────────────────────────────────────────────
  // Real words from real farmers or dealers, with their permission. The home
  // page shows a testimonial section only when at least one is added.
  testimonials: [] as { quote: string; name: string; place: string }[],

  // ── Coming soon ────────────────────────────────────────────────────────────
  // Products being launched next, e.g. { name: 'Product', note: 'Launching Kharif 2027' }.
  upcoming: [] as { name: string; note: string }[],

  // ── Extra product information ──────────────────────────────────────────────
  // Keyed by product slug: powerzone, mycosh, ontop, anthos, floxi, invictus,
  // valhalla, ragnar, oden. Anthos has no pack photo or details yet; the
  // photo goes in src/assets/products/ (see WEBSITE.md).
  productDetails: {
    // anthos: {
    //   description: '...',
    //   crops: ['...'],
    //   specs: [{ label: 'Dosage', value: '...' }],
    // },
  } as Record<string, ProductExtra>,
}

export const filled = (v: unknown) => (Array.isArray(v) ? v.length > 0 : typeof v === 'string' ? v.trim() !== '' : v != null)
