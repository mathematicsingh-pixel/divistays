<script setup>
import { computed, ref, watch } from 'vue'
import ResponsiveImage from '@/shared/ui/ResponsiveImage.vue'
import RoomGalleryDialog from './RoomGalleryDialog.vue'
import RoomShowcaseRail from './RoomShowcaseRail.vue'

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
})

const activeIndex = ref(0)
const isGalleryOpen = ref(false)
const activeMedia = computed(() => props.room.gallery[activeIndex.value])
const canCycle = computed(() => props.room.gallery.length > 1)

let touchStart = null

function select(index) {
  const total = props.room.gallery.length

  if (!total) {
    return
  }

  activeIndex.value = (index + total) % total
}

function goPrevious() {
  select(activeIndex.value - 1)
}

function goNext() {
  select(activeIndex.value + 1)
}

function handleTouchStart(event) {
  if (event.touches.length !== 1) {
    touchStart = null
    return
  }

  touchStart = {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY,
  }
}

function handleTouchEnd(event) {
  if (!touchStart || !canCycle.value) {
    touchStart = null
    return
  }

  const touch = event.changedTouches[0]
  const deltaX = touch.clientX - touchStart.x
  const deltaY = touch.clientY - touchStart.y

  touchStart = null

  if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.2) {
    return
  }

  if (deltaX > 0) {
    goPrevious()
    return
  }

  goNext()
}

function handleTouchCancel() {
  touchStart = null
}

watch(
  () => props.room.slug,
  () => {
    activeIndex.value = 0
    isGalleryOpen.value = false
  },
  { immediate: true },
)
</script>

<template>
  <section
    class="gallery-stage"
    :aria-labelledby="`${room.slug}-gallery-heading`"
  >
    <div class="gallery-heading">
      <div>
        <p
          :id="`${room.slug}-gallery-heading`"
          class="label-upper"
        >
          Photo gallery
        </p>
        <p>
          {{ room.gallery.length }} {{ room.gallery.length === 1 ? 'photo' : 'photos' }}{{ room.video ? ' and a video walkthrough' : '' }} of this room
        </p>
      </div>
    </div>

    <figure>
      <div
        class="stage-media"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
        @touchcancel="handleTouchCancel"
      >
        <ResponsiveImage
          :room-slug="room.slug"
          :media="activeMedia"
          eager
          sizes="(min-width: 1024px) 58vw, 100vw"
        />

        <button
          class="viewer-trigger button-secondary"
          type="button"
          aria-label="Open current room photo full screen"
          @click="isGalleryOpen = true"
        >
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M7 3H3v4M13 3h4v4M17 13v4h-4M7 17H3v-4" />
          </svg>
          <span>View full screen</span>
        </button>

        <div
          v-if="canCycle"
          class="stage-arrows"
        >
          <button
            class="stage-arrow"
            type="button"
            aria-label="Show previous photo"
            @click="goPrevious"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            class="stage-arrow"
            type="button"
            aria-label="Show next photo"
            @click="goNext"
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </div>

      <figcaption>
        <span>{{ activeMedia.caption }}</span>
        <strong>{{ activeIndex + 1 }} / {{ room.gallery.length }}</strong>
      </figcaption>
    </figure>

    <RoomShowcaseRail
      :room="room"
      :active-index="activeIndex"
      @select="select"
    />

    <p
      class="sr-only"
      aria-live="polite"
    >
      Showing photo {{ activeIndex + 1 }} of {{ room.gallery.length }}. {{ activeMedia.caption }}
    </p>

    <RoomGalleryDialog
      :open="isGalleryOpen"
      :room="room"
      :initial-index="activeIndex"
      @close="isGalleryOpen = false"
      @select="select"
    />
  </section>
</template>

<style scoped>
.gallery-stage {
  display: grid;
  gap: var(--space-md);
  min-width: 0;
}

.gallery-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-md);
  padding-inline: var(--space-md);
}

.gallery-heading > div {
  display: grid;
  gap: var(--space-xs);
}

.gallery-heading > div > p:last-child {
  color: var(--muted);
  font-size: 0.875rem;
  font-weight: 600;
}

.gallery-stage figure {
  display: grid;
  gap: var(--space-sm);
  margin: 0;
}

.stage-media {
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--paper-soft);
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}

.stage-media :deep(picture),
.stage-media :deep(img) {
  width: 100%;
  height: 100%;
}

.viewer-trigger {
  position: absolute;
  top: var(--space-sm);
  right: var(--space-sm);
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  min-height: 2.75rem;
  padding: var(--space-sm) var(--space-md);
  font-size: 0.8125rem;
  box-shadow: var(--shadow-sm);
}

.viewer-trigger svg {
  width: 1rem;
  height: 1rem;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.stage-arrows {
  position: absolute;
  inset: 50% var(--space-sm) auto;
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  transform: translateY(-50%);
}

.stage-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-full);
  background: var(--paper);
  color: var(--text-strong);
  font-size: 1.75rem;
  line-height: 1;
  pointer-events: auto;
  box-shadow: var(--shadow-sm);
}

.gallery-stage figcaption {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
  padding-inline: var(--space-md);
  color: var(--muted);
  font-size: 0.875rem;
}

.gallery-stage figcaption strong {
  flex: 0 0 auto;
  color: var(--text-strong);
}

@media (min-width: 760px) {
  .gallery-heading,
  .gallery-stage figcaption {
    padding-inline: 0;
  }

  .stage-media {
    border-radius: var(--radius-lg);
  }

  .viewer-trigger {
    top: var(--space-md);
    right: var(--space-md);
  }
}
</style>
