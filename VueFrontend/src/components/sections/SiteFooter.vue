<script setup>
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
    <div class="container footer-grid">
      <div>
        <p class="footer-brand">{{ site.name }}</p>
        <p>{{ site.locationLabel }}</p>
      </div>

      <div class="footer-links">
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

.footer-grid {
  display: grid;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(20, 32, 36, 0.1);
}

.footer-brand,
.footer-grid p {
  margin: 0;
}

.footer-brand {
  color: var(--text-strong);
  font-weight: 700;
}

.footer-grid p:last-child {
  margin-top: 0.4rem;
  color: var(--muted);
}

.footer-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-links a {
  color: var(--text-strong);
  font-weight: 600;
}

@media (min-width: 760px) {
  .footer-grid {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
}
</style>
