import { access, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadRoomSourceCatalog } from './lib/load-room-content.mjs'
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
const roomCatalog = await loadRoomSourceCatalog()
const pages = validateSeoPages(buildSeoPages(roomCatalog))

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\s${name}=(['"])(.*?)\\1`, 'i'))

  return match?.[2]
}

function getTags(markup, tagName) {
  return markup.match(new RegExp(`<${tagName}\\b[^>]*>`, 'gi')) || []
}

function getSingleElementContent(markup, tagName, file) {
  const matches = [...markup.matchAll(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)</${tagName}>`, 'gi'))]

  assert(matches.length === 1, `${file} must contain exactly one ${tagName} element.`)
  assert(Boolean(matches[0][1].trim()), `${file} has an empty ${tagName} element.`)

  return matches[0][1].trim()
}

function getCanonical(markup, file) {
  const canonicalTags = getTags(markup, 'link')
    .filter((tag) => getAttribute(tag, 'rel')?.split(/\s+/).includes('canonical'))

  assert(canonicalTags.length === 1, `${file} must contain exactly one canonical link.`)

  return getAttribute(canonicalTags[0], 'href')
}

function getMetaContent(markup, attribute, value, file) {
  const tags = getTags(markup, 'meta')
    .filter((candidate) => getAttribute(candidate, attribute)?.toLowerCase() === value.toLowerCase())

  assert(tags.length === 1, `${file} must contain exactly one ${value} meta tag.`)

  const content = getAttribute(tags[0], 'content')
  assert(Boolean(content), `${file} has an empty ${value} meta tag.`)

  return content
}

function getStructuredDataGraph(markup, file) {
  const scripts = [...markup.matchAll(/(<script\b[^>]*>)([\s\S]*?)<\/script>/gi)]
    .filter((match) => getAttribute(match[1], 'type')?.toLowerCase() === 'application/ld+json')

  assert(scripts.length === 1, `${file} must contain exactly one JSON-LD graph.`)

  let data

  try {
    data = JSON.parse(scripts[0][2])
  }
  catch {
    throw new Error(`${file} contains invalid JSON-LD.`)
  }

  assert(data?.['@context'] === 'https://schema.org', `${file} JSON-LD must use schema.org.`)
  assert(Array.isArray(data?.['@graph']) && data['@graph'].length, `${file} JSON-LD must contain a non-empty @graph.`)

  return data
}

function assertNoPlaceholders(value, label) {
  const forbiddenPatterns = [
    /\.example(?:[/:\s"']|$)/i,
    /\bundefined\b/i,
    /https?:\/\/(?:localhost|127\.\d+\.\d+\.\d+|0\.0\.0\.0|\[::1\])(?::\d+)?/i,
  ]

  assert(!forbiddenPatterns.some((pattern) => pattern.test(value)), `${label} contains a placeholder or local URL.`)
}

async function assertBuiltAsset(url, label) {
  const parsedUrl = new URL(url)
  assert(parsedUrl.origin === siteUrl, `${label} uses a different origin.`)

  try {
    await access(resolve(distDir, `.${parsedUrl.pathname}`))
  }
  catch {
    throw new Error(`${label} points to a missing built asset: ${parsedUrl.pathname}`)
  }
}

const titles = new Map()
const descriptions = new Map()

for (const page of pages) {
  const file = toHtmlFile(page.path)
  const markup = await readFile(resolve(distDir, file), 'utf8')
  const expectedCanonical = toPageUrl(siteUrl, page.path)
  const canonical = getCanonical(markup, file)
  const title = getSingleElementContent(markup, 'title', file)
  const description = getMetaContent(markup, 'name', 'description', file)
  const robots = getMetaContent(markup, 'name', 'robots', file).toLowerCase()
  const ogTitle = getMetaContent(markup, 'property', 'og:title', file)
  const ogDescription = getMetaContent(markup, 'property', 'og:description', file)
  const ogImage = getMetaContent(markup, 'property', 'og:image', file)
  const ogImageAlt = getMetaContent(markup, 'property', 'og:image:alt', file)
  const ogImageType = getMetaContent(markup, 'property', 'og:image:type', file)
  const ogUrl = getMetaContent(markup, 'property', 'og:url', file)
  const twitterImage = getMetaContent(markup, 'name', 'twitter:image', file)
  const twitterImageAlt = getMetaContent(markup, 'name', 'twitter:image:alt', file)

  assert(canonical === expectedCanonical, `${file} canonical is ${canonical}; expected ${expectedCanonical}.`)
  assert(getTags(markup, 'h1').length === 1, `${file} must contain exactly one h1.`)
  assert(robots.includes('index') && robots.includes('follow'), `${file} must be indexable and followable.`)
  assert(robots.includes('max-image-preview:large'), `${file} must allow large image previews.`)
  assert(ogTitle === title, `${file} Open Graph title must match its title.`)
  assert(ogDescription === description, `${file} Open Graph description must match its description.`)
  assert(ogUrl === canonical, `${file} og:url must match its canonical URL.`)
  assert(ogImageType === 'image/jpeg', `${file} must declare its Open Graph image as JPEG.`)
  assert(Boolean(ogImageAlt.trim()), `${file} must provide Open Graph image alt text.`)
  assert(twitterImage === ogImage, `${file} Twitter and Open Graph images must match.`)
  assert(twitterImageAlt === ogImageAlt, `${file} Twitter and Open Graph image alt text must match.`)
  assert(!titles.has(title), `${file} duplicates the title from ${titles.get(title)}.`)
  assert(!descriptions.has(description), `${file} duplicates the description from ${descriptions.get(description)}.`)

  titles.set(title, file)
  descriptions.set(description, file)
  getStructuredDataGraph(markup, file)
  await assertBuiltAsset(ogImage, `${file} Open Graph image`)
  assertNoPlaceholders(markup, file)
}

const notFoundMarkup = await readFile(resolve(distDir, '404.html'), 'utf8')
const notFoundRobots = getMetaContent(notFoundMarkup, 'name', 'robots', '404.html').toLowerCase()

assert(notFoundRobots.includes('noindex'), '404.html must include a noindex robots directive.')
assert(getTags(notFoundMarkup, 'h1').length === 1, '404.html must contain exactly one h1.')
getSingleElementContent(notFoundMarkup, 'title', '404.html')
assertNoPlaceholders(notFoundMarkup, '404.html')

const sitemap = await readFile(resolve(distDir, 'sitemap.xml'), 'utf8')
const robots = await readFile(resolve(distDir, 'robots.txt'), 'utf8')
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
const sitemapLastmods = [...sitemap.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map((match) => match[1])
const sitemapImageUrls = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1])
const expectedUrls = pages.map((page) => toPageUrl(siteUrl, page.path))
const expectedLastmods = pages.map((page) => page.lastmod)
const expectedImageUrls = pages.flatMap((page) => (
  page.images.map((imagePath) => toPageUrl(siteUrl, imagePath))
))

assert(sitemapUrls.length === new Set(sitemapUrls).size, 'sitemap.xml contains duplicate URLs.')
assert(JSON.stringify(sitemapUrls) === JSON.stringify(expectedUrls), `sitemap.xml URLs do not match the ${expectedUrls.length} public routes.`)
assert(JSON.stringify(sitemapLastmods) === JSON.stringify(expectedLastmods), 'sitemap.xml lastmod values do not match room content dates.')
assert(JSON.stringify(sitemapImageUrls) === JSON.stringify(expectedImageUrls), 'sitemap.xml image URLs do not match the public room galleries.')
assert(sitemap.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'), 'sitemap.xml is missing the image namespace.')
assert(!sitemap.includes('<priority>') && !sitemap.includes('<changefreq>'), 'sitemap.xml contains ignored priority or changefreq fields.')
assert(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), 'robots.txt sitemap URL does not match the build site URL.')
assertNoPlaceholders(sitemap, 'sitemap.xml')
assertNoPlaceholders(robots, 'robots.txt')

await Promise.all(expectedImageUrls.map((url) => assertBuiltAsset(url, 'sitemap image')))

console.log(`SEO artifacts valid: ${pages.length} indexed pages, ${expectedImageUrls.length} image entries, plus noindex 404 (${siteUrl})`)
