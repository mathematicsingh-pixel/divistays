import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadRoomSummaryCatalog } from './lib/load-room-content.mjs'
import {
  buildSeoPages,
  toHtmlFile,
  toPageUrl,
  validateSeoPages,
} from './lib/seo-pages.mjs'
import { resolveBuildSiteUrl } from './lib/site-url.mjs'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, '..')
const distDir = resolve(rootDir, 'dist')
const production = process.argv.includes('--production')
const siteUrl = resolveBuildSiteUrl(process.env.VITE_SITE_URL, { production })
const roomCatalog = await loadRoomSummaryCatalog()
const pages = validateSeoPages(buildSeoPages(roomCatalog))

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=(['"])(.*?)\\1`, 'i'))

  return match?.[2]
}

function getTags(markup, tagName) {
  return markup.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || []
}

function getCanonical(markup) {
  const canonicalTags = getTags(markup, 'link')
    .filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('canonical'))

  assert(canonicalTags.length === 1, `Expected one canonical link, found ${canonicalTags.length}.`)

  return getAttribute(canonicalTags[0], 'href')
}

function getMetaContent(markup, attribute, value) {
  const tag = getTags(markup, 'meta')
    .find((candidate) => getAttribute(candidate, attribute)?.toLowerCase() === value.toLowerCase())

  return tag ? getAttribute(tag, 'content') : undefined
}

function assertNoPlaceholders(value, label) {
  assert(!value.includes('.example'), `${label} contains a reserved .example URL.`)
  assert(!value.includes('undefined'), `${label} contains "undefined".`)
}

for (const page of pages) {
  const file = toHtmlFile(page.path)
  const markup = await readFile(resolve(distDir, file), 'utf8')
  const expectedCanonical = toPageUrl(siteUrl, page.path)
  const canonical = getCanonical(markup)
  const ogImage = getMetaContent(markup, 'property', 'og:image')

  assert(canonical === expectedCanonical, `${file} canonical is ${canonical}; expected ${expectedCanonical}.`)
  assert(Boolean(ogImage), `${file} is missing an Open Graph image.`)
  assert(new URL(ogImage).origin === siteUrl, `${file} Open Graph image uses a different origin.`)
  assertNoPlaceholders(markup, file)
}

const notFoundMarkup = await readFile(resolve(distDir, '404.html'), 'utf8')
const robotsMeta = getMetaContent(notFoundMarkup, 'name', 'robots') || ''

assert(/(?:^|,)\s*noindex(?:\s*,|$)/i.test(robotsMeta), '404.html must include a noindex robots directive.')
assertNoPlaceholders(notFoundMarkup, '404.html')

const sitemap = await readFile(resolve(distDir, 'sitemap.xml'), 'utf8')
const robots = await readFile(resolve(distDir, 'robots.txt'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const expectedUrls = pages.map((page) => toPageUrl(siteUrl, page.path))

assert(sitemapUrls.length === new Set(sitemapUrls).size, 'sitemap.xml contains duplicate URLs.')
assert(
  JSON.stringify(sitemapUrls) === JSON.stringify(expectedUrls),
  `sitemap.xml URLs do not match the ${expectedUrls.length} public routes.`,
)
assert(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), 'robots.txt sitemap URL does not match the build site URL.')
assertNoPlaceholders(sitemap, 'sitemap.xml')
assertNoPlaceholders(robots, 'robots.txt')

console.log(`SEO artifacts valid: ${pages.length} indexed pages plus noindex 404 (${siteUrl})`)
