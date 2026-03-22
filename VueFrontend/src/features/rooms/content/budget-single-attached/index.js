import { defineRoom, image } from '../helpers.js'

export default defineRoom({
  id: 4,
  slug: 'budget-single-attached',
  title: 'Budget single room',
  summary:
    'Entry-level single student room with an attached washroom, common kitchen access, and a simpler stay format for budget-sensitive enquiries.',
  fitSummary: 'Single room with attached washroom for a tighter monthly budget.',
  priceMonthly: 3999,
  available: false,
  featured: false,
  updatedAt: '2026-03-09',
  availabilityUpdatedAt: '2026-03-09',
  occupancy: 'single',
  occupancyLabel: 'Single occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Common kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Attached washroom',
  facingLabel: 'Budget-focused',
  bestFor: 'Students who want an attached washroom without moving into a higher rent band.',
  included: [
    'Compact furnished setup',
    'Attached washroom',
    'Common kitchen access',
    'Utility aangan access',
  ],
  extraNotes: [
    'Nearby tiffin options',
    'Ask for the nearest currently available budget room',
  ],
  visitNextStep: 'Ask for a similar available budget room before you plan a visit.',
  gallery: [
    image('01', 'assets/rooms/budget-single-attached/01.jpg', 'Budget single room with narrow bed and compact desk zone.', 'Budget single setup'),
    image('02', 'assets/rooms/budget-single-attached/02.jpg', 'Single room angle showing the sleeping area and study table.', 'Sleeping area'),
    image('03', 'assets/rooms/budget-single-attached/03.jpg', 'Compact single-room layout with study desk and clean walls.', 'Desk and wall view'),
    image('04', 'assets/rooms/budget-single-attached/04.jpg', 'Another angle of the budget single room with attached washroom access nearby.', 'Alternate angle'),
    image('05', 'assets/rooms/budget-single-attached/05.jpg', 'Room entry view inside the budget single setup.', 'Entry view'),
    image('06', 'assets/rooms/budget-single-attached/06.jpg', 'Tighter view of the single room furniture arrangement.', 'Furniture layout'),
  ],
})
