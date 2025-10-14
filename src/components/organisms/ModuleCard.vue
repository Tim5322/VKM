<template>
  <div class="module-card">
    <div class="module-header">
      <h3>{{ module.name }}</h3>
      <FavoriteButton 
        :is-favorite="!!module.isFavoriet"
        @toggle="$emit('toggleFavorite', module)"
      />
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
      <button 
        @click="$emit('toggleFavorite', module)"
        :class="['btn', module.isFavoriet ? 'btn-danger' : 'btn-primary']"
      >
        {{ module.isFavoriet ? 'Verwijder uit favorieten' : 'Toevoegen aan favorieten' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { iVkm } from '@/vkm/iVkm'
import FavoriteButton from '../atoms/FavoriteButton.vue'

defineProps<{
  module: iVkm
}>()

defineEmits<{
  toggleFavorite: [module: iVkm]
  showDetails: [module: iVkm]
}>()
</script>

<style scoped>
.module-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e1e5e9;
}

.module-card:hover {
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
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}
</style>