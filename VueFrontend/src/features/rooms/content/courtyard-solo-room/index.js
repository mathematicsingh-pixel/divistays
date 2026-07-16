import { defineRoom, image } from '../helpers.js'

const included = [
  'Single bed, slim study desk, and chair',
  'Shared washroom access',
  'Shared kitchen access',
  'Courtyard-side window',
  'Storage cupboard (almirah)',
  'Water purifier',
  'Wi-Fi access',
  '24/7 CCTV monitoring',
]

const extraNotes = [
  'Confirm whether the room will be arranged for one or two occupants',
  'Confirm exactly what the monthly rent covers before booking',
]

const gallery = [
  image('01', 'assets/rooms/courtyard-solo-room/01.png', 'Study desk and built-in shelves beside the courtyard-side window.', 'Desk, shelves, and window'),
  image('02', 'assets/rooms/courtyard-solo-room/02.png', 'Single bed and study desk viewed from the room entrance.', 'Bed and study desk'),
  image('03', 'assets/rooms/courtyard-solo-room/03.png', 'Courtyard-side window viewed from outside the room.', 'Courtyard-side window'),
  image('1000074379', 'assets/rooms/courtyard-solo-room/1000074379.jpeg', 'Open courtyard window and the room entrance.', 'Window and entrance'),
  image('1000074383', 'assets/rooms/courtyard-solo-room/1000074383.jpeg', 'Single bed along the wall of the courtyard-side room.', 'Single bed'),
  image('1000074385', 'assets/rooms/courtyard-solo-room/1000074385.jpeg', 'Study desk and window seen through the room doorway.', 'View through the doorway'),
  image('1000074386', 'assets/rooms/courtyard-solo-room/1000074386.jpeg', 'Study desk and built-in wall shelves inside the room.', 'Desk and built-in shelves'),
]

export default defineRoom({
  id: 8,
  slug: 'courtyard-room',
  title: 'Courtyard-side room',
  summary:
    'Furnished room with a courtyard-side window and access to a shared kitchen and washroom.',
  fitSummary: 'Lower-rent room with courtyard-side light and shared facilities.',
  priceMonthly: 4299,
  available: true,
  featured: true,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single/double',
  occupancyLabel: 'Single or double occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Shared kitchen',
  washroomType: 'common',
  washroomLabel: 'Shared washroom',
  highlightLabel: 'Courtyard-side window',
  facingLabel: 'Courtyard-side',
  bestFor: 'One or two occupants who are comfortable using a shared kitchen and washroom.',
  included,
  extraNotes,
  visitNextStep: 'Send the room ID on WhatsApp or call to confirm availability and arrange a visit.',
  gallery,
})
