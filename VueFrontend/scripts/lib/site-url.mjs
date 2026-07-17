import { productionSiteUrl } from '../../src/features/site/config/origin.js'

export const localSiteUrl = 'http://localhost:4173'

function isLocalHostname(hostname) {
  return hostname === 'localhost'
    || hostname === '127.0.0.1'
    || hostname === '0.0.0.0'
    || hostname === '[::1]'
    || hostname.endsWith('.local')
}

export function resolveBuildSiteUrl(candidate, { production = false } = {}) {
  const suppliedValue = candidate?.trim()
  const configuredValue = productionSiteUrl?.trim()

  if (production && !suppliedValue && !configuredValue) {
    throw new Error('A public site URL must be configured or supplied for a production build.')
  }

  let url

  try {
    url = new URL(suppliedValue || configuredValue || localSiteUrl)
  }
  catch {
    throw new Error('VITE_SITE_URL must be a valid absolute URL.')
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('VITE_SITE_URL must use http or https.')
  }

  if (url.username || url.password || url.search || url.hash || url.pathname !== '/') {
    throw new Error('VITE_SITE_URL must be an origin only, without credentials, a path, query, or hash.')
  }

  if (url.hostname === 'example' || url.hostname.endsWith('.example')) {
    throw new Error('VITE_SITE_URL cannot use the reserved .example domain.')
  }

  if (production && url.protocol !== 'https:') {
    throw new Error('Production VITE_SITE_URL must use https.')
  }

  if (production && isLocalHostname(url.hostname)) {
    throw new Error('Production VITE_SITE_URL must use a public hostname.')
  }

  if (production && configuredValue && url.origin !== new URL(configuredValue).origin) {
    throw new Error(`Production VITE_SITE_URL must match the canonical origin: ${new URL(configuredValue).origin}`)
  }

  return url.origin
}
