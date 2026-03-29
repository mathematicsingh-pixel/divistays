<script setup>
import { computed, ref } from 'vue'
import { siteConfig } from '@/features/site/config/site'
import { useOverlayDialog } from '@/shared/composables/useOverlayDialog'

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
          <div class="sheet-head">
            <div>
              <p class="label-upper sheet-kicker">Filters</p>
              <h3 id="catalog-filters-title">{{ siteConfig.uiText.actions.chooseFilters }}</h3>
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
            <div class="sheet-group surface-input">
              <span class="label-upper">Availability</span>
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

            <div class="sheet-group surface-input">
              <span class="label-upper">Occupancy</span>
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

            <div class="sheet-group surface-input">
              <span class="label-upper">Kitchen</span>
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

            <div class="sheet-group surface-input">
              <span class="label-upper">Washroom</span>
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

            <div class="sheet-group surface-input">
              <span class="label-upper">Budget</span>
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

            <label class="sort-field surface-input">
              <span class="label-upper">Sort by</span>
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
              {{ siteConfig.uiText.actions.clearFilters }}
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
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
}

.sheet-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
}

.sheet-kicker {
  color: var(--brand-strong);
}

.sheet-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: 999px;
  background: var(--surface-field-fill);
  color: var(--text-strong);
  font-size: 1.45rem;
  box-shadow: var(--shadow-sm);
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
  border-radius: 1.1rem;
}

.sheet-group span,
.sort-field span {
  color: var(--muted);
}

.chip-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.chip-button {
  min-height: 2.85rem;
  padding: 0.55rem 0.8rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: 0.95rem;
  background: var(--surface-field-fill);
  color: var(--text-strong);
  font-weight: 700;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.18s ease, background-color 0.18s ease, color 0.18s ease;
}

.chip-button.active {
  border-color: rgba(44, 161, 142, 0.26);
  background: rgba(121, 217, 202, 0.12);
  color: var(--brand-strong);
}

.sort-field select {
  min-height: 3rem;
  padding: 0 0.9rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: 0.95rem;
  background: var(--surface-field-fill);
  color: var(--text-strong);
  box-shadow: var(--shadow-sm);
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
    border-radius: var(--radius-lg);
  }
}
</style>
