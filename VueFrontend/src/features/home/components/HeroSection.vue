<script setup>
import { computed } from 'vue'
import BrandMark from '@/features/site/components/brand/BrandMark.vue'
import RoomReferenceBadge from '@/features/rooms/components/RoomReferenceBadge.vue'
import ResponsiveImage from '@/shared/ui/ResponsiveImage.vue'
import ShowerIcon from '@/shared/icons/ShowerIcon.vue'
import OvenIcon from '@/shared/icons/OvenIcon.vue'

function formatPhoneDisplay(value) {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 10) {
    return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
  }

  return value
}

const props = defineProps({
  site: {
    type: Object,
    required: true,
  },
  availableRoomCount: {
    type: Number,
    required: true,
  },
  roomCount: {
    type: Number,
    required: true,
  },
  startingPriceLabel: {
    type: String,
    default: '',
  },
  callHref: {
    type: String,
    required: true,
  },
  whatsappHref: {
    type: String,
    required: true,
  },
  featuredRoom: {
    type: Object,
    default: null,
  },
})

const availablePricingNote = computed(() =>
  props.startingPriceLabel
    ? `From ${props.startingPriceLabel}`
    : 'Check current availability',
)

const overallPricingNote = computed(() =>
  props.startingPriceLabel
    ? `From ${props.startingPriceLabel}`
    : 'Browse all room details',
)

