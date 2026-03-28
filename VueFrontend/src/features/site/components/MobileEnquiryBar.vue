<script setup>
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { siteConfig } from '@/features/site/config/site'

const AsyncMobileContactSheet = defineAsyncComponent(() => import('./MobileContactSheet.vue'))

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

const isSecondaryMenuOpen = ref(false)
const hasSecondaryMenu = computed(() => props.secondaryMenuOptions.length > 0)
const activeSecondaryMenuOptions = computed(() => isSecondaryMenuOpen.value ? props.secondaryMenuOptions : [])

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
</script>

<template>
  <AsyncMobileContactSheet
    v-if="hasSecondaryMenu && isSecondaryMenuOpen"
    :options="activeSecondaryMenuOptions"
    :title="secondaryMenuTitle"
    :summary="secondaryMenuSummary"
    @close="closeSecondaryMenu"
  />

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
.mobile-bar {
  position: fixed;
  right: 0.8rem;
  bottom: 0;
  left: 0.8rem;
  z-index: 35;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  padding: 0.7rem;
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
  min-height: 3.2rem;
  background: var(--glass-fill-light);
  color: var(--text-inverse);
  border-color: var(--glass-stroke-light);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.mobile-bar .button-primary {
  min-height: 3.2rem;
}

.mobile-bar-hidden {
  opacity: 0;
  transform: translateY(100%);
  pointer-events: none;
}

@media (min-width: 960px) {
  .mobile-bar {
    display: none;
  }
}
</style>
