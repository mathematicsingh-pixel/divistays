<script setup>
import { computed } from 'vue'
import {
  getAccommodationCategoryRooms,
  getAccommodationCategoryStats,
} from '@/features/accommodation/model/category-catalog'
import { formatDateLabel } from '@/features/rooms/model/room-record'

const props = defineProps({
  rooms: {
    type: Array,
    required: true,
  },
})

function formatRentRange(stats) {
  if (stats.startingPrice === null) {
    return 'Ask for current rent'
  }

  if (stats.startingPrice === stats.highestPrice) {
    return stats.startingPriceLabel
  }

  const low = stats.startingPriceLabel.replace('/month', '')
  const high = stats.highestPriceLabel.replace('/month', '')

  return `${low}–${high}/month`
}

function buildRow(config, rooms) {
  const stats = getAccommodationCategoryStats(rooms)

  return {
    ...config,
    availableLabel: `${stats.availableCount} of ${stats.totalCount}`,
    rentLabel: formatRentRange(stats),
    updatedLabel: stats.latestUpdatedAt ? formatDateLabel(stats.latestUpdatedAt) : 'Confirm by phone',
  }
}

const comparisonRows = computed(() => [
  buildRow(
    {
      title: 'All furnished rooms',
      path: { path: '/rooms', hash: '#rooms' },
      linkLabel: 'Browse all rooms',
      occupancy: 'Single to triple',
      kitchen: 'Private or shared',
      washroom: 'Attached or shared',
    },
    props.rooms,
  ),
  buildRow(
    {
      title: 'PG / hostel-style rooms',
      path: '/pg-hostel-in-kakadeo-kanpur',
      linkLabel: 'Open PG and hostel-style options',
      occupancy: 'Single or shared',
      kitchen: 'Shared',
      washroom: 'Attached or shared',
    },
    getAccommodationCategoryRooms(props.rooms, 'pg-hostel'),
  ),
  buildRow(
    {
      title: 'Studios / 1 RK rooms',
      path: '/studio-apartments-in-kakadeo-kanpur',
      linkLabel: 'Open studios and 1 RK options',
      occupancy: 'One to three',
      kitchen: 'Private',
      washroom: 'Attached',
    },
    getAccommodationCategoryRooms(props.rooms, 'studio-1rk'),
  ),
])
</script>

<template>
  <section
    id="room-type-comparison"
    class="section-shell room-type-shell"
    aria-labelledby="room-type-title"
  >
    <div class="container room-type-layout">
      <div class="section-heading room-type-heading">
        <span class="label-upper">Live Kakadeo inventory</span>
        <h2 id="room-type-title">Compare room setups</h2>
        <p>
          Search labels overlap. This comparison is generated from the rooms currently listed,
          so the count, rent, facilities, and verified date stay tied to real inventory.
        </p>
      </div>

      <ol class="room-type-list">
        <li
          v-for="(row, index) in comparisonRows"
          :key="row.title"
        >
          <header>
            <span aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3>{{ row.title }}</h3>
              <RouterLink :to="row.path">
                {{ row.linkLabel }}
                <span aria-hidden="true">→</span>
              </RouterLink>
            </div>
          </header>

          <dl>
            <div>
              <dt>Available</dt>
              <dd>{{ row.availableLabel }}</dd>
            </div>
            <div>
              <dt>Monthly rent</dt>
              <dd>{{ row.rentLabel }}</dd>
            </div>
            <div>
              <dt>Occupancy</dt>
              <dd>{{ row.occupancy }}</dd>
            </div>
            <div>
              <dt>Kitchen</dt>
              <dd>{{ row.kitchen }}</dd>
            </div>
            <div>
              <dt>Washroom</dt>
              <dd>{{ row.washroom }}</dd>
            </div>
            <div>
              <dt>Availability checked</dt>
              <dd>{{ row.updatedLabel }}</dd>
            </div>
          </dl>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.room-type-shell {
  padding-block: var(--section-space);
  border-top: 1px solid var(--line);
  background: var(--paper);
}

.room-type-layout {
  display: grid;
  gap: var(--space-xl);
}

.room-type-heading {
  align-content: start;
  margin: 0;
}

.room-type-heading h2 {
  max-width: 11ch;
}

.room-type-list {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line-strong);
  list-style: none;
}

.room-type-list > li {
  display: grid;
  gap: var(--space-lg);
  padding-block: var(--space-xl);
  border-bottom: 1px solid var(--line);
}

.room-type-list header {
  display: grid;
  grid-template-columns: 2.25rem minmax(0, 1fr);
  gap: var(--space-sm);
}

.room-type-list header > span {
  color: var(--muted);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
}

.room-type-list header > div {
  display: grid;
  gap: var(--space-sm);
}

.room-type-list header a {
  display: inline-flex;
  width: fit-content;
  min-height: 2.75rem;
  align-items: center;
  gap: var(--space-sm);
  color: var(--accent-deep);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: var(--space-xs);
}

.room-type-list header a span {
  transition: transform 160ms ease;
}

.room-type-list dl {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;
  border-top: 1px solid var(--line);
}

.room-type-list dl > div {
  display: grid;
  align-content: start;
  gap: var(--space-xs);
  min-width: 0;
  padding: var(--space-md) var(--space-sm) var(--space-md) 0;
  border-bottom: 1px solid var(--line);
}

.room-type-list dt {
  color: var(--muted);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.room-type-list dd {
  margin: 0;
  color: var(--text-strong);
  font-size: 0.875rem;
  font-weight: 700;
}

@media (hover: hover) {
  .room-type-list header a:hover {
    text-decoration-color: currentColor;
  }

  .room-type-list header a:hover span {
    transform: translateX(var(--space-xs));
  }
}

@media (min-width: 700px) {
  .room-type-list dl {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .room-type-layout {
    grid-template-columns: minmax(16rem, 0.62fr) minmax(0, 1.38fr);
    align-items: start;
    gap: var(--space-2xl);
  }

  .room-type-heading {
    position: sticky;
    top: 6rem;
  }
}
</style>
