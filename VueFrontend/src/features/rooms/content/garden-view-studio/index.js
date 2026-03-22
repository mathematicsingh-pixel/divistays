import { defineRoom, defineRoomSummary, image } from '../helpers.js'

const included = [
  'Furnished sleeping and study basics',
  'High-speed WiFi support',
  'Water purifier',
  '24x7 CCTV support',
]

const extraNotes = [
  'Private kitchen setup inside the room',
  'Utility aangan access',
]

const coverImage = {
  key: '01',
  alt: 'Garden-view studio room with bed, desk, and open floor area.',
}

export const roomSummary = defineRoomSummary({
  id: 2,
  slug: 'garden-view-studio',
  title: 'Garden-view studio apartment',
  summary:
    'A larger studio option with a private kitchen, attached washroom, and enough space for double or triple student sharing.',
  fitSummary: 'Share-friendly studio with extra floor area and a private kitchen setup.',
  priceMonthly: 7999,
  available: true,
  featured: true,
  updatedAt: '2026-03-11',
  availabilityUpdatedAt: '2026-03-13',
  occupancy: 'flex',
  occupancyLabel: 'Double / triple occupancy',
  kitchenType: 'private',
  kitchenLabel: 'Private kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Best for sharing',
  bestFor: 'Students who want more floor area for sharing without losing a private kitchen.',
  included,
  extraNotes,
  galleryCount: 7,
  gallery: [coverImage],
})

const gallery = [
    image('01', 'assets/rooms/garden-view-studio/01.jpg', 'Garden-view studio room with bed, desk, and open floor area.', 'Spacious share setup'),
    image('02', 'assets/rooms/garden-view-studio/02.jpg', 'Desk and bed arrangement inside the garden-view studio.', 'Study desk angle'),
    image('03', 'assets/rooms/garden-view-studio/03.jpg', 'Wide interior view of the garden-view studio apartment.', 'Wide interior'),
    image('04', 'assets/rooms/garden-view-studio/04.jpg', 'Another angle showing floor area inside the garden-view studio.', 'Room depth'),
    image('05', 'assets/rooms/garden-view-studio/05.jpg', 'Bed-side perspective inside the garden-view studio.', 'Bed-side view'),
    image('06', 'assets/rooms/garden-view-studio/06.jpg', 'Furniture and circulation area inside the garden-view studio.', 'Circulation space'),
    image('07', 'assets/rooms/garden-view-studio/07.jpg', 'Studio entry-side angle showing the practical student setup.', 'Entry-side view'),
]

export default defineRoom({
  ...roomSummary,
  featured: true,
  facingLabel: 'Garden-side feel',
  visitNextStep: 'Call or WhatsApp before visiting so CozyRooms can confirm the current sharing setup.',
  gallery,
})
