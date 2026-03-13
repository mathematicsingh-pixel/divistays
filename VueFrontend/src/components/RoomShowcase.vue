<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import RoomReferenceBadge from '@/components/RoomReferenceBadge.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { buildRoomEnquiry, getCallHref, getWhatsAppHref } from '@/data/site'
import { buildVideoPath, buildVideoPosterPath } from '@/lib/media'

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
  preview: {
    type: Boolean,
    default: false,
  },
})

const activeIndex = ref(0)
const stageMedia = ref(null)
const zoomScale = ref(1)
const zoomOffset = ref({ x: 0, y: 0 })
const isDragging = ref(false)
const showStageHints = ref(true)

const MAX_STAGE_ZOOM = 4
const TAP_MOVE_THRESHOLD = 12
const PINCH_MOVE_THRESHOLD = 6
const HINT_HIDE_DELAY = 2200

let hintHideTimer = null

const interactionState = {
  mode: null,
  moved: false,
  ignoreClickUntil: 0,
  startPoint: null,
  startOffset: { x: 0, y: 0 },
  startScale: 1,
  startDistance: 0,
  startMidpoint: { x: 0, y: 0 },
}

const messageHref = computed(() => getWhatsAppHref(buildRoomEnquiry(props.room)))
const primaryLabel = computed(() => props.room.available ? 'WhatsApp about this room' : 'Ask for similar rooms')
const headingTag = computed(() => props.preview ? 'h2' : 'h1')
const activeMedia = computed(() => props.room.gallery[activeIndex.value])
const canCycle = computed(() => props.room.gallery.length > 1)
const isZoomed = computed(() => zoomScale.value > 1.01)
const showStageControls = computed(() => canCycle.value && !isZoomed.value)
const stageTransformStyle = computed(() => ({
  transform: `translate3d(${zoomOffset.value.x}px, ${zoomOffset.value.y}px, 0) scale(${zoomScale.value})`,
}))
const stageLabel = computed(() => {
  const commands = []

  if (canCycle.value && !isZoomed.value) {
    commands.push('Tap or click for the next photo')
  }

  commands.push(isZoomed.value ? 'Drag to pan' : 'Pinch to zoom')

  return `Room photo ${activeIndex.value + 1} of ${props.room.gallery.length}. ${activeMedia.value.caption}. ${commands.join('. ')}.`
})
const nextQuestions = computed(() => [
  `Mention ${props.room.referenceLabel} when you call or WhatsApp`,
  `Current status updated ${props.room.availabilityUpdatedLabel}`,
  'Confirm what is included in the monthly rent',
  props.room.visitNextStep,
])

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function isStageControlTarget(target) {
  return target instanceof Element && Boolean(target.closest('[data-stage-control="true"]'))
}

function clearHintTimer() {
  if (hintHideTimer) {
    clearTimeout(hintHideTimer)
    hintHideTimer = null
  }
}

function hideStageHints() {
  clearHintTimer()
  showStageHints.value = false
}

function scheduleHintHide() {
  clearHintTimer()
  showStageHints.value = true

  if (typeof window === 'undefined') {
    return
  }

  hintHideTimer = setTimeout(() => {
    showStageHints.value = false
    hintHideTimer = null
  }, HINT_HIDE_DELAY)
}

function getStageRect() {
  return stageMedia.value?.getBoundingClientRect() ?? null
}

function clampOffset(x, y, scale = zoomScale.value) {
  const rect = getStageRect()

  if (!rect || scale <= 1) {
    return { x: 0, y: 0 }
  }

  const maxX = ((rect.width * scale) - rect.width) / 2
  const maxY = ((rect.height * scale) - rect.height) / 2

  return {
    x: clamp(x, -maxX, maxX),
    y: clamp(y, -maxY, maxY),
  }
}

