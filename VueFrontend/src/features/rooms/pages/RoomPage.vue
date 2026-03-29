<script setup>
import { computed, toRef } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import RoomCard from '@/features/rooms/components/RoomCard.vue'
import RoomShowcase from '@/features/rooms/components/showcase/RoomShowcase.vue'
import { availableRooms, buildImagePath, getSimilarRooms } from '@/features/rooms'
import { useRoomDetail } from '@/features/rooms/composables/useRoomDetail'
import { buildRoomStructuredData } from '@/features/rooms/seo'
import BreadcrumbNav from '@/features/site/components/BreadcrumbNav.vue'
import MobileEnquiryBar from '@/features/site/components/MobileEnquiryBar.vue'
import MobileSectionNav from '@/features/site/components/MobileSectionNav.vue'
import SiteFooter from '@/features/site/components/SiteFooter.vue'
import { mobileSectionNavItems } from '@/features/site/config/navigation'
import {
  buildRoomEnquiry,
  getCallHref,
  getPageOgImage,
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

const { roomSummary, roomDetail } = useRoomDetail(toRef(props, 'roomSlug'))
const similarRooms = computed(() => getSimilarRooms(roomSummary.value))
const callHref = getCallHref()
const whatsappHref = computed(() => getWhatsAppHref(buildRoomEnquiry(roomSummary.value)))
const siteUrl = resolveSiteUrl(import.meta.env.VITE_SITE_URL)
const title = computed(() => roomSummary.value ? getRoomPageTitle(roomSummary.value) : siteConfig.roomsTitle)
const description = computed(() => roomSummary.value ? getRoomPageDescription(roomSummary.value) : siteConfig.roomsDescription)
const ogImage = computed(() =>
  roomSummary.value
    ? `${siteUrl}${buildImagePath(roomSummary.value.slug, roomSummary.value.gallery[0].key, 1440, 'jpg')}`
    : getPageOgImage(siteUrl),
)

const structuredData = computed(() =>
  roomDetail.value
    ? buildRoomStructuredData({
        site: siteConfig,
        siteUrl,
        room: roomDetail.value,
      })
    : [],
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
    { rel: 'canonical', href: roomSummary.value ? `${siteUrl}${roomSummary.value.detailsHref}` : `${siteUrl}/rooms` },
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
  <main v-if="roomSummary && roomDetail">
    <MobileSectionNav :items="mobileSectionNavItems" />

    <section class="section-shell">
      <div class="container room-shell page-rise">
        <BreadcrumbNav
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Rooms', to: '/rooms' },
            { label: roomSummary.title },
          ]"
        />

        <div class="room-surface surface-card">
          <RoomShowcase :room="roomDetail" />
        </div>
      </div>
    </section>

    <section class="section-shell">
      <div class="container">
        <div class="section-heading">
          <span class="label-upper label-pill">Similar rooms</span>
          <h2>{{ siteConfig.uiText.room.similarTitle }}</h2>
          <p>{{ siteConfig.uiText.room.similarSummary }}</p>
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
      :primary-label="siteConfig.uiText.actions.askOnWhatsApp"
      primary-blank
      :secondary-href="callHref"
      :secondary-label="siteConfig.uiText.actions.callCozyRooms"
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
