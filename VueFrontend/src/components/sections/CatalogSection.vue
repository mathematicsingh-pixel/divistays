<script setup>
import { computed, ref } from 'vue'
import RoomCard from '@/components/RoomCard.vue'
import { useOverlayDialog } from '@/composables/useOverlayDialog'

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
const sheetPanel = ref(null)
const closeButton = ref(null)

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

useOverlayDialog({
  isOpen: computed(() => props.isSheetOpen),
  panelRef: sheetPanel,
  initialFocusRef: closeButton,
  onClose: closeSheet,
})
</script>

<template>
  <section
    id="rooms"
    class="section-shell"
  >
    <div class="container">
      <div class="section-heading">
        <span class="eyebrow">Room catalog</span>
        <h2>Compare the fit fast, then enquire with context.</h2>
        <p>
          Start with rooms that are open now, then widen the list when you want a fuller view of layout and pricing.
        </p>
      </div>

      <div class="catalog-toolbar surface-panel">
        <div class="toolbar-top">
          <div>
            <p class="toolbar-label">Showing</p>
            <strong>{{ resultLabel }}</strong>
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
                <option value="recommended">
                  Recommended
                </option>
                <option value="price-asc">
                  Price: low to high
                </option>
                <option value="price-desc">
                  Price: high to low
                </option>
              </select>
            </label>
          </div>
        </div>

        <div class="availability-toggle">
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
            Show all rooms
          </button>
        </div>

        <div
          v-if="activeLabels.length"
          class="active-summary"
        >
          <span class="toolbar-label">Active</span>
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

        <button
          v-if="hasActiveFilters"
          class="reset-link"
          type="button"
          @click="actions.resetFilters()"
        >
          Reset filters
        </button>
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
        <p>Reset the filters or switch back to the full catalog to compare every current layout.</p>
        <button
          class="button-primary"
          type="button"
          @click="actions.resetFilters()"
        >
          Reset filters
        </button>
      </div>
    </div>

    <Teleport to="body">
      <transition name="sheet-fade">
        <div
          v-if="isSheetOpen"
          class="sheet-shell"
          @click.self="closeSheet"
        >
          <section
            id="catalog-filters"
            ref="sheetPanel"
            class="sheet-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="catalog-filters-title"
          >
            <div class="sheet-head">
              <div>
                <p class="toolbar-label">Filters</p>
                <h3 id="catalog-filters-title">Refine the shortlist</h3>
              </div>
              <button
                ref="closeButton"
                class="icon-button"
                type="button"
                aria-label="Close filters"
                @click="closeSheet"
              >
                ×
              </button>
            </div>

            <div class="sheet-body">
              <div class="sheet-group">
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

              <div class="sheet-group">
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

              <div class="sheet-group">
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

            <div class="sheet-actions">
              <button
                class="button-secondary"
                type="button"
                @click="actions.resetFilters()"
              >
                Reset
              </button>
              <button
                class="button-primary"
                type="button"
                @click="closeSheet"
              >
                Show rooms
              </button>
            </div>
          </section>
        </div>
      </transition>
    </Teleport>
  </section>
</template>

<style scoped>
.catalog-toolbar {
  position: sticky;
  top: 0.75rem;
  z-index: 20;
  display: grid;
  gap: 0.95rem;
  padding: 1rem;
}

.toolbar-top {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  justify-content: space-between;
  gap: 0.85rem;
}

.toolbar-label {
  margin: 0;
  color: var(--muted);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
}

.toolbar-actions {
  display: flex;
  align-items: end;
  gap: 0.7rem;
}

.active-summary {
  display: grid;
  gap: 0.5rem;
}

.filter-trigger,
.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.8rem;
  padding: 0.55rem 0.85rem;
  border: 1px solid rgba(20, 32, 36, 0.12);
  border-radius: 999px;
  background: white;
  color: var(--text-strong);
  font-weight: 600;
}

.filter-trigger span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.35rem;
  height: 1.35rem;
  border-radius: 999px;
  background: var(--accent);
  color: white;
  font-size: 0.78rem;
}

.sort-field {
  display: grid;
  gap: 0.35rem;
  color: var(--muted);
  font-size: 0.88rem;
}

.sort-field select {
  min-height: 2.8rem;
  padding: 0 0.85rem;
  border: 1px solid rgba(20, 32, 36, 0.12);
  border-radius: 999px;
  background: white;
  color: var(--text-strong);
  font: inherit;
}

.availability-toggle,
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.chip-button {
  min-height: 2.5rem;
  padding: 0.55rem 0.85rem;
  border: 1px solid rgba(20, 32, 36, 0.12);
  border-radius: 999px;
  background: white;
  color: var(--text-strong);
  font: inherit;
  font-weight: 600;
}

.chip-button.active {
  border-color: var(--accent);
  background: rgba(188, 106, 79, 0.12);
}

.desktop-groups {
  display: none;
}

.group-row {
  display: grid;
  gap: 0.6rem;
}

.group-row span,
.sheet-group span {
  color: var(--muted);
  font-size: 0.88rem;
}

.reset-link {
  justify-self: start;
  color: var(--accent-deep);
  font-weight: 700;
}

.room-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.1rem;
}

.empty-state {
  display: grid;
  gap: 0.8rem;
  justify-items: start;
  margin-top: 1.1rem;
  padding: 1.2rem;
}

.empty-state h3,
.empty-state p {
  margin: 0;
}

.sheet-shell {
  position: fixed;
  inset: 0;
  z-index: 45;
  display: flex;
  align-items: end;
  justify-content: center;
  padding: 0.75rem 0 0;
  overflow-y: auto;
  background: rgba(20, 24, 25, 0.5);
}

.sheet-panel {
  width: min(100%, 38rem);
  max-height: calc(100svh - 0.75rem);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 1rem;
  padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
  border-radius: 1.5rem 1.5rem 0 0;
  background: var(--paper);
  box-shadow: var(--shadow);
}

.sheet-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.sheet-head h3 {
  margin: 0.15rem 0 0;
}

.sheet-body {
  display: grid;
  gap: 1rem;
  overflow-y: auto;
  padding-right: 0.1rem;
}

.sheet-group {
  display: grid;
  gap: 0.65rem;
}

.sheet-actions {
  display: flex;
  gap: 0.7rem;
  padding-top: 0.2rem;
}

.sheet-actions > * {
  flex: 1 1 0;
}

.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 0.2s ease;
}

.sheet-fade-enter-from,
.sheet-fade-leave-to {
  opacity: 0;
}

@media (min-width: 760px) {
  .room-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .catalog-toolbar {
    top: 1rem;
  }

  .filter-trigger {
    display: none;
  }

  .active-summary {
    display: none;
  }

  .desktop-groups {
    display: grid;
    gap: 0.85rem;
  }

  .sheet-shell {
    display: none;
  }
}
</style>
