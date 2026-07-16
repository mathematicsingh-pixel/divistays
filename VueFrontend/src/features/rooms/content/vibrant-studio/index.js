import { defineRoom, image, video } from '../helpers.js'

const included = [
  'Bed, study table, and chair',
  'Private kitchen',
  'Attached washroom',
  'Wi-Fi access',
  'Water purifier',
  'Power backup',
  '24/7 CCTV monitoring',
  'Storage cupboard (almirah)',
  'Shared utility courtyard (aangan) access',
]

const extraNotes = [
  'Confirm which cooking items, if any, are provided',
  'Confirm exactly what the monthly rent covers before booking',
]

const gallery = [
  image('01', 'assets/rooms/vibrant-studio/01.jpg', 'Bed, private kitchen counter, and washroom door inside the studio.', 'Bed, kitchen, and washroom'),
  image('02', 'assets/rooms/vibrant-studio/02.jpg', 'Study table, chair, storage unit, and open shelves.', 'Study and storage area'),
  image('03', 'assets/rooms/vibrant-studio/03.jpg', 'Open floor area between the bed and study furniture.', 'Room depth'),
  image('04', 'assets/rooms/vibrant-studio/04.jpg', 'Private kitchen counter and stainless-steel sink.', 'Private kitchen'),
  image('05', 'assets/rooms/vibrant-studio/05.jpg', 'Toilet and tiled walls inside the attached washroom.', 'Attached washroom'),
  image('06', 'assets/rooms/vibrant-studio/06.jpg', 'Bed, kitchen counter, and study furniture inside the studio.', 'Furnished studio layout'),
  image('07', 'assets/rooms/vibrant-studio/07.jpg', 'Full studio layout viewed from beside the window.', 'Full room view'),
]

export default defineRoom({
  id: 1,
  slug: 'studio-private-kitchen',
  title: 'Studio apartment with private kitchen',
  summary:
    'Furnished studio apartment with a private kitchen, attached washroom, and space for one or two occupants.',
  fitSummary: 'Private kitchen and attached washroom for one or two occupants.',
  priceMonthly: 7999,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single/double',
  occupancyLabel: 'Single or double occupancy',
  kitchenType: 'private',
  kitchenLabel: 'Private kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Private kitchen and washroom',
  facingLabel: 'Bright interior',
  bestFor: 'One or two occupants who want their own kitchen and attached washroom.',
  included,
  extraNotes,
  visitNextStep: 'Send the room ID on WhatsApp or call to confirm availability and arrange a visit.',
  gallery,
  video: video('tour', 'assets/rooms/vibrant-studio/tour.mp4', 'Vibrant studio walkthrough'),
})
