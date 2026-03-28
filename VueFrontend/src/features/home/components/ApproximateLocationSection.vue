<script setup>
import { computed } from 'vue'

const props = defineProps({
  site: {
    type: Object,
    required: true,
  },
})

const mapOpenUrl = computed(() =>
  props.site.localityPage?.mapUrl || `https://maps.google.com/?q=${encodeURIComponent(props.site.locationLabel)}`,
)

const mapPreviewSrc = computed(() => props.site.localityPage?.placeholderImagePath || '/location-placeholder-map.webp')

const mapPreviewAlt = computed(() =>
  props.site.localityPage?.placeholderImageAlt
  || 'Stylized approximate neighborhood map with a highlighted area pin.',
)

const mapHighlights = computed(() => [
  props.site.locationShort,
  'Google Maps area pin',
  'Exact building on enquiry',
])
</script>

<template>
  <section
    id="location"
    class="section-shell"
  >
    <div class="container location-shell">
      <article class="location-stage glass-panel-dark page-rise">
        <div class="location-grid">
          <div class="location-copy">
            <span class="eyebrow location-eyebrow">Approximate location</span>
            <h2>Check the area before you visit.</h2>
            <p>
              The map shows the wider Kakadeo area, not the exact building. We share the precise
              pin once you pick a room to discuss.
            </p>

            <div class="location-highlights">
              <span
                v-for="item in mapHighlights"
                :key="item"
                class="soft-chip glass-chip location-chip"
              >
                {{ item }}
              </span>
            </div>

            <div class="location-note">
              <span class="signal-pill">Area pin only</span>
              <p>Useful for commute checks, coaching-belt proximity, and nearby landmarks.</p>
            </div>
          </div>

          <a
            class="surface-panel location-map location-map-link page-rise-delay-1"
            :href="mapOpenUrl"
            target="_blank"
            rel="noreferrer"
            :aria-label="`Open approximate CozyRooms location in Google Maps for ${site.locationLabel}`"
          >
            <div class="location-map-head">
              <div class="location-map-copy">
                <span class="eyebrow map-panel-eyebrow">Google Maps</span>
                <p>{{ site.locationLabel }}</p>
              </div>

              <span class="location-map-badge">Approximate</span>
            </div>

            <div class="location-frame">
              <img
                class="location-map-image"
                :src="mapPreviewSrc"
                :alt="mapPreviewAlt"
                width="2752"
                height="1536"
                loading="lazy"
                decoding="async"
              >
              <div class="location-map-overlay">
                <span class="map-placeholder-kicker">Approximate area only</span>
                <strong>Open in Google Maps</strong>
                <small>Tap the card to check commute, coaching belt, and nearby landmarks.</small>
              </div>
            </div>

            <p class="location-map-note">
              Area only. Exact pin shared once you pick a room.
            </p>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.location-shell {
  position: relative;
}

.location-stage {
  position: relative;
  overflow: hidden;
  padding: 1.15rem;
}

.location-stage::before {
  position: absolute;
  inset: auto auto -2.6rem -2rem;
  width: 10rem;
  height: 10rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 122, 26, 0.22), transparent 68%);
  content: '';
  pointer-events: none;
}

.location-stage::after {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 100% 0%, rgba(121, 217, 202, 0.1), transparent 26%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04), transparent 34%);
  content: '';
  pointer-events: none;
}

.location-grid {
  display: grid;
  gap: 1rem;
}

.location-copy {
  position: relative;
  display: grid;
  gap: 0.95rem;
}

.location-eyebrow {
  border-color: rgba(255, 211, 142, 0.28);
  background:
    linear-gradient(180deg, rgba(255, 211, 142, 0.18), rgba(255, 211, 142, 0.06)),
    rgba(255, 122, 26, 0.08);
  color: #ffe0bc;
}

.location-copy h2,
.location-copy p {
  position: relative;
  color: var(--text-inverse);
}

.location-copy p {
  max-width: 32rem;
  color: var(--muted-inverse);
}

