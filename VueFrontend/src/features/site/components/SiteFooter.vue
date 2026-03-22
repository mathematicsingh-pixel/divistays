<script setup>
import RoomReferenceBadge from '@/features/rooms/components/RoomReferenceBadge.vue'
import BrandMark from '@/features/site/components/brand/BrandMark.vue'

defineProps({
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
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-panel">
      <div class="footer-copy">
        <BrandMark
          inverted
          tag="Student stays"
        />
        <p class="footer-descriptor">{{ site.footerDescriptor }}</p>
        <p class="footer-location">{{ site.locationLabel }}</p>
        <p class="footer-summary">{{ site.footerSummary }}</p>
      </div>

      <div class="footer-mobile-card surface-dark-shell">
        <p class="footer-section-kicker">Quick links</p>

        <div class="footer-mobile-grid">
          <RouterLink
            class="footer-mobile-link"
            to="/rooms?availability=available"
          >
            <strong>Rooms</strong>
          </RouterLink>

          <RouterLink
            class="footer-mobile-link"
            :to="{ path: '/', hash: '#faqs' }"
          >
            <strong>Help</strong>
          </RouterLink>

          <RouterLink
            class="footer-mobile-link footer-mobile-link-location"
            :to="{ path: '/', hash: '#location' }"
          >
            <strong>Location</strong>
          </RouterLink>

          <RouterLink
            class="footer-mobile-link footer-mobile-link-features"
            :to="{ path: '/', hash: '#features' }"
          >
            <strong>Features</strong>
          </RouterLink>
        </div>
      </div>

      <div class="footer-shell surface-dark-shell">
        <div class="footer-shell-head">
          <div class="footer-shell-copy">
            <p class="footer-section-kicker">Start here</p>
            <h3>{{ site.uiText.footer.headline }}</h3>
          </div>
          <a
            class="footer-phone"
            :href="callHref"
          >
            {{ site.phoneDisplay }}
          </a>
        </div>

        <div class="footer-grid">
          <div class="footer-group">
            <p class="footer-group-label">Browse</p>
            <div class="footer-chip-grid">
              <RouterLink
                class="footer-chip"
                to="/rooms?availability=available"
              >
                Available rooms
              </RouterLink>
              <RouterLink
                class="footer-chip"
                :to="{ path: '/', hash: '#faqs' }"
              >
                FAQ
              </RouterLink>
            </div>
          </div>

          <div class="footer-group">
            <p class="footer-group-label">Call or WhatsApp</p>
            <div class="footer-action-grid">
              <a
                class="footer-action footer-action-call"
                :href="callHref"
              >
                <span class="footer-action-label">Call</span>
                <strong>{{ site.phoneDisplay }}</strong>
              </a>
              <a
                class="footer-action footer-action-whatsapp"
                :href="whatsappHref"
                target="_blank"
                rel="noreferrer"
              >
                <span class="footer-action-label">WhatsApp</span>
                <strong>{{ site.uiText.actions.askOnWhatsApp }}</strong>
              </a>
            </div>
          </div>
        </div>

        <div
          v-if="rooms.length"
          class="footer-rooms"
        >
          <div class="footer-rooms-head">
            <p class="footer-group-label">Available now</p>
            <RouterLink
              class="footer-inline-link"
              to="/rooms?availability=available"
            >
              View all
            </RouterLink>
          </div>

          <div class="footer-room-list">
            <RouterLink
              v-for="room in rooms.slice(0, 3)"
              :key="room.slug"
              class="room-link"
              :to="room.detailsHref"
            >
              <div class="room-link-main">
                <RoomReferenceBadge
                  :room="room"
                  inverse
                  compact
                />
                <span class="room-link-title">{{ room.title }}</span>
              </div>
              <span class="room-link-cta">{{ site.uiText.actions.viewRoom }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 0 0 calc(7rem + env(safe-area-inset-bottom));
}

.footer-panel {
  display: grid;
  gap: 1.1rem;
  padding: 1.25rem 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.footer-copy {
  display: grid;
  gap: 0.65rem;
}

.footer-copy p {
  color: var(--muted-inverse);
}

.footer-descriptor {
  color: var(--text-inverse);
  font-size: 1.04rem;
}

.footer-location {
  width: fit-content;
  padding: 0.28rem 0.62rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  font-size: 0.82rem;
  letter-spacing: 0.02em;
}

.footer-summary {
  max-width: 34rem;
}

.footer-mobile-card,
.footer-shell {
  position: relative;
  gap: 1rem;
  overflow: hidden;
  padding: 1rem;
  isolation: isolate;
}

.footer-mobile-card {
  display: grid;
}

.footer-shell {
  display: none;
}

.footer-mobile-card > *,
.footer-shell > * {
  position: relative;
  z-index: 1;
}

.footer-shell-head,
.footer-grid,
.footer-action-grid,
.footer-room-list {
  display: grid;
  gap: 0.8rem;
}

.footer-shell-head {
  padding-bottom: 0.15rem;
}

.footer-shell-copy {
  display: grid;
  gap: 0.35rem;
}

.footer-section-kicker,
.footer-group-label,
.footer-action-label,
.room-link-cta,
.footer-inline-link {
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.footer-section-kicker,
.footer-group-label,
.footer-action-label,
.room-link-cta {
  color: rgba(236, 246, 252, 0.74);
}

.footer-shell-head h3 {
  color: var(--text-inverse);
  font-size: clamp(1.45rem, 6vw, 2.2rem);
  line-height: 0.95;
}

.footer-phone {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 2.5rem;
  padding: 0.55rem 0.85rem;
  border: 1px solid rgba(255, 122, 26, 0.2);
  border-radius: 999px;
  background: rgba(255, 122, 26, 0.08);
  color: #ffd7af;
  font-weight: 800;
}

.footer-group {
  display: grid;
  gap: 0.65rem;
}

.footer-chip-grid {
  display: grid;
  gap: 0.65rem;
}

.footer-mobile-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.footer-mobile-link,
.footer-chip,
.footer-action,
.room-link {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1.15rem;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease;
}

.footer-mobile-link {
  display: flex;
  align-items: center;
  min-height: 4rem;
  padding: 0.95rem 1rem;
  background: rgba(255, 255, 255, 0.045);
  color: var(--text-inverse);
}

.footer-mobile-link strong {
  font-size: 1rem;
  line-height: 1;
}

.footer-mobile-link-location {
  background: rgba(255, 255, 255, 0.06);
}

.footer-mobile-link-features {
  background: rgba(121, 217, 202, 0.08);
}

.footer-chip {
  display: inline-flex;
  align-items: center;
  min-height: 3rem;
  padding: 0.85rem 0.95rem;
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-inverse);
  font-weight: 700;
}

.footer-action {
  display: grid;
  gap: 0.18rem;
  padding: 0.9rem 1rem;
  color: var(--text-inverse);
}

.footer-action strong {
  font-size: 1rem;
  letter-spacing: -0.02em;
}

.footer-action-call {
  background: rgba(255, 255, 255, 0.04);
}

.footer-action-whatsapp {
  background: rgba(121, 217, 202, 0.08);
}

.footer-rooms {
  display: grid;
  gap: 0.75rem;
  padding-top: 0.2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-rooms-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.footer-inline-link {
  color: var(--sun);
}

.room-link {
  display: grid;
  gap: 0.65rem;
  padding: 0.75rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-inverse);
}

.room-link-main {
  display: grid;
  gap: 0.5rem;
  min-width: 0;
}

.room-link-title {
  font-weight: 700;
  line-height: 1.25;
}

.room-link-cta {
  justify-self: start;
  white-space: nowrap;
}

@media (hover: hover) {
  .footer-mobile-link:hover,
  .footer-chip:hover,
  .footer-action:hover,
  .room-link:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.22);
  }
}

@media (min-width: 760px) {
  .footer-panel {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1fr);
    align-items: start;
  }

  .footer-mobile-card {
    display: none;
  }

  .footer-shell {
    display: grid;
    gap: 1.15rem;
    padding: 1.2rem;
  }

  .footer-shell-head,
  .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: start;
  }

  .footer-shell-head {
    gap: 1rem;
  }

  .footer-phone {
    justify-self: end;
  }

  .footer-room-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .room-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 100%;
  }
}
</style>
