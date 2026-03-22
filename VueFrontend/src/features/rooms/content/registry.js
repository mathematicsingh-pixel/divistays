import budgetSingleAttached from './budget-single-attached/index.js'
import compactSoloGarden from './compact-solo-garden/index.js'
import gardenViewStudio from './garden-view-studio/index.js'
import oneRkStudio from './one-rk-studio/index.js'
import vibrantStudio from './vibrant-studio/index.js'

// Add new room modules here. Registry order controls catalog + route order.
export const roomSourceCatalog = [
  vibrantStudio,
  gardenViewStudio,
  oneRkStudio,
  budgetSingleAttached,
  compactSoloGarden,
]
