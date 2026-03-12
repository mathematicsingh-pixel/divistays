<script setup>
import { computed } from 'vue'
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

const activeLabels = computed(() => {
  const labels = []

  if (props.filters.availability === 'available') {
    labels.push('Available now')
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

function isActive(list, value) {
  return list.includes(value)
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
              {{ hasActiveFilters ? `${activeFilterCount} active filter${activeFilterCount === 1 ? '' : 's'}` : 'Currently sorted by recommended fit' }}
            </p>
          </div>

          <div class="toolbar-actions">
            <button
              class="filter-trigger"
              type="button"
              aria-controls="catalog-filters"
              :aria-expanded="isSheetOpen ? 'true' : 'false'"
              @click="emit('update:sheet-open', true)"
            >
              Filters
              <span v-if="activeFilterCount">{{ activeFilterCount }}</span>
            </button>

            <label class="sort-field">
              <span>Sort</span>
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
          </div>
        </div>

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

        <div class="desktop-groups">
          <div class="group-row">
            <span>Occupancy</span>
            <div class="chip-row">
              <button
                v-for="item in occupancyOptions"
                :key="item.value"
                type="button"
                class="chip-button"
                :class="{ active: isActive(filters.occupancy, item.value) }"
                :aria-pressed="isActive(filters.occupancy, item.value)"
                @click="actions.toggleOccupancy(item.value)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <div class="group-row">
            <span>Kitchen</span>
            <div class="chip-row">
              <button
                v-for="item in kitchenOptions"
                :key="item.value"
                type="button"
                class="chip-button"
                :class="{ active: isActive(filters.kitchen, item.value) }"
                :aria-pressed="isActive(filters.kitchen, item.value)"
                @click="actions.toggleKitchen(item.value)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>

          <div class="group-row">
            <span>Washroom</span>
            <div class="chip-row">
              <button
                v-for="item in washroomOptions"
                :key="item.value"
                type="button"
                class="chip-button"
                :class="{ active: isActive(filters.washroom, item.value) }"
                :aria-pressed="isActive(filters.washroom, item.value)"
                @click="actions.toggleWashroom(item.value)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="activeLabels.length"
          class="active-row"
        >
          <span class="toolbar-label">Active filters</span>
          <div class="active-chips">
            <span
              v-for="label in activeLabels"
              :key="label"
              class="soft-chip"
            >
              {{ label }}
            </span>
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
  display: grid;
  gap: 0.9rem;
  padding: 1rem;
  border: 1px solid rgba(121, 217, 202, 0.18);
  background:
    linear-gradient(180deg, rgba(249, 252, 255, 0.98), rgba(240, 247, 250, 0.96));
}

.toolbar-top {
  display: grid;
  gap: 0.9rem;
}

.toolbar-copy {
  display: grid;
  gap: 0.15rem;
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

.toolbar-actions {
  display: grid;
  gap: 0.7rem;
}

.sort-field {
  display: grid;
  gap: 0.35rem;
  color: var(--muted);
  font-size: 0.86rem;
}

.sort-field select {
  min-height: 3rem;
  padding: 0 0.9rem;
  border: 1px solid var(--line);
  border-radius: 0.95rem;
  background: #ffffff;
  color: var(--text-strong);
}

.filter-trigger,
.chip-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.85rem;
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 0.95rem;
  background: #ffffff;
  color: var(--text-strong);
  font-weight: 700;
}

.filter-trigger span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.3rem;
  height: 1.3rem;
  border-radius: 999px;
  background: var(--forest-soft);
  color: var(--text-inverse);
  font-size: 0.76rem;
}

.availability-row,
.chip-row,
.active-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.chip-button.active {
  border-color: rgba(255, 122, 26, 0.35);
  background: rgba(255, 122, 26, 0.1);
  color: var(--accent-deep);
}

.desktop-groups {
  display: none;
  gap: 0.85rem;
}

.group-row {
  display: grid;
  gap: 0.45rem;
}

.group-row > span {
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.active-row {
  display: grid;
  gap: 0.6rem;
  padding-top: 0.2rem;
  border-top: 1px solid var(--line);
}

.reset-link {
  justify-self: start;
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

@media (min-width: 760px) {
  .toolbar-top {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }

  .toolbar-actions {
    grid-template-columns: auto auto;
    align-items: end;
  }

  .room-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .catalog-toolbar {
    padding: 1.15rem;
  }

  .desktop-groups {
    display: grid;
  }

  .filter-trigger {
    display: none;
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
