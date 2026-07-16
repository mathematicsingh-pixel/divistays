const money = new Intl.NumberFormat('en-IN')
const dateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function cloneList(value) {
  return Array.isArray(value) ? [...value] : []
}

function cloneGallery(value) {
  return Array.isArray(value) ? value.map((item) => ({ ...item })) : []
}

export function formatPriceLabel(priceMonthly) {
  return `₹${money.format(priceMonthly)}/month`
}

export function formatDateLabel(value) {
  return dateFormatter.format(new Date(`${value}T00:00:00`))
}

export function formatRoomReferenceCode(id) {
  return String(id).padStart(2, '0')
}

export function getRoomPath(slug) {
  return `/rooms/${slug}`
}

export function sortRoomRecords(left, right) {
  return Number(Boolean(right?.featured)) - Number(Boolean(left?.featured))
    || Number(Boolean(right?.available)) - Number(Boolean(left?.available))
    || (left?.id ?? Number.MAX_SAFE_INTEGER) - (right?.id ?? Number.MAX_SAFE_INTEGER)
    || String(left?.slug || '').localeCompare(String(right?.slug || ''))
}

export function toRoomSummaryRecord(room) {
  const gallery = cloneGallery(room.gallery)
  const coverImage = gallery[0]

  return {
    id: room.id,
    slug: room.slug,
    title: room.title,
    summary: room.summary,
    fitSummary: room.fitSummary,
    priceMonthly: room.priceMonthly,
    available: room.available,
    featured: room.featured,
    updatedAt: room.updatedAt,
    availabilityUpdatedAt: room.availabilityUpdatedAt,
    occupancy: room.occupancy,
    occupancyLabel: room.occupancyLabel,
    kitchenType: room.kitchenType,
    kitchenLabel: room.kitchenLabel,
    washroomType: room.washroomType,
    washroomLabel: room.washroomLabel,
    highlightLabel: room.highlightLabel,
    bestFor: room.bestFor,
    included: cloneList(room.included),
    extraNotes: cloneList(room.extraNotes),
    galleryCount: gallery.length,
    gallery: coverImage
      ? [
          {
            key: coverImage.key,
            alt: coverImage.alt,
          },
        ]
      : [],
  }
}

export function decorateRoomRecord(definition) {
  const gallery = cloneGallery(definition.gallery)
  const included = cloneList(definition.included)
  const extraNotes = cloneList(definition.extraNotes)
  const referenceCode = formatRoomReferenceCode(definition.id)

  return {
    ...definition,
    gallery,
    included,
    extraNotes,
    galleryCount: definition.galleryCount ?? gallery.length,
    video: definition.video ? { ...definition.video } : undefined,
    referenceCode,
    referenceLabel: `Room ID ${referenceCode}`,
    detailsHref: getRoomPath(definition.slug),
    priceLabel: formatPriceLabel(definition.priceMonthly),
    availabilityLabel: definition.available ? 'Available now' : 'Currently occupied',
    availabilityShortLabel: definition.available ? 'Available now' : 'Occupied',
    updatedLabel: formatDateLabel(definition.updatedAt),
    availabilityUpdatedLabel: formatDateLabel(definition.availabilityUpdatedAt),
    amenities: [...included, ...extraNotes],
  }
}
