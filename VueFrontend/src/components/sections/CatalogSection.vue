<script setup>
import { computed, ref, watch } from 'vue'
import RoomCard from '@/components/RoomCard.vue'
import { priceBands } from '@/data/rooms'
import CatalogFilterSheet from '@/components/sections/CatalogFilterSheet.vue'

const props = defineProps({
  rooms: {
    type: Array,
    required: true,
  },
  allRooms: {
    type: Array,
    required: true,
  },
  filters: {
    type: Object,
    required: true,
  },
  activeFilterCount: {
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
  actions: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:sheet-open'])

const availabilityOptions = computed(() => {
  const availableCount = props.allRooms.filter((room) => room.available).length

  return [
    { value: 'available', label: `Available now (${availableCount})` },
    { value: 'all', label: `All rooms (${props.allRooms.length})` },
  ]
})

const occupancyOptions = [
  { value: 'single', label: 'Single' },
  { value: 'double', label: 'Double' },
  { value: 'flex', label: 'Double / triple' },
]

const kitchenOptions = [
  { value: 'private', label: 'Private kitchen' },
  { value: 'common', label: 'Common kitchen' },
]

const washroomOptions = [
  { value: 'attached', label: 'Attached washroom' },
  { value: 'common', label: 'Common washroom' },
]

const sortOptions = [
  { value: 'available-first', label: 'Available first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'updated', label: 'Recently updated' },
]

const filterGroups = [
  { key: 'occupancy', label: 'Occupancy', options: occupancyOptions, action: 'toggleOccupancy' },
  { key: 'kitchen', label: 'Kitchen', options: kitchenOptions, action: 'toggleKitchen' },
  { key: 'washroom', label: 'Washroom', options: washroomOptions, action: 'toggleWashroom' },
  { key: 'price', label: 'Budget', options: priceBands, action: 'togglePrice' },
]

const advancedFilterCount = computed(
  () => props.filters.occupancy.length + props.filters.kitchen.length + props.filters.washroom.length + props.filters.price.length,
)

const activeLabels = computed(() => {
  const labels = []

  if (props.filters.availability === 'all') {
    labels.push('All rooms')
  }

  ;[
    ...occupancyOptions,
    ...kitchenOptions,
    ...washroomOptions,
    ...priceBands,
  ].forEach((item) => {
    const key = item.value

    if (props.filters.occupancy.includes(key) || props.filters.kitchen.includes(key) || props.filters.washroom.includes(key) || props.filters.price.includes(key)) {
      labels.push(item.label)
    }
  })

  if (props.filters.sort === 'price-asc') {
    labels.push('Price: low to high')
  }

  if (props.filters.sort === 'price-desc') {
    labels.push('Price: high to low')
  }

  if (props.filters.sort === 'updated') {
    labels.push('Recently updated')
  }

  return labels
})

const resultLabel = computed(() => `${props.rooms.length} room${props.rooms.length === 1 ? '' : 's'} matched`)
const toolbarNote = computed(() =>
  props.hasActiveFilters
    ? `${props.activeFilterCount} active filter${props.activeFilterCount === 1 ? '' : 's'}`
    : 'Open rooms show first. Use filters only if you need them.',
)
const isDesktopFiltersOpen = ref(false)

watch(
  advancedFilterCount,
  (count) => {
    if (count > 0) {
      isDesktopFiltersOpen.value = true
    }
  },
  { immediate: true },
)

function isActive(list, value) {
  return list.includes(value)
}

function toggleDesktopFilters() {
  isDesktopFiltersOpen.value = !isDesktopFiltersOpen.value
}

function closeSheet() {
  emit('update:sheet-open', false)
}
</script>

<template>
  <section
    id="rooms"
    class="section-shell catalog-shell"
  >
    <div class="container">
      <div class="section-heading catalog-heading">
        <span class="eyebrow">Rooms</span>
        <h2>Find your room</h2>
        <p>
          Start with rooms that are free now. Filter only when you want a tighter list.
        </p>
      </div>

      <div class="catalog-toolbar surface-panel glass-panel">
        <div class="toolbar-top">
          <div class="toolbar-copy">
            <p class="toolbar-label">Showing</p>
            <strong>{{ resultLabel }}</strong>
            <p class="toolbar-note">
              {{ toolbarNote }}
            </p>
          </div>
        </div>

        <div class="control-rail">
          <div class="control-card availability-card">
            <span class="toolbar-label">Availability</span>
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

          <label class="control-card sort-card">
            <span class="toolbar-label">Sort by</span>
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
            class="control-card filter-trigger"
            aria-controls="catalog-filters"
            :aria-expanded="isSheetOpen ? 'true' : 'false'"
            @click="emit('update:sheet-open', true)"
          >
            <span class="toolbar-label">Mobile filters</span>
            <strong>{{ advancedFilterCount ? `${advancedFilterCount} selected` : 'More filters' }}</strong>
            <span class="control-note">Budget, setup, and room type</span>
          </button>

          <button
            type="button"
            class="control-card desktop-filter-toggle"
            :class="{ active: isDesktopFiltersOpen || advancedFilterCount }"
            :aria-expanded="isDesktopFiltersOpen ? 'true' : 'false'"
            aria-controls="catalog-filter-panel"
            @click="toggleDesktopFilters"
          >
            <span class="toolbar-label">Desktop filters</span>
            <strong>{{ advancedFilterCount ? `${advancedFilterCount} selected` : 'More filters' }}</strong>
            <span class="control-note">Budget, setup, and room type</span>
          </button>
        </div>

        <transition name="desktop-panel">
          <div
            v-if="isDesktopFiltersOpen"
            id="catalog-filter-panel"
            class="desktop-groups"
          >
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
        </transition>

        <div
          v-if="hasActiveFilters"
          class="active-row"
        >
          <div class="active-copy">
            <span class="toolbar-label">Selected</span>
            <div class="chip-row active-chip-row">
              <span
                v-for="label in activeLabels"
                :key="label"
                class="soft-chip glass-chip"
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
            Reset all
          </button>
        </div>
      </div>

      <p
        class="sr-only"
        aria-live="polite"
      >
        {{ resultLabel }}
      </p>

      <div
        v-if="rooms.length"
        class="room-grid"
      >
        <RoomCard
          v-for="(room, index) in rooms"
          :key="room.slug"
          :room="room"
          :eager="index < 2"
          show-quick-preview
          @preview="actions.openPreview(room.slug)"
        />
      </div>

      <div
        v-else
        class="empty-state surface-panel glass-panel"
      >
        <h3>No rooms match those filters.</h3>
        <p>Clear a few filters or switch to all rooms.</p>
        <button
          class="button-primary"
          type="button"
          @click="actions.resetFilters()"
        >
          Reset filters
        </button>
      </div>
    </div>

    <CatalogFilterSheet
      :is-open="isSheetOpen"
      :filters="filters"
      :actions="actions"
      :availability-options="availabilityOptions"
      :occupancy-options="occupancyOptions"
      :kitchen-options="kitchenOptions"
      :washroom-options="washroomOptions"
      :price-options="priceBands"
      :sort-options="sortOptions"
      :result-count="rooms.length"
      @close="closeSheet"
    />
  </section>
</template>

<style scoped>
.catalog-toolbar {
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  overflow: hidden;
  background:
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.14), transparent 28%),
    radial-gradient(circle at 15% 100%, rgba(255, 211, 142, 0.18), transparent 26%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.08)),
    linear-gradient(180deg, rgba(249, 252, 255, 0.74), rgba(240, 247, 250, 0.52));
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.18);
}

