import { defineRoom, image } from '../helpers.js'

const included = [
  'Single bed, study desk, and chair',
  'Attached washroom',
  'Shared kitchen access',
  'Window beside the study area',
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
  image('1', 'assets/rooms/sunlit-study-single/1.png', 'Large grilled window with study surfaces on both sides.', 'Window and study area'),
  image('1000075136', 'assets/rooms/sunlit-study-single/1000075136.jpeg', 'Study table and open shelving inside the bright room.', 'Desk and shelving'),
  image('1000075145', 'assets/rooms/sunlit-study-single/1000075145.jpeg', 'Bed, study table, and large window inside the room.', 'Bed, desk, and window'),
  image('IMG_7152', 'assets/rooms/sunlit-study-single/IMG_7152.jpg', 'Room doorway and passage viewed from outside.', 'Room entrance'),
  image('IMG_7155', 'assets/rooms/sunlit-study-single/IMG_7155.jpg', 'Bed, storage cupboard, and open shelving inside the room.', 'Bed and storage'),
  image('IMG_7161', 'assets/rooms/sunlit-study-single/IMG_7161.jpg', 'Study table and chair against the tiled wall.', 'Study table'),
  image('IMG_7163', 'assets/rooms/sunlit-study-single/IMG_7163.jpg', 'Study table beside the large grilled window.', 'Window-side desk'),
  image('IMG_7167', 'assets/rooms/sunlit-study-single/IMG_7167.jpg', 'Room door and passage viewed from the study area.', 'Door and passage'),
  image('IMG_7169', 'assets/rooms/sunlit-study-single/IMG_7169.jpg', 'Large grilled window viewed from outside the room.', 'Exterior window view'),
]

export default defineRoom({
  id: 7,
  slug: 'bright-room-attached-washroom',
  title: 'Bright room with attached washroom',
  summary:
    'Furnished room with a window-side study area, attached washroom, and access to a shared kitchen.',
  fitSummary: 'Bright study area, attached washroom, and shared kitchen access.',
  priceMonthly: 5999,
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
  highlightLabel: 'Window-side study area',
  facingLabel: 'Bright window',
  bestFor: 'One or two occupants who want a bright study area and an attached washroom.',
  included,
  extraNotes,
  visitNextStep: 'Send the room ID on WhatsApp or call to confirm availability and arrange a visit.',
  gallery,
})
