<script setup>
import RoomCard from '@/features/rooms/components/RoomCard.vue'

defineProps({
  rooms: {
    type: Array,
    required: true,
  },
  site: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">{{ site.homeRoomsEyebrow }}</span>
        <h2>{{ site.homeRoomsTitle }}</h2>
        <p>{{ site.homeRoomsSummary }}</p>
      </div>

      <div class="room-grid">
        <RoomCard
          v-for="(room, index) in rooms"
          :key="room.slug"
          :room="room"
          :eager="index === 0"
        />
      </div>

      <div class="section-actions">
        <RouterLink
          class="button-secondary"
          to="/rooms?availability=available"
        >
          {{ site.uiText.actions.compareAllRooms }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.room-grid {
  display: grid;
  gap: 0.9rem;
}

.section-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
}

@media (min-width: 760px) {
  .room-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
