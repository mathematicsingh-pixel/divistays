<script setup>
import { computed, ref } from 'vue'
import RoomReferenceBadge from '@/features/rooms/components/RoomReferenceBadge.vue'
import BrandGlyph from '@/features/site/components/brand/BrandGlyph.vue'
import ResponsiveImage from '@/shared/ui/ResponsiveImage.vue'

const previewDefinitions = [
  {
    id: 'courtyard-side',
    getLabel: (room) => room.title.replace(/ room$/i, ''),
    pick: (rooms) => rooms.find((room) => room.id === 8 || room.slug === 'courtyard-room'),
  },
  {
    id: 'monthly-rent',
    getLabel: (room) => `Lowest ${room.priceLabel.replace('/month', '')}`,
    pick: (rooms) => [...rooms].sort((left, right) => left.priceMonthly - right.priceMonthly)[0],
  },
  {
    id: 'private-kitchen',
    getLabel: (room) => room.kitchenLabel,
    pick: (rooms) => rooms.find((room) =>
      room.kitchenType === 'private' && room.washroomType === 'attached',
    ),
  },
]

const props = defineProps({
  site: {
    type: Object,
    required: true,
  },
  rooms: {
    type: Array,
    required: true,
  },
})

const selectedPreviewId = ref(previewDefinitions[0].id)

const roomPreviews = computed(() => {
  const usedSlugs = new Set()

  return previewDefinitions.map((definition) => {
    const unusedRooms = props.rooms.filter((room) => !usedSlugs.has(room.slug))
    const room = definition.pick(unusedRooms) || unusedRooms[0]

    if (!room) {
      return null
    }

    usedSlugs.add(room.slug)

    return {
      id: definition.id,
      label: definition.getLabel(room),
      room,
    }
  }).filter(Boolean)
})

const activePreview = computed(() =>
  roomPreviews.value.find((item) => item.id === selectedPreviewId.value) || roomPreviews.value[0],
)

const activePosition = computed(() => {
  const index = roomPreviews.value.findIndex((item) => item.id === activePreview.value?.id)

  return index >= 0 ? index + 1 : 1
})
</script>

