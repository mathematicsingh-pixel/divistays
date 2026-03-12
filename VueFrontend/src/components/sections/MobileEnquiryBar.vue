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
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 35;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  padding: 0.9rem 1rem calc(0.9rem + env(safe-area-inset-bottom));
  background: rgba(248, 244, 235, 0.9);
  border-top: 1px solid rgba(20, 32, 36, 0.08);
  backdrop-filter: blur(18px);
  transition:
    transform 0.22s ease,
    opacity 0.22s ease;
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
