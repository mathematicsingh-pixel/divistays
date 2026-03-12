import '@fontsource/fraunces/600.css'
import '@fontsource/fraunces/700.css'
import '@fontsource/instrument-sans/400.css'
import '@fontsource/instrument-sans/500.css'
import '@fontsource/instrument-sans/600.css'
import '@fontsource/instrument-sans/700.css'
import './style.css'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from './router'

export const createApp = ViteSSG(App, { routes })
