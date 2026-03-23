import { roomSourceCatalog } from '../content/registry.js'
import { decorateRoomRecord } from './room-record.js'

export const roomDetailCatalog = roomSourceCatalog.map(decorateRoomRecord)
