import { defineRoom, image } from '../helpers.js'

const included = [
  'Single bed, study desk, and chair',
  'Attached washroom',
  'Shared kitchen access',
  'Water purifier',
  'Wi-Fi access',
  '24/7 CCTV monitoring',
  'Storage cupboard (almirah)',
]

const extraNotes = [
  'Confirm whether the room will be arranged for one or two occupants',
  'Confirm exactly what the monthly rent covers before booking',
]

const gallery = [
  image('1', 'assets/rooms/sample-study-single/1.png', 'Spacious furnished room with a bed, desk, storage, and a large window.', 'Bed, desk, and window'),
  image('IMG_2252', 'assets/rooms/sample-study-single/IMG_2252.jpg', 'Study desk, storage unit, and large window viewed from the bed.', 'Desk and window'),
  image('IMG_2255', 'assets/rooms/sample-study-single/IMG_2255.jpg', 'Wall-mounted basin inside the attached washroom.', 'Attached washroom basin'),
  image('02', 'assets/rooms/sample-study-single/02.png', 'Bed, study desk, chair, and storage inside the spacious room.', 'Full room layout'),
]

export default defineRoom({
  id: 6,
  slug: 'spacious-study-room',
  title: 'Spacious study room',
  summary:
    'Furnished room with a large window, study desk, attached washroom, and access to a shared kitchen.',
  fitSummary: 'Extra floor space, an attached washroom, and a shared kitchen.',
  priceMonthly: 5499,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single/double',
  occupancyLabel: 'Single or double occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Shared kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Large window and study desk',
  facingLabel: 'Large window',
  bestFor: 'One or two occupants who want more floor space and an attached washroom.',
  included,
  extraNotes,
  visitNextStep: 'Send the room ID on WhatsApp or call to confirm availability and arrange a visit.',
  gallery,
})
