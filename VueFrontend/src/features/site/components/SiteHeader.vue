<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from '@/features/site/components/brand/BrandMark.vue'
import MobileContactSheet from '@/features/site/components/MobileContactSheet.vue'
import {
  buildStickyContactOptions,
  getCallHref,
  getWhatsAppHref,
  siteConfig,
} from '@/features/site/config/site'

const props = defineProps({
  site: {
    type: Object,
    default: () => siteConfig,
  },
  callHref: {
    type: String,
    default: '',
  },
  whatsappHref: {
    type: String,
    default: '',
  },
  skipTarget: {
    type: String,
    default: '#main-content',
  },
})

const route = useRoute()
const isContactSheetOpen = ref(false)
const resolvedCallHref = computed(() => props.callHref || getCallHref())
const resolvedWhatsAppHref = computed(() => props.whatsappHref || getWhatsAppHref())
const phoneLabel = computed(() => props.site?.phoneDisplay || siteConfig.phoneDisplay)
const contactOptions = computed(() =>
  isContactSheetOpen.value
    ? buildStickyContactOptions(resolvedCallHref.value, resolvedWhatsAppHref.value)
    : [],
)

function openContactSheet() {
  isContactSheetOpen.value = true
}

function closeContactSheet() {
  isContactSheetOpen.value = false
}

watch(() => route.fullPath, closeContactSheet)

function focusSkipTarget() {
  window.requestAnimationFrame(() => {
    const target = document.querySelector(props.skipTarget)

    if (target instanceof HTMLElement) {
      target.focus()
    }
  })
}
</script>

<template>
  <a
    class="skip-link"
    :href="skipTarget"
    @click="focusSkipTarget"
  >
    Skip to main content
  </a>

  <MobileContactSheet
    :options="contactOptions"
    title="Contact DiviStays"
    @close="closeContactSheet"
  />

  <header class="site-header surface-dark">
    <div class="container site-header-inner">
      <RouterLink
        class="site-header-brand"
        to="/"
        aria-label="DiviStays home"
      >
        <BrandMark
          compact
          inverted
        />
      </RouterLink>

      <nav
        class="mobile-primary-nav"
        aria-label="Primary navigation"
      >
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/rooms">Rooms</RouterLink>
        <button
          class="mobile-contact-trigger button-primary"
          type="button"
          aria-haspopup="dialog"
          :aria-expanded="isContactSheetOpen"
          aria-label="Contact DiviStays by WhatsApp or phone"
          @click="openContactSheet"
        >
          Contact
        </button>
      </nav>

      <nav
        class="desktop-primary-nav"
        aria-label="Primary navigation"
      >
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/rooms">Rooms</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#location' }">Location</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#faqs' }">FAQs</RouterLink>
      </nav>

      <a
        class="header-contact button-primary"
        :href="resolvedCallHref"
        :aria-label="`Call DiviStays on ${phoneLabel}`"
      >
        <span>Call</span>
        <strong>{{ phoneLabel }}</strong>
      </a>
    </div>
  </header>
</template>

<style scoped>
.skip-link {
  position: fixed;
  top: var(--space-sm);
  left: var(--space-md);
  z-index: 80;
  min-height: 2.75rem;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-md);
  background: var(--sun);
  color: var(--text-strong);
  font-weight: 700;
  transform: translateY(calc(-100% - var(--space-lg)));
}

.skip-link:focus {
  transform: translateY(0);
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 45;
  border-top: 0;
  border-right: 0;
  border-left: 0;
  border-radius: 0;
  background: var(--bg);
  box-shadow: var(--shadow-sm);
}

.site-header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  min-height: 4rem;
  padding-block: var(--space-xs);
  padding-top: calc(var(--space-xs) + env(safe-area-inset-top));
}

.site-header-brand {
  display: inline-flex;
  flex: 0 1 auto;
  min-width: 0;
}

.mobile-primary-nav {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--space-xs);
  min-width: 0;
}

.mobile-primary-nav a,
.desktop-primary-nav a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.75rem;
  min-height: 2.75rem;
  color: var(--muted-inverse);
  font-size: 0.875rem;
  font-weight: 600;
  transition: color 0.15s ease;
}

.mobile-primary-nav a {
  padding-inline: var(--space-xs);
}

.mobile-contact-trigger {
  flex: 0 0 auto;
  min-height: 2.75rem;
  padding: var(--space-sm);
  font-size: 0.875rem;
  white-space: nowrap;
}

.mobile-primary-nav a.router-link-exact-active,
.desktop-primary-nav a.router-link-exact-active {
  color: var(--text-inverse);
  font-weight: 700;
}

.desktop-primary-nav,
.header-contact {
  display: none;
}

@media (hover: hover) {
  .mobile-primary-nav a:hover,
  .desktop-primary-nav a:hover {
    color: var(--text-inverse);
  }
}

@media (max-width: 359px) {
  .site-header-brand :deep(.brand-mark) {
    gap: 0;
  }

  .site-header-brand :deep(.brand-copy) {
    display: none;
  }
}

@media (min-width: 960px) {
  .site-header-inner {
    min-height: 4rem;
    gap: var(--space-lg);
  }

  .mobile-primary-nav {
    display: none;
  }

  .desktop-primary-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-sm);
    margin-left: auto;
  }

  .desktop-primary-nav a {
    padding-inline: var(--space-md);
  }

  .header-contact {
    display: inline-flex;
    gap: var(--space-sm);
    min-height: 2.75rem;
    padding: var(--space-sm) var(--space-md);
  }

  .header-contact strong {
    font-size: 0.875rem;
  }
}
</style>
