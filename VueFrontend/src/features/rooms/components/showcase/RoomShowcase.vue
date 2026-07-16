<script setup>
import { computed } from 'vue'
import { buildRoomEnquiry, getWhatsAppHref } from '@/features/site/config/site'
import RoomShowcaseDetails from './RoomShowcaseDetails.vue'
import RoomShowcaseStage from './RoomShowcaseStage.vue'

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
  preview: {
    type: Boolean,
    default: false,
  },
})

const messageHref = computed(() => getWhatsAppHref(buildRoomEnquiry(props.room)))
const headingTag = computed(() => props.preview ? 'h2' : 'h1')
const visitNotes = computed(() => [
  ...props.room.extraNotes,
  props.room.visitNextStep,
])
</script>

<template>
  <div class="showcase-grid">
    <RoomShowcaseStage :room="room" />

    <RoomShowcaseDetails
      :room="room"
      :preview="preview"
      :heading-tag="headingTag"
      :visit-notes="visitNotes"
      :message-href="messageHref"
    />
  </div>
</template>

<style scoped>
.showcase-grid {
  display: grid;
  gap: var(--space-xl);
  align-items: start;
}

.showcase-grid > * {
  min-width: 0;
}

@media (min-width: 960px) {
  .showcase-grid {
    grid-template-columns: minmax(0, 1.12fr) minmax(22rem, 0.88fr);
    gap: var(--space-2xl);
  }

  .showcase-grid > :first-child {
    position: sticky;
    top: 5.5rem;
  }
}
</style>
