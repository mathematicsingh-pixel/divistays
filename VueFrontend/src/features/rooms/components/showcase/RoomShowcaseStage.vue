<script setup>
import { ref, toRef, watch } from 'vue'
import { buildVideoPath, buildVideoPosterPath } from '@/features/rooms'
import { useRoomShowcaseStage } from '@/features/rooms/composables/useRoomShowcaseStage'
import ResponsiveImage from '@/shared/ui/ResponsiveImage.vue'
import RoomShowcaseRail from './RoomShowcaseRail.vue'

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
})

const isVideoReady = ref(false)

watch(
  () => props.room.slug,
  () => {
    isVideoReady.value = false
  },
  { immediate: true },
)

function enableVideo() {
  isVideoReady.value = true
}

const {
  activeIndex,
  activeMedia,
  canCycle,
  isDragging,
  isZoomed,
  showStageControls,
  showStageHints,
  stageLabel,
  stageTransformStyle,
  setStageMedia,
  resetZoom,
  setActiveIndex,
  goPrevious,
  goNext,
  handleStageClick,
  handleStageKeydown,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  handleTouchCancel,
} = useRoomShowcaseStage(toRef(props, 'room'))
</script>

<template>
  <div class="gallery-stage">
    <div
      :ref="setStageMedia"
      class="stage-media"
      :class="{ 'is-zoomed': isZoomed, 'is-dragging': isDragging }"
      tabindex="0"
      role="button"
      :aria-label="stageLabel"
      @click="handleStageClick"
      @keydown="handleStageKeydown"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @touchcancel="handleTouchCancel"
      @gesturestart.prevent
      @gesturechange.prevent
      @gestureend.prevent
    >
      <div
        v-if="showStageHints"
        class="stage-hud"
      >
        <span
          v-if="canCycle"
          class="stage-hint surface-input"
        >
          Swipe left or right, or tap for next
        </span>
        <span class="stage-hint surface-input">
          {{ isZoomed ? 'Drag to pan' : 'Pinch to zoom' }}
        </span>
      </div>

      <div
        v-if="showStageControls"
        class="stage-arrows"
      >
        <button
          class="stage-arrow surface-input"
          type="button"
          data-stage-control="true"
          aria-label="Show previous photo"
          @click="goPrevious"
        >
          ‹
        </button>
        <button
          class="stage-arrow surface-input"
          type="button"
          data-stage-control="true"
          aria-label="Show next photo"
          @click="goNext"
        >
          ›
        </button>
      </div>

      <div
        class="stage-zoom-surface"
        :style="stageTransformStyle"
      >
        <ResponsiveImage
          :room-slug="room.slug"
          :media="activeMedia"
          eager
          sizes="(min-width: 1024px) 54vw, 100vw"
        />
      </div>
    </div>

    <div class="gallery-actions">
      <p>{{ activeMedia.caption }}</p>

      <div class="gallery-status">
        <button
          v-if="isZoomed"
          class="stage-reset surface-input"
          type="button"
          @click="resetZoom"
        >
          Reset zoom
        </button>
        <span>{{ activeIndex + 1 }} / {{ room.gallery.length }}</span>
      </div>
    </div>

    <p
      class="sr-only"
      aria-live="polite"
    >
      Showing photo {{ activeIndex + 1 }} of {{ room.gallery.length }}. {{ activeMedia.caption }}
    </p>

    <RoomShowcaseRail
      :room="room"
      :active-index="activeIndex"
      :set-active-index="setActiveIndex"
    />

    <div
      v-if="room.video"
      class="video-card"
    >
      <div class="video-copy">
        <p class="detail-kicker">Walkthrough</p>
        <h3>{{ room.video.label }}</h3>
      </div>
      <button
        v-if="!isVideoReady"
        class="video-trigger"
        type="button"
        @click="enableVideo"
      >
        <img
          class="video-poster"
          :src="buildVideoPosterPath(room.slug, room.video.key)"
          :alt="`${room.video.label} poster`"
          loading="lazy"
          decoding="async"
        >
        <span class="video-play-pill">Play walkthrough</span>
      </button>
      <video
        v-else
        controls
        playsinline
        preload="metadata"
        :poster="buildVideoPosterPath(room.slug, room.video.key)"
      >
        <source
          :src="buildVideoPath(room.slug, room.video.key)"
          type="video/mp4"
        >
      </video>
    </div>
  </div>
</template>

<style scoped>
.gallery-stage {
  display: grid;
  gap: 1rem;
}

.stage-media {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--paper-border);
  background: var(--surface-paper-soft-fill);
  aspect-ratio: 16 / 11;
  box-shadow: var(--shadow-md);
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}

.stage-media:focus-visible {
  outline: 2px solid var(--sun);
  outline-offset: 3px;
}

.stage-media.is-zoomed {
  cursor: grab;
}

.stage-media.is-dragging {
  cursor: grabbing;
}

.stage-hud {
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  pointer-events: none;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.stage-hint {
  min-height: 2.75rem;
  padding: 0.38rem 0.68rem;
  color: var(--text-strong);
  font-size: var(--text-label);
  font-weight: 800;
  letter-spacing: 0.04em;
  background: var(--surface-field-fill);
}

.stage-arrows {
  position: absolute;
  inset: auto 0 0 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  pointer-events: none;
}

.stage-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.7rem;
  height: 2.7rem;
  border-radius: 999px;
  color: var(--text-strong);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
  pointer-events: auto;
  touch-action: manipulation;
  background: var(--surface-field-fill);
}

.stage-zoom-surface {
  width: 100%;
  height: 100%;
  transform-origin: 50% 50%;
  transition: transform 0.2s ease;
  will-change: transform;
}

.stage-media.is-dragging .stage-zoom-surface {
  transition: none;
}

.stage-zoom-surface :deep(picture) {
  display: block;
  width: 100%;
  height: 100%;
}

.gallery-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: space-between;
  gap: 0.8rem;
}

.gallery-actions p {
  flex: 1 1 14rem;
  color: var(--muted);
  font-weight: 700;
  font-size: 0.94rem;
}

.gallery-status {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: end;
  gap: 0.55rem;
  margin-left: auto;
}

.gallery-status span {
  color: var(--muted);
  font-weight: 700;
}

.stage-reset {
  min-height: 2.75rem;
  padding: 0.38rem 0.72rem;
  border-radius: 999px;
  color: var(--text-strong);
  font-size: var(--text-label);
  font-weight: 800;
  letter-spacing: 0.04em;
}

.detail-kicker {
  color: var(--brand-strong);
  font-size: var(--text-label);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.video-card {
  display: grid;
  gap: 0.7rem;
  padding: 0.9rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: var(--radius-lg);
  background: var(--surface-field-fill);
  box-shadow: var(--shadow-sm);
}

.video-copy {
  display: grid;
  gap: 0.2rem;
}

.video-trigger {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  border: 1px solid var(--paper-border-soft);
  background: rgba(7, 18, 26, 0.9);
  box-shadow: var(--shadow-md);
}

.video-poster,
.video-card video {
  width: 100%;
  border-radius: var(--radius-md);
}

.video-play-pill {
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.4rem;
  padding: 0.5rem 0.95rem;
  border-radius: 999px;
  background: rgba(7, 18, 26, 0.78);
  color: var(--text-inverse);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

@media (hover: hover) {
  .stage-reset:hover {
    border-color: var(--line-strong);
  }
}

.stage-reset:active {
  transform: scale(0.97);
}

@media (min-width: 960px) {
  .stage-media {
    aspect-ratio: 4 / 3;
  }
}
</style>
