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
        <div v-for="favoriet in favorieten" :key="favoriet._id" class="favoriet-card">
          <h3>{{ favoriet.name }}</h3>
          <p>{{ favoriet.shortdescription }}</p>
          <div class="module-meta">
            <span class="location-tag">📍 {{ favoriet.location }}</span>
            <span class="level-tag">🎓 {{ favoriet.level }}</span>
            <span class="credits">{{ favoriet.studycredit }} SP</span>
          </div>
          <div class="card-actions">
            <button @click="removeFavoriet(favoriet)" class="btn btn-danger">
              Verwijderen uit favorieten
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { FavorietenService } from '@/services/favorieten.service'
import type { iVkm } from '@/vkm/iVkm'

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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.favoriet-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.favoriet-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.favoriet-card p {
  color: #6c757d;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.module-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
}

.location-tag,
.level-tag {
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}

.credits {
  color: #6c757d;
  font-weight: 500;
  margin-left: auto;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}
</style>