<script setup>
defineProps({
  callHref: {
    type: String,
    required: true,
  },
  whatsappHref: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div
    class="mobile-bar"
    :class="{ 'mobile-bar-hidden': hidden }"
  >
    <a
      class="button-secondary"
      :href="callHref"
    >
      Call
    </a>
    <a
      class="button-primary"
      :href="whatsappHref"
      target="_blank"
      rel="noreferrer"
    >
      WhatsApp
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
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.4rem;
  background: rgba(7, 18, 26, 0.92);
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 42px rgba(0, 0, 0, 0.34);
  transition:
    transform 0.18s ease,
    opacity 0.18s ease;
}

.mobile-bar .button-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-inverse);
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
