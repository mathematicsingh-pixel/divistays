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
    id="faqs"
    class="section-shell faq-shell"
  >
    <div class="container faq-layout">
      <div class="section-heading faq-heading">
        <span class="label-upper">{{ site.faqEyebrow }}</span>
        <h2>{{ site.faqTitle }}</h2>
        <p>{{ site.faqSummary }}</p>
      </div>

      <div class="faq-list">
        <details
          v-for="(item, index) in site.faqs"
          :key="item.question"
          class="faq-item"
          :open="index === 0"
        >
          <summary>
            <span>{{ item.question }}</span>
            <span
              class="faq-toggle"
              aria-hidden="true"
            />
          </summary>
          <div class="faq-answer">
            <p>{{ item.answer }}</p>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-shell {
  padding-bottom: var(--section-space);
}

.faq-layout {
  display: grid;
  gap: var(--space-xl);
}

.faq-heading {
  margin: 0;
}

.faq-heading .label-upper {
  color: var(--muted);
}

.faq-heading h2 {
  color: var(--text-strong);
}

.faq-heading p {
  color: var(--muted);
}

.faq-list {
  display: grid;
  border-top: 1px solid var(--line-strong);
}

.faq-item {
  border-bottom: 1px solid var(--line);
}

.faq-item summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 4.5rem;
  gap: var(--space-lg);
  padding: var(--space-md) 0;
  cursor: pointer;
  color: var(--text-strong);
  font-weight: 700;
  list-style: none;
}

.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-toggle {
  position: relative;
  width: 1rem;
  height: 1rem;
  flex: 0 0 auto;
}

.faq-toggle::before,
.faq-toggle::after {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1px;
  background: currentColor;
  content: '';
  transform: translate(-50%, -50%);
  transition: transform 0.18s ease;
}

.faq-toggle::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.faq-item[open] .faq-toggle::after {
  transform: translate(-50%, -50%) rotate(0deg);
}

.faq-answer {
  padding: 0 var(--space-xl) var(--space-lg) 0;
}

.faq-answer p {
  max-width: 42rem;
  color: var(--muted);
}

@media (hover: hover) {
  .faq-item summary:hover {
    color: var(--muted);
  }
}

@media (min-width: 960px) {
  .faq-layout {
    grid-template-columns: minmax(0, 0.75fr) minmax(0, 1fr);
    align-items: start;
    gap: var(--space-xl);
  }

}
</style>
