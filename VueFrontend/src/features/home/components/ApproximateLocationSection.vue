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

const kakadeoReasons = [
  {
    title: 'Coaching is local',
    body: 'Kakadeo draws thousands of students to its entrance-exam institutes, so living here can cut the cross-city trip to class.',
  },
  {
    title: 'The Metro is useful',
    body: 'Nearby Rawatpur connects directly toward IIT Kanpur, Motijheel, the city centre and Kanpur Central.',
  },
  {
    title: 'Check your actual route',
    body: 'Use the area map to compare the room with your coaching centre, college or workplace before you arrange a visit.',
  },
]
</script>

<template>
  <section
    id="location"
    class="section-shell location-section"
  >
    <div class="container location-shell">
      <article class="location-stage surface-dark">
        <div class="location-grid">
          <div class="location-copy">
            <span class="label-upper location-eyebrow">Rooms for rent in Kakadeo</span>
            <h2>Why Kakadeo?</h2>
            <p class="location-intro">
              If your day revolves around classes and study, Kakadeo makes sense. It is one of
              Kanpur's major coaching districts, with Rawatpur Metro nearby for longer journeys.
            </p>

            <ol class="location-reasons">
              <li
                v-for="(reason, index) in kakadeoReasons"
                :key="reason.title"
              >
                <span class="location-reason-index">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                  <h3>{{ reason.title }}</h3>
                  <p>{{ reason.body }}</p>
                </div>
              </li>
            </ol>
          </div>

          <a
            class="location-map-link"
            :href="mapOpenUrl"
            target="_blank"
            rel="noreferrer"
            :aria-label="`Open approximate ${site.name} location in Google Maps for ${site.locationLabel}`"
          >
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
            </div>

            <div class="location-map-caption">
              <div>
                <span class="label-upper">Plan from Kakadeo</span>
                <p>See your route before you visit</p>
                <small>Public map shows the neighbourhood. Exact pin shared after enquiry.</small>
              </div>
              <span class="location-map-action">Open Google Maps ↗</span>
            </div>
          </a>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.location-section {
  padding-bottom: var(--section-space);
}

.location-shell {
  position: relative;
}

.location-stage {
  overflow: hidden;
  padding: var(--space-lg);
}

.location-grid {
  display: grid;
  gap: var(--space-xl);
}

.location-copy {
  display: grid;
  align-content: start;
  gap: var(--space-md);
}

.location-eyebrow {
  color: var(--muted-inverse);
}

.location-copy h2,
.location-copy h3,
.location-copy p {
  color: var(--text-inverse);
}

.location-copy h2 {
  max-width: 12ch;
}

.location-copy .location-intro {
  max-width: 32rem;
  color: var(--muted-inverse);
}

.location-reasons {
  display: grid;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line-inverse);
  list-style: none;
}

.location-reasons li {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-md);
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--line-inverse);
}

.location-reason-index {
  min-width: 1.75rem;
  color: var(--accent);
  font-size: var(--text-label);
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.5;
}

.location-reasons div {
  display: grid;
  gap: var(--space-xs);
}

.location-reasons h3 {
  font-size: 1rem;
}

.location-reasons p {
  color: var(--muted-inverse);
  font-size: 0.875rem;
}

.location-map-link {
  display: grid;
  align-content: start;
  gap: var(--space-md);
  min-width: 0;
  text-decoration: none;
}

.location-map-link:focus-visible {
  outline-color: var(--sun);
  outline-offset: var(--space-sm);
}

.location-frame {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  border: 1px solid var(--line-inverse);
  border-radius: var(--radius-md);
}

.location-map-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.22s ease;
}

.location-map-caption {
  display: grid;
  gap: var(--space-md);
  color: var(--text-inverse);
}

.location-map-caption > div {
  display: grid;
  gap: var(--space-xs);
  min-width: 0;
}

.location-map-caption .label-upper {
  color: var(--muted-inverse);
}

.location-map-caption p {
  font-weight: 700;
}

.location-map-caption small {
  max-width: 30rem;
  color: var(--muted-inverse);
  font-size: 0.75rem;
  line-height: 1.5;
}

.location-map-action {
  flex: 0 0 auto;
  color: var(--accent);
  font-size: 0.875rem;
  font-weight: 700;
}

@media (hover: hover) {
  .location-map-link:hover .location-map-image {
    transform: scale(1.015);
  }

  .location-map-link:hover .location-map-action {
    color: var(--text-inverse);
  }
}

@media (min-width: 640px) {
  .location-stage {
    padding: var(--space-xl);
  }

  .location-frame {
    aspect-ratio: 16 / 10;
  }

  .location-map-caption {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
}

@media (min-width: 960px) {
  .location-grid {
    grid-template-columns: minmax(20rem, 0.9fr) minmax(24rem, 1.1fr);
    align-items: center;
    gap: var(--space-2xl);
  }

  .location-stage {
    padding: var(--space-2xl);
  }
}
</style>
