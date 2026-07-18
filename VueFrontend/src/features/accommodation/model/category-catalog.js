import { formatPriceLabel } from '../../rooms/model/room-record.js'

const categoryMatchers = {
  'pg-hostel': (room) => room.kitchenType === 'common',
  'studio-1rk': (room) => room.kitchenType === 'private' && room.washroomType === 'attached',
}

export function getAccommodationCategoryRooms(rooms, categoryKey) {
  const matches = categoryMatchers[categoryKey]

  return matches ? rooms.filter(matches) : []
}

export function getAccommodationCategoryStats(rooms) {
  const availableRooms = rooms.filter((room) => room.available)
  const pricedRooms = availableRooms.length ? availableRooms : rooms
  const startingPrice = pricedRooms.length
    ? Math.min(...pricedRooms.map((room) => room.priceMonthly))
    : null
  const highestPrice = pricedRooms.length
    ? Math.max(...pricedRooms.map((room) => room.priceMonthly))
    : null
  const freshnessDates = rooms
    .flatMap((room) => [room.updatedAt, room.availabilityUpdatedAt])
    .filter(Boolean)
    .sort()

  return {
    availableCount: availableRooms.length,
    totalCount: rooms.length,
    startingPrice,
    startingPriceLabel: startingPrice === null ? 'Ask for current rent' : formatPriceLabel(startingPrice),
    highestPrice,
    highestPriceLabel: highestPrice === null ? 'Ask for current rent' : formatPriceLabel(highestPrice),
    latestUpdatedAt: freshnessDates.at(-1) || null,
  }
}

export function getRoomCategoryPage(room) {
  if (categoryMatchers['studio-1rk'](room)) {
    return {
      path: '/studio-apartments-in-kakadeo-kanpur',
      label: 'Compare studios and 1 RK rooms in Kakadeo',
    }
  }

  if (categoryMatchers['pg-hostel'](room)) {
    return {
      path: '/pg-hostel-in-kakadeo-kanpur',
      label: 'Compare PG and hostel-style rooms in Kakadeo',
    }
  }

  return null
}
