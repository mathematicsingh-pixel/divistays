import { accommodationCategoryPageList } from './content/category-pages'

export const accommodationCategoryRoutes = accommodationCategoryPageList.map((page) => ({
  path: page.path,
  name: `accommodation-${page.key}`,
  component: () => import('./pages/AccommodationCategoryPage.vue'),
  props: {
    categoryKey: page.key,
  },
}))
