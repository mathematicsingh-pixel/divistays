import { defineRoom, image } from '../helpers.js'

const included = [
  'Bed and study desk',
  'Attached washroom',
  'Private kitchenette',
  'Open floor space beside the bed',
  'Water purifier',
  'Wi-Fi access',
  '24/7 CCTV monitoring',
  'Storage cupboard (almirah)',
]

const extraNotes = [
  'Confirm the bed arrangement before you visit',
  'Confirm exactly what the monthly rent covers before booking',
]

const gallery = [
  image('01', 'assets/rooms/shared-loft-studio/01.png', 'Garden-side doorway and window at the room entrance.', 'Garden-side entrance'),
  image('IMG_7189', 'assets/rooms/shared-loft-studio/IMG_7189.jpg', 'Bed and open floor space leading to the garden-side doorway.', 'Bed and garden-side doorway'),
  image('IMG_7191', 'assets/rooms/shared-loft-studio/IMG_7191.jpg', 'Bed, shelving, and floor space inside the garden-side room.', 'Bed and shelving'),
  image('IMG_7192', 'assets/rooms/shared-loft-studio/IMG_7192.jpg', 'Study desk and chair against the room wall.', 'Study desk'),
  image('IMG_7194', 'assets/rooms/shared-loft-studio/IMG_7194.jpg', 'Bed and shelving viewed through the room doorway.', 'View from the doorway'),
  image('IMG_7196', 'assets/rooms/shared-loft-studio/IMG_7196.jpg', 'Entrance to the attached washroom beside the study desk.', 'Washroom entrance'),
  image('IMG_7197', 'assets/rooms/shared-loft-studio/IMG_7197.jpg', 'Wall-mounted basin inside the attached washroom.', 'Washroom basin'),
  image('IMG_7199', 'assets/rooms/shared-loft-studio/IMG_7199.jpg', 'Toilet and tiled walls inside the attached washroom.', 'Attached washroom'),
]

export default defineRoom({
  id: 9,
  slug: 'garden-room-kitchenette',
  title: 'Garden-side room with kitchenette',
  summary:
    'Furnished garden-side room with a bed, private kitchenette, and attached washroom.',
  fitSummary: 'Private kitchenette and attached washroom for one or two occupants.',
  priceMonthly: 5499,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single/double',
  occupancyLabel: 'Single or double occupancy',
  kitchenType: 'private',
  kitchenLabel: 'Private kitchenette',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Private kitchenette and washroom',
  facingLabel: 'Garden side',
  bestFor: 'One or two occupants who want a private kitchenette and attached washroom.',
  included,
  extraNotes,
  visitNextStep: 'Send the room ID on WhatsApp or call to confirm availability and arrange a visit.',
  gallery,
})
