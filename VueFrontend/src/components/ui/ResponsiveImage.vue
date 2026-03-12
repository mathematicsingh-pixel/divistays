<script setup>
import { computed } from 'vue'
import { buildImageSources } from '@/lib/media'

const props = defineProps({
  roomSlug: {
    type: String,
    required: true,
  },
  media: {
    type: Object,
    required: true,
  },
  sizes: {
    type: String,
    default: '(min-width: 1024px) 33vw, 92vw',
  },
  eager: {
    type: Boolean,
    default: false,
  },
})

const sources = computed(() => buildImageSources(props.roomSlug, props.media.key))
</script>

<template>
  <picture>
    <source
      :srcset="sources.avif"
      :sizes="sizes"
      type="image/avif"
    >
    <source
      :srcset="sources.webp"
      :sizes="sizes"
      type="image/webp"
    >
    <img
      class="responsive-image"
      :src="sources.fallback"
      :srcset="sources.jpg"
      :sizes="sizes"
      :alt="media.alt"
      width="1200"
      height="900"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      decoding="async"
    >
  </picture>
</template>

<style scoped>
.responsive-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
