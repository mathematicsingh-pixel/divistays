<script setup>
import { computed, ref } from 'vue'
import { roomMatchesPriceBand } from '@/features/rooms'
import { siteConfig } from '@/features/site/config/site'
import { useOverlayDialog } from '@/shared/composables/useOverlayDialog'

const props = defineProps({
  isOpen: { type: Boolean, required: true },
  filters: { type: Object, required: true },
  allRooms: { type: Array, required: true },
  availabilityOptions: { type: Array, required: true },
  occupancyOptions: { type: Array, required: true },
  kitchenOptions: { type: Array, required: true },
  washroomOptions: { type: Array, required: true },
  priceOptions: { type: Array, required: true },
  sortOptions: { type: Array, required: true },
})

const emit = defineEmits(['apply', 'close'])
const panelRef = ref(null)
const closeButton = ref(null)

function createDraft(filters) {
  return {
    availability: filters.availability,
    occupancy: [...filters.occupancy],
    kitchen: [...filters.kitchen],
    washroom: [...filters.washroom],
    price: [...filters.price],
    sort: filters.sort,
  }
}

const draft = ref(createDraft(props.filters))
const hasUnavailableRooms = computed(() => props.allRooms.some((room) => !room.available))

const groups = computed(() => [
  { key: 'occupancy', label: 'Occupancy', options: props.occupancyOptions },
  { key: 'kitchen', label: 'Kitchen', options: props.kitchenOptions },
  { key: 'washroom', label: 'Washroom', options: props.washroomOptions },
  { key: 'price', label: 'Budget', options: props.priceOptions },
])

const draftResultCount = computed(() => props.allRooms.filter((room) => {
  if (draft.value.availability === 'available' && !room.available) return false
  if (draft.value.occupancy.length && !draft.value.occupancy.includes(room.occupancy)) return false
  if (draft.value.kitchen.length && !draft.value.kitchen.includes(room.kitchenType)) return false
  if (draft.value.washroom.length && !draft.value.washroom.includes(room.washroomType)) return false
  if (draft.value.price.length && !draft.value.price.some((band) => roomMatchesPriceBand(room, band))) return false
  return true
}).length)

function toggle(group, value) {
  const values = new Set(draft.value[group])
  values.has(value) ? values.delete(value) : values.add(value)
  draft.value[group] = [...values]
}

function resetDraft() {
  draft.value = {
    availability: 'available',
    occupancy: [],
    kitchen: [],
    washroom: [],
    price: [],
    sort: 'available-first',
  }
}

function applyDraft() {
  emit('apply', createDraft(draft.value))
}

useOverlayDialog({
  isOpen: computed(() => props.isOpen),
  panelRef,
  initialFocusRef: closeButton,
  onClose: () => emit('close'),
})
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet-fade">
      <div
        v-if="isOpen"
        class="sheet-shell overlay-backdrop"
        @click.self="emit('close')"
      >
        <section
          id="catalog-filters"
          ref="panelRef"
          class="sheet-panel surface-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="catalog-filters-title"
        >
          <header class="sheet-head">
            <div>
              <p class="label-upper">Rooms</p>
              <h2 id="catalog-filters-title">Filter by price and facilities</h2>
            </div>

            <button
              ref="closeButton"
              class="sheet-close"
              type="button"
              aria-label="Close filters without applying changes"
              @click="emit('close')"
            >
              <span aria-hidden="true">×</span>
            </button>
          </header>

          <div class="sheet-body">
            <fieldset
              v-if="hasUnavailableRooms"
              class="sheet-group"
            >
              <legend>Availability</legend>
              <div class="chip-row">
                <button
                  v-for="item in availabilityOptions"
                  :key="item.value"
                  type="button"
                  class="chip"
                  :class="{ active: draft.availability === item.value }"
                  :aria-pressed="draft.availability === item.value"
                  @click="draft.availability = item.value"
                >
                  {{ item.label }}
                </button>
              </div>
            </fieldset>

            <fieldset
              v-for="group in groups"
              :key="group.key"
              class="sheet-group"
            >
              <legend>{{ group.label }}</legend>
              <div class="chip-row">
                <button
                  v-for="item in group.options"
                  :key="item.value"
                  type="button"
                  class="chip"
                  :class="{ active: draft[group.key].includes(item.value) }"
                  :aria-pressed="draft[group.key].includes(item.value)"
                  @click="toggle(group.key, item.value)"
                >
                  {{ item.label }}
                </button>
              </div>
            </fieldset>

            <label class="sort-field">
              <span>Sort rooms</span>
              <select v-model="draft.sort">
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

          <footer class="sheet-actions">
            <button
              class="button-secondary"
              type="button"
              @click="resetDraft"
            >
              {{ siteConfig.uiText.actions.clearFilters }}
            </button>
            <button
              class="button-primary"
              type="button"
              @click="applyDraft"
            >
              Show {{ draftResultCount }} {{ draftResultCount === 1 ? 'room' : 'rooms' }}
            </button>
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-shell {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: grid;
  align-items: end;
}

.sheet-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: var(--space-md);
  width: 100%;
  max-height: 92svh;
  padding: var(--space-md) var(--space-md) calc(var(--space-md) + env(safe-area-inset-bottom));
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  box-shadow: var(--shadow-lg);
}

.sheet-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-md);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--line);
}

.sheet-head > div {
  display: grid;
  gap: var(--space-xs);
}

.sheet-head h2 {
  font-size: clamp(1.75rem, 8vw, 2.5rem);
}

.sheet-close {
  display: inline-grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  flex: 0 0 auto;
  border: 1px solid var(--line);
  border-radius: var(--radius-full);
  color: var(--text-strong);
  font-size: 1.5rem;
}

.sheet-body {
  display: grid;
  gap: var(--space-lg);
  padding-right: var(--space-xs);
  overflow-y: auto;
}

.sheet-group {
  display: grid;
  gap: var(--space-sm);
  min-width: 0;
  margin: 0;
  padding: 0 0 var(--space-lg);
  border: 0;
  border-bottom: 1px solid var(--line);
}

.sheet-group legend,
.sort-field > span {
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

.sort-field {
  display: grid;
  gap: var(--space-sm);
}

.sort-field select {
  min-height: 3.25rem;
  padding: 0 var(--space-md);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--paper-soft);
  color: var(--text-strong);
}

.sheet-actions {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: var(--space-sm);
  padding-top: var(--space-md);
  border-top: 1px solid var(--line);
}

.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 160ms ease;
}

.sheet-fade-enter-active .sheet-panel,
.sheet-fade-leave-active .sheet-panel {
  transition: transform 180ms ease;
}

.sheet-fade-enter-from,
.sheet-fade-leave-to {
  opacity: 0;
}

.sheet-fade-enter-from .sheet-panel,
.sheet-fade-leave-to .sheet-panel {
  transform: translateY(1rem);
}

@media (min-width: 760px) {
  .sheet-shell {
    place-items: center;
    padding: var(--space-lg);
  }

  .sheet-panel {
    width: min(42rem, 100%);
    border: 1px solid var(--line);
    border-radius: var(--radius-lg);
  }
}
</style>
