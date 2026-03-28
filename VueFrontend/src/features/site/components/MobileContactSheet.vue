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
        class="contact-sheet-shell glass-overlay"
        @click.self="closeSheet"
      >
        <section
          ref="panelRef"
          class="contact-sheet surface-paper-panel"
          aria-modal="true"
          role="dialog"
          aria-labelledby="mobile-contact-sheet-title"
        >
          <div class="contact-sheet-head">
            <div class="contact-sheet-copy">
              <p class="contact-sheet-kicker">{{ siteConfig.uiText.contactSheet.eyebrow }}</p>
              <h2 id="mobile-contact-sheet-title">{{ title }}</h2>
              <p>{{ summary }}</p>
            </div>

            <button
              ref="closeButton"
              class="contact-close"
              type="button"
              aria-label="Close contact options"
              @click="closeSheet"
            >
              ×
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
  padding: 0.8rem;
  background: rgba(7, 18, 26, 0.4);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  backdrop-filter: blur(12px) saturate(150%);
}

.contact-sheet {
  display: grid;
  gap: 1rem;
  padding: var(--card-pad);
  border-radius: var(--radius-sheet);
}

.contact-sheet-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 0.75rem;
}

.contact-sheet-copy {
  display: grid;
  gap: 0.22rem;
}

.contact-sheet-kicker {
  color: var(--accent-deep);
  font-size: var(--text-kicker);
  font-weight: 800;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.contact-sheet-copy h2 {
  font-size: 1.45rem;
  line-height: 1;
}

.contact-sheet-copy p:last-child {
  color: var(--muted);
}

.contact-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.55rem;
  height: 2.55rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: 999px;
  background: var(--surface-field-fill);
  color: var(--text-strong);
  font-size: 1.35rem;
  box-shadow: var(--shadow-field);
}

.contact-sheet-actions {
  display: grid;
  gap: 0.7rem;
}

.contact-option {
  display: grid;
  justify-items: start;
  gap: 0.05rem;
  min-height: 3.6rem;
  padding-inline: 1rem;
}

.contact-option-label {
  font-size: 1rem;
  font-weight: 800;
}

.contact-option-meta {
  font-size: var(--text-meta);
  color: inherit;
  opacity: 0.78;
}

.contact-sheet-fade-enter-active,
.contact-sheet-fade-leave-active {
  transition: opacity 0.18s ease;
}

.contact-sheet-fade-enter-from,
.contact-sheet-fade-leave-to {
  opacity: 0;
}
</style>
