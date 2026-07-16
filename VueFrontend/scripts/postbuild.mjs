import { access, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadRoomSummaryCatalog } from './lib/load-room-content.mjs'
import { buildSeoPages, toPageUrl, validateSeoPages } from './lib/seo-pages.mjs'
import { resolveBuildSiteUrl } from './lib/site-url.mjs'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, '..')
const distDir = resolve(rootDir, 'dist')
const roomCatalog = await loadRoomSummaryCatalog()
const production = process.argv.includes('--production')
const siteUrl = resolveBuildSiteUrl(process.env.VITE_SITE_URL, { production })
const pages = validateSeoPages(buildSeoPages(roomCatalog))

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${toPageUrl(siteUrl, page.path)}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

await mkdir(distDir, { recursive: true })
await Promise.all([
  access(resolve(distDir, '404.html')),
  writeFile(resolve(distDir, 'sitemap.xml'), sitemap),
  writeFile(resolve(distDir, 'robots.txt'), robots),
])
