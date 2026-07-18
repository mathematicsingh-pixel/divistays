<script setup>
defineProps({
  page: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell category-guide-shell">
    <div class="container category-guide-layout">
      <article class="category-definition">
        <span class="label-upper">{{ page.positioningEyebrow }}</span>
        <h2>{{ page.positioningTitle }}</h2>
        <p
          v-for="paragraph in page.positioningParagraphs"
          :key="paragraph"
        >
          {{ paragraph }}
        </p>

        <RouterLink
          class="category-related-link"
          :to="page.relatedPath"
        >
          {{ page.relatedLabel }}
          <span aria-hidden="true">→</span>
        </RouterLink>
      </article>

      <article class="category-checklist">
        <header>
          <span class="label-upper">{{ page.guideEyebrow }}</span>
          <h2>{{ page.guideTitle }}</h2>
          <p>{{ page.guideSummary }}</p>
        </header>

        <ol>
          <li
            v-for="(item, index) in page.guideItems"
            :key="item.title"
          >
            <span class="category-guide-index" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.body }}</p>
            </div>
          </li>
        </ol>
      </article>
    </div>
  </section>
</template>

<style scoped>
.category-guide-shell {
  padding-block: var(--section-space);
  border-block: 1px solid var(--line);
  background: var(--paper);
}

.category-guide-layout,
.category-definition,
.category-checklist,
.category-checklist header {
  display: grid;
}

.category-guide-layout {
  gap: var(--space-2xl);
}

.category-definition,
.category-checklist header {
  align-content: start;
  gap: var(--space-md);
}

.category-definition h2,
.category-checklist h2 {
  max-width: 13ch;
}

.category-definition > p,
.category-checklist header > p {
  max-width: 42rem;
  color: var(--text);
}

.category-related-link {
  display: inline-flex;
  width: fit-content;
  min-height: 3.25rem;
  align-items: center;
  gap: var(--space-sm);
  margin-top: var(--space-md);
  color: var(--accent-deep);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: var(--space-xs);
}

.category-related-link span {
  flex: 0 0 auto;
  transition: transform 160ms ease;
}

.category-checklist {
  gap: var(--space-xl);
}

.category-checklist ol {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line-strong);
  list-style: none;
}

.category-checklist li {
  display: grid;
  grid-template-columns: 2.25rem minmax(0, 1fr);
  gap: var(--space-md);
  padding-block: var(--space-lg);
  border-bottom: 1px solid var(--line);
}

.category-guide-index {
  color: var(--muted);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
}

.category-checklist li > div {
  display: grid;
  gap: var(--space-sm);
}

.category-checklist li p {
  color: var(--text);
  font-size: 0.9375rem;
}

@media (hover: hover) {
  .category-related-link:hover {
    text-decoration-color: currentColor;
  }

  .category-related-link:hover span {
    transform: translateX(var(--space-xs));
  }
}

@media (min-width: 960px) {
  .category-guide-layout {
    grid-template-columns: minmax(18rem, 0.8fr) minmax(0, 1.2fr);
    gap: clamp(4rem, 9vw, 8rem);
  }

  .category-definition {
    position: sticky;
    top: 6rem;
    align-self: start;
  }
}
</style>
