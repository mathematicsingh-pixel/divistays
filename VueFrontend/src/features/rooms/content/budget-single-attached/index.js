import { defineRoom, image, video } from '../helpers.js'

const included = [
  'Compact furnished setup',
  'Attached washroom',
  'Common kitchen access',
  'Utility aangan access',
  'Book Rack',
  'Water Purifier',
  'Wi-fi',
  '24x7 CCTV support',
]

const extraNotes = [
  'Nearby tiffin options',
  'Ask for the nearest currently available budget room',
]

const gallery = [
  image('01', 'assets/rooms/budget-single-attached/01.jpg', 'Budget single room with narrow bed and compact desk zone.', 'Budget single setup'),
  image('02', 'assets/rooms/budget-single-attached/02.jpg', 'Single room angle showing the sleeping area and study table.', 'Sleeping area'),
  image('03', 'assets/rooms/budget-single-attached/03.jpg', 'Compact single-room layout with study desk and clean walls.', 'Desk and wall view'),
  image('04', 'assets/rooms/budget-single-attached/04.jpg', 'Another angle of the budget single room with attached washroom access nearby.', 'Alternate angle'),
  image('05', 'assets/rooms/budget-single-attached/05.jpg', 'Room entry view inside the budget single setup.', 'Entry view'),
  image('06', 'assets/rooms/budget-single-attached/06.jpg', 'Tighter view of the single room furniture arrangement.', 'Furniture layout'),
]

export default defineRoom({
  id: 4,
  slug: 'budget-single-attached',
  title: 'Budget single room',
  summary:
    'Entry-level single room with an attached washroom, common kitchen access, and a simpler stay format for budget-sensitive enquiries.',
  fitSummary: 'Single room with attached washroom for a tighter monthly budget.',
  priceMonthly: 4299,
  available: true,
  featured: false,
  updatedAt: '2026-07-15',
  availabilityUpdatedAt: '2026-07-15',
  occupancy: 'single',
  occupancyLabel: 'Single occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Common kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Attached washroom',
  facingLabel: 'Budget-focused',
  bestFor: 'Anyone who wants an attached washroom without moving into a higher rent band.',
  included,
  extraNotes,
  visitNextStep: 'Ask for a similar available budget room before you plan a visit.',
  gallery,
  video: video('tour', 'assets/rooms/budget-single-attached/tour.mp4', 'Budget single walkthrough'),
})
