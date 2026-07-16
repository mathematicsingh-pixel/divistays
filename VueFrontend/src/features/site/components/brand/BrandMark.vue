<script setup>
import { computed } from 'vue'
import BrandGlyph from '@/features/site/components/brand/BrandGlyph.vue'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
  tone: {
    type: String,
    default: '',
  },
  tag: {
    type: String,
    default: '',
  },
  strap: {
    type: String,
    default: '',
  },
  inverted: {
    type: Boolean,
    default: false,
  },
})

const resolvedTone = computed(() => (props.inverted ? 'light' : props.tone || 'dark'))
const label = computed(() => props.strap || props.tag || 'Rooms & studio stays')
</script>

<template>
  <div
    class="brand-mark"
    :class="[`tone-${resolvedTone}`, { compact }]"
  >
    <span class="brand-icon-wrap">
      <BrandGlyph class="brand-icon" />
    </span>

    <span class="brand-copy">
      <span class="brand-name">
        <span class="brand-name-divi">Divi</span><span class="brand-name-stays">Stays</span>
      </span>
      <span
        v-if="!compact"
        class="brand-tag"
      >
        {{ label }}
      </span>
    </span>
  </div>
</template>

<style scoped>
.brand-mark {
  --glyph: var(--text-strong);
  --word: var(--text-strong);
  --tag: var(--muted);
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
}

.tone-light {
  --glyph: var(--text-inverse);
  --word: var(--text-inverse);
  --tag: var(--muted-inverse);
}

.brand-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 auto;
}

.brand-icon {
  width: 100%;
  height: 100%;
  color: var(--glyph);
}

.brand-copy {
  display: grid;
  gap: 0.1rem;
}

.brand-name {
  color: var(--word);
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1;
}

.brand-name-divi,
.brand-name-stays {
  font-weight: inherit;
}

.brand-tag {
  color: var(--tag);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.compact {
  gap: 0.58rem;
}

.compact .brand-icon-wrap {
  width: 2.4rem;
  height: 2.4rem;
}

.compact .brand-name {
  font-size: 1.05rem;
}
</style>
