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
  availableRooms,
} from '@/features/rooms'
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

const callHref = getCallHref()
const defaultWhatsAppHref = getWhatsAppHref()
const stickyContactOptions = buildStickyContactOptions(callHref, defaultWhatsAppHref)
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
  ogImageWidth: 1440,
  ogImageHeight: 1080,
  ogType: 'website',
  ogLocale: 'en_IN',
  ogUrl: `${siteUrl}/`,
  ogSiteName: siteConfig.name,
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
  <main
    id="main-content"
    class="home-page-main"
    tabindex="-1"
  >
    <HeroSection
      :site="siteConfig"
      :rooms="availableRooms"
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
      :primary-label="siteConfig.uiText.actions.viewRooms"
      :secondary-label="siteConfig.uiText.actions.talkToUs"
      :secondary-menu-options="stickyContactOptions"
      :secondary-menu-title="siteConfig.uiText.contactSheet.title"
      :secondary-menu-summary="siteConfig.uiText.contactSheet.summary"
      :reveal-after="440"
    />
  </main>
</template>

<style scoped>
.home-page-main {
  background: var(--canvas);
}
</style>
