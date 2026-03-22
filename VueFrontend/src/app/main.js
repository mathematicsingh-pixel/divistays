import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-500.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-700.css'
import '@fontsource/syne/latin-600.css'
import '@fontsource/syne/latin-700.css'
import './style.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './router'

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  }

  if (to.hash) {
    return { el: to.hash }
  }

  if (to.fullPath !== from.fullPath) {
    return { left: 0, top: 0 }
  }

  return undefined
}

export const createApp = ViteSSG(App, { routes, scrollBehavior })
