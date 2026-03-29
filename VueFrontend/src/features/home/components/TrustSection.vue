<script setup>
defineProps({
  site: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section
    id="features"
    class="section-shell trust-shell"
  >
    <div class="container">
      <div class="section-heading trust-heading">
        <span class="label-upper label-pill">{{ site.proofEyebrow }}</span>
        <h2>{{ site.proofTitle }}</h2>
        <p>{{ site.proofSummary }}</p>
      </div>

      <div class="trust-grid">
        <article
          v-for="point in site.proofCards"
          :key="point.title"
          class="surface-card trust-card"
        >
          <h3>{{ point.title }}</h3>
          <p>{{ point.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-heading h2 {
  color: var(--text-inverse);
}

.trust-grid {
  display: grid;
  gap: 0.9rem;
}

.trust-card {
  display: grid;
  gap: 0.6rem;
  padding: var(--card-pad);
}

.trust-card p {
  color: var(--muted);
}

@media (min-width: 760px) {
  .trust-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .trust-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
