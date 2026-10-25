import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { allPages, OG_IMAGE, SITE, type PageSeo } from './src/data/seo'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** index.html with one page's title, description, canonical, social tags and structured data. */
function headFor(html: string, p: PageSeo) {
  const url = `${SITE}${p.path === '/' ? '/' : p.path}`
  const set = (re: RegExp, value: string) => { html = html.replace(re, `$1${esc(value)}$2`) }
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(p.title)}</title>`)
  set(/(<meta name="description" content=")[^"]*(")/, p.description)
  set(/(<link rel="canonical" href=")[^"]*(")/, url)
  set(/(<meta property="og:url" content=")[^"]*(")/, url)
  set(/(<meta property="og:title" content=")[^"]*(")/, p.title)
  set(/(<meta property="og:description" content=")[^"]*(")/, p.description)
  set(/(<meta property="og:image" content=")[^"]*(")/, OG_IMAGE)
  set(/(<meta name="twitter:title" content=")[^"]*(")/, p.title)
  set(/(<meta name="twitter:description" content=")[^"]*(")/, p.description)
  if (p.jsonLd?.length) {
    const ld = JSON.stringify(p.jsonLd.length === 1 ? p.jsonLd[0] : p.jsonLd).replace(/</g, '\\u003c')
    html = html.replace('</head>', `    <script type="application/ld+json" id="page-jsonld">${ld}</script>\n  </head>`)
  }
  return html
}

/**
 * After the build: give every page its own HTML file with the right head tags
 * (so Google and WhatsApp/Facebook previews see them without JavaScript), and
 * write sitemap.xml and robots.txt. Pages, products and categories come from
 * src/data, so a new product is picked up automatically.
 */
function seoPages(): Plugin {
  let outDir = 'dist'
  return {
    name: 'krishivam-seo-pages',
    apply: 'build',
    configResolved(c) { outDir = resolve(c.root, c.build.outDir) },
    closeBundle() {
      const template = readFileSync(resolve(outDir, 'index.html'), 'utf8')
      const pages = allPages()
      for (const p of pages) {
        // /mission → mission.html; vercel.json's cleanUrls serves it at /mission.
        const file = p.path === '/' ? resolve(outDir, 'index.html') : resolve(outDir, `.${p.path}.html`)
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, headFor(template, p))
      }
      const today = new Date().toISOString().slice(0, 10)
      const urls = pages.filter(p => !p.noindex).map(p => {
        const depth = p.path === '/' ? 0 : p.path.split('/').length - 1
        return `  <url><loc>${SITE}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod><priority>${(1 - depth * 0.2).toFixed(1)}</priority></url>`
      })
      writeFileSync(resolve(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
      writeFileSync(resolve(outDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
    },
  }
}

export default defineConfig({ plugins: [react(), seoPages()] })
