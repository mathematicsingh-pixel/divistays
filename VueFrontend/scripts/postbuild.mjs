import { access, mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadRoomSourceCatalog } from './lib/load-room-content.mjs'
import { buildSeoPages, toPageUrl, validateSeoPages } from './lib/seo-pages.mjs'
import { resolveBuildSiteUrl } from './lib/site-url.mjs'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, '..')
const distDir = resolve(rootDir, 'dist')
const roomCatalog = await loadRoomSourceCatalog()
const production = process.argv.includes('--production')
const siteUrl = resolveBuildSiteUrl(process.env.VITE_SITE_URL, { production })
const pages = validateSeoPages(buildSeoPages(roomCatalog))

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map((page) => `  <url>
    <loc>${escapeXml(toPageUrl(siteUrl, page.path))}</loc>
    <lastmod>${page.lastmod}</lastmod>${page.images.map((imagePath) => `
    <image:image>
      <image:loc>${escapeXml(toPageUrl(siteUrl, imagePath))}</image:loc>
    </image:image>`).join('')}
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
