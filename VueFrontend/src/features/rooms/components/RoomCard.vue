<script setup>
import RoomReferenceBadge from '@/features/rooms/components/RoomReferenceBadge.vue'
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
})
</script>

<template>
  <article class="room-card surface-card">
    <RouterLink
      class="room-card-link"
      :to="room.detailsHref"
      :aria-label="`View ${room.title}, ${room.priceLabel}, ${room.availabilityShortLabel}`"
    >
      <div class="room-media">
        <ResponsiveImage
          :room-slug="room.slug"
          :media="room.gallery[0]"
          :eager="eager"
          sizes="(min-width: 1180px) 31vw, (min-width: 700px) 47vw, 94vw"
        />

        <div class="room-reference-anchor">
          <RoomReferenceBadge
            :room="room"
            inverse
            compact
          />
        </div>
      </div>

      <div class="room-body">
        <div class="room-heading">
          <h3>{{ room.title }}</h3>
          <span
            class="room-status"
            :class="{ 'room-status--occupied': !room.available }"
          >
            <span aria-hidden="true" />
            {{ room.availabilityShortLabel }}
          </span>
        </div>

        <p class="room-price">{{ room.priceLabel }}</p>

        <ul class="room-facts" aria-label="Room setup">
          <li>{{ room.occupancyLabel }}</li>
          <li>{{ room.kitchenLabel }}</li>
          <li>{{ room.washroomLabel }}</li>
        </ul>

        <p class="room-summary">{{ room.fitSummary }}</p>

        <span class="room-link-label">
          See photos &amp; details
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.room-card {
  min-width: 0;
  overflow: hidden;
  border-color: transparent;
  transition: transform 180ms ease, box-shadow 180ms ease;
}

.room-card-link {
  display: grid;
  height: 100%;
  border-radius: inherit;
}

.room-card-link:focus-visible {
  outline: 2px solid var(--bg);
  outline-offset: -2px;
  box-shadow: inset 0 0 0 5px var(--sun);
}

.room-media {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--paper-soft);
}

.room-media :deep(picture),
.room-media :deep(img) {
  width: 100%;
  height: 100%;
}

.room-media :deep(img) {
  object-fit: cover;
  transition: transform 360ms cubic-bezier(0.2, 0.75, 0.24, 1);
}

.room-reference-anchor {
  position: absolute;
  top: var(--space-md);
  left: var(--space-md);
}

.room-body {
  display: grid;
  align-content: start;
  gap: var(--space-sm);
  padding: var(--space-md);
}

.room-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-sm);
}

.room-heading h3 {
  font-size: 1.25rem;
}

.room-status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  flex: 0 0 auto;
  color: var(--brand-strong);
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
}

.room-status > span {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: var(--radius-full);
  background: var(--brand-strong);
}

.room-status--occupied {
  color: var(--muted);
}

.room-status--occupied > span {
  background: var(--muted);
}

.room-price {
  color: var(--text-strong);
  font-size: 1.05rem;
  font-weight: 700;
}

.room-facts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-sm);
  margin: var(--space-xs) 0 0;
  padding: var(--space-sm) 0;
  border-block: 1px solid var(--line);
  color: var(--text);
  font-size: 0.8125rem;
  font-weight: 600;
  list-style: none;
}

.room-facts li + li::before {
  margin-right: var(--space-sm);
  color: var(--muted);
  content: '·';
}

.room-summary {
  display: -webkit-box;
  overflow: hidden;
  color: var(--text);
  font-size: 0.875rem;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.room-link-label {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  width: 100%;
  margin-top: var(--space-sm);
  color: var(--accent-deep);
  font-size: 0.875rem;
  font-weight: 700;
}

.room-link-label > span {
  transition: transform 180ms ease;
}

.room-card:focus-within .room-link-label > span {
  transform: translateX(var(--space-xs));
}

@media (hover: hover) {
  .room-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .room-card:hover .room-media :deep(img) {
    transform: scale(1.025);
  }

  .room-card:hover .room-link-label > span {
    transform: translateX(var(--space-xs));
  }
}
</style>
