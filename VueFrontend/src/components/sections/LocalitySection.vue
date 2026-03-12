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
  <section class="section-shell">
    <div class="container locality-grid">
      <div class="surface-panel locality-copy">
        <span class="eyebrow">Living context</span>
        <h2>Kakadeo fit, not just a room list.</h2>
        <p>
          {{ site.localitySummary }}
        </p>

        <ul class="benefit-list">
          <li
            v-for="benefit in site.studentBenefits"
            :key="benefit"
          >
            {{ benefit }}
          </li>
        </ul>
      </div>

      <article class="surface-panel locality-card">
        <div class="locality-image">
          <ResponsiveImage
            :room-slug="room.slug"
            :media="room.gallery[0]"
            sizes="(min-width: 1024px) 40vw, 92vw"
          />
        </div>
        <div class="locality-note">
          <p class="eyebrow">Featured room</p>
          <h3>{{ room.title }}</h3>
          <p>{{ room.summary }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.locality-grid {
  display: grid;
  gap: 1rem;
}

.locality-copy,
.locality-card {
  overflow: hidden;
  padding: 1rem;
}

.locality-copy p {
  color: var(--muted);
}

.benefit-list {
  display: grid;
  gap: 0.65rem;
  margin: 1rem 0 0;
  padding-left: 1rem;
  color: var(--text-strong);
}

.locality-image {
  overflow: hidden;
  border-radius: 1.1rem;
  aspect-ratio: 4 / 3;
}

.locality-note {
  margin-top: 1rem;
}

.locality-note h3,
.locality-note p {
  margin: 0;
}

.locality-note p:last-child {
  margin-top: 0.65rem;
  color: var(--muted);
}

@media (min-width: 960px) {
  .locality-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .locality-copy,
  .locality-card {
    padding: 1.3rem;
  }
}
</style>
