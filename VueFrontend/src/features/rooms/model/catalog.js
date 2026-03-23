import { roomSummarySourceCatalog } from '../content/summary-registry.js'
import { decorateRoomRecord, formatPriceLabel } from './room-record.js'
const occupancyOrder = ['single', 'double', 'flex']
const kitchenOrder = ['private', 'common']
const washroomOrder = ['attached', 'common']

export const priceBands = [
  { value: 'under-4000', label: 'Under ₹4,000' },
  { value: '4000-8000', label: '₹4,000–₹8,000' },
  { value: '8000-plus', label: '₹8,000+' },
]

function getMinimumPrice(rooms) {
  if (!rooms.length) {
    return null
  }

  return Math.min(...rooms.map((room) => room.priceMonthly))
}

function buildOptionCatalog(rooms, valueKey, labelKey, preferredOrder = []) {
  const optionsByValue = new Map()

  rooms.forEach((room) => {
    const value = room[valueKey]
    const label = room[labelKey]

    if (!value || !label || optionsByValue.has(value)) {
      return
    }

    optionsByValue.set(value, { value, label })
  })

  return [...optionsByValue.values()].sort((left, right) => {
    const leftIndex = preferredOrder.indexOf(left.value)
    const rightIndex = preferredOrder.indexOf(right.value)

    if (leftIndex === -1 && rightIndex === -1) {
      return left.label.localeCompare(right.label)
    }

    if (leftIndex === -1) {
      return 1
    }

    if (rightIndex === -1) {
      return -1
    }

    return leftIndex - rightIndex
  })
}

export const roomCatalog = roomSummarySourceCatalog.map(decorateRoomRecord)
export const availableRooms = roomCatalog.filter((room) => room.available)
export const roomCount = roomCatalog.length
export const availableRoomCount = availableRooms.length
export const startingPrice = getMinimumPrice(roomCatalog)
export const availableStartingPrice = getMinimumPrice(availableRooms)
export const startingPriceLabel = startingPrice === null ? null : formatPriceLabel(startingPrice)
export const availableStartingPriceLabel = availableStartingPrice === null ? null : formatPriceLabel(availableStartingPrice)
export const occupancyOptions = buildOptionCatalog(roomCatalog, 'occupancy', 'occupancyLabel', occupancyOrder)
export const kitchenOptions = buildOptionCatalog(roomCatalog, 'kitchenType', 'kitchenLabel', kitchenOrder)
export const washroomOptions = buildOptionCatalog(roomCatalog, 'washroomType', 'washroomLabel', washroomOrder)

export function roomMatchesPriceBand(room, band) {
  if (band === 'under-4000') {
    return room.priceMonthly < 4000
  }

  if (band === '4000-8000') {
    return room.priceMonthly >= 4000 && room.priceMonthly <= 8000
  }

  if (band === '8000-plus') {
    return room.priceMonthly > 8000
  }

  return true
}

export function findRoomSummaryBySlug(slug) {
  return roomCatalog.find((room) => room.slug === slug) || null
}

export function getSimilarRooms(room, limit = 3) {
  if (!room) {
    return []
  }

  return roomCatalog
    .filter((candidate) => candidate.slug !== room.slug)
    .sort((left, right) => {
      const leftScore
        = Number(left.available) * 8
          + Number(left.occupancy === room.occupancy) * 4
          + Number(left.kitchenType === room.kitchenType) * 3
          + Number(left.washroomType === room.washroomType) * 2
          - Math.abs(left.priceMonthly - room.priceMonthly) / 1000
      const rightScore
        = Number(right.available) * 8
          + Number(right.occupancy === room.occupancy) * 4
          + Number(right.kitchenType === room.kitchenType) * 3
          + Number(right.washroomType === room.washroomType) * 2
          - Math.abs(right.priceMonthly - room.priceMonthly) / 1000

      return rightScore - leftScore
    })
    .slice(0, limit)
}
