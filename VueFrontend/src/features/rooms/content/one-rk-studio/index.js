import { defineRoom, image, video } from '../helpers.js'

const included = [
  'Bed, table, chair, and cupboard',
  'Water purifier',
  'Garden-facing ventilation',
  'Private kitchen setup',
]

const extraNotes = [
  'Currently occupied',
  'Ask for the nearest available private-kitchen option',
]

const gallery = [
  image('01', 'assets/rooms/one-rk-studio/01.jpg', '1 RK studio view with bed and long interior layout.', 'Main room view'),
  image('02', 'assets/rooms/one-rk-studio/02.jpg', 'Study furniture and room depth inside the 1 RK studio.', 'Work corner'),
  image('03', 'assets/rooms/one-rk-studio/03.jpg', 'Kitchen-side view inside the 1 RK studio.', 'Kitchen side'),
  image('04', 'assets/rooms/one-rk-studio/04.jpg', 'Wide interior angle showing furnished 1 RK layout.', 'Wide interior'),
  image('05', 'assets/rooms/one-rk-studio/05.jpg', 'Bed and storage alignment inside the 1 RK room.', 'Sleeping zone'),
  image('06', 'assets/rooms/one-rk-studio/06.jpg', 'Clean line-of-sight across the 1 RK studio.', 'Open sightline'),
  image('07', 'assets/rooms/one-rk-studio/07.jpg', 'Room corner view of the 1 RK setup.', 'Corner angle'),
  image('08', 'assets/rooms/one-rk-studio/08.jpg', 'Alternate room angle used in the 1 RK listing.', 'Alternate angle'),
  image('09', 'assets/rooms/one-rk-studio/09.jpg', 'Another full-room angle showing the size of the 1 RK layout.', 'Extra room angle'),
]

export default defineRoom({
  id: 3,
  slug: 'one-rk-studio',
  title: '1 RK studio apartment',
  summary:
    'Furnished 1 RK-style stay with a private kitchen, attached washroom, and a room layout that works well for a double setup.',
  fitSummary: '1 RK-style setup for anyone who wants a more self-contained room.',
  priceMonthly: 7999,
  available: false,
  featured: false,
  updatedAt: '2026-03-10',
  availabilityUpdatedAt: '2026-03-10',
  occupancy: 'double',
  occupancyLabel: 'Double occupancy',
  kitchenType: 'private',
  kitchenLabel: 'Private kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Private 1 RK feel',
  facingLabel: 'Garden-facing',
  bestFor: 'Two people who want a more self-contained 1 RK-style setup.',
  included,
  extraNotes,
  visitNextStep: 'Use the room page CTA to ask for the closest available match before you plan a visit.',
  gallery,
  video: video('tour', 'assets/rooms/one-rk-studio/tour.mp4', '1 RK walkthrough'),
})
