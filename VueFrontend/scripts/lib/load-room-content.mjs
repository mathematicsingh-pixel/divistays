import { readdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { sortRoomRecords, toRoomSummaryRecord } from '../../src/features/rooms/model/room-record.js'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, '..', '..')
const roomContentDir = resolve(rootDir, 'src/features/rooms/content')

let roomSourceCatalogPromise

async function loadRoomModule(filePath) {
  const module = await import(pathToFileURL(filePath).href)

  return module.default
}

function sortRoomEntries(left, right) {
  return sortRoomRecords(left.room, right.room) || left.slug.localeCompare(right.slug)
}

export async function loadRoomSourceCatalog() {
  if (!roomSourceCatalogPromise) {
    roomSourceCatalogPromise = readdir(roomContentDir, { withFileTypes: true })
      .then((entries) =>
        entries
          .filter((entry) => entry.isDirectory())
          .map((entry) => ({
            slug: entry.name,
            filePath: resolve(roomContentDir, entry.name, 'index.js'),
          })),
      )
      .then((entries) =>
        Promise.all(entries.map(async (entry) => ({
          ...entry,
          room: await loadRoomModule(entry.filePath),
        }))),
      )
      .then((entries) => entries.sort(sortRoomEntries).map((entry) => entry.room))
  }

  return roomSourceCatalogPromise
}

export async function loadRoomSummaryCatalog() {
  const rooms = await loadRoomSourceCatalog()

  return rooms.map(toRoomSummaryRecord)
}