const quickFacts = computed(() => {
  if (!props.featuredRoom) return []
  return [
    { path: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2m8-4a4 4 0 100-8 4 4 0 000 8zm13 8v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75', label: props.featuredRoom.occupancyLabel },
    { component: 'oven', label: props.featuredRoom.kitchenLabel },
    { component: 'shower', label: props.featuredRoom.washroomLabel },
  ]
})

const propertyAmenities = [
  { path: 'M5 12.55a11 11 0 0114 0M8.53 16.11a6 6 0 016.95 0M12 20h.01', label: 'High-speed WiFi' },
  { path: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z', label: '24/7 CCTV' },
  { path: 'M12 2.69l5.66 5.66a8 8 0 11-11.31 0z', label: 'Water purifier' },
  { path: 'M13 2L3 14h9l-1 8 10-12h-9z', label: 'Power backup' },
  { path: 'M3 3v18h18V3zm9 14a5 5 0 110-10 5 5 0 010 10z', label: 'Laundry area' },
  { path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', label: 'Secure premises' },
]
</script>

<template>
  <section
    id="home"
    class="hero-shell"
  >
    <div class="container hero-grid">
      <div class="hero-copy surface-dark page-rise">
        <!-- Ambient pin-search animation -->
        <div class="hero-ambient" aria-hidden="true">
          <svg viewBox="0 0 200 220" fill="none">
            <circle class="hero-ring hero-ring--1" cx="100" cy="85" r="32" />
            <circle class="hero-ring hero-ring--2" cx="100" cy="85" r="56" />
            <circle class="hero-ring hero-ring--3" cx="100" cy="85" r="80" />
            <path
              class="hero-pin"
              d="M100 175 C88 140 55 112 55 85 A45 45 0 1 1 145 85 C145 112 112 140 100 175Z"
            />
            <path
              class="hero-house"
              d="M100 68 L84 80 V96 H93 V87 H107 V96 H116 V80 Z"
            />
            <circle class="hero-mote hero-mote--1" cx="38" cy="52" r="1.5" />
            <circle class="hero-mote hero-mote--2" cx="162" cy="62" r="1" />
            <circle class="hero-mote hero-mote--3" cx="52" cy="155" r="1.3" />
            <circle class="hero-mote hero-mote--4" cx="150" cy="40" r="0.9" />
            <circle class="hero-mote hero-mote--5" cx="30" cy="125" r="1.1" />
            <circle class="hero-mote hero-mote--6" cx="170" cy="145" r="0.8" />
          </svg>
        </div>

        <div class="hero-topbar">
          <BrandMark
            compact
            inverted
          />
          <span class="label-upper label-pill hero-eyebrow hero-top-note">{{ site.heroEyebrow }}</span>
        </div>

        <p class="hero-brand-line"><span class="hero-brand-line-text">{{ site.brandLine }}</span></p>

        <div class="hero-heading-wrap">
          <h1>{{ site.heroTitle }}</h1>
        </div>

        <p class="hero-summary">
          {{ site.heroSummary }}
        </p>

        <div class="hero-proof-row">
          <div class="hero-proof-card surface-input">
            <dt>
              <svg class="hero-proof-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              <span class="hero-proof-live-dot" aria-hidden="true" />
              {{ availableRoomCount }} rooms available now
            </dt>
            <dd>{{ availablePricingNote }}</dd>
          </div>
          <div class="hero-proof-card surface-input">
            <dt>
              <svg class="hero-proof-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>
              {{ roomCount }} room options
            </dt>
            <dd>Compare by occupancy and setup</dd>
          </div>
          <div class="hero-proof-card surface-input">
            <dt>
              <svg class="hero-proof-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
              {{ overallPricingNote }}
            </dt>
            <dd>Call or WhatsApp directly</dd>
          </div>
        </div>

        <div class="hero-actions">
          <RouterLink
            class="button-primary hero-primary-action"
            to="/rooms?availability=available"
          >
            {{ site.heroPrimaryLabel }}
          </RouterLink>
          <a
            class="button-secondary hero-secondary"
            :href="whatsappHref"
            target="_blank"
            rel="noreferrer"
          >
            {{ site.heroSecondaryLabel }}
          </a>
          <a
            class="button-tertiary hero-call-action"
            :href="callHref"
          >
            <span
              class="hero-call-signal"
              aria-hidden="true"
            >
              <span class="hero-call-dot" />
            </span>
            <span class="hero-call-copy">
              <strong>{{ site.heroCallLabel }}</strong>
              <small>{{ formatPhoneDisplay(site.phoneDisplay) }}</small>
            </span>
          </a>
        </div>
      </div>

      <aside
        v-if="featuredRoom"
        class="hero-featured surface-card page-rise-delay-1"
      >
        <span class="featured-badge">Featured</span>

        <div class="featured-media">
          <RouterLink :to="featuredRoom.detailsHref">
            <ResponsiveImage
              :room-slug="featuredRoom.slug"
              :media="featuredRoom.gallery[0]"
              eager
              sizes="(min-width: 960px) 34vw, 92vw"
            />
          </RouterLink>
          <div class="featured-overlay">
            <RoomReferenceBadge
              :room="featuredRoom"
              inverse
            />
          </div>
        </div>

        <div class="featured-body">
          <p class="label-upper featured-kicker">{{ featuredRoom.highlightLabel }}</p>
          <h2>
            <RouterLink :to="featuredRoom.detailsHref">
              {{ featuredRoom.title }}
            </RouterLink>
          </h2>

          <div class="featured-price-row">
            <span class="featured-price">{{ featuredRoom.priceLabel }}</span>
            <span
              class="featured-status"
              :class="{ 'featured-status--occupied': !featuredRoom.available }"
            >
              {{ featuredRoom.availabilityShortLabel }}
            </span>
          </div>

          <p class="featured-summary">{{ featuredRoom.fitSummary }}</p>

          <div class="featured-facts">
            <span
              v-for="fact in quickFacts"
              :key="fact.label"
              class="fact-pill"
            >
              <ShowerIcon v-if="fact.component === 'shower'" class="fact-icon" />
              <OvenIcon v-else-if="fact.component === 'oven'" class="fact-icon" />
              <svg v-else class="fact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path :d="fact.path" /></svg>
              {{ fact.label }}
            </span>
          </div>

          <RouterLink
            class="button-primary"
            :to="featuredRoom.detailsHref"
          >
            {{ featuredRoom.available ? site.uiText.actions.viewRoom : site.uiText.actions.viewSimilarRooms }}
          </RouterLink>
        </div>
      </aside>
    </div>

    <div class="amenities-strip">
      <div class="amenities-track">
        <span
          v-for="item in propertyAmenities"
          :key="item.label"
          class="amenity-chip"
        >
          <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.path" />
          </svg>
          <span class="amenity-label">{{ item.label }}</span>
        </span>
        <!-- duplicate for seamless loop on mobile -->
        <span
          v-for="item in propertyAmenities"
          :key="item.label + '-dup'"
          class="amenity-chip ticker-dup"
          aria-hidden="true"
        >
          <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path :d="item.path" />
          </svg>
          <span class="amenity-label">{{ item.label }}</span>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-shell {
  padding-top: 0.25rem;
  scroll-margin-top: 5.4rem;
}

.hero-grid {
  display: grid;
  gap: 1rem;
}

.hero-copy {
  position: relative;
  display: grid;
  gap: 1.25rem;
  padding: 1.25rem;
  border-radius: var(--radius-lg);
  color: var(--text-inverse);
  overflow: hidden;
}

/* ── Ambient pin-search decoration ────────────── */
.hero-ambient {
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  width: 16rem;
  height: 17.6rem;
  pointer-events: none;
  z-index: 0;
}

.hero-ambient svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

/* Location pin – draws itself on load */
.hero-pin {
  stroke: rgba(255, 211, 142, 0.25);
  stroke-width: 0.8;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  stroke-dasharray: 500;
  stroke-dashoffset: 500;
  animation: hero-draw 3s ease-out 0.6s forwards,
    hero-breathe 6s ease-in-out 3.6s infinite alternate;
}

/* House icon – draws after pin completes */
.hero-house {
  stroke: rgba(255, 211, 142, 0.35);
  stroke-width: 0.7;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  stroke-dasharray: 160;
  stroke-dashoffset: 160;
  animation: hero-draw-house 1.8s ease-out 2.4s forwards,
    hero-breathe 5s ease-in-out 4.2s infinite alternate;
}

/* Concentric search-pulse rings */
.hero-ring {
  stroke: rgba(121, 217, 202, 0.12);
  stroke-width: 0.5;
  fill: none;
  opacity: 0;
  transform-origin: 100px 85px;
}

.hero-ring--1 { animation: hero-ring-expand 5s ease-out 1.2s infinite; }
.hero-ring--2 { animation: hero-ring-expand 5s ease-out 2s infinite; }
.hero-ring--3 { animation: hero-ring-expand 5s ease-out 2.8s infinite; }

/* Warm floating motes */
.hero-mote { fill: rgba(255, 211, 142, 0.25); }
.hero-mote--1 { animation: hero-drift-a 9s ease-in-out infinite; }
.hero-mote--2 { animation: hero-drift-b 11s ease-in-out 1.5s infinite; fill: rgba(121, 217, 202, 0.2); }
.hero-mote--3 { animation: hero-drift-a 10s ease-in-out 3s infinite; }
.hero-mote--4 { animation: hero-drift-b 8s ease-in-out 4.5s infinite; fill: rgba(121, 217, 202, 0.18); }
.hero-mote--5 { animation: hero-drift-a 12s ease-in-out 6s infinite; }
.hero-mote--6 { animation: hero-drift-b 9.5s ease-in-out 2s infinite; }

/* Soft warm glow behind pin area */
.hero-copy::after {
  position: absolute;
  content: '';
  pointer-events: none;
  top: -1rem;
  right: 1rem;
  width: 13rem;
  height: 13rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 211, 142, 0.16), transparent 60%);
  animation: hero-glow-pulse 5s ease-in-out infinite alternate;
  z-index: 0;
}

.hero-topbar,
.hero-actions,
.hero-proof-row {
  position: relative;
  z-index: 1;
}

.hero-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.hero-eyebrow {
  border-color: var(--glass-stroke-light);
  background: var(--glass-fill-light);
}

.hero-top-note {
  margin-left: auto;
  white-space: nowrap;
}

/* ── Brand line with shimmer ─────────────────── */
.hero-brand-line {
  position: relative;
  font-size: 0.94rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  overflow: hidden;
}

.hero-brand-line-text {
  background: linear-gradient(
    90deg,
    rgba(255, 211, 142, 0.95) 0%,
    rgba(255, 211, 142, 0.95) 40%,
    #fff 50%,
    rgba(255, 211, 142, 0.95) 60%,
    rgba(255, 211, 142, 0.95) 100%
  );
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  animation: hero-shimmer 3.6s ease-in-out infinite;
}

/* ── Heading area with glow ──────────────────── */
.hero-heading-wrap {
  position: relative;
  z-index: 1;
}

.hero-heading-wrap::before {
  position: absolute;
  content: '';
  top: 50%;
  left: 20%;
  width: 60%;
  height: 100%;
  transform: translateY(-50%);
  background: radial-gradient(ellipse, rgba(255, 122, 26, 0.12), transparent 70%);
  pointer-events: none;
  filter: blur(30px);
}

.hero-copy h1 {
  position: relative;
  color: var(--text-inverse);
}

.hero-summary {
  max-width: 42rem;
  color: var(--muted-inverse);
  font-size: 1.02rem;
  line-height: 1.55;
}

/* ── Proof cards ─────────────────────────────── */
.hero-proof-row {
  display: flex;
  gap: 0.65rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding-bottom: 0.25rem;
}

.hero-proof-row::-webkit-scrollbar {
  display: none;
}

.hero-proof-card {
  flex: 0 0 82%;
  min-width: 0;
  scroll-snap-align: start;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),
    rgba(255, 255, 255, 0.07);
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease;
}

