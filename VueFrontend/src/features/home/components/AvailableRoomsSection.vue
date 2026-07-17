<script setup>
import { computed } from 'vue'
import RoomCard from '@/features/rooms/components/RoomCard.vue'

const props = defineProps({
  rooms: {
    type: Array,
    required: true,
  },
  site: {
    type: Object,
    required: true,
  },
})

const featuredRooms = computed(() => props.rooms.slice(0, 3))
</script>

<template>
  <section class="section-shell available-shell" aria-labelledby="available-rooms-title">
    <div class="container">
      <div class="rooms-heading">
        <div class="section-heading">
          <span class="label-upper">{{ site.homeRoomsEyebrow }}</span>
          <h2 id="available-rooms-title">{{ site.homeRoomsTitle }}</h2>
          <p>{{ site.homeRoomsSummary }}</p>
        </div>

        <RouterLink
          class="rooms-all-link"
          to="/rooms"
        >
          See all {{ rooms.length }} available {{ rooms.length === 1 ? 'room' : 'rooms' }}
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>

      <div class="room-track">
        <RoomCard
          v-for="room in featuredRooms"
          :key="room.slug"
          class="room-track-item"
          :room="room"
        />
      </div>

      <RouterLink
        class="button-secondary rooms-mobile-action"
        to="/rooms"
      >
        See all available rooms
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.available-shell {
  padding: var(--section-space) 0;
  background: var(--canvas);
}

.rooms-heading {
  display: grid;
  gap: var(--space-md);
}

.section-heading {
  margin-bottom: 0;
}

.section-heading h2 {
  max-width: 12ch;
}

.rooms-all-link {
  display: none;
  align-items: center;
  gap: var(--space-sm);
  min-height: 2.75rem;
  color: var(--text-strong);
  font-weight: 700;
}

.room-track {
  display: flex;
  gap: var(--space-md);
  margin: var(--space-xl) -1rem 0;
  padding: 0 1rem var(--space-md);
  overflow-x: auto;
  scroll-padding-inline: 1rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.room-track::-webkit-scrollbar {
  display: none;
}

.room-track-item {
  flex: 0 0 min(86vw, 21rem);
  scroll-snap-align: start;
}

.rooms-mobile-action {
  width: 100%;
  margin-top: var(--space-md);
}

@media (min-width: 700px) {
  .rooms-heading {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }

  .rooms-all-link {
    display: inline-flex;
  }

  .room-track {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-inline: 0;
    padding-inline: 0;
    overflow: visible;
  }

  .room-track-item {
    min-width: 0;
  }

  .rooms-mobile-action {
    display: none;
  }
}

@media (min-width: 1080px) {
  .room-track {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--space-lg);
  }
}
</style>
