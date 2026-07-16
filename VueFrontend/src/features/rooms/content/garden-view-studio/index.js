import { defineRoom, image } from '../helpers.js'

const included = [
  'Bed, study table, and storage',
  'Private kitchen',
  'Attached washroom',
  'Wi-Fi access',
  'Water purifier',
  '24/7 CCTV monitoring',
  'Shared utility courtyard (aangan)',
]

const extraNotes = [
  'Confirm how the room will be arranged for two or three occupants',
  'Confirm exactly what the monthly rent covers before booking',
]

const gallery = [
  image('01', 'assets/rooms/garden-view-studio/01.jpg', 'Garden-view studio with a bed, study table, and open floor area.', 'Main studio layout'),
  image('02', 'assets/rooms/garden-view-studio/02.jpg', 'Furnished room seen through the garden-side glass doors.', 'Garden-side entrance'),
  image('03', 'assets/rooms/garden-view-studio/03.jpg', 'Study table and chair beside the room door.', 'Study table and door'),
  image('04', 'assets/rooms/garden-view-studio/04.jpg', 'Bed and study area facing the garden-side window.', 'Room and garden-side window'),
  image('05', 'assets/rooms/garden-view-studio/05.jpg', 'Toilet and water heater inside the attached washroom.', 'Attached washroom'),
  image('06', 'assets/rooms/garden-view-studio/06.jpg', 'Basin and toilet inside the attached washroom.', 'Washroom basin'),
  image('07', 'assets/rooms/garden-view-studio/07.jpg', 'Open display shelves against the room wall.', 'Display shelves'),
]

export default defineRoom({
  id: 2,
  slug: 'garden-view-studio',
  title: 'Garden-view studio apartment',
  summary:
    'Larger furnished studio with a private kitchen, attached washroom, and space for two or three occupants.',
  fitSummary: 'Private kitchen and attached washroom, with room for sharing.',
  priceMonthly: 7999,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'flex',
  occupancyLabel: 'Double or triple occupancy',
  kitchenType: 'private',
  kitchenLabel: 'Private kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Room for two or three',
  facingLabel: 'Garden side',
  bestFor: 'Two or three occupants who want more floor space and private kitchen and washroom facilities.',
  included,
  extraNotes,
  visitNextStep: 'Send the room ID on WhatsApp or call to confirm availability and the current occupancy arrangement.',
  gallery,
})
