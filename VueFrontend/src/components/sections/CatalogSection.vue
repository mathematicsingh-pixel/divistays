<script setup>
import { computed, ref, watch } from 'vue'
import RoomCard from '@/components/RoomCard.vue'
import CatalogFilterSheet from '@/components/sections/CatalogFilterSheet.vue'

const props = defineProps({
  rooms: {
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
  { value: 'private', label: 'Attached / private' },
  { value: 'common', label: 'Common washroom' },
]

const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

const filterGroups = [
  { key: 'occupancy', label: 'Occupancy', options: occupancyOptions, action: 'toggleOccupancy' },
  { key: 'kitchen', label: 'Kitchen', options: kitchenOptions, action: 'toggleKitchen' },
  { key: 'washroom', label: 'Washroom', options: washroomOptions, action: 'toggleWashroom' },
]

const advancedFilterCount = computed(
  () => props.filters.occupancy.length + props.filters.kitchen.length + props.filters.washroom.length,
)

const activeLabels = computed(() => {
  const labels = []

  if (props.filters.availability === 'all') {
    labels.push('All rooms')
  }

  occupancyOptions.forEach((item) => {
    if (props.filters.occupancy.includes(item.value)) {
      labels.push(item.label)
    }
  })

  kitchenOptions.forEach((item) => {
    if (props.filters.kitchen.includes(item.value)) {
      labels.push(item.label)
    }
  })

  washroomOptions.forEach((item) => {
    if (props.filters.washroom.includes(item.value)) {
      labels.push(item.label)
    }
  })

  if (props.filters.sort === 'price-asc') {
    labels.push('Price low to high')
  }

  if (props.filters.sort === 'price-desc') {
    labels.push('Price high to low')
  }

  return labels
})

const resultLabel = computed(() => `${props.rooms.length} room${props.rooms.length === 1 ? '' : 's'} matched`)
const toolbarNote = computed(() =>
  props.hasActiveFilters
    ? `${props.activeFilterCount} refinement${props.activeFilterCount === 1 ? '' : 's'} active`
    : 'Available now by default. Switch to show all anytime.',
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
        <h2>Shortlist by fit, not brochure fluff.</h2>
        <p>
          Start with live availability, then cut by occupancy, kitchen, washroom, and price order.
        </p>
      </div>

      <div class="catalog-toolbar surface-panel">
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
                type="button"
                class="chip-button"
                :class="{ active: filters.availability === 'available' }"
                :aria-pressed="filters.availability === 'available'"
                @click="actions.setAvailability('available')"
              >
                Available now
              </button>
              <button
                type="button"
                class="chip-button"
                :class="{ active: filters.availability === 'all' }"
                :aria-pressed="filters.availability === 'all'"
                @click="actions.setAvailability('all')"
              >
                Show all
              </button>
            </div>
          </div>

          <label class="control-card sort-card">
            <span class="toolbar-label">Sort</span>
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
            <span class="toolbar-label">More filters</span>
            <strong>Room setup</strong>
            <span class="control-note">{{ advancedFilterCount ? `${advancedFilterCount} selected` : 'Optional' }}</span>
          </button>

          <button
            type="button"
            class="control-card desktop-filter-toggle"
            :class="{ active: isDesktopFiltersOpen || advancedFilterCount }"
            :aria-expanded="isDesktopFiltersOpen ? 'true' : 'false'"
            aria-controls="catalog-filter-panel"
            @click="toggleDesktopFilters"
          >
            <span class="toolbar-label">More filters</span>
            <strong>Room setup</strong>
            <span class="control-note">{{ advancedFilterCount ? `${advancedFilterCount} selected` : 'Optional' }}</span>
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
            <div class="chip-row">
              <span
                v-for="label in activeLabels"
                :key="label"
                class="soft-chip"
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
          @open="actions.openRoom(room.slug)"
        />
      </div>

      <div
        v-else
        class="empty-state surface-panel"
      >
        <h3>No rooms match that filter mix.</h3>
        <p>Reset filters or switch back to all rooms to compare every layout.</p>
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
      :occupancy-options="occupancyOptions"
      :kitchen-options="kitchenOptions"
      :washroom-options="washroomOptions"
      :sort-options="sortOptions"
      @close="closeSheet"
    />
  </section>
</template>

<style scoped>
.catalog-shell {
  scroll-margin-top: 1rem;
}

.catalog-heading h2 {
  color: var(--text-inverse);
}

.catalog-toolbar {
  position: relative;
  display: grid;
  gap: 0.85rem;
  padding: 1rem;
  overflow: hidden;
  border: 1px solid rgba(121, 217, 202, 0.18);
  background:
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.16), transparent 28%),
    linear-gradient(180deg, rgba(249, 252, 255, 0.98), rgba(240, 247, 250, 0.96));
}

.catalog-toolbar::before {
  position: absolute;
  inset: 0 0 auto;
  height: 0.24rem;
  content: '';
  background: linear-gradient(90deg, rgba(121, 217, 202, 0.65), rgba(255, 122, 26, 0.7));
}

.toolbar-top {
  display: grid;
  gap: 0.4rem;
}

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
  font-size: 1.2rem;
}

