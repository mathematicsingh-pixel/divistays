import { computed, onServerPrefetch, ref, watch } from 'vue'
import { findRoomSummaryBySlug } from '@/features/rooms/model/catalog'
import { loadRoomDetail } from '@/features/rooms/model/detail-loaders'

export function useRoomDetail(roomSlug) {
  const roomSummary = computed(() => {
    if (!roomSlug.value) {
      return null
    }

    return findRoomSummaryBySlug(roomSlug.value)
  })

  const roomDetail = ref(null)
  const isLoading = ref(false)

  async function hydrateRoom(slug) {
    if (!slug) {
      roomDetail.value = null
      isLoading.value = false
      return null
    }

    roomDetail.value = null
    isLoading.value = true

    try {
      const nextRoom = await loadRoomDetail(slug)

      if (roomSlug.value === slug) {
        roomDetail.value = nextRoom
      }

      return nextRoom
    }
    finally {
      if (roomSlug.value === slug) {
        isLoading.value = false
      }
    }
  }

  const initialLoad = hydrateRoom(roomSlug.value)

  onServerPrefetch(() => initialLoad)

  watch(roomSlug, (slug, previousSlug) => {
    if (slug === previousSlug) {
      return
    }

    void hydrateRoom(slug)
  })

  return {
    roomSummary,
    roomDetail,
    isLoading,
  }
}
