import { defineRoom, image } from '../helpers.js'

const included = [
  'Single bed, study desk, and chair',
  'Attached washroom',
  'Common kitchen access',
  'Bright window-side setup',
  'Water Purifier',
  'Wi-fi',
  '24x7 CCTV support',
  'Almirah',
]

const extraNotes = [
  'Photos will be updated after a live room capture',
  'Ask for the closest matching currently open room',
]

const gallery = [
  image('1', 'assets/rooms/sunlit-study-single/1.png', 'Sunlit single room with bed, desk, chair, and attached washroom door.', 'Sunlit study setup'),
  image('1000075136', 'assets/rooms/sunlit-study-single/1000075136.jpeg', 'Alternate view of the sunlit study single room.', 'Alternate room view'),
  image('1000075145', 'assets/rooms/sunlit-study-single/1000075145.jpeg', 'Interior detail of the sunlit study single room.', 'Interior detail'),
  image('IMG_7152', 'assets/rooms/sunlit-study-single/IMG_7152.jpg', 'Additional view of the sunlit study single room.', 'Room view'),
  image('IMG_7155', 'assets/rooms/sunlit-study-single/IMG_7155.jpg', 'Sunlit study room interior.', 'Study interior'),
  image('IMG_7161', 'assets/rooms/sunlit-study-single/IMG_7161.jpg', 'Further view of the sunlit study single room.', 'Additional interior'),
  image('IMG_7163', 'assets/rooms/sunlit-study-single/IMG_7163.jpg', 'Sunlit study room detail.', 'Room detail'),
  image('IMG_7167', 'assets/rooms/sunlit-study-single/IMG_7167.jpg', 'Alternate sunlit study room angle.', 'Alternate interior'),
  image('IMG_7169', 'assets/rooms/sunlit-study-single/IMG_7169.jpg', 'Final view of the sunlit study single room.', 'Final room view'),
]

export default defineRoom({
  id: 7,
  slug: 'sunlit-study-single',
  title: 'Ventilated spacious room',
  summary:
    'Room listing with an attached washroom, common kitchen access, and a brighter study-first layout for comfy stays.',
  fitSummary: 'Single setup with attached washroom and a brighter desk zone.',
  priceMonthly: 5999,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single/double',
  occupancyLabel: 'Single/Double occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Common kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Ventilated spacious room',
  facingLabel: 'Morning-light feel',
  bestFor: 'Anyone who wants a well ventilated room with attached washroom access and a clean desk corner.',
  included,
  extraNotes,
  visitNextStep: 'Call or WhatsApp the room name to confirm the live room behind this listing before you visit.',
  gallery,
})
