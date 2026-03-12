<script setup>
import { buildRoomEnquiry, getWhatsAppHref } from '@/data/site'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

defineProps({
  room: {
    type: Object,
    required: true,
  },
  eager: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['open'])

const quickFacts = (room) => [room.occupancyLabel, room.kitchenLabel, room.washroomLabel]
</script>

<template>
  <article class="room-card surface-panel">
    <div class="room-media">
      <ResponsiveImage
        :room-slug="room.slug"
        :media="room.gallery[0]"
        :eager="eager"
        sizes="(min-width: 1200px) 29vw, (min-width: 760px) 44vw, 92vw"
      />

      <div class="room-badges">
        <span
          class="status-pill"
          :class="{ muted: !room.available }"
        >
          {{ room.available ? 'Available' : 'Occupied' }}
        </span>
        <span class="gallery-pill">{{ room.gallery.length }} photos</span>
      </div>
    </div>

    <div class="room-body">
      <div class="room-head">
        <div class="room-copy">
          <p class="room-kicker">{{ room.highlightLabel }}</p>
          <h3>{{ room.title }}</h3>
        </div>
        <p class="room-price">{{ room.priceLabel }}</p>
      </div>

      <p class="room-summary">
        {{ room.summary }}
      </p>

      <div class="fact-row">
        <span
          v-for="fact in quickFacts(room)"
          :key="fact"
          class="fact-pill"
        >
          {{ fact }}
        </span>
      </div>

      <div class="amenity-row">
        <span
          v-for="amenity in room.amenities.slice(0, 3)"
          :key="amenity"
          class="soft-chip"
        >
          {{ amenity }}
        </span>
      </div>

      <div class="room-actions">
        <button
          class="button-primary"
          type="button"
          @click="$emit('open')"
        >
          View details
        </button>
        <a
          class="button-secondary"
          :href="getWhatsAppHref(buildRoomEnquiry(room))"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.room-card {
  overflow: hidden;
  display: grid;
  position: relative;
  border: 1px solid rgba(121, 217, 202, 0.16);
  background:
    linear-gradient(180deg, rgba(249, 252, 255, 0.98), rgba(240, 247, 250, 0.96));
}

.room-card::before {
  position: absolute;
  inset: 0 0 auto;
  height: 0.35rem;
  content: '';
  background: linear-gradient(90deg, var(--accent) 0%, var(--sun) 45%, var(--brand) 100%);
}

.room-card::after {
  position: absolute;
  top: 0.9rem;
  right: -1.2rem;
  width: 5rem;
  height: 5rem;
  border: 1px solid rgba(121, 217, 202, 0.18);
  border-radius: 999px 999px 0 0;
  content: '';
  pointer-events: none;
}

.room-media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 5 / 4;
}

.room-media :deep(img) {
  width: 100%;
  height: 100%;
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

.status-pill,
.gallery-pill {
  display: inline-flex;
  align-items: center;
  min-height: 1.95rem;
  padding: 0.36rem 0.7rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(7, 18, 26, 0.7);
  color: var(--text-inverse);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.status-pill.muted {
  color: rgba(247, 251, 255, 0.68);
}

.room-body {
  display: grid;
  gap: 0.9rem;
  padding: 1.05rem;
}

.room-head {
  display: grid;
  gap: 0.75rem;
}

.room-copy {
  display: grid;
  gap: 0.18rem;
}

.room-kicker {
  color: var(--accent-deep);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.room-price {
  color: var(--text-strong);
  font-size: 1.08rem;
  font-weight: 800;
  white-space: nowrap;
}

.room-summary {
  color: var(--muted);
}

.fact-row,
.amenity-row,
.room-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.fact-pill {
  display: inline-flex;
  align-items: center;
  min-height: 2.1rem;
  padding: 0.45rem 0.72rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(121, 217, 202, 0.08);
  color: var(--text-strong);
  font-size: 0.82rem;
  font-weight: 700;
}

.room-actions > * {
  flex: 1 1 11rem;
}

.room-actions :deep(.button-secondary) {
  border-color: var(--line);
}

@media (min-width: 760px) {
  .room-head {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: start;
  }
}
</style>
