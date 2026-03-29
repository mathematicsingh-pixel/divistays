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
      class="group-card surface-input"
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
  border-radius: 1.1rem;
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
  border: 1px solid var(--paper-border-soft);
  border-radius: 0.95rem;
  background: var(--surface-field-fill);
  color: var(--text-strong);
  font-weight: 700;
  box-shadow: var(--shadow-sm);
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    transform 0.18s ease;
}

.chip-button.active {
  border-color: rgba(44, 161, 142, 0.26);
  background: rgba(121, 217, 202, 0.12);
  color: var(--brand-strong);
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
