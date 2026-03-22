<script setup>
import { computed } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import RoomCard from '@/features/rooms/components/RoomCard.vue'
import RoomShowcase from '@/features/rooms/components/showcase/RoomShowcase.vue'
import { availableRooms, buildImagePath, findRoomBySlug, getSimilarRooms } from '@/features/rooms'
import { buildRoomStructuredData } from '@/features/rooms/seo'
import BreadcrumbNav from '@/features/site/components/BreadcrumbNav.vue'
import MobileEnquiryBar from '@/features/site/components/MobileEnquiryBar.vue'
import MobileSectionNav from '@/features/site/components/MobileSectionNav.vue'
import SiteFooter from '@/features/site/components/SiteFooter.vue'
import { mobileSectionNavItems } from '@/features/site/config/navigation'
import {
  buildRoomEnquiry,
  getCallHref,
  getRoomPageDescription,
  getRoomPageTitle,
  getWhatsAppHref,
  resolveSiteUrl,
  siteConfig,
} from '@/features/site/config/site'

const props = defineProps({
  roomSlug: {
    type: String,
    required: true,
  },
})

const room = computed(() => findRoomBySlug(props.roomSlug))
const similarRooms = computed(() => getSimilarRooms(room.value))
const callHref = getCallHref()
const whatsappHref = computed(() => getWhatsAppHref(buildRoomEnquiry(room.value)))
const siteUrl = resolveSiteUrl(import.meta.env.VITE_SITE_URL)
const title = computed(() => getRoomPageTitle(room.value))
const description = computed(() => getRoomPageDescription(room.value))
const ogImage = computed(() => `${siteUrl}${buildImagePath(room.value.slug, room.value.gallery[0].key, 1440, 'jpg')}`)

const structuredData = computed(() =>
  buildRoomStructuredData({
    site: siteConfig,
    siteUrl,
    room: room.value,
  }),
)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage,
  ogType: 'article',
  ogLocale: 'en_IN',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: ogImage,
})

useHead(() => ({
  htmlAttrs: {
    lang: 'en',
  },
  title: title.value,
  link: [
    { rel: 'canonical', href: `${siteUrl}${room.value.detailsHref}` },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: siteConfig.themeColor },
  ],
  script: structuredData.value.map((item, index) => ({
    key: `ld-json-room-${index}`,
    type: 'application/ld+json',
    textContent: JSON.stringify(item),
  })),
}))
</script>

<template>
  <main v-if="room">
    <MobileSectionNav :items="mobileSectionNavItems" />

    <section class="section-shell">
      <div class="container room-shell page-rise">
        <BreadcrumbNav
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Rooms', to: '/rooms' },
            { label: room.title },
          ]"
        />

        <div class="room-surface glass-panel">
          <RoomShowcase :room="room" />
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="section-heading">
          <span class="eyebrow">Similar rooms</span>
          <h2>More rooms like this</h2>
          <p>Similar setups first, with available rooms pushed to the top.</p>
        </div>

        <div class="similar-grid">
          <RoomCard
            v-for="item in similarRooms"
            :key="item.slug"
            :room="item"
          />
        </div>
      </div>
    </section>

    <SiteFooter
      :site="siteConfig"
      :call-href="callHref"
      :whatsapp-href="whatsappHref"
      :rooms="availableRooms"
    />

    <MobileEnquiryBar
      :primary-href="whatsappHref"
      primary-label="Ask about this room"
      primary-blank
      :secondary-href="callHref"
      secondary-label="Call"
    />
  </main>
</template>

<style scoped>
.room-shell {
  display: grid;
  gap: 0.9rem;
}

.room-surface {
  padding: 1rem;
}

.similar-grid {
  display: grid;
  gap: 0.9rem;
}

@media (min-width: 760px) {
  .similar-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .room-surface {
    padding: 1.2rem;
  }
}
</style>
