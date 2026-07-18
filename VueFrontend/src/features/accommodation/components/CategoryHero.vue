<script setup>
import BreadcrumbNav from '@/features/site/components/BreadcrumbNav.vue'
import ResponsiveImage from '@/shared/ui/ResponsiveImage.vue'

defineProps({
  page: {
    type: Object,
    required: true,
  },
  room: {
    type: Object,
    required: true,
  },
  stats: {
    type: Object,
    required: true,
  },
  updatedLabel: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="category-hero">
    <div class="container category-hero-shell">
      <BreadcrumbNav
        class="category-breadcrumb page-rise"
        inverse
        :items="[
          { label: 'Home', to: '/' },
          { label: 'Rooms', to: '/rooms' },
          { label: page.shortLabel },
        ]"
      />

      <div class="category-hero-grid">
        <div class="category-hero-copy page-rise">
          <span class="label-upper category-eyebrow">{{ page.eyebrow }}</span>
          <h1>{{ page.heroTitle }}</h1>
          <p class="category-lead">{{ page.heroLead }}</p>

          <div class="category-actions">
            <a
              class="button-primary action-glow"
              href="#category-rooms"
            >
              See {{ stats.availableCount }} available {{ stats.availableCount === 1 ? 'room' : 'rooms' }}
            </a>
            <RouterLink
              class="button-secondary"
              to="/rooms"
            >
              Compare every room
            </RouterLink>
          </div>

          <dl class="category-register" aria-label="Current category facts">
            <div>
              <dt>Available now</dt>
              <dd>{{ stats.availableCount }} of {{ stats.totalCount }}</dd>
            </div>
            <div>
              <dt>Monthly rent</dt>
              <dd>From {{ stats.startingPriceLabel }}</dd>
            </div>
            <div>
              <dt>Area</dt>
              <dd>Kakadeo, Kanpur</dd>
            </div>
            <div>
              <dt>Availability checked</dt>
              <dd>{{ updatedLabel }}</dd>
            </div>
          </dl>
        </div>

        <RouterLink
          class="category-hero-room page-rise-delay-1"
          :to="room.detailsHref"
          :aria-label="`Open ${room.title}, ${room.priceLabel}`"
        >
          <div class="category-hero-media">
            <ResponsiveImage
              :room-slug="room.slug"
              :media="room.gallery[0]"
              eager
              sizes="(min-width: 960px) 46vw, 100vw"
            />
          </div>

          <div class="category-room-caption">
            <span>
              <small>{{ room.referenceLabel }} · real listing</small>
              <strong>{{ room.title }}</strong>
            </span>
            <span>
              <strong>{{ room.priceLabel }}</strong>
              <small>{{ room.availabilityShortLabel }}</small>
            </span>
            <span class="category-room-arrow" aria-hidden="true">→</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-hero {
  overflow: hidden;
  padding: var(--space-md) 0 var(--space-2xl);
  background: var(--bg);
  color: var(--text-inverse);
}

.category-hero-shell,
.category-hero-copy {
  display: grid;
}

.category-hero-shell {
  gap: var(--space-xl);
}

.category-breadcrumb {
  padding-top: var(--space-sm);
}

.category-hero-grid {
  display: grid;
  gap: var(--space-2xl);
}

.category-hero-copy {
  align-content: start;
  gap: var(--space-lg);
}

.category-eyebrow {
  color: var(--brand);
}

.category-hero-copy h1 {
  max-width: 11ch;
  color: var(--text-inverse);
}

.category-lead {
  max-width: 38rem;
  color: var(--muted-inverse);
  font-size: clamp(1.05rem, 2vw, 1.25rem);
}

.category-actions {
  display: grid;
  gap: var(--space-sm);
}

.category-actions .button-secondary {
  border-color: var(--line-inverse);
  background: transparent;
  color: var(--text-inverse);
}

.category-register {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: var(--space-sm) 0 0;
  border-top: 1px solid var(--line-inverse);
}

.category-register > div {
  display: grid;
  align-content: start;
  gap: var(--space-xs);
  min-width: 0;
  padding: var(--space-md) var(--space-sm) var(--space-md) 0;
  border-bottom: 1px solid var(--line-inverse);
}

.category-register dt {
  color: var(--muted-inverse);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.category-register dd {
  margin: 0;
  color: var(--text-inverse);
  font-size: 0.875rem;
  font-weight: 700;
}

.category-hero-room {
  display: grid;
  align-content: start;
  min-width: 0;
  border-top: 1px solid var(--line-inverse);
  border-bottom: 1px solid var(--line-inverse);
}

.category-hero-media {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--bg-soft);
}

.category-hero-media :deep(picture),
.category-hero-media :deep(img) {
  width: 100%;
  height: 100%;
}

.category-hero-media :deep(img) {
  transition: transform 360ms cubic-bezier(0.2, 0.75, 0.24, 1);
}

.category-room-caption {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  align-items: center;
  gap: var(--space-md);
  min-height: 6rem;
  padding-block: var(--space-md);
}

.category-room-caption > span:not(.category-room-arrow) {
  display: grid;
  gap: var(--space-xs);
}

.category-room-caption > span:nth-child(2) {
  text-align: right;
}

.category-room-caption strong {
  color: var(--text-inverse);
  font-size: 0.875rem;
}

.category-room-caption small {
  color: var(--muted-inverse);
  font-size: 0.75rem;
  font-weight: 600;
}

.category-room-arrow {
  color: var(--accent);
  font-size: 1.5rem;
  transition: transform 160ms ease;
}

@media (hover: hover) {
  .category-hero-room:hover .category-hero-media :deep(img) {
    transform: scale(1.02);
  }

  .category-hero-room:hover .category-room-arrow {
    transform: translateX(var(--space-xs));
  }
}

@media (min-width: 640px) {
  .category-actions {
    grid-template-columns: repeat(2, max-content);
  }
}

@media (min-width: 960px) {
  .category-hero {
    padding: var(--space-lg) 0 clamp(4rem, 7vw, 6rem);
  }

  .category-hero-grid {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: center;
    gap: clamp(3rem, 7vw, 6rem);
  }

  .category-register {
    max-width: 36rem;
  }

  .category-hero-media {
    aspect-ratio: 4 / 4.25;
  }
}
</style>
