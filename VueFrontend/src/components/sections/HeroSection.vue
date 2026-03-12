<script setup>
import { computed } from 'vue'
import BrandMark from '@/components/brand/BrandMark.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

const props = defineProps({
  featuredRooms: {
    type: Array,
    required: true,
  },
  stats: {
    type: Array,
    required: true,
  },
  site: {
    type: Object,
    required: true,
  },
  startingPriceLabel: {
    type: String,
    required: true,
  },
  availableRoomCount: {
    type: Number,
    required: true,
  },
  callHref: {
    type: String,
    required: true,
  },
  whatsappHref: {
    type: String,
    required: true,
  },
})

const spotlightRoom = computed(() => props.featuredRooms[0] || null)
</script>

<template>
  <section class="hero-shell">
    <div class="container hero-grid">
      <div class="hero-copy page-rise">
        <div class="hero-topbar">
          <BrandMark
            compact
            inverted
          />
          <span class="hero-location">{{ site.locationShort }}</span>
        </div>

        <div class="hero-kicker-row">
          <span class="eyebrow hero-eyebrow">{{ site.heroLabel }}</span>
          <span class="hero-live-pill">{{ availableRoomCount }} live now</span>
        </div>

        <h1>{{ site.heroTitle }}</h1>
        <p class="hero-summary">
          {{ site.heroSummary }}
        </p>

        <div class="hero-actions">
          <a
            class="button-primary"
            :href="callHref"
          >
            Call now
          </a>
          <a
            class="button-secondary hero-secondary"
            :href="whatsappHref"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            class="button-tertiary"
            href="#rooms"
          >
            Browse rooms
          </a>
        </div>

        <div class="hero-points">
          <div
            v-for="(item, index) in site.heroHighlights.slice(0, 4)"
            :key="item"
            class="hero-point"
          >
            <span class="hero-point-index">0{{ index + 1 }}</span>
            <span>{{ item }}</span>
          </div>
        </div>

        <dl class="hero-stats">
          <div
            v-for="stat in stats"
            :key="stat.label"
          >
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
          <div>
            <dt>Open now</dt>
            <dd>{{ availableRoomCount }} rooms</dd>
          </div>
        </dl>
      </div>

      <aside
        v-if="spotlightRoom"
        class="hero-panel surface-panel page-rise-delay-1"
      >
        <div class="hero-panel-media">
          <span class="hero-panel-badge">Tonight's shortlist</span>
          <ResponsiveImage
            :room-slug="spotlightRoom.slug"
            :media="spotlightRoom.gallery[0]"
            eager
            sizes="(min-width: 1024px) 40vw, 92vw"
          />
        </div>

        <div class="hero-panel-body">
          <div class="hero-panel-top">
            <div>
              <p class="hero-panel-kicker">Best first look</p>
              <h2>{{ spotlightRoom.title }}</h2>
            </div>
            <span class="signal-pill hero-price">{{ spotlightRoom.priceLabel }}</span>
          </div>

          <p class="hero-panel-summary">{{ spotlightRoom.summary }}</p>

          <div class="hero-panel-tags">
            <span class="soft-chip">{{ spotlightRoom.occupancyLabel }}</span>
            <span class="soft-chip">{{ spotlightRoom.kitchenLabel }}</span>
            <span class="soft-chip">{{ spotlightRoom.washroomLabel }}</span>
          </div>

          <div class="hero-list-head">
            <span>More quick picks</span>
            <a href="#rooms">See all</a>
          </div>

          <div class="hero-list">
            <div
              v-for="room in featuredRooms"
              :key="room.slug"
              class="hero-list-item"
            >
              <div>
                <strong>{{ room.title }}</strong>
                <span>{{ room.highlightLabel }}</span>
              </div>
              <span>{{ room.priceLabel }}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero-shell {
  padding-top: 0.25rem;
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
  border: 1px solid rgba(121, 217, 202, 0.16);
  border-radius: 2rem;
  background:
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.16), transparent 30%),
    radial-gradient(circle at 12% 100%, rgba(255, 122, 26, 0.18), transparent 28%),
    linear-gradient(180deg, rgba(12, 29, 38, 0.95), rgba(7, 18, 26, 0.98));
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.24);
  color: #f7fbff;
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
  border: 1px solid rgba(121, 217, 202, 0.2);
  border-radius: 999px 999px 0 0;
}

