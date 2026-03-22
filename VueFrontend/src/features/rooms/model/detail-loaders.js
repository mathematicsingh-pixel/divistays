import { decorateRoomRecord } from './catalog.js'

const roomDetailLoaders = {
  'budget-single-attached': () => import('../content/budget-single-attached/index.js'),
  'compact-solo-garden': () => import('../content/compact-solo-garden/index.js'),
  'garden-view-studio': () => import('../content/garden-view-studio/index.js'),
  'one-rk-studio': () => import('../content/one-rk-studio/index.js'),
  'sample-study-single': () => import('../content/sample-study-single/index.js'),
  'vibrant-studio': () => import('../content/vibrant-studio/index.js'),
}

const roomDetailCache = new Map()

export function hasRoomDetailLoader(slug) {
  return Boolean(roomDetailLoaders[slug])
}

export function loadRoomDetail(slug) {
  if (!hasRoomDetailLoader(slug)) {
    return Promise.resolve(null)
  }

  if (!roomDetailCache.has(slug)) {
    roomDetailCache.set(
      slug,
      roomDetailLoaders[slug]().then((module) => decorateRoomRecord(module.default)),
    )
  }

  return roomDetailCache.get(slug)
}
