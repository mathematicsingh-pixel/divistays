<script setup>
import { computed } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import ApproximateLocationSection from '@/features/home/components/ApproximateLocationSection.vue'
import AvailableRoomsSection from '@/features/home/components/AvailableRoomsSection.vue'
import EnquiryBanner from '@/features/home/components/EnquiryBanner.vue'
import FAQSection from '@/features/home/components/FAQSection.vue'
import HeroSection from '@/features/home/components/HeroSection.vue'
import ProcessSection from '@/features/home/components/ProcessSection.vue'
import TrustSection from '@/features/home/components/TrustSection.vue'
import { buildHomeStructuredData } from '@/features/home/seo'
import {
  availableRoomCount,
  availableRooms,
  availableStartingPriceLabel,
  roomTypeCount,
  startingPriceLabel,
} from '@/features/rooms'
import MobileEnquiryBar from '@/features/site/components/MobileEnquiryBar.vue'
import MobileSectionNav from '@/features/site/components/MobileSectionNav.vue'
import SiteFooter from '@/features/site/components/SiteFooter.vue'
import { mobileSectionNavItems } from '@/features/site/config/navigation'
import {
  getCallHref,
  getPageOgImage,
  getWhatsAppHref,
  resolveSiteUrl,
  siteConfig,
} from '@/features/site/config/site'

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

const structuredData = computed(() =>
  buildHomeStructuredData({
    site: siteConfig,
    siteUrl,
    rooms: availableRooms,
    faqs: siteConfig.faqs,
  }),
)

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
    key: `ld-json-home-${index}`,
    type: 'application/ld+json',
    textContent: JSON.stringify(item),
  })),
}))
</script>

<template>
  <main class="home-page-main">
    <MobileSectionNav
      :items="mobileSectionNavItems"
      show-from-top
    />

    <HeroSection
      :site="siteConfig"
      :available-room-count="availableRoomCount"
      :available-starting-price-label="availableStartingPriceLabel"
      :room-type-count="roomTypeCount"
      :starting-price-label="startingPriceLabel"
      :call-href="callHref"
      :whatsapp-href="defaultWhatsAppHref"
    />

    <AvailableRoomsSection
      :rooms="availableRooms"
      :site="siteConfig"
    />

    <TrustSection :site="siteConfig" />

    <ApproximateLocationSection :site="siteConfig" />

    <ProcessSection :site="siteConfig" />

    <FAQSection :site="siteConfig" />

    <EnquiryBanner
      :site="siteConfig"
      :call-href="callHref"
      :whatsapp-href="defaultWhatsAppHref"
    />

    <SiteFooter
      :site="siteConfig"
      :call-href="callHref"
      :whatsapp-href="defaultWhatsAppHref"
      :rooms="availableRooms"
    />

    <MobileEnquiryBar
      :primary-href="'/rooms?availability=available'"
      primary-label="Open rooms"
      secondary-label="Contact"
      :secondary-menu-options="stickyContactOptions"
      secondary-menu-summary="Call directly or send a WhatsApp message."
    />
  </main>
</template>

<style scoped>
.home-page-main {
  padding-top: calc(4.9rem + env(safe-area-inset-top));
}

@media (min-width: 960px) {
  .home-page-main {
    padding-top: 0.9rem;
  }
}
</style>
