<script setup>
import { defineAsyncComponent } from 'vue'
import { siteConfig } from '@/features/site/config/site'

const AsyncCatalogFilterSheet = defineAsyncComponent(() => import('@/features/rooms/components/catalog/CatalogFilterSheet.vue'))
const AsyncCatalogFiltersDesktop = defineAsyncComponent(() => import('@/features/rooms/components/catalog/CatalogFiltersDesktop.vue'))

const props = defineProps({
  filters: {
    type: Object,
    required: true,
  },
  actions: {
    type: Object,
    required: true,
  },
  availabilityOptions: {
    type: Array,
    required: true,
  },
  occupancyOptions: {
    type: Array,
    required: true,
  },
  kitchenOptions: {
    type: Array,
    required: true,
  },
  washroomOptions: {
    type: Array,
    required: true,
  },
  priceOptions: {
    type: Array,
    required: true,
  },
  sortOptions: {
    type: Array,
    required: true,
  },
  filterGroups: {
    type: Array,
    required: true,
  },
  activeLabels: {
    type: Array,
    required: true,
  },
  activeFilterCount: {
    type: Number,
    required: true,
  },
  advancedFilterCount: {
    type: Number,
    required: true,
  },
  hasActiveFilters: {
    type: Boolean,
    required: true,
  },
  isSheetOpen: {
    type: Boolean,
    required: true,
  },
  isDesktopFiltersOpen: {
    type: Boolean,
    required: true,
  },
  resultLabel: {
    type: String,
    required: true,
  },
  toolbarNote: {
    type: String,
    required: true,
  },
  resultCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['update:sheet-open', 'toggle-desktop-filters'])
</script>

<template>
  <div class="catalog-toolbar surface-card">
    <div class="toolbar-top">
      <div class="toolbar-copy">
        <p class="label-upper toolbar-label">Showing</p>
        <strong>{{ resultLabel }}</strong>
        <p class="toolbar-note">
          {{ toolbarNote }}
        </p>
      </div>
    </div>

    <div class="control-rail">
      <div class="control-card surface-input availability-card">
        <span class="label-upper toolbar-label">Availability</span>
        <div class="availability-row">
          <button
            v-for="item in availabilityOptions"
            :key="item.value"
            type="button"
            class="chip-button"
            :class="{ active: filters.availability === item.value }"
            :aria-pressed="filters.availability === item.value"
            @click="actions.setAvailability(item.value)"
          >
            {{ item.label }}
          </button>
        </div>
      </div>

      <label class="control-card surface-input sort-card">
        <span class="label-upper toolbar-label">Sort by</span>
        <select
          :value="filters.sort"
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
        class="control-card surface-input filter-trigger"
        aria-controls="catalog-filters"
        :aria-expanded="isSheetOpen ? 'true' : 'false'"
        @click="emit('update:sheet-open', true)"
      >
        <span class="label-upper toolbar-label">Filters</span>
        <strong>
          {{
            advancedFilterCount
              ? `${advancedFilterCount} ${advancedFilterCount === 1 ? 'filter selected' : 'filters selected'}`
              : siteConfig.uiText.actions.chooseFilters
          }}
        </strong>
        <span class="control-note">{{ siteConfig.uiText.catalog.mobileFiltersSummary }}</span>
      </button>

      <button
        type="button"
        class="control-card surface-input desktop-filter-toggle"
        :class="{ active: isDesktopFiltersOpen || advancedFilterCount }"
        :aria-expanded="isDesktopFiltersOpen ? 'true' : 'false'"
        aria-controls="catalog-filter-panel"
        @click="emit('toggle-desktop-filters')"
      >
        <span class="label-upper toolbar-label">Filters</span>
        <strong>
          {{
            advancedFilterCount
              ? `${advancedFilterCount} ${advancedFilterCount === 1 ? 'filter selected' : 'filters selected'}`
              : siteConfig.uiText.actions.chooseFilters
          }}
        </strong>
        <span class="control-note">{{ siteConfig.uiText.catalog.mobileFiltersSummary }}</span>
      </button>
    </div>

    <transition name="desktop-panel">
      <AsyncCatalogFiltersDesktop
        v-if="isDesktopFiltersOpen"
        id="catalog-filter-panel"
        :filter-groups="filterGroups"
        :filters="filters"
        :actions="actions"
      />
    </transition>

    <div
      v-if="hasActiveFilters"
      class="active-row"
    >
      <div class="active-copy">
        <span class="label-upper toolbar-label">Selected</span>
        <div class="chip-row active-chip-row">
          <span
            v-for="label in activeLabels"
            :key="label"
            class="chip"
          >
            {{ label }}
          </span>
        </div>
      </div>

      <button
        class="reset-link"
        type="button"
        @click="actions.resetFilters()"
      >
        {{ siteConfig.uiText.actions.clearFilters }}
      </button>
    </div>
  </div>

  <AsyncCatalogFilterSheet
    v-if="isSheetOpen"
    :is-open="isSheetOpen"
    :filters="filters"
    :actions="actions"
    :availability-options="availabilityOptions"
    :occupancy-options="occupancyOptions"
    :kitchen-options="kitchenOptions"
    :washroom-options="washroomOptions"
    :price-options="priceOptions"
    :sort-options="sortOptions"
    :result-count="resultCount"
    @close="emit('update:sheet-open', false)"
  />
</template>

<style scoped>
.catalog-toolbar {
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  overflow: hidden;
}

.toolbar-top,
.toolbar-copy {
  display: grid;
  gap: 0.2rem;
}

.toolbar-label {
  color: var(--text);
}

.toolbar-copy strong {
  color: var(--text-strong);
  font-size: 1.25rem;
}

.toolbar-note {
  color: var(--text);
}

.control-rail {
  display: grid;
  gap: 0.75rem;
}

.control-card {
  display: grid;
  gap: 0.48rem;
  min-height: 100%;
  padding: var(--card-pad);
  border-radius: 1.15rem;
}

.availability-row,
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
    color 0.18s ease,
    transform 0.18s ease;
}

.chip-button.active,
.desktop-filter-toggle.active {
  border-color: rgba(44, 161, 142, 0.3);
  background: rgba(121, 217, 202, 0.12);
  color: var(--brand-strong);
}

.sort-card select {
  min-height: 2.9rem;
  padding: 0 0.9rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: 0.95rem;
  background: var(--surface-field-fill);
  color: var(--text-strong);
}

.filter-trigger {
  align-items: start;
  text-align: left;
}

.desktop-filter-toggle {
  display: none;
  align-items: start;
  text-align: left;
}

.control-note {
  color: var(--text);
  font-size: 0.9rem;
}

.active-row {
  display: grid;
  gap: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.active-copy {
  display: grid;
  gap: 0.55rem;
}

.active-chip-row {
  gap: 0.5rem;
}

.reset-link {
  width: fit-content;
  color: var(--text-strong);
  font-weight: 800;
}

.desktop-panel-enter-active,
.desktop-panel-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.desktop-panel-enter-from,
.desktop-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (hover: hover) {
  .control-card:hover,
  .chip-button:hover {
    transform: translateY(-2px);
  }
}

.chip-button:active {
  transform: scale(0.97);
}

@media (min-width: 960px) {
  .control-rail {
    grid-template-columns: minmax(0, 1.45fr) minmax(12rem, 0.7fr) minmax(12rem, 0.7fr);
  }

  .filter-trigger {
    display: none;
  }

  .desktop-filter-toggle {
    display: grid;
  }

  .active-row {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
}
</style>
