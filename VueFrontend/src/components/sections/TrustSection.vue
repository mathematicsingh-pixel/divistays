<script setup>
defineProps({
  points: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell trust-shell">
    <div class="container">
      <div class="section-heading trust-heading">
        <span class="eyebrow">Why CozyRooms</span>
        <h2>Built for the 11 pm room hunt.</h2>
      </div>

      <div class="trust-grid">
        <article
          v-for="(point, index) in points"
          :key="point.title"
          class="surface-panel trust-card"
        >
          <span class="trust-index">0{{ index + 1 }}</span>
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
  padding: 1rem;
  border: 1px solid rgba(121, 217, 202, 0.16);
  background:
    linear-gradient(180deg, rgba(249, 252, 255, 0.98), rgba(240, 247, 250, 0.96));
}

.trust-index {
  color: var(--accent-deep);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
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

  .trust-card:nth-child(2n) {
    transform: translateY(1rem);
  }
}
</style>
