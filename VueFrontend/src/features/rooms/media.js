const widths = [480, 960, 1440]

export function buildImagePath(slug, key, width, format) {
  return `/media/rooms/${slug}/${key}-${width}.${format}`
}

export function buildImageSources(slug, key) {
  const buildSet = (format) => widths.map((width) => `${buildImagePath(slug, key, width, format)} ${width}w`).join(', ')

  return {
    avif: buildSet('avif'),
    webp: buildSet('webp'),
    jpg: buildSet('jpg'),
    fallback: buildImagePath(slug, key, 960, 'jpg'),
  }
}

export function buildVideoPath(slug, key) {
  return `/media/rooms/${slug}/${key}.mp4`
}

export function buildVideoPosterPath(slug, key) {
  return `/media/rooms/${slug}/${key}-poster-1280.jpg`
}
