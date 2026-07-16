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
    <div class="container process-layout">
      <div class="section-heading process-heading">
        <span class="label-upper">{{ site.processEyebrow }}</span>
        <div class="process-heading-copy">
          <h2>{{ site.processTitle }}</h2>
          <p>{{ site.processSummary }}</p>
        </div>
      </div>

      <ol class="process-list">
        <li
          v-for="(step, index) in site.processSteps"
          :key="step.title"
          class="process-step"
        >
          <article>
            <span class="process-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="process-step-copy">
              <h3>{{ step.title }}</h3>
              <p>{{ step.body }}</p>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process-shell {
  padding-bottom: var(--section-space);
}

.process-layout {
  display: grid;
  gap: var(--space-xl);
}

.process-heading {
  margin: 0;
  padding-bottom: var(--space-xl);
  border-bottom: 1px solid var(--line-strong);
}

.process-heading .label-upper {
  color: var(--muted);
}

.process-heading-copy {
  display: grid;
  gap: var(--space-md);
}

.process-heading h2 {
  max-width: 14ch;
  color: var(--text-strong);
}

.process-heading p {
  color: var(--muted);
}

.process-list {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}

.process-step {
  border-bottom: 1px solid var(--line);
}

.process-step:first-child {
  border-top: 1px solid var(--line);
}

.process-step article {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-md);
  padding: var(--space-lg) 0;
}

.process-index {
  min-width: 2rem;
  color: var(--muted);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.5;
}

.process-step-copy {
  display: grid;
  gap: var(--space-sm);
}

.process-step-copy p {
  color: var(--muted);
}

@media (min-width: 960px) {
  .process-heading {
    grid-template-columns: minmax(8rem, 0.34fr) minmax(0, 1.66fr);
    align-items: start;
  }

  .process-heading-copy {
    grid-template-columns: minmax(16rem, 0.85fr) minmax(16rem, 1.15fr);
    align-items: end;
  }

  .process-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .process-step,
  .process-step:first-child {
    border-top: 0;
    border-bottom: 0;
  }

  .process-step + .process-step {
    border-left: 1px solid var(--line);
  }

  .process-step article {
    grid-template-columns: 1fr;
    padding: var(--space-md) var(--space-lg);
  }

  .process-step:first-child article {
    padding-left: 0;
  }

  .process-step:last-child article {
    padding-right: 0;
  }
}
</style>
