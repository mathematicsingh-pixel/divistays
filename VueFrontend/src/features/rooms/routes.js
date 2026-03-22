import RoomPage from './pages/RoomPage.vue'
import RoomsPage from './pages/RoomsPage.vue'
import { roomCatalog } from './model/catalog'

export const roomsRoute = {
  path: '/rooms',
  name: 'rooms',
  component: RoomsPage,
}

export const roomRoutes = roomCatalog.map((room) => ({
  path: room.detailsHref,
  name: `room-${room.slug}`,
  component: RoomPage,
  props: {
    roomSlug: room.slug,
  },
}))
