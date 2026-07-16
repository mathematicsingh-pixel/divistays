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
  inverse: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['select'])
</script>

<template>
  <div
    class="thumb-row"
    :class="{ 'thumb-row--inverse': inverse }"
    aria-label="Choose a room photo"
  >
    <button
      v-for="(media, index) in room.gallery"
      :key="media.key"
      class="thumb-button"
      :class="{ active: index === activeIndex }"
      type="button"
      :aria-current="index === activeIndex ? 'true' : undefined"
      :aria-label="`Show photo ${index + 1} of ${room.gallery.length}: ${media.caption}`"
      @click="$emit('select', index)"
    >
      <ResponsiveImage
        :room-slug="room.slug"
        :media="media"
        sizes="6rem"
      />
    </button>
  </div>
</template>

<style scoped>
.thumb-row {
  display: flex;
  gap: var(--space-sm);
  padding: 0 var(--space-md) var(--space-xs);
  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scrollbar-width: thin;
  scroll-snap-type: x proximity;
}

.thumb-button {
  position: relative;
  flex: 0 0 5rem;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border: 2px solid transparent;
  border-radius: var(--radius-md);
  background: var(--paper-soft);
  opacity: 0.68;
  scroll-snap-align: start;
  transition: border-color 160ms ease, opacity 160ms ease, transform 160ms ease;
}

.thumb-button :deep(picture),
.thumb-button :deep(img) {
  width: 100%;
  height: 100%;
}

.thumb-button.active {
  border-color: var(--brand-strong);
  opacity: 1;
}

.thumb-row--inverse .thumb-button {
  background: var(--bg-soft);
}

.thumb-row--inverse .thumb-button.active {
  border-color: var(--brand);
}

@media (hover: hover) {
  .thumb-button:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
}

@media (min-width: 760px) {
  .thumb-row {
    padding-inline: 0;
  }

  .thumb-button {
    flex-basis: 6rem;
  }
}
</style>
