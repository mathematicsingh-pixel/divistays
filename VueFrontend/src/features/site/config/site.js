import {
  availableRoomCount,
  availableStartingPriceLabel,
  occupancyOptions,
  roomCount,
} from '../../rooms/model/catalog.js'
import { siteFaqs } from '../content/faqs.js'

function formatCountLabel(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`
}

function lowercaseLeading(value) {
  if (!value) {
    return value
  }

  return `${value.charAt(0).toLowerCase()}${value.slice(1)}`
}

function formatList(values) {
  if (!values.length) {
    return ''
  }

  if (values.length === 1) {
    return values[0]
  }

  if (values.length === 2) {
    return `${values[0]} and ${values[1]}`
  }

  return `${values.slice(0, -1).join(', ')}, and ${values.at(-1)}`
}

function buildAvailableRoomsSummary() {
  if (!roomCount) {
    return 'Room listings will appear here once the catalog is ready.'
  }

  if (!availableRoomCount) {
    return `No rooms are currently marked available. You can still browse all ${roomCount} listed rooms and ask for the next opening.`
  }

  return `Right now ${availableRoomCount} of ${roomCount} listed rooms are available${availableStartingPriceLabel ? `, starting from ${availableStartingPriceLabel}` : ''}.`
}

const occupancySummary = occupancyOptions.length
  ? formatList(occupancyOptions.map((item) => lowercaseLeading(item.label)))
  : 'different occupancy setups'
const availabilitySummary = buildAvailableRoomsSummary()
const siteAvailabilityLine = availableRoomCount
  ? `${formatCountLabel(availableRoomCount, 'room')} available now${availableStartingPriceLabel ? ` from ${availableStartingPriceLabel}` : ''}.`
  : 'Call or WhatsApp for the next opening.'
const catalogDefaultNote = availableRoomCount
  ? `Available rooms show first (${availableRoomCount} live now). Use filters only if you need them.`
  : 'Open all rooms and use filters only if you need to narrow the list.'
const mobileFiltersSummary = occupancyOptions.length
  ? `Budget, setup, and ${formatCountLabel(occupancyOptions.length, 'occupancy type')}`
  : 'Budget and room setup'

export const siteConfig = {
  name: 'CozyRooms',
  shortName: 'CozyRooms',
  defaultTitle: 'Student Rooms in Kakadeo, Kanpur | CozyRooms',
  roomsTitle: 'Compare Student Rooms in Kakadeo, Kanpur | CozyRooms',
  description:
    `Browse ${formatCountLabel(roomCount, 'student room')} in Kakadeo, Kanpur with photos, monthly rent, occupancy, kitchen, washroom, and live availability. ${siteAvailabilityLine}`,
  roomsDescription:
    `Compare ${formatCountLabel(roomCount, 'student room')} in Kakadeo by rent, occupancy, kitchen, washroom, and current availability. ${siteAvailabilityLine}`,
  defaultSiteUrl: 'https://www.cozyrooms.example',
  themeColor: '#07121a',
  ogImagePath: '/og-default.svg',
  phoneDisplay: '8306709248',
  phoneE164: '+918306709248',
  whatsappNumber: '918306709248',
  locationLabel: 'Kakadeo, Kanpur, Uttar Pradesh',
  locationShort: 'Kakadeo, Kanpur',
  audienceLabel: 'Students in Kakadeo',
  brandLine: 'Real rooms. Real rent.',
  supportLine: 'Furnished student rooms in Kakadeo, Kanpur.',
  heroEyebrow: 'Available now',
  heroTitle: 'Furnished student rooms in Kakadeo',
  heroSummary:
    'See photos, rent, occupancy, kitchen, and washroom details before you call. If a room works, message or ring us directly.',
  heroPrimaryLabel: 'View open rooms',
  heroSecondaryLabel: 'Ask on WhatsApp',
  heroCallLabel: 'Call us',
  homeRoomsEyebrow: 'Available rooms',
  homeRoomsTitle: 'Rooms open right now',
  homeRoomsSummary: `${availabilitySummary} Need more options? Open the full list and filter by budget, occupancy, kitchen, and washroom.`,
  proofEyebrow: 'Why it helps',
  proofTitle: 'Everything important is visible up front',
  proofSummary:
    'No vague listing copy. Just the setup, the rent, and a direct way to reach us.',
  proofCards: [
    {
      title: 'Setup is obvious',
      body: `You can compare ${formatCountLabel(roomCount, 'room listing')} across ${occupancySummary}. Kitchen and washroom details stay visible on every room.`,
    },
    {
      title: 'Rent stays visible',
      body: 'Monthly price is on the card and room page, not hidden until the call.',
    },
    {
      title: 'Available rooms first',
      body: 'The list starts with rooms that are free now, then you can open the full catalog if you want more options.',
    },
    {
      title: 'Direct line',
      body: 'Call or WhatsApp CozyRooms without a form, lead wall, or callback loop.',
    },
  ],
  processEyebrow: 'How it works',
  processTitle: 'How to pick a room here',
  processSummary:
    'Start with the rooms that are open. Open the one that fits. Then call or message for a visit.',
  processSteps: [
    {
      title: 'Start with open rooms',
      body: 'Check rent, occupancy, kitchen, and washroom before you talk to anyone.',
    },
    {
      title: 'Open the room you like',
      body: 'See photos, included items, and the basics you care about before planning a visit.',
    },
    {
      title: 'Call or WhatsApp',
      body: 'Use the room ID, confirm availability, and lock in a visit time.',
    },
  ],
  faqEyebrow: 'FAQs',
  faqTitle: 'Common questions',
  faqSummary: 'Quick answers first. Then call or message if you want details.',
  faqs: siteFaqs,
  ctaEyebrow: 'Direct contact',
  ctaTitle: 'Ask what is free today',
  ctaSummary:
    'Send the room ID you like. If that one is taken, we will point you to the closest open option.',
  ctaPrimaryLabel: 'Ask on WhatsApp',
  ctaSecondaryLabel: 'Call us',
  footerDescriptor: 'Furnished student rooms in Kakadeo, Kanpur.',
  footerSummary:
    'CozyRooms keeps it simple: photos, rent, room setup, and a direct phone or WhatsApp line.',
  uiText: {
    actions: {
      viewOpenRooms: 'View open rooms',
      compareAllRooms: 'Compare all rooms',
      talkToUs: 'Talk to us',
      chooseFilters: 'Choose filters',
      clearFilters: 'Clear filters',
      viewRoom: 'View room',
      viewSimilarRooms: 'View similar rooms',
      askOnWhatsApp: 'Ask on WhatsApp',
      callCozyRooms: 'Call us',
    },
    contactSheet: {
      eyebrow: 'Talk to us',
      title: 'Talk to CozyRooms',
      summary: 'Call us directly or send a quick WhatsApp message.',
      whatsappMeta: 'Quick reply on WhatsApp',
    },
    heroPanel: {
      badge: 'Featured',
    },
    catalog: {
      title: 'Find your room',
      summary: availableRoomCount
        ? `Start with ${formatCountLabel(availableRoomCount, 'room')} that ${availableRoomCount === 1 ? 'is' : 'are'} free now. Narrow the list only if you need to.`
        : 'No rooms are currently marked available. Open the full list and call for the next opening.',
      defaultNote: catalogDefaultNote,
      mobileFiltersLabel: 'Filters',
      mobileFiltersSummary,
    },
    room: {
      similarTitle: 'You may like these too',
      similarSummary: 'Similar setups first, with open rooms shown first.',
      previewLabel: 'Quick look',
    },
    footer: {
      headline: 'See rooms. Pick one. Talk to us.',
    },
  },
  localityPage: {
    mapUrl: 'https://maps.google.com/?q=Kakadeo+Kanpur',
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
      label: siteConfig.uiText.actions.callCozyRooms,
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
  return 'Hi, I’m looking for a student room in Kakadeo. Please share the room IDs available now, monthly rent, and visit timing.'
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
  return `${room.title} in Kakadeo, Kanpur | ${room.priceLabel} | CozyRooms`
}

export function getRoomPageDescription(room) {
  return `See photos, monthly rent, availability, occupancy, kitchen, and washroom details for ${room.title} in Kakadeo, Kanpur. Call or WhatsApp CozyRooms directly.`
}
