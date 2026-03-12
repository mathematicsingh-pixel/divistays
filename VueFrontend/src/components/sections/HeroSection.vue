<script setup>
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

defineProps({
  featuredRooms: {
    type: Array,
    required: true,
  },
  stats: {
    type: Array,
    required: true,
  },
  site: {
    type: Object,
    required: true,
  },
  startingPriceLabel: {
    type: String,
    required: true,
  },
  callHref: {
    type: String,
    required: true,
  },
  whatsappHref: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="hero-shell">
    <div class="container hero-grid">
      <div class="hero-copy surface-panel">
        <div class="hero-kicker-row">
          <span class="eyebrow">{{ site.heroLabel }}</span>
          <span class="hero-location">{{ site.locationShort }}</span>
        </div>

        <h1>{{ site.heroTitle }}</h1>
        <p class="hero-summary">
          {{ site.heroSummary }}
        </p>

        <div class="hero-badges">
          <span class="soft-chip">From {{ startingPriceLabel }}</span>
          <span class="soft-chip">{{ site.audienceLabel }}</span>
          <span class="soft-chip">WiFi-ready enquiry</span>
        </div>

        <div class="hero-actions">
          <a
            class="button-primary"
            :href="callHref"
          >
            Call now
          </a>
          <a
            class="button-secondary"
            :href="whatsappHref"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
          <a
            class="button-tertiary"
            href="#rooms"
          >
            Browse rooms
          </a>
        </div>

        <dl class="hero-stats">
          <div
            v-for="stat in stats"
            :key="stat.label"
          >
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="hero-media">
        <article
          v-for="(room, index) in featuredRooms"
          :key="room.slug"
          class="preview-card surface-panel"
          :class="`preview-card-${index + 1}`"
        >
          <div class="preview-image">
            <ResponsiveImage
              :room-slug="room.slug"
              :media="room.gallery[0]"
              :eager="index === 0"
              sizes="(min-width: 1024px) 22vw, 70vw"
            />
          </div>
          <div class="preview-copy">
            <p>{{ room.title }}</p>
            <span>{{ room.highlightLabel }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-shell {
  padding-top: 1.5rem;
}

.hero-grid {
  display: grid;
  gap: 1.25rem;
}

.hero-copy {
  position: relative;
  overflow: hidden;
  padding: 1.25rem;
}

.hero-copy::after {
  position: absolute;
  inset: auto -10% -30% auto;
  width: 12rem;
  height: 12rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(188, 106, 79, 0.24), transparent 68%);
  content: '';
  pointer-events: none;
}

.hero-kicker-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
}

.hero-location {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--muted);
  font-size: 0.88rem;
}

.hero-summary {
  max-width: 32rem;
  margin: 1rem 0 0;
  color: var(--muted);
  font-size: 1.02rem;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.button-tertiary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.25rem;
  padding: 0.8rem 1.15rem;
  color: var(--text-strong);
  font-weight: 600;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1.5rem 0 0;
}

.hero-stats div:last-child {
  grid-column: 1 / -1;
}

.hero-stats div {
  padding: 0.9rem;
  border: 1px solid rgba(20, 32, 36, 0.1);
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.7);
}

.hero-stats dt {
  margin: 0;
  color: var(--muted);
  font-size: 0.8rem;
}

.hero-stats dd {
  margin: 0.35rem 0 0;
  color: var(--text-strong);
  font-size: 1rem;
  font-weight: 700;
}

.hero-media {
  display: grid;
  gap: 0.85rem;
}

.preview-card {
  display: grid;
  grid-template-columns: 6rem 1fr;
  gap: 0.8rem;
  align-items: center;
  padding: 0.7rem;
}

.preview-card-2 {
  margin-left: 1.25rem;
}

.preview-card-3 {
  margin-left: 2.4rem;
}

.preview-image {
  overflow: hidden;
  border-radius: 1rem;
  aspect-ratio: 1 / 1;
}

.preview-copy p {
  margin: 0;
  color: var(--text-strong);
  font-weight: 700;
}

.preview-copy span {
  display: inline-block;
  margin-top: 0.3rem;
  color: var(--muted);
  font-size: 0.88rem;
}

@media (min-width: 960px) {
  .hero-shell {
    padding-top: 2rem;
  }

  .hero-grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(22rem, 0.85fr);
    align-items: end;
  }

  .hero-copy {
    padding: 1.75rem;
  }

  .hero-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .hero-stats div:last-child {
    grid-column: auto;
  }

  .hero-media {
    align-self: stretch;
  }

  .preview-card {
    grid-template-columns: minmax(0, 1fr);
    padding: 0.8rem;
  }

  .preview-card-1 {
    transform: translateY(1rem);
  }

  .preview-card-2 {
    margin-left: 4rem;
  }

  .preview-card-3 {
    margin-left: 8rem;
    transform: translateY(-1rem);
  }

  .preview-image {
    aspect-ratio: 5 / 4;
  }
}
</style>
