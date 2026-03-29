# UI Style Guide — CozyRooms

Source of truth for all visual decisions. Every agent and contributor must read this before making UI changes.

---

## 1. Brand & Design Intent

CozyRooms is a student room rental site for Kakadeo, Kanpur. The interface must feel:

- **Premium but restrained** — quality through hierarchy and space, not decoration
- **Room-first** — real imagery leads; copy supports
- **Editorially clean** — clear typography, quiet surfaces, strong rhythm
- **Trustworthy** — honest information density; no visual noise to distract from room details

The product is the rooms. The UI gets out of the way.

---

## 2. Design Principles

1. **Show the room, not the UI.** Every layout choice should make room imagery and key facts more prominent, not the interface chrome.
2. **One pattern, not many.** If two components look 80% the same, collapse them into one. Resist creating "just slightly different" variants.
3. **Hierarchy before decoration.** Use size, weight, and spacing to create visual order. Avoid gradients, glows, and motion as hierarchy tools.
4. **Mobile is the primary experience.** Design for a 375px viewport first. Desktop is the progressive enhancement.
5. **Fewer tokens, enforced.** A small token set used everywhere beats a large token set used loosely.

---

## 3. Typography System

### Font families
- **Display**: `'Syne', sans-serif` — only for h1 and h2 (page/section titles)
- **Body**: `'Manrope', sans-serif` — everything else: h3, body text, labels, buttons, metadata

### Scale
| Role | Size | Weight | Font | Letter-spacing | Usage |
|---|---|---|---|---|---|
| Display XL | `clamp(2.5rem, 9vw, 5rem)` | 700 | Syne | -0.04em | h1: hero title |
| Display | `clamp(1.8rem, 5vw, 3rem)` | 700 | Syne | -0.04em | h2: section titles |
| Title | `1.125rem` | 700 | Manrope | -0.02em | h3: card titles, dialog titles |
| Body | `1rem` | 400 | Manrope | normal | Paragraphs, descriptions |
| Body small | `0.875rem` | 400–600 | Manrope | normal | Secondary text, summaries |
| Label | `0.75rem` | 700 | Manrope | 0.06em, uppercase | Kickers, toolbar labels, group headings |
| Meta | `0.8125rem` | 600 | Manrope | normal | Prices, facts, status text |

### Rules
- **Syne is only for display.** Never use Syne below 1.8rem or for interactive elements.
- **One heading weight.** All headings use 700. No 800 on headings.
- **Labels are always uppercase.** If text is uppercase, use the label role. If it's not a label, don't uppercase it.
- **No custom letter-spacing** outside the scale above.

---

## 4. Color Roles & Tokens

### Palette

| Token | Value | Role |
|---|---|---|
| `--bg` | `#07121a` | Page background base |
| `--bg-soft` | `#0d1c25` | Raised dark background |
| `--text` | `#5d7180` | Default body text |
| `--text-strong` | `#0b1720` | Headings, important text (light surfaces) |
| `--text-inverse` | `#f7fbff` | Text on dark surfaces |
| `--muted` | `#4d6171` | De-emphasized text (light surfaces) |
| `--muted-inverse` | `rgba(236,246,252,0.82)` | De-emphasized text (dark surfaces) |
| `--accent` | `#ff7a1a` | Action: buttons, CTAs |
| `--accent-deep` | `#db6210` | Action hover/pressed state |
| `--brand` | `#79d9ca` | Status: availability, success indicators |
| `--brand-strong` | `#2ca18e` | Status text on light surfaces |
| `--sun` | `#ffd38e` | Rare highlight: focus rings, special callouts |
| `--line` | `rgba(11,23,32,0.12)` | Borders on light surfaces |
| `--line-strong` | `rgba(11,23,32,0.2)` | Emphasized borders on light surfaces |

### Color usage rules
- **Orange (`--accent`)**: only for primary actions (buttons, links that are CTAs). Never for decoration or status.
- **Mint (`--brand`)**: only for availability status, success states, the live-dot indicator. Never for buttons.
- **Sun (`--sun`)**: only for focus-visible rings and very rare highlights (1–2 per page max). Never for text or backgrounds.
- **No new accent colors.** If you need a new semantic color, update this guide first.

