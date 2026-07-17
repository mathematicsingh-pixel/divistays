<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BrandMark from '@/features/site/components/brand/BrandMark.vue'

const props = defineProps({
  site: {
    type: Object,
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
  rooms: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['visibility-change'])
const route = useRoute()
const footerRef = ref(null)

const availableRooms = computed(() => props.rooms.filter((room) => room.available !== false))
const registerRooms = computed(() =>
  availableRooms.value
    .filter((room) => room.detailsHref !== route.path)
    .slice(0, 3),
)
const availabilityCount = computed(() => availableRooms.value.length)
const availabilityCountDisplay = computed(() => String(availabilityCount.value).padStart(2, '0'))
const availabilityLabel = computed(() =>
  `${availabilityCount.value} ${availabilityCount.value === 1 ? 'room' : 'rooms'} available to visit`,
)
const phoneLabel = computed(() => {
  const digits = String(props.site.phoneDisplay || '').replace(/\D/g, '')

  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  }

  return props.site.phoneDisplay
})

let visibilityObserver

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    return
  }

  visibilityObserver = new IntersectionObserver(
    ([entry]) => emit('visibility-change', entry.isIntersecting),
    { threshold: 0.04 },
  )

  if (footerRef.value) {
    visibilityObserver.observe(footerRef.value)
  }
})

onBeforeUnmount(() => {
  visibilityObserver?.disconnect()
})
</script>

<template>
  <footer
    id="site-footer"
    ref="footerRef"
    class="site-footer"
    aria-labelledby="footer-title"
  >
    <div class="container footer-layout">
      <section class="footer-lead">
        <RouterLink
          class="footer-brand-link"
          to="/"
          aria-label="DiviStays home"
        >
          <BrandMark
            inverted
            compact
          />
        </RouterLink>

        <p class="label-upper footer-kicker">The room register</p>
        <h2 id="footer-title">{{ site.uiText.footer.headline }}</h2>
        <p class="footer-descriptor">{{ site.footerDescriptor }}</p>
      </section>

      <section
        v-if="registerRooms.length"
        class="footer-register"
        aria-labelledby="footer-register-title"
      >
        <div class="footer-register-head">
          <div class="footer-register-heading">
            <p class="footer-availability" :aria-label="availabilityLabel">
              <span aria-hidden="true" />
              Available to visit
            </p>
            <h3 id="footer-register-title">Open room register</h3>
          </div>

          <p class="footer-register-count" aria-hidden="true">
            {{ availabilityCountDisplay }}
          </p>
        </div>

        <ol class="footer-room-list">
          <li
            v-for="room in registerRooms"
            :key="room.slug"
          >
            <RouterLink
              class="footer-room-link"
              :to="room.detailsHref"
              :aria-label="`${room.title}, ${room.referenceLabel}, ${room.priceLabel}`"
            >
              <span class="footer-room-code" aria-hidden="true">{{ room.referenceCode }}</span>
              <span class="footer-room-copy">
                <span class="footer-room-reference">{{ room.referenceLabel }}</span>
                <strong>{{ room.title }}</strong>
              </span>
              <span class="footer-room-price">{{ room.priceLabel }}</span>
              <span class="footer-room-arrow" aria-hidden="true">→</span>
            </RouterLink>
          </li>
        </ol>

        <RouterLink
          class="footer-all-rooms"
          to="/rooms"
        >
          Compare every room
          <span aria-hidden="true">→</span>
        </RouterLink>
      </section>

      <div class="footer-utility">
        <nav
          class="footer-nav"
          aria-labelledby="footer-nav-title"
        >
          <h3 id="footer-nav-title">Explore</h3>
          <ul>
            <li><RouterLink to="/rooms">All rooms</RouterLink></li>
            <li><RouterLink :to="{ path: '/', hash: '#location' }">Location</RouterLink></li>
            <li><RouterLink :to="{ path: '/', hash: '#faqs' }">FAQs</RouterLink></li>
          </ul>
        </nav>

        <address class="footer-contact">
          <h3>Direct contact</h3>
          <ul>
            <li>
              <a :href="callHref">Call {{ phoneLabel }}</a>
            </li>
            <li>
              <a
                :href="whatsappHref"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp DiviStays (opens in a new tab)"
              >
                WhatsApp DiviStays
              </a>
            </li>
          </ul>
        </address>
      </div>

      <div class="footer-base">
        <p>© {{ site.name }}</p>
        <p>Photos, rent and facilities on every listing.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  margin-top: var(--space-xl);
  overflow: clip;
  padding-block: var(--space-2xl) calc(var(--space-2xl) + env(safe-area-inset-bottom));
  background: var(--bg);
  color: var(--muted-inverse);
}

.footer-layout {
  display: grid;
  gap: var(--space-2xl);
}

.footer-lead {
  display: grid;
  justify-items: start;
  gap: var(--space-md);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--line-inverse);
}

.footer-brand-link {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
}

.footer-kicker {
  margin-top: var(--space-sm);
  color: var(--brand);
}

.footer-lead h2 {
  max-width: 12ch;
  color: var(--text-inverse);
  font-size: clamp(2.5rem, 8vw, 3.75rem);
}

