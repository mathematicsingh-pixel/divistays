import { nextTick, onBeforeUnmount, watch } from 'vue'

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

export function useOverlayDialog({ isOpen, panelRef, initialFocusRef, onClose }) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  let lastActiveElement = null

  function handleKeydown(event) {
    if (!isOpen.value) {
      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
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
        lastActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null
        window.addEventListener('keydown', handleKeydown)

        await nextTick()

        const target = initialFocusRef?.value || getFocusableElements(panelRef.value)[0]
        target?.focus()
        return
      }

      window.removeEventListener('keydown', handleKeydown)
      lastActiveElement?.focus?.()
      lastActiveElement = null
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    lastActiveElement = null
  })
}
