<script setup>
import { computed, ref } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import CategoryFaqSection from '@/features/accommodation/components/CategoryFaqSection.vue'
import CategoryGuideSection from '@/features/accommodation/components/CategoryGuideSection.vue'
import CategoryHero from '@/features/accommodation/components/CategoryHero.vue'
import CategoryRoomsSection from '@/features/accommodation/components/CategoryRoomsSection.vue'
import { findAccommodationCategoryPage } from '@/features/accommodation/content/category-pages'
import {
  getAccommodationCategoryRooms,
  getAccommodationCategoryStats,
} from '@/features/accommodation/model/category-catalog'
import { buildAccommodationCategoryStructuredData } from '@/features/accommodation/seo'
import ApproximateLocationSection from '@/features/home/components/ApproximateLocationSection.vue'
import EnquiryBanner from '@/features/home/components/EnquiryBanner.vue'
import { availableRooms, buildImagePath, roomCatalog } from '@/features/rooms'
import { formatDateLabel } from '@/features/rooms/model/room-record'
import MobileEnquiryBar from '@/features/site/components/MobileEnquiryBar.vue'
import SiteFooter from '@/features/site/components/SiteFooter.vue'
import {
  getCallHref,
  getWhatsAppHref,
  resolveSiteUrl,
  siteConfig,
} from '@/features/site/config/site'

const props = defineProps({
  categoryKey: {
    type: String,
    required: true,
  },
})

const page = findAccommodationCategoryPage(props.categoryKey)

if (!page) {
  throw new Error(`Unknown accommodation category: ${props.categoryKey}`)
}

const rooms = getAccommodationCategoryRooms(roomCatalog, page.key)
const stats = getAccommodationCategoryStats(rooms)
const heroRoom = rooms.find((room) => room.slug === page.heroRoomSlug && room.available)
  || rooms.find((room) => room.available)
  || rooms.find((room) => room.slug === page.heroRoomSlug)
  || rooms[0]
const updatedLabel = stats.latestUpdatedAt ? formatDateLabel(stats.latestUpdatedAt) : 'Confirm by phone'
const callHref = getCallHref()
const whatsappHref = getWhatsAppHref(page.enquiryMessage)
const siteUrl = resolveSiteUrl(import.meta.env.VITE_SITE_URL)
const pageUrl = `${siteUrl}${page.path}`
const ogImage = `${siteUrl}${buildImagePath(heroRoom.slug, heroRoom.gallery[0].key, 1440, 'jpg')}`
const ogImageAlt = heroRoom.gallery[0].alt
const isEnquiryVisible = ref(false)
const isFooterVisible = ref(false)
const categorySite = {
  ...siteConfig,
  ctaTitle: page.key === 'pg-hostel' ? 'Ask which shared setup is open' : 'Ask which private setup is open',
  ctaSummary:
    'Send the room ID if one stands out. We will confirm availability, current charges, and a visit time.',
}

const structuredData = computed(() =>
  buildAccommodationCategoryStructuredData({
    page,
    rooms,
    site: siteConfig,
    siteUrl,
  }),
)

useSeoMeta({
  title: page.title,
  description: page.description,
  robots: siteConfig.robotsDirective,
  ogTitle: page.title,
  ogDescription: page.description,
  ogImage,
  ogImageAlt,
  ogImageWidth: siteConfig.ogImageWidth,
  ogImageHeight: siteConfig.ogImageHeight,
  ogImageType: 'image/jpeg',
  ogType: 'website',
  ogLocale: 'en_IN',
  ogUrl: pageUrl,
  ogSiteName: siteConfig.name,
  twitterCard: 'summary_large_image',
  twitterTitle: page.title,
  twitterDescription: page.description,
  twitterImage: ogImage,
  twitterImageAlt: ogImageAlt,
})

useHead(() => ({
  htmlAttrs: {
    lang: 'en-IN',
  },
  title: page.title,
  link: [
    { rel: 'canonical', href: pageUrl },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: siteConfig.themeColor },
  ],
  script: structuredData.value.map((item, index) => ({
    key: `ld-json-accommodation-${page.key}-${index}`,
    type: 'application/ld+json',
    textContent: JSON.stringify(item),
  })),
}))
</script>

<template>
  <main
    id="main-content"
    class="accommodation-category-page"
    tabindex="-1"
  >
    <CategoryHero
      :page="page"
      :room="heroRoom"
      :stats="stats"
      :updated-label="updatedLabel"
    />

    <CategoryRoomsSection
      :page="page"
      :rooms="rooms"
    />

    <CategoryGuideSection :page="page" />

    <ApproximateLocationSection :site="siteConfig" />

    <CategoryFaqSection :page="page" />

    <EnquiryBanner
      :site="categorySite"
      :call-href="callHref"
      :whatsapp-href="whatsappHref"
      @visibility-change="isEnquiryVisible = $event"
    />
  </main>

  <SiteFooter
    :site="siteConfig"
    :call-href="callHref"
    :whatsapp-href="whatsappHref"
    :rooms="availableRooms"
    @visibility-change="isFooterVisible = $event"
  />

  <MobileEnquiryBar
    :primary-href="whatsappHref"
    primary-label="Ask what is available"
    primary-blank
    :secondary-href="callHref"
    :secondary-label="siteConfig.uiText.actions.callDirect"
    :reveal-after="420"
    :hidden="isEnquiryVisible || isFooterVisible"
  />
</template>

<style scoped>
.accommodation-category-page {
  padding-bottom: 0;
  background: var(--canvas);
}
</style>
