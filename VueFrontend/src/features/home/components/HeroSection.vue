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
  availableStartingPriceLabel: {
    type: String,
    default: '',
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
  props.availableStartingPriceLabel
    ? `From ${props.availableStartingPriceLabel}`
    : 'Check current availability',
)

const overallPricingNote = computed(() =>
  props.startingPriceLabel
    ? `All rooms from ${props.startingPriceLabel}`
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

        <p class="hero-brand-line">{{ site.brandLine }}</p>
        <h1>{{ site.heroTitle }}</h1>
        <p class="hero-summary">
          {{ site.heroSummary }}
        </p>

        <div class="hero-proof-row">
          <div class="hero-proof-card surface-field-panel">
            <dt>{{ availableRoomCount }} rooms available now</dt>
            <dd>{{ availablePricingNote }}</dd>
          </div>
          <div class="hero-proof-card surface-field-panel">
            <dt>{{ roomCount }} room options</dt>
            <dd>Compare by occupancy and setup</dd>
          </div>
          <div class="hero-proof-card surface-field-panel">
            <dt>{{ overallPricingNote }}</dt>
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
            <span class="featured-gallery-count">{{ featuredRoom.galleryCount || featuredRoom.gallery.length }} photos</span>
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
  gap: 1.1rem;
  padding: 1.15rem;
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
  width: 13rem;
  height: 13rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px 999px 0 0;
}

.hero-copy::after {
  right: 1.25rem;
  bottom: -3rem;
  width: 11rem;
  height: 11rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 211, 142, 0.18), transparent 68%);
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

.hero-brand-line {
  color: rgba(255, 211, 142, 0.95);
  font-size: 0.94rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-summary {
  max-width: 42rem;
  color: var(--muted-inverse);
  font-size: 1.02rem;
}

.hero-copy h1 {
  color: var(--text-inverse);
}

.hero-proof-row {
  display: grid;
  gap: 0.75rem;
}

.hero-proof-card {
  padding: var(--card-pad);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),
    rgba(255, 255, 255, 0.07);
  box-shadow: var(--shadow-chip);
}

.hero-proof-row dt {
  color: var(--text-inverse);
  font-weight: 800;
}

.hero-proof-row dd {
  margin: 0.25rem 0 0;
  color: var(--muted-inverse);
}

.hero-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.hero-primary-action {
  grid-column: 1 / -1;
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
  align-content: center;
  justify-items: start;
  justify-content: center;
  gap: 0.18rem;
  min-height: 3.35rem;
  min-width: 0;
  padding: 0.94rem 1rem 0.96rem;
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
  position: absolute;
  top: 0.88rem;
  right: 0.96rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.74rem;
  height: 0.74rem;
  border-radius: 999px;
  background: rgba(255, 211, 142, 0.12);
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
  width: 0.5rem;
  height: 0.5rem;
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

.featured-gallery-count {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.36rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--glass-stroke-light);
  background: rgba(7, 18, 26, 0.7);
  color: var(--text-inverse);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
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

@keyframes hero-call-ring {
  0% {
    opacity: 0.65;
    transform: scale(0.76);
  }

  70%,
  100% {
    opacity: 0;
    transform: scale(1.65);
  }
}

@keyframes hero-call-dot {
  0%,
  100% {
    transform: scale(0.92);
    filter: saturate(0.92);
  }

  50% {
    transform: scale(1.08);
    filter: saturate(1.08);
  }
}

@media (max-width: 959px) {
  .hero-actions {
    display: none;
  }
}

@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(20rem, 0.85fr);
    align-items: start;
  }

  .hero-proof-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
    padding: 0.96rem 1.14rem 0.98rem;
  }

  .featured-media {
    aspect-ratio: 16 / 10;
  }
}
</style>
