import { roomSourceCatalog } from '../content/registry.js'

const money = new Intl.NumberFormat('en-IN')
const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export const priceBands = [
  { value: 'under-4000', label: 'Under ₹4,000' },
  { value: '4000-8000', label: '₹4,000–₹8,000' },
  { value: '8000-plus', label: '₹8,000+' },
]

function formatPriceLabel(priceMonthly) {
  return `₹${money.format(priceMonthly)} / month`
}

function formatDateLabel(value) {
  return dateFormatter.format(new Date(`${value}T00:00:00`))
}

function formatRoomReferenceCode(id) {
  return String(id).padStart(2, '0')
}

export function getRoomPath(slug) {
  return `/rooms/${slug}`
}

function decorateRoom(definition) {
  const referenceCode = formatRoomReferenceCode(definition.id)

  return {
    ...definition,
    referenceCode,
    referenceLabel: `Room ID ${referenceCode}`,
    detailsHref: getRoomPath(definition.slug),
    priceLabel: formatPriceLabel(definition.priceMonthly),
    availabilityLabel: definition.available ? 'Available now' : 'Currently occupied',
    availabilityShortLabel: definition.available ? 'Available now' : 'Occupied',
    updatedLabel: formatDateLabel(definition.updatedAt),
    availabilityUpdatedLabel: formatDateLabel(definition.availabilityUpdatedAt),
    amenities: [...definition.included, ...definition.extraNotes],
  }
}

export const roomCatalog = roomSourceCatalog.map(decorateRoom)
export const availableRooms = roomCatalog.filter((room) => room.available)
export const roomCount = roomCatalog.length
export const roomTypeCount = roomCatalog.length
export const availableRoomCount = availableRooms.length
export const startingPrice = Math.min(...roomCatalog.map((room) => room.priceMonthly))
export const availableStartingPrice = Math.min(...availableRooms.map((room) => room.priceMonthly))
export const startingPriceLabel = formatPriceLabel(startingPrice)
export const availableStartingPriceLabel = formatPriceLabel(availableStartingPrice)

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

export function findRoomBySlug(slug) {
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
