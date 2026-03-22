<script setup>
import RoomCard from '@/features/rooms/components/RoomCard.vue'

defineProps({
  rooms: {
    type: Array,
    required: true,
  },
  resultLabel: {
    type: String,
    required: true,
  },
  actions: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <p
      class="sr-only"
      aria-live="polite"
    >
      {{ resultLabel }}
    </p>

    <div
      v-if="rooms.length"
      class="room-grid"
    >
      <RoomCard
        v-for="(room, index) in rooms"
        :key="room.slug"
        :room="room"
        :eager="index < 2"
        show-quick-preview
        @preview="actions.openPreview(room.slug)"
      />
    </div>

    <div
      v-else
      class="empty-state surface-panel glass-panel"
    >
      <h3>No rooms match those filters.</h3>
      <p>Clear a few filters or switch to all rooms.</p>
      <button
        class="button-primary"
        type="button"
        @click="actions.resetFilters()"
      >
        Reset filters
      </button>
    </div>
  </div>
</template>

<style scoped>
.room-grid {
  display: grid;
  gap: 0.9rem;
  margin-top: 1rem;
}

.empty-state {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
  padding: 1.1rem;
  background:
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.12), transparent 26%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.12)),
    rgba(249, 252, 255, 0.64);
}

.empty-state p {
  color: var(--muted);
}

@media (min-width: 760px) {
  .room-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
