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

  activeIndex.value = (activeIndex.value + offset + props.room.gallery.length) % props.room.gallery.length
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
          class="dialog-panel"
          aria-modal="true"
          role="dialog"
          :aria-labelledby="`${room.slug}-title`"
        >
          <header class="dialog-head">
            <div class="dialog-head-copy">
              <p class="dialog-brand">CozyRooms</p>
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

          <div class="dialog-content">
            <div class="dialog-layout">
              <div class="gallery-stage">
                <div class="stage-media">
                  <ResponsiveImage
                    :room-slug="room.slug"
                    :media="room.gallery[activeIndex]"
                    eager
                    sizes="(min-width: 1024px) 54vw, 100vw"
                  />
                </div>

                <div class="gallery-actions">
                  <button
                    class="icon-button secondary"
                    type="button"
                    aria-label="Previous image"
                    @click="showNext(-1)"
                  >
                    ‹
                  </button>
                  <p>{{ activeIndex + 1 }} / {{ room.gallery.length }}</p>
                  <button
                    class="icon-button secondary"
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
                    :class="{ active: index === activeIndex }"
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
                    <p class="dialog-brand">Walkthrough</p>
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
                <p class="detail-kicker">{{ room.highlightLabel }}</p>

                <div class="detail-topline">
                  <p class="dialog-price">{{ room.priceLabel }}</p>
                  <span class="availability-pill">{{ room.availabilityLabel }}</span>
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
  display: grid;
  align-items: end;
  padding: 0;
  background: rgba(7, 18, 26, 0.56);
  backdrop-filter: blur(10px);
}

.dialog-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: 100%;
  max-height: 100svh;
  border-radius: 1.5rem 1.5rem 0 0;
  border: 1px solid rgba(121, 217, 202, 0.18);
  background: var(--paper-strong);
  box-shadow: 0 -20px 50px rgba(0, 0, 0, 0.24);
  overflow: hidden;
}

.dialog-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 1rem;
  border-bottom: 1px solid var(--line);
}

.dialog-head-copy {
  display: grid;
  gap: 0.2rem;
}

.dialog-brand,
.detail-kicker {
  color: var(--brand-strong);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.dialog-content {
  overflow-y: auto;
  padding: 1rem;
}

.dialog-layout,
.gallery-stage,
.detail-copy {
  display: grid;
  gap: 1rem;
}

.stage-media {
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--paper-soft);
  aspect-ratio: 4 / 3;
}

.gallery-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.gallery-actions p {
  color: var(--muted);
  font-weight: 700;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--paper-soft);
  color: var(--text-strong);
  font-size: 1.35rem;
}

.secondary {
  width: 2.45rem;
  height: 2.45rem;
}

.thumb-row {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 4.75rem;
  gap: 0.55rem;
  overflow-x: auto;
}

.thumb-button {
  overflow: hidden;
  aspect-ratio: 1 / 1;
  border: 1px solid transparent;
  border-radius: 0.9rem;
  background: transparent;
}

.thumb-button.active {
  border-color: var(--brand);
}

.video-card {
  display: grid;
  gap: 0.7rem;
  padding: 0.9rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--paper-soft);
}

.video-card video {
  width: 100%;
  border-radius: 0.9rem;
}

.detail-copy {
  align-content: start;
}

.detail-topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
}

.dialog-price {
  color: var(--text-strong);
  font-size: 1.45rem;
  font-weight: 800;
}

.availability-pill {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.34rem 0.72rem;
  border-radius: 999px;
  background: rgba(255, 122, 26, 0.1);
  color: var(--accent-deep);
  font-size: 0.8rem;
  font-weight: 800;
}

.detail-summary {
  color: var(--muted);
}

.spec-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  margin: 0;
}

.spec-grid div,
.amenity-block {
  padding: 0.9rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  background: var(--paper-soft);
}

.spec-grid dt {
  color: var(--muted);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.spec-grid dd {
  margin: 0.3rem 0 0;
  color: var(--text-strong);
  font-weight: 700;
}

.amenity-block {
  display: grid;
  gap: 0.7rem;
}

.amenity-block ul {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding-left: 1rem;
  color: var(--text-strong);
}

.detail-actions {
  display: grid;
  gap: 0.7rem;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.18s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
}

@media (min-width: 960px) {
  .dialog-shell {
    padding: 1.5rem;
    align-items: center;
    justify-items: center;
  }

  .dialog-panel {
    width: min(1080px, 100%);
    max-height: calc(100svh - 3rem);
    border-radius: 1.5rem;
    grid-template-rows: auto minmax(0, 1fr);
  }

  .dialog-head,
  .dialog-content {
    padding: 1.2rem;
  }

  .dialog-layout {
    grid-template-columns: minmax(0, 1.1fr) minmax(20rem, 0.9fr);
    align-items: start;
  }

  .detail-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