function applyZoom(scale, x, y) {
  const nextScale = clamp(scale, 1, MAX_STAGE_ZOOM)

  if (nextScale <= 1.01) {
    zoomScale.value = 1
    zoomOffset.value = { x: 0, y: 0 }
    return
  }

  zoomScale.value = nextScale
  zoomOffset.value = clampOffset(x, y, nextScale)
}

function resetZoom() {
  zoomScale.value = 1
  zoomOffset.value = { x: 0, y: 0 }
  isDragging.value = false
  interactionState.mode = null
  interactionState.moved = false
  interactionState.startDistance = 0
}

function setActiveIndex(index) {
  activeIndex.value = index
  resetZoom()
  scheduleHintHide()
}

function cycleImage(step = 1) {
  if (!canCycle.value) {
    return
  }

  const total = props.room.gallery.length
  const nextIndex = (activeIndex.value + step + total) % total
  setActiveIndex(nextIndex)
}

function getTouchPair(event) {
  const rect = getStageRect()

  if (!rect || event.touches.length < 2) {
    return null
  }

  const halfWidth = rect.width / 2
  const halfHeight = rect.height / 2
  const [firstTouch, secondTouch] = event.touches
  const first = {
    x: firstTouch.clientX - rect.left - halfWidth,
    y: firstTouch.clientY - rect.top - halfHeight,
  }
  const second = {
    x: secondTouch.clientX - rect.left - halfWidth,
    y: secondTouch.clientY - rect.top - halfHeight,
  }

  return { first, second }
}

function getDistance(first, second) {
  return Math.hypot(second.x - first.x, second.y - first.y)
}

function getMidpoint(first, second) {
  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  }
}

function startPan(touch) {
  interactionState.mode = 'pan'
  interactionState.moved = false
  interactionState.startPoint = {
    x: touch.clientX,
    y: touch.clientY,
  }
  interactionState.startOffset = { ...zoomOffset.value }
  isDragging.value = true
}

function handleStageClick(event) {
  if (
    Date.now() < interactionState.ignoreClickUntil
    || isZoomed.value
    || isStageControlTarget(event.target)
  ) {
    return
  }

  hideStageHints()
  cycleImage()
}

function handleStageKeydown(event) {
  if (event.key === 'Escape' && isZoomed.value) {
    event.preventDefault()
    resetZoom()
    scheduleHintHide()
    return
  }

  if (isZoomed.value) {
    return
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    hideStageHints()
    cycleImage(-1)
    return
  }

  if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    hideStageHints()
    cycleImage()
  }
}

function handleTouchStart(event) {
  if (isStageControlTarget(event.target)) {
    interactionState.mode = null
    interactionState.startPoint = null
    interactionState.moved = false
    return
  }

  hideStageHints()

  if (event.touches.length >= 2) {
    const pair = getTouchPair(event)

    if (!pair) {
      return
    }

    event.preventDefault()
    interactionState.mode = 'pinch'
    interactionState.moved = true
    interactionState.startScale = zoomScale.value
    interactionState.startOffset = { ...zoomOffset.value }
    interactionState.startDistance = Math.max(getDistance(pair.first, pair.second), 1)
    interactionState.startMidpoint = getMidpoint(pair.first, pair.second)
    isDragging.value = true
    return
  }

  if (event.touches.length !== 1) {
    return
  }

  const [touch] = event.touches
  interactionState.moved = false

  if (isZoomed.value) {
    startPan(touch)
    return
  }

  interactionState.mode = 'tap'
  interactionState.startPoint = {
    x: touch.clientX,
    y: touch.clientY,
  }
  isDragging.value = false
}

