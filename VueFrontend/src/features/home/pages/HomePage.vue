<script setup>
import { computed, ref } from 'vue'
import { useHead, useSeoMeta } from '@unhead/vue'
import ApproximateLocationSection from '@/features/home/components/ApproximateLocationSection.vue'
import AvailableRoomsSection from '@/features/home/components/AvailableRoomsSection.vue'
import EnquiryBanner from '@/features/home/components/EnquiryBanner.vue'
import FAQSection from '@/features/home/components/FAQSection.vue'
import HeroSection from '@/features/home/components/HeroSection.vue'
import ProcessSection from '@/features/home/components/ProcessSection.vue'
import StayTypesSection from '@/features/home/components/StayTypesSection.vue'
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
const isEnquiryVisible = ref(false)
const isFooterVisible = ref(false)

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
  robots: siteConfig.robotsDirective,
  ogTitle: siteConfig.defaultTitle,
  ogDescription: siteConfig.description,
  ogImage,
  ogImageAlt: siteConfig.ogImageAlt,
  ogImageWidth: siteConfig.ogImageWidth,
  ogImageHeight: siteConfig.ogImageHeight,
  ogImageType: siteConfig.ogImageType,
  ogType: 'website',
  ogLocale: 'en_IN',
  ogUrl: `${siteUrl}/`,
  ogSiteName: siteConfig.name,
  twitterCard: 'summary_large_image',
  twitterTitle: siteConfig.defaultTitle,
  twitterDescription: siteConfig.description,
  twitterImage: ogImage,
  twitterImageAlt: siteConfig.ogImageAlt,
})

useHead(() => ({
  htmlAttrs: {
    lang: 'en-IN',
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

    <StayTypesSection />

    <TrustSection :site="siteConfig" />

    <ApproximateLocationSection :site="siteConfig" />

    <ProcessSection :site="siteConfig" />

    <FAQSection :site="siteConfig" />

    <EnquiryBanner
      :site="siteConfig"
      :call-href="callHref"
      :whatsapp-href="defaultWhatsAppHref"
      @visibility-change="isEnquiryVisible = $event"
    />
  </main>

  <SiteFooter
    class="home-footer"
    :site="siteConfig"
    :call-href="callHref"
    :whatsapp-href="defaultWhatsAppHref"
    :rooms="availableRooms"
    @visibility-change="isFooterVisible = $event"
  />

  <MobileEnquiryBar
    :primary-href="'/rooms'"
    :primary-label="siteConfig.uiText.actions.viewRooms"
    :secondary-label="siteConfig.uiText.actions.talkToUs"
    :secondary-menu-options="stickyContactOptions"
    :secondary-menu-title="siteConfig.uiText.contactSheet.title"
    :secondary-menu-summary="siteConfig.uiText.contactSheet.summary"
    :reveal-after="440"
    :hidden="isEnquiryVisible || isFooterVisible"
  />
</template>

<style scoped>
.home-page-main {
  padding-bottom: 0;
  background: var(--canvas);
}

.home-footer {
  margin-top: 0;
}
</style>
