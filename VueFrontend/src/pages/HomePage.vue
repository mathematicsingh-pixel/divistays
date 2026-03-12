<script setup>
import { computed, ref, watch } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import CatalogSection from '@/components/sections/CatalogSection.vue'
import EnquiryBanner from '@/components/sections/EnquiryBanner.vue'
import FAQSection from '@/components/sections/FAQSection.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import LocalitySection from '@/components/sections/LocalitySection.vue'
import MobileEnquiryBar from '@/components/sections/MobileEnquiryBar.vue'
import SiteFooter from '@/components/sections/SiteFooter.vue'
import TrustSection from '@/components/sections/TrustSection.vue'
import RoomDetailDialog from '@/components/RoomDetailDialog.vue'
import { useRoomCatalog } from '@/composables/useRoomCatalog'
import { useScrollLock } from '@/composables/useScrollLock'
import { availableRooms, roomCatalog, startingPriceLabel } from '@/data/rooms'
import { buildRoomEnquiry, getCallHref, getWhatsAppHref, resolveSiteUrl, siteConfig } from '@/data/site'
import { buildStructuredData } from '@/lib/schema'

const isSheetOpen = ref(false)
const catalog = useRoomCatalog()
const callHref = getCallHref()
const defaultWhatsAppHref = getWhatsAppHref()
const featuredRooms = [
  ...availableRooms,
  ...roomCatalog.filter((room) => !availableRooms.some((availableRoom) => availableRoom.id === room.id)),
].slice(0, 3)
const availableRoomCount = availableRooms.length
const highlightRoom = computed(() => catalog.visibleRooms.value[0] || featuredRooms[0] || roomCatalog[0])
const isOverlayOpen = computed(() => isSheetOpen.value || Boolean(catalog.selectedRoom.value))
const siteUrl = resolveSiteUrl(import.meta.env.VITE_SITE_URL)
const heroRoom = featuredRooms[0] || roomCatalog[0]
const ogImage = `${siteUrl}/media/rooms/${heroRoom.slug}/${heroRoom.gallery[0].key}-1440.jpg`

const structuredData = computed(() =>
  buildStructuredData({
    site: siteConfig,
    siteUrl,
    rooms: roomCatalog,
    faqs: siteConfig.faqs,
  }),
)

watch(
  () => catalog.selectedRoom.value,
  (room) => {
    if (room) {
      isSheetOpen.value = false
    }
  },
)

function setSheetOpen(value) {
  isSheetOpen.value = value
}

useScrollLock(isOverlayOpen)

useSeoMeta({
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  ogTitle: siteConfig.defaultTitle,
  ogDescription: siteConfig.description,
  ogImage,
  ogType: 'website',
  ogLocale: 'en_IN',
  twitterCard: 'summary_large_image',
  twitterTitle: siteConfig.defaultTitle,
  twitterDescription: siteConfig.description,
  twitterImage: ogImage,
})

useHead(() => ({
  htmlAttrs: {
    lang: 'en',
  },
  title: siteConfig.defaultTitle,
  link: [
    { rel: 'canonical', href: `${siteUrl}/` },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: siteConfig.themeColor },
  ],
  script: structuredData.value.map((item, index) => ({
    key: `ld-json-${index}`,
    type: 'application/ld+json',
    textContent: JSON.stringify(item),
  })),
}))

const actions = {
  setAvailability: catalog.setAvailability,
  setSort: catalog.setSort,
  toggleOccupancy: catalog.toggleOccupancy,
  toggleKitchen: catalog.toggleKitchen,
  toggleWashroom: catalog.toggleWashroom,
  resetFilters: catalog.resetFilters,
  openRoom: catalog.openRoom,
}
</script>

<template>
  <main>
    <HeroSection
      :featured-rooms="featuredRooms"
      :stats="siteConfig.stats"
      :site="siteConfig"
      :starting-price-label="startingPriceLabel"
      :available-room-count="availableRoomCount"
      :call-href="callHref"
      :whatsapp-href="defaultWhatsAppHref"
    />

    <TrustSection :points="siteConfig.trustPoints" />

    <CatalogSection
      :rooms="catalog.visibleRooms.value"
      :filters="catalog.filters.value"
      :active-filter-count="catalog.activeFilterCount.value"
      :has-active-filters="catalog.hasActiveFilters.value"
      :is-sheet-open="isSheetOpen"
      :actions="actions"
      @update:sheet-open="setSheetOpen"
    />

    <LocalitySection
      :site="siteConfig"
      :room="highlightRoom"
    />

    <FAQSection :faqs="siteConfig.faqs" />

    <EnquiryBanner
      :site="siteConfig"
      :call-href="callHref"
      :whatsapp-href="getWhatsAppHref(buildRoomEnquiry(catalog.selectedRoom.value || roomCatalog[0]))"
    />

    <SiteFooter
      :site="siteConfig"
      :call-href="callHref"
      :whatsapp-href="defaultWhatsAppHref"
    />

    <RoomDetailDialog
      :room="catalog.selectedRoom.value"
      @close="catalog.closeRoom()"
    />

    <MobileEnquiryBar
      :call-href="callHref"
      :whatsapp-href="defaultWhatsAppHref"
      :hidden="isOverlayOpen"
    />
  </main>
</template>