function handleTouchMove(event) {
  if (event.touches.length >= 2) {
    const pair = getTouchPair(event)

    if (!pair) {
      return
    }

    event.preventDefault()

    const distance = Math.max(getDistance(pair.first, pair.second), 1)
    const midpoint = getMidpoint(pair.first, pair.second)
    const nextScale = interactionState.startScale * (distance / interactionState.startDistance)
    const ratio = clamp(nextScale, 1, MAX_STAGE_ZOOM)
    const nextX = midpoint.x - (((interactionState.startMidpoint.x - interactionState.startOffset.x) / interactionState.startScale) * ratio)
    const nextY = midpoint.y - (((interactionState.startMidpoint.y - interactionState.startOffset.y) / interactionState.startScale) * ratio)

    if (
      Math.abs(distance - interactionState.startDistance) > PINCH_MOVE_THRESHOLD
      || Math.abs(midpoint.x - interactionState.startMidpoint.x) > PINCH_MOVE_THRESHOLD
      || Math.abs(midpoint.y - interactionState.startMidpoint.y) > PINCH_MOVE_THRESHOLD
    ) {
      interactionState.moved = true
    }

    applyZoom(nextScale, nextX, nextY)
    return
  }

  if (event.touches.length !== 1 || !interactionState.startPoint) {
    return
  }

  const [touch] = event.touches
  const deltaX = touch.clientX - interactionState.startPoint.x
  const deltaY = touch.clientY - interactionState.startPoint.y

  if (interactionState.mode === 'pan' && isZoomed.value) {
    event.preventDefault()

    if (Math.abs(deltaX) > TAP_MOVE_THRESHOLD || Math.abs(deltaY) > TAP_MOVE_THRESHOLD) {
      interactionState.moved = true
    }

    applyZoom(
      zoomScale.value,
      interactionState.startOffset.x + deltaX,
      interactionState.startOffset.y + deltaY,
    )
    return
  }

  if (Math.abs(deltaX) > TAP_MOVE_THRESHOLD || Math.abs(deltaY) > TAP_MOVE_THRESHOLD) {
    interactionState.moved = true
  }
}

function handleTouchEnd(event) {
  interactionState.ignoreClickUntil = Date.now() + 400
  isDragging.value = false

  if (event.touches.length === 1 && interactionState.mode === 'pinch') {
    startPan(event.touches[0])
    return
  }

  if (event.touches.length > 0) {
    return
  }

  const shouldCycle = interactionState.mode === 'tap' && !interactionState.moved && !isZoomed.value

  interactionState.mode = null
  interactionState.startPoint = null
  interactionState.startDistance = 0

  if (zoomScale.value <= 1.01) {
    resetZoom()
  }

  if (shouldCycle) {
    cycleImage()
  }
}

function handleTouchCancel() {
  interactionState.mode = null
  interactionState.moved = false
  interactionState.startPoint = null
  interactionState.startDistance = 0
  isDragging.value = false

  if (zoomScale.value <= 1.01) {
    resetZoom()
  }
}

function goPrevious(event) {
  event?.preventDefault()
  event?.stopPropagation()
  hideStageHints()
  cycleImage(-1)
}

function goNext(event) {
  event?.preventDefault()
  event?.stopPropagation()
  hideStageHints()
  cycleImage()
}

watch(
  () => props.room.slug,
  () => {
    activeIndex.value = 0
    resetZoom()
    scheduleHintHide()
  },
  { immediate: true },
)

watch(isZoomed, (zoomed) => {
  if (zoomed) {
    hideStageHints()
    return
  }

  scheduleHintHide()
})

onBeforeUnmount(() => {
  clearHintTimer()
})
</script>

