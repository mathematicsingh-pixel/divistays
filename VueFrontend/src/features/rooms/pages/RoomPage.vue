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
import SiteFooter from '@/features/site/components/SiteFooter.vue'
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

const { roomSummary, roomDetail, isLoading } = useRoomDetail(toRef(props, 'roomSlug'))
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
const pageUrl = computed(() =>
  roomSummary.value ? `${siteUrl}${roomSummary.value.detailsHref}` : `${siteUrl}/rooms`,
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
  ogUrl: pageUrl,
  ogSiteName: siteConfig.name,
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
    { rel: 'canonical', href: pageUrl.value },
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
  <main
    id="main-content"
    class="room-page"
    tabindex="-1"
    :aria-busy="isLoading ? 'true' : undefined"
  >
    <template v-if="roomSummary && roomDetail">
      <section class="room-path surface-dark">
        <div class="container">
          <BreadcrumbNav
            inverse
            :items="[
              { label: 'Home', to: '/' },
              { label: 'Rooms', to: '/rooms' },
              { label: roomSummary.title },
            ]"
          />
        </div>
      </section>

      <section class="room-detail-section">
        <div class="room-showcase-shell page-rise">
          <RoomShowcase :room="roomDetail" />
        </div>
      </section>

      <section class="section-shell similar-section">
        <div class="container">
          <div class="section-heading">
            <span class="label-upper">More rooms</span>
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
    </template>

    <section
      v-else
      class="room-state section-shell"
    >
      <div class="container">
        <p class="label-upper">Rooms in Kakadeo</p>
        <h1>{{ isLoading ? 'Loading room details' : 'Room not found' }}</h1>
        <p>
          {{ isLoading
            ? 'Loading the photos, monthly rent, and facilities.'
            : 'This listing may have moved or been removed. Browse the current rooms instead.' }}
        </p>
        <RouterLink
          v-if="!isLoading"
          class="button-primary"
          to="/rooms"
        >
          Browse current rooms
        </RouterLink>
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
      :secondary-label="siteConfig.uiText.actions.callDirect"
      :hidden="isLoading"
      :reveal-after="320"
    />
  </main>
</template>

<style scoped>
.room-page {
  background: var(--canvas);
}

.room-path {
  display: none;
  padding-block: var(--space-md);
  border: 0;
  border-radius: 0;
  background: var(--bg);
}

.room-detail-section {
  padding-block: var(--space-lg) var(--section-space);
}

.room-showcase-shell {
  width: 100%;
  margin-inline: auto;
}

.similar-section {
  padding-bottom: var(--section-space);
  border-top: 1px solid var(--line);
}

.similar-section .section-heading {
  padding-top: var(--section-space);
}

.similar-grid {
  display: grid;
  gap: var(--space-md);
}

.room-state {
  min-height: 60svh;
  padding-block: var(--section-space);
}

.room-state .container {
  display: grid;
  justify-items: start;
  gap: var(--space-md);
}

.room-state h1 {
  max-width: 11ch;
}

.room-state .container > p:not(.label-upper) {
  max-width: 40rem;
  color: var(--text);
  font-size: 1.0625rem;
}

@media (min-width: 760px) {
  .room-showcase-shell {
    width: min(76rem, calc(100% - 3rem));
  }

  .similar-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-lg);
  }
}

@media (min-width: 960px) {
  .room-path {
    display: block;
  }

  .room-detail-section {
    padding-top: var(--space-xl);
  }
}
</style>
