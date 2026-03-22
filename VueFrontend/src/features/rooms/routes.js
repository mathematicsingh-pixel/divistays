import { roomCatalog } from './model/catalog'

export const roomsRoute = {
  path: '/rooms',
  name: 'rooms',
  component: () => import('./pages/RoomsPage.vue'),
}

export const roomRoutes = roomCatalog.map((room) => ({
  path: room.detailsHref,
  name: `room-${room.slug}`,
  component: () => import('./pages/RoomPage.vue'),
  props: {
    roomSlug: room.slug,
  },
}))
