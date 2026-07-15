import { defineRoom, image } from '../helpers.js'

const included = [
  'Single bed, slim study desk, and chair',
  'Common washroom access',
  'Common kitchen access',
  'Courtyard-side window',
  'Almirah',
  'Water Purifier',
  'Wi-fi',
  '24x7 CCTV support',
]

const extraNotes = [
  'Photos will be updated after a live room capture',
  'Best fit for lower-rent enquiries',
]

const gallery = [
  image('01', 'assets/rooms/courtyard-solo-room/01.png', 'Compact solo room with single bed, slim desk, and a courtyard-side window.', 'Courtyard-side compact room'),
  image('02', 'assets/rooms/courtyard-solo-room/02.png', 'Alternate view of the courtyard-side solo room.', 'Alternate room view'),
  image('03', 'assets/rooms/courtyard-solo-room/03.png', 'Additional interior view of the courtyard-side solo room.', 'Room interior'),
  image('1000074379', 'assets/rooms/courtyard-solo-room/1000074379.jpeg', 'Interior detail of the courtyard-side solo room.', 'Interior detail'),
  image('1000074383', 'assets/rooms/courtyard-solo-room/1000074383.jpeg', 'Additional room angle in the courtyard-side solo room.', 'Alternate interior'),
  image('1000074385', 'assets/rooms/courtyard-solo-room/1000074385.jpeg', 'Further view of the courtyard-side solo room.', 'Room view'),
  image('1000074386', 'assets/rooms/courtyard-solo-room/1000074386.jpeg', 'Final interior view of the courtyard-side solo room.', 'Final room view'),
]

export default defineRoom({
  id: 8,
  slug: 'courtyard-solo-room',
  title: 'Courtyard room',
  summary:
    'Compact room listing with common kitchen and common washroom access, plus a quieter courtyard-side window for simple day-to-day use.',
  fitSummary: 'Lower-rent setup with shared facilities and courtyard-side light.',
  priceMonthly: 4299,
  available: true,
  featured: true,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single/double',
  occupancyLabel: 'Single/Double occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Common kitchen',
  washroomType: 'common',
  washroomLabel: 'Common washroom',
  highlightLabel: 'Well lit, ventilated courtyard-side room',
  facingLabel: 'Courtyard-side',
  bestFor: 'Anyone who wants an available low-rent room and is comfortable with shared kitchen and washroom access.',
  included,
  extraNotes,
  visitNextStep: 'Use the room name on call or WhatsApp so DiviStays can confirm the closest available match before you visit.',
  gallery,
})
