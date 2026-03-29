import { defineRoom, image } from '../helpers.js'

const included = [
  'Single bed, slim study desk, and chair',
  'Common washroom access',
  'Common kitchen access',
  'Courtyard-side window',
]

const extraNotes = [
  'Photos will be updated after a live room capture',
  'Best fit for lower-rent enquiries',
]

const gallery = [
  image('01', 'assets/rooms/courtyard-solo-room/01.png', 'Compact solo room with single bed, slim desk, and a courtyard-side window.', 'Courtyard-side compact room'),
]

export default defineRoom({
  id: 8,
  slug: 'courtyard-solo-room',
  title: 'Courtyard solo room',
  summary:
    'Compact solo room listing with common kitchen and washroom access, plus a quieter courtyard-side window for simple day-to-day use.',
  fitSummary: 'Lower-rent solo setup with shared facilities and courtyard-side light.',
  priceMonthly: 3799,
  available: true,
  featured: false,
  updatedAt: '2026-03-29',
  availabilityUpdatedAt: '2026-03-29',
  occupancy: 'single',
  occupancyLabel: 'Single occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Common kitchen',
  washroomType: 'common',
  washroomLabel: 'Common washroom',
  highlightLabel: 'Lower-rent solo stay',
  facingLabel: 'Courtyard-side',
  bestFor: 'Anyone who wants an available low-rent solo room and is comfortable with shared kitchen and washroom access.',
  included,
  extraNotes,
  visitNextStep: 'Use the room name on call or WhatsApp so DiviStays can confirm the closest available match before you visit.',
  gallery,
})
