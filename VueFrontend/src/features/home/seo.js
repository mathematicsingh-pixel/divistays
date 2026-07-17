import {
  buildFaqStructuredData,
  buildOrganization,
  buildStructuredDataGraph,
  buildWebsite,
} from '../rooms/seo.js'

export function buildHomeStructuredData({ site, siteUrl, faqs }) {
  return buildStructuredDataGraph([
    buildWebsite(site, siteUrl),
    buildOrganization(site, siteUrl),
    buildFaqStructuredData(faqs, siteUrl),
  ])
}