.footer-descriptor {
  max-width: 31rem;
  color: var(--muted-inverse);
  font-size: 1rem;
}

.footer-register {
  border-top: 1px solid var(--line-inverse);
  border-bottom: 1px solid var(--line-inverse);
}

.footer-register-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: var(--space-md);
  min-height: 8.5rem;
  padding-block: var(--space-lg);
}

.footer-register-heading {
  display: grid;
  gap: var(--space-sm);
}

.footer-register-heading h3,
.footer-nav h3,
.footer-contact h3 {
  color: var(--text-inverse);
}

.footer-availability {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: var(--space-sm);
  color: var(--brand);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.footer-availability span {
  width: var(--space-sm);
  height: var(--space-sm);
  border-radius: var(--radius-full);
  background: var(--brand);
}

.footer-register-count {
  color: var(--line-inverse);
  font-size: clamp(3.5rem, 17vw, 6rem);
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  line-height: 0.72;
}

.footer-room-list,
.footer-nav ul,
.footer-contact ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

.footer-room-list > li {
  border-top: 1px solid var(--line-inverse);
}

.footer-room-link {
  display: grid;
  grid-template-areas:
    'code copy arrow'
    'code price arrow';
  grid-template-columns: 2.75rem minmax(0, 1fr) auto;
  align-items: center;
  gap: var(--space-xs) var(--space-md);
  min-height: 7.25rem;
  padding: var(--space-lg) var(--space-sm);
  margin-inline: calc(var(--space-sm) * -1);
  transition: background-color 160ms ease;
}

.footer-room-code {
  grid-area: code;
  align-self: start;
  color: var(--muted-inverse);
  font-size: 1.5rem;
  font-variant-numeric: tabular-nums;
  font-weight: 700;
  line-height: 1;
}

.footer-room-copy {
  grid-area: copy;
  display: grid;
  min-width: 0;
  gap: var(--space-xs);
}

.footer-room-reference {
  color: var(--brand);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.footer-room-copy strong {
  color: var(--text-inverse);
  font-size: 1rem;
  line-height: 1.3;
}

.footer-room-price {
  grid-area: price;
  color: var(--muted-inverse);
  font-size: 0.875rem;
  font-weight: 600;
}

.footer-room-arrow {
  grid-area: arrow;
  color: var(--accent);
  font-size: 1.25rem;
  transform: translateX(-0.25rem);
  transition: transform 160ms ease;
}

.footer-all-rooms {
  display: inline-flex;
  min-height: 3.5rem;
  align-items: center;
  gap: var(--space-sm);
  color: var(--text-inverse);
  font-size: 0.875rem;
  font-weight: 700;
}

.footer-all-rooms span {
  color: var(--accent);
  transition: transform 160ms ease;
}

.footer-utility {
  display: grid;
  gap: var(--space-xl);
}

.footer-nav,
.footer-contact {
  display: grid;
  align-content: start;
  gap: var(--space-md);
}

.footer-contact {
  font-style: normal;
}

.footer-nav ul,
.footer-contact ul {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-lg);
}

.footer-nav a,
.footer-contact a {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  color: var(--muted-inverse);
  font-weight: 600;
  text-decoration-color: transparent;
  text-underline-offset: var(--space-xs);
  transition:
    color 160ms ease,
    text-decoration-color 160ms ease;
}

.footer-contact a {
  color: var(--text-inverse);
  text-decoration: underline;
  text-decoration-color: var(--line-inverse);
}

.footer-base {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-sm) var(--space-lg);
  padding-top: var(--space-lg);
  border-top: 1px solid var(--line-inverse);
  font-size: 0.875rem;
}

@media (hover: hover) {
  .footer-room-link:hover {
    background: var(--bg-soft);
  }

  .footer-room-link:hover .footer-room-arrow,
  .footer-all-rooms:hover span {
    transform: translateX(var(--space-xs));
  }

  .footer-nav a:hover,
  .footer-contact a:hover {
    color: var(--text-inverse);
    text-decoration-color: currentColor;
  }
}

@media (min-width: 640px) {
  .footer-room-link {
    grid-template-areas: 'code copy price arrow';
    grid-template-columns: 3rem minmax(0, 1fr) auto auto;
    gap: var(--space-lg);
  }
}

@media (min-width: 960px) {
  .site-footer {
    padding-block: calc(var(--space-2xl) * 1.5) var(--space-xl);
  }

  .footer-layout {
    grid-template-columns: minmax(17rem, 0.8fr) minmax(0, 1.45fr);
    column-gap: clamp(4rem, 8vw, 8rem);
  }

  .footer-lead {
    align-content: start;
  }

  .footer-register {
    align-self: start;
  }

  .footer-register-head {
    min-height: 9rem;
  }

  .footer-room-link {
    min-height: 7.5rem;
  }

  .footer-room-code {
    font-size: 1.75rem;
  }

  .footer-room-copy strong {
    font-size: 1.0625rem;
  }

  .footer-utility {
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-2xl);
  }

  .footer-base {
    grid-column: 1 / -1;
  }
}
</style>
