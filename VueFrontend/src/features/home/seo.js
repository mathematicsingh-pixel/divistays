import { buildBreadcrumbStructuredData, buildBusiness, buildFaqStructuredData } from '../rooms/seo.js'

export function buildHomeStructuredData({ site, siteUrl, rooms, faqs }) {
  return [
    buildBusiness(site, siteUrl, rooms),
    buildFaqStructuredData(faqs),
    buildBreadcrumbStructuredData(siteUrl, [
      { name: 'Home', path: '/' },
    ]),
  ]
}
