<script setup>
import { computed, ref } from 'vue'
import { siteConfig } from '@/features/site/config/site'
import { useOverlayDialog } from '@/shared/composables/useOverlayDialog'

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: siteConfig.uiText.contactSheet.title,
  },
  summary: {
    type: String,
    default: siteConfig.uiText.contactSheet.summary,
  },
})

const emit = defineEmits(['close'])
const closeButton = ref(null)
const panelRef = ref(null)
const isOpen = computed(() => props.options.length > 0)

function closeSheet() {
  emit('close')
}

useOverlayDialog({
  isOpen,
  panelRef,
  initialFocusRef: closeButton,
  onClose: closeSheet,
})
</script>

<template>
  <Teleport to="body">
    <transition name="contact-sheet-fade">
      <div
        v-if="isOpen"
        class="contact-sheet-shell overlay-backdrop"
        @click.self="closeSheet"
      >
        <section
          ref="panelRef"
          class="contact-sheet surface-card"
          aria-modal="true"
          role="dialog"
          aria-labelledby="mobile-contact-sheet-title"
          aria-describedby="mobile-contact-sheet-summary"
        >
          <div class="contact-sheet-head">
            <div class="contact-sheet-copy">
              <p class="label-upper">{{ siteConfig.uiText.contactSheet.eyebrow }}</p>
              <h2 id="mobile-contact-sheet-title">{{ title }}</h2>
              <p id="mobile-contact-sheet-summary">{{ summary }}</p>
            </div>

            <button
              ref="closeButton"
              class="contact-close button-secondary"
              type="button"
              aria-label="Close contact options"
              @click="closeSheet"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <div class="contact-sheet-actions">
            <a
              v-for="option in options"
              :key="option.label"
              class="contact-option"
              :class="option.tone === 'primary' ? 'button-primary' : 'button-secondary'"
              :href="option.href"
              :target="option.blank ? '_blank' : undefined"
              :rel="option.blank ? 'noreferrer' : undefined"
              @click="closeSheet"
            >
              <span class="contact-option-label">{{ option.label }}</span>
              <small
                v-if="option.meta"
                class="contact-option-meta"
              >
                {{ option.meta }}
              </small>
            </a>
          </div>
        </section>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.contact-sheet-shell {
  position: fixed;
  inset: 0;
  z-index: 69;
  display: grid;
  align-items: end;
  padding: var(--space-md);
}

.contact-sheet {
  display: grid;
  gap: var(--space-lg);
  width: min(100%, 32rem);
  max-height: 92svh;
  padding: var(--space-lg);
  padding-bottom: calc(var(--space-lg) + env(safe-area-inset-bottom));
  margin-inline: auto;
  overflow-y: auto;
}

.contact-sheet-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
}

.contact-sheet-copy {
  display: grid;
  gap: var(--space-sm);
}

.contact-sheet-copy .label-upper,
.contact-sheet-copy p:last-child {
  color: var(--muted);
}

.contact-close {
  flex: 0 0 auto;
  min-width: 3rem;
  min-height: 3rem;
  padding: 0;
  font-size: 1.25rem;
}

.contact-sheet-actions {
  display: grid;
  gap: var(--space-sm);
}

.contact-option {
  display: grid;
  justify-items: start;
  gap: var(--space-xs);
  min-height: 3.25rem;
  padding-inline: var(--space-md);
}

.contact-option-label {
  font-size: 1rem;
  font-weight: 700;
}

.contact-option-meta {
  color: inherit;
  font-size: 0.875rem;
  opacity: 0.8;
}

.contact-sheet-fade-enter-active,
.contact-sheet-fade-leave-active {
  transition: opacity 0.15s ease;
}

.contact-sheet-fade-enter-from,
.contact-sheet-fade-leave-to {
  opacity: 0;
}

@media (min-width: 640px) {
  .contact-sheet-shell {
    align-items: center;
  }
}
</style>
