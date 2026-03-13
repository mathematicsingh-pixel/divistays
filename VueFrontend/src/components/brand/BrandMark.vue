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
          d="M18 52V35.5L34 20l16 15.5V52H18Z"
          class="brand-room-fill"
        />
        <path
          d="M14 54V30c0-11 8.95-20 20-20s20 9 20 20v24H14Z"
          class="brand-arch-shell"
        />
        <path
          d="M22 54V33c0-6.6 5.4-12 12-12s12 5.4 12 12v21"
          class="brand-arch-inner"
        />
        <path
          d="M34 17v10"
          class="brand-lamp-stem"
        />
        <path
          d="M24.5 31.5h19A9.5 9.5 0 0 0 34 23a9.5 9.5 0 0 0-9.5 8.5Z"
          class="brand-lamp-shade"
        />
        <circle
          cx="34"
          cy="37"
          r="5.8"
          class="brand-lamp-glow"
        />
        <path
          d="M34 43.5v6"
          class="brand-ray"
        />
        <path
          d="M26.6 41.4 23 46"
          class="brand-ray"
        />
        <path
          d="M41.4 41.4 45 46"
          class="brand-ray"
        />
        <path
          d="M23.3 36.8H18"
          class="brand-ray"
        />
        <path
          d="M50 36.8h-5.3"
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
  --frame: linear-gradient(180deg, #fff1db, #f5c266);
  --frame-border: rgba(133, 74, 43, 0.18);
  --arch-shell: #5c2f20;
  --arch-inner: #6f3d27;
  --room-fill: #ec9433;
  --lamp-shade: #5c2f20;
  --lamp-glow: #fff2bf;
  --ray: #ffe7a0;
  --word: #4a261b;
  --tag: #94624c;
  display: inline-flex;
  align-items: center;
  gap: 0.78rem;
}

.tone-light {
  --frame: linear-gradient(180deg, rgba(255, 241, 219, 0.2), rgba(236, 148, 51, 0.18));
  --frame-border: rgba(255, 203, 122, 0.22);
  --arch-shell: #fff2df;
  --arch-inner: #ffd08d;
  --room-fill: rgba(236, 148, 51, 0.85);
  --lamp-shade: #fff2df;
  --lamp-glow: #fff5c8;
  --ray: #ffe6a0;
  --word: #fff3e2;
  --tag: rgba(255, 232, 208, 0.78);
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
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24);
}

.brand-icon {
  width: 2.5rem;
  height: 2.5rem;
  flex: 0 0 auto;
}

.brand-arch-shell,
.brand-arch-inner,
.brand-lamp-stem,
.brand-ray {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.brand-room-fill {
  fill: var(--room-fill);
}

.brand-arch-shell {
  stroke: var(--arch-shell);
  stroke-width: 5.2;
}

.brand-arch-inner {
  stroke: var(--arch-inner);
  stroke-width: 3.8;
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

.brand-ray {
  stroke: var(--ray);
  stroke-width: 3.2;
}

.brand-copy {
  display: grid;
  gap: 0.1rem;
}

.brand-name {
  color: var(--word);
  font-family: 'Syne', sans-serif;
  font-size: 1.16rem;
  font-weight: 800;
  letter-spacing: -0.045em;
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
