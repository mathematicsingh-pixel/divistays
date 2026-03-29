# UI Audit — DiviStays VueFrontend

Snapshot of inconsistencies and redundant patterns found during the design-system normalization.

---

## 1. Surface classes — too many overlapping variants

| Old class | Border | Background | Shadow | Used in |
|---|---|---|---|---|
| `.surface-panel` | paper-border | surface-paper-fill | shadow-paper | RoomCard, CatalogToolbar |
| `.surface-paper-panel` | paper-border | surface-paper-fill | shadow-paper | RoomDetailDialog, CatalogFilterSheet, CatalogToolbar |
| `.surface-soft-panel` | paper-border | surface-paper-soft-fill | shadow-paper | RoomCard (hero featured) |
| `.glass-panel` | paper-border | surface-paper-soft-fill + backdrop | shadow-paper | (general) |
| `.glass-panel-dark` | glass-stroke-dark | surface-dark-fill + backdrop | shadow-dark | (general) |
| `.surface-field-panel` | paper-border-soft | surface-field-fill | shadow-field | hero proof cards, catalog filter groups |
| `.glass-chip` | paper-border | surface-field-fill + backdrop | shadow-field | active filter chips |
| `.surface-dark-shell` | glass-stroke-dark | surface-dark-fill | shadow-dark | footer, MobileSectionNav |
| `.glass-overlay` | none | rgba(7,18,26,0.52) + backdrop | none | dialog/sheet backdrops |

**Problem**: `surface-panel` ≈ `surface-paper-panel` ≈ `glass-panel`. `glass-panel-dark` ≈ `surface-dark-shell`. Components stack 2–3 of these together (`surface-panel surface-soft-panel`).

**Canonical replacement**:
- `.surface-card` → one light elevated card (merges surface-panel, surface-paper-panel, surface-soft-panel, glass-panel)
- `.surface-input` → input-level recessed surface (merges surface-field-panel, glass-chip)
- `.surface-dark` → dark elevated panel (merges glass-panel-dark, surface-dark-shell)
- `.overlay-backdrop` → modal/sheet background (replaces glass-overlay)

---

## 2. Chips, pills, badges, kickers — too many variants

| Pattern | File | Purpose |
|---|---|---|
| `.eyebrow` | style.css, HeroSection | Uppercase mint kicker pill |
| `.signal-pill` | style.css | Uppercase dark kicker pill |
| `.soft-chip` | style.css, CatalogToolbar | Inline filter badge |
| `.glass-chip` | style.css, CatalogToolbar | Filter badge with glass |
| `.chip-button` | CatalogToolbar, CatalogFilterSheet | Interactive toggle chip |
| `.preview-pill` | RoomCard | Quick-preview trigger |
| `.fact-pill` | HeroSection | Room fact mini-chip |
| `.amenity-chip` | HeroSection | Amenity ticker chip |
| `.footer-chip` | SiteFooter | Navigation link chip |
| `.featured-badge` | HeroSection | "Featured" flag |
| `.room-reference` | RoomReferenceBadge | Room ID badge |
| `.room-kicker` | RoomCard | Highlight label |
| `.featured-kicker` | HeroSection | Highlight label (duplicate) |
| `.sheet-kicker` | CatalogFilterSheet | Section kicker |
| `.dialog-brand` | RoomDetailDialog | Preview kicker |
| `.toolbar-label` | CatalogToolbar | Section label |
| `.footer-section-kicker` | SiteFooter | Section kicker |
| `.footer-group-label` | SiteFooter | Group kicker |

**Problem**: 18+ visually similar patterns. Most are uppercase 0.74rem 800-weight with letter-spacing. Some are interactive, some are decorative, some are informational — but they look nearly identical.

**Canonical replacement**:
- `.label-upper` → uppercase metadata label (replaces all kickers, toolbar-label, group-label)
- `.chip` → interactive filter toggle (replaces chip-button)
- `.badge` → non-interactive status/reference indicator (replaces room-reference, featured-badge)
- Remove: eyebrow, signal-pill, fact-pill, amenity-chip, preview-pill as global classes. Inline where needed.

---

## 3. Shadows — 6 overlapping definitions

| Token | Value | Used by |
|---|---|---|
| `--glass-shadow` | 0 26px 70px rgba(0,0,0,0.26) | glass-panel, glass-panel-dark |
| `--glass-shadow-soft` | 0 18px 44px rgba(0,0,0,0.18) | (unused in style.css) |
| `--shadow-paper` | 0 20px 48px rgba(5,14,24,0.16) | surface-panel, surface-paper-panel, surface-soft-panel |
| `--shadow-dark` | 0 24px 56px rgba(0,0,0,0.28) | surface-dark-shell |
| `--shadow-field` | inset ... + 0 10px 22px ... | surface-field-panel |
| `--shadow-chip` | inset ... + 0 12px 24px ... | room-reference-inverse, hero proof |
| `--surface-shadow` | 0 18px 52px rgba(0,0,0,0.18) | (unused in style.css) |

