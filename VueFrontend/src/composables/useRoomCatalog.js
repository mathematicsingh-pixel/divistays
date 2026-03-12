import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { roomCatalog } from '@/data/rooms'

const defaultState = {
  availability: 'available',
  sort: 'recommended',
}

const allowedAvailability = new Set(['available', 'all'])
const allowedSort = new Set(['recommended', 'price-asc', 'price-desc'])
const allowedOccupancy = new Set(['single', 'double', 'flex'])
const allowedKitchen = new Set(['private', 'common'])
const allowedWashroom = new Set(['private', 'common'])

function parseMulti(value, allowedValues) {
  if (typeof value !== 'string' || !value.length) {
    return []
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter((item, index, list) => item && list.indexOf(item) === index && allowedValues.has(item))
}

function sortRooms(list, sort) {
  const rooms = [...list]

  if (sort === 'price-asc') {
    return rooms.sort((left, right) => left.priceMonthly - right.priceMonthly || Number(right.available) - Number(left.available))
  }

  if (sort === 'price-desc') {
    return rooms.sort((left, right) => right.priceMonthly - left.priceMonthly || Number(right.available) - Number(left.available))
  }

  return rooms.sort((left, right) => {
    if (left.available !== right.available) {
      return Number(right.available) - Number(left.available)
    }

    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured)
    }

    return left.priceMonthly - right.priceMonthly
  })
}

export function useRoomCatalog() {
  const route = useRoute()
  const router = useRouter()

  const filters = computed(() => ({
    availability: allowedAvailability.has(route.query.availability) ? route.query.availability : defaultState.availability,
    occupancy: parseMulti(route.query.occupancy, allowedOccupancy),
    kitchen: parseMulti(route.query.kitchen, allowedKitchen),
    washroom: parseMulti(route.query.washroom, allowedWashroom),
    sort: allowedSort.has(route.query.sort) ? route.query.sort : defaultState.sort,
    room: typeof route.query.room === 'string' ? route.query.room : '',
  }))

  const visibleRooms = computed(() => {
    const current = filters.value

    const filtered = roomCatalog.filter((room) => {
      if (current.availability === 'available' && !room.available) {
        return false
      }

      if (current.occupancy.length && !current.occupancy.includes(room.occupancy)) {
        return false
      }

      if (current.kitchen.length && !current.kitchen.includes(room.kitchenType)) {
        return false
      }

      if (current.washroom.length && !current.washroom.includes(room.washroomType)) {
        return false
      }

      return true
    })

    return sortRooms(filtered, current.sort)
  })

  const selectedRoom = computed(() => visibleRooms.value.find((room) => room.slug === filters.value.room) || null)
  const activeFilterCount = computed(
    () =>
      filters.value.occupancy.length
      + filters.value.kitchen.length
      + filters.value.washroom.length
      + Number(filters.value.availability !== defaultState.availability)
      + Number(filters.value.sort !== defaultState.sort),
  )
  const hasActiveFilters = computed(() => activeFilterCount.value > 0)

  watch(
    () => [filters.value.room, selectedRoom.value?.slug],
    ([requestedRoom, activeRoom]) => {
      if (requestedRoom && !activeRoom) {
        commit({ room: null }, 'replace')
      }
    },
    { immediate: true },
  )

  function commit(patch, mode = 'push') {
    const next = { ...route.query }

    Object.entries(patch).forEach(([key, value]) => {
      if (
        value == null
        || value === ''
        || (Array.isArray(value) && value.length === 0)
        || (key === 'availability' && value === defaultState.availability)
        || (key === 'sort' && value === defaultState.sort)
      ) {
        delete next[key]
        return
      }

      next[key] = Array.isArray(value) ? value.join(',') : value
    })

    router[mode]({ query: next })
  }

  function toggleValue(group, value) {
    const next = new Set(filters.value[group])

    if (next.has(value)) {
      next.delete(value)
    }
    else {
      next.add(value)
    }

    commit({ [group]: [...next] })
  }

  return {
    filters,
    visibleRooms,
    selectedRoom,
    activeFilterCount,
    hasActiveFilters,
    setAvailability: (value) => commit({ availability: value }),
    setSort: (value) => commit({ sort: value }),
    toggleOccupancy: (value) => toggleValue('occupancy', value),
    toggleKitchen: (value) => toggleValue('kitchen', value),
    toggleWashroom: (value) => toggleValue('washroom', value),
    resetFilters: () =>
      commit({
        availability: defaultState.availability,
        sort: defaultState.sort,
        occupancy: [],
        kitchen: [],
        washroom: [],
      }),
    openRoom: (slug) => commit({ room: slug }),
    closeRoom: () => commit({ room: null }),
  }
}
