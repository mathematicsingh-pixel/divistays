import { roomSourceLoaders } from '../content/registry.js'
import { decorateRoomRecord } from './room-record.js'

const roomDetailCache = new Map()

export function hasRoomDetailLoader(slug) {
  return Boolean(roomSourceLoaders[slug])
}

export function loadRoomDetail(slug) {
  if (!hasRoomDetailLoader(slug)) {
    return Promise.resolve(null)
  }

  if (!roomDetailCache.has(slug)) {
    roomDetailCache.set(
      slug,
      roomSourceLoaders[slug]().then((room) => decorateRoomRecord(room)),
    )
  }

  return roomDetailCache.get(slug)
}
