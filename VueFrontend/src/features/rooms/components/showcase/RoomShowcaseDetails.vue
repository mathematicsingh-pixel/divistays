<script setup>
import RoomReferenceBadge from '@/features/rooms/components/RoomReferenceBadge.vue'
import { getCallHref, siteConfig } from '@/features/site/config/site'

const props = defineProps({
  room: {
    type: Object,
    required: true,
  },
  preview: {
    type: Boolean,
    default: false,
  },
  headingTag: {
    type: String,
    required: true,
  },
  nextQuestions: {
    type: Array,
    required: true,
  },
  messageHref: {
    type: String,
    required: true,
  },
})

const callHref = getCallHref()
</script>

<template>
  <div class="detail-copy">
    <div class="detail-heading-meta">
      <RoomReferenceBadge :room="room" />
      <p class="detail-kicker">{{ room.highlightLabel }}</p>
    </div>
    <component :is="headingTag">
      {{ room.title }}
    </component>

    <div class="detail-topline">
      <p class="dialog-price">{{ room.priceLabel }}</p>
      <span class="availability-pill glass-chip">{{ room.availabilityLabel }}</span>
    </div>

    <p class="detail-summary">
      {{ room.summary }}
    </p>

    <p class="detail-freshness">
      Availability last updated {{ room.availabilityUpdatedLabel }}
    </p>

    <dl class="spec-grid">
      <div>
        <dt>Occupancy</dt>
        <dd>{{ room.occupancyLabel }}</dd>
      </div>
      <div>
        <dt>Kitchen</dt>
        <dd>{{ room.kitchenLabel }}</dd>
      </div>
      <div>
        <dt>Washroom</dt>
        <dd>{{ room.washroomLabel }}</dd>
      </div>
      <div>
        <dt>Best for</dt>
        <dd>{{ room.bestFor }}</dd>
      </div>
    </dl>

    <div class="detail-block">
      <h3>Included in this stay</h3>
      <ul>
        <li
          v-for="item in room.included"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="detail-block">
      <h3>Ask before you visit</h3>
      <ul>
        <li
          v-for="item in nextQuestions"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div class="detail-actions">
      <RouterLink
        v-if="preview"
        class="button-primary"
        :to="room.detailsHref"
      >
        {{ siteConfig.uiText.actions.viewRoom }}
      </RouterLink>
      <a
        v-else
        class="button-primary"
        :href="messageHref"
        target="_blank"
        rel="noreferrer"
      >
        {{ siteConfig.uiText.actions.askOnWhatsApp }}
      </a>
      <a
        class="button-secondary"
        :href="preview ? messageHref : callHref"
        :target="preview ? '_blank' : undefined"
        :rel="preview ? 'noreferrer' : undefined"
      >
        {{ preview ? siteConfig.uiText.actions.askOnWhatsApp : siteConfig.uiText.actions.callCozyRooms }}
      </a>
    </div>

    <a
      v-if="preview"
      class="detail-link"
      :href="callHref"
    >
      {{ siteConfig.uiText.actions.callCozyRooms }}
    </a>
  </div>
</template>

<style scoped>
.detail-copy {
  display: grid;
  gap: 1rem;
}

.detail-kicker {
  color: var(--brand-strong);
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.detail-heading-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
}

.detail-copy :deep(h1),
.detail-copy :deep(h2) {
  color: var(--text-strong);
  font-size: clamp(2.15rem, 11vw, 4.25rem);
  line-height: 0.96;
  text-wrap: balance;
}

.detail-topline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.dialog-price {
  color: var(--text-strong);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.05em;
}

.availability-pill {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0.35rem 0.72rem;
  border: 1px solid rgba(44, 161, 142, 0.28);
  border-radius: 999px;
  background: rgba(121, 217, 202, 0.14);
  color: var(--brand-strong);
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.detail-summary {
  color: var(--text-strong);
  font-size: 1rem;
}

.detail-freshness {
  color: var(--muted);
  font-weight: 700;
}

.spec-grid {
  display: grid;
  gap: 0.75rem;
}

.spec-grid div,
.detail-block {
  padding: 0.9rem;
  border: 1px solid var(--paper-border-soft);
  border-radius: var(--radius-lg);
  background: var(--surface-field-fill);
  box-shadow: var(--shadow-field);
}

.spec-grid dt {
  margin-bottom: 0.3rem;
  color: var(--muted);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.spec-grid dd,
.detail-block li {
  margin: 0;
  color: var(--text-strong);
  font-weight: 700;
}

.detail-block {
  display: grid;
  gap: 0.65rem;
}

.detail-block ul {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding-left: 1rem;
}

.detail-actions {
  display: grid;
  gap: 0.7rem;
}

.detail-link {
  color: var(--text-strong);
  font-weight: 800;
}

@media (min-width: 960px) {
  .spec-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-actions {
    grid-template-columns: repeat(2, minmax(0, auto));
    align-items: center;
  }
}
</style>
