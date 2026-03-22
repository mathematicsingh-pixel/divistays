import { computed, onBeforeUnmount, ref, watch } from 'vue'

const MAX_STAGE_ZOOM = 4
const TAP_MOVE_THRESHOLD = 12
const PINCH_MOVE_THRESHOLD = 6
const SWIPE_LOCK_THRESHOLD = 18
const SWIPE_DISTANCE_THRESHOLD = 56
const SWIPE_DIRECTION_RATIO = 1.2
const HINT_HIDE_DELAY = 2200

export function useRoomShowcaseStage(room) {
  const activeIndex = ref(0)
  const stageMedia = ref(null)
  const zoomScale = ref(1)
  const zoomOffset = ref({ x: 0, y: 0 })
  const isDragging = ref(false)
  const showStageHints = ref(true)

  let hintHideTimer = null

  const interactionState = {
    mode: null,
    moved: false,
    ignoreClickUntil: 0,
    startPoint: null,
    lastPoint: null,
    startOffset: { x: 0, y: 0 },
    startScale: 1,
    startDistance: 0,
    startMidpoint: { x: 0, y: 0 },
  }

  const activeMedia = computed(() => room.value.gallery[activeIndex.value])
  const canCycle = computed(() => room.value.gallery.length > 1)
  const isZoomed = computed(() => zoomScale.value > 1.01)
  const showStageControls = computed(() => canCycle.value && !isZoomed.value)
  const stageTransformStyle = computed(() => ({
    transform: `translate3d(${zoomOffset.value.x}px, ${zoomOffset.value.y}px, 0) scale(${zoomScale.value})`,
  }))
  const stageLabel = computed(() => {
    const commands = []

    if (canCycle.value && !isZoomed.value) {
      commands.push('Swipe left or right')
      commands.push('Tap or click for the next photo')
    }

    commands.push(isZoomed.value ? 'Drag to pan' : 'Pinch to zoom')

    return `Room photo ${activeIndex.value + 1} of ${room.value.gallery.length}. ${activeMedia.value.caption}. ${commands.join('. ')}.`
  })

  function setStageMedia(element) {
    stageMedia.value = element
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max)
  }

  function isStageControlTarget(target) {
    return target instanceof Element && Boolean(target.closest('[data-stage-control="true"]'))
  }

  function clearHintTimer() {
    if (hintHideTimer) {
      clearTimeout(hintHideTimer)
      hintHideTimer = null
    }
  }

  function hideStageHints() {
    clearHintTimer()
    showStageHints.value = false
  }

  function scheduleHintHide() {
    clearHintTimer()
    showStageHints.value = true

    if (typeof window === 'undefined') {
      return
    }

    hintHideTimer = setTimeout(() => {
      showStageHints.value = false
      hintHideTimer = null
    }, HINT_HIDE_DELAY)
  }

  function getStageRect() {
    return stageMedia.value?.getBoundingClientRect() ?? null
  }

  function clampOffset(x, y, scale = zoomScale.value) {
    const rect = getStageRect()

    if (!rect || scale <= 1) {
      return { x: 0, y: 0 }
    }

    const maxX = ((rect.width * scale) - rect.width) / 2
    const maxY = ((rect.height * scale) - rect.height) / 2

    return {
      x: clamp(x, -maxX, maxX),
      y: clamp(y, -maxY, maxY),
    }
  }

  function applyZoom(scale, x, y) {
    const nextScale = clamp(scale, 1, MAX_STAGE_ZOOM)

    if (nextScale <= 1.01) {
      zoomScale.value = 1
      zoomOffset.value = { x: 0, y: 0 }
      return
    }

    zoomScale.value = nextScale
    zoomOffset.value = clampOffset(x, y, nextScale)
  }

  function resetZoom() {
    zoomScale.value = 1
    zoomOffset.value = { x: 0, y: 0 }
    isDragging.value = false
    interactionState.mode = null
    interactionState.moved = false
    interactionState.startPoint = null
    interactionState.startDistance = 0
    interactionState.lastPoint = null
  }

  function setActiveIndex(index) {
    activeIndex.value = index
    resetZoom()
    scheduleHintHide()
  }

  function cycleImage(step = 1) {
    if (!canCycle.value) {
      return
    }

    const total = room.value.gallery.length
    const nextIndex = (activeIndex.value + step + total) % total
    setActiveIndex(nextIndex)
  }

  function getTouchPair(event) {
    const rect = getStageRect()

    if (!rect || event.touches.length < 2) {
      return null
    }

    const halfWidth = rect.width / 2
    const halfHeight = rect.height / 2
    const [firstTouch, secondTouch] = event.touches
    const first = {
      x: firstTouch.clientX - rect.left - halfWidth,
      y: firstTouch.clientY - rect.top - halfHeight,
    }
    const second = {
      x: secondTouch.clientX - rect.left - halfWidth,
      y: secondTouch.clientY - rect.top - halfHeight,
    }

    return { first, second }
  }

  function getDistance(first, second) {
    return Math.hypot(second.x - first.x, second.y - first.y)
  }

  function getMidpoint(first, second) {
    return {
      x: (first.x + second.x) / 2,
      y: (first.y + second.y) / 2,
    }
  }

  function startPan(touch) {
    interactionState.mode = 'pan'
    interactionState.moved = false
    interactionState.startPoint = {
      x: touch.clientX,
      y: touch.clientY,
    }
    interactionState.lastPoint = { ...interactionState.startPoint }
    interactionState.startOffset = { ...zoomOffset.value }
    isDragging.value = true
  }

  function handleStageClick(event) {
    if (
      Date.now() < interactionState.ignoreClickUntil
      || isZoomed.value
      || isStageControlTarget(event.target)
    ) {
      return
    }

    hideStageHints()
    cycleImage()
  }

  function handleStageKeydown(event) {
    if (event.key === 'Escape' && isZoomed.value) {
      event.preventDefault()
      resetZoom()
      scheduleHintHide()
      return
    }

    if (isZoomed.value) {
      return
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      hideStageHints()
      cycleImage(-1)
      return
    }

    if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      hideStageHints()
      cycleImage()
    }
  }

  function handleTouchStart(event) {
    if (isStageControlTarget(event.target)) {
      interactionState.mode = null
      interactionState.startPoint = null
      interactionState.lastPoint = null
      interactionState.moved = false
      return
    }

    hideStageHints()

    if (event.touches.length >= 2) {
      const pair = getTouchPair(event)

      if (!pair) {
        return
      }

      event.preventDefault()
      interactionState.mode = 'pinch'
      interactionState.moved = true
      interactionState.startScale = zoomScale.value
      interactionState.startOffset = { ...zoomOffset.value }
      interactionState.startDistance = Math.max(getDistance(pair.first, pair.second), 1)
      interactionState.startMidpoint = getMidpoint(pair.first, pair.second)
      isDragging.value = true
      return
    }

    if (event.touches.length !== 1) {
      return
    }

    const [touch] = event.touches
    interactionState.moved = false
    interactionState.lastPoint = {
      x: touch.clientX,
      y: touch.clientY,
    }

    if (isZoomed.value) {
      startPan(touch)
      return
    }

    interactionState.mode = 'tap'
    interactionState.startPoint = {
      x: touch.clientX,
      y: touch.clientY,
    }
    isDragging.value = false
  }

  function handleTouchMove(event) {
    if (event.touches.length >= 2) {
      const pair = getTouchPair(event)

      if (!pair) {
        return
      }

      event.preventDefault()

      const distance = Math.max(getDistance(pair.first, pair.second), 1)
      const midpoint = getMidpoint(pair.first, pair.second)
      const nextScale = interactionState.startScale * (distance / interactionState.startDistance)
      const ratio = clamp(nextScale, 1, MAX_STAGE_ZOOM)
      const nextX = midpoint.x - (((interactionState.startMidpoint.x - interactionState.startOffset.x) / interactionState.startScale) * ratio)
      const nextY = midpoint.y - (((interactionState.startMidpoint.y - interactionState.startOffset.y) / interactionState.startScale) * ratio)

      if (
        Math.abs(distance - interactionState.startDistance) > PINCH_MOVE_THRESHOLD
        || Math.abs(midpoint.x - interactionState.startMidpoint.x) > PINCH_MOVE_THRESHOLD
        || Math.abs(midpoint.y - interactionState.startMidpoint.y) > PINCH_MOVE_THRESHOLD
      ) {
        interactionState.moved = true
      }

      applyZoom(nextScale, nextX, nextY)
      return
    }

    if (event.touches.length !== 1 || !interactionState.startPoint) {
      return
    }

    const [touch] = event.touches
    const deltaX = touch.clientX - interactionState.startPoint.x
    const deltaY = touch.clientY - interactionState.startPoint.y
    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    interactionState.lastPoint = {
      x: touch.clientX,
      y: touch.clientY,
    }

    if (interactionState.mode === 'pan' && isZoomed.value) {
      event.preventDefault()

      if (absDeltaX > TAP_MOVE_THRESHOLD || absDeltaY > TAP_MOVE_THRESHOLD) {
        interactionState.moved = true
      }

      applyZoom(
        zoomScale.value,
        interactionState.startOffset.x + deltaX,
        interactionState.startOffset.y + deltaY,
      )
      return
    }

    if (absDeltaX > TAP_MOVE_THRESHOLD || absDeltaY > TAP_MOVE_THRESHOLD) {
      interactionState.moved = true
    }

    if (!canCycle.value || interactionState.mode === 'scroll') {
      return
    }

    if (
      interactionState.mode === 'swipe'
      || (
        absDeltaX >= SWIPE_LOCK_THRESHOLD
        && absDeltaX > absDeltaY * SWIPE_DIRECTION_RATIO
      )
    ) {
      interactionState.mode = 'swipe'
      event.preventDefault()
      return
    }

    if (
      absDeltaY >= SWIPE_LOCK_THRESHOLD
      && absDeltaY > absDeltaX * SWIPE_DIRECTION_RATIO
    ) {
      interactionState.mode = 'scroll'
    }
  }

  function handleTouchEnd(event) {
    interactionState.ignoreClickUntil = Date.now() + 400
    isDragging.value = false

    if (event.touches.length === 1 && interactionState.mode === 'pinch') {
      startPan(event.touches[0])
      return
    }

    if (event.touches.length > 0) {
      return
    }

    const endTouch = event.changedTouches[0]
    const endPoint = endTouch
      ? { x: endTouch.clientX, y: endTouch.clientY }
      : interactionState.lastPoint
    const deltaX = endPoint && interactionState.startPoint
      ? endPoint.x - interactionState.startPoint.x
      : 0
    const deltaY = endPoint && interactionState.startPoint
      ? endPoint.y - interactionState.startPoint.y
      : 0
    const shouldSwipe = (
      interactionState.mode === 'swipe'
      && canCycle.value
      && !isZoomed.value
      && Math.abs(deltaX) >= SWIPE_DISTANCE_THRESHOLD
      && Math.abs(deltaX) > Math.abs(deltaY) * SWIPE_DIRECTION_RATIO
    )
    const shouldCycle = interactionState.mode === 'tap' && !interactionState.moved && !isZoomed.value

    interactionState.mode = null
    interactionState.startPoint = null
    interactionState.startDistance = 0
    interactionState.lastPoint = null

    if (zoomScale.value <= 1.01) {
      resetZoom()
    }

    if (shouldSwipe) {
      cycleImage(deltaX > 0 ? -1 : 1)
      return
    }

    if (shouldCycle) {
      cycleImage()
    }
  }

  function handleTouchCancel() {
    interactionState.mode = null
    interactionState.moved = false
    interactionState.startPoint = null
    interactionState.startDistance = 0
    interactionState.lastPoint = null
    isDragging.value = false

    if (zoomScale.value <= 1.01) {
      resetZoom()
    }
  }

  function goPrevious(event) {
    event?.preventDefault()
    event?.stopPropagation()
    hideStageHints()
    cycleImage(-1)
  }

  function goNext(event) {
    event?.preventDefault()
    event?.stopPropagation()
    hideStageHints()
    cycleImage()
  }

  watch(
    () => room.value.slug,
    () => {
      activeIndex.value = 0
      resetZoom()
      scheduleHintHide()
    },
    { immediate: true },
  )

  watch(isZoomed, (zoomed) => {
    if (zoomed) {
      hideStageHints()
      return
    }

    scheduleHintHide()
  })

  onBeforeUnmount(() => {
    clearHintTimer()
  })

  return {
    activeIndex,
    activeMedia,
    canCycle,
    isDragging,
    isZoomed,
    showStageControls,
    showStageHints,
    stageLabel,
    stageTransformStyle,
    setStageMedia,
    resetZoom,
    setActiveIndex,
    goPrevious,
    goNext,
    handleStageClick,
    handleStageKeydown,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel,
  }
}
