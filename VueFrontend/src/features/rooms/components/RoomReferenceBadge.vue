<script setup>
defineProps({
  room: {
    type: Object,
    required: true,
  },
  inverse: {
    type: Boolean,
    default: false,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <span
    class="room-reference-badge"
    :class="{
      'room-reference-badge--inverse': inverse,
      'room-reference-badge--compact': compact,
    }"
  >
    <span class="room-reference-label">Room ID</span>
    <strong>{{ room.referenceCode }}</strong>
  </span>
</template>

<style scoped>
.room-reference-badge {
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0.45rem;
  width: fit-content;
  max-width: 100%;
  min-height: 2.75rem;
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--line);
  border-radius: var(--radius-full);
  background: var(--paper);
  color: var(--text-strong);
  white-space: nowrap;
}

.room-reference-label,
.room-reference-badge strong {
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.room-reference-label {
  color: var(--muted);
}

.room-reference-badge strong {
  flex: 0 0 auto;
  color: var(--text-strong);
}

.room-reference-badge--inverse {
  border-color: var(--line-inverse);
  background: var(--bg);
}

.room-reference-badge--inverse .room-reference-label {
  color: var(--muted-inverse);
}

.room-reference-badge--inverse strong {
  color: var(--text-inverse);
}

.room-reference-badge--compact {
  min-height: 1.8rem;
  padding: var(--space-xs) var(--space-sm);
}

.room-reference-badge--compact .room-reference-label,
.room-reference-badge--compact strong {
  font-size: 0.66rem;
}
</style>
