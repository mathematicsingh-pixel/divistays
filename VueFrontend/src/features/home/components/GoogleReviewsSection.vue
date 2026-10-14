<script setup>
import { computed } from 'vue'

const props = defineProps({
  site: {
    type: Object,
    required: true,
  },
})

const reviewsUrl = computed(() => props.site.localityPage?.googleReviewsUrl)

const reviews = [
  {
    name: 'Aviral Srivastava',
    excerpt: 'Good place for students who want a calm and focused environment.',
  },
  {
    name: 'vishal pratap',
    excerpt: "I am currently staying here and I'm really happy with my experience.",
  },
  {
    name: 'Pawandeep Kaur',
    excerpt: 'Stayed here for a few months and had a very smooth experience.',
  },
]
</script>

<template>
  <section
    class="section-shell reviews-section"
    aria-labelledby="google-reviews-title"
  >
    <div class="container">
      <div class="reviews-heading">
        <div class="reviews-intro">
          <span class="label-upper">Google reviews · checked 15 Oct 2026</span>
          <h2 id="google-reviews-title">Guest reviews</h2>
          <p class="reviews-rating">
            <strong>4.7</strong>
            <span aria-hidden="true">/ 5</span>
            <span class="reviews-count">from 31 Google reviews</span>
          </p>
        </div>

        <a
          class="button-tertiary reviews-link"
          :href="reviewsUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read all reviews on Google
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <ul class="reviews-list">
        <li
          v-for="review in reviews"
          :key="review.name"
        >
          <article class="review-card surface-card">
            <span class="review-stars" role="img" aria-label="5 out of 5 stars">★★★★★</span>
            <blockquote>{{ review.excerpt }}</blockquote>
            <footer>
              <strong>{{ review.name }}</strong>
              <span class="label-upper">Google review</span>
            </footer>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.reviews-section {
  padding: var(--space-xl) 0 var(--section-space);
  background: var(--canvas);
}

.reviews-heading {
  display: grid;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.reviews-intro {
  display: grid;
  justify-items: start;
  gap: var(--space-sm);
}

.reviews-intro h2 {
  max-width: 12ch;
}

.reviews-rating {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-xs);
  color: var(--text-strong);
}

.reviews-rating strong {
  font-size: 1.25rem;
}

.reviews-count {
  color: var(--muted);
}

.reviews-link {
  justify-self: start;
}

.reviews-list {
  display: grid;
  gap: var(--space-md);
  margin: 0;
  padding: 0;
  list-style: none;
}

.review-card {
  display: grid;
  align-content: start;
  gap: var(--space-md);
  height: 100%;
  padding: var(--space-lg);
}

.review-stars {
  color: var(--text-strong);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
}

.review-card blockquote {
  margin: 0;
  color: var(--text);
  line-height: 1.6;
}

.review-card footer {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-xs) var(--space-sm);
  padding-top: var(--space-sm);
  border-top: 1px solid var(--line);
}

.review-card footer strong {
  color: var(--text-strong);
}

.review-card footer .label-upper {
  font-size: 0.6875rem;
}

@media (min-width: 700px) {
  .reviews-heading {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }

  .reviews-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1000px) {
  .reviews-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>