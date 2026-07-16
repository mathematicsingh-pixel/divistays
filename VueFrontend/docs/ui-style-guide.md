# UI Style Guide — DiviStays

Source of truth for visual and interaction decisions in `VueFrontend`.

---

## 1. Product direction

DiviStays is a small, direct rental catalogue for Kakadeo, Kanpur. It should feel like a calm urban residence journal: considered, honest, and easy to act on.

### Visual thesis

**Urban garden rooms with night-time confidence.** Deep ink architecture, warm light content planes, solid orange actions, mint availability, and large real room photography. Quality comes from proportion, type, and restraint, with tightly bounded light around real actions.

### Brand mark

The DiviStays mark is a four-part architectural frame with a `D`-shaped opening cut through its centre. Use it in one colour only: deep ink on light surfaces and warm white on dark surfaces. Pair it with the Manrope wordmark; do not redraw it as a house, arch, lamp, key, or illustrated room.

### Content thesis

1. Show a real room and the essential proposition immediately.
2. Put title, monthly rent, availability, occupancy, kitchen, and washroom before persuasion.
3. Use concise, verifiable proof and location context.
4. End with the visit process, FAQs, and one direct contact path.

### Interaction thesis

Use a stable responsive header, whole-card room navigation, staged mobile filters, explicit gallery controls, and one contextual mobile action tray. Motion explains entry or continuity only.

---

## 2. Principles

1. **The room is the interface.** Photography and decision facts outrank chrome.
2. **Mobile is the primary product.** Start at 320–390px; enhance at larger widths.
3. **One clear action.** Orange identifies the primary next step, not decoration.
4. **Fewer containers.** A room card, toolbar, or overlay may need containment. General copy usually does not.
5. **Information before aspiration.** No fake urgency, invented reviews, or vague luxury claims.
6. **Stable beats clever.** Navigation, help, and contact stay predictable.
7. **The system is finite.** Reuse the documented tokens and primitives; update this guide before adding one.

---

## 3. Typography

### Families

- **Display:** `'Syne', sans-serif` — `h1` and `h2` only.
- **Body:** `'Manrope', sans-serif` — everything else.

### Scale

| Role | Size | Weight | Notes |
|---|---|---|---|
| Display XL | `clamp(2.65rem, 11vw, 5.5rem)` | 700 | Page/hero `h1`; short lines |
| Display | `clamp(2rem, 7vw, 3.75rem)` | 700 | Section `h2` |
| Title | `1.125rem`–`1.35rem` | 700 | Manrope `h3` |
| Lead | `clamp(1.05rem, 2vw, 1.25rem)` | 400–500 | Introductory copy |
| Body | `1rem` | 400–500 | Default copy; never smaller on mobile |
| Small | `0.875rem` | 500–700 | Secondary facts |
| Label | `0.75rem` | 700 | Uppercase metadata only |

### Rules

- Syne never appears on controls, metadata, prices, body text, or headings below `h2`.
- Display line-height is `0.95–1.02`; body line-height is `1.55–1.7`.
- Labels use `0.06em` letter spacing. Do not add other custom tracking.
- The logo wordmark is the only exception: it uses a restrained `-0.04em` optical adjustment.
- Keep paragraphs near `65ch` and allow layouts to reflow at 200% zoom.

---

## 4. Color roles

| Token | Value | Role |
|---|---|---|
| `--bg` | `#08161e` | Ink header, hero, footer, overlays |
| `--bg-soft` | `#102630` | Secondary dark plane |
| `--canvas` | `#f2efe7` | Warm page background |
| `--paper` | `#fffdf8` | Primary light surface |
| `--paper-soft` | `#e8e5dd` | Recessed input/background |
| `--text-strong` | `#101d24` | Primary text on light |
| `--text` | `#40525b` | Body text on light |
| `--muted` | `#68777e` | Secondary text on light |
| `--text-inverse` | `#fffaf2` | Primary text on ink |
| `--muted-inverse` | `#c8d2d2` | Secondary text on ink |
| `--accent` | `#f47a2a` | Primary action only |
| `--accent-deep` | `#c85416` | Action hover/text treatment |
| `--brand` | `#7ed7c4` | Availability/success only |
| `--brand-strong` | `#167d6d` | Availability text on light |
| `--sun` | `#ffd38e` | Focus ring; rare highlight |
| `--line` | `rgba(16,29,36,.14)` | Light-plane rules |
| `--line-strong` | `rgba(16,29,36,.28)` | Emphasized rules |
| `--line-inverse` | `rgba(255,250,242,.18)` | Ink-plane rules |

### Rules

- Orange is action. A primary button may cast a tight, static halo, and a whole-card link may reveal a thin orange edge. Do not use orange for badges, status, gradients, or ambient decoration.
- Mint is availability/status. It is never a primary button color.
- Sun is a focus color and appears rarely elsewhere.
- Dark content planes are solid. No ambient glow fields, glass tints, or blur-heavy translucency.

---

## 5. Spacing and layout

