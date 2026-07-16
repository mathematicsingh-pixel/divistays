<script setup>
import { computed } from 'vue'
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

const availableCount = computed(() => props.rooms.filter((room) => room.available !== false).length)
const availabilityLabel = computed(() => {
  if (!availableCount.value) {
    return ''
  }

  return `${availableCount.value} ${availableCount.value === 1 ? 'room' : 'rooms'} available to visit`
})
</script>

<template>
  <footer class="site-footer surface-dark">
    <div class="container footer-inner">
      <div class="footer-intro">
        <BrandMark
          inverted
          tag="Rooms in Kakadeo"
        />
        <p class="footer-descriptor">{{ site.footerDescriptor }}</p>
        <p class="footer-summary">{{ site.footerSummary }}</p>
        <p
          v-if="availabilityLabel"
          class="footer-status"
        >
          <span aria-hidden="true" />
          {{ availabilityLabel }}
        </p>
      </div>

      <nav
        class="footer-column"
        aria-label="Footer navigation"
      >
        <h3>Explore</h3>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/rooms">All rooms</RouterLink>
        <RouterLink to="/rooms?availability=available">Available now</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#location' }">Location</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#faqs' }">FAQs</RouterLink>
      </nav>

      <div class="footer-column footer-contact">
        <h3>Talk to us</h3>
        <p>{{ site.locationLabel }}</p>
        <a
          class="footer-call"
          :href="callHref"
        >
          Call {{ site.phoneDisplay }}
        </a>
        <a
          class="footer-whatsapp"
          :href="whatsappHref"
          target="_blank"
          rel="noreferrer"
        >
          Ask on WhatsApp
        </a>
      </div>

      <div class="footer-base">
        <p>© DiviStays</p>
        <p>Furnished rooms in Kakadeo, Kanpur.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: var(--space-xl);
  border-right: 0;
  border-bottom: 0;
  border-left: 0;
  border-radius: 0;
  background: var(--bg);
  box-shadow: none;
}

.footer-inner {
  display: grid;
  gap: var(--space-xl);
  padding-block: var(--space-xl) calc(var(--space-2xl) * 2 + env(safe-area-inset-bottom));
}

.footer-intro,
.footer-column {
  display: grid;
  align-content: start;
  justify-items: start;
  gap: var(--space-sm);
}

.footer-descriptor {
  color: var(--text-inverse);
  font-weight: 600;
}

.footer-summary,
.footer-contact p,
.footer-base {
  color: var(--muted-inverse);
}

.footer-summary {
  max-width: 34rem;
}

.footer-status {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--brand);
  font-size: 0.875rem;
  font-weight: 700;
}

.footer-status span {
  width: var(--space-sm);
  height: var(--space-sm);
  border-radius: var(--radius-full);
  background: var(--brand);
}

.footer-column h3 {
  margin-bottom: var(--space-xs);
  color: var(--text-inverse);
}

.footer-column > a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  color: var(--muted-inverse);
  font-weight: 600;
  transition: color 0.15s ease;
}

.footer-column > .footer-call {
  margin-top: var(--space-sm);
  color: var(--text-inverse);
  font-weight: 700;
}

.footer-whatsapp {
  text-decoration: underline;
  text-underline-offset: var(--space-xs);
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
  .footer-column > a:hover {
    color: var(--text-inverse);
  }
}

@media (min-width: 640px) {
  .footer-inner {
    grid-template-columns: minmax(0, 1.4fr) repeat(2, minmax(0, 1fr));
    padding-top: calc(var(--space-xl) * 2);
  }

  .footer-base {
    grid-column: 1 / -1;
  }
}

@media (min-width: 960px) {
  .footer-inner {
    padding-bottom: var(--space-xl);
  }
}
</style>
