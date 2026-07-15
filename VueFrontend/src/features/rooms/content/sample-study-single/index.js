import { defineRoom, image } from '../helpers.js'

const included = [
  'Single bed, study desk, and chair',
  'Attached washroom',
  'Common kitchen access',
  'Water Purifier',
  'Wi-fi',
  '24x7 CCTV support',
  'Almirah',
]

const extraNotes = [
  'Sample room added as a content reference',
  'Swap copy, price, and media before using in production',
]

const gallery = [
  image('1', 'assets/rooms/sample-study-single/1.png', 'Daylit sample single room with bed, desk, and attached washroom door.', 'Sample single room'),
  image('IMG_2252', 'assets/rooms/sample-study-single/IMG_2252.jpg', 'Alternate view of the daylit study single room.', 'Alternate room view'),
  image('IMG_2255', 'assets/rooms/sample-study-single/IMG_2255.jpg', 'Interior detail of the daylit study single room.', 'Interior detail'),
  image('02', 'assets/rooms/sample-study-single/02.png', 'Additional view of the daylit study single room.', 'Room view'),
]

export default defineRoom({
  id: 6,
  slug: 'sample-study-single',
  title: 'Spacious comfy room',
  summary:
    'Example single room entry with an attached washroom, common kitchen access, and a straightforward study-first setup.',
  fitSummary: 'Example single setup with an attached washroom and simple furniture.',
  priceMonthly: 5499,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single/double',
  occupancyLabel: 'Single/Double occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Kitchen setup',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Simple setup',
  facingLabel: 'Spacious room',
  bestFor: 'Anyone who wants a spacious room with an attached washroom and simple kitchen setup at a modest monthly rent.',
  included,
  extraNotes,
  visitNextStep: 'Replace this placeholder visit note with the real contact instruction before publishing.',
  gallery,
})
