import { onBeforeUnmount, watch } from 'vue'

const activeLocks = new Set()

let previousOverflow = ''

function acquireScrollLock(instance) {
  if (activeLocks.has(instance)) {
    return
  }

  if (!activeLocks.size) {
    previousOverflow = document.documentElement.style.overflow
  }

  activeLocks.add(instance)
  document.documentElement.style.overflow = 'hidden'
}

function releaseScrollLock(instance) {
  if (!activeLocks.delete(instance) || activeLocks.size) {
    return
  }

  document.documentElement.style.overflow = previousOverflow
}

export function useScrollLock(active) {
  if (typeof document === 'undefined') {
    return
  }

  const instance = Symbol('scroll-lock')
  let ownsLock = false

  watch(
    active,
    (locked) => {
      if (locked && !ownsLock) {
        acquireScrollLock(instance)
        ownsLock = true
        return
      }

      if (!locked && ownsLock) {
        releaseScrollLock(instance)
        ownsLock = false
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (ownsLock) {
      releaseScrollLock(instance)
      ownsLock = false
    }
  })
}
