import { onBeforeUnmount, watch } from 'vue'

export function useScrollLock(active) {
  if (typeof document === 'undefined') {
    return
  }

  const previousOverflow = document.documentElement.style.overflow

  watch(
    active,
    (locked) => {
      document.documentElement.style.overflow = locked ? 'hidden' : previousOverflow
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    document.documentElement.style.overflow = previousOverflow
  })
}
