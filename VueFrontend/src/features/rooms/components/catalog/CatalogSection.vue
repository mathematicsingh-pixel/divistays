<script setup>
import { computed, ref, watch } from 'vue'
import { priceBands } from '@/features/rooms'
import CatalogResults from '@/features/rooms/components/catalog/CatalogResults.vue'
import CatalogToolbar from '@/features/rooms/components/catalog/CatalogToolbar.vue'

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

function toggleDesktopFilters() {
  isDesktopFiltersOpen.value = !isDesktopFiltersOpen.value
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

      <CatalogToolbar
        :filters="filters"
        :actions="actions"
        :availability-options="availabilityOptions"
        :occupancy-options="occupancyOptions"
        :kitchen-options="kitchenOptions"
        :washroom-options="washroomOptions"
        :price-options="priceBands"
        :sort-options="sortOptions"
        :filter-groups="filterGroups"
        :active-labels="activeLabels"
        :active-filter-count="activeFilterCount"
        :advanced-filter-count="advancedFilterCount"
        :has-active-filters="hasActiveFilters"
        :is-sheet-open="isSheetOpen"
        :is-desktop-filters-open="isDesktopFiltersOpen"
        :result-label="resultLabel"
        :toolbar-note="toolbarNote"
        :result-count="rooms.length"
        @update:sheet-open="emit('update:sheet-open', $event)"
        @toggle-desktop-filters="toggleDesktopFilters"
      />

      <CatalogResults
        :rooms="rooms"
        :result-label="resultLabel"
        :actions="actions"
      />
    </div>
  </section>
</template>