.toolbar-note {
  color: var(--muted);
  font-size: 0.92rem;
}

.control-rail {
  display: grid;
  gap: 0.7rem;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
}

.control-card {
  display: grid;
  align-content: start;
  gap: 0.48rem;
  min-height: 100%;
  padding: 0.8rem 0.9rem;
  border: 1px solid rgba(11, 23, 32, 0.1);
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.72);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55);
}

.availability-card {
  grid-column: 1 / -1;
}

.filter-trigger,
.desktop-filter-toggle {
  width: 100%;
  justify-items: start;
  text-align: left;
}

.sort-card select,
.chip-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.7rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 0.95rem;
  background: #ffffff;
  color: var(--text-strong);
  font-weight: 700;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.sort-card select {
  width: 100%;
  justify-content: space-between;
  appearance: auto;
}

.control-note {
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 700;
}

.filter-trigger strong,
.desktop-filter-toggle strong {
  color: var(--text-strong);
  font-size: 1.02rem;
}

.availability-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.chip-button.active {
  border-color: rgba(255, 122, 26, 0.35);
  background: rgba(255, 122, 26, 0.1);
  color: var(--accent-deep);
}

.availability-row .chip-button {
  width: 100%;
}

.desktop-groups {
  display: grid;
  gap: 0.75rem;
  padding-top: 0.1rem;
}

.group-card {
  display: grid;
  gap: 0.65rem;
  padding: 0.9rem;
  border: 1px solid rgba(11, 23, 32, 0.08);
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.76);
}

.group-copy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.group-copy > span {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.group-copy strong {
  color: var(--text-strong);
  font-size: 0.84rem;
}

.desktop-filter-toggle {
  display: none;
}

.desktop-filter-toggle.active {
  border-color: rgba(255, 122, 26, 0.28);
  background: rgba(255, 122, 26, 0.08);
}

.active-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  padding-top: 0.2rem;
  border-top: 1px solid var(--line);
}

.active-copy {
  display: grid;
  flex: 1 1 16rem;
  gap: 0.55rem;
}

.reset-link {
  margin-left: auto;
  color: var(--accent-deep);
  font-weight: 800;
}

.room-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.15rem;
}

.empty-state {
  display: grid;
  gap: 0.8rem;
  margin-top: 1rem;
  padding: 1.1rem;
  border: 1px solid rgba(121, 217, 202, 0.18);
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

@media (min-width: 760px) {
  .control-rail {
    grid-template-columns: minmax(0, 1.3fr) minmax(14rem, 0.7fr) minmax(12rem, 0.8fr);
    align-items: stretch;
  }

  .availability-card {
    grid-column: auto;
  }

  .sort-card {
    grid-column: auto;
  }

  .room-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .catalog-toolbar {
    padding: 1.15rem;
  }

  .control-rail {
    grid-template-columns: minmax(0, 1.5fr) minmax(15rem, 0.7fr) minmax(13rem, 0.75fr);
  }

  .desktop-filter-toggle {
    display: grid;
  }

  .filter-trigger {
    display: none;
  }

  .desktop-groups {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .room-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: start;
  }

  .room-grid :deep(.room-card:nth-child(3n + 2)) {
    transform: translateY(1rem);
  }
}
</style>
