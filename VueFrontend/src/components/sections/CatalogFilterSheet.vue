<script setup>
import { computed, ref } from 'vue'
import { useOverlayDialog } from '@/composables/useOverlayDialog'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
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
  resultCount: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['close'])
const panelRef = ref(null)
const closeButton = ref(null)

function isActive(list, value) {
  return list.includes(value)
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
    <transition name="sheet-fade">
      <div
        v-if="isOpen"
        class="sheet-shell glass-overlay"
        @click.self="emit('close')"
      >
        <section
          id="catalog-filters"
          ref="panelRef"
          class="sheet-panel glass-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="catalog-filters-title"
        >
          <div class="sheet-head">
            <div>
              <p class="sheet-kicker">Filters</p>
              <h3 id="catalog-filters-title">Refine rooms</h3>
            </div>

            <button
              ref="closeButton"
              class="sheet-close"
              type="button"
              aria-label="Close filters"
              @click="emit('close')"
            >
              ×
            </button>
          </div>

          <div class="sheet-body">
            <div class="sheet-group">
              <span>Availability</span>
              <div class="chip-row">
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

            <div class="sheet-group">
              <span>Budget</span>
              <div class="chip-row">
                <button
                  v-for="item in priceOptions"
                  :key="item.value"
                  type="button"
                  class="chip-button"
                  :class="{ active: isActive(filters.price, item.value) }"
                  :aria-pressed="isActive(filters.price, item.value)"
                  @click="actions.togglePrice(item.value)"
                >
                  {{ item.label }}
                </button>
              </div>
            </div>

            <label class="sort-field">
              <span>Sort by</span>
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
              @click="emit('close')"
            >
              Show {{ resultCount }} {{ resultCount === 1 ? 'room' : 'rooms' }}
            </button>
          </div>
        </section>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.sheet-shell {
  position: fixed;
  inset: 0;
  z-index: 45;
  display: grid;
  align-items: end;
  background: rgba(7, 18, 26, 0.52);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  backdrop-filter: blur(18px) saturate(160%);
}

.sheet-panel {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  gap: 0.9rem;
  width: 100%;
  max-height: min(44rem, 92svh);
  padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
  border-radius: 1.5rem 1.5rem 0 0;
  background:
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.14), transparent 28%),
    radial-gradient(circle at 12% 100%, rgba(255, 211, 142, 0.18), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.14)),
    rgba(249, 252, 255, 0.68);
  box-shadow: 0 32px 68px rgba(0, 0, 0, 0.28);
}

.sheet-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.sheet-kicker {
  color: var(--brand-strong);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.sheet-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.72), rgba(239, 247, 250, 0.5)),
    rgba(255, 255, 255, 0.28);
  color: var(--text-strong);
  font-size: 1.45rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.58),
    0 10px 22px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: blur(12px) saturate(170%);
  backdrop-filter: blur(12px) saturate(170%);
}

.sheet-body {
  display: grid;
  gap: 1rem;
  overflow-y: auto;
}

.sheet-group,
.sort-field {
  display: grid;
  gap: 0.65rem;
  padding: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 1.1rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.34), rgba(255, 255, 255, 0.12)),
    rgba(255, 255, 255, 0.14);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.58),
    0 14px 28px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: blur(12px) saturate(165%);
  backdrop-filter: blur(12px) saturate(165%);
}

.sheet-group span,
.sort-field span {
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.chip-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.chip-button {
  min-height: 2.85rem;
  padding: 0.55rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 0.95rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.66), rgba(241, 248, 252, 0.42)),
    rgba(255, 255, 255, 0.28);
  color: var(--text-strong);
  font-weight: 700;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.6),
    0 10px 20px rgba(0, 0, 0, 0.06);
  -webkit-backdrop-filter: blur(10px) saturate(165%);
  backdrop-filter: blur(10px) saturate(165%);
}

.chip-button.active {
  border-color: rgba(255, 186, 124, 0.42);
  background:
    linear-gradient(180deg, rgba(255, 247, 238, 0.82), rgba(255, 225, 194, 0.52)),
    rgba(255, 122, 26, 0.12);
  color: var(--accent-deep);
}

.sort-field select {
  min-height: 3rem;
  padding: 0 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 0.95rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.66), rgba(241, 248, 252, 0.42)),
    rgba(255, 255, 255, 0.28);
  color: var(--text-strong);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.58),
    0 10px 20px rgba(0, 0, 0, 0.06);
  -webkit-backdrop-filter: blur(10px) saturate(165%);
  backdrop-filter: blur(10px) saturate(165%);
}

.sheet-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 0.18s ease;
}

.sheet-fade-enter-from,
.sheet-fade-leave-to {
  opacity: 0;
}

@media (min-width: 960px) {
  .sheet-shell {
    padding: 1.5rem;
    align-items: center;
    justify-items: center;
  }

  .sheet-panel {
    width: min(40rem, 100%);
    max-height: 90svh;
    border-radius: 1.5rem;
  }
}
</style>
