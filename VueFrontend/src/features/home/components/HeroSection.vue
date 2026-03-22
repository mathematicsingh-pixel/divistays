<script setup>
import BrandMark from '@/features/site/components/brand/BrandMark.vue'

function formatPhoneDisplay(value) {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 10) {
    return digits.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3')
  }

  return value
}

defineProps({
  site: {
    type: Object,
    required: true,
  },
  availableRoomCount: {
    type: Number,
    required: true,
  },
  availableStartingPriceLabel: {
    type: String,
    required: true,
  },
  roomTypeCount: {
    type: Number,
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
  <section
    id="home"
    class="hero-shell"
  >
    <div class="container hero-grid">
      <div class="hero-copy glass-panel-dark page-rise">
        <div class="hero-topbar">
          <BrandMark
            compact
            inverted
          />
          <span class="eyebrow hero-eyebrow hero-top-note">{{ site.heroEyebrow }}</span>
        </div>

        <p class="hero-brand-line">{{ site.brandLine }}</p>
        <h1>{{ site.heroTitle }}</h1>
        <p class="hero-summary">
          {{ site.heroSummary }}
        </p>

        <div class="hero-proof-row">
          <div>
            <dt>{{ availableRoomCount }} rooms available now</dt>
            <dd>From {{ availableStartingPriceLabel }}</dd>
          </div>
          <div>
            <dt>{{ roomTypeCount }} room options</dt>
            <dd>Compare by occupancy and setup</dd>
          </div>
          <div>
            <dt>All rooms from {{ startingPriceLabel }}</dt>
            <dd>Call or WhatsApp directly</dd>
          </div>
        </div>

        <div class="hero-actions">
          <RouterLink
            class="button-primary hero-primary-action"
            to="/rooms?availability=available"
          >
            {{ site.heroPrimaryLabel }}
          </RouterLink>
          <a
            class="button-secondary hero-secondary"
            :href="whatsappHref"
            target="_blank"
            rel="noreferrer"
          >
            {{ site.heroSecondaryLabel }}
          </a>
          <a
            class="button-tertiary hero-call-action"
            :href="callHref"
          >
            <span
              class="hero-call-signal"
              aria-hidden="true"
            >
              <span class="hero-call-dot" />
            </span>
            <span class="hero-call-copy">
              <strong>{{ site.heroCallLabel }}</strong>
              <small>{{ formatPhoneDisplay(site.phoneDisplay) }}</small>
            </span>
          </a>
        </div>
      </div>

      <aside class="hero-panel surface-panel glass-panel page-rise-delay-1">
        <span class="hero-panel-badge">Open now</span>
        <h2>Check the room before you call</h2>
        <p>
          Photos, rent, and setup first. Then decide if it is worth a call.
        </p>

        <div class="hero-checklist">
          <div class="hero-check">
            <strong>Rent up front</strong>
            <span>No price chasing.</span>
          </div>
          <div class="hero-check">
            <strong>Kitchen and washroom spelled out</strong>
            <span>Private or shared is easy to spot.</span>
          </div>
          <div class="hero-check">
            <strong>Direct contact</strong>
            <span>Call or WhatsApp when the room looks right.</span>
          </div>
        </div>

        <RouterLink
          class="button-primary"
          to="/rooms?availability=available"
        >
          Browse open rooms
        </RouterLink>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero-shell {
  padding-top: 0.25rem;
  scroll-margin-top: 5.4rem;
}

.hero-grid {
  display: grid;
  gap: 1rem;
}

.hero-copy {
  position: relative;
  display: grid;
  gap: 1.1rem;
  padding: 1.15rem;
  border-radius: 2rem;
  background:
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.18), transparent 30%),
    radial-gradient(circle at 12% 100%, rgba(255, 122, 26, 0.18), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02)),
    linear-gradient(180deg, rgba(10, 24, 34, 0.78), rgba(7, 18, 26, 0.62));
  box-shadow: 0 30px 72px rgba(0, 0, 0, 0.28);
  color: #f7fbff;
  overflow: hidden;
}

.hero-copy::before,
.hero-copy::after {
  position: absolute;
  content: '';
  pointer-events: none;
}

.hero-copy::before {
  top: -3.5rem;
  right: -2.5rem;
  width: 13rem;
  height: 13rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px 999px 0 0;
}

.hero-copy::after {
  right: 1.25rem;
  bottom: -3rem;
  width: 11rem;
  height: 11rem;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(255, 211, 142, 0.18), transparent 68%);
}

.hero-topbar,
.hero-actions,
.hero-proof-row {
  position: relative;
  z-index: 1;
}

.hero-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
}

.hero-eyebrow {
  border-color: rgba(255, 255, 255, 0.18);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.06)),
    rgba(121, 217, 202, 0.1);
}

