<script setup>
import RoomCard from '@/features/rooms/components/RoomCard.vue'

defineProps({
  page: {
    type: Object,
    required: true,
  },
  rooms: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section
    id="category-rooms"
    class="section-shell category-rooms-shell"
    aria-labelledby="category-rooms-title"
  >
    <div class="container">
      <div class="category-rooms-heading">
        <div class="section-heading">
          <span class="label-upper">{{ page.inventoryEyebrow }}</span>
          <h2 id="category-rooms-title">{{ page.inventoryTitle }}</h2>
          <p>{{ page.inventorySummary }}</p>
        </div>

        <p class="category-results">
          <span aria-hidden="true" />
          {{ rooms.filter((room) => room.available).length }} available now
        </p>
      </div>

      <div class="category-room-grid">
        <RoomCard
          v-for="room in rooms"
          :key="room.slug"
          :room="room"
        />
      </div>

      <RouterLink
        class="category-all-link"
        to="/rooms"
      >
        Compare all rooms, budgets, and facilities
        <span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.category-rooms-shell {
  padding-block: var(--section-space);
}

.category-rooms-heading {
  display: grid;
  gap: var(--space-md);
}

.category-rooms-heading .section-heading {
  margin-bottom: 0;
}

.category-rooms-heading h2 {
  max-width: 13ch;
}

.category-results {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: var(--space-sm);
  color: var(--brand-strong);
  font-size: 0.875rem;
  font-weight: 700;
}

.category-results span {
  width: var(--space-sm);
  height: var(--space-sm);
  border-radius: var(--radius-full);
  background: var(--brand-strong);
}

.category-room-grid {
  display: grid;
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.category-all-link {
  display: inline-flex;
  min-height: 3.25rem;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-xl);
  color: var(--accent-deep);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: var(--space-xs);
}

.category-all-link span {
  transition: transform 160ms ease;
}

@media (hover: hover) {
  .category-all-link:hover {
    text-decoration-color: currentColor;
  }

  .category-all-link:hover span {
    transform: translateX(var(--space-xs));
  }
}

@media (min-width: 700px) {
  .category-rooms-heading {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }

  .category-room-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-lg);
  }
}

@media (min-width: 1080px) {
  .category-room-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
