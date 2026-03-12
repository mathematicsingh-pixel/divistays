<script setup>
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'

defineProps({
  site: {
    type: Object,
    required: true,
  },
  room: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="section-shell locality-shell">
    <div class="container locality-grid">
      <div class="locality-copy page-rise">
        <span class="eyebrow">Location</span>
        <h2>Kakadeo fit, minus the back-and-forth.</h2>
        <p>
          {{ site.localitySummary }}
        </p>

        <div class="process-list">
          <article
            v-for="(step, index) in site.processSteps"
            :key="step.title"
            class="process-item"
          >
            <span class="process-index">0{{ index + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.body }}</p>
          </article>
        </div>

        <ul class="benefit-list">
          <li
            v-for="benefit in site.studentBenefits"
            :key="benefit"
          >
            {{ benefit }}
          </li>
        </ul>
      </div>

      <article class="surface-panel locality-card page-rise-delay-1">
        <div class="locality-image">
          <ResponsiveImage
            :room-slug="room.slug"
            :media="room.gallery[0]"
            sizes="(min-width: 1024px) 40vw, 92vw"
          />
        </div>
        <div class="locality-note">
          <span class="eyebrow">Featured</span>
          <h3>{{ room.title }}</h3>
          <p>{{ room.summary }}</p>
          <div class="locality-tags">
            <span class="soft-chip">{{ room.priceLabel }}</span>
            <span class="soft-chip">{{ room.occupancyLabel }}</span>
            <span class="soft-chip">{{ room.kitchenLabel }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.locality-shell {
  position: relative;
}

.locality-grid {
  display: grid;
  gap: 1rem;
}

.locality-copy {
  display: grid;
  gap: 0.95rem;
  padding: 1.1rem;
  border: 1px solid rgba(121, 217, 202, 0.16);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(circle at top right, rgba(121, 217, 202, 0.16), transparent 28%),
    linear-gradient(180deg, rgba(12, 29, 38, 0.95), rgba(7, 18, 26, 0.98));
  box-shadow: 0 22px 56px rgba(0, 0, 0, 0.24);
}

.locality-copy h2 {
  color: var(--text-inverse);
}

.locality-copy p,
.process-item p,
.locality-note p {
  color: var(--muted-inverse);
}

.process-list {
  display: grid;
  gap: 0.7rem;
}

.process-item {
  padding: 0.85rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.process-item:first-child {
  border-top: 0;
  padding-top: 0;
}

.process-index {
  color: #ffba7c;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.process-item h3 {
  margin-top: 0.2rem;
  color: var(--text-inverse);
}

.benefit-list {
  display: grid;
  gap: 0.55rem;
  margin: 0;
  padding-left: 1rem;
  color: var(--text-inverse);
}

.locality-card {
  padding: 1rem;
  border: 1px solid rgba(121, 217, 202, 0.16);
}

.locality-image {
  overflow: hidden;
  border-radius: 1.8rem 1.8rem 0.95rem 0.95rem;
  aspect-ratio: 4 / 3;
}

.locality-note {
  display: grid;
  gap: 0.7rem;
  padding-top: 1rem;
}

.locality-note p {
  color: var(--muted);
}

.locality-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

@media (min-width: 960px) {
  .locality-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .locality-copy,
  .locality-card {
    padding: 1.2rem;
  }
}
</style>