---

## 5. Spacing Scale

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `0.25rem` (4px) | Tight gaps inside chips/badges |
| `--space-sm` | `0.5rem` (8px) | Small gaps, inline spacing |
| `--space-md` | `1rem` (16px) | Standard gap, card padding |
| `--space-lg` | `1.5rem` (24px) | Section gaps, generous padding |
| `--space-xl` | `2rem` (32px) | Major section breaks |

### Rules
- Use only these tokens for gaps and padding. No magic numbers.
- `--card-pad: var(--space-md)` is the standard card content padding.
- Section-level vertical gaps use `--space-xl` or larger.

---

## 6. Radius & Shadow Scale

### Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-lg` | `1.25rem` | Cards, panels, dialogs, sheets |
| `--radius-md` | `0.75rem` | Chips, inputs, smaller cards |
| `--radius-full` | `999px` | Badges, pills, circular buttons |

### Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 4px 12px rgba(0,0,0,0.08)` | Inputs, chips, subtle elevation |
| `--shadow-md` | `0 12px 32px rgba(0,0,0,0.14)` | Cards, panels |
| `--shadow-lg` | `0 20px 48px rgba(0,0,0,0.22)` | Overlays, modals, dark panels |

### Rules
- No inline shadow definitions in components. Use tokens only.
- No inset shadows except in input focus states.
- Shadows are reduced on mobile (`<960px`) via media query.

---

## 7. Surface System

Three depths only. Every visible panel maps to one of these.

### `.surface-card`
Light elevated surface for content cards, toolbars, dialog panels.
```css
border: 1px solid var(--line);
border-radius: var(--radius-lg);
background: rgba(248, 252, 255, 0.92);
box-shadow: var(--shadow-md);
```

### `.surface-input`
Recessed surface for inputs, filter groups, and interactive chip areas.
```css
border: 1px solid var(--line);
border-radius: var(--radius-md);
background: rgba(248, 252, 255, 0.85);
box-shadow: var(--shadow-sm);
```

### `.surface-dark`
Dark elevated surface for dark-on-dark panels (footer cards, nav bar).
```css
border: 1px solid rgba(255, 255, 255, 0.1);
border-radius: var(--radius-lg);
background: rgba(10, 24, 34, 0.92);
box-shadow: var(--shadow-lg);
```

### `.overlay-backdrop`
Full-screen overlay behind modals and sheets.
```css
background: rgba(7, 18, 26, 0.6);
```

### Rules
- No backdrop-filter on mobile (`<960px`). Use solid fallbacks.
- No stacking surfaces (`surface-card` inside `surface-card`). Use `surface-input` for inner recessed areas.
- Dark surfaces use `--text-inverse` and `--muted-inverse` text colors.

---

## 8. Button Variants

Three only.

| Class | Background | Text | Border | Usage |
|---|---|---|---|---|
| `.button-primary` | `--accent` gradient | `--bg` (dark) | none | Primary CTA per section |
| `.button-secondary` | `surface-input` fill | `--text-strong` | `--line` | Secondary action |
| `.button-tertiary` | transparent | `--text-inverse` | transparent | Tertiary action on dark surfaces |

### Rules
- Max one `.button-primary` per visible viewport.
- All buttons: `border-radius: var(--radius-full)`, `min-height: 3rem`, `font-weight: 700`.
- Hover: `translateY(-1px)` on pointer devices. Active: `scale(0.98)`.
- No shimmer, shine, or glow animations on buttons.

---

## 9. Chip / Badge / Status Rules

### `.chip` — interactive filter toggle
- Used in catalog toolbar and filter sheet.
- `border-radius: var(--radius-md)`, `min-height: 2.5rem`.
- Default: `surface-input` styling. Active: mint tint border + background.
- Has hover and active states.

### `.badge` — non-interactive indicator
- Used for room reference ID, "Featured" flag.
- `border-radius: var(--radius-full)`, small padding.
- Comes in two variants: light (on cards) and inverse (on images).

