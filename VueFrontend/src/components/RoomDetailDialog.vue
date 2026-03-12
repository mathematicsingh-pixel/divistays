<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { useOverlayDialog } from '@/composables/useOverlayDialog'
import { buildRoomEnquiry, getCallHref, getWhatsAppHref } from '@/data/site'
import { buildVideoPath, buildVideoPosterPath } from '@/lib/media'

const props = defineProps({
  room: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])
const activeIndex = ref(0)
const closeButton = ref(null)
const dialogPanel = ref(null)
const isOpen = computed(() => Boolean(props.room))

function showNext(offset) {
  if (!props.room) {
    return
  }

  const next = (activeIndex.value + offset + props.room.gallery.length) % props.room.gallery.length
  activeIndex.value = next
}

function handleGalleryKeys(event) {
  if (!isOpen.value) {
    return
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault()
    showNext(1)
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showNext(-1)
  }
}

watch(
  () => props.room?.slug,
  () => {
    activeIndex.value = 0
  },
)

watch(isOpen, (open) => {
  if (typeof window === 'undefined') {
    return
  }

  if (open) {
    window.addEventListener('keydown', handleGalleryKeys)
    return
  }

  window.removeEventListener('keydown', handleGalleryKeys)
})

useOverlayDialog({
  isOpen,
  panelRef: dialogPanel,
  initialFocusRef: closeButton,
  onClose: () => emit('close'),
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleGalleryKeys)
  }
})
</script>

<template>
  <Teleport to="body">
    <transition name="dialog-fade">
      <div
        v-if="room"
        class="dialog-shell"
        @click.self="emit('close')"
      >
        <section
          :id="`${room.slug}-dialog`"
          ref="dialogPanel"
          class="dialog-panel surface-panel"
          aria-modal="true"
          role="dialog"
          :aria-labelledby="`${room.slug}-title`"
        >
          <header class="dialog-head">
            <div>
              <p class="dialog-kicker">{{ room.highlightLabel }}</p>
              <h2 :id="`${room.slug}-title`">
                {{ room.title }}
              </h2>
            </div>

            <button
              ref="closeButton"
              class="icon-button"
              type="button"
              aria-label="Close room details"
              @click="emit('close')"
            >
              ×
            </button>
          </header>

          <div class="dialog-layout">
            <div class="gallery-stage">
              <div class="stage-media">
                <ResponsiveImage
                  :room-slug="room.slug"
                  :media="room.gallery[activeIndex]"
                  eager
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              </div>

              <div class="gallery-actions">
                <button
                  class="icon-button"
                  type="button"
                  aria-label="Previous image"
                  @click="showNext(-1)"
                >
                  ‹
                </button>
                <p>{{ activeIndex + 1 }} / {{ room.gallery.length }}</p>
                <button
                  class="icon-button"
                  type="button"
                  aria-label="Next image"
                  @click="showNext(1)"
                >
                  ›
                </button>
              </div>

              <div class="thumb-row">
                <button
                  v-for="(media, index) in room.gallery"
                  :key="media.key"
                  class="thumb-button"
                  :class="{ 'thumb-active': index === activeIndex }"
                  type="button"
                  :aria-label="`Show photo ${index + 1} of ${room.gallery.length}`"
                  @click="activeIndex = index"
                >
                  <ResponsiveImage
                    :room-slug="room.slug"
                    :media="media"
                    sizes="5rem"
                  />
                </button>
              </div>

              <div
                v-if="room.video"
                class="video-card"
              >
                <div class="video-copy">
                  <p class="dialog-kicker">Video walkthrough</p>
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
              <div class="detail-pricing">
                <p class="dialog-price">{{ room.priceLabel }}</p>
                <span class="soft-chip">{{ room.availabilityLabel }}</span>
              </div>

              <p class="detail-summary">
                {{ room.summary }}
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
                  <dt>Room note</dt>
                  <dd>{{ room.facingLabel }}</dd>
                </div>
              </dl>

              <div class="amenity-block">
                <h3>What comes with it</h3>
                <ul>
                  <li
                    v-for="amenity in room.amenities"
                    :key="amenity"
                  >
                    {{ amenity }}
                  </li>
                </ul>
              </div>

              <div class="detail-actions">
                <a
                  class="button-primary"
                  :href="getWhatsAppHref(buildRoomEnquiry(room))"
                  target="_blank"
                  rel="noreferrer"
                >
                  Enquire on WhatsApp
                </a>
                <a
                  class="button-secondary"
                  :href="getCallHref()"
                >
                  Call directly
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.dialog-shell {
  position: fixed;
  inset: 0;
  z-index: 70;
  overflow-y: auto;
  padding: 1rem;
  background: rgba(20, 24, 25, 0.58);
  backdrop-filter: blur(12px);
}

