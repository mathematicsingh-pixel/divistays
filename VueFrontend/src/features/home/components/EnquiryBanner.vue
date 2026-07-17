<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BrandGlyph from '@/features/site/components/brand/BrandGlyph.vue'
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

const emit = defineEmits(['visibility-change'])
const sectionRef = ref(null)

let visibilityObserver

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    return
  }

  visibilityObserver = new IntersectionObserver(
    ([entry]) => emit('visibility-change', entry.isIntersecting),
    { threshold: 0.15 },
  )

  if (sectionRef.value) {
    visibilityObserver.observe(sectionRef.value)
  }
})

onBeforeUnmount(() => {
  visibilityObserver?.disconnect()
})
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="section-shell enquiry-shell"
    aria-labelledby="enquiry-title"
  >
    <div class="container">
      <div class="enquiry-panel">
        <BrandGlyph class="brand-glyph-motif enquiry-glyph" />
        <BrandMark
          class="enquiry-brand"
          compact
        />

        <div class="enquiry-copy">
          <h2 id="enquiry-title">
            {{ site.ctaTitle }}
          </h2>
          <p>{{ site.ctaSummary }}</p>
        </div>

        <div class="enquiry-actions">
          <a
            class="button-primary"
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
.enquiry-shell {
  padding: var(--section-space) 0 var(--space-xl);
  background: var(--bg);
}

.enquiry-panel {
  position: relative;
  display: grid;
  grid-template-areas:
    'brand'
    'copy'
    'actions';
  overflow: hidden;
  gap: var(--space-xl);
  padding: var(--space-xl);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-lg);
  background: var(--gradient-enquiry);
  color: var(--bg);
  isolation: isolate;
}

.enquiry-brand {
  position: relative;
  z-index: 1;
  grid-area: brand;
  width: fit-content;
}

.enquiry-glyph {
  top: var(--space-md);
  right: -2.75rem;
  z-index: 0;
  width: 9rem;
  color: var(--line);
  opacity: 1;
}

.enquiry-copy,
.enquiry-actions {
  position: relative;
  z-index: 1;
}

.enquiry-copy {
  grid-area: copy;
  display: grid;
  gap: var(--space-md);
}

.enquiry-copy h2 {
  max-width: 12ch;
  color: var(--bg);
  font-size: clamp(2.4rem, 10vw, 3.75rem);
}

.enquiry-copy p {
  max-width: 34rem;
  color: var(--text-strong);
  font-size: 1.0625rem;
}

.enquiry-actions {
  grid-area: actions;
  display: grid;
  gap: var(--space-sm);
}

.enquiry-actions .button-primary {
  border-color: var(--bg);
  background: var(--bg);
  color: var(--text-inverse);
  box-shadow: none;
}

.enquiry-call {
  border-color: var(--bg);
  background: var(--paper);
  color: var(--text-strong);
  box-shadow: none;
}

@media (min-width: 960px) {
  .enquiry-panel {
    grid-template-areas:
      'brand brand'
      'copy actions';
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    min-height: 20rem;
    padding: var(--space-2xl);
  }

  .enquiry-glyph {
    top: -3rem;
    right: -2rem;
    width: 19rem;
  }

  .enquiry-copy h2 {
    max-width: 15ch;
  }

  .enquiry-actions {
    grid-template-columns: repeat(2, minmax(0, auto));
    justify-self: end;
  }
}
</style>