### `.label-upper` — uppercase metadata label
- Replaces: eyebrow, kicker, toolbar-label, section-kicker, group-label.
- `font-size: var(--text-label)`, `font-weight: 700`, `letter-spacing: 0.06em`, `text-transform: uppercase`.
- Just text styling — no border, no background, no pill shape.

### What NOT to create
- No new pill variants.
- No new chip shapes.
- No new badge colors.
- If you think you need a new variant, update this guide first.

---

## 10. Card Templates

### Room card (`.room-card`)
Vertical stack: image → body (title, price + status, summary, CTA).

Content rules:
- Image: `aspect-ratio: 5/4`, full-width.
- Title: h3 (Manrope 700).
- Price + availability: one line, meta weight.
- Summary: 2-line clamp, muted text.
- CTA: one `.button-primary`.
- Max 5 information items visible. Details go to the room page.

### Featured card (hero)
Same structure as room card but larger, with optional badge overlay on image.

---

## 11. Modal / Sheet / Drawer Rules

### Sheet (mobile-first)
- Anchored to bottom on mobile. Centered on desktop.
- Max height: `92svh`. Has header, scrollable body, sticky actions.
- Uses `overlay-backdrop` + `surface-card` for the panel.
- Single transition: opacity fade (0.15s).
- Close button: icon circle in header.

### Dialog (quick preview)
- Same overlay pattern as sheet.
- Anchored to bottom on mobile, centered on desktop.
- Uses `surface-card` for the panel.
- Keep lightweight. If it grows too complex, link to the full page instead.

### Rules
- No backdrop-filter on mobile (performance).
- Always trap focus inside the dialog.
- Always provide an accessible close button + backdrop click-to-close.
- `z-index: 50` for sheets, `z-index: 70` for dialogs.

---

## 12. Mobile Navigation Rules

### MobileSectionNav
- Fixed top bar on mobile. Hidden on desktop (≥960px).
- Shows on scroll-up, hides on scroll-down.
- Accepts a `context` prop to control which items appear.
- Uses `surface-dark` styling.
- Links use label typography, pill shape.

### Rules
- The nav should show context-relevant links, not a global sitemap.
- On the home page: section anchors. On the catalog page: section anchors.
- Max 4–5 items to avoid horizontal overflow.

---

## 13. Page Composition Rules

### Home page
1. Hero: headline + featured room + CTA. Room image has visual weight.
2. Available rooms: section heading + room card grid.
3. Trust/proof: section heading + cards (max 4).
4. Process: section heading + steps.
5. FAQ: section heading + accordion.
6. CTA banner: simple call-to-action.

### Catalog page
1. Section heading with summary.
2. Toolbar: result count, availability filter, sort, advanced filter trigger.
3. Results grid.
4. Filter sheet (mobile) / filter panel (desktop).

### Room detail page
1. Showcase: image stage + thumbnail rail.
2. Details: title, price, availability, room facts, description, included items.
3. CTA: contact actions.
4. Similar rooms (if any).

---

## 14. Motion Rules

Animations are a core part of the CozyRooms identity. Keep them.

### Existing animations (preserve all)
- `page-rise`: entrance stagger for section content.
- `hero-shimmer`: brand-line text shimmer.
- `hero-orbit`: decorative circle rotation on hero.
- `hero-glow-pulse`: warm glow pulse on hero.
- `hero-live-pulse`: availability dot pulse.
- `hero-btn-shine`: CTA button shine sweep.
- `hero-call-ring` / `hero-call-dot`: phone call ring animation.
- `ticker` / `footer-room-ticker`: horizontal marquee for overflow content.
- Hover `translateY(-1px)` on interactive cards/buttons (pointer devices only).
- Active `scale(0.98)` press feedback.
- Opacity fade (0.15s) for modals/sheets.

### Rules for new animations
- Keep animations purposeful — they should draw attention to interactive or live-status elements.
- Prefer CSS keyframes over JS-driven animation.
- Always gate hover effects behind `@media (hover: hover)`.
- Infinite loops are fine for status indicators and tickers. Keep durations relaxed (>2s).

### Reduced motion
Always respect `prefers-reduced-motion: reduce`. All animations and transitions must disable instantly via the global media query.

---

## 15. Accessibility Rules

