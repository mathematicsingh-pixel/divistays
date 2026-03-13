<script setup>
import { computed, ref, watch } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import BreadcrumbNav from '@/components/BreadcrumbNav.vue'
import RoomDetailDialog from '@/components/RoomDetailDialog.vue'
import CatalogSection from '@/components/sections/CatalogSection.vue'
import MobileEnquiryBar from '@/components/sections/MobileEnquiryBar.vue'
import MobileSectionNav from '@/components/sections/MobileSectionNav.vue'
import SiteFooter from '@/components/sections/SiteFooter.vue'
import { useRoomCatalog } from '@/composables/useRoomCatalog'
import { useScrollLock } from '@/composables/useScrollLock'
import { mobileSectionNavItems } from '@/data/navigation'
import {
  getCallHref,
  getPageOgImage,
  getWhatsAppHref,
  resolveSiteUrl,
  siteConfig,
} from '@/data/site'
import { availableRooms, roomCatalog } from '@/data/rooms'
import { buildRoomsStructuredData } from '@/lib/schema'

const isSheetOpen = ref(false)
const catalog = useRoomCatalog()
const callHref = getCallHref()
const defaultWhatsAppHref = getWhatsAppHref()
const stickyContactOptions = [
  {
    label: 'Call now',
    href: callHref,
    meta: siteConfig.phoneDisplay,
    tone: 'primary',
  },
  {
    label: 'WhatsApp',
    href: defaultWhatsAppHref,
    meta: 'Message directly',
    blank: true,
  },
]
const siteUrl = resolveSiteUrl(import.meta.env.VITE_SITE_URL)
const ogImage = getPageOgImage(siteUrl)
const isOverlayOpen = computed(() => isSheetOpen.value || Boolean(catalog.selectedRoom.value))

const structuredData = computed(() =>
  buildRoomsStructuredData({
    site: siteConfig,
    siteUrl,
    rooms: roomCatalog,
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

const actions = {
  setAvailability: catalog.setAvailability,
  setSort: catalog.setSort,
  toggleOccupancy: catalog.toggleOccupancy,
  toggleKitchen: catalog.toggleKitchen,
  toggleWashroom: catalog.toggleWashroom,
  togglePrice: catalog.togglePrice,
  resetFilters: catalog.resetFilters,
  openPreview: catalog.openPreview,
}

useScrollLock(isOverlayOpen)

useSeoMeta({
  title: siteConfig.roomsTitle,
  description: siteConfig.roomsDescription,
  ogTitle: siteConfig.roomsTitle,
  ogDescription: siteConfig.roomsDescription,
  ogImage,
  ogType: 'website',
  ogLocale: 'en_IN',
  twitterCard: 'summary_large_image',
  twitterTitle: siteConfig.roomsTitle,
  twitterDescription: siteConfig.roomsDescription,
  twitterImage: ogImage,
})

useHead(() => ({
  htmlAttrs: {
    lang: 'en',
  },
  title: siteConfig.roomsTitle,
  link: [
    { rel: 'canonical', href: `${siteUrl}/rooms` },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: siteConfig.themeColor },
  ],
  script: structuredData.value.map((item, index) => ({
    key: `ld-json-rooms-${index}`,
    type: 'application/ld+json',
    textContent: JSON.stringify(item),
  })),
}))
</script>

<template>
  <main>
    <MobileSectionNav
      :items="mobileSectionNavItems"
      :hidden="isOverlayOpen"
    />

    <section class="section-shell">
      <div class="container page-top page-rise">
        <BreadcrumbNav
          :items="[
            { label: 'Home', to: '/' },
            { label: 'Rooms' },
          ]"
        />
      </div>
    </section>

    <CatalogSection
      :rooms="catalog.visibleRooms.value"
      :all-rooms="roomCatalog"
      :filters="catalog.filters.value"
      :active-filter-count="catalog.activeFilterCount.value"
      :has-active-filters="catalog.hasActiveFilters.value"
      :is-sheet-open="isSheetOpen"
      :actions="actions"
      @update:sheet-open="setSheetOpen"
    />

    <RoomDetailDialog
      :room="catalog.selectedRoom.value"
      @close="catalog.closePreview()"
    />

    <SiteFooter
      :site="siteConfig"
      :call-href="callHref"
      :whatsapp-href="defaultWhatsAppHref"
      :rooms="availableRooms"
    />

    <MobileEnquiryBar
      :primary-href="'#catalog-filters'"
      primary-label="Filters"
      secondary-label="Contact"
      :secondary-menu-options="stickyContactOptions"
      secondary-menu-summary="Call directly or send a WhatsApp message."
      :hidden="isOverlayOpen"
      primary-button
      @primary-click="setSheetOpen(true)"
    />
  </main>
</template>

<style scoped>
.page-top {
  display: grid;
  gap: 0.85rem;
}
</style>
