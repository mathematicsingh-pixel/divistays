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
  || 'Stylized exact neighborhood map with a highlighted building pin.',
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
  <secti  <secti  <secti on"
    clas    clas    clas    clas    clasn"    clas    clas    clas    clas    clasn"    clas    clas    clas    clas    clasn"    clas    clas    clas     class="location-grid">
          <div class="location-copy">
            <span class="label-upper location-eyebrow">Rooms for rent in Kakadeo</span>
            <h            <h            <h            <h   at            <h            <h            <h            <h   at          , Kakadeo makes sense. It is one o            <h            <hstricts, with Rawatpur Metro nearby for longer journeys.
            </p>

            <ol class="location-reasons">
              <li
                                             ad                                             ad                                             ad                 ex">{{ String(index + 1).padStart(2, '0') }}</span>
                <div>
                  <h3>{{ reason.title }}</h3>
                  <p>{{ reason.body }}</p>
                </d                  </li                </d                          </d                  </li                </d                          </d                  </li                </d                          </d                 en                </d                 le                </d                  </li                </d                          
              <img
                class="location-map-image"
                :src="mapPreviewSrc"
                :alt="mapPreviewAlt"
                width="2752"
                height="1536"
                loading="lazy"
                decoding="async"
                                                   v                 ma                                                   v                 ma                                                   v                 ma                                                   v              location for Kakadeo.</s                                         <span                   p-action">Open Google Maps ↗</span>
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
  gap: va  gap: va  gap: va  gap: va  gap:ow {  gap: va  gap: va  gap:verse);
}

.location-copy h2,
.location-copy h3,
.location-copy p {
  color: var(--text-inverse);
}

.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.l.12.l.l.l.l.l.l.l.l.l.in.l.l.l.l.l..locatio.lreason-index {
  min-width: 1.75rem;
  color:  color: ce  color:  c-s  colvar(--text-label);
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.5;
}

.location-reasons div {
  display: grid;
  display: grid;ce  display: grid;ce-r  display: grid;ce  displ1rem;
}

.location-reasons p {
  color: var(--muted-inverse);
  font-size: 0.875rem;
}

.location-map-link {
  display: grid;  display: grid;  display: grid;  display: grid;  display: grid;  display: gration: none;
}

.locati.locati.locati.lo-visible {
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
}

.location-map-action {
  color: var(--sun);
  font-weight: 600;
}
</style>
