import HomePage from '@/pages/HomePage.vue'
import RoomPage from '@/pages/RoomPage.vue'
import RoomsPage from '@/pages/RoomsPage.vue'
import { roomCatalog } from '@/data/rooms'

const roomRoutes = roomCatalog.map((room) => ({
  path: room.detailsHref,
  name: `room-${room.slug}`,
  component: RoomPage,
  props: {
    roomSlug: room.slug,
  },
}))

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: RoomsPage,
  },
  ...roomRoutes,
]

export default routes
