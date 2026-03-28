<script setup>
import { ref } from 'vue'
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

const scrollEl = ref(null)

function scrollTrack(dir) {
  if (!scrollEl.value) return
  const amount = scrollEl.value.offsetWidth * 0.75
  scrollEl.value.scrollBy({ left: dir * amount, behavior: 'smooth' })
}
</script>

<template>
  <section class="section-shell">
    <div class="container">
      <div class="section-heading-row">
        <div class="section-heading">
          <span class="eyebrow">{{ site.homeRoomsEyebrow }}</span>
          <h2>{{ site.homeRoomsTitle }}</h2>
          <p>{{ site.homeRoomsSummary }}</p>
        </div>

        <div class="scroll-arrows">
          <button
            class="scroll-arrow"
            type="button"
            aria-label="Scroll left"
            @click="scrollTrack(-1)"
          >
            &#8592;
          </button>
          <button
            class="scroll-arrow"
            type="button"
            aria-label="Scroll right"
            @click="scrollTrack(1)"
          >
            &#8594;
          </button>
        </div>
      </div>

      <div
        ref="scrollEl"
        class="room-track"
      >
        <RoomCard
          v-for="(room, index) in rooms"
          :key="room.slug"
          class="room-track-item"
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
.section-heading-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.scroll-arrows {
  display: none;
  gap: 0.5rem;
  flex-shrink: 0;
}

.scroll-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid var(--paper-border-soft);
  background: var(--surface-field-fill);
  color: var(--text-strong);
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease;
}

.scroll-arrow:hover {
  background: var(--surface-panel-fill);
  border-color: var(--line-strong);
}

/* ── Track ───────────────────────────────────── */
.room-track {
  display: flex;
  gap: 0.9rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  /* bleed past container padding on mobile */
  margin-inline: calc(-1 * var(--container-pad, 1rem));
  padding-inline: var(--container-pad, 1rem);
  padding-bottom: 0.5rem;
}

.room-track::-webkit-scrollbar {
  display: none;
}

.room-track-item {
  flex: 0 0 85%;
  min-width: 0;
  scroll-snap-align: start;
}

.section-actions {
  display: flex;
  justify-content: flex-start;
  margin-top: 1rem;
}

/* ── Tablet ──────────────────────────────────── */
@media (min-width: 640px) {
  .room-track-item {
    flex: 0 0 46%;
  }
}

/* ── Desktop ─────────────────────────────────── */
@media (min-width: 960px) {
  .room-track {
    margin-inline: 0;
    padding-inline: 0;
  }

  .room-track-item {
    flex: 0 0 30%;
  }

  .scroll-arrows {
    display: flex;
  }
}
</style>
