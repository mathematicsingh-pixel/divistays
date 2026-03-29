import { defineRoom, image } from '../helpers.js'

const included = [
  'Two single beds with study surfaces',
  'Attached washroom',
  'Private kitchenette',
  'Open floor strip for shared use',
]

const extraNotes = [
  'Photos will be updated after a live room capture',
  'Ask whether the current setup is best for double or flexible sharing',
]

const gallery = [
  image('01', 'assets/rooms/shared-loft-studio/01.png', 'Share-ready studio with two single beds, compact kitchenette, and attached washroom door.', 'Share-ready studio overview'),
]

export default defineRoom({
  id: 9,
  slug: 'shared-loft-studio',
  title: 'Shared loft studio',
  summary:
    'Share-ready studio listing with an attached washroom, compact private kitchenette, and enough floor depth for a comfortable two-person setup.',
  fitSummary: 'Available studio for two people with a private kitchenette and attached washroom.',
  priceMonthly: 7199,
  available: true,
  featured: false,
  updatedAt: '2026-03-29',
  availabilityUpdatedAt: '2026-03-29',
  occupancy: 'double',
  occupancyLabel: 'Double occupancy',
  kitchenType: 'private',
  kitchenLabel: 'Private kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Share-ready setup',
  facingLabel: 'Open interior feel',
  bestFor: 'Two people who want an available studio layout with a self-contained kitchen corner.',
  included,
  extraNotes,
  visitNextStep: 'Call or WhatsApp the room name to confirm the exact currently open shared studio before you visit.',
  gallery,
})
