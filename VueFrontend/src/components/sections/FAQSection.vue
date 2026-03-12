<script setup>
defineProps({
  faqs: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell faq-shell">
    <div class="container faq-grid">
      <div class="section-heading faq-heading">
        <span class="eyebrow">FAQs</span>
        <h2>Real questions before the first call.</h2>
        <p>
          Short answers first. Straight enquiry next.
        </p>
      </div>

      <div class="faq-list">
        <details
          v-for="(item, index) in faqs"
          :key="item.question"
          class="surface-panel faq-item"
          :open="index === 0"
        >
          <summary>{{ item.question }}</summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-heading h2 {
  color: var(--text-inverse);
}

.faq-grid {
  display: grid;
  gap: 1rem;
}

.faq-list {
  display: grid;
  gap: 0.85rem;
}

.faq-item {
  padding: 1rem 1.1rem;
  border: 1px solid rgba(121, 217, 202, 0.16);
  background:
    linear-gradient(180deg, rgba(249, 252, 255, 0.98), rgba(240, 247, 250, 0.96));
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: var(--text-strong);
  font-weight: 800;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  font-size: 1.35rem;
  line-height: 1;
  color: var(--accent-deep);
  transition: transform 0.2s ease;
}

.faq-item[open] summary::after {
  transform: rotate(45deg);
}

.faq-item p {
  margin: 0.8rem 0 0;
  color: var(--muted);
}

@media (min-width: 960px) {
  .faq-grid {
    grid-template-columns: minmax(0, 0.75fr) minmax(0, 1fr);
    align-items: start;
  }

  .faq-heading {
    position: sticky;
    top: 1rem;
  }
}
</style>
