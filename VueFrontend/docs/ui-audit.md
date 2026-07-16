# UI Audit — DiviStays 2026–27 Evolution

Implementation record for the mature, mobile-first evolution on `codex/mature-modern-2027`.

## Baseline

The previous interface had a recognizable deep-navy, orange, mint, Syne, and Manrope identity, plus strong room data and SSG foundations. It also let interface effects overpower the inventory:

- 48 gradients, 41 shadows, 39 literal radii, 23 animation declarations, and 17 backdrop filters.
- A 982-line hero placed animated chrome, proof cards, and three actions before meaningful room media on mobile.
- Room cards repeated links and controls while showing more than ten competing facts.
- The catalogue opened with nested panels and no page-level `h1`.
- Mobile navigation was context-blind and hidden with opacity while remaining keyboard-focusable.
- Room detail nested the gallery and facts inside multiple surfaces, with pinch/swipe hints and problematic nested interaction semantics.
- Decorative hero, phone-ring, amenity, and footer ticker loops conflicted with the written “restrained, room-first” principles.

## Direction adopted

**Urban garden rooms with night-time confidence:** solid ink architecture, warm light content planes, orange actions, mint availability, Syne display headings, Manrope interface text, and real room photography at meaningful scale.

Content order is now:

1. Real room media and a concise proposition.
2. Monthly rent, availability, and private/shared setup.
3. Factual proof and approximate location.
4. Visit process, FAQs, and direct contact.

Interaction order is now:

1. Stable responsive header.
2. Whole-card room navigation.
3. Compact catalogue controls with staged mobile filters.
4. Explicit, keyboard-operable gallery controls.
5. One consistent mobile action tray.

## Resolved system issues

### Surfaces and geometry

- Canonical surfaces remain `surface-card`, `surface-input`, `surface-dark`, and `overlay-backdrop`.
- Glass tints, ambient glows, blur-heavy content cards, and stacked surfaces are retired.
- Cards use `--radius-lg`; controls use `--radius-md`; full rounding is reserved for small status/reference and circular icon controls.
- Rules and spacing replace most elevation. Shadows remain on selectable cards and overlays only.

### Type and color

- Syne is limited to `h1` and `h2`.
- Manrope handles wordmark, navigation, cards, facts, and controls.
- Orange is a solid primary action, not a gradient or decoration.
- Mint is availability/status only.
- A dual-contrast focus treatment works across light and dark planes.

### Motion

Retained:

- One brief page/hero reveal.
- Gallery/sheet/dialog continuity.
- Pointer hover and press feedback.

Retired:

- Hero shimmer, orbit, glow, button shine, phone rings.
- Amenity and room marquees.
- Decorative infinite animation.

### Navigation and conversion

- One real sticky header serves every route.
- Mobile exposes Home, Rooms, and Call without a hidden drawer.
- Desktop keeps Home, Rooms, Location, FAQs, and Call in a stable order.
- Redundant breadcrumb strips stay out of mobile and tablet layouts; catalogue and room content begin immediately below the primary header.
- A skip link moves both scroll position and keyboard focus to the focusable `#main-content` landmark.
- The mobile action tray is removed from the tab order when hidden, remains mounted for reliable focus restoration, and defers on the home opening view.

### Room discovery

- A room card now has one destination link.
- Photography uses a 4:3 decision-friendly crop.
- Visible card facts are limited to title, price/status, occupancy, kitchen, washroom, and one concise fit line.
- Repeated orange “View room” and quick-preview buttons are removed.

### Catalogue

- `/rooms` has a real `h1`.
- Result count, availability, sort, and filters live in one compact toolbar.
- Mobile filter choices are local drafts until “Show rooms.”
- Filter query updates use history replacement and no longer reset scroll position.
- Filter groups use semantic `fieldset`/`legend` labelling.

### Detail and overlays

- Gallery is the first mobile decision surface, with explicit count, buttons, and an over-image full-screen action. The viewer stays edge-to-edge on every breakpoint.
- Facts use open definition rows rather than nested cards.
- Overlay background content becomes inert; a topmost-overlay stack traps/restores focus and reference-counts the shared page lock for nested dialogs.
- Body scroll is locked during contact/filter/gallery overlays.

## Performance and release fixes

- Responsive AVIF/WebP/JPEG media and eager high-priority cover images remain.
- Generated lightweight summary data replaces eager imports of all full room modules.
- Home/catalog room-detail preloads fell from ten chunks to zero while preserving all nine routes and SSG content.
- Room media regeneration now detects source modification time instead of trusting output existence forever.
- Stable media filenames use revalidation caching instead of one-year immutable caching.
- Sitemap and production URL assertions are release checks; unknown routes receive a noindex 404 page.

## Preservation boundary

- All 9 room IDs, slugs, routes, prices, and listing identities remain.
- All 65 source images and 2 videos remain in their original room and gallery order.
- The first gallery item remains each room cover.
- Media keys, source paths, enquiry details, and responsive derivative contracts remain intact.
- Public copy now removes stale placeholder/availability contradictions; one kitchen label now matches the listing’s existing private-kitchenette content.

## Verification target

- `npm run validate:rooms`
- `npm run build`
- 320, 390, 768, and 1440px visual checks
- Keyboard and overlay checks
- No horizontal page overflow
- LCP image eager/high priority; below-fold media lazy
- 11 SSG product routes plus the 404 artifact
