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
    <div class="container trust-layout">
      <div class="section-heading trust-heading">
        <span class="label-upper">{{ site.proofEyebrow }}</span>
        <h2>{{ site.proofTitle }}</h2>
        <p>{{ site.proofSummary }}</p>
      </div>

      <div class="trust-list">
        <article
          v-for="(point, index) in site.proofCards"
          :key="point.title"
          class="trust-point"
        >
          <span
            class="trust-index"
            aria-hidden="true"
          >
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <div class="trust-point-copy">
            <h3>{{ point.title }}</h3>
            <p>{{ point.body }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-shell {
  padding-bottom: var(--section-space);
}

.trust-layout {
  display: grid;
  gap: var(--space-xl);
}

.trust-heading {
  margin: 0;
}

.trust-heading .label-upper {
  color: var(--muted);
}

.trust-heading h2 {
  max-width: 13ch;
  color: var(--text-strong);
}

.trust-heading p {
  color: var(--muted);
}

.trust-list {
  display: grid;
  border-top: 1px solid var(--line-strong);
}

.trust-point {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-md);
  padding: var(--space-lg) 0;
  border-bottom: 1px solid var(--line);
}

.trust-index {
  min-width: 2rem;
  color: var(--muted);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.5;
}

.trust-point-copy {
  display: grid;
  gap: var(--space-sm);
}

.trust-point-copy p {
  max-width: 42rem;
  color: var(--muted);
}

@media (min-width: 960px) {
  .trust-layout {
    grid-template-columns: minmax(16rem, 0.72fr) minmax(0, 1.28fr);
    align-items: start;
    gap: var(--space-xl);
  }

  .trust-point {
    grid-template-columns: 3rem minmax(10rem, 0.7fr) minmax(16rem, 1.3fr);
    align-items: baseline;
  }

  .trust-point-copy {
    display: contents;
  }
}
</style>
