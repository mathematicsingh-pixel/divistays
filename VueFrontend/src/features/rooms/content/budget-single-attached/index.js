import { defineRoom, image, video } from '../helpers.js'

const included = [
  'Single bed, study table, and chair',
  'Attached washroom',
  'Shared kitchen access',
  'Shared utility courtyard (aangan)',
  'Book rack',
  'Water purifier',
  'Wi-Fi access',
  '24/7 CCTV monitoring',
]

const extraNotes = [
  'Tiffin services are available nearby',
  'Confirm exactly what the monthly rent covers before booking',
]

const gallery = [
  image('01', 'assets/rooms/budget-single-attached/01.jpg', 'Single bed and study table inside the budget room.', 'Bed and study table'),
  image('02', 'assets/rooms/budget-single-attached/02.jpg', 'Wall-mounted basin inside the attached washroom.', 'Washroom basin'),
  image('03', 'assets/rooms/budget-single-attached/03.jpg', 'Single bed beside the study table and chair.', 'Sleeping and study area'),
  image('04', 'assets/rooms/budget-single-attached/04.jpg', 'Toilet and tiled walls inside the attached washroom.', 'Attached washroom'),
  image('05', 'assets/rooms/budget-single-attached/05.jpg', 'Window, storage table, and room doors along the passage.', 'Window and room doors'),
  image('06', 'assets/rooms/budget-single-attached/06.jpg', 'Window and room door beside the foot of the single bed.', 'Bed, window, and door'),
]

export default defineRoom({
  id: 4,
  slug: 'budget-single-attached',
  title: 'Budget single room',
  summary:
    'Furnished single room with an attached washroom, shared kitchen access, and a lower monthly rent.',
  fitSummary: 'Single occupancy with an attached washroom and shared kitchen.',
  priceMonthly: 4299,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single',
  occupancyLabel: 'Single occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Shared kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Attached washroom',
  facingLabel: 'Lower-rent option',
  bestFor: 'Single occupancy with an attached washroom at a lower monthly rent.',
  included,
  extraNotes,
  visitNextStep: 'Send the room ID on WhatsApp or call to confirm availability and arrange a visit.',
  gallery,
  video: video('tour', 'assets/rooms/budget-single-attached/tour.mp4', 'Budget single walkthrough'),
})
