<script setup>
import RoomReferenceBadge from '@/features/rooms/components/RoomReferenceBadge.vue'
import { siteConfig } from '@/features/site/config/site'
import ResponsiveImage from '@/shared/ui/ResponsiveImage.vue'

defineProps({
  room: {
    type: Object,
    required: true,
  },
  eager: {
    type: Boolean,
    default: false,
  },
  showQuickPreview: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['preview'])

const topFacts = (room) => [room.occupancyLabel, room.washroomLabel]
</script>

<template>
  <article class="room-card surface-panel surface-soft-panel">
    <div class="room-media">
      <RouterLink :to="room.detailsHref">
        <ResponsiveImage
          :room-slug="room.slug"
          :media="room.gallery[0]"
          :eager="eager"
          sizes="(min-width: 1200px) 29vw, (min-width: 760px) 44vw, 92vw"
        />
      </RouterLink>

      <div class="room-badges">
        <RoomReferenceBadge
          :room="room"
          inverse
        />
        <button
          v-if="showQuickPreview"
          class="preview-pill"
          type="button"
          @click="$emit('preview')"
        >
          Quick preview
        </button>
      </div>
    </div>

    <div class="room-body">
      <div class="room-copy">
        <p class="room-kicker">{{ room.highlightLabel }}</p>
        <h3>
          <RouterLink :to="room.detailsHref">
            {{ room.title }}
          </RouterLink>
        </h3>
      </div>

      <div class="room-price-line">
        <span class="room-price">{{ room.priceLabel }}</span>
        <span class="room-price-sep" aria-hidden="true">·</span>
        <span
          class="room-status"
          :class="{ 'room-status--occupied': !room.available }"
        >
          {{ room.availabilityShortLabel }}
        </span>
      </div>

      <p class="room-facts">
        {{ topFacts(room).join(' · ') }}
      </p>

      <p class="room-summary">
        {{ room.fitSummary }}
      </p>

      <div class="room-actions">
        <RouterLink
          class="button-primary"
          :to="room.detailsHref"
        >
          {{ room.available ? siteConfig.uiText.actions.viewRoom : siteConfig.uiText.actions.viewSimilarRooms }}
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.room-card {
  overflow: hidden;
  display: grid;
  position: relative;
}

.room-card::before {
  position: absolute;
  inset: 0 0 auto;
  height: 0.35rem;
  content: '';
  background: linear-gradient(90deg, var(--accent) 0%, var(--sun) 45%, var(--brand) 100%);
}

.room-media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 5 / 4;
}

.room-media a,
.room-media :deep(picture),
.room-media :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
}

.room-media :deep(img) {
  object-fit: cover;
}

.room-badges {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.preview-pill {
  display: none;
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
  transition: transform 0.18s ease, background-color 0.18s ease;
}

/* ── body ── */

.room-body {
  display: grid;
  gap: 0.55rem;
  padding: var(--card-pad);
  border-top: 1px solid var(--paper-border-soft);
}

.room-copy {
  display: grid;
  gap: 0.18rem;
}

.room-kicker {
  color: var(--accent-deep);
  font-size: var(--text-kicker);
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.room-copy a {
  color: var(--text-strong);
}

/* price + availability on one line */
.room-price-line {
  display: flex;
  align-items: baseline;
  gap: 0.45rem;
  flex-wrap: wrap;
}

.room-price {
  color: var(--text-strong);
  font-size: 1.18rem;
  font-weight: 800;
  white-space: nowrap;
}

.room-price-sep {
  color: var(--muted);
  font-weight: 700;
}

.room-status {
  color: var(--brand-strong);
  font-size: 0.82rem;
  font-weight: 800;
}

.room-status--occupied {
  color: var(--accent-deep);
}

/* compact fact text line */
.room-facts {
  color: var(--text-strong);
  font-size: 0.84rem;
  font-weight: 600;
}

.room-summary {
  color: var(--muted);
  font-size: 0.88rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.room-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.35rem;
}

.room-actions > * {
  flex: 1 1 11rem;
}

@media (hover: hover) {
  .preview-pill:hover {
    background: rgba(7, 18, 26, 0.82);
  }
}

.preview-pill:active {
  transform: scale(0.97);
}

@media (min-width: 960px) {
  .preview-pill {
    display: inline-flex;
  }
}
</style>
