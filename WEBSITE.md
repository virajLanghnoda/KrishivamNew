# Krishivam Agriscience — Website Guide

The website for **Krishivam Agriscience Private Limited** (https://krishivam.com): a fast, scroll-animated React site that presents the company and its fertilizer portfolio, collects enquiries by email, and is set up for search engines.

This guide covers what is on the site, where everything lives, how to change content, and how to deploy.

---

## Contents

1. [Quick start](#1-quick-start)
2. [What's on the site](#2-whats-on-the-site)
3. [Editing content](#3-editing-content)
4. [Adding or changing a product](#4-adding-or-changing-a-product)
5. [Enquiry form (free email delivery)](#5-enquiry-form-free-email-delivery)
6. [Google Analytics](#6-google-analytics)
7. [SEO](#7-seo)
8. [Loading on slow internet](#8-loading-on-slow-internet)
9. [Design system](#9-design-system)
10. [Project structure](#10-project-structure)
11. [Deploying on Vercel](#11-deploying-on-vercel)
12. [Checklist before going live](#12-checklist-before-going-live)

---

## 1. Quick start

Requirements: **Node.js 20.19+ or 22.12+** (24 LTS recommended).

```bash
npm install        # once
npm run dev        # local development at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

---

## 2. What's on the site

### Pages

| URL | Page | What it shows |
| --- | --- | --- |
| `/` | Home | Loader → hero → category ticker → farm parallax with tractor → approach statement → product wheel → category cards → INVICTUS range → values → contact panel |
| `/products` | Products | All four categories, plus a searchable, filterable list of every product |
| `/products/:category` | Category | The products in one category |
| `/products/:category/:product` | Product | Pack photo, positioning, benefits, composition, specifications, variants, related products |
| `/services` | Services | The five services, a portfolio band, call to action |
| `/mission` | Our Mission | Vision, mission, four values, brand statement |
| `/about` | About | Key facts, who we are, brand statement, portfolio; history, facilities, certifications and team appear once filled in |
| `/contact` | Contact | Phone, email, office, enquiry form; map, WhatsApp and hours appear once filled in |
| `/coming-soon` | Coming soon | Upcoming products (once filled in) |
| anything else | 404 | "This page has moved" with links home |

`/products/biostimulants/floki` (the old Floki link) still opens **Floxi**.

### Home page sections, in order

| # | Section | Built from |
| --- | --- | --- |
| — | Plant-growth loader | Inline in `index.html` |
| 1 | Hero (shader background, rotating brand seal) | `src/components/home/Hero.tsx`, `src/components/ui/shader-animation.tsx` |
| 2 | Category ticker | `src/components/Marquee.tsx` |
| 3 | Farm parallax + tractor + approach statement | `src/components/home/FarmScene.tsx`, `src/components/ui/parallax-scrolling.tsx`, `src/components/home/Approach.tsx` |
| 4 | Product wheel (scroll-driven, items rise from below) | `src/components/home/Range.tsx`, `src/components/ui/works-wheel.tsx` |
| 5 | Stacked category cards | `src/components/home/CategoryStack.tsx` |
| 6 | INVICTUS horizontal rail | `src/components/home/InvictusRail.tsx` |
| 7 | Values bento | `src/components/home/Values.tsx` |
| 8 | "Let's grow something together" panel | `src/components/home/CallToAction.tsx` |

Three components are adapted from 21st.dev: **Works Wheel** (crafterui), **Shader Animation** (designali-in) and **Parallax Scrolling** (osmosupply). Each file's header comment says what was changed and why.

---

## 3. Editing content

There are three data files. Change them, rebuild, done.

### `src/data/details.ts` — facts only you can supply

**This is the file to fill in.** Every field is optional: leave it empty and that part of the site stays hidden. Fill it in and it appears automatically. Nothing on the site ever shows "[to be added]".

| Field | Appears on |
| --- | --- |
| `googleAnalyticsId` | Turns on Google Analytics (see §6) |
| `siteUrl` | SEO: canonical links, sitemap, share previews |
| `streetAddress`, `postalCode`, `mapEmbedUrl`, `hours` | Contact page (address line, Google Map, hours) |
| `whatsapp`, `social.*` | Contact page and footer |
| `foundedYear`, `history`, `facilities`, `certifications`, `team`, `stats` | About page |
| `services` | A description under each service on the Services page |
| `testimonials` | A "In their words" quotes section on the home page, after the values |
| `upcoming` | Coming-soon page |
| `productDetails` | Extra description, crops, specs or benefits for any product (e.g. Anthos) |

The file comments explain each field. One note: the Floxi pack lists the registered office (Workflo, Mauryansh Elanza, Shyamal Cross Rd, Satellite, Ahmedabad 380015), but the unit number is unclear on the pack, so the street address is **not published** until you confirm it.

### `src/data/catalog.ts` — company and product text

- `company`: name, tagline, promise, phone (`9924489348`), email (`krishivamagriscience@gmail.com`), location.
- `categories`: order on the site, description, products in each, card colour (`tone`).
- `products`: everything printed on the packs: positioning, tagline, benefits, composition, specs.
- `invictusVariants`: the INVICTUS formulations.
- `values`: the six values on the home page.

This file has no image imports so the build can read it for SEO (see §7).

### `src/data/site.ts` — images

Connects each product (and INVICTUS variant) to its photo in `src/assets/products/`.

---

## 4. Adding or changing a product

1. **Photo**: save a cut-out pack shot (transparent background) as WebP, about 900 px tall, in `src/assets/products/`, e.g. `anthos.webp`. Keep each file under ~80 KB.
2. **Image link**: in `src/data/site.ts`, import it and add it to `productImages`:
   ```ts
   import anthos from '../assets/products/anthos.webp'
   const productImages = { ..., anthos }
   ```
3. **Text**: in `src/data/catalog.ts`, add or edit the product in `products` and list its name in the right category's `products` array.
4. Rebuild. The product appears on the home wheel (if it has a photo), in its category, in the menu, in the footer, in the contact form's product list, in the sitemap, and gets its own SEO page — automatically.

A product without a photo shows a branded name card instead.

---

## 5. Enquiry form (free email delivery)

The contact form sends enquiries to **krishivamagriscience@gmail.com** through **[FormSubmit](https://formsubmit.co)**:

- **Free, no account, no monthly limit, no server.** The form posts straight from the visitor's browser to FormSubmit, so it works the same on Vercel's free plan with no extra setup.
- **One-time activation:** the very first enquiry makes FormSubmit send an **"Activate Form"** email to krishivamagriscience@gmail.com. Click the link once. Until then, the visitor sees a polite "being activated" message with your phone and email.
- **What you receive:** a tidy table with name, mobile, email, product and message. Reply directly to the visitor when they gave an email.
- **Spam:** a hidden "honeypot" field silently drops bot submissions.
- **Validation:** name, a valid 10-digit Indian mobile, a valid email (optional) and a message are checked before sending, with clear inline errors.

**Optional — hide the email address in the code:** after activation, FormSubmit's activation email gives a random alias (like `a1b2c3d4e5...`). Replace the email in `ENDPOINT` in `src/pages/Contact.tsx` with that alias.

**If FormSubmit ever stops working**, [Web3Forms](https://web3forms.com) is a drop-in alternative (free plan, needs a free access key): change `ENDPOINT` and the field names in `src/pages/Contact.tsx`.

Product pages link to the form with that product pre-selected (`/contact?product=Floxi`).

---

## 6. Google Analytics

1. Create a GA4 property at https://analytics.google.com → Admin → Data streams → **Web** → enter `https://krishivam.com`.
2. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
3. Paste it into `googleAnalyticsId` in `src/data/details.ts` and redeploy.

What it does (`src/components/Analytics.tsx`):

- Loads Google's tag **only after the first screen is ready**, so it never slows slow connections.
- Sends a `page_view` for every page, including menu navigation inside the site.
- Sends a `generate_lead` event whenever an enquiry is sent (mark it as a **key event** in GA to count enquiries).

With no ID, no analytics code loads at all.

---

## 7. SEO

What's in place:

| What | Where |
| --- | --- |
| Unique title and description per page | `src/data/seo.ts` (one place for all pages) |
| A real HTML file per page (`mission.html`, `products/biostimulants/floxi.html`, …) with the right title, description, canonical URL, Open Graph and Twitter tags | Written at build time by the plugin in `vite.config.ts`, so Google and WhatsApp/Facebook previews work without JavaScript |
| `sitemap.xml` (every page, category and product) and `robots.txt` | Generated at build time; new products are added automatically |
| Structured data: Organization + LocalBusiness (with contact point and languages), WebSite, Product, ItemList (products page and each category), BreadcrumbList | `index.html` and `src/data/seo.ts` |
| Keywords meta | `index.html` |
| Share image (1200×630) | `public/og-image.png` |
| Favicon (SVG K mark), Apple touch icon, web manifest | `public/` |
| Readable fallback for browsers without JavaScript, with each page's own heading and summary | `<noscript>` in `index.html`, filled per page by `vite.config.ts` |
| Semantic headings, image alt text, `lang="en-IN"`, Gujarat geo tags | Throughout |

**Target keywords:** fertilizer company Ahmedabad, fertilizer manufacturer Gujarat, organic fertilizer, organic manure granules, biostimulant, humic acid seaweed biostimulant, biofertilizer, speciality liquid fertilizer, micronutrient fertilizer, boron ethanolamine, calcium nitrate with magnesium, zinc oxide suspension, NPK liquid fertilizer, floral enhancer, cytokinin, crop nutrition, soil health — plus every product and brand name.

**After the first deploy:**

1. Add the site to **Google Search Console** (https://search.google.com/search-console), verify the domain, and submit `https://krishivam.com/sitemap.xml`.
2. Create or claim a **Google Business Profile** for the Satellite, Ahmedabad office. For local searches ("fertilizer company near me") this matters more than anything on the site.
3. Fill in `streetAddress` in `details.ts` so the address is consistent everywhere.

---

## 8. Loading on slow internet

The site is built for weak connections. It loads in batches:

1. **Loader:** a dawn field scene built into `index.html` (no download needed). The sun rises, sprouts break the furrows and a wheat plant grows from a splitting seed to a ripe golden ear, with a stage label (Sowing → Sprouting → Growing strong → Ready to harvest). It always shows for at least 2.5 s, never looks stuck on a slow line, and lifts once the first screen is ready.
2. **First screen:** the hero, with no photos.
3. **Farm scene:** loads as soon as the loader lifts.
4. **Lower home sections:** each section is its own small file, loaded when the visitor gets near it or the browser is idle.
5. **Other pages:** fetched quietly in the background after the first screen, so menu links open instantly. If a page is still on its way, a small sprout shows instead of a blank screen.

Other measures: product photos are compressed cut-out WebPs (25–75 KB each) and load only when scrolled to. Fonts are self-hosted (no Google Fonts request). Animations pause when off-screen. Visitors who reduce motion in their phone settings get a still version. Vercel caches all hashed files for a year.

---

## 9. Design system

### Colours — six only

| Token | Hex | Use |
| --- | --- | --- |
| `night` | `#07130d` | Dark backgrounds, body text |
| `forest` | `#1b6b3a` | Brand green, accents on light |
| `lime` | `#c5e86c` | Highlights and primary buttons on dark |
| `cream` | `#f5f2ea` | Page background, text on dark |
| `sand` | `#ebe4d2` | Secondary light surfaces |
| white | `#ffffff` | Cards |

Everything else is one of these at an opacity. The only exception is the red used for form errors, which needs to be unmistakable. Defined in `tailwind.config.js`.

### Typography

| Element | Font | Weight |
| --- | --- | --- |
| Hero title, H1, numbers | Manrope | 800 |
| H2, H3, buttons, product names, footer headings | Manrope | 700 |
| H4, H5, navigation | Manrope | 600 |
| Body text, subtitles, descriptions | Inter | 400 |
| Specifications | Inter | 500 |
| Eyebrows, labels, tags | Inter | 600, uppercase |
| Brand statements ("Cultivating Tomorrow", "Nature's strength. Science's promise.", the approach statement) | Playfair Display | 500 |

Fonts are installed from npm (`@fontsource-variable/manrope`, `@fontsource-variable/inter`, `@fontsource/playfair-display`) and bundled with the site.

### Utility classes (`src/index.css`)

`container-page`, `eyebrow`, `section-title`, `btn-primary`, `btn-secondary`, `btn-lime`, `btn-ghost-light`.

### Responsive

Tested for horizontal overflow on every main page at 360, 390, 768, 1024, 1280 and 1920 px wide. Titles scale smoothly with the screen width; the product wheel switches to a phone layout below 768 px; the mega menu fits any desktop width.

---

## 10. Project structure

```
index.html                 Loader, SEO tags, structured data, noscript fallback
vite.config.ts             Build + SEO plugin (per-page HTML, sitemap, robots)
vercel.json                SPA routing + long-term asset caching
public/                    favicon.svg, apple-touch-icon.png, icon-512.png, og-image.png, site.webmanifest
src/
  main.tsx                 App entry: fonts, routes, page prefetching, loader hand-off
  index.css                Base styles, type scale, utility classes, keyframes
  data/
    details.ts             ← facts for you to fill in
    catalog.ts             Company, categories, products (text)
    site.ts                Product images + helpers
    seo.ts                 Titles, descriptions, structured data for every page
  lib/
    loader.ts              Loader state (has it lifted yet?)
    useSeo.ts              Keeps the page head in step with the route
    tone.ts                Card colour tones
    utils.ts               cn() class helper
  components/
    Layout, Navbar, Footer, Logo, PageHero, PageLoader, Reveal, TextReveal,
    Marquee, ProductVisual, CategoryCard, Deferred, SmoothScroll, Analytics
    home/                  Home page sections
    ui/                    Adapted 21st.dev components
  pages/                   Home, Products, Category, Product, InfoPages
                           (Services, Mission, About), Contact, ComingSoon, NotFound
  assets/                  logo.svg, logo-light.svg, mark.svg, products/*.webp
```

Key libraries: React 19, React Router 7, Framer Motion (animation), Lenis (smooth scrolling), Tailwind CSS 3, Lucide (icons).

---

## 11. Deploying on Vercel

1. Push the repository to GitHub.
2. In Vercel: **Add New → Project →** import the repository. Vercel detects Vite automatically (build `npm run build`, output `dist`).
3. Add the domain `krishivam.com` under **Settings → Domains**.
4. Every push to `main` redeploys automatically.

`vercel.json` serves the per-page HTML files at clean URLs (`cleanUrls`), sends unknown routes to the app (which shows the 404 page), and caches `/assets/*` for a year. No environment variables or server functions are needed — the enquiry form and analytics both work from the browser.

---

## 12. Checklist before going live

- [ ] Send one test enquiry and click **Activate Form** in the email FormSubmit sends to krishivamagriscience@gmail.com.
- [ ] Add the GA4 Measurement ID to `details.ts`.
- [ ] Confirm the office unit number and fill in `streetAddress` (and optionally `mapEmbedUrl`, `hours`, `whatsapp`, social links).
- [ ] Confirm Floxi's cytokinin content (the pack front says 0.2%, the composition table says 0.02%) — it is not shown on the site until confirmed.
- [ ] Add Anthos's photo and details.
- [ ] Fill in About details: history, founded year, certifications, team.
- [ ] Submit the sitemap in Google Search Console.
- [ ] Scroll through on a phone and a desktop browser once.
- [ ] Answer the questions in `PENDING-DETAILS.txt`.
