import { accommodationCategoryPageList } from '../../src/features/accommodation/content/category-pages.js'
import { getAccommodationCategoryRooms } from '../../src/features/accommodation/model/category-catalog.js'
import { getRoomPath } from '../../src/features/rooms/model/room-record.js'
import { buildImagePath } from '../../src/features/rooms/media.js'
import { siteConfig } from '../../src/features/site/config/site.js'

const routePathPattern = /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/
const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/

function normalizeDate(value, label) {
  if (typeof value !== 'string' || !isoDatePattern.test(value)) {
    throw new Error(`${label} must be an ISO date in YYYY-MM-DD format.`)
  }

  const parsedDate = new Date(`${value}T00:00:00Z`)

  if (Number.isNaN(parsedDate.valueOf()) || parsedDate.toISOString().slice(0, 10) !== value) {
    throw new Error(`${label} is not a valid calendar date: ${value}`)
  }

  return value
}

function latestDate(values) {
  return [...values].sort().at(-1)
}

function getRoomLastmod(room) {
  return latestDate([
    normalizeDate(room.updatedAt, `${room.slug}.updatedAt`),
    normalizeDate(room.availabilityUpdatedAt, `${room.slug}.availabilityUpdatedAt`),
  ])
}

export function buildSeoPages(roomCatalog) {
  const roomPages = roomCatalog.map((room) => ({
    path: getRoomPath(room.slug),
    lastmod: getRoomLastmod(room),
    images: room.gallery.map((media) => buildImagePath(room.slug, media.key, 1440, 'jpg')),
  }))
  const catalogLastmod = latestDate(roomPages.map((page) => page.lastmod))
  const siteContentLastmod = normalizeDate(siteConfig.contentUpdatedAt, 'siteConfig.contentUpdatedAt')
  const sharedPageLastmod = latestDate([catalogLastmod, siteContentLastmod])
  const coverImages = roomPages.map((page) => page.images[0]).filter(Boolean)
  const availableCoverImages = roomCatalog
    .filter((room) => room.available)
    .map((room) => buildImagePath(room.slug, room.gallery[0].key, 1440, 'jpg'))
  const categoryPages = accommodationCategoryPageList.map((page) => {
    const categoryRooms = getAccommodationCategoryRooms(roomCatalog, page.key)

    return {
      path: page.path,
      lastmod: sharedPageLastmod,
      images: categoryRooms.map((room) => (
        buildImagePath(room.slug, room.gallery[0].key, 1440, 'jpg')
      )),
    }
  })

  return [
    { path: '/', lastmod: sharedPageLastmod, images: availableCoverImages },
    { path: '/rooms', lastmod: sharedPageLastmod, images: coverImages },
    ...categoryPages,
    ...roomPages,
  ]
}

export function validateSeoPages(pages) {
  const paths = new Set()

  for (const page of pages) {
    if (typeof page.path !== 'string' || !routePathPattern.test(page.path)) {
      throw new Error(`Invalid SEO route path: ${String(page.path)}`)
    }

    if (paths.has(page.path)) {
      throw new Error(`Duplicate SEO route path: ${page.path}`)
    }

    normalizeDate(page.lastmod, `${page.path}.lastmod`)

    if (!Array.isArray(page.images) || page.images.some((imagePath) => !imagePath.startsWith('/'))) {
      throw new Error(`Invalid SEO image list for ${page.path}`)
    }

    if (page.images.length !== new Set(page.images).size) {
      throw new Error(`Duplicate SEO image path for ${page.path}`)
    }

    paths.add(page.path)
  }

  return pages
}

export function toPageUrl(siteUrl, path) {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
}

export function toHtmlFile(path) {
  return path === '/' ? 'index.html' : `${path.slice(1)}.html`
}
