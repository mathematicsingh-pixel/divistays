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
          :aria-pressed="isActive(filters[group.key], item.value)"
          @click="actions[group.action](item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </fieldset>
  </div>
</template>

<style scoped>
.desktop-groups {
  display: grid;
  gap: var(--space-lg);
  padding-top: var(--space-md);
  border-top: 1px solid var(--line);
}

.filter-group {
  display: grid;
  gap: var(--space-sm);
  min-width: 0;
  padding: 0;
  border: 0;
}

.filter-group legend {
  margin-bottom: var(--space-sm);
  color: var(--muted);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

@media (min-width: 960px) {
  .desktop-groups {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
