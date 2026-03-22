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
const primaryLabel = computed(() => props.room.available ? 'WhatsApp about this room' : 'Ask for similar rooms')
const headingTag = computed(() => props.preview ? 'h2' : 'h1')
const nextQuestions = computed(() => [
  `Mention ${props.room.referenceLabel} when you call or WhatsApp`,
  `Current status updated ${props.room.availabilityUpdatedLabel}`,
  'Confirm what is included in the monthly rent',
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
      :next-questions="nextQuestions"
      :message-href="messageHref"
      :primary-label="primaryLabel"
    />
  </div>
</template>

<style scoped>
.showcase-grid {
  display: grid;
  gap: 1rem;
  align-items: start;
}

.showcase-grid > * {
  min-width: 0;
}

@media (min-width: 960px) {
  .showcase-grid {
    grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
    gap: 1.3rem;
  }
}
</style>
