# CozyRooms VueFrontend

Feature-first Vue app. Room content lives in one place, so new room adds stay small.

## Structure

- `assets/rooms`: raw local source images/videos per room
- `src/app`: app entry, app shell, router
- `src/features/home`: home page + home-only sections
- `src/features/rooms`: room pages, room UI, room content, room model, media helpers
- `src/features/site`: site-wide nav, footer, brand, site config
- `src/shared`: shared UI + shared composables

## Add a new room

Detailed guide: `docs/add-room.md`

Quick path:

1. Create `src/features/rooms/content/<room-slug>/index.js`
2. Add raw files in `assets/rooms/<room-slug>/`
3. Export the room with `defineRoom(...)`
4. Point each gallery/video `source` to `assets/rooms/<room-slug>/<file>`
5. Add the import + entry in `src/features/rooms/content/registry.js`
6. Run `npm run validate:rooms`
7. Run `npm run build`

`registry.js` controls listing order, route order, sitemap order, and media build order.

## Checks

- `npm run validate:rooms`: room content validation
- `npm run build`: validate, build media, generate static site