| Token | Value |
|---|---|
| `--space-xs` | `0.25rem` |
| `--space-sm` | `0.5rem` |
| `--space-md` | `1rem` |
| `--space-lg` | `1.5rem` |
| `--space-xl` | `2rem` |
| `--space-2xl` | `3rem` |
| `--section-space` | `clamp(4rem, 9vw, 7rem)` |

- Mobile container: `calc(100% - 2rem)` with a 320px minimum viewport.
- Desktop content maximum: `76rem`.
- Use spacing tokens for padding and gaps. Section spacing uses `--section-space`.
- Let compositions breathe; do not fill whitespace with badges or microcopy.

---

## 6. Geometry and elevation

| Token | Value | Use |
|---|---|---|
| `--radius-lg` | `1rem` | Room cards, panels, sheets |
| `--radius-md` | `0.625rem` | Inputs, buttons, small media |
| `--radius-full` | `999px` | Status dots/badges and circular icon buttons only |
| `--shadow-sm` | `0 1px 2px rgba(8,22,30,.08)` | Subtle control separation |
| `--shadow-md` | `0 18px 48px rgba(8,22,30,.12)` | Elevated cards only |
| `--shadow-lg` | `0 28px 80px rgba(0,0,0,.28)` | Overlays only |
| `--shadow-action` | `0 8px 22px rgba(244,122,42,.18), 0 0 20px rgba(244,122,42,.14)` | Contextual `.action-glow` only |
| `--shadow-action-hover` | `0 12px 28px rgba(244,122,42,.24), 0 0 26px rgba(244,122,42,.2)` | Pointer hover on `.action-glow` only |

- Most sections use rules and spacing, not shadows.
- No locally invented radii or shadows.
- A rounded rectangle is not automatically a pill. Controls use `--radius-md`.

### Architectural brand glyph

`.brand-glyph-motif` repeats the four-part DiviStays symbol as a low-contrast silhouette. It may appear once in the dark hero and once in the final dark enquiry panel. Keep it behind content, never put copy inside it, and use only `--line-inverse`. It is not a surface and never receives orange, glow, or additional detail.

---

## 7. Surface primitives

Only these surface classes are allowed.

### `.surface-card`

Warm, elevated surface for a selectable room card, toolbar, dialog, or contact panel. Solid `--paper`, one `--line` border, optional `--shadow-md`.

### `.surface-input`

Recessed solid plane for form controls and filter groups. `--paper-soft`, one `--line` border, `--radius-md`, and no decorative shadow.

### `.surface-dark`

Solid `--bg-soft` panel on ink. One `--line-inverse` border. No gradient, glow, or backdrop blur.

### `.overlay-backdrop`

`rgba(8,22,30,.72)` behind sheets and dialogs. A small desktop blur is optional; mobile stays solid.

### Rules

- Never stack `surface-card` inside `surface-card`.
- Trust, process, FAQ, and generic copy sections remain open layouts.
- No new surface classes.

---

## 8. Buttons, links, chips, and labels

### Buttons

- `.button-primary`: solid `--accent`, ink text, and `--radius-md`.
- `.button-primary.action-glow`: uses `--shadow-action` for the single contextual conversion action. Do not apply it to the header, filters, empty states, or other utility actions.
- `.button-secondary`: transparent or `--paper`, strong text, one rule.
- `.button-tertiary`: text action with no container.
- Minimum target: 44×44px; standard button height: 3.25rem.
- At most one orange primary action in a visible viewport.
- Hover may shift `translateY(-1px)`; `.action-glow` may also use `--shadow-action-hover` on pointer devices. Press uses `scale(.98)`.

### `.chip`

Interactive filter or home room-preview toggle only. Rounded rectangle, not a capsule. Active uses a quiet mint status tint on light surfaces; the home switcher may use solid mint with ink text on the hero. Always use `aria-pressed`.

### `.label-upper`

Text-only uppercase metadata. No border, fill, or pill treatment.

### Badges and status

Room reference and availability may use the existing badge pattern. Keep them small, factual, and non-interactive. “Room ID” and its two-digit code remain on one unbroken line. Do not create new variants.

---

## 9. Responsive header and mobile action tray

### Header

- One real header on every route.
- Sticky, solid ink, and 56–64px tall.
- Mobile exposes Home/Rooms and one direct help action without a hidden focusable menu.
- Desktop shows Home, Rooms, Location, FAQs, and one contact action in a stable order.
- Below the 960px desktop-navigation breakpoint, do not repeat exposed Home/Rooms links in a second breadcrumb strip. Catalogue and room content follow the header directly.
- Deep-page breadcrumbs return with desktop navigation at 960px and above.
- Include a skip link that targets the page `main` landmark.

### Mobile action tray

- One tray only, positioned consistently and safe-area aware.
- It may show filters/results on the catalogue or room/price context on detail.
- Primary room-detail action is WhatsApp with a room-specific prefilled message; call is secondary.
- Add page scroll padding so the tray never obscures focused content.
- Hide it while a sheet/dialog or on-screen keyboard is open.

---

## 10. Room card