.hero-proof-icon {
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 0.3rem;
  vertical-align: -0.15em;
  flex-shrink: 0;
  opacity: 0.85;
}

.hero-proof-live-dot {
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.25rem;
  border-radius: 999px;
  background: var(--brand);
  box-shadow: 0 0 0.6rem rgba(121, 217, 202, 0.5);
  vertical-align: 0.06em;
  animation: hero-live-pulse 2s ease-in-out infinite;
}

.hero-proof-row dt {
  display: flex;
  align-items: center;
  color: var(--text-inverse);
  font-weight: 800;
  font-size: 0.95rem;
  white-space: nowrap;
}

.hero-proof-row dd {
  margin: 0.3rem 0 0;
  color: var(--muted-inverse);
  font-size: 0.88rem;
}

/* ── Hero actions ────────────────────────────── */
.hero-actions {
  display: grid;
  gap: 0.65rem;
}

.hero-primary-action {
  position: relative;
  overflow: hidden;
}

.hero-primary-action::after {
  position: absolute;
  content: '';
  top: -50%;
  left: -75%;
  width: 50%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.28),
    transparent
  );
  transform: skewX(-18deg);
  animation: hero-btn-shine 3.4s ease-in-out infinite;
}

.hero-secondary {
  border-color: var(--glass-stroke-light);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.08)),
    rgba(255, 255, 255, 0.08);
  color: var(--text-inverse);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.26),
    0 18px 34px rgba(0, 0, 0, 0.16);
}

.hero-call-action {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.5rem;
  min-height: 3.35rem;
  min-width: 0;
  padding: 0.78rem 1rem;
  border-color: rgba(255, 211, 142, 0.24);
  background:
    radial-gradient(circle at top right, rgba(255, 211, 142, 0.18), transparent 42%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.06)),
    rgba(255, 255, 255, 0.08);
  color: var(--text-inverse);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.24),
    0 18px 34px rgba(0, 0, 0, 0.18);
}

.hero-call-signal {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 999px;
  background: rgba(255, 211, 142, 0.12);
  position: relative;
}

.hero-call-signal::after {
  position: absolute;
  inset: 0;
  content: '';
  border-radius: inherit;
  border: 1px solid rgba(255, 211, 142, 0.38);
  animation: hero-call-ring 1.9s ease-out infinite;
}

.hero-call-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--sun), var(--accent));
  box-shadow: 0 0 0.75rem rgba(255, 211, 142, 0.44);
  animation: hero-call-dot 1.9s ease-in-out infinite;
}

.hero-call-copy {
  display: grid;
  justify-items: start;
  gap: 0.14rem;
}

.hero-call-copy strong {
  font-size: 1.02rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
}

.hero-call-copy small {
  color: rgba(247, 251, 255, 0.68);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.12em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

/* ── Featured room card ──────────────────────── */
.hero-featured {
  position: relative;
  display: grid;
  overflow: hidden;
}

.hero-featured::before {
  position: absolute;
  inset: 0 0 auto;
  z-index: 1;
  height: 0.35rem;
  content: '';
  background: linear-gradient(90deg, var(--accent) 0%, var(--sun) 45%, var(--brand) 100%);
}

.featured-badge {
  position: absolute;
  top: 0.35rem;
  right: 0;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.38rem 0.85rem;
  border-radius: 0 0 0 0.75rem;
  background: linear-gradient(135deg, var(--sun), var(--accent));
  color: #fff;
  font-size: var(--text-label);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.featured-media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 5 / 4;
}

.featured-media a,
.featured-media :deep(picture),
.featured-media :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
}

.featured-media :deep(img) {
  object-fit: cover;
}

.featured-overlay {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.featured-body {
  display: grid;
  gap: 0.75rem;
  padding: var(--card-pad);
  border-top: 1px solid var(--paper-border-soft);
}

.featured-kicker {
  color: var(--accent-deep);
}

.featured-body h2 {
  font-size: clamp(1.35rem, 4.5vw, 1.75rem);
  line-height: 1.1;
}

.featured-body h2 a {
  color: var(--text-strong);
}

.featured-price-row {
  display: flex;
  align-items: baseline;
  gap: 0.65rem;
}

.featured-price {
  color: var(--text-strong);
  font-size: 1.18rem;
  font-weight: 800;
  white-space: nowrap;
}

.featured-status {
  color: var(--brand-strong);
  font-size: 0.82rem;
  font-weight: 800;
}

.featured-status--occupied {
  color: var(--accent-deep);
}

.featured-summary {
  color: var(--muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.featured-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.featured-facts .fact-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  min-height: 2.35rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: 999px;
  background: var(--surface-field-fill);
  color: var(--text-strong);
  font-size: 0.78rem;
  font-weight: 700;
}

.featured-facts .fact-icon {
  width: 0.9rem;
  height: 0.9rem;
  flex-shrink: 0;
  opacity: 0.7;
}

/* ── Amenities strip ─────────────────────────── */
.amenities-strip {
  overflow: hidden;
  margin-top: 1rem;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.amenities-track {
  display: flex;
  gap: 0.5rem;
  width: max-content;
  animation: ticker 18s linear infinite;
}

.amenity-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
  padding: 0.4rem 0.75rem;
  border: 1px solid color-mix(in srgb, var(--text-inverse) 15%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--text-inverse) 6%, transparent);
  color: var(--text-inverse);
  font-size: 0.72rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
}

.amenity-icon {
  width: 0.9rem;
  height: 0.9rem;
  flex-shrink: 0;
  opacity: 0.85;
}

.amenity-label {
  white-space: nowrap;
}

@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* desktop: no ticker, centered wrap */
@media (min-width: 768px) {
  .amenities-strip {
    mask-image: none;
    -webkit-mask-image: none;
  }

  .amenities-track {
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
    animation: none;
  }

  .ticker-dup {
    display: none;
  }
}

/* ── Keyframes ───────────────────────────────── */
@keyframes hero-shimmer {
  0%, 100% {
    background-position: 100% 0;
  }
  50% {
    background-position: -100% 0;
  }
}

@keyframes hero-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes hero-draw-house {
  to { stroke-dashoffset: 0; }
}

@keyframes hero-breathe {
  from { opacity: 1; }
  to { opacity: 0.4; }
}

@keyframes hero-ring-expand {
  0% { opacity: 0.4; transform: scale(0.9); }
  60% { opacity: 0.06; transform: scale(1.15); }
  100% { opacity: 0; transform: scale(1.25); }
}

@keyframes hero-drift-a {
  0%, 100% { transform: translate(0, 0); opacity: 0.2; }
  30% { transform: translate(4px, -10px); opacity: 0.45; }
  60% { transform: translate(-3px, -6px); opacity: 0.18; }
}

@keyframes hero-drift-b {
  0%, 100% { transform: translate(0, 0); opacity: 0.15; }
  40% { transform: translate(-5px, -8px); opacity: 0.4; }
  70% { transform: translate(3px, -12px); opacity: 0.2; }
}

@keyframes hero-glow-pulse {
  from { opacity: 0.7; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1.06); }
}

@keyframes hero-live-pulse {
  0%, 100% {
    opacity: 1;
    box-shadow: 0 0 0.6rem rgba(121, 217, 202, 0.5);
  }
  50% {
    opacity: 0.6;
    box-shadow: 0 0 1rem rgba(121, 217, 202, 0.8);
  }
}

@keyframes hero-btn-shine {
  0%, 100% { left: -75%; }
  50% { left: 125%; }
}

@keyframes hero-call-ring {
  0% {
    opacity: 0.65;
    transform: scale(0.76);
  }
  70%, 100% {
    opacity: 0;
    transform: scale(1.65);
  }
}

@keyframes hero-call-dot {
  0%, 100% {
    transform: scale(0.92);
    filter: saturate(0.92);
  }
  50% {
    transform: scale(1.08);
    filter: saturate(1.08);
  }
}

/* ── Mobile (<960px) ─────────────────────────── */
@media (max-width: 959px) {
  .hero-actions {
    grid-template-columns: 1fr;
  }

  .hero-secondary,
  .hero-call-action {
    display: none;
  }

  .hero-primary-action {
    font-size: 1.05rem;
    min-height: 3.4rem;
  }
}

/* ── Desktop (≥960px) ────────────────────────── */
@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(20rem, 0.85fr);
    align-items: start;
  }

  .hero-proof-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    overflow: visible;
  }

  .hero-proof-card {
    flex: none;
    scroll-snap-align: unset;
  }

  .hero-actions {
    grid-template-columns: minmax(0, 1.12fr) minmax(9.75rem, 0.36fr) minmax(12.4rem, 0.5fr);
    align-items: stretch;
    gap: 0.85rem;
  }

  .hero-primary-action {
    grid-column: auto;
  }

  .hero-call-action {
    padding: 0.78rem 1.14rem;
  }

  .featured-media {
    aspect-ratio: 16 / 10;
  }
}
</style>