<template>
  <section
    id="home"
    class="hero-shell"
  >
    <BrandGlyph class="brand-glyph-motif hero-glyph" />

    <div class="container hero-layout">
      <div class="hero-copy page-rise">
        <p class="label-upper hero-label">Furnished rooms · {{ site.locationShort }}</p>

        <h1>{{ site.heroTitle }}</h1>

        <p class="hero-summary">{{ site.heroSummary }}</p>

        <div
          v-if="roomPreviews.length"
          class="hero-preview-group"
          role="group"
          :aria-label="`Preview ${roomPreviews.length} available room listings`"
        >
          <div class="hero-preview-heading">
            <span class="label-upper">Room preview</span>
            <span aria-hidden="true">
              {{ String(activePosition).padStart(2, '0') }} / {{ String(roomPreviews.length).padStart(2, '0') }}
            </span>
          </div>

          <div class="hero-preview-options">
            <button
              v-for="preview in roomPreviews"
              :key="preview.id"
              class="chip"
              type="button"
              :aria-pressed="preview.id === activePreview?.id"
              aria-controls="home-room-preview"
              @click="selectedPreviewId = preview.id"
            >
              {{ preview.label }}
            </button>
          </div>

          <div
            class="hero-preview-live"
            aria-live="polite"
            aria-atomic="true"
          >
            <Transition
              name="room-switch"
              mode="out-in"
            >
              <p
                v-if="activePreview"
                :key="activePreview.room.slug"
                class="hero-preview-result"
              >
                <span class="label-upper">Now showing</span>
                <strong>{{ activePreview.room.title }}</strong>
                <span>{{ activePreview.room.referenceLabel }} · {{ activePreview.room.priceLabel }}</span>
              </p>
            </Transition>
          </div>
        </div>

      </div>

      <div
        v-if="activePreview"
        id="home-room-preview"
        class="hero-stage page-rise-delay-1"
      >
        <Transition
          name="room-switch"
          mode="out-in"
        >
          <RouterLink
            :key="activePreview.room.slug"
            class="hero-room"
            :to="activePreview.room.detailsHref"
            :aria-label="`${site.heroPrimaryLabel}: ${activePreview.room.title}, ${activePreview.room.priceLabel}, ${activePreview.room.availabilityShortLabel}`"
          >
            <span class="hero-room-media">
              <ResponsiveImage
                :room-slug="activePreview.room.slug"
                :media="activePreview.room.gallery[0]"
                eager
                sizes="(min-width: 960px) 52vw, 100vw"
              />

              <span class="hero-room-reference">
                <RoomReferenceBadge
                  :room="activePreview.room"
                  inverse
                  compact
                />
              </span>
            </span>

            <span class="hero-room-caption">
              <span class="hero-room-heading">
                <span class="label-upper">Selected room</span>
                <h2>{{ activePreview.room.title }}</h2>
              </span>

              <span class="hero-room-meta">
                <strong>{{ activePreview.room.priceLabel }}</strong>
                <span class="hero-room-status">
                  <span aria-hidden="true" />
                  {{ activePreview.room.availabilityShortLabel }}
                </span>
              </span>

              <span class="hero-room-setup">
                {{ activePreview.room.occupancyLabel }} · {{ activePreview.room.kitchenLabel }} · {{ activePreview.room.washroomLabel }}
              </span>

              <span class="hero-room-action button-primary action-glow">
                {{ site.heroPrimaryLabel }}
                <span aria-hidden="true">→</span>
              </span>
            </span>
          </RouterLink>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-shell {
  position: relative;
  overflow: hidden;
  padding: var(--space-xl) 0 var(--space-2xl);
  background: var(--bg);
  color: var(--text-inverse);
  isolation: isolate;
}

.hero-glyph {
  top: 16rem;
  right: -6rem;
  z-index: 0;
  width: 18rem;
}

.hero-layout {
  position: relative;
  z-index: 1;
  display: grid;
  gap: var(--space-lg);
}

.hero-copy {
  display: grid;
  align-content: center;
  justify-items: start;
  gap: var(--space-md);
}

.hero-label,
.hero-preview-heading .label-upper {
  color: var(--brand);
}

.hero-copy h1 {
  max-width: 10ch;
  color: var(--text-inverse);
  font-size: clamp(3rem, 13vw, 5.25rem);
}

.hero-summary {
  max-width: 35rem;
  color: var(--muted-inverse);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
}

.hero-preview-group {
  display: grid;
  gap: var(--space-sm);
  width: 100%;
  padding-block: var(--space-md);
  border-block: 1px solid var(--line-inverse);
}

.hero-preview-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
}

.hero-preview-heading > span:last-child {
  color: var(--muted-inverse);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
}

.hero-preview-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.hero-preview-options .chip {
  border-color: var(--line-inverse);
  background: transparent;
  color: var(--text-inverse);
}

.hero-preview-options .chip[aria-pressed='true'] {
  border-color: var(--brand);
  background: var(--brand);
  color: var(--bg);
}

.hero-preview-live {
  min-width: 0;
  padding-top: var(--space-xs);
}

.hero-preview-result {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: baseline;
  gap: var(--space-xs) var(--space-sm);
  color: var(--muted-inverse);
  font-size: 0.875rem;
}

.hero-preview-result .label-upper {
  color: var(--brand);
}

.hero-preview-result strong {
  color: var(--text-inverse);
}

.hero-preview-result > span:last-child {
  grid-column: 1 / -1;
}

.hero-stage {
  min-width: 0;
}

.hero-room {
  display: grid;
  min-width: 0;
  color: var(--text-inverse);
}

