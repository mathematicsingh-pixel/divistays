import HomePage from '@/features/home/pages/HomePage.vue'
import { roomRoutes, roomsRoute } from '@/features/rooms/routes'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  roomsRoute,
  ...roomRoutes,
]

export default routes
