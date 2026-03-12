<script setup>
defineProps({
  faqs: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell">
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">FAQs</span>
        <h2>Questions students usually ask before they call.</h2>
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
.faq-list {
  display: grid;
  gap: 0.85rem;
}

.faq-item {
  padding: 1rem 1.1rem;
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: var(--text-strong);
  font-weight: 700;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-item summary::after {
  content: '+';
  font-size: 1.35rem;
  line-height: 1;
  transition: transform 0.2s ease;
}

.faq-item[open] summary::after {
  transform: rotate(45deg);
}

.faq-item p {
  margin: 0.8rem 0 0;
  color: var(--muted);
}
</style>
