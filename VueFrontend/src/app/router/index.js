import { roomRoutes, roomsRoute } from '@/features/rooms/routes'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/features/home/pages/HomePage.vue'),
  },
  roomsRoute,
  ...roomRoutes,
]

export default routes
