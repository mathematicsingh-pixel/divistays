<script setup>
import { nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import manropeFontUrl from '@fontsource/manrope/files/manrope-latin-400-normal.woff2?url'
import syneFontUrl from '@fontsource/syne/files/syne-latin-700-normal.woff2?url'
import SiteHeader from '@/features/site/components/SiteHeader.vue'

const route = useRoute()
let hasMountedRoute = false

watch(
  () => route.path,
  async () => {
    if (typeof document === 'undefined') return

    if (!hasMountedRoute) {
      hasMountedRoute = true
      return
    }

    await nextTick()

    window.requestAnimationFrame(() => {
      const heading = document.querySelector('#main-content h1')

      if (heading instanceof HTMLElement) {
        heading.setAttribute('tabindex', '-1')
        heading.focus({ preventScroll: true })
      }
    })
  },
  { immediate: true },
)

useHead({
  link: [
    {
      rel: 'preload',
      href: manropeFontUrl,
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: syneFontUrl,
      as: 'font',
      type: 'font/woff2',
      crossorigin: 'anonymous',
    },
  ],
})
</script>

<template>
  <SiteHeader />
  <RouterView />
</template>
