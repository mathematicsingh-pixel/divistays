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
  return `${siteUrl}${path === '/' ? '' : path}`
}

export function buildBusiness(site, siteUrl, rooms) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: site.name,
    description: site.description,
    url: toAbsoluteUrl(siteUrl, '/'),
    telephone: site.phoneE164,
    image: toAbsoluteUrl(siteUrl, site.ogImagePath),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kakadeo, Kanpur',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Kakadeo, Kanpur',
    },
    audience: {
      '@type': 'Audience',
      audienceType: site.audienceLabel,
    },
    makesOffer: rooms.map((room) => buildRoomOffer(site, siteUrl, room)),
  }
}

function buildRoomOffer(site, siteUrl, room) {
  return {
    '@type': 'Offer',
    url: toAbsoluteUrl(siteUrl, room.detailsHref),
    price: room.priceMonthly,
    priceCurrency: 'INR',
    availability: room.available ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    seller: {
      '@type': 'LodgingBusiness',
      name: site.name,
      telephone: site.phoneE164,
      url: toAbsoluteUrl(siteUrl, '/'),
    },
    itemOffered: {
      '@type': 'Accommodation',
      name: room.title,
      description: room.summary,
      amenityFeature: room.included.map(feature),
      additionalProperty: [
        additionalProperty('Occupancy', room.occupancyLabel),
        additionalProperty('Kitchen', room.kitchenLabel),
        additionalProperty('Washroom', room.washroomLabel),
        additionalProperty('Best for', room.bestFor),
      ],
    },
  }
}

export function buildBreadcrumbStructuredData(siteUrl, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(siteUrl, item.path),
    })),
  }
}

export function buildFaqStructuredData(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
  return [
    buildBusiness(site, siteUrl, rooms),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Student rooms in Kakadeo',
      itemListElement: rooms.map((room, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: toAbsoluteUrl(siteUrl, room.detailsHref),
        name: room.title,
      })),
    },
    buildBreadcrumbStructuredData(siteUrl, [
      { name: 'Home', path: '/' },
      { name: 'Rooms', path: '/rooms' },
    ]),
  ]
}

export function buildRoomStructuredData({ site, siteUrl, room }) {
  return [
    buildBusiness(site, siteUrl, [room]),
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: room.title,
      url: toAbsoluteUrl(siteUrl, room.detailsHref),
      description: room.summary,
      primaryImageOfPage: toAbsoluteUrl(siteUrl, `/media/rooms/${room.slug}/${room.gallery[0].key}-1440.jpg`),
    },
    {
      '@context': 'https://schema.org',
      ...buildRoomOffer(site, siteUrl, room),
    },
    buildBreadcrumbStructuredData(siteUrl, [
      { name: 'Home', path: '/' },
      { name: 'Rooms', path: '/rooms' },
      { name: room.title, path: room.detailsHref },
    ]),
  ]
}
