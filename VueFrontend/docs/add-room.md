# Add a Room

Use this flow inside `VueFrontend`. Ignore the old `Frontend` folder.

## Files to touch

- `assets/rooms/<room-slug>/`: raw source images and videos
- `src/features/rooms/content/<room-slug>/index.js`: room definition
- `src/features/rooms/content/registry.js`: import + catalog order

`registry.js` order drives:

- rooms listing order
- generated room routes
- sitemap order
- media build order

## Step by step

1. Pick a new unique `id` and kebab-case `slug`.
2. Add raw media in `assets/rooms/<room-slug>/`.
3. Create `src/features/rooms/content/<room-slug>/index.js`.
4. Export the room with `defineRoom(...)`.
5. Add the new import and entry in `src/features/rooms/content/registry.js`.
6. Run `npm run validate:rooms`.
7. Run `npm run build`.

## Required room shape

The validator in `scripts/validate-room-catalog.mjs` requires these fields:

- `id`, `slug`, `title`
- `summary`, `fitSummary`
- `priceMonthly`
- `available`, `featured`
- `updatedAt`, `availabilityUpdatedAt`
- `occupancy`, `occupancyLabel`
- `kitchenType`, `kitchenLabel`
- `washroomType`, `washroomLabel`
- `highlightLabel`, `facingLabel`
- `bestFor`
- `included`, `extraNotes`
- `visitNextStep`
- `gallery`

Each gallery item needs:

- `key`
- `source`
- `alt`
- `caption`

Optional:

- `video`, with `key`, `source`, `label`

## Media rules

- `gallery` must have at least one image.
- `key` values must be unique inside that room.
- `source` must point to a real local file under `VueFrontend`.
- Raw image format can be `.jpg`, `.png`, etc. The build step generates responsive `avif`, `webp`, and `jpg` variants into `public/media/rooms/<room-slug>/`.
- Raw video goes through `ffmpeg` and gets an mp4 + poster image.

## Example: `sample-study-single`

This repo now includes a working example:

- room file: `src/features/rooms/content/sample-study-single/index.js`
- raw image: `assets/rooms/sample-study-single/01.png`

```js
import { defineRoom, image } from '../helpers.js'

export default defineRoom({
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
  facingLabel: 'Daylit interior',
  bestFor: 'Students who want a simple single room with an attached washroom at a modest monthly rent.',
  included: [
    'Single bed, study desk, and chair',
    'Attached washroom',
    'Common kitchen access',
    'Open shelving',
  ],
  extraNotes: [
    'Sample room added as a content reference',
    'Swap copy, price, and media before using in production',
  ],
  visitNextStep: 'Replace this placeholder visit note with the real contact instruction before publishing.',
  gallery: [
    image('01', 'assets/rooms/sample-study-single/01.png', 'Daylit sample single room with bed, desk, and attached washroom door.', 'Sample single room'),
  ],
})
```

## Common mistakes

- Reusing an existing `id` or `slug`
- Forgetting the registry import
- Typing a `source` path that does not exist
- Leaving `gallery` empty
- Missing `updatedAt` or `availabilityUpdatedAt`
- Skipping `npm run validate:rooms` before build
