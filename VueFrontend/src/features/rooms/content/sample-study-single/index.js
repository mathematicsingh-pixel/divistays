import { defineRoom, defineRoomSummary, image } from '../helpers.js'

const included = [
  'Single bed, study desk, and chair',
  'Attached washroom',
  'Common kitchen access',
  'Open shelving',
]

const extraNotes = [
  'Sample room added as a content reference',
  'Swap copy, price, and media before using in production',
]

const coverImage = {
  key: '01',
  alt: 'Daylit sample single room with bed, desk, and attached washroom door.',
}

export const roomSummary = defineRoomSummary({
  id: 6,
  slug: 'sample-study-single',
  title: 'Daylit study single room',
  summary:
    'Example single room entry with an attached washroom, common kitchen access, and a straightforward study-first setup.',
  fitSummary: 'Example single setup with an attached washroom and simple furniture.',
  priceMonthly: 4299,
  available: false,
  featured: false,
  updatedAt: '2026-03-23',
  availabilityUpdatedAt: '2026-03-23',
  occupancy: 'single',
  occupancyLabel: 'Single occupancy',
  kitchenType: 'common',
  kitchenLabel: 'Common kitchen',
  washroomType: 'attached',
  washroomLabel: 'Attached washroom',
  highlightLabel: 'Simple single setup',
  bestFor: 'Students who want a simple single room with an attached washroom at a modest monthly rent.',
  included,
  extraNotes,
  galleryCount: 1,
  gallery: [coverImage],
})

const gallery = [
    image('01', 'assets/rooms/sample-study-single/01.png', 'Daylit sample single room with bed, desk, and attached washroom door.', 'Sample single room'),
]

export default defineRoom({
  ...roomSummary,
  featured: false,
  facingLabel: 'Daylit interior',
  visitNextStep: 'Replace this placeholder visit note with the real contact instruction before publishing.',
  gallery,
})
