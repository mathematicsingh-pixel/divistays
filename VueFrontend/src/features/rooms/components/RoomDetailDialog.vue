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
              class="dialog-loading surface-input"
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
}

.dialog-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: 100%;
  max-height: 100svh;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;
}

.dialog-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: var(--space-md);
  padding: var(--space-md);
  border-bottom: 1px solid var(--line);
}

.dialog-head-copy {
  display: grid;
  gap: var(--space-xs);
}

.dialog-brand {
  color: var(--brand-strong);
}

.dialog-content {
  overflow-y: auto;
  padding: var(--space-md);
}

.dialog-loading {
  display: grid;
  place-items: center;
  min-height: 18rem;
  color: var(--muted);
  font-weight: 700;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-full);
  background: var(--paper);
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
    padding: var(--space-lg);
    align-items: center;
    justify-items: center;
  }

  .dialog-panel {
    width: min(70rem, 100%);
    max-height: 92svh;
    border-radius: var(--radius-lg);
  }
}
</style>
