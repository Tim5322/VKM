<template>
  <div class="favorite-module-card">
    <div class="module-header">
      <h3>{{ module.name }}</h3>
      <span class="favorite-badge">❤️ Favoriet</span>
    </div>
    <p class="module-description">{{ module.shortdescription }}</p>
    <div class="module-meta">
      <span class="location-tag">📍 {{ module.location }}</span>
      <span class="level-tag">🎓 {{ module.level }}</span>
      <span class="credits">{{ module.studycredit }} SP</span>
    </div>
    <div class="card-actions">
      <button @click="$emit('showDetails', module)" class="btn btn-secondary">
        Meer info
      </button>
      <button @click="$emit('removeFavorite', module)" class="btn btn-danger">
        Verwijderen uit favorieten
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { iVkm } from '@/vkm/iVkm'

defineProps<{
  module: iVkm
}>()

defineEmits<{
  removeFavorite: [module: iVkm]
  showDetails: [module: iVkm]
}>()
</script>

<style scoped>
.favorite-module-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid #ff6b6b;
  position: relative;
}

.favorite-module-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.module-header h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.3;
  flex: 1;
  margin-right: 1rem;
}

.favorite-badge {
  background: #ff6b6b;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.module-description {
  color: #5a6c7d;
  margin-bottom: 1rem;
  line-height: 1.5;
  font-size: 0.9rem;
}

.module-meta {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.location-tag,
.level-tag,
.credits {
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #495057;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  min-width: 120px;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .card-actions {
    flex-direction: column;
  }
  
  .btn {
    flex: none;
  }
}
</style>