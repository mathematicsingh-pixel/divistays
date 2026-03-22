<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  showFromTop: {
    type: Boolean,
    default: false,
  },
})

const isVisible = ref(false)

let lastScrollY = 0
let ticking = false

function updateVisibility() {
  ticking = false

  if (window.innerWidth >= 960) {
    isVisible.value = false
    lastScrollY = window.scrollY
    return
  }

  const currentScrollY = window.scrollY

  if (props.showFromTop && currentScrollY < 80) {
    isVisible.value = true
  } else if (currentScrollY < 140) {
    isVisible.value = false
  } else if (currentScrollY + 10 < lastScrollY) {
    isVisible.value = true
  } else if (currentScrollY > lastScrollY + 10) {
    isVisible.value = false
  }

  lastScrollY = currentScrollY
}

function handleScroll() {
  if (ticking) {
    return
  }

  ticking = true
  window.requestAnimationFrame(updateVisibility)
}

function handleResize() {
  updateVisibility()
}

onMounted(() => {
  lastScrollY = window.scrollY
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize, { passive: true })
  updateVisibility()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <nav
    class="mobile-section-nav"
    :class="{ 'mobile-section-nav-visible': isVisible && !hidden }"
    aria-label="Quick section navigation"
  >
    <RouterLink
      v-for="item in props.items"
      :key="item.label"
      class="mobile-section-link"
      :to="item.to"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<style scoped>
.mobile-section-nav {
  position: fixed;
  top: calc(0.7rem + env(safe-area-inset-top));
  left: 0.7rem;
  right: 0.7rem;
  z-index: 48;
  display: flex;
  gap: 0.45rem;
  padding: 0.45rem;
  overflow-x: auto;
  border: 1px solid var(--glass-stroke-dark);
  border-radius: 999px;
  background: var(--surface-dark-fill);
  box-shadow: var(--shadow-dark);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
  backdrop-filter: blur(18px) saturate(150%);
  opacity: 0;
  pointer-events: none;
  transform: translateY(calc(-100% - 1rem));
  transition:
    transform 0.22s ease,
    opacity 0.22s ease;
  scrollbar-width: none;
}

.mobile-section-nav::-webkit-scrollbar {
  display: none;
}

.mobile-section-nav-visible {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.mobile-section-link {
  flex: 1 0 auto;
  min-width: max-content;
  padding: 0.72rem 0.92rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
}

@media (hover: hover) {
  .mobile-section-link:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.16);
  }
}

@media (min-width: 960px) {
  .mobile-section-nav {
    display: none;
  }
}
</style>
