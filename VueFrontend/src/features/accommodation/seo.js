import {
  buildBreadcrumbStructuredData,
  buildFaqStructuredData,
  buildOrganization,
  buildStructuredDataGraph,
} from '@/features/rooms/seo'

function toAbsoluteUrl(siteUrl, path) {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
}

export function buildAccommodationCategoryStructuredData({ page, rooms, site, siteUrl }) {
  const pageUrl = toAbsoluteUrl(siteUrl, page.path)
  const listId = `${pageUrl}#room-list`

  return buildStructuredDataGraph([
    buildOrganization(site, siteUrl),
    {
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#webpage`,
      name: page.title,
      headline: page.heroTitle,
      url: pageUrl,
      description: page.description,
      dateModified: site.contentUpdatedAt,
      inLanguage: 'en-IN',
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@type': 'Place',
        name: 'Kakadeo, Kanpur',
      },
      mainEntity: {
        '@id': listId,
      },
      breadcrumb: {
        '@id': `${pageUrl}#breadcrumb`,
      },
    },
    {
      '@type': 'ItemList',
      '@id': listId,
      name: page.inventoryTitle,
      url: pageUrl,
      numberOfItems: rooms.length,
      itemListElement: rooms.map((room, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: room.title,
        url: toAbsoluteUrl(siteUrl, room.detailsHref),
      })),
    },
    buildBreadcrumbStructuredData(siteUrl, [
      { name: 'Home', path: '/' },
      { name: 'Rooms', path: '/rooms' },
      { name: page.shortLabel, path: page.path },
    ]),
    buildFaqStructuredData(page.faqs, siteUrl, page.path),
  ])
}
