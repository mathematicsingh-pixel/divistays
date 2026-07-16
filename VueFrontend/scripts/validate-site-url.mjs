import { resolveBuildSiteUrl } from './lib/site-url.mjs'

const production = process.argv.includes('--production')
const siteUrl = resolveBuildSiteUrl(process.env.VITE_SITE_URL, { production })
const modeLabel = production ? 'Production' : 'Build'

console.log(`${modeLabel} site URL valid: ${siteUrl}`)
