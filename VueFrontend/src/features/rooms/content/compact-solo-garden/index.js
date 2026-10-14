import { defineRoom, image, video } from '../helpers.js'

const included = [
  'Bed, table, chair, and cupboard',
  'Water purifier',
  'Garden-facing ventilation',
  'Shared kitchen access',
  'Private washroom (not attached) with shower, sink, and toilet',
  'Wi-Fi access',
  '24/7 CCTV monitoring',
]

const extraNotes = [
  'Confirm exactly what the monthly rent covers before booking',
]

const gallery = [
  image('01', 'assets/rooms/compact-solo-garden/01.jpg', 'Study table beneath the garden-facing window.', 'Window-side study table'),
  image('02', 'assets/rooms/compact-solo-garden/02.jpg', 'Single bed beside the window curtain.', 'Single bed'),
  image('03', 'assets/rooms/compact-solo-garden/03.jpg', 'Study table and shelving beside the bed in the compact room.', 'Desk and shelving'),
  image('04', 'assets/rooms/compact-solo-garden/04.jpg', 'Garden plants viewed from the room railing.', 'Garden view'),
  image('05', 'assets/rooms/compact-solo-garden/05.jpg', 'Shared utility courtyard with a clothes line and washing area.', 'Utility courtyard'),
  image('06', 'assets/rooms/compact-solo-garden/06.jpg', 'Single bed beside the entrance and window curtain.', 'Bed and entrance'),
  image('07', 'assets/rooms/compact-solo-garden/07.jpg', 'Bed, study table, and shelving inside the compact room.', 'Full room layout'),
  image('08', 'assets/rooms/compact-solo-garden/08.jpg', 'Study table surface beside indoor plants.', 'Study table'),
]

export default defineRoom({
  id: 5,
  slug: 'compact-garden-room',
  title: 'Compact garden-side room',
  summary:
    'Furnished single room with garden-side ventilation, shared kitchen access, and a private washroom nearby.',
  fitSummary: 'Lowest listed rent, with a private washroom (not attached) and shared kitchen access.',
  priceMonthly: 3999,
  available: false,
  featured: false,
  updatedAt: '2026-10-15',
  availabilityUpdatedAt: '2026-10-15',
  occupancy: 'single',
  occupancyLabel: 'Single occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Shared kitchen',
  washroomType: 'private',
  washroomLabel: 'Private washroom (not attached)',
  highlightLabel: 'Lowest monthly rent',
  facingLabel: 'Garden-facing',
  bestFor: 'Single occupancy on a lower budget with a private washroom nearby; kitchen access is shared.',
  included,
  extraNotes,
  visitNextStep: 'Send the room ID on WhatsApp or call to confirm availability and arrange a visit.',
  gallery,
  video: video('tour', 'assets/rooms/compact-solo-garden/tour.mp4', 'Compact room video tour'),
})
