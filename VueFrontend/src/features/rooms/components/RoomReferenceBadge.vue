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
    class="room-reference"
    :class="{
      'room-reference-inverse': inverse,
      'room-reference-compact': compact,
    }"
  >
    <span class="room-reference-label">Room ID</span>
    <strong>{{ room.referenceCode }}</strong>
  </span>
</template>

<style scoped>
.room-reference {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  width: fit-content;
  min-height: 2rem;
  padding: 0.38rem 0.72rem;
  border: 1px solid rgba(11, 23, 32, 0.12);
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(240, 247, 250, 0.64)),
    rgba(255, 255, 255, 0.58);
  color: var(--text-strong);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 12px 26px rgba(0, 0, 0, 0.08);
  -webkit-backdrop-filter: blur(10px) saturate(165%);
  backdrop-filter: blur(10px) saturate(165%);
}

.room-reference-label,
.room-reference strong {
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.room-reference-label {
  color: var(--muted);
}

.room-reference strong {
  color: var(--accent-deep);
}

.room-reference-inverse {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(7, 18, 26, 0.72);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
}

.room-reference-inverse .room-reference-label {
  color: rgba(247, 251, 255, 0.68);
}

.room-reference-inverse strong {
  color: var(--sun);
}

.room-reference-compact {
  min-height: 1.8rem;
  padding: 0.32rem 0.6rem;
}

.room-reference-compact .room-reference-label,
.room-reference-compact strong {
  font-size: 0.66rem;
}
</style>
