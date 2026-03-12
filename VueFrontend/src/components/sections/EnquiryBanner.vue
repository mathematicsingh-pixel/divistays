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
  <section class="section-shell">
    <div class="container">
      <div class="cta-banner">
        <div>
          <span class="eyebrow">Enquiry</span>
          <h2>See a likely-fit room, then ask while the context is fresh.</h2>
          <p>{{ site.enquirySummary }}</p>
        </div>

        <div class="cta-actions">
          <a
            class="button-primary"
            :href="callHref"
          >
            Call {{ site.phoneDisplay }}
          </a>
          <a
            class="button-secondary"
            :href="whatsappHref"
            target="_blank"
            rel="noreferrer"
          >
            Start WhatsApp chat
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-banner {
  display: grid;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 1.6rem;
  background:
    radial-gradient(circle at top left, rgba(188, 106, 79, 0.3), transparent 30%),
    linear-gradient(135deg, #18342f, #10201d);
  color: white;
  box-shadow: 0 24px 64px rgba(12, 24, 22, 0.18);
}

.cta-banner h2,
.cta-banner p {
  margin: 0;
}

.cta-banner p {
  margin-top: 0.75rem;
  max-width: 36rem;
  color: rgba(255, 255, 255, 0.78);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.cta-actions .button-secondary {
  border-color: rgba(255, 255, 255, 0.24);
  color: white;
}

@media (min-width: 960px) {
  .cta-banner {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    padding: 1.5rem;
  }
}
</style>
