import { defineRoom, image, video } from '../helpers.js'

const included = [
  'Two single beds with study surfaces',
  'Attached washroom',
  'Private kitchenette',
  'Open floor strip for shared use',
  'Water Purifier',
  'Wi-fi',
  '24x7 CCTV support',
  'Almirah',
]

const extraNotes = [
  'Photos will be updated after a live room capture',
  'Ask whether the current setup is best for double or flexible sharing',
]

const gallery = [
  image('01', 'assets/rooms/shared-loft-studio/01.png', 'Share-ready studio with two single beds, compact kitchenette, and attached washroom door.', 'Share-ready studio overview'),
  image('IMG_7189', 'assets/rooms/shared-loft-studio/IMG_7189.jpg', 'Alternate view of the shared loft studio.', 'Alternate studio view'),
  image('IMG_7191', 'assets/rooms/shared-loft-studio/IMG_7191.jpg', 'Interior detail of the shared loft studio.', 'Interior detail'),
  image('IMG_7192', 'assets/rooms/shared-loft-studio/IMG_7192.jpg', 'Additional view of the shared loft studio.', 'Studio interior'),
  image('IMG_7194', 'assets/rooms/shared-loft-studio/IMG_7194.jpg', 'Shared loft studio room angle.', 'Room angle'),
  image('IMG_7196', 'assets/rooms/shared-loft-studio/IMG_7196.jpg', 'Further interior view of the shared loft studio.', 'Additional interior'),
  image('IMG_7197', 'assets/rooms/shared-loft-studio/IMG_7197.jpg', 'Shared loft studio detail.', 'Studio detail'),
  image('IMG_7199', 'assets/rooms/shared-loft-studio/IMG_7199.jpg', 'Final view of the shared loft studio.', 'Final studio view'),
]

export default defineRoom({
  id: 9,
  slug: 'shared-loft-studio',
  title: 'Gardenside spacious room',
  summary:
    'Gardenside listing with an attached washroom and enough floor depth for a comfortable two-person setup.',
  fitSummary: 'Available studio for two people with a private kitchenette and attached washroom.',
  priceMonthly: 5499,
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
  highlightLabel: 'Gardenside spacious room',
  facingLabel: 'Open interior feel',
  bestFor: 'A person who wants a gardenside quiet room with an attached washroom.',
  included,
  extraNotes,
  visitNextStep: 'Call or WhatsApp the room name to confirm the exact currently open shared studio before you visit.',
  gallery,
  video: video('tour', 'assets/rooms/shared-loft-studio/tour.mp4', 'Shared loft walkthrough'),
})
