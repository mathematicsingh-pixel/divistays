import { access, constants } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { toRoomSummaryRecord } from '../src/features/rooms/model/room-record.js'
import { loadRoomSourceCatalog } from './lib/load-room-content.mjs'

const requiredRoomFields = [
  'id',
  'slug',
  'title',
  'summary',
  'fitSummary',
  'priceMonthly',
  'available',
  'featured',
  'updatedAt',
  'availabilityUpdatedAt',
  'occupancy',
  'occupancyLabel',
  'kitchenType',
  'kitchenLabel',
  'washroomType',
  'washroomLabel',
  'highlightLabel',
  'facingLabel',
  'bestFor',
  'included',
  'extraNotes',
  'visitNextStep',
  'gallery',
]

const requiredGalleryFields = ['key', 'source', 'alt', 'caption']
const requiredVideoFields = ['key', 'source', 'label']
const requiredSummaryFields = [
  'id',
  'slug',
  'title',
  'summary',
  'fitSummary',
  'priceMonthly',
  'available',
  'updatedAt',
  'availabilityUpdatedAt',
  'occupancy',
  'occupancyLabel',
  'kitchenType',
  'kitchenLabel',
  'washroomType',
  'washroomLabel',
  'highlightLabel',
  'bestFor',
  'included',
  'extraNotes',
  'galleryCount',
  'gallery',
]

const errors = []
const idCounts = new Map()
const slugCounts = new Map()
const scriptDir = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(scriptDir, '..')

function note(message) {
  errors.push(message)
}

function count(map, value) {
  map.set(value, (map.get(value) || 0) + 1)
}

function hasValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0
  }

  return value !== undefined && value !== null && value !== ''
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  }
  catch {
    return false
  }
}

const roomSourceCatalog = await loadRoomSourceCatalog()

if (!roomSourceCatalog.length) {
  note('room catalog is empty')
}

for (const [roomIndex, room] of roomSourceCatalog.entries()) {
  const roomLabel = `room[${roomIndex}] ${room.slug || '<missing-slug>'}`
  const summary = toRoomSummaryRecord(room)

  count(idCounts, room.id)
  count(slugCounts, room.slug)

  requiredRoomFields.forEach((field) => {
    if (!hasValue(room[field])) {
      note(`${roomLabel}: missing ${field}`)
    }
  })

  if (!Array.isArray(room.gallery) || !room.gallery.length) {
    note(`${roomLabel}: gallery must contain at least one item`)
  }
  else {
    const galleryKeyCounts = new Map()

    for (const [mediaIndex, media] of room.gallery.entries()) {
      const mediaLabel = `${roomLabel} gallery[${mediaIndex}]`

      requiredGalleryFields.forEach((field) => {
        if (!hasValue(media[field])) {
          note(`${mediaLabel}: missing ${field}`)
        }
      })

      count(galleryKeyCounts, media.key)

      if (hasValue(media.source) && !(await fileExists(resolve(rootDir, media.source)))) {
        note(`${mediaLabel}: missing local source file "${media.source}"`)
      }
    }

    for (const [key, total] of galleryKeyCounts.entries()) {
      if (total > 1) {
        note(`${roomLabel}: duplicate gallery key "${key}"`)
      }
    }
  }

  if (room.video) {
    requiredVideoFields.forEach((field) => {
      if (!hasValue(room.video[field])) {
        note(`${roomLabel}: video missing ${field}`)
      }
    })

    if (hasValue(room.video.source) && !(await fileExists(resolve(rootDir, room.video.source)))) {
      note(`${roomLabel}: missing local video source "${room.video.source}"`)
    }
  }

  requiredSummaryFields.forEach((field) => {
    if (!hasValue(summary[field])) {
      note(`${roomLabel}: derived summary missing ${field}`)
    }
  })

  if (summary.galleryCount !== room.gallery.length) {
    note(`${roomLabel}: derived summary galleryCount does not match gallery length`)
  }

  if (summary.gallery.length !== 1) {
    note(`${roomLabel}: derived summary must expose exactly one cover image`)
  }

  if (summary.gallery[0]?.key !== room.gallery[0]?.key) {
    note(`${roomLabel}: derived summary cover image key does not match gallery`)
  }

  if (summary.gallery[0]?.alt !== room.gallery[0]?.alt) {
    note(`${roomLabel}: derived summary cover image alt does not match gallery`)
  }
}

for (const [id, total] of idCounts.entries()) {
  if (total > 1) {
    note(`duplicate room id "${id}"`)
  }
}

for (const [slug, total] of slugCounts.entries()) {
  if (total > 1) {
    note(`duplicate room slug "${slug}"`)
  }
}

if (errors.length) {
  console.error('room catalog validation failed:')
  errors.forEach((error) => {
    console.error(`- ${error}`)
  })
  process.exitCode = 1
}
else {
  console.log(`room catalog valid (${roomSourceCatalog.length} rooms)`)
}
