<script setup>
defineProps({
  filterGroups: { type: Array, required: true },
  filters: { type: Object, required: true },
  actions: { type: Object, required: true },
})

function isActive(list, value) {
  return list.includes(value)
}
</script>

<template>
  <div class="desktop-groups">
    <fieldset
      v-for="group in filterGroups"
      :key="group.key"
      class="filter-group"
    >
      <legend>{{ group.label }}</legend>

      <div class="chip-row">
        <button
          v-for="item in group.options"
          :key="item.value"
          type="button"
          class="chip"
          :class="{ active: isActive(filters[group.key], item.value) }"
          :aria-label="`${group.label}: ${item.label}`"
          :aria-pressed="isActive(filters[group.key], item.value)"
          @click="actions[group.action](item.value)"
        >
          {{ item.shortLabel || item.label }}
        </button>
      </div>
    </fieldset>
  </div>
</template>

<style scoped>
.desktop-groups {
  display: none;
  gap: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid var(--line);
}

.filter-group {
  display: grid;
  grid-template-rows: auto auto;
  align-self: start;
  align-content: start;
  gap: var(--space-sm);
  min-width: 0;
  min-inline-size: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.filter-group legend {
  margin: 0;
  color: var(--muted);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: var(--space-sm);
}

.chip-row .chip {
  width: fit-content;
  max-width: 100%;
  height: auto;
  flex: 0 0 auto;
  align-self: flex-start;
}

@media (min-width: 960px) {
  .desktop-groups {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
    gap: var(--space-md) var(--space-lg);
  }
}

@media (min-width: 1280px) {
  .desktop-groups {
    grid-template-columns:
      minmax(17rem, 1.35fr)
      minmax(11rem, 0.8fr)
      minmax(11rem, 0.8fr)
      minmax(17rem, 1fr);
  }
}
</style>
