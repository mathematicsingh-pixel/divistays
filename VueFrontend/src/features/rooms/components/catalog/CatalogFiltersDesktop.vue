<script setup>
defineProps({
  filterGroups: {
    type: Array,
    required: true,
  },
  filters: {
    type: Object,
    required: true,
  },
  actions: {
    type: Object,
    required: true,
  },
})

function isActive(list, value) {
  return list.includes(value)
}
</script>

<template>
  <div class="desktop-groups">
    <div
      v-for="group in filterGroups"
      :key="group.key"
      class="group-card"
    >
      <div class="group-copy">
        <span>{{ group.label }}</span>
        <strong>{{ filters[group.key].length ? `${filters[group.key].length} selected` : 'Any' }}</strong>
      </div>

      <div class="chip-row">
        <button
          v-for="item in group.options"
          :key="item.value"
          type="button"
          class="chip-button"
          :class="{ active: isActive(filters[group.key], item.value) }"
          :aria-pressed="isActive(filters[group.key], item.value)"
          @click="actions[group.action](item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.desktop-groups {
  display: grid;
  gap: 0.8rem;
}

.group-card {
  display: grid;
  gap: 0.65rem;
  padding: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1.1rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.36), rgba(255, 255, 255, 0.14)),
    rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.54),
    0 14px 28px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: blur(12px) saturate(165%);
  backdrop-filter: blur(12px) saturate(165%);
}

.group-copy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.group-copy span {
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.chip-button {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.7rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 0.95rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.66), rgba(244, 249, 252, 0.42)),
    rgba(255, 255, 255, 0.3);
  color: var(--text-strong);
  font-weight: 700;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    0 10px 22px rgba(0, 0, 0, 0.06);
  -webkit-backdrop-filter: blur(10px) saturate(165%);
  backdrop-filter: blur(10px) saturate(165%);
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    transform 0.18s ease;
}

.chip-button.active {
  border-color: rgba(255, 186, 124, 0.38);
  background:
    linear-gradient(180deg, rgba(255, 249, 241, 0.72), rgba(255, 225, 194, 0.44)),
    rgba(255, 122, 26, 0.08);
  color: var(--accent-deep);
}

@media (hover: hover) {
  .group-card:hover,
  .chip-button:hover {
    transform: translateY(-2px);
  }
}

@media (min-width: 960px) {
  .desktop-groups {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
