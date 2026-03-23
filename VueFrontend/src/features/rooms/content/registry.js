import { sortRoomRecords } from '../model/room-record.js'

function extractRoomSlug(path) {
  return path.replace('./', '').replace('/index.js', '')
}

const eagerRoomModules = import.meta.glob('./*/index.js', { eager: true, import: 'default' })
const lazyRoomModules = import.meta.glob('./*/index.js', { import: 'default' })

const sortedRoomEntries = Object.entries(eagerRoomModules)
  .map(([path, room]) => ({ path, room }))
  .sort((left, right) =>
    sortRoomRecords(left.room, right.room)
    || extractRoomSlug(left.path).localeCompare(extractRoomSlug(right.path)),
  )

export const roomSourceCatalog = sortedRoomEntries.map((entry) => entry.room)

export const roomSourceLoaders = Object.fromEntries(
  Object.entries(lazyRoomModules).map(([path, load]) => [extractRoomSlug(path), load]),
)