**Canonical replacement**:
- `--shadow-sm` → subtle elevation (inputs, chips)
- `--shadow-md` → card elevation
- `--shadow-lg` → overlay/modal elevation

---

## 4. Radius — inconsistent values

Defined tokens: `--radius-xl: 1.9rem`, `--radius-lg: 1.45rem`, `--radius-md: 1rem`, `--radius-sheet: var(--radius-lg)`.

Ad-hoc values scattered in components: `0.95rem`, `1.1rem`, `1.15rem`, `0.75rem`, `999px`.

**Canonical replacement**:
- `--radius-lg: 1.25rem` → cards, panels, dialogs
- `--radius-md: 0.75rem` → chips, inputs, smaller elements
- `--radius-full: 999px` → pills, badges, buttons

---

## 5. Typography — roles not strict

| Element | Font | Weight | Size | Where |
|---|---|---|---|---|
| h1 | Syne 700 | — | clamp(2.7rem, 10vw, 5.8rem) | Global |
| h2 | Syne 700 | — | clamp(2rem, 6vw, 3.4rem) | Global |
| h3 | Syne 700 | — | 1.18rem | Global |
| `.room-kicker` | Manrope | 800 | 0.74rem | RoomCard |
| `.featured-kicker` | Manrope | 800 | 0.74rem | HeroSection |
| `.hero-brand-line` | Manrope | 800 | 0.94rem | HeroSection |
| `.toolbar-label` | Manrope | 800 | 0.74rem | CatalogToolbar |
| body text | Manrope | 400 | 1rem | Global |

**Problem**: Syne is used for h3 (1.18rem) which is not a "display moment". h3 at that size is a card title, not a display heading. The brand-line is styled manually instead of using a token.

**Canonical replacement**:
- Syne: only h1 and h2 (display moments).
- h3: switch to Manrope 700.
- Label text: one `--text-label` size (0.75rem) with shared letter-spacing.

---

## 6. Animations — too many decorative keyframes

| Animation | File | Purpose |
|---|---|---|
| `page-rise` | style.css | Entrance stagger (useful) |
| `hero-shimmer` | HeroSection | Brand-line shimmer (decorative) |
| `hero-orbit` | HeroSection | Circle rotation (decorative) |
| `hero-glow-pulse` | HeroSection | Glow pulse (decorative) |
| `hero-live-pulse` | HeroSection | Availability dot pulse (useful) |
| `hero-btn-shine` | HeroSection | Button shine sweep (decorative) |
| `hero-call-ring` | HeroSection | Phone ring animation (decorative) |
| `hero-call-dot` | HeroSection | Phone dot pulse (decorative) |
| `ticker` | HeroSection | Amenities marquee (useful on mobile) |
| `footer-room-ticker` | SiteFooter | Room marquee (useful on mobile) |

**Keep all** — animations are part of the brand identity. No removals needed. Ensure all respect `prefers-reduced-motion`.

---

## 7. Hero is copy-first, not product-first

The hero section leads with brand line + eyebrow + headline + summary + proof cards + 3 CTAs before showing any room imagery. On mobile, the featured room card is pushed below the fold.

**Fix**: Reduce copy density. Remove brand-line shimmer treatment. Simplify proof cards. Let the featured room image have more weight.

---

## 8. Room cards show too much at once

Each RoomCard shows: image, reference badge, preview pill, kicker, title, price, availability status, occupancy + washroom facts, fit summary, CTA button, plus a gradient top bar. That is 10+ information items.

**Fix**: Remove gradient top bar. Drop room-facts line (info is in the detail page). Merge kicker into metadata.

---

## 9. MobileSectionNav is context-blind

The component accepts generic `items` and shows them the same way everywhere. It does not adapt to the current page or section. The same links appear whether you're on the home page or room catalog.

**Fix**: Accept a `context` prop that controls which items appear and what the nav looks like.

---

## 10. Migration map

| Old pattern | New canonical | Notes |
|---|---|---|
| `surface-panel` | `surface-card` | Keep old as alias |
| `surface-paper-panel` | `surface-card` | Keep old as alias |
| `surface-soft-panel` | `surface-card` | Remove (same as surface-card) |
| `surface-field-panel` | `surface-input` | Keep old as alias |
| `glass-panel` | `surface-card` | Keep old as alias, drop backdrop on mobile |
| `glass-panel-dark` | `surface-dark` | Keep old as alias |
| `glass-chip` | `surface-input` | Keep old as alias |
| `glass-overlay` | `overlay-backdrop` | Keep old as alias |
| `surface-dark-shell` | `surface-dark` | Keep old as alias |
| `eyebrow` | `label-upper` | Deprecate pill form |
| `signal-pill` | `label-upper` | Deprecate |
| `--glass-shadow` | `--shadow-md` | Alias |
| `--shadow-paper` | `--shadow-md` | Alias |
| `--shadow-dark` | `--shadow-lg` | Alias |
| `--shadow-field` | `--shadow-sm` | Alias |
| `--shadow-chip` | `--shadow-sm` | Alias |
| `--radius-xl` | `--radius-lg` | Tighten scale |
| `--radius-sheet` | `--radius-lg` | Remove alias |
