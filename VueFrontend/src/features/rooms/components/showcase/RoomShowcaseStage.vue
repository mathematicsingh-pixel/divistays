<script setup>
import { toRef } from 'vue'
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
          class="stage-hint glass-chip"
        >
          Tap photo for next
        </span>
        <span class="stage-hint glass-chip">
          {{ isZoomed ? 'Drag to pan' : 'Pinch to zoom' }}
        </span>
      </div>

      <div
        v-if="showStageControls"
        class="stage-arrows"
      >
        <button
          class="stage-arrow glass-chip"
          type="button"
          data-stage-control="true"
          aria-label="Show previous photo"
          @click="goPrevious"
          @touchstart.stop
          @touchend.stop
        >
          ‹
        </button>
        <button
          class="stage-arrow glass-chip"
          type="button"
          data-stage-control="true"
          aria-label="Show next photo"
          @click="goNext"
          @touchstart.stop
          @touchend.stop
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
          class="stage-reset glass-chip"
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
      <video
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
  border: 1px solid rgba(255, 255, 255, 0.24);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.08)),
    rgba(255, 255, 255, 0.18);
  aspect-ratio: 4 / 3;
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.08);
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
  min-height: 1.9rem;
  padding: 0.38rem 0.68rem;
  color: var(--text-strong);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(238, 246, 250, 0.5)),
    rgba(255, 255, 255, 0.22);
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
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(238, 246, 250, 0.54)),
    rgba(255, 255, 255, 0.22);
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
  min-height: 2rem;
  padding: 0.38rem 0.72rem;
  border-radius: 999px;
  color: var(--text-strong);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.detail-kicker {
  color: var(--brand-strong);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.video-card {
  display: grid;
  gap: 0.7rem;
  padding: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.12)),
    rgba(255, 255, 255, 0.16);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.56),
    0 14px 28px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: blur(12px) saturate(165%);
  backdrop-filter: blur(12px) saturate(165%);
}

.video-copy {
  display: grid;
  gap: 0.2rem;
}

.video-card video {
  width: 100%;
  border-radius: 1rem;
}
</style>
