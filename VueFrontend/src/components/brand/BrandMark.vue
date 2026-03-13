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
    <span class="brand-icon-wrap">
      <svg
        class="brand-icon"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <path
          d="M14.5 53V30c0-10.7 8.8-19.5 19.5-19.5S53.5 19.3 53.5 30v23H14.5Z"
          class="brand-shell-fill"
        />
        <path
          d="M16.5 51V39.2L34 26l17.5 13.2V51H16.5Z"
          class="brand-floor-glow"
        />
        <path
          d="M14.5 36.2V30c0-10.7 8.8-19.5 19.5-19.5S53.5 19.3 53.5 30v6.2c-5.5-4.8-12.1-7.2-19.5-7.2s-14 2.4-19.5 7.2Z"
          class="brand-top-shadow"
        />
        <path
          d="M14.5 53V30c0-10.7 8.8-19.5 19.5-19.5S53.5 19.3 53.5 30v23H14.5Z"
          class="brand-shell-stroke"
        />
        <path
          d="M34 12.4v9.3"
          class="brand-lamp-stem"
        />
        <path
          d="M24.3 30.6h19.4a9.7 9.7 0 0 0-9.7-8.5 9.7 9.7 0 0 0-9.7 8.5Z"
          class="brand-lamp-shade"
        />
        <circle
          cx="34"
          cy="35.9"
          r="5.2"
          class="brand-lamp-core"
        />
        <path
          d="M34 42.7v6.1M26.3 40.7l-3.9 4.4M41.7 40.7l3.9 4.4M23.1 35.9h-5.5M50.4 35.9h-5.5"
          class="brand-ray"
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
  --shell-fill: #d66c30;
  --floor-glow: #f4ae45;
  --top-shadow: rgba(105, 39, 24, 0.28);
  --shell-stroke: #5f2b1f;
  --lamp-metal: #5f2b1f;
  --lamp-core: #ffe6a0;
  --ray: #f7e1a2;
  --word-top: #6c3123;
  --word-bottom: #4f2118;
  --tag: #8a5441;
  --word-shadow: 0 8px 18px rgba(115, 50, 31, 0.08);
  --icon-shadow: drop-shadow(0 10px 18px rgba(94, 43, 31, 0.16));
  display: inline-flex;
  align-items: center;
  gap: 0.78rem;
}

.tone-light {
  --word-top: #fff7ef;
  --word-bottom: #ffcd82;
  --tag: rgba(255, 229, 200, 0.9);
  --word-shadow: 0 1px 16px rgba(0, 0, 0, 0.22);
  --icon-shadow: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.2));
}

.brand-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.2rem;
  height: 3.2rem;
  flex: 0 0 auto;
}

.brand-icon {
  width: 100%;
  height: 100%;
  filter: var(--icon-shadow);
}

.brand-shell-fill {
  fill: var(--shell-fill);
}

.brand-floor-glow {
  fill: var(--floor-glow);
}

.brand-top-shadow {
  fill: var(--top-shadow);
}

.brand-shell-stroke,
.brand-lamp-stem,
.brand-ray {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.brand-shell-stroke {
  stroke: var(--shell-stroke);
  stroke-width: 4.8;
}

.brand-lamp-stem {
  stroke: var(--lamp-metal);
  stroke-width: 3.7;
}

.brand-lamp-shade {
  fill: var(--lamp-metal);
}

.brand-lamp-core {
  fill: var(--lamp-core);
}

.brand-ray {
  stroke: var(--ray);
  stroke-width: 3.1;
}

.brand-copy {
  display: grid;
  gap: 0.1rem;
}

.brand-name {
  font-family: 'Syne', sans-serif;
  font-size: 1.16rem;
  font-weight: 800;
  letter-spacing: -0.045em;
  line-height: 1;
  background-image: linear-gradient(180deg, var(--word-top), var(--word-bottom));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  text-shadow: var(--word-shadow);
}

.brand-name-cozy {
  font-weight: 700;
}

.brand-name-rooms {
  margin-left: 0.01em;
}

.brand-tag {
  color: var(--tag);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  text-shadow: var(--word-shadow);
}

.compact {
  gap: 0.58rem;
}

.compact .brand-icon-wrap {
  width: 2.84rem;
  height: 2.84rem;
}

.compact .brand-name {
  font-size: 1.05rem;
}
</style>
