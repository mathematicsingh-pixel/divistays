<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
  inverse: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <nav
    class="breadcrumb-nav"
    :class="{ 'breadcrumb-nav--inverse': inverse }"
    aria-label="Breadcrumb"
  >
    <ol>
      <li
        v-for="(item, index) in items"
        :key="`${item.label}-${index}`"
      >
        <RouterLink
          v-if="item.to && index < items.length - 1"
          :to="item.to"
        >
          {{ item.label }}
        </RouterLink>
        <span v-else>{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb-nav ol {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.breadcrumb-nav li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--muted);
  font-size: 0.82rem;
  font-weight: 700;
}

.breadcrumb-nav li:not(:last-child)::after {
  content: '/';
  color: var(--line-strong);
}

.breadcrumb-nav a {
  color: var(--text-strong);
}

.breadcrumb-nav--inverse li {
  color: var(--muted-inverse);
}

.breadcrumb-nav--inverse li:not(:last-child)::after {
  color: var(--line-inverse);
}

.breadcrumb-nav--inverse a {
  color: var(--text-inverse);
}
</style>
