import { defineRoom, defineRoomSummary, image } from '../helpers.js'

const included = [
  'Bed, study table, and chair',
  'High-speed WiFi support',
  'Water purifier',
  'Power backup',
]

const extraNotes = [
  'Private kitchen setup ready for personal utensils',
  'Utility aangan access',
]

const coverImage = {
  key: '01',
  alt: 'Vibrant studio with bed, kitchen counter, and attached washroom doorway.',
}

export const roomSummary = defineRoomSummary({
  id: 1,
  slug: 'vibrant-studio',
  title: 'Vibrant studio apartment',
  summary:
    'Sunlit studio layout with an attached washroom, private kitchen corner, and a furnished study-ready setup for two students.',
  fitSummary: 'Furnished studio setup for two students with a private kitchen corner.',
  priceMonthly: 7999,
  available: true,
  featured: true,
  updatedAt: '2026-03-12',
  availabilityUpdatedAt: '2026-03-13',
  occupancy: 'double',
  occupancyLabel: 'Double occupancy',
  kitchenType: 'private',
  kitchenLabel: 'Private kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Most balanced layout',
  bestFor: 'Two students who want a private kitchen and attached washroom.',
  included,
  extraNotes,
  galleryCount: 7,
  gallery: [coverImage],
})

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
  ...roomSummary,
  featured: true,
  facingLabel: 'Bright and airy',
  visitNextStep: 'WhatsApp the room name to confirm current availability and visiting time.',
  gallery,
})
