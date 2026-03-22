export function defineRoom(definition) {
  return Object.freeze(definition)
}

export function defineRoomSummary(definition) {
  return Object.freeze(definition)
}

export function image(key, source, alt, caption = alt) {
  return { key, source, alt, caption }
}

export function video(key, source, label) {
  return { key, source, label }
}
