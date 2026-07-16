import { roomCatalog } from './model/catalog'

export const roomsRoute = {
  path: '/rooms',
  name: 'rooms',
  component: () => import('./pages/RoomsPage.vue'),
}

const legacyRoomPaths = {
  '/rooms/compact-solo-garden': '/rooms/compact-garden-room',
  '/rooms/courtyard-solo-room': '/rooms/courtyard-room',
  '/rooms/sample-study-single': '/rooms/spacious-study-room',
  '/rooms/shared-loft-studio': '/rooms/garden-room-kitchenette',
  '/rooms/sunlit-study-single': '/rooms/bright-room-attached-washroom',
  '/rooms/vibrant-studio': '/rooms/studio-private-kitchen',
}

const legacyRoomRoutes = Object.entries(legacyRoomPaths).map(([path, redirect]) => ({
  path,
  redirect,
}))

export const roomRoutes = [
  ...legacyRoomRoutes,
  ...roomCatalog.map((room) => ({
    path: room.detailsHref,
    name: `room-${room.slug}`,
    component: () => import('./pages/RoomPage.vue'),
    props: {
      roomSlug: room.slug,
    },
  })),
]
