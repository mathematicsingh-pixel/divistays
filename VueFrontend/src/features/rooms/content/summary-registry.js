import { roomSourceCatalog } from './registry.js'
import { toRoomSummaryRecord } from '../model/room-record.js'

export const roomSummarySourceCatalog = roomSourceCatalog.map(toRoomSummaryRecord)
