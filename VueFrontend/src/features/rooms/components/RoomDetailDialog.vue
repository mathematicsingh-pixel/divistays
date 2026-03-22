<script setup>
import { computed, ref } from 'vue'
import RoomShowcase from '@/features/rooms/components/showcase/RoomShowcase.vue'
import { useOverlayDialog } from '@/shared/composables/useOverlayDialog'

const props = defineProps({
  room: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])
const closeButton = ref(null)
const dialogPanel = ref(null)
const isOpen = computed(() => Boolean(props.room))

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
        v-if="room"
        class="dialog-shell glass-overlay"
        @click.self="emit('close')"
      >
        <section
          :id="`${room.slug}-preview`"
          ref="dialogPanel"
          class="dialog-panel glass-panel"
          aria-modal="true"
          role="dialog"
          :aria-labelledby="`${room.slug}-preview-title`"
        >
          <header class="dialog-head">
            <div class="dialog-head-copy">
              <p class="dialog-brand">Quick preview</p>
              <h2 :id="`${room.slug}-preview-title`">
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
            <RoomShowcase
              :room="room"
              preview
            />
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
  background:
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.14), transparent 26%),
    radial-gradient(circle at 10% 100%, rgba(255, 211, 142, 0.16), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.12)),
    rgba(249, 252, 255, 0.68);
  box-shadow: 0 34px 76px rgba(0, 0, 0, 0.28);
  overflow: hidden;
}

.dialog-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.22);
}

.dialog-head-copy {
  display: grid;
  gap: 0.2rem;
}

.dialog-brand {
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

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(239, 247, 250, 0.5)),
    rgba(255, 255, 255, 0.28);
  color: var(--text-strong);
  font-size: 1.35rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.58),
    0 10px 22px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: blur(12px) saturate(165%);
  backdrop-filter: blur(12px) saturate(165%);
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
