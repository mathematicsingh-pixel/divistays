import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/syne/600.css'
import '@fontsource/syne/700.css'
import './style.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './router'

export const createApp = ViteSSG(App, { routes })