.toolbar-top,
.toolbar-copy {
  display: grid;
  gap: 0.2rem;
}

.toolbar-label {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.toolbar-copy strong {
  color: var(--text-strong);
  font-size: 1.25rem;
}

.toolbar-note {
  color: var(--muted);
}

.control-rail {
  display: grid;
  gap: 0.75rem;
}

.control-card {
  display: grid;
  gap: 0.48rem;
  min-height: 100%;
  padding: 0.8rem 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 1.15rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0.18)),
    rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    0 16px 32px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: blur(12px) saturate(170%);
  backdrop-filter: blur(12px) saturate(170%);
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

.chip-button.active,
.desktop-filter-toggle.active {
  border-color: rgba(255, 186, 124, 0.38);
  background:
    linear-gradient(180deg, rgba(255, 249, 241, 0.72), rgba(255, 225, 194, 0.44)),
    rgba(255, 122, 26, 0.08);
  color: var(--accent-deep);
}

.sort-card select {
  min-height: 2.9rem;
  padding: 0 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 0.95rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.66), rgba(244, 249, 252, 0.42)),
    rgba(255, 255, 255, 0.3);
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
  color: var(--muted);
  font-size: 0.9rem;
}

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

.room-grid {
  display: grid;
  gap: 0.9rem;
  margin-top: 1rem;
}

.empty-state {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
  padding: 1.1rem;
  background:
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.12), transparent 26%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.12)),
    rgba(249, 252, 255, 0.64);
}

.empty-state p {
  color: var(--muted);
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
  .group-card:hover,
  .chip-button:hover {
    transform: translateY(-2px);
  }
}

@media (min-width: 760px) {
  .room-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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

  .desktop-groups {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .active-row {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
}
</style>
