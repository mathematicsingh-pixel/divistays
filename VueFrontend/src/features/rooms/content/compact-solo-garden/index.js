import { defineRoom, image, video } from '../helpers.js'

const included = [
  'Bed, table, chair, and cupboard',
  'Water purifier',
  'Garden-facing ventilation',
  'Common kitchen access',
]

const extraNotes = [
  'Common washroom support',
  'Ask about the closest available low-rent room',
]

const gallery = [
  image('01', 'assets/rooms/compact-solo-garden/01.jpg', 'Compact solo room with single bed and study desk near the wall.', 'Compact study layout'),
  image('02', 'assets/rooms/compact-solo-garden/02.jpg', 'Solo room angle showing bed placement and open floor strip.', 'Bed placement'),
  image('03', 'assets/rooms/compact-solo-garden/03.jpg', 'Alternative angle of the compact solo room with desk and shelving.', 'Desk-side angle'),
  image('04', 'assets/rooms/compact-solo-garden/04.jpg', 'Compact room close-up showing wall and furniture finish.', 'Closer finish view'),
  image('05', 'assets/rooms/compact-solo-garden/05.jpg', 'Another compact close-up from the solo room.', 'Close detail'),
  image('06', 'assets/rooms/compact-solo-garden/06.jpg', 'Wide interior view of the compact solo room.', 'Wide room view'),
  image('07', 'assets/rooms/compact-solo-garden/07.jpg', 'Bed-side angle inside the garden-facing solo room.', 'Bed-side view'),
  image('08', 'assets/rooms/compact-solo-garden/08.jpg', 'Final interior angle of the compact solo room.', 'Alternate interior'),
]

export default defineRoom({
  id: 5,
  slug: 'compact-solo-garden',
  title: 'Compact solo room',
  summary:
    'Small, efficient solo room with garden-facing ventilation, common kitchen access, and common washroom support.',
  fitSummary: 'Lowest-rent solo option with a compact footprint and shared facilities.',
  priceMonthly: 3499,
  available: false,
  featured: false,
  updatedAt: '2026-03-08',
  availabilityUpdatedAt: '2026-03-08',
  occupancy: 'single',
  occupancyLabel: 'Single occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Common kitchen',
  washroomType: 'common',
  washroomLabel: 'Common washroom',
  highlightLabel: 'Lowest monthly rent',
  facingLabel: 'Garden-facing',
  bestFor: 'Anyone who wants the lowest rent and is comfortable with shared kitchen and washroom access.',
  included,
  extraNotes,
  visitNextStep: 'Use the similar-room CTA to ask which low-rent room is open now.',
  gallery,
  video: video('tour', 'assets/rooms/compact-solo-garden/tour.mp4', 'Compact solo walkthrough'),
})
