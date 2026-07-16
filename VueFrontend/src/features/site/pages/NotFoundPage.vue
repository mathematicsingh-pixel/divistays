<script setup>
import { useHead, useSeoMeta } from '@unhead/vue'
import { siteConfig } from '@/features/site/config/site'

const title = `Page not found | ${siteConfig.name}`
const description = 'That DiviStays page could not be found. Browse the current rooms or return to the home page.'

useSeoMeta({
  title,
  description,
  robots: 'noindex, follow',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title,
  meta: [
    { name: 'theme-color', content: siteConfig.themeColor },
  ],
})
</script>

<template>
  <main
    id="main-content"
    class="not-found-page"
    tabindex="-1"
  >
    <section
      class="section-shell not-found-section"
      aria-labelledby="not-found-title"
    >
      <div class="container">
        <div class="not-found-panel surface-card page-rise">
          <span class="label-upper">Error 404</span>
          <h1 id="not-found-title">This page isn’t here.</h1>
          <p>
            The page may have moved or the address may be incomplete. You can still see every current room.
          </p>
          <div class="not-found-actions">
            <RouterLink
              class="button-primary"
              to="/rooms"
            >
              Browse rooms
            </RouterLink>
            <RouterLink
              class="button-secondary"
              to="/"
            >
              Back home
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.not-found-page {
  display: grid;
  place-items: center;
}

.not-found-section {
  width: 100%;
  padding-block: var(--section-space);
}

.not-found-panel {
  display: grid;
  max-width: 44rem;
  gap: var(--space-lg);
  padding: var(--space-xl);
}

.not-found-panel h1 {
  max-width: 11ch;
}

.not-found-panel p {
  max-width: 52ch;
  font-size: 1.0625rem;
}

.not-found-actions {
  display: grid;
  gap: var(--space-sm);
}

@media (min-width: 520px) {
  .not-found-actions {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
