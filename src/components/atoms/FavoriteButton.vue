<template>
  <button 
    @click="$emit('toggle')"
    :class="['favorite-btn', { 'is-favorite': isFavorite }]"
    :title="isFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'"
  >
    <span class="heart-icon">{{ isFavorite ? '❤️' : '🤍' }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  isFavorite: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<style scoped>
.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.favorite-btn:hover {
  background: rgba(0, 0, 0, 0.05);
  transform: scale(1.1);
}

.heart-icon {
  font-size: 1.2rem;
  transition: all 0.2s ease;
}

.is-favorite .heart-icon {
  animation: heartbeat 0.3s ease-in-out;
}

@keyframes heartbeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>