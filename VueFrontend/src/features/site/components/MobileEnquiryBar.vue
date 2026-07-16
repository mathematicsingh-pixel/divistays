<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { siteConfig } from '@/features/site/config/site'
import MobileContactSheet from './MobileContactSheet.vue'


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
  revealAfter: {
    type: Number,
    default: 0,
  },
})

defineEmits(['primary-click'])

const isSecondaryMenuOpen = ref(false)
const isKeyboardOpen = ref(false)
const isPastReveal = ref(props.revealAfter === 0)
const hasSecondaryMenu = computed(() => props.secondaryMenuOptions.length > 0)
const activeSecondaryMenuOptions = computed(() => isSecondaryMenuOpen.value ? props.secondaryMenuOptions : [])

let focusFrame = 0

function openSecondaryMenu() {
  if (hasSecondaryMenu.value) {
    isSecondaryMenuOpen.value = true
  }
}

function closeSecondaryMenu() {
  isSecondaryMenuOpen.value = false
}

function updateKeyboardState() {
  const activeElement = document.activeElement
  isKeyboardOpen.value = activeElement instanceof HTMLElement
    && activeElement.matches('input, textarea, select, [contenteditable="true"]')
}

function handleFocusChange() {
  window.cancelAnimationFrame(focusFrame)
  focusFrame = window.requestAnimationFrame(updateKeyboardState)
}

function updateRevealState() {
  isPastReveal.value = window.scrollY >= props.revealAfter
}

onMounted(() => {
  document.addEventListener('focusin', handleFocusChange)
  document.addEventListener('focusout', handleFocusChange)
  window.addEventListener('scroll', updateRevealState, { passive: true })
  updateRevealState()
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(focusFrame)
  document.removeEventListener('focusin', handleFocusChange)
  document.removeEventListener('focusout', handleFocusChange)
  window.removeEventListener('scroll', updateRevealState)
})

watch(
  () => props.hidden,
  (hidden) => {
    if (hidden) {
      closeSecondaryMenu()
    }
  },
)
</script>

<template>
  <MobileContactSheet
    v-if="hasSecondaryMenu && isSecondaryMenuOpen"
    :options="activeSecondaryMenuOptions"
    :title="secondaryMenuTitle"
    :summary="secondaryMenuSummary"
    @close="closeSecondaryMenu"
  />

  <nav
    v-show="!hidden && isPastReveal && !isSecondaryMenuOpen && !isKeyboardOpen"
    class="mobile-bar surface-dark"
    aria-label="Page actions"
  >
    <button
      v-if="primaryButton"
      class="button-primary"
      type="button"
      @click="$emit('primary-click')"
    >
      {{ primaryLabel }}
    </button>
    <a
      v-else
      class="button-primary"
      :href="primaryHref"
      :target="primaryBlank ? '_blank' : undefined"
      :rel="primaryBlank ? 'noreferrer' : undefined"
    >
      {{ primaryLabel }}
    </a>

    <button
      v-if="hasSecondaryMenu"
      class="button-secondary"
      type="button"
      :aria-expanded="isSecondaryMenuOpen"
      aria-haspopup="dialog"
      @click="openSecondaryMenu"
    >
      {{ secondaryLabel }}
    </button>

    <a
      v-else
      class="button-secondary"
      :href="secondaryHref"
      :target="secondaryBlank ? '_blank' : undefined"
      :rel="secondaryBlank ? 'noreferrer' : undefined"
    >
      {{ secondaryLabel }}
    </a>
  </nav>
</template>

<style scoped>
.mobile-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 35;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md) calc(var(--space-sm) + env(safe-area-inset-bottom));
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  border-radius: 0;
}

.mobile-bar .button-primary,
.mobile-bar .button-secondary {
  min-width: 0;
  min-height: 3rem;
  padding-inline: var(--space-sm);
  font-size: 0.875rem;
  text-align: center;
}

@media (min-width: 960px) {
  .mobile-bar {
    display: none;
  }
}
</style>
