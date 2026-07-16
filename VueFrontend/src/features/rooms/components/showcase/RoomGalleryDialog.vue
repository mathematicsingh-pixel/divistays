<script setup>
import { computed, ref, watch } from 'vue'
import { useOverlayDialog } from '@/shared/composables/useOverlayDialog'
import { useScrollLock } from '@/shared/composables/useScrollLock'
import ResponsiveImage from '@/shared/ui/ResponsiveImage.vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  room: {
    type: Object,
    required: true,
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['close', 'select'])
const closeButton = ref(null)
const dialogPanel = ref(null)
const activeIndex = ref(0)
const isOpen = computed(() => props.open)
const activeMedia = computed(() => props.room.gallery[activeIndex.value])
const canCycle = computed(() => props.room.gallery.length > 1)

let touchStart = null

function select(index) {
  const total = props.room.gallery.length

  if (!total) {
    return
  }

  activeIndex.value = (index + total) % total
  emit('select', activeIndex.value)
}

function goPrevious() {
  select(activeIndex.value - 1)
}

function goNext() {
  select(activeIndex.value + 1)
}

function handleKeydown(event) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    goPrevious()
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    goNext()
  }
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

watch(
  () => [props.open, props.room.slug, props.initialIndex],
  ([open]) => {
    if (open) {
      activeIndex.value = props.initialIndex
    }
  },
  { immediate: true },
)

useOverlayDialog({
  isOpen,
  panelRef: dialogPanel,
  initialFocusRef: closeButton,
  onClose: () => emit('close'),
})
useScrollLock(isOpen)
</script>

<template>
  <Teleport to="body">
    <Transition name="gallery-dialog-fade">
      <div
        v-if="open"
        class="gallery-dialog-shell overlay-backdrop"
        @click.self="$emit('close')"
      >
        <section
          ref="dialogPanel"
          class="gallery-dialog surface-dark"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`${room.slug}-gallery-title`"
          :aria-describedby="`${room.slug}-gallery-caption`"
          @keydown="handleKeydown"
        >
          <header class="gallery-dialog-header">
            <div class="gallery-dialog-identity">
              <p class="label-upper">{{ room.referenceLabel }}</p>
              <h2 :id="`${room.slug}-gallery-title`">{{ room.title }}</h2>
            </div>

            <div class="gallery-dialog-header-actions">
              <p class="gallery-dialog-count">
                Photo {{ activeIndex + 1 }} of {{ room.gallery.length }}
              </p>
              <button
                ref="closeButton"
                class="gallery-dialog-control gallery-dialog-close button-secondary"
                type="button"
                aria-label="Close full-screen photo viewer"
                @click="$emit('close')"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </header>

          <div class="gallery-dialog-content">
            <figure>
              <div
                class="gallery-dialog-media"
                @touchstart.passive="handleTouchStart"
                @touchend.passive="handleTouchEnd"
                @touchcancel="touchStart = null"
              >
                <ResponsiveImage
                  :room-slug="room.slug"
                  :media="activeMedia"
                  eager
                  sizes="100vw"
                />
              </div>

              <figcaption :id="`${room.slug}-gallery-caption`">
                {{ activeMedia.caption }}
              </figcaption>
            </figure>

            <nav
              v-if="canCycle"
              class="gallery-dialog-navigation"
              aria-label="Full-screen photo controls"
            >
              <button
                class="gallery-dialog-control button-secondary"
                type="button"
                aria-label="Show previous photo"
                @click="goPrevious"
              >
                <span aria-hidden="true">←</span>
              </button>

              <div
                class="gallery-dialog-progress"
                aria-hidden="true"
              >
                <span
                  v-for="(_, index) in room.gallery"
                  :key="index"
                  :class="{ active: index === activeIndex }"
                />
              </div>

              <button
                class="gallery-dialog-control button-secondary"
                type="button"
                aria-label="Show next photo"
                @click="goNext"
              >
                <span aria-hidden="true">→</span>
              </button>
            </nav>
          </div>

          <p
            class="sr-only"
            aria-live="polite"
          >
            Showing photo {{ activeIndex + 1 }} of {{ room.gallery.length }}. {{ activeMedia.caption }}
          </p>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.gallery-dialog-shell {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: var(--bg);
}