- The whole card is one clear navigation target.
- Image ratio: `4 / 3`; image is the dominant area.
- Visible information order: title → price/status → occupancy, kitchen, washroom.
- Summary may be one short line where space allows.
- No repeated orange “View room” button and no quick-preview button on every card.
- Desktop: three columns where space permits. Tablet: two. Mobile: one or a deliberate horizontal discovery rail on home.

---

## 11. Catalogue and filters

- Catalogue begins with a real `h1`, short orientation, result count, and compact controls.
- Only decision-making filters: availability, budget, occupancy, kitchen, washroom; plus sort.
- Mobile filters open in a bottom sheet and remain local until “Show rooms.”
- Show selected filters plainly and keep “Clear” visible.
- Do not add a map for this small inventory.

---

## 12. Room detail and gallery

- Gallery comes first on mobile. The first image is eager and high priority.
- Show an explicit count and an over-image “View full screen” control.
- Swipe/drag always has tap-button alternatives.
- The fullscreen viewer occupies the entire dynamic viewport at every breakpoint. It uses an opaque ink canvas, contained photography, a sparse header/footer, and safe-area padding.
- The fullscreen viewer traps focus, closes with Escape or its close control, restores the opener, and supports arrow keys.
- Put title, monthly price, availability, occupancy, kitchen, and washroom directly after the gallery.
- Use open definition rows and rules instead of cards within cards.
- Walkthrough video remains click-to-load.

---

## 13. Page composition

### Home room preview switcher

- The opening interaction previews exactly four real current listings: the visual lead, lowest monthly rent, private-kitchen setup, and higher-occupancy setup. It is not a quiz, filter, or recommendation engine.
- Each control label comes directly from its listing, such as monthly rent, kitchen type, or occupancy. A “Lowest” label must be recalculated from current available-room data. Do not use unqualified relative claims such as “more,” “best,” or “ideal.”
- Each choice immediately updates its photograph, room ID, monthly rent, availability, and setup.
- Keep a concise, live “Now showing” result directly under the controls. A change must remain visible even when the full room preview is below the viewport.
- Curate the default first listing for the strongest real photograph, while keeping its control label factual and avoiding “best” or “prettiest” claims.
- Use `aria-pressed` buttons inside a labelled group. Never auto-advance the selected room.
- The selected room is one whole navigation target. Only its default photograph is eager and high priority; below-fold room cards remain lazy.
- Room changes use one brief opacity/translation transition and respect reduced motion.

### Home

1. Compact header.
2. Concise proposition, four factual room samples, and one responsive real-room preview.
3. Three representative available rooms and a link to all rooms.
4. Factual proof and approximate location.
5. Three-step visit path.
6. FAQs and direct contact.

### Catalogue

1. Header and `h1` orientation.
2. Compact result/filter/sort controls.
3. Room grid.
4. Mobile filter sheet / desktop inline filters.

### Detail

1. Gallery and key facts on mobile; desktop adds breadcrumb context first.
2. Included items, visit notes, optional walkthrough.
3. One direct contact path.
4. Similar rooms.

---

## 14. Motion

Allowed motion:

- One composed page/hero entrance using opacity and transform.
- Gallery, sheet, and dialog continuity.
- Brief hover/press feedback.
- A restrained live availability pulse.
- A brief forward-arrow or interactive-edge reveal on whole-card links.

Retired motion:

- Hero shimmer, orbit, ambient glow pulse, button shine, call rings.
- Automatic amenity or room tickers.
- Decorative infinite loops, parallax, scroll-jacking, and cursor followers.

Motion is brief, cancellable, and disabled by `prefers-reduced-motion`. Animate `transform` and `opacity`, not layout.

---

## 15. Accessibility and performance floor

- Work without horizontal page scrolling at 320px.
- Touch targets are at least 44×44px.
- Body text contrast is 4.5:1; large text and UI boundaries are at least 3:1.
- Every interactive element receives a visible 2px `--sun` focus ring.
- Focus must not be obscured by sticky chrome.
- Closed menus contain no focusable controls.
- Dialogs trap focus and restore it on close.
- All images have dimensions and useful alt text; decorative images use empty alt.
- The hero/LCP image is HTML-discoverable, eager, and `fetchpriority="high"`.
- Below-fold media is lazy. Video is click-to-load.
- Target Core Web Vitals at the 75th percentile: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1.

---

## 16. Do / do not

### Do

- Lead with real photography and specific facts.
- Use solid color planes, rules, and meaningful whitespace.
- Keep contact and help locations consistent.
- Use semantic headings, landmarks, lists, and native disclosures.
- Keep files below roughly 600 lines by splitting responsibilities.

### Do not

- Add glass cards, ambient glow fields, button gradients, bento mosaics, or pill soup.
- Put a card around every paragraph.
- Use orange decoratively or mint as an action.
- Add fake scarcity, visitor counts, reviews, or live claims.
- Stack fixed chat bubbles over the action tray.
- hide essential information behind animation or client-only interaction.

---

## 17. Adding a pattern

1. Check whether an existing primitive covers it.
2. Prefer composition over a new variant.
3. If genuinely new, update this guide first with its purpose, tokens, pages, and constraints.
4. Add reusable CSS to `src/app/style.css` only.
5. Review the guide and implementation together.
