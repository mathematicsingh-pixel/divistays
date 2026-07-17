<script setup>
import { computed, ref } from 'vue'
import { kitchenOptions, occupancyOptions, priceBands, washroomOptions } from '@/features/rooms'
import { siteConfig } from '@/features/site/config/site'
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

const sortOptions = [
  { value: 'available-first', label: 'Available first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'updated', label: 'Recently updated' },
]

const occupancyShortLabels = {
  single: 'Single',
  'single/double': 'Single or double',
  double: 'Double',
  flex: 'Double or triple',
}

function withShortLabels(options, labels) {
  return options.map((item) => ({
    ...item,
    shortLabel: labels[item.value] || item.label,
  }))
}

const filterGroups = [
  {
    key: 'occupancy',
    label: 'Occupancy',
    options: withShortLabels(occupancyOptions, occupancyShortLabels),
    action: 'toggleOccupancy',
  },
  {
    key: 'kitchen',
    label: 'Kitchen',
    options: withShortLabels(kitchenOptions, { private: 'Private', common: 'Shared' }),
    action: 'toggleKitchen',
  },
  {
    key: 'washroom',
    label: 'Washroom',
    options: withShortLabels(washroomOptions, { attached: 'Attached', common: 'Shared' }),
    action: 'toggleWashroom',
  },
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

const resultLabel = computed(() => {
  const roomLabel = `${props.rooms.length} room${props.rooms.length === 1 ? '' : 's'}`

  return props.filters.availability === 'available'
    ? `${props.rooms.length} available room${props.rooms.length === 1 ? '' : 's'}`
    : `${roomLabel} shown`
})
const isDesktopFiltersOpen = ref(false)

function toggleDesktopFilters() {
  isDesktopFiltersOpen.value = !isDesktopFiltersOpen.value
}
</script>

<template>
  <section
    id="rooms"
    class="section-shell catalog-shell"
    aria-labelledby="catalog-title"
  >
    <div class="container">
      <div class="section-heading catalog-heading">
        <span class="label-upper">Rooms for rent</span>
        <h1 id="catalog-title">{{ siteConfig.uiText.catalog.title }}</h1>
        <p>{{ siteConfig.uiText.catalog.summary }}</p>
      </div>

      <CatalogToolbar
        :filters="filters"
        :actions="actions"
        :all-rooms="allRooms"
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

<style scoped>
.catalog-shell {
  padding: var(--space-xl) 0 var(--section-space);
}

.catalog-heading {
  max-width: 48rem;
}

.catalog-heading h1 {
  max-width: 12ch;
}
</style>
