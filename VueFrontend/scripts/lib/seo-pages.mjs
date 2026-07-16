import { getRoomPath } from '../../src/features/rooms/model/room-record.js'

const routePathPattern = /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/

export function buildSeoPages(roomCatalog) {
  return [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/rooms', changefreq: 'weekly', priority: '0.9' },
    ...roomCatalog.map((room) => ({
      path: getRoomPath(room.slug),
      changefreq: 'weekly',
      priority: room.available ? '0.85' : '0.7',
    })),
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
