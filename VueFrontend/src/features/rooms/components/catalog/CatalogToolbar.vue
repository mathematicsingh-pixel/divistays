<script setup>
import CatalogFilterSheet from '@/features/rooms/components/catalog/CatalogFilterSheet.vue'
import CatalogFiltersDesktop from '@/features/rooms/components/catalog/CatalogFiltersDesktop.vue'
import { siteConfig } from '@/features/site/config/site'

const props = defineProps({
  filters: { type: Object, required: true },
  actions: { type: Object, required: true },
  allRooms: { type: Array, required: true },
  availabilityOptions: { type: Array, required: true },
  occupancyOptions: { type: Array, required: true },
  kitchenOptions: { type: Array, required: true },
  washroomOptions: { type: Array, required: true },
  priceOptions: { type: Array, required: true },
  sortOptions: { type: Array, required: true },
  filterGroups: { type: Array, required: true },
  activeLabels: { type: Array, required: true },
  activeFilterCount: { type: Number, required: true },
  advancedFilterCount: { type: Number, required: true },
  hasActiveFilters: { type: Boolean, required: true },
  isSheetOpen: { type: Boolean, required: true },
  isDesktopFiltersOpen: { type: Boolean, required: true },
  resultLabel: { type: String, required: true },
  toolbarNote: { type: String, required: true },
  resultCount: { type: Number, required: true },
})

const emit = defineEmits(['update:sheet-open', 'toggle-desktop-filters'])

function applyDraft(draft) {
  props.actions.applyFilters(draft)
  emit('update:sheet-open', false)
}
</script>

<template>
  <div class="catalog-toolbar surface-card">
    <div class="toolbar-main">
      <div class="toolbar-copy">
        <strong>{{ resultLabel }}</strong>
        <span>{{ toolbarNote }}</span>
      </div>

      <div class="toolbar-actions">
        <label class="sort-control">
          <span class="sr-only">Sort rooms</span>
          <select
            :value="filters.sort"
            aria-label="Sort rooms"
            @change="actions.setSort($event.target.value)"
          >
            <option
              v-for="item in sortOptions"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </label>

        <button
          type="button"
          class="filter-button"
          :aria-expanded="isDesktopFiltersOpen"
          aria-controls="catalog-filter-panel"
          @click="emit('toggle-desktop-filters')"
        >
          Filters
          <span v-if="advancedFilterCount">{{ advancedFilterCount }}</span>
        </button>

        <button
          type="button"
          class="filter-button mobile-filter-button"
          aria-controls="catalog-filters"
          :aria-expanded="isSheetOpen"
          @click="emit('update:sheet-open', true)"
        >
          Filters
          <span v-if="advancedFilterCount">{{ advancedFilterCount }}</span>
        </button>
      </div>
    </div>

    <div
      class="availability-row"
      role="group"
      aria-label="Availability"
    >
      <button
        v-for="item in availabilityOptions"
        :key="item.value"
        type="button"
        class="chip"
        :class="{ active: filters.availability === item.value }"
        :aria-pressed="filters.availability === item.value"
        @click="actions.setAvailability(item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <Transition name="filter-panel">
      <CatalogFiltersDesktop
        v-if="isDesktopFiltersOpen"
        id="catalog-filter-panel"
        :filter-groups="filterGroups"
        :filters="filters"
        :actions="actions"
      />
    </Transition>

    <div
      v-if="hasActiveFilters"
      class="active-row"
    >
      <div class="active-labels" aria-label="Selected filters">
        <span
          v-for="label in activeLabels"
          :key="label"
          class="active-label"
        >
          {{ label }}
        </span>
      </div>

      <button
        class="clear-button"
        type="button"
        @click="actions.resetFilters()"
      >
        {{ siteConfig.uiText.actions.clearFilters }}
      </button>
    </div>
  </div>

  <CatalogFilterSheet
    v-if="isSheetOpen"
    :is-open="isSheetOpen"
    :filters="filters"
    :all-rooms="allRooms"
    :availability-options="availabilityOptions"
    :occupancy-options="occupancyOptions"
    :kitchen-options="kitchenOptions"
    :washroom-options="washroomOptions"
    :price-options="priceOptions"
    :sort-options="sortOptions"
    @apply="applyDraft"
    @close="emit('update:sheet-open', false)"
  />
</template>

<style scoped>
.catalog-toolbar {
  display: grid;
  gap: var(--space-md);
  padding: var(--space-md);
  box-shadow: var(--shadow-sm);
}

.toolbar-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.toolbar-copy {
  display: grid;
  min-width: 0;
}

.toolbar-copy strong {
  color: var(--text-strong);
  font-size: 1.0625rem;
}

.toolbar-copy span {
  display: none;
  color: var(--muted);
  font-size: 0.8125rem;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  flex: 0 0 auto;
}

.sort-control,
.filter-button {
  min-height: 2.75rem;
}

.sort-control {
  display: none;
}

.sort-control select,
.filter-button {
  height: 2.75rem;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--paper);
  color: var(--text-strong);
  font-weight: 700;
}

.sort-control select {
  padding: 0 var(--space-md);
}

.filter-button {
  display: none;
  align-items: center;
  gap: var(--space-sm);
  padding: 0 var(--space-md);
}

.filter-button span {
  display: inline-grid;
  place-items: center;
  min-width: 1.35rem;
  height: 1.35rem;
  border-radius: var(--radius-full);
  background: var(--bg);
  color: var(--text-inverse);
  font-size: 0.7rem;
}

.mobile-filter-button {
  display: inline-flex;
}

.availability-row {
  display: flex;
  gap: var(--space-sm);
  padding-bottom: var(--space-xs);
  overflow-x: auto;
  scrollbar-width: none;
}

.availability-row::-webkit-scrollbar {
  display: none;
}

.availability-row .chip {
  flex: 0 0 auto;
}

.active-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
  padding-top: var(--space-md);
  border-top: 1px solid var(--line);
}

.active-labels {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.active-label {
  color: var(--brand-strong);
  font-size: 0.8125rem;
  font-weight: 700;
}

.clear-button {
  min-width: max-content;
  min-height: 2.75rem;
  color: var(--text-strong);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: var(--space-xs);
}

.filter-panel-enter-active,
.filter-panel-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.filter-panel-enter-from,
.filter-panel-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

@media (min-width: 760px) {
  .toolbar-copy span {
    display: block;
  }

  .sort-control {
    display: block;
  }
}

@media (min-width: 960px) {
  .catalog-toolbar {
    position: sticky;
    top: 4.5rem;
    z-index: 15;
  }

  .filter-button {
    display: inline-flex;
  }

  .mobile-filter-button {
    display: none;
  }
}
</style>
