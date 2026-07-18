<script setup>
import { computed, ref, watch } from 'vue'
import { getRoomCategoryPage } from '@/features/accommodation/model/category-catalog'
import { buildVideoPath, buildVideoPosterPath } from '@/features/rooms'
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
  visitNotes: {
    type: Array,
    required: true,
  },
  messageHref: {
    type: String,
    required: true,
  },
})

const callHref = getCallHref()
const isVideoReady = ref(false)
const categoryPage = computed(() => getRoomCategoryPage(props.room))

watch(
  () => props.room.slug,
  () => {
    isVideoReady.value = false
  },
  { immediate: true },
)
</script>

<template>
  <div class="detail-copy">
    <header class="detail-header">
      <div class="detail-heading-meta">
        <RoomReferenceBadge :room="room" />
        <p class="label-upper">{{ room.highlightLabel }}</p>
      </div>

      <component :is="headingTag">
        {{ room.title }}
      </component>

      <div class="detail-price-row">
        <div>
          <span>Monthly rent</span>
          <p>{{ room.priceLabel }}</p>
        </div>

        <p
          class="availability-status"
          :class="{ 'availability-status--occupied': !room.available }"
        >
          <span aria-hidden="true" />
          {{ room.availabilityLabel }}
        </p>
      </div>

      <p class="detail-summary">
        {{ room.summary }}
      </p>

      <p class="detail-location">
        Furnished room in {{ siteConfig.locationShort }}
      </p>

      <RouterLink
        v-if="categoryPage"
        class="detail-category-link"
        :to="categoryPage.path"
      >
        {{ categoryPage.label }}
        <span aria-hidden="true">→</span>
      </RouterLink>

      <p class="detail-freshness">
        Availability updated {{ room.availabilityUpdatedLabel }}
      </p>
    </header>

    <section
      class="detail-section"
      :aria-labelledby="`${room.slug}-facts-title`"
    >
      <h3 :id="`${room.slug}-facts-title`">Room facts</h3>

      <dl class="detail-facts">
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
    </section>

    <section
      class="detail-section"
      :aria-labelledby="`${room.slug}-included-title`"
    >
      <h3 :id="`${room.slug}-included-title`">Furniture and facilities</h3>
      <ul class="detail-list detail-list--included">
        <li
          v-for="item in room.included"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </section>

    <section
      class="detail-section"
      :aria-labelledby="`${room.slug}-visit-title`"
    >
      <h3 :id="`${room.slug}-visit-title`">Before you visit</h3>
      <ul class="detail-list">
        <li
          v-for="item in visitNotes"
          :key="item"
        >
          {{ item }}
        </li>
      </ul>
    </section>

    <section
      v-if="room.video"
      class="detail-section video-section"
      :aria-labelledby="`${room.slug}-video-title`"
    >
      <div class="video-heading">
        <p class="label-upper">Walkthrough</p>
        <h3 :id="`${room.slug}-video-title`">{{ room.video.label }}</h3>
      </div>

      <button
        v-if="!isVideoReady"
        class="video-trigger"
        type="button"
        :aria-label="`Play ${room.video.label}`"
        @click="isVideoReady = true"
      >
        <img
          :src="buildVideoPosterPath(room.slug, room.video.key)"
          alt=""
          width="480"
          height="850"
          loading="lazy"
          decoding="async"
        >
        <span class="video-control">
          <span aria-hidden="true">▶</span>
          Play walkthrough
        </span>
      </button>

      <video
        v-else
        controls
        playsinline
        preload="metadata"
        :poster="buildVideoPosterPath(room.slug, room.video.key)"
      >
        <source
          :src="buildVideoPath(room.slug, room.video.key)"
          type="video/mp4"
        >
        Your browser does not support the walkthrough video.
      </video>
    </section>

    <div class="detail-actions">
      <RouterLink
        v-if="preview"
        class="button-primary action-glow"
        :to="room.detailsHref"
      >
        {{ siteConfig.uiText.actions.viewRoom }}
      </RouterLink>
      <a
        v-else
        class="button-primary action-glow"
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
        {{ preview ? siteConfig.uiText.actions.askOnWhatsApp : siteConfig.uiText.actions.callDirect }}
      </a>

      <a
        v-if="preview"
        class="button-tertiary"
        :href="callHref"
      >
        {{ siteConfig.uiText.actions.callDirect }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.detail-copy {
  display: grid;
  gap: var(--space-xl);
  padding: var(--space-md);
}

.detail-header {
  display: grid;
  gap: var(--space-md);
}

.detail-heading-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-sm);
}

