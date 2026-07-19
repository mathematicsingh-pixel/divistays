import {
  availableRoomCount,
  availableStartingPriceLabel,
  occupancyOptions,
  roomCount,
} from '../../rooms/model/catalog.js'
import { siteFaqs } from '../content/faqs.js'
import { productionSiteUrl } from './origin.js'

function formatCountLabel(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}

function buildAvailableRoomsSummary() {
  if (!roomCount) {
    return 'No rooms are listed online at the moment. Call or WhatsApp DiviStays to ask what is opening next.'
  }

  if (!availableRoomCount) {
    return `No rooms are marked available today. You can still compare all ${roomCount} rooms and ask about the next opening.`
  }

  return `${formatCountLabel(availableRoomCount, 'room')} available to visit now${availableStartingPriceLabel ? `, with rent from ${availableStartingPriceLabel}` : ''}.`
}

const availabilitySummary = buildAvailableRoomsSummary()
const catalogDefaultNote = availableRoomCount
  ? `Showing the ${formatCountLabel(availableRoomCount, 'room')} available now. Filter by budget or facilities to narrow the list.`
  : 'Browse every room or call to ask which one is opening next.'
const mobileFiltersSummary = occupancyOptions.length
  ? `Budget, kitchen, washroom, and ${formatCountLabel(occupancyOptions.length, 'occupancy type')}`
  : 'Budget, kitchen, and washroom'

export const siteConfig = {
  name: 'DiviStays',
  shortName: 'DiviStays',
  contentUpdatedAt: '2026-07-18',
  defaultTitle: 'Rooms, PG, Hostel & Studios in Kakadeo, Kanpur | DiviStays',
  roomsTitle: 'Rooms for Rent in Kakadeo, Kanpur | DiviStays',
  description:
    'Compare furnished rooms, PG and hostel-style accommodation, and studio apartments in Kakadeo, Kanpur. See photos, monthly rent, facilities, and availability.',
  roomsDescription:
    'Browse current furnished rooms and studio apartments for rent in Kakadeo, Kanpur. Filter by monthly budget, occupancy, kitchen, washroom, and availability.',
  defaultSiteUrl: productionSiteUrl,
  robotsDirective: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  themeColor: '#08161e',
  ogImagePath: '/media/rooms/garden-view-studio/01-1440.jpg',
  ogImageAlt: 'Furnished garden-view studio apartment available through DiviStays in Kakadeo, Kanpur.',
  ogImageWidth: 1440,
  ogImageHeight: 1080,
  ogImageType: 'image/jpeg',
  phoneDisplay: '8306709248',
  phoneE164: '+918306709248',
  whatsappNumber: '918306709248',
  locationLabel: 'Kakadeo, Kanpur, Uttar Pradesh',
  locationShort: 'Kakadeo, Kanpur',
  audienceLabel: 'People looking for rooms, PG accommodation, or studios in Kakadeo, Kanpur',
  brandLine: 'See photos and rent before you call.',
  supportLine: 'Furnished rooms, PG-style stays, and studio apartments for rent in Kakadeo, Kanpur.',
  heroEyebrow: 'Rooms and PG stays in Kakadeo',
  heroTitle: 'Rooms, PGs and studios in Kakadeo.',
  heroSummary:
    'See photos, monthly rent, and facilities before you call. If you like a room, send us the room ID to arrange a visit.',
  heroPrimaryLabel: 'See room details',
  heroCallLabel: 'Call DiviStays',
  homeRoomsEyebrow: 'Available now',
  homeRoomsTitle: 'Available rooms',
  homeRoomsSummary: `${availabilitySummary} Open any listing for more photos and full room details.`,
  proofEyebrow: 'Room listings',
  proofTitle: 'Photos, rent and facilities',
  proofSummary:
    'See the monthly rent, occupancy, kitchen, and washroom for each room.',
  proofCards: [
    {
      title: 'Room photos',
      body: 'See the bed, furniture, floor space, and facilities from multiple angles.',
    },
    {
      title: 'Monthly rent',
      body: 'The monthly price is shown on the room card and full listing.',
    },
    {
      title: 'Private or shared facilities',
      body: 'Each listing states the occupancy and whether the kitchen and washroom are private or shared.',
    },
    {
      title: 'Room ID',
      body: 'Use the two-digit room ID when you call or send a WhatsApp message.',
    },
  ],
  processEyebrow: 'Room visits',
  processTitle: 'Arrange a visit',
  processSummary:
    'Send the room ID on WhatsApp or call us to choose a time.',
  processSteps: [
    {
      title: 'Pick a room',
      body: 'Compare the photos, rent, occupancy, kitchen, and washroom.',
    },
    {
      title: 'Contact us',
      body: 'Call or message us with the two-digit ID shown on the listing.',
    },
    {
      title: 'Visit the room',
      body: 'We will confirm availability and agree on a time for you to see it.',
    },
  ],
  faqEyebrow: 'FAQs',
  faqTitle: 'Questions about the rooms',
  faqSummary: 'Rooms, PG-style options, studios, facilities, monthly rent, location, and visits.',
  faqs: siteFaqs,
  ctaTitle: 'Ask what is open today',
  ctaSummary:
    'Send us the room ID if you have one. We will confirm current availability and arrange a visit.',
  ctaPrimaryLabel: 'Ask on WhatsApp',
  ctaSecondaryLabel: 'Call us',
  footerDescriptor: 'Furnished rooms, PG-style stays, and studio apartments for rent in Kakadeo, Kanpur.',
  footerSummary:
    'Photos, monthly rent, facilities, and availability are listed for each room.',
  uiText: {
    actions: {
      viewOpenRooms: 'See available rooms',
      viewRooms: 'See available rooms',
      compareAllRooms: 'Compare all rooms',
      talkToUs: 'Call or WhatsApp',
      chooseFilters: 'Filter rooms',
      clearFilters: 'Clear filters',
      viewRoom: 'Open full listing',
      viewSimilarRooms: 'See similar rooms',
      askOnWhatsApp: 'WhatsApp DiviStays',
      callDirect: 'Call DiviStays',
    },
    contactSheet: {
      eyebrow: 'Direct enquiry',
      title: 'Call or WhatsApp DiviStays',
      summary: 'Call about availability or send us the room ID on WhatsApp.',
      whatsappMeta: 'Send a message on WhatsApp',
    },
    heroPanel: {
      badge: 'Featured',
    },
    catalog: {
      title: 'Furnished rooms in Kakadeo, Kanpur',
      summary: availableRoomCount
        ? `${formatCountLabel(availableRoomCount, 'furnished room')} available to visit. Filter by monthly budget, occupancy, kitchen, or washroom.`
        : 'No rooms are marked available today. Browse the full list or call to ask what is opening next.',
      defaultNote: catalogDefaultNote,
      mobileFiltersLabel: 'Filters',
      mobileFiltersSummary,
    },
    room: {
      similarTitle: 'Similar rooms',
      similarSummary: 'Other available rooms with a similar price or facilities.',
      previewLabel: 'Room preview',
    },
    footer: {
      headline: 'Real rooms. Clear monthly rent.',
    },
  },
  localityPage: {
    mapUrl: 'https://maps.app.goo.gl/9sDR9Z3dRfdb1PYJA',
    placeholderImagePath: '/location-placeholder-map.webp',
    placeholderImageAlt:
      'Stylized approximate neighborhood map for Kakadeo, Kanpur with a highlighted area pin.',
  },
}