- **Focus visible**: `outline: 2px solid var(--sun); outline-offset: 3px` on all interactive elements.
- **Color contrast**: text on surfaces must meet WCAG AA (4.5:1 for body, 3:1 for large text).
- **Touch targets**: minimum 44×44px tap area on mobile.
- **Screen reader**: `.sr-only` class for visually hidden but accessible text.
- **Modals**: focus trap, `aria-modal="true"`, `role="dialog"`, `aria-labelledby`.
- **Interactive chips**: `aria-pressed` for toggles.
- **Images**: always provide `alt` text.

---

## 16. Do / Don't

### Do
- Use `surface-card` for elevated content areas.
- Use `label-upper` for uppercase metadata text.
- Use `--accent` for the primary CTA only.
- Use `--brand` for availability/status only.
- Use spacing tokens for all gaps and padding.
- Compose global primitives — don't redefine them locally.

### Don't
- Don't create a new surface class. Use the 3 that exist.
- Don't use Syne for anything smaller than a section heading.
- Don't add a new pill/chip/badge variant. Collapse into existing ones.
- Don't use `--accent` for status indicators or `--brand` for buttons.
- Don't define shadows inline. Use `--shadow-sm`, `--shadow-md`, `--shadow-lg`.
- Don't add new infinite-loop animations without documenting them in the style guide first.
- Don't use `backdrop-filter` on mobile.
- Don't stack surfaces (`surface-card` inside `surface-card`).

### Examples from this repo

**Before** (too many pills):
```html
<span class="eyebrow hero-eyebrow hero-top-note">Available now</span>
<p class="room-kicker">{{ room.highlightLabel }}</p>
<span class="featured-badge">Featured</span>
```

**After** (one label pattern):
```html
<span class="label-upper">Available now</span>
<p class="label-upper" style="color: var(--accent-deep)">{{ room.highlightLabel }}</p>
<span class="badge badge-highlight">Featured</span>
```

**Before** (stacked surface classes):
```html
<article class="room-card surface-panel surface-soft-panel">
```

**After** (one surface):
```html
<article class="room-card surface-card">
```

---

## 17. How to Add a New UI Pattern

1. Check this guide first. Does an existing pattern cover your need?
2. If yes, use it. Compose existing primitives.
3. If no, **update this guide first** with the new pattern, including:
   - Name and purpose
   - Token values (use existing tokens)
   - Do/don't rules
   - Which pages it appears on
4. Get the guide change reviewed alongside the implementation.
5. Add the primitive to `src/app/style.css` if it's reusable.
6. Never define a new shadow, radius, or color outside the token system.

---

## 18. Migration Map

| Old class / token | New canonical | Action |
|---|---|---|
| `.surface-panel` | `.surface-card` | Alias kept; prefer new name |
| `.surface-paper-panel` | `.surface-card` | Alias kept; prefer new name |
| `.surface-soft-panel` | `.surface-card` | Alias kept; prefer new name |
| `.glass-panel` | `.surface-card` | Alias kept; prefer new name |
| `.glass-panel-dark` | `.surface-dark` | Alias kept; prefer new name |
| `.surface-field-panel` | `.surface-input` | Alias kept; prefer new name |
| `.glass-chip` | `.surface-input` | Alias kept; prefer new name |
| `.glass-overlay` | `.overlay-backdrop` | Alias kept; prefer new name |
| `.surface-dark-shell` | `.surface-dark` | Alias kept; prefer new name |
| `.eyebrow` | `.label-upper` (text only) | Alias kept; prefer new name |
| `.signal-pill` | `.label-upper` | Alias kept |
| `.soft-chip` | `.chip` | Alias kept |
| `--radius-xl` | `--radius-lg` | Value tightened |
| `--radius-sheet` | `--radius-lg` | Removed (use --radius-lg) |
| `--glass-shadow` | `--shadow-md` | Alias kept |
| `--shadow-paper` | `--shadow-md` | Alias kept |
| `--shadow-dark` | `--shadow-lg` | Alias kept |
| `--shadow-field` | `--shadow-sm` | Alias kept |
| `--shadow-chip` | `--shadow-sm` | Alias kept |
