import { defineRoom, image } from '../helpers.js'

const included = [
  'Single bed, study desk, and chair',
  'Attached washroom',
  'Common kitchen access',
  'Bright window-side setup',
]

const extraNotes = [
  'Photos will be updated after a live room capture',
  'Ask for the closest matching currently open room',
]

const gallery = [
  image('01', 'assets/rooms/sunlit-study-single/01.png', 'Sunlit single room with bed, desk, chair, and attached washroom door.', 'Sunlit study setup'),
]

export default defineRoom({
  id: 7,
  slug: 'sunlit-study-single',
  title: 'Sunlit study single room',
  summary:
    'Single room listing with an attached washroom, common kitchen access, and a brighter study-first layout for solo stays.',
  fitSummary: 'Single setup with attached washroom and a brighter desk zone.',
  priceMonthly: 4699,
  available: true,
  featured: false,
  updatedAt: '2026-03-29',
  availabilityUpdatedAt: '2026-03-29',
  occupancy: 'single',
  occupancyLabel: 'Single occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Common kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Study-first single',
  facingLabel: 'Morning-light feel',
  bestFor: 'Anyone who wants an available single room with attached washroom access and a cleaner desk corner.',
  included,
  extraNotes,
  visitNextStep: 'Call or WhatsApp the room name to confirm the live room behind this listing before you visit.',
  gallery,
})