.hero-room-media {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border: 1px solid var(--line-inverse);
  border-radius: var(--radius-lg);
  background: var(--paper-soft);
}

.hero-room-media :deep(picture),
.hero-room-media :deep(img) {
  width: 100%;
  height: 100%;
}

.hero-room-media :deep(img) {
  object-fit: cover;
  transition: transform 360ms cubic-bezier(0.2, 0.75, 0.24, 1);
}

.hero-room-reference {
  position: absolute;
  top: var(--space-md);
  left: var(--space-md);
}

.hero-room-caption {
  display: grid;
  gap: var(--space-md);
  padding-top: var(--space-md);
}

.hero-room-heading {
  display: grid;
  gap: var(--space-xs);
}

.hero-room-heading .label-upper {
  color: var(--brand);
}

.hero-room-heading h2 {
  color: var(--text-inverse);
  font-size: clamp(1.9rem, 8vw, 2.75rem);
}

.hero-room-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding-block: var(--space-sm);
  border-block: 1px solid var(--line-inverse);
}

.hero-room-meta > strong {
  font-size: 1rem;
}

.hero-room-status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  color: var(--brand);
  font-size: 0.75rem;
  font-weight: 700;
}

.hero-room-status > span {
  position: relative;
  width: 0.45rem;
  height: 0.45rem;
  border-radius: var(--radius-full);
  background: currentColor;
}

.hero-room-status > span::after {
  position: absolute;
  inset: -0.28rem;
  border: 1px solid currentColor;
  border-radius: var(--radius-full);
  animation: availability-pulse 2.8s ease-out infinite;
  content: '';
}

.hero-room-setup {
  color: var(--muted-inverse);
  font-size: 0.8125rem;
  font-weight: 600;
}

.hero-room-action {
  justify-content: space-between;
  width: 100%;
}

.hero-room-action > span {
  transition: transform 180ms ease;
}

.room-switch-enter-active,
.room-switch-leave-active {
  transition: opacity 180ms ease, transform 220ms cubic-bezier(0.2, 0.75, 0.24, 1);
}

.room-switch-enter-from {
  opacity: 0;
  transform: translateX(var(--space-md));
}

.room-switch-leave-to {
  opacity: 0;
  transform: translateX(calc(var(--space-sm) * -1));
}

@keyframes availability-pulse {
  0% {
    opacity: 0.55;
    transform: scale(0.45);
  }

  72%,
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
}

@media (hover: hover) {
  .hero-room:hover .hero-room-media :deep(img) {
    transform: scale(1.025);
  }

  .hero-room:hover .hero-room-action > span {
    transform: translateX(var(--space-xs));
  }
}

.hero-room:focus-visible .hero-room-action > span {
  transform: translateX(var(--space-xs));
}

@media (min-width: 640px) {
  .hero-room-caption {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }

  .hero-room-meta {
    display: grid;
    justify-items: end;
    padding-block: 0;
    border-block: 0;
  }

  .hero-room-setup,
  .hero-room-action {
    grid-column: 1 / -1;
  }

  .hero-room-action {
    width: min(100%, 20rem);
  }
}

@media (min-width: 960px) {
  .hero-shell {
    min-height: calc(100svh - 4rem);
    padding: var(--space-2xl) 0 clamp(4rem, 7vw, 6rem);
  }

  .hero-glyph {
    top: var(--space-lg);
    right: -8rem;
    width: clamp(26rem, 38vw, 34rem);
  }

  .hero-layout {
    grid-template-columns: minmax(0, 0.84fr) minmax(30rem, 1.16fr);
    align-items: center;
    gap: clamp(2rem, 5vw, 5rem);
  }

  .hero-copy {
    gap: var(--space-lg);
  }

  .hero-room-media {
    aspect-ratio: 5 / 4;
  }

  .hero-room-action {
    width: min(100%, 18rem);
  }
}
</style>