<template>
  <div class="showcase-grid">
    <div class="gallery-stage">
      <div
        ref="stageMedia"
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

    <div class="detail-copy">
      <div class="detail-heading-meta">
        <RoomReferenceBadge :room="room" />
        <p class="detail-kicker">{{ room.highlightLabel }}</p>
      </div>
      <component :is="headingTag">
        {{ room.title }}
      </component>

      <div class="detail-topline">
        <p class="dialog-price">{{ room.priceLabel }}</p>
        <span class="availability-pill glass-chip">{{ room.availabilityLabel }}</span>
      </div>

      <p class="detail-summary">
        {{ room.summary }}
      </p>

      <p class="detail-freshness">
        Availability last updated {{ room.availabilityUpdatedLabel }}
      </p>

      <dl class="spec-grid">
        <div>
          <dt>Occupancy</dt>
          <dd>{{ room.occupancyLabel }}</dd>
        </div>
        <div>
          <dt>Kitchen</dt>
          <dd>{{ room.kitchenLabel }}</dd>
        </div>
        <div>
          <dt>Washroom</dt>
          <dd>{{ room.washroomLabel }}</dd>
        </div>
        <div>
          <dt>Best for</dt>
          <dd>{{ room.bestFor }}</dd>
        </div>
      </dl>

      <div class="detail-block">
        <h3>Included in this stay</h3>
        <ul>
          <li
            v-for="item in room.included"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="detail-block">
        <h3>Ask before you visit</h3>
        <ul>
          <li
            v-for="item in nextQuestions"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="detail-actions">
        <RouterLink
          v-if="preview"
          class="button-primary"
          :to="room.detailsHref"
        >
          Open full room page
        </RouterLink>
        <a
          v-else
          class="button-primary"
          :href="messageHref"
          target="_blank"
          rel="noreferrer"
        >
          {{ primaryLabel }}
        </a>
        <a
          class="button-secondary"
          :href="preview ? messageHref : getCallHref()"
          :target="preview ? '_blank' : undefined"
          :rel="preview ? 'noreferrer' : undefined"
        >
          {{ preview ? 'WhatsApp us' : 'Call about this room' }}
        </a>
      </div>

      <a
        v-if="preview"
        class="detail-link"
        :href="getCallHref()"
      >
        Call CozyRooms
      </a>
    </div>
  </div>
</template>

<style scoped>
.showcase-grid,
.gallery-stage,
.detail-copy {
  display: grid;
  gap: 1rem;
}

.showcase-grid {
  align-items: start;
}

.showcase-grid > * {
  min-width: 0;
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

.gallery-actions p,
.detail-freshness {
  color: var(--muted);
  font-weight: 700;
}

.gallery-actions p {
  flex: 1 1 14rem;
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

.thumb-row {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.7rem;
}

.thumb-button {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 0.9rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.08)),
    rgba(255, 255, 255, 0.12);
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
  border-color: rgba(255, 122, 26, 0.78);
  box-shadow:
    0 0 0 0.24rem rgba(255, 122, 26, 0.2),
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

.detail-kicker {
  color: var(--brand-strong);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.detail-heading-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
}

.detail-copy :deep(h1),
.detail-copy :deep(h2) {
  color: var(--text-strong);
  font-size: clamp(2.15rem, 11vw, 4.25rem);
  line-height: 0.96;
  text-wrap: balance;
}

.detail-topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.dialog-price {
  color: var(--text-strong);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.05em;
}

.availability-pill {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.35rem 0.72rem;
  border-radius: 999px;
  color: var(--accent-deep);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-summary {
  color: var(--text-strong);
  font-size: 1rem;
}

.spec-grid {
  display: grid;
  gap: 0.75rem;
}

.spec-grid div,
.detail-block,
.video-card {
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

.spec-grid dt {
  margin-bottom: 0.3rem;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.spec-grid dd,
.detail-block li {
  margin: 0;
  color: var(--text-strong);
  font-weight: 700;
}

.detail-block {
  display: grid;
  gap: 0.65rem;
}

.detail-block ul {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding-left: 1rem;
}

.video-card {
  display: grid;
  gap: 0.7rem;
}

.video-copy {
  display: grid;
  gap: 0.2rem;
}

.video-card video {
  width: 100%;
  border-radius: 1rem;
}

.detail-actions {
  display: grid;
  gap: 0.7rem;
}

.detail-link {
  color: var(--text-strong);
  font-weight: 800;
}

@media (min-width: 960px) {
  .showcase-grid {
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
    gap: 1.3rem;
  }

  .spec-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-actions {
    grid-template-columns: repeat(2, minmax(0, auto));
    align-items: center;
  }
}
</style>
