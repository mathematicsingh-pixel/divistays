<script setup>
import BrandMark from '@/features/site/components/brand/BrandMark.vue'

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
  <section class="section-shell">
    <div class="container">
      <div class="cta-banner page-rise">
        <div class="cta-copy">
          <BrandMark
            compact
            tag="Direct line"
          />
          <h2>{{ site.ctaTitle }}</h2>
          <p>{{ site.ctaSummary }}</p>
        </div>

        <div class="cta-actions">
          <a
            class="button-primary"
            :href="whatsappHref"
            target="_blank"
            rel="noreferrer"
          >
            {{ site.ctaPrimaryLabel }}
          </a>
          <a
            class="button-secondary"
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
.cta-banner {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 122, 26, 0.28);
  border-radius: 1.9rem;
  background:
    radial-gradient(circle at top right, rgba(255, 211, 142, 0.34), transparent 28%),
    linear-gradient(135deg, #ff7a1a 0%, #ff9d3b 100%);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.22);
}

.cta-copy {
  display: grid;
  gap: 0.8rem;
}

.cta-eyebrow {
  color: rgba(7, 18, 26, 0.78);
}

.cta-copy h2,
.cta-copy p {
  color: var(--forest);
}

.cta-copy p {
  max-width: 36rem;
  color: rgba(7, 18, 26, 0.78);
}

.cta-actions {
  display: grid;
  gap: 0.7rem;
}

.cta-actions .button-primary {
  background:
    linear-gradient(180deg, rgba(7, 18, 26, 0.92), rgba(18, 39, 53, 0.82)),
    var(--forest);
  color: var(--text-inverse);
  box-shadow: 0 14px 28px rgba(7, 18, 26, 0.2);
}

.cta-actions .button-secondary {
  border-color: rgba(255, 255, 255, 0.28);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 245, 232, 0.56)),
    rgba(255, 255, 255, 0.42);
}

@media (min-width: 960px) {
  .cta-banner {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    padding: 1.2rem;
  }

  .cta-actions {
    grid-template-columns: repeat(2, minmax(0, auto));
  }
}
</style>
