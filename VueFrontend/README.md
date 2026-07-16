# DiviStays VueFrontend

Feature-first Vue app. One room file per room. FAQ copy in one site data file.

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
3. Default-export the room with `defineRoom(...)`
4. Point each gallery/video `source` to `assets/rooms/<room-slug>/<file>`
5. Run `npm run validate:rooms`
6. Run `npm run build`

Room discovery is automatic from `src/features/rooms/content/*/index.js`.

These derive automatically:

- room listing
- room detail loading
- room routes
- room filters and counts
- footer room ticker
- sitemap input
- media build input

Default room sort:

- `featured` first
- then `available`
- then `id`

## Edit FAQs

Edit `src/features/site/content/faqs.js`.

That file feeds:

- FAQ section copy
- `siteConfig.faqs`
- FAQ structured data output

## Checks

- `npm run validate:rooms`: room content validation
- `npm run build`: validate, build media, generate static site
- `npm run build:production`: validate the public HTTPS origin and generate the release build

The canonical production origin is `https://divistays.com`. It is shared by page metadata,
structured data, `sitemap.xml`, and `robots.txt`. Set `VITE_SITE_URL` only when a staging build
needs to override that origin.

## Design system

UI source of truth: [`docs/ui-style-guide.md`](docs/ui-style-guide.md)

Agent rules: [`AGENTS.md`](../AGENTS.md) (root) — includes UI constraints.

Current audit: [`docs/ui-audit.md`](docs/ui-audit.md)
