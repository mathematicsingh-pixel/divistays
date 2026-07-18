import { accommodationCategoryRoutes } from '@/features/accommodation/routes'
import { roomRoutes, roomsRoute } from '@/features/rooms/routes'

const NotFoundPage = () => import('@/features/site/pages/NotFoundPage.vue')

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/features/home/pages/HomePage.vue'),
  },
  roomsRoute,
  ...accommodationCategoryRoutes,
  ...roomRoutes,
  {
    path: '/404',
    name: 'not-found',
    component: NotFoundPage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found-catch-all',
    component: NotFoundPage,
  },
]

export default routes
