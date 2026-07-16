<script setup>
import BrandGlyph from '@/features/site/components/brand/BrandGlyph.vue'

defineProps({
  site: {
    type: Object,
    required: true,
  },
  callHref: {
    type: String,
    required: true,
  },
  whatsappHref: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell enquiry-shell">
    <div class="container">
      <div class="surface-dark enquiry-panel">
        <BrandGlyph class="brand-glyph-motif enquiry-glyph" />

        <div class="enquiry-copy">
          <span class="label-upper">{{ site.ctaEyebrow }}</span>
          <h2>{{ site.ctaTitle }}</h2>
          <p>{{ site.ctaSummary }}</p>
        </div>

        <div class="enquiry-actions">
          <a
            class="button-primary action-glow"
            :href="whatsappHref"
            target="_blank"
            rel="noreferrer"
          >
            {{ site.ctaPrimaryLabel }}
          </a>
          <a
            class="button-secondary enquiry-call"
            :href="callHref"
          >
            {{ site.ctaSecondaryLabel }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.enquiry-panel {
  position: relative;
  display: grid;
  overflow: hidden;
  gap: var(--space-xl);
  padding: var(--space-xl);
  isolation: isolate;
}

.enquiry-glyph {
  right: -4rem;
  bottom: -9rem;
  z-index: 0;
  width: 15rem;
}

.enquiry-copy,
.enquiry-actions {
  position: relative;
  z-index: 1;
}

.enquiry-copy {
  display: grid;
  gap: var(--space-md);
}

.enquiry-copy .label-upper {
  color: var(--muted-inverse);
}

.enquiry-copy h2 {
  max-width: 12ch;
  color: var(--text-inverse);
}

.enquiry-copy p {
  max-width: 38rem;
  color: var(--muted-inverse);
}

.enquiry-actions {
  display: grid;
  gap: var(--space-sm);
}

.enquiry-call {
  border-color: var(--line-inverse);
  background: transparent;
  color: var(--text-inverse);
  box-shadow: none;
}

@media (min-width: 960px) {
  .enquiry-panel {
    grid-template-columns: minmax(0, 1fr) minmax(15rem, auto);
    align-items: end;
    padding: var(--space-2xl);
  }

  .enquiry-glyph {
    right: 4rem;
    bottom: -10rem;
    width: 19rem;
  }

  .enquiry-actions {
    grid-template-columns: repeat(2, minmax(0, auto));
    justify-content: end;
  }
}
</style>