.hero-top-note {
  margin-left: auto;
  white-space: nowrap;
}

.hero-brand-line {
  color: rgba(255, 211, 142, 0.95);
  font-size: 0.94rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-summary {
  max-width: 42rem;
  color: var(--muted-inverse);
  font-size: 1.02rem;
}

.hero-copy h1 {
  color: var(--text-inverse);
}

.hero-proof-row {
  display: grid;
  gap: 0.75rem;
}

.hero-proof-row div {
  padding: 0.95rem;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04)),
    rgba(255, 255, 255, 0.06);
  -webkit-backdrop-filter: blur(14px) saturate(170%);
  backdrop-filter: blur(14px) saturate(170%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 14px 28px rgba(0, 0, 0, 0.14);
}

.hero-proof-row dt {
  color: var(--text-inverse);
  font-weight: 800;
}

.hero-proof-row dd {
  margin: 0.25rem 0 0;
  color: var(--muted-inverse);
}

.hero-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
}

.hero-primary-action {
  grid-column: 1 / -1;
}

.hero-secondary {
  border-color: rgba(255, 255, 255, 0.18);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.08)),
    rgba(255, 255, 255, 0.08);
  color: var(--text-inverse);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.26),
    0 18px 34px rgba(0, 0, 0, 0.16);
}

.hero-call-action {
  position: relative;
  display: grid;
  align-content: center;
  justify-items: start;
  justify-content: center;
  gap: 0.18rem;
  min-height: 3.35rem;
  min-width: 0;
  padding: 0.94rem 1rem 0.96rem;
  border-color: rgba(255, 211, 142, 0.24);
  background:
    radial-gradient(circle at top right, rgba(255, 211, 142, 0.18), transparent 42%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.06)),
    rgba(255, 255, 255, 0.08);
  color: var(--text-inverse);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.24),
    0 18px 34px rgba(0, 0, 0, 0.18);
}

.hero-call-signal {
  position: absolute;
  top: 0.88rem;
  right: 0.96rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 0.74rem;
  height: 0.74rem;
  border-radius: 999px;
  background: rgba(255, 211, 142, 0.12);
}

.hero-call-signal::after {
  position: absolute;
  inset: 0;
  content: '';
  border-radius: inherit;
  border: 1px solid rgba(255, 211, 142, 0.38);
  animation: hero-call-ring 1.9s ease-out infinite;
}

.hero-call-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--sun), var(--accent));
  box-shadow: 0 0 0.75rem rgba(255, 211, 142, 0.44);
  animation: hero-call-dot 1.9s ease-in-out infinite;
}

.hero-call-copy {
  display: grid;
  justify-items: start;
  gap: 0.14rem;
}

.hero-call-copy strong {
  font-size: 1.02rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
}

.hero-call-copy small {
  color: rgba(247, 251, 255, 0.68);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.hero-panel {
  display: grid;
  gap: 0.9rem;
  overflow: hidden;
  padding: 1rem;
  box-shadow: 0 28px 62px rgba(0, 0, 0, 0.22);
}

.hero-panel-badge {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  min-height: 2rem;
  padding: 0.42rem 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  background:
    linear-gradient(180deg, rgba(255, 244, 229, 0.88), rgba(255, 219, 182, 0.68)),
    rgba(255, 122, 26, 0.36);
  color: rgba(7, 18, 26, 0.82);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-checklist {
  display: grid;
  gap: 0.7rem;
}

.hero-check {
  display: grid;
  gap: 0.2rem;
  padding: 0.9rem;
  border: 1px solid rgba(11, 23, 32, 0.08);
  border-radius: 1.1rem;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(245, 250, 253, 0.62)),
    rgba(255, 255, 255, 0.56);
}

.hero-check strong {
  color: var(--text-strong);
}

.hero-check span,
.hero-panel p {
  color: var(--muted);
}

@keyframes hero-call-ring {
  0% {
    opacity: 0.65;
    transform: scale(0.76);
  }

  70%,
  100% {
    opacity: 0;
    transform: scale(1.65);
  }
}

@keyframes hero-call-dot {
  0%,
  100% {
    transform: scale(0.92);
    filter: saturate(0.92);
  }

  50% {
    transform: scale(1.08);
    filter: saturate(1.08);
  }
}

@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(20rem, 0.85fr);
    align-items: stretch;
  }

  .hero-proof-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .hero-actions {
    grid-template-columns: minmax(0, 1.12fr) minmax(9.75rem, 0.36fr) minmax(12.4rem, 0.5fr);
    align-items: stretch;
    gap: 0.85rem;
  }

  .hero-primary-action {
    grid-column: auto;
  }

  .hero-call-action {
    padding: 0.96rem 1.14rem 0.98rem;
  }
}
</style>
