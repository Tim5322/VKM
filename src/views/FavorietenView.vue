<template>
  <div class="favorieten-view">
    <div class="container">
      <h1>Mijn Favorieten</h1>
      <p>Hier kun je je favoriete keuzemodules bekijken.</p>
      
      <div class="loading" v-if="isLoading">
        <p>Favorieten laden...</p>
      </div>
      
      <div class="error" v-else-if="error">
        <p>{{ error }}</p>
        <button @click="loadFavorieten" class="btn btn-primary">Opnieuw proberen</button>
      </div>
      
      <div class="empty-state" v-else-if="favorieten.length === 0">
        <h3>Geen favorieten gevonden</h3>
        <p>Je hebt nog geen keuzemodules toegevoegd aan je favorieten.</p>
        <RouterLink to="/keuzemodules" class="btn btn-primary">
          Bekijk Keuzemodules
        </RouterLink>
      </div>
      
      <div class="favorieten-grid" v-else>
        <FavoriteModuleCard
          v-for="favoriet in favorieten" 
          :key="favoriet._id"
          :module="favoriet"
          @remove-favorite="removeFavoriet"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { FavorietenService } from '@/services/favorieten.service'
import type { iVkm } from '@/vkm/iVkm'

// Import Atomic Design componenten
import FavoriteModuleCard from '@/components/organisms/FavoriteModuleCard.vue'

const favorieten = ref<iVkm[]>([])
const isLoading = ref(true)
const error = ref('')

const removeFavoriet = async (module: iVkm) => {
  try {
    await FavorietenService.removeFavoriet(module.id)
    favorieten.value = favorieten.value.filter(f => f.id !== module.id)
  } catch (err) {
    console.error('Error removing favoriet:', err)
    error.value = 'Er is een fout opgetreden bij het verwijderen van de favoriet.'
  }
}

const loadFavorieten = async () => {
  try {
    isLoading.value = true
    error.value = ''
    favorieten.value = await FavorietenService.getFavorieten()
  } catch (err) {
    console.error('Error loading favorieten:', err)
    error.value = 'Er is een fout opgetreden bij het laden van favorieten.'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadFavorieten()
})
</script>

<style scoped>
/* Veel minder CSS! Component styling zit in FavoriteModuleCard */
.favorieten-view {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
}

.error {
  color: #dc3545;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 2rem;
}

.empty-state h3 {
  color: #6c757d;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

.favorieten-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

@media (max-width: 768px) {
  .favorieten-grid {
    grid-template-columns: 1fr;
  }
}
</style>