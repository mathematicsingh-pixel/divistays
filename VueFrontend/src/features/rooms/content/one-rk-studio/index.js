import { defineRoom, image, video } from '../helpers.js'

const included = [
  'Bed, table, chair, and cupboard',
  'Water purifier',
  'Garden-facing ventilation',
  'Private kitchen',
  'Attached washroom',
  'Wi-Fi access',
  '24/7 CCTV monitoring',
]

const extraNotes = [
  'Confirm how the room will be arranged for two occupants',
  'Confirm exactly what the monthly rent covers before booking',
]

const gallery = [
  image('01', 'assets/rooms/one-rk-studio/01.jpg', 'Bed, window, and display shelf inside the 1 RK studio.', 'Bed and window'),
  image('02', 'assets/rooms/one-rk-studio/02.jpg', 'Study table and chair beside the bed.', 'Bed and study table'),
  image('03', 'assets/rooms/one-rk-studio/03.jpg', 'Open floor area leading toward the back of the studio.', 'Room depth'),
  image('04', 'assets/rooms/one-rk-studio/04.jpg', 'Display shelf between two recessed wall spaces.', 'Display shelf'),
  image('05', 'assets/rooms/one-rk-studio/05.jpg', 'Private kitchen counter and open shelving.', 'Private kitchen counter'),
  image('06', 'assets/rooms/one-rk-studio/06.jpg', 'Stainless-steel sink in the private kitchen.', 'Kitchen sink'),
  image('07', 'assets/rooms/one-rk-studio/07.jpg', 'Bed, study table, window, and display shelf inside the studio.', 'Full room layout'),
  image('08', 'assets/rooms/one-rk-studio/08.jpg', 'Toilet and tiled walls inside the attached washroom.', 'Attached washroom'),
  image('09', 'assets/rooms/one-rk-studio/09.jpg', 'Bed and display shelf viewed from the room entrance.', 'View from the entrance'),
]

export default defineRoom({
  id: 3,
  slug: 'one-rk-studio',
  title: '1 RK studio apartment',
  summary:
    'Furnished 1 RK studio with a private kitchen, attached washroom, and space for two occupants.',
  fitSummary: 'Private kitchen and attached washroom for double occupancy.',
  priceMonthly: 7999,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'double',
  occupancyLabel: 'Double occupancy',
  kitchenType: 'private',
  kitchenLabel: 'Private kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Private kitchen and washroom',
  facingLabel: 'Garden-facing',
  bestFor: 'Two occupants who want their own kitchen and attached washroom.',
  included,
  extraNotes,
  visitNextStep: 'Send the room ID on WhatsApp or call to confirm availability and arrange a visit.',
  gallery,
  video: video('tour', 'assets/rooms/one-rk-studio/tour.mp4', '1 RK studio video tour'),
})
