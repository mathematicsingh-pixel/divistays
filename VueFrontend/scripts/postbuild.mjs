import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { roomCatalog } from '../src/features/rooms/index.js'
import { resolveSiteUrl } from '../src/features/site/config/site.js'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, '..')
const distDir = resolve(rootDir, 'dist')
const siteUrl = resolveSiteUrl(process.env.VITE_SITE_URL)
const pages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/rooms', changefreq: 'weekly', priority: '0.9' },
  ...roomCatalog.map((room) => ({
    path: room.detailsHref,
    changefreq: 'weekly',
    priority: room.available ? '0.85' : '0.7',
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${siteUrl}${page.path === '/' ? '/' : page.path}</loc>
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
  writeFile(resolve(distDir, 'sitemap.xml'), sitemap),
  writeFile(resolve(distDir, 'robots.txt'), robots),
])
