<script setup>
import { computed } from 'vue'

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
const label = computed(() => props.strap || props.tag || 'Student stays')
</script>

<template>
  <div
    class="brand-mark"
    :class="[`tone-${resolvedTone}`, { compact }]"
  >
    <span class="brand-icon-frame">
      <svg
        class="brand-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M14 56V28c0-11 8.95-20 20-20s20 9 20 20v28H14Z"
          class="brand-arch-shell"
        />
        <path
          d="M22 56V30c0-6.6 5.4-12 12-12s12 5.4 12 12v26"
          class="brand-arch-inner"
        />
        <path
          d="M34 18v10"
          class="brand-lamp-stem"
        />
        <path
          d="M24.5 31.5h19A9.5 9.5 0 0 0 34 23a9.5 9.5 0 0 0-9.5 8.5Z"
          class="brand-lamp-shade"
        />
        <circle
          cx="34"
          cy="37"
          r="6.25"
          class="brand-lamp-glow"
        />
      </svg>
    </span>

    <span class="brand-copy">
      <span class="brand-name">
        <span class="brand-name-cozy">Cozy</span><span class="brand-name-rooms">Rooms</span>
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
  --frame: rgba(9, 18, 26, 0.04);
  --frame-border: rgba(121, 217, 202, 0.28);
  --arch-shell: #0c1820;
  --arch-inner: #79d9ca;
  --lamp-shade: #ff7a1a;
  --lamp-glow: #ffd38e;
  --word: #0b1720;
  --tag: #5f7484;
  display: inline-flex;
  align-items: center;
  gap: 0.78rem;
}

.tone-light {
  --frame: rgba(255, 255, 255, 0.08);
  --frame-border: rgba(121, 217, 202, 0.28);
  --arch-shell: #f7fbff;
  --arch-inner: #79d9ca;
  --lamp-shade: #ff8f36;
  --lamp-glow: #ffd38e;
  --word: #f5fbfc;
  --tag: rgba(245, 251, 252, 0.72);
}

.brand-icon-frame {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.15rem;
  height: 3.15rem;
  border: 1px solid var(--frame-border);
  border-radius: 1.1rem;
  background: var(--frame);
  backdrop-filter: blur(12px);
}

.brand-icon {
  width: 2.5rem;
  height: 2.5rem;
  flex: 0 0 auto;
}

.brand-arch-shell,
.brand-arch-inner,
.brand-lamp-stem {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.brand-arch-shell {
  stroke: var(--arch-shell);
  stroke-width: 5.2;
}

.brand-arch-inner {
  stroke: var(--arch-inner);
  stroke-width: 4.2;
}

.brand-lamp-stem {
  stroke: var(--arch-shell);
  stroke-width: 4.2;
}

.brand-lamp-shade {
  fill: var(--lamp-shade);
  stroke: var(--arch-shell);
  stroke-width: 3.1;
  stroke-linejoin: round;
}

.brand-lamp-glow {
  fill: var(--lamp-glow);
}

.brand-copy {
  display: grid;
  gap: 0.1rem;
}

.brand-name {
  color: var(--word);
  font-family: 'Syne', sans-serif;
  font-size: 1.14rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 1;
}

.brand-name-cozy {
  font-weight: 600;
}

.brand-name-rooms {
  margin-left: 0.02em;
}

.brand-tag {
  color: var(--tag);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.compact {
  gap: 0.58rem;
}

.compact .brand-icon-frame {
  width: 2.7rem;
  height: 2.7rem;
}

.compact .brand-icon {
  width: 2.15rem;
  height: 2.15rem;
}

.compact .brand-name {
  font-size: 1.02rem;
}
</style>
