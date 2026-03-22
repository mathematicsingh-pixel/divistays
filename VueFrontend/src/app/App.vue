<script setup>
import { useHead } from '@unhead/vue'
import manropeFontUrl from '@fontsource/manrope/files/manrope-latin-400-normal.woff2?url'
import syneFontUrl from '@fontsource/syne/files/syne-latin-700-normal.woff2?url'

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
  <RouterView />
</template>
