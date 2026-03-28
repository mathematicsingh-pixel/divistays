<script setup>
defineProps({
  site: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell process-shell">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">{{ site.processEyebrow }}</span>
        <h2>{{ site.processTitle }}</h2>
        <p>{{ site.processSummary }}</p>
      </div>

      <div class="process-grid">
        <article
          v-for="(step, index) in site.processSteps"
          :key="step.title"
          class="surface-panel surface-soft-panel process-card"
        >
          <span class="process-index">0{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-grid {
  display: grid;
  gap: 0.9rem;
}

.process-card {
  display: grid;
  gap: 0.7rem;
  padding: var(--card-pad);
}

.process-index {
  color: var(--accent-deep);
  font-size: var(--text-kicker);
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.process-card p {
  color: var(--muted);
}

@media (min-width: 960px) {
  .process-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
