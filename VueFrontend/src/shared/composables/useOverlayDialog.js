import { nextTick, onBeforeUnmount, watch } from 'vue'

const overlayStack = []

let previousBodyOverflow = ''
let backgroundElement = null
let backgroundWasInert = false

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements(container) {
  if (!container) {
    return []
  }

  return [...container.querySelectorAll(focusableSelector)].filter(
    (element) =>
      element instanceof HTMLElement
      && !element.hasAttribute('disabled')
      && element.getAttribute('aria-hidden') !== 'true'
      && element.getClientRects().length > 0,
  )
}

function acquirePageLock(instance) {
  if (overlayStack.includes(instance)) {
    return
  }

  if (!overlayStack.length) {
    previousBodyOverflow = document.body.style.overflow
    backgroundElement = document.querySelector('#app')
    backgroundWasInert = Boolean(backgroundElement?.inert)
    document.body.style.overflow = 'hidden'

    if (backgroundElement) {
      backgroundElement.inert = true
    }
  }

  overlayStack.push(instance)
}

function releasePageLock(instance) {
  const index = overlayStack.indexOf(instance)

  if (index === -1) {
    return
  }

  overlayStack.splice(index, 1)

  if (overlayStack.length) {
    return
  }

  document.body.style.overflow = previousBodyOverflow

  if (backgroundElement) {
    backgroundElement.inert = backgroundWasInert
  }

  backgroundElement = null
}

export function useOverlayDialog({ isOpen, panelRef, initialFocusRef, onClose }) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  const instance = Symbol('overlay-dialog')
  let lastActiveElement = null
  let ownsPageLock = false
  let activationId = 0

  function restoreFocus() {
    const target = lastActiveElement
    lastActiveElement = null

    window.requestAnimationFrame(() => {
      if (target?.isConnected) {
        target.focus()
      }
    })
  }

  function handleKeydown(event) {
    if (!isOpen.value || overlayStack[overlayStack.length - 1] !== instance) {
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopImmediatePropagation()
      onClose()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const focusableElements = getFocusableElements(panelRef.value)

    if (!focusableElements.length) {
      event.preventDefault()
      return
    }

    const [first] = focusableElements
    const last = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
      return
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  watch(
    isOpen,
    async (open) => {
      if (open) {
        const currentActivation = ++activationId
        lastActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
        acquirePageLock(instance)
        ownsPageLock = true
        window.addEventListener('keydown', handleKeydown)

        await nextTick()

        if (!isOpen.value || !ownsPageLock || currentActivation !== activationId) {
          return
        }

        const target = initialFocusRef?.value || getFocusableElements(panelRef.value)[0]
        target?.focus()
        return
      }

      activationId += 1
      window.removeEventListener('keydown', handleKeydown)

      if (!ownsPageLock) {
        return
      }

      releasePageLock(instance)
      ownsPageLock = false
      restoreFocus()
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    activationId += 1
    window.removeEventListener('keydown', handleKeydown)

    if (ownsPageLock) {
      releasePageLock(instance)
      ownsPageLock = false
      restoreFocus()
    }
  })
}
