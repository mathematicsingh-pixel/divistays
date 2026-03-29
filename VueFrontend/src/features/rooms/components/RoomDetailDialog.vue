<script setup>
import { computed, ref, toRef } from 'vue'
import RoomShowcase from '@/features/rooms/components/showcase/RoomShowcase.vue'
import { useRoomDetail } from '@/features/rooms/composables/useRoomDetail'
import { siteConfig } from '@/features/site/config/site'
import { useOverlayDialog } from '@/shared/composables/useOverlayDialog'

const props = defineProps({
  roomSlug: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close'])
const closeButton = ref(null)
const dialogPanel = ref(null)
const isOpen = computed(() => Boolean(props.roomSlug))
const { roomSummary, roomDetail, isLoading } = useRoomDetail(toRef(props, 'roomSlug'))

useOverlayDialog({
  isOpen,
  panelRef: dialogPanel,
  initialFocusRef: closeButton,
  onClose: () => emit('close'),
})
</script>

<template>
  <Teleport to="body">
    <transition name="dialog-fade">
      <div
        v-if="roomSlug"
        class="dialog-shell overlay-backdrop"
        @click.self="emit('close')"
      >
        <section
          :id="`${roomSummary?.slug || roomSlug}-preview`"
          ref="dialogPanel"
          class="dialog-panel surface-card"
          aria-modal="true"
          role="dialog"
          :aria-labelledby="`${roomSummary?.slug || roomSlug}-preview-title`"
        >
          <header class="dialog-head">
            <div class="dialog-head-copy">
              <p class="label-upper dialog-brand">{{ siteConfig.uiText.room.previewLabel }}</p>
              <h2 :id="`${roomSummary?.slug || roomSlug}-preview-title`">
                {{ roomSummary?.title || 'Loading room' }}
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
            <RoomShowcase
              v-if="roomDetail"
              :room="roomDetail"
              preview
            />
            <div
              v-else-if="isLoading"
              class="dialog-loading"
            >
              <p>Loading room details…</p>
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
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  backdrop-filter: blur(18px) saturate(160%);
}

.dialog-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: 100%;
  max-height: 100svh;
  border-radius: 1.5rem 1.5rem 0 0;
  overflow: hidden;
}

.dialog-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 1rem;
  border-bottom: 1px solid var(--paper-border-soft);
}

.dialog-head-copy {
  display: grid;
  gap: 0.2rem;
}

.dialog-brand {
  color: var(--brand-strong);
}

.dialog-content {
  overflow-y: auto;
  padding: 1rem;
}

.dialog-loading {
  display: grid;
  place-items: center;
  min-height: 18rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: var(--radius-lg);
  background: var(--surface-field-fill);
  color: var(--muted);
  font-weight: 700;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: 999px;
  background: var(--surface-field-fill);
  color: var(--text-strong);
  font-size: 1.35rem;
  box-shadow: var(--shadow-sm);
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
    padding: 1.25rem;
    align-items: center;
    justify-items: center;
  }

  .dialog-panel {
    width: min(1120px, 100%);
    max-height: 92svh;
    border-radius: 1.5rem;
  }
}
</style>
