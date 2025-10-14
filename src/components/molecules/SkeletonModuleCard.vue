<template>
  <div class="module-card-skeleton">
    <div class="skeleton-header">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-button"></div>
    </div>
    <div class="skeleton skeleton-description"></div>
    <div class="skeleton skeleton-description short"></div>
    <div class="skeleton-meta">
      <div class="skeleton skeleton-tag"></div>
      <div class="skeleton skeleton-tag"></div>
      <div class="skeleton skeleton-tag"></div>
    </div>
    <div class="skeleton skeleton-button-action"></div>
  </div>
</template>

<script setup lang="ts">
// No props needed for skeleton
</script>

<style scoped>
.module-card-skeleton {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
}

.skeleton-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.skeleton-title {
  height: 1.2rem;
  width: 70%;
}

.skeleton-button {
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 50%;
}

.skeleton-description {
  height: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;
}

.skeleton-description.short {
  width: 80%;
  margin-bottom: 1rem;
}

.skeleton-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.skeleton-tag {
  height: 1.5rem;
  width: 4rem;
}

.skeleton-button-action {
  height: 2rem;
  width: 5rem;
}
</style>