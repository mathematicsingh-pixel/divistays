<script setup>
import BrandMark from '@/components/brand/BrandMark.vue'

defineProps({
  site: {
    type: Object,
    required: true,
  },
  callHref: {
    type: String,
    required: true,
  },
  whatsappHref: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-panel">
      <div class="footer-copy">
        <BrandMark
          inverted
          tag="Student stays"
        />
        <p>{{ site.locationLabel }}</p>
        <p class="footer-summary">{{ site.brandSummary }}</p>
      </div>

      <div class="footer-links">
        <a href="#rooms">Rooms</a>
        <a :href="callHref">{{ site.phoneDisplay }}</a>
        <a
          :href="whatsappHref"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 0 0 calc(7rem + env(safe-area-inset-bottom));
}

.footer-panel {
  display: grid;
  gap: 1rem;
  padding: 1.25rem 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-copy {
  display: grid;
  gap: 0.5rem;
}

.footer-copy p {
  color: var(--muted-inverse);
}

.footer-summary {
  max-width: 34rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-links a {
  color: var(--text-inverse);
  font-weight: 700;
}

@media (min-width: 760px) {
  .footer-panel {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
}
</style>
