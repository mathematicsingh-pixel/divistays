<script setup>
import { computed, ref, watch } from 'vue'
import { siteConfig } from '@/features/site/config/site'
import { useOverlayDialog } from '@/shared/composables/useOverlayDialog'

const props = defineProps({
  primaryHref: {
    type: String,
    required: true,
  },
  primaryLabel: {
    type: String,
    required: true,
  },
  secondaryHref: {
    type: String,
    default: '',
  },
  secondaryLabel: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  primaryBlank: {
    type: Boolean,
    default: false,
  },
  secondaryBlank: {
    type: Boolean,
    default: false,
  },
  primaryButton: {
    type: Boolean,
    default: false,
  },
  secondaryMenuOptions: {
    type: Array,
    default: () => [],
  },
  secondaryMenuTitle: {
    type: String,
    default: siteConfig.uiText.contactSheet.title,
  },
  secondaryMenuSummary: {
    type: String,
    default: siteConfig.uiText.contactSheet.summary,
  },
})

defineEmits(['primary-click'])

const closeButton = ref(null)
const panelRef = ref(null)
const isSecondaryMenuOpen = ref(false)
const hasSecondaryMenu = computed(() => props.secondaryMenuOptions.length > 0)
const dialogOpen = computed(() => isSecondaryMenuOpen.value)

function openSecondaryMenu() {
  if (!hasSecondaryMenu.value) {
    return
  }

  isSecondaryMenuOpen.value = true
}

function closeSecondaryMenu() {
  isSecondaryMenuOpen.value = false
}

watch(
  () => props.hidden,
  (hidden) => {
    if (hidden) {
      closeSecondaryMenu()
    }
  },
)

useOverlayDialog({
  isOpen: dialogOpen,
  panelRef,
  initialFocusRef: closeButton,
  onClose: closeSecondaryMenu,
})
</script>

<template>
  <Teleport to="body">
    <transition name="contact-sheet-fade">
      <div
        v-if="isSecondaryMenuOpen"
        class="contact-sheet-shell glass-overlay"
        @click.self="closeSecondaryMenu"
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
              <h2 id="mobile-contact-sheet-title">{{ secondaryMenuTitle }}</h2>
              <p>{{ secondaryMenuSummary }}</p>
            </div>

            <button
              ref="closeButton"
              class="contact-close"
              type="button"
              aria-label="Close contact options"
              @click="closeSecondaryMenu"
            >
              ×
            </button>
          </div>

          <div class="contact-sheet-actions">
            <a
              v-for="option in secondaryMenuOptions"
              :key="option.label"
              class="contact-option"
              :class="option.tone === 'primary' ? 'button-primary' : 'button-secondary'"
              :href="option.href"
              :target="option.blank ? '_blank' : undefined"
              :rel="option.blank ? 'noreferrer' : undefined"
              @click="closeSecondaryMenu"
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

  <div
    class="mobile-bar surface-dark-shell"
    :class="{ 'mobile-bar-hidden': hidden }"
  >
    <button
      v-if="primaryButton"
      class="button-secondary"
      type="button"
      @click="$emit('primary-click')"
    >
      {{ primaryLabel }}
    </button>
    <a
      v-else
      class="button-secondary"
      :href="primaryHref"
      :target="primaryBlank ? '_blank' : undefined"
      :rel="primaryBlank ? 'noreferrer' : undefined"
    >
      {{ primaryLabel }}
    </a>

    <button
      v-if="hasSecondaryMenu"
      class="button-primary mobile-contact-trigger"
      type="button"
      :aria-expanded="isSecondaryMenuOpen ? 'true' : 'false'"
      :aria-haspopup="'dialog'"
      @click="openSecondaryMenu"
    >
      <span>{{ secondaryLabel }}</span>
      <span class="mobile-contact-caret">+</span>
    </button>

    <a
      v-else
      class="button-primary"
      :href="secondaryHref"
      :target="secondaryBlank ? '_blank' : undefined"
      :rel="secondaryBlank ? 'noreferrer' : undefined"
    >
      {{ secondaryLabel }}
    </a>
  </div>
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
  padding: 1rem;
  border-radius: 1.5rem;
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
  font-size: 0.72rem;
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
  font-size: 0.78rem;
  color: inherit;
  opacity: 0.78;
}

.mobile-bar {
  position: fixed;
  right: 0.8rem;
  bottom: 0;
  left: 0.8rem;
  z-index: 35;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  padding: 0.6rem;
  margin-bottom: calc(0.8rem + env(safe-area-inset-bottom));
  border-radius: 1.4rem;
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
}

.mobile-contact-trigger {
  justify-content: space-between;
}

.mobile-contact-caret {
  font-size: 1.15rem;
  line-height: 1;
}

.mobile-bar .button-secondary {
  min-height: 3rem;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-inverse);
  border-color: rgba(255, 255, 255, 0.16);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.mobile-bar .button-primary {
  min-height: 3rem;
}

.mobile-bar-hidden {
  opacity: 0;
  transform: translateY(100%);
  pointer-events: none;
}

.contact-sheet-fade-enter-active,
.contact-sheet-fade-leave-active {
  transition: opacity 0.18s ease;
}

.contact-sheet-fade-enter-from,
.contact-sheet-fade-leave-to {
  opacity: 0;
}

@media (min-width: 960px) {
  .mobile-bar {
    display: none;
  }
}
</style>
