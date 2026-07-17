function feature(name) {
  return {
    '@type': 'LocationFeatureSpecification',
    name,
    value: true,
  }
}

function additionalProperty(name, value) {
  return {
    '@type': 'PropertyValue',
    name,
    value,
  }
}

function toAbsoluteUrl(siteUrl, path) {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`
}

function getOrganizationId(siteUrl) {
  return `${toAbsoluteUrl(siteUrl, '/')}#organization`
}

function getWebsiteId(siteUrl) {
  return `${toAbsoluteUrl(siteUrl, '/')}#website`
}

function getAccommodationId(siteUrl, room) {
  return `${toAbsoluteUrl(siteUrl, room.detailsHref)}#accommodation`
}

function getOfferId(siteUrl, room) {
  return `${toAbsoluteUrl(siteUrl, room.detailsHref)}#offer`
}

function getMaximumOccupancy(room) {
  if (room.occupancy === 'flex') return 3
  if (room.occupancy === 'double' || room.occupancy === 'single/double') return 2
  return 1
}

function buildAccommodation(siteUrl, room) {
  const roomUrl = toAbsoluteUrl(siteUrl, room.detailsHref)

  return {
    '@type': 'Accommodation',
    '@id': getAccommodationId(siteUrl, room),
    name: room.title,
    url: roomUrl,
    description: room.summary,
    identifier: room.referenceLabel,
    image: room.gallery.map((media) => (
      toAbsoluteUrl(siteUrl, `/media/rooms/${room.slug}/${media.key}-1440.jpg`)
    )),
    occupancy: {
      '@type': 'QuantitativeValue',
      maxValue: getMaximumOccupancy(room),
      unitText: 'people',
    },
    amenityFeature: room.included.map(feature),
    additionalProperty: [
      additionalProperty('Occupancy', room.occupancyLabel),
      additionalProperty('Kitchen', room.kitchenLabel),
      additionalProperty('Washroom', room.washroomLabel),
      additionalProperty('Best for', room.bestFor),
    ],
  }
}

function buildRoomOffer(siteUrl, room) {
  return {
    '@type': 'Offer',
    '@id': getOfferId(siteUrl, room),
    url: toAbsoluteUrl(siteUrl, room.detailsHref),
    price: room.priceMonthly,
    priceCurrency: 'INR',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: room.priceMonthly,
      priceCurrency: 'INR',
      billingDuration: 1,
      unitCode: 'MON',
      unitText: 'month',
    },
    availability: room.available ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    seller: {
      '@id': getOrganizationId(siteUrl),
    },
    itemOffered: buildAccommodation(siteUrl, room),
  }
}

export function buildStructuredDataGraph(nodes) {
  return [{
    '@context': 'https://schema.org',
    '@graph': nodes,
  }]
}

export function buildWebsite(site, siteUrl) {
  return {
    '@type': 'WebSite',
    '@id': getWebsiteId(siteUrl),
    url: toAbsoluteUrl(siteUrl, '/'),
    name: site.name,
    alternateName: ['Divi Stays', 'divistays.com'],
    inLanguage: 'en-IN',
    publisher: {
      '@id': getOrganizationId(siteUrl),
    },
  }
}

export function buildOrganization(site, siteUrl) {
  return {
    '@type': 'Organization',
    '@id': getOrganizationId(siteUrl),
    name: site.name,
    url: toAbsoluteUrl(siteUrl, '/'),
    description: site.description,
    telephone: site.phoneE164,
    image: toAbsoluteUrl(siteUrl, site.ogImagePath),
    logo: toAbsoluteUrl(siteUrl, '/favicon.svg'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kanpur',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Kakadeo, Kanpur',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: site.phoneE164,
      contactType: 'room enquiries',
      areaServed: 'IN',
    },
  }
}

export function buildBreadcrumbStructuredData(siteUrl, items) {
  const currentPage = items.at(-1)

  return {
    '@type': 'BreadcrumbList',
    '@id': `${toAbsoluteUrl(siteUrl, currentPage.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(siteUrl, item.path),
    })),
  }
}

export function buildFaqStructuredData(faqs, siteUrl) {
  return {
    '@type': 'FAQPage',
    '@id': `${toAbsoluteUrl(siteUrl, '/')}#faq`,
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function buildRoomsStructuredData({ site, siteUrl, rooms }) {
  const roomsUrl = toAbsoluteUrl(siteUrl, '/rooms')
  const listId = `${roomsUrl}#room-list`

  return buildStructuredDataGraph([
    buildOrganization(site, siteUrl),
    {
      '@type': 'CollectionPage',
      '@id': `${roomsUrl}#webpage`,
      name: site.roomsTitle,
      url: roomsUrl,
      description: site.roomsDescription,
      inLanguage: 'en-IN',
      isPartOf: {
        '@id': getWebsiteId(siteUrl),
      },
      mainEntity: {
        '@id': listId,
      },
      breadcrumb: {
        '@id': `${roomsUrl}#breadcrumb`,
      },
    },
    {
      '@type': 'ItemList',
      '@id': listId,
      name: 'Rooms and studio apartments for rent in Kakadeo',
      url: roomsUrl,
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
    ]),
  ])
}

export function buildRoomStructuredData({ site, siteUrl, room }) {
  const roomUrl = toAbsoluteUrl(siteUrl, room.detailsHref)
  const primaryImageUrl = toAbsoluteUrl(
    siteUrl,
    `/media/rooms/${room.slug}/${room.gallery[0].key}-1440.jpg`,
  )

  return buildStructuredDataGraph([
    buildOrganization(site, siteUrl),
    buildRoomOffer(siteUrl, room),
    {
      '@type': 'WebPage',
      '@id': `${roomUrl}#webpage`,
      name: room.title,
      url: roomUrl,
      description: room.summary,
      dateModified: room.updatedAt,
      inLanguage: 'en-IN',
      isPartOf: {
        '@id': getWebsiteId(siteUrl),
      },
      mainEntity: {
        '@id': getAccommodationId(siteUrl, room),
      },
      breadcrumb: {
        '@id': `${roomUrl}#breadcrumb`,
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        '@id': `${roomUrl}#primary-image`,
        url: primaryImageUrl,
        contentUrl: primaryImageUrl,
        caption: room.gallery[0].alt,
      },
    },
    buildBreadcrumbStructuredData(siteUrl, [
      { name: 'Home', path: '/' },
      { name: 'Rooms', path: '/rooms' },
      { name: room.title, path: room.detailsHref },
    ]),
  ])
}
