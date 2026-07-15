import { defineRoom, image } from '../helpers.js'

const included = [
  'Bed, study table, and chair',
  'High-speed WiFi support',
  'Water purifier',
  'Power backup',
  'Wi-fi',
  '24x7 CCTV support',
  'Almirah',
]

const extraNotes = [
  'Private kitchen setup ready for personal utensils',
  'Utility aangan access',
]

const gallery = [
  image('01', 'assets/rooms/vibrant-studio/01.jpg', 'Vibrant studio with bed, kitchen counter, and attached washroom doorway.', 'Open studio layout'),
  image('02', 'assets/rooms/vibrant-studio/02.jpg', 'Study corner and bed inside the vibrant studio room.', 'Study-ready furniture'),
  image('03', 'assets/rooms/vibrant-studio/03.jpg', 'Wide view of the vibrant studio showing floor area and room height.', 'Breathing room'),
  image('04', 'assets/rooms/vibrant-studio/04.jpg', 'Another angle of the studio showing bed placement and circulation space.', 'Bed placement'),
  image('05', 'assets/rooms/vibrant-studio/05.jpg', 'Kitchen-side angle inside the vibrant studio apartment.', 'Kitchen edge'),
  image('06', 'assets/rooms/vibrant-studio/06.jpg', 'Natural-light view inside the vibrant studio room.', 'Natural light'),
  image('07', 'assets/rooms/vibrant-studio/07.jpg', 'Room entry view inside the vibrant studio with attached facilities.', 'Entry perspective'),
]

export default defineRoom({
  id: 1,
  slug: 'vibrant-studio',
  title: 'Vibrant studio apartment',
  summary:
    'Sunlit studio layout with an attached washroom, private kitchen corner, and a furnished setup for two people.',
  fitSummary: 'Furnished studio setup for two people with a private kitchen corner.',
  priceMonthly: 7999,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single/double',
  occupancyLabel: 'Single/Double occupancy',
  kitchenType: 'private',
  kitchenLabel: 'Private kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Most balanced layout',
  facingLabel: 'Bright and airy',
  bestFor: 'Two people who want a private kitchen and attached washroom.',
  included,
  extraNotes,
  visitNextStep: 'WhatsApp the room name to confirm current availability and visiting time.',
  gallery,
})
