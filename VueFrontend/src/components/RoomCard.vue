<script setup>
import { buildRoomEnquiry, getWhatsAppHref } from '@/data/site'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

const props = defineProps({
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
    <div class="room-image-wrap">
      <ResponsiveImage
        :room-slug="room.slug"
        :media="room.gallery[0]"
        :eager="eager"
        sizes="(min-width: 1200px) 28vw, (min-width: 760px) 44vw, 92vw"
      />

      <div class="room-topline">
        <span
          class="status-pill"
          :class="{ 'status-muted': !room.available }"
        >
          {{ room.available ? 'Available' : 'Occupied' }}
        </span>
        <span class="gallery-pill">{{ room.gallery.length }} photos</span>
      </div>
    </div>

    <div class="room-body">
      <div class="room-head">
        <div>
          <p class="room-kicker">{{ room.highlightLabel }}</p>
          <h3>{{ room.title }}</h3>
        </div>
        <p class="room-price">{{ room.priceLabel }}</p>
      </div>

      <p class="room-summary">
        {{ room.summary }}
      </p>

      <ul class="fact-list">
        <li
          v-for="fact in quickFacts(room)"
          :key="fact"
        >
          {{ fact }}
        </li>
      </ul>

      <div class="amenity-wrap">
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
          Enquire
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.room-card {
  overflow: hidden;
  display: grid;
}

.room-image-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.room-topline {
  position: absolute;
  inset: 0 auto auto 0;
  display: flex;
  gap: 0.55rem;
  padding: 0.85rem;
}

.status-pill,
.gallery-pill {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
}

.status-pill {
  background: rgba(16, 96, 63, 0.92);
  color: white;
}

.status-muted {
  background: rgba(95, 99, 100, 0.88);
}

.gallery-pill {
  background: rgba(248, 244, 235, 0.92);
  color: var(--text-strong);
}

.room-body {
  display: grid;
  gap: 0.95rem;
  padding: 1rem;
}

.room-head {
  display: grid;
  gap: 0.5rem;
}

.room-kicker {
  margin: 0;
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.room-head h3 {
  margin: 0.25rem 0 0;
  font-size: 1.35rem;
  line-height: 1.1;
}

.room-price {
  margin: 0;
  color: var(--text-strong);
  font-size: 1.3rem;
  font-weight: 700;
}

.room-summary {
  margin: 0;
  color: var(--muted);
}

.fact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.fact-list li {
  min-height: 2.25rem;
  padding: 0.5rem 0.75rem;
  border-radius: 999px;
  background: var(--paper-strong);
  color: var(--text-strong);
  font-size: 0.88rem;
  font-weight: 600;
}

.amenity-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.room-actions {
  display: flex;
  gap: 0.65rem;
  flex-wrap: wrap;
}

.room-actions > * {
  flex: 1 1 12rem;
}
</style>
