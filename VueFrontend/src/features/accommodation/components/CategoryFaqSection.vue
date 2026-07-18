<script setup>
defineProps({
  page: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section
    id="category-faqs"
    class="section-shell category-faq-shell"
    aria-labelledby="category-faq-title"
  >
    <div class="container category-faq-layout">
      <div class="section-heading category-faq-heading">
        <span class="label-upper">Local room questions</span>
        <h2 id="category-faq-title">Questions before you visit</h2>
        <p>Clear answers based on what the DiviStays listings actually show.</p>
      </div>

      <div class="category-faq-list">
        <details
          v-for="(item, index) in page.faqs"
          :key="item.question"
          class="category-faq-item"
          :open="index === 0"
        >
          <summary>
            <span>{{ item.question }}</span>
            <span class="category-faq-toggle" aria-hidden="true" />
          </summary>
          <div class="category-faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-faq-shell {
  padding-bottom: var(--section-space);
}

.category-faq-layout {
  display: grid;
  gap: var(--space-xl);
}

.category-faq-heading {
  margin: 0;
}

.category-faq-heading h2 {
  max-width: 12ch;
}

.category-faq-list {
  display: grid;
  border-top: 1px solid var(--line-strong);
}

.category-faq-item {
  border-bottom: 1px solid var(--line);
}

.category-faq-item summary {
  display: flex;
  min-height: 4.5rem;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-lg);
  padding: var(--space-md) 0;
  cursor: pointer;
  color: var(--text-strong);
  font-weight: 700;
  list-style: none;
}

.category-faq-item summary::-webkit-details-marker {
  display: none;
}

.category-faq-toggle {
  position: relative;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
}

.category-faq-toggle::before,
.category-faq-toggle::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  background: currentColor;
  content: '';
  transform: translate(-50%, -50%);
  transition: transform 180ms ease;
}

.category-faq-toggle::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.category-faq-item[open] .category-faq-toggle::after {
  transform: translate(-50%, -50%);
}

.category-faq-answer {
  padding: 0 var(--space-xl) var(--space-lg) 0;
}

.category-faq-answer p {
  max-width: 44rem;
  color: var(--muted);
}

@media (hover: hover) {
  .category-faq-item summary:hover {
    color: var(--muted);
  }
}

@media (min-width: 960px) {
  .category-faq-layout {
    grid-template-columns: minmax(0, 0.7fr) minmax(0, 1.3fr);
    align-items: start;
    gap: var(--space-2xl);
  }
}
</style>
