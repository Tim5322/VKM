<template>
  <div class="skeleton-grid">
    <SkeletonModuleCard 
      v-for="n in count" 
      :key="n"
    />
  </div>
</template>

<script setup lang="ts">
import SkeletonModuleCard from '../molecules/SkeletonModuleCard.vue'

withDefaults(defineProps<{
  count?: number
}>(), {
  count: 6
})
</script>

<style scoped>
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .skeleton-grid {
    grid-template-columns: 1fr;
  }
}
</style>