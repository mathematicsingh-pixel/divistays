<script setup>
import { computed } from 'vue'
import BrandMark from '@/features/site/components/brand/BrandMark.vue'
import RoomReferenceBadge from '@/features/rooms/components/RoomReferenceBadge.vue'
import ResponsiveImage from '@/shared/ui/ResponsiveImage.vue'

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
  return [props.featuredRoom.occupancyLabel, props.featuredRoom.kitchenLabel, props.featuredRoom.washroomLabel]
})
</script>

<template>
  <section
    id="home"
    class="hero-shell"
  >
    <div class="container hero-grid">
      <div class="hero-copy surface-dark-shell page-rise">
        <div class="hero-topbar">
          <BrandMark
            compact
            inverted
          />
          <span class="eyebrow hero-eyebrow hero-top-note">{{ site.heroEyebrow }}</span>
        </div>

        <p class="hero-brand-line"><span class="hero-brand-line-text">{{ site.brandLine }}</span></p>

        <div class="hero-heading-wrap">
          <h1>{{ site.heroTitle }}</h1>
        </div>

        <p class="hero-summary">
          {{ site.heroSummary }}
        </p>

        <div class="hero-proof-row">
          <div class="hero-proof-card surface-field-panel">
            <dt>
              <span class="hero-proof-icon">🏠</span>
              <span class="hero-proof-live-dot" aria-hidden="true" />
              {{ availableRoomCount }} rooms available now
            </dt>
            <dd>{{ availablePricingNote }}</dd>
          </div>
          <div class="hero-proof-card surface-field-panel">
            <dt>
              <span class="hero-proof-icon">📋</span>
              {{ roomCount }} room options
            </dt>
            <dd>Compare by occupancy and setup</dd>
          </div>
          <div class="hero-proof-card surface-field-panel">
            <dt>
              <span class="hero-proof-icon">💰</span>
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
        class="hero-featured surface-panel surface-soft-panel page-rise-delay-1"
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
          <p class="featured-kicker">{{ featuredRoom.highlightLabel }}</p>
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
              :key="fact"
              class="fact-pill"
            >
              {{ fact }}
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
  border-radius: var(--radius-xl);
  color: var(--text-inverse);
  overflow: hidden;
}

.hero-copy::before,
.hero-copy::after {
  position: absolute;
  content: '';
  pointer-events: none;
}

.hero-copy::before {
  top: -3.5rem;
  right: -2.5rem;
  width: 15rem;
  height: 15rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px 999px 0 0;
  animation: hero-orbit 18s linear infinite;
}

.hero-copy::after {
  right: 1.25rem;
  bottom: -3rem;
  width: 14rem;
  height: 14rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 211, 142, 0.22), transparent 65%);
  animation: hero-glow-pulse 4s ease-in-out infinite alternate;
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
  box-shadow: var(--shadow-chip);
  transition: transform 0.18s ease;
}

.hero-proof-icon {
  font-size: 1.15rem;
  margin-right: 0.3rem;
  vertical-align: -0.08em;
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
  font-size: var(--text-kicker);
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
  font-size: var(--text-kicker);
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
  font-size: var(--text-kicker);
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
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
  min-height: 2.35rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: 999px;
  background: var(--surface-field-fill);
  color: var(--text-strong);
  font-size: 0.78rem;
  font-weight: 700;
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

@keyframes hero-orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes hero-glow-pulse {
  from { opacity: 0.7; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1.08); }
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