.location-highlights {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.location-chip {
  border-color: var(--glass-stroke-light);
  background: var(--glass-fill-light);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 8px 18px rgba(0, 0, 0, 0.14);
  color: var(--text-inverse);
}

.location-note {
  position: relative;
  display: grid;
  gap: 0.55rem;
  padding: 0.95rem;
  border: 1px solid var(--glass-stroke-light);
  border-radius: var(--radius-lg);
  background: var(--glass-fill-light);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.location-note .signal-pill {
  border-color: rgba(255, 211, 142, 0.2);
  background: rgba(255, 211, 142, 0.12);
  color: #fff0d4;
}

.location-map {
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.85rem;
  padding: 0.95rem;
  border: 1px solid rgba(121, 217, 202, 0.16);
  background:
    linear-gradient(180deg, rgba(249, 252, 255, 0.98), rgba(238, 246, 250, 0.96));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.68),
    0 24px 44px rgba(5, 14, 24, 0.22);
}

.location-map-link {
  text-decoration: none;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.location-map-link:hover {
  transform: translateY(-2px);
  border-color: rgba(121, 217, 202, 0.24);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.68),
    0 30px 54px rgba(5, 14, 24, 0.26);
}

.location-map-link:focus-visible {
  outline: 3px solid rgba(255, 122, 26, 0.28);
  outline-offset: 4px;
}

.location-map-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.8rem;
}

.location-map-copy {
  display: grid;
  gap: 0.45rem;
}

.location-map-copy p {
  color: var(--text-strong);
  font-weight: 800;
}

.map-panel-eyebrow {
  border-color: rgba(255, 122, 26, 0.18);
  background: rgba(255, 122, 26, 0.08);
  color: var(--accent-deep);
}

.location-map-badge {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.42rem 0.78rem;
  border: 1px solid rgba(11, 23, 32, 0.1);
  border-radius: 999px;
  background: rgba(11, 23, 32, 0.04);
  color: var(--muted);
  font-size: var(--text-kicker);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.location-frame {
  position: relative;
  overflow: hidden;
  min-height: 17rem;
  border: 1px solid rgba(11, 23, 32, 0.08);
  border-radius: var(--radius-lg) var(--radius-lg) var(--radius-md) var(--radius-md);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.location-map-image,
.location-map-overlay {
  width: 100%;
  min-height: 17rem;
}

.location-map-image {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 17rem;
  object-fit: cover;
  transform: scale(1.01);
  transition:
    transform 0.22s ease,
    filter 0.22s ease;
}

.location-map-link:hover .location-map-image,
.location-map-link:focus-visible .location-map-image {
  transform: scale(1.04);
  filter: saturate(1.04) contrast(1.02);
}

.location-map-overlay {
  position: absolute;
  inset: 0;
  display: grid;
  align-content: end;
  gap: 0.45rem;
  padding: 1.15rem;
  background:
    linear-gradient(180deg, rgba(7, 18, 26, 0.06), rgba(7, 18, 26, 0.16) 45%, rgba(7, 18, 26, 0.78)),
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.16), transparent 24%);
  color: var(--text-inverse);
  text-align: left;
}

.map-placeholder-kicker {
  color: #fff0d4;
  font-size: var(--text-kicker);
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.location-map-overlay strong {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.55rem, 6vw, 2.35rem);
  line-height: 0.98;
  letter-spacing: -0.05em;
}

.location-map-overlay small {
  max-width: 24rem;
  color: rgba(236, 246, 252, 0.86);
  font-size: var(--text-meta);
  font-weight: 700;
}

.location-map-note {
  margin: 0;
  color: var(--muted);
  font-size: 0.92rem;
}

@media (min-width: 960px) {
  .location-grid {
    grid-template-columns: minmax(0, 0.92fr) minmax(22rem, 0.88fr);
    grid-template-areas: 'copy map';
    align-items: stretch;
  }

  .location-stage {
    padding: 1.25rem;
  }

  .location-copy {
    grid-area: copy;
    padding: 0.2rem 0;
  }

  .location-map {
    grid-area: map;
    padding: 1rem;
  }

  .location-frame,
  .location-map-image,
  .location-map-overlay {
    min-height: 21rem;
  }
}
</style>