.gallery-dialog {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: 100%;
  height: 100dvh;
  min-height: 100svh;
  border: 0;
  border-radius: 0;
  background: var(--bg);
  box-shadow: none;
}

.gallery-dialog-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
  padding: max(var(--space-md), env(safe-area-inset-top)) var(--space-md) var(--space-sm);
  border-bottom: 1px solid var(--line-inverse);
}

.gallery-dialog-identity {
  display: grid;
  gap: var(--space-xs);
  min-width: 0;
}

.gallery-dialog-identity .label-upper {
  color: var(--muted-inverse);
}

.gallery-dialog-identity h2 {
  max-width: 24ch;
  overflow: hidden;
  color: var(--text-inverse);
  font-size: clamp(1rem, 4vw, 1.35rem);
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gallery-dialog-header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 0 0 auto;
}

.gallery-dialog-count {
  color: var(--text-inverse);
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.gallery-dialog-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 2.75rem;
  min-width: 2.75rem;
  height: 2.75rem;
  min-height: 2.75rem;
  padding: 0;
  border-radius: var(--radius-full);
  font-size: 1.15rem;
  line-height: 1;
  box-shadow: var(--shadow-sm);
}

.gallery-dialog-close {
  font-size: 1.75rem;
}

.gallery-dialog-content {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: var(--space-md);
  min-height: 0;
  padding: var(--space-md) var(--space-md) max(var(--space-md), env(safe-area-inset-bottom));
  overflow: hidden;
}

.gallery-dialog-content figure {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  gap: var(--space-sm);
  width: 100%;
  min-height: 0;
  margin: 0;
}

.gallery-dialog-media {
  position: relative;
  width: 100%;
  min-height: 0;
  overflow: hidden;
  background: var(--bg);
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
}

.gallery-dialog-media :deep(picture),
.gallery-dialog-media :deep(img) {
  display: block;
  width: 100%;
  height: 100%;
}

.gallery-dialog-media :deep(img) {
  object-fit: contain;
}

.gallery-dialog-content figcaption {
  overflow: hidden;
  color: var(--muted-inverse);
  font-size: 0.875rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.gallery-dialog-navigation {
  display: grid;
  grid-template-columns: auto minmax(0, 34rem) auto;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
}

.gallery-dialog-progress {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  min-width: 0;
}

.gallery-dialog-progress span {
  flex: 1 1 0;
  height: 0.1875rem;
  background: var(--line-inverse);
}

.gallery-dialog-progress span.active {
  background: var(--sun);
}

.gallery-dialog-fade-enter-active,
.gallery-dialog-fade-leave-active {
  transition: opacity 180ms ease;
}

.gallery-dialog-fade-enter-active .gallery-dialog-media,
.gallery-dialog-fade-leave-active .gallery-dialog-media {
  transition: transform 220ms ease;
}

.gallery-dialog-fade-enter-from,
.gallery-dialog-fade-leave-to {
  opacity: 0;
}

.gallery-dialog-fade-enter-from .gallery-dialog-media,
.gallery-dialog-fade-leave-to .gallery-dialog-media {
  transform: scale(0.985);
}

@media (min-width: 760px) {
  .gallery-dialog-header,
  .gallery-dialog-content {
    padding-inline: var(--space-lg);
  }

  .gallery-dialog-header {
    padding-bottom: var(--space-md);
  }
}

@media (min-width: 1180px) {
  .gallery-dialog-header,
  .gallery-dialog-content {
    padding-inline: var(--space-xl);
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-dialog-fade-enter-active,
  .gallery-dialog-fade-leave-active,
  .gallery-dialog-fade-enter-active .gallery-dialog-media,
  .gallery-dialog-fade-leave-active .gallery-dialog-media {
    transition: none;
  }
}
</style>
