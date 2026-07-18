<script setup>
const stayTypes = [
  {
    title: 'Furnished room',
    body: 'Choose a single or double-occupancy room, then check whether the kitchen and washroom are private or shared on the listing.',
    path: '/rooms',
    linkLabel: 'Compare all rooms',
  },
  {
    title: 'PG or hostel-style setup',
    body: 'If you are searching for a PG or hostel in Kakadeo, start with the lower-rent rooms that list common facilities. Ask about inclusions and house rules before you visit.',
    path: '/pg-hostel-in-kakadeo-kanpur',
    linkLabel: 'See PG and hostel-style rooms',
  },
  {
    title: 'Studio apartment',
    body: 'Studios offer a more self-contained setup. DiviStays shows the kitchen, washroom, occupancy, and monthly rent for each studio separately.',
    path: '/studio-apartments-in-kakadeo-kanpur',
    linkLabel: 'See studio apartments',
  },
  {
    title: '1 RK room',
    body: 'A 1 RK-style option keeps the room and kitchen setup together. Open the full listing to confirm the exact layout and facilities.',
    path: '/studio-apartments-in-kakadeo-kanpur',
    linkLabel: 'Compare 1 RK options',
  },
]
</script>

<template>
  <section
    class="section-shell stay-types-shell"
    aria-labelledby="stay-types-title"
  >
    <div class="container stay-types-layout">
      <div class="section-heading stay-types-heading">
        <span class="label-upper">Ways to stay in Kakadeo, Kanpur</span>
        <h2 id="stay-types-title">Room, PG, hostel or studio?</h2>
        <p>
          Search labels often overlap. Compare the real setup—rent, occupancy, kitchen,
          washroom, and photos—before you decide.
        </p>

        <RouterLink
          class="stay-types-action"
          to="/rooms"
        >
          Compare furnished rooms in Kakadeo
          <span aria-hidden="true">→</span>
        </RouterLink>
      </div>

      <ol class="stay-types-list">
        <li
          v-for="(stayType, index) in stayTypes"
          :key="stayType.title"
        >
          <article>
            <span class="stay-type-index" aria-hidden="true">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div class="stay-type-copy">
              <h3>{{ stayType.title }}</h3>
              <div class="stay-type-description">
                <p>{{ stayType.body }}</p>
                <RouterLink :to="stayType.path">
                  {{ stayType.linkLabel }}
                  <span aria-hidden="true">→</span>
                </RouterLink>
              </div>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.stay-types-shell {
  padding-bottom: var(--section-space);
}

.stay-types-layout {
  display: grid;
  gap: var(--space-xl);
}

.stay-types-heading {
  align-content: start;
  margin: 0;
}

.stay-types-heading .label-upper {
  color: var(--brand-strong);
}

.stay-types-heading h2 {
  max-width: 12ch;
  color: var(--text-strong);
}

.stay-types-heading p {
  color: var(--muted);
}

.stay-types-action {
  display: inline-flex;
  width: fit-content;
  min-height: 2.75rem;
  align-items: center;
  gap: var(--space-sm);
  color: var(--accent-deep);
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: var(--space-xs);
}

.stay-types-action span {
  transition: transform 160ms ease;
}

.stay-types-list {
  display: grid;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line-strong);
  list-style: none;
}

.stay-types-list li {
  border-bottom: 1px solid var(--line);
}

.stay-types-list article {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: var(--space-md);
  padding: var(--space-lg) 0;
}

.stay-type-index {
  min-width: 2rem;
  color: var(--muted);
  font-size: var(--text-label);
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.5;
}

.stay-type-copy {
  display: grid;
  gap: var(--space-sm);
}

.stay-type-copy h3 {
  color: var(--text-strong);
}

.stay-type-copy p {
  max-width: 42rem;
  color: var(--muted);
}

.stay-type-description {
  display: grid;
  gap: var(--space-sm);
}

.stay-type-description a {
  display: inline-flex;
  width: fit-content;
  min-height: 2.75rem;
  align-items: center;
  gap: var(--space-sm);
  color: var(--accent-deep);
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: var(--space-xs);
}

.stay-type-description a span {
  transition: transform 160ms ease;
}

@media (hover: hover) {
  .stay-types-action:hover {
    text-decoration-color: currentColor;
  }

  .stay-types-action:hover span {
    transform: translateX(var(--space-xs));
  }

  .stay-type-description a:hover {
    text-decoration-color: currentColor;
  }

  .stay-type-description a:hover span {
    transform: translateX(var(--space-xs));
  }
}

@media (min-width: 960px) {
  .stay-types-layout {
    grid-template-columns: minmax(16rem, 0.72fr) minmax(0, 1.28fr);
    align-items: start;
    gap: var(--space-2xl);
  }

  .stay-types-list article {
    grid-template-columns: 3rem minmax(10rem, 0.7fr) minmax(16rem, 1.3fr);
    align-items: baseline;
  }

  .stay-type-copy {
    display: contents;
  }
}
</style>
