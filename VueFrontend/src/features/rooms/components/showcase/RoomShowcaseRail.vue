<script setup>
import ResponsiveImage from '@/shared/ui/ResponsiveImage.vue'

defineProps({
  room: {
    type: Object,
    required: true,
  },
  activeIndex: {
    type: Number,
    required: true,
  },
  setActiveIndex: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div class="thumb-row">
    <button
      v-for="(media, index) in room.gallery"
      :key="media.key"
      class="thumb-button"
      :class="{ active: index === activeIndex }"
      type="button"
      :aria-current="index === activeIndex ? 'true' : 'false'"
      :aria-label="`Show photo ${index + 1} of ${room.gallery.length}`"
      @click="setActiveIndex(index)"
    >
      <ResponsiveImage
        :room-slug="room.slug"
        :media="media"
        sizes="5rem"
      />
      <span
        v-if="index === activeIndex"
        class="thumb-active-label"
      >
        Viewing
      </span>
    </button>
  </div>
</template>

<style scoped>
.thumb-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.5rem;
}

.thumb-button {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--paper-border);
  border-radius: 0.9rem;
  background: var(--surface-paper-soft-fill);
  -webkit-backdrop-filter: blur(8px) saturate(160%);
  backdrop-filter: blur(8px) saturate(160%);
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease;
}

.thumb-button :deep(.responsive-image) {
  transition:
    transform 0.18s ease,
    filter 0.18s ease,
    opacity 0.18s ease;
}

.thumb-button.active {
  transform: translateY(-0.1rem) scale(1.03);
  border-color: rgba(44, 161, 142, 0.62);
  box-shadow:
    0 0 0 0.2rem rgba(121, 217, 202, 0.18),
    0 16px 28px rgba(0, 0, 0, 0.14);
}

.thumb-button.active :deep(.responsive-image) {
  transform: scale(1.06);
}

.thumb-button:not(.active) :deep(.responsive-image) {
  filter: saturate(0.8) brightness(0.88);
  opacity: 0.82;
}

.thumb-active-label {
  position: absolute;
  left: 0.45rem;
  right: 0.45rem;
  bottom: 0.45rem;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 1.45rem;
  padding: 0.2rem 0.45rem;
  border-radius: 999px;
  background: rgba(7, 18, 26, 0.72);
  color: var(--text-inverse);
  font-size: 0.66rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (min-width: 760px) {
  .thumb-row {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 0.7rem;
  }
}

@media (max-width: 959px) {
  .thumb-button {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
  }
}
</style>
