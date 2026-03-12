<script setup>
defineProps({
  points: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Why this feels easier</span>
        <h2>Built around actual student decision points.</h2>
      </div>

      <div class="trust-grid">
        <article
          v-for="point in points"
          :key="point.title"
          class="surface-panel trust-card"
        >
          <h3>{{ point.title }}</h3>
          <p>{{ point.body }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-grid {
  display: grid;
  gap: 0.9rem;
}

.trust-card {
  padding: 1.15rem;
}

.trust-card h3 {
  margin: 0;
  font-size: 1.15rem;
}

.trust-card p {
  margin: 0.65rem 0 0;
  color: var(--muted);
}

@media (min-width: 760px) {
  .trust-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