export function resolveSiteUrl(candidate) {
  try {
    return new URL(candidate || siteConfig.defaultSiteUrl).toString().replace(/\/$/, '')
  }
  catch {
    return siteConfig.defaultSiteUrl
  }
}

export function getCallHref() {
  return `tel:${siteConfig.phoneE164}`
}

export function buildStickyContactOptions(callHref, whatsappHref) {
  return [
    {
      label: siteConfig.uiText.actions.callDirect,
      href: callHref,
      meta: siteConfig.phoneDisplay,
      tone: 'primary',
    },
    {
      label: siteConfig.uiText.actions.askOnWhatsApp,
      href: whatsappHref,
      meta: siteConfig.uiText.contactSheet.whatsappMeta,
      blank: true,
    },
  ]
}

export function buildGenericEnquiry() {
  return "Hi, I'm looking for a room or studio apartment in Kakadeo. Please share what is available now, the monthly rent, and visit timing."
}

export function buildRoomEnquiry(room) {
  if (!room) {
    return buildGenericEnquiry()
  }

  if (!room.available) {
    return `Hi, I’m looking for a room similar to ${room.referenceLabel} (${room.title}) in Kakadeo. Please share the closest available option, monthly rent, and visit timing.`
  }

  return `Hi, I’m interested in ${room.referenceLabel} (${room.title}) in Kakadeo. Please share current availability, what is included in the rent, and the next step for a visit.`
}

export function getWhatsAppHref(message = buildGenericEnquiry()) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function getPageOgImage(siteUrl, path = siteConfig.ogImagePath) {
  return `${resolveSiteUrl(siteUrl)}${path}`
}

export function getRoomPageTitle(room) {
  return `${room.title} in Kakadeo, Kanpur | DiviStays`
}

export function getRoomPageDescription(room) {
  return `See ${room.galleryCount} photos of ${room.title} for rent at ${room.priceLabel} in Kakadeo, Kanpur. Check occupancy, kitchen, washroom, and current availability.`
}
