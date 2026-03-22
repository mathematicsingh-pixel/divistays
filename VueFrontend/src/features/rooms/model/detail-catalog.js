import { roomSourceCatalog } from '../content/registry.js'
import { decorateRoomRecord } from './catalog.js'

export const roomDetailCatalog = roomSourceCatalog.map(decorateRoomRecord)