.dialog-panel {
  width: min(1100px, 100%);
  margin: 0 auto;
  padding: 1rem;
}

.dialog-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.dialog-head h2 {
  margin: 0.2rem 0 0;
  font-size: clamp(1.7rem, 4vw, 2.7rem);
}

.dialog-kicker {
  margin: 0;
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.icon-button {
  width: 2.8rem;
  height: 2.8rem;
  border: 1px solid rgba(20, 32, 36, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-strong);
  font-size: 1.45rem;
  flex: 0 0 auto;
}

.dialog-layout {
  display: grid;
  gap: 1.15rem;
  margin-top: 1rem;
}

.gallery-stage {
  display: grid;
  gap: 0.9rem;
}

.stage-media {
  overflow: hidden;
  border-radius: 1.25rem;
  background: var(--paper-strong);
  aspect-ratio: 4 / 3;
}

.gallery-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.gallery-actions p {
  margin: 0;
  color: var(--muted);
}

.thumb-row {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 5.1rem;
  gap: 0.6rem;
  overflow-x: auto;
  padding-bottom: 0.2rem;
}

.thumb-button {
  overflow: hidden;
  aspect-ratio: 1 / 1;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 1rem;
  background: transparent;
}

.thumb-active {
  border-color: var(--accent);
}

.video-card {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 1.25rem;
  background: var(--paper-strong);
}

.video-card h3 {
  margin: 0.15rem 0 0;
  font-size: 1.1rem;
}

.video-card video {
  width: 100%;
  border-radius: 1rem;
}

.detail-copy {
  display: grid;
  gap: 1.15rem;
}

.detail-pricing {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.7rem;
}

.dialog-price {
  margin: 0;
  color: var(--text-strong);
  font-size: 1.5rem;
  font-weight: 700;
}

.detail-summary {
  margin: 0;
  color: var(--muted);
  font-size: 1rem;
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 0;
}

.spec-grid div {
  padding: 0.95rem;
  border-radius: 1rem;
  background: var(--paper-strong);
}

.spec-grid dt {
  color: var(--muted);
  font-size: 0.82rem;
}

.spec-grid dd {
  margin: 0.35rem 0 0;
  color: var(--text-strong);
  font-weight: 700;
}

.amenity-block h3 {
  margin: 0;
  font-size: 1.1rem;
}

.amenity-block ul {
  display: grid;
  gap: 0.6rem;
  margin: 0.85rem 0 0;
  padding-left: 1rem;
  color: var(--muted);
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}

.detail-actions > * {
  flex: 1 1 13rem;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.24s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

@media (min-width: 1024px) {
  .dialog-shell {
    padding: 2rem;
  }

  .dialog-panel {
    padding: 1.35rem;
  }

  .dialog-layout {
    grid-template-columns: minmax(0, 1.25fr) minmax(20rem, 0.9fr);
    align-items: start;
  }

  .detail-copy {
    position: sticky;
    top: 1rem;
  }
}
</style>
