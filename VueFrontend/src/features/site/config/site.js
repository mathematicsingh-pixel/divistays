export const siteConfig = {
  name: 'CozyRooms',
  shortName: 'CozyRooms',
  defaultTitle: 'Student Rooms in Kakadeo, Kanpur | CozyRooms',
  roomsTitle: 'Compare Student Rooms in Kakadeo, Kanpur | CozyRooms',
  description:
    'Browse student rooms in Kakadeo, Kanpur with photos, monthly rent, occupancy, kitchen, washroom, and live availability. Call or WhatsApp CozyRooms directly.',
  roomsDescription:
    'Browse student rooms in Kakadeo by rent, occupancy, kitchen, washroom, and current availability.',
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
  heroEyebrow: 'Available now!',
  heroTitle: 'Furnished student rooms in Kakadeo',
  heroSummary:
    'See photos, rent, occupancy, kitchen, and washroom details before you call. If a room works, message or ring us directly.',
  heroPrimaryLabel: 'Browse open rooms',
  heroSecondaryLabel: 'WhatsApp',
  heroCallLabel: 'Call now',
  homeRoomsEyebrow: 'Available rooms',
  homeRoomsTitle: 'Rooms open right now',
  homeRoomsSummary:
    'These are the rooms currently available. Need more options? Open the full list and filter by budget, occupancy, kitchen, and washroom.',
  proofEyebrow: 'Why it helps',
  proofTitle: 'Everything important is visible up front',
  proofSummary:
    'No vague listing copy. Just the setup, the rent, and a direct way to reach us.',
  proofCards: [
    {
      title: 'Setup is obvious',
      body: 'You can tell at a glance if the room is single, double, studio, and whether the kitchen and washroom are private or shared.',
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
  faqs: [
    {
      question: 'Can I see only rooms that are available now?',
      answer: 'Yes. The comparison page opens with available rooms first, and you can switch to all rooms any time.',
    },
    {
      question: 'What room types can I compare?',
      answer: 'You can compare single, double, studio, and 1 RK-style options with kitchen and washroom details shown clearly.',
    },
    {
      question: 'What is included in the monthly rent?',
      answer: 'Each room page shows what is included in that setup. If you need charge-by-charge confirmation, use the room-specific WhatsApp action before you visit.',
    },
    {
      question: 'Can I visit before I decide?',
      answer: 'Yes. Open the room you want, then call or WhatsApp CozyRooms to confirm current availability and visit timing.',
    },
    {
      question: 'What should I do if the room I want is occupied?',
      answer: 'Occupied room pages stay live and point you to similar available rooms so you can keep comparing instead of starting over.',
    },
    {
      question: 'Which rooms have a private kitchen?',
      answer: 'Use the kitchen filter on the rooms page or open a room page to see whether the kitchen is private or common.',
    },
  ],
  ctaEyebrow: 'Direct contact',
  ctaTitle: 'Ask what is free today',
  ctaSummary:
    'Send the room ID you like. If that one is taken, we will point you to the closest open option.',
  ctaPrimaryLabel: 'Message on WhatsApp',
  ctaSecondaryLabel: 'Call CozyRooms',
  footerDescriptor: 'Furnished student rooms in Kakadeo, Kanpur.',
  footerSummary:
    'CozyRooms keeps it simple: photos, rent, room setup, and a direct phone or WhatsApp line.',
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