.hero-copy::after {
  right: 1.25rem;
  bottom: -3rem;
  width: 9rem;
  height: 9rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 122, 26, 0.22), transparent 68%);
}

.hero-topbar,
.hero-kicker-row,
.hero-actions,
.hero-list-head,
.hero-panel-top {
  position: relative;
  z-index: 1;
}

.hero-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.hero-location {
  color: var(--muted-inverse);
  font-size: 0.86rem;
  font-weight: 700;
  text-align: right;
}

.hero-kicker-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.hero-eyebrow {
  border-color: rgba(121, 217, 202, 0.24);
  background: rgba(121, 217, 202, 0.12);
}

.hero-live-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2rem;
  padding: 0.42rem 0.82rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-live-pill::before {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  content: '';
  background: var(--accent);
  box-shadow: 0 0 0 0.25rem rgba(255, 122, 26, 0.14);
}

.hero-copy h1,
.hero-summary,
.hero-points,
.hero-stats {
  position: relative;
  z-index: 1;
}

.hero-copy h1 {
  max-width: 11ch;
  color: #f7fbff;
}

.hero-summary {
  max-width: 36rem;
  color: rgba(247, 251, 255, 0.8);
  font-size: 1rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-actions > * {
  flex: 1 1 11rem;
}

.hero-secondary {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-inverse);
}

.hero-points {
  display: grid;
  gap: 0.7rem;
}

.hero-point {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: #eff7fb;
  font-weight: 700;
}

.hero-point-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: rgba(255, 122, 26, 0.14);
  color: #ffba7c;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 0;
}

.hero-stats div {
  padding: 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(10px);
}

.hero-stats dt {
  color: var(--muted-inverse);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-stats dd {
  margin: 0.35rem 0 0;
  color: #f7fbff;
  font-size: 1.02rem;
  font-weight: 800;
}

.hero-actions .button-tertiary {
  color: rgba(247, 251, 255, 0.92);
}

.hero-panel {
  overflow: hidden;
  padding: 0.9rem;
}

.hero-panel-media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border-radius: 1.8rem 1.8rem 0.95rem 0.95rem;
}

.hero-panel-media :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-panel-badge {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.42rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 122, 26, 0.92);
  color: var(--forest);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-panel-body {
  display: grid;
  gap: 0.95rem;
  padding: 1rem 0.15rem 0.1rem;
}

.hero-panel-top {
  display: grid;
  gap: 0.7rem;
}

.hero-panel-kicker {
  margin-bottom: 0.35rem;
  color: var(--accent-deep);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.hero-price {
  background: rgba(121, 217, 202, 0.12);
}

.hero-panel-summary {
  color: var(--muted);
}

.hero-panel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.hero-list-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding-top: 0.1rem;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero-list-head a {
  color: var(--brand-strong);
}

.hero-list {
  display: grid;
  gap: 0.7rem;
}

.hero-list-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.9rem;
  padding-top: 0.7rem;
  border-top: 1px solid var(--line);
}

.hero-list-item strong,
.hero-list-item > span {
  color: var(--text-strong);
}

.hero-list-item strong {
  display: block;
  font-size: 0.98rem;
}

.hero-list-item span {
  color: var(--muted);
  font-size: 0.88rem;
}

.hero-list-item > span {
  font-weight: 800;
  white-space: nowrap;
}

@media (min-width: 760px) {
  .hero-points {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .hero-panel-top {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
  }
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(20rem, 0.8fr);
    align-items: stretch;
  }

  .hero-copy {
    padding: 1.45rem;
  }

  .hero-panel {
    padding: 1rem;
  }
}
</style>
