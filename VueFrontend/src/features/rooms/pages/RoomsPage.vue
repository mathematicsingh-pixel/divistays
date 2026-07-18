<script setup>
import { computed, defineAsyncComponent, ref, watch } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import RoomTypeComparisonSection from '@/features/accommodation/components/RoomTypeComparisonSection.vue'
import CatalogSection from '@/features/rooms/components/catalog/CatalogSection.vue'
import { useRoomCatalog } from '@/features/rooms/composables/useRoomCatalog'
import { availableRooms, roomCatalog } from '@/features/rooms'
import { buildRoomsStructuredData } from '@/features/rooms/seo'
import BreadcrumbNav from '@/features/site/components/BreadcrumbNav.vue'
import MobileEnquiryBar from '@/features/site/components/MobileEnquiryBar.vue'
import SiteFooter from '@/features/site/components/SiteFooter.vue'
import {
  buildStickyContactOptions,
  getCallHref,
  getPageOgImage,
  getWhatsAppHref,
  resolveSiteUrl,
  siteConfig,
} from '@/features/site/config/site'
import { useScrollLock } from '@/shared/composables/useScrollLock'

const AsyncRoomDetailDialog = defineAsyncComponent(() => import('@/features/rooms/components/RoomDetailDialog.vue'))
const isSheetOpen = ref(false)
const isFooterVisible = ref(false)
const catalog = useRoomCatalog()
const callHref = getCallHref()
const defaultWhatsAppHref = getWhatsAppHref()
const stickyContactOptions = buildStickyContactOptions(callHref, defaultWhatsAppHref)
const siteUrl = resolveSiteUrl(import.meta.env.VITE_SITE_URL)
const ogImage = getPageOgImage(siteUrl)
const isOverlayOpen = computed(() => isSheetOpen.value || Boolean(catalog.selectedRoomSlug.value))

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
  applyFilters: catalog.applyFilters,
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
  robots: siteConfig.robotsDirective,
  ogTitle: siteConfig.roomsTitle,
  ogDescription: siteConfig.roomsDescription,
  ogImage,
  ogImageAlt: siteConfig.ogImageAlt,
  ogImageWidth: siteConfig.ogImageWidth,
  ogImageHeight: siteConfig.ogImageHeight,
  ogImageType: siteConfig.ogImageType,
  ogType: 'website',
  ogLocale: 'en_IN',
  ogUrl: `${siteUrl}/rooms`,
  ogSiteName: siteConfig.name,
  twitterCard: 'summary_large_image',
  twitterTitle: siteConfig.roomsTitle,
  twitterDescription: siteConfig.roomsDescription,
  twitterImage: ogImage,
  twitterImageAlt: siteConfig.ogImageAlt,
})

useHead(() => ({
  htmlAttrs: {
    lang: 'en-IN',
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
  <main id="main-content" class="rooms-page" tabindex="-1">
    <section class="rooms-path section-shell">
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

    <AsyncRoomDetailDialog
      v-if="catalog.selectedRoomSlug.value"
      :room-slug="catalog.selectedRoomSlug.value"
      @close="catalog.closePreview()"
    />

    <RoomTypeComparisonSection :rooms="roomCatalog" />
  </main>

  <SiteFooter
    :site="siteConfig"
    :call-href="callHref"
    :whatsapp-href="defaultWhatsAppHref"
    :rooms="availableRooms"
    @visibility-change="isFooterVisible = $event"
  />

  <MobileEnquiryBar
    :primary-href="'#catalog-filters'"
    :primary-label="siteConfig.uiText.catalog.mobileFiltersLabel"
    :secondary-label="siteConfig.uiText.actions.talkToUs"
    :secondary-menu-options="stickyContactOptions"
    :secondary-menu-title="siteConfig.uiText.contactSheet.title"
    :secondary-menu-summary="siteConfig.uiText.contactSheet.summary"
    :hidden="isOverlayOpen || isFooterVisible"
    primary-button
    @primary-click="setSheetOpen(true)"
  />
</template>

<style scoped>
.rooms-page {
  padding-bottom: 0;
  background: var(--canvas);
}

.rooms-path {
  display: none;
}

.page-top {
  display: grid;
  gap: 0.85rem;
  padding-top: var(--space-lg);
}

@media (min-width: 960px) {
  .rooms-path {
    display: block;
  }
}
</style>