.detail-heading-meta .label-upper {
  color: var(--brand-strong);
}

.detail-copy :deep(h1),
.detail-copy :deep(h2) {
  max-width: 12ch;
  color: var(--text-strong);
  font-size: clamp(2.35rem, 11vw, 4.25rem);
  line-height: 0.98;
}

.detail-price-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-md);
  padding-block: var(--space-md);
  border-block: 1px solid var(--line);
}

.detail-price-row > div {
  display: grid;
  gap: var(--space-xs);
}

.detail-price-row > div > span {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.detail-price-row > div > p {
  color: var(--text-strong);
  font-size: clamp(1.45rem, 6vw, 2rem);
  font-weight: 700;
  line-height: 1.15;
}

.availability-status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--brand-strong);
  font-size: 0.875rem;
  font-weight: 700;
}

.availability-status > span {
  width: var(--space-sm);
  height: var(--space-sm);
  border-radius: var(--radius-full);
  background: var(--brand-strong);
}

.availability-status--occupied {
  color: var(--muted);
}

.availability-status--occupied > span {
  background: var(--muted);
}

.detail-summary {
  max-width: 56ch;
  color: var(--text-strong);
  font-size: 1.0625rem;
}

.detail-location {
  width: fit-content;
  padding-top: var(--space-sm);
  border-top: 1px solid var(--line);
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 700;
}

.detail-category-link {
  display: inline-flex;
  width: fit-content;
  min-height: 2.75rem;
  align-items: center;
  gap: var(--space-sm);
  color: var(--accent-deep);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: var(--space-xs);
}

.detail-category-link span {
  transition: transform 160ms ease;
}

.detail-freshness {
  color: var(--muted);
  font-size: 0.875rem;
  font-weight: 600;
}

@media (hover: hover) {
  .detail-category-link:hover {
    text-decoration-color: currentColor;
  }

  .detail-category-link:hover span {
    transform: translateX(var(--space-xs));
  }
}

.detail-section {
  display: grid;
  gap: var(--space-md);
}

.detail-facts {
  margin: 0;
  border-top: 1px solid var(--line);
}

.detail-facts > div {
  display: grid;
  grid-template-columns: minmax(6.5rem, 0.7fr) minmax(0, 1.3fr);
  gap: var(--space-md);
  padding-block: var(--space-md);
  border-bottom: 1px solid var(--line);
}

.detail-facts dt {
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.detail-facts dd {
  margin: 0;
  color: var(--text-strong);
  font-weight: 600;
}

.detail-list {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
  list-style: none;
}

.detail-list li {
  position: relative;
  padding: var(--space-md) 0 var(--space-md) var(--space-lg);
  border-bottom: 1px solid var(--line);
  color: var(--text-strong);
  font-weight: 600;
}

.detail-list li::before {
  position: absolute;
  top: var(--space-md);
  left: 0;
  color: var(--muted);
  content: '—';
}

.detail-list--included li::before {
  color: var(--brand-strong);
  content: '✓';
}

.video-heading {
  display: grid;
  gap: var(--space-xs);
}

.video-heading .label-upper {
  color: var(--brand-strong);
}

.video-trigger,
.video-section video {
  width: min(100%, 24rem);
  aspect-ratio: 9 / 16;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--bg);
}

.video-trigger {
  position: relative;
}

.video-trigger img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-section video {
  height: auto;
  object-fit: contain;
}

.video-control {
  position: absolute;
  right: var(--space-md);
  bottom: var(--space-md);
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 2.75rem;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  background: var(--paper);
  color: var(--text-strong);
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

.detail-actions {
  display: grid;
  gap: var(--space-sm);
  padding-top: var(--space-md);
  border-top: 1px solid var(--line);
}

@media (min-width: 600px) {
  .detail-list--included {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-list--included li:nth-child(odd) {
    padding-right: var(--space-md);
  }

  .detail-list--included li:nth-child(even) {
    padding-left: calc(var(--space-lg) + var(--space-md));
  }

  .detail-list--included li:nth-child(even)::before {
    left: var(--space-md);
  }
}

@media (min-width: 760px) {
  .detail-copy {
    padding: 0;
  }

  .detail-actions {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .detail-actions .button-tertiary {
    grid-column: 1 / -1;
  }
}
</style>
