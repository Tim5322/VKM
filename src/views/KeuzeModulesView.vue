<template>
  <div class="keuzemodules-view">
    <div class="container">
      <h1>Keuzemodules</h1>
      <p>Ontdek alle beschikbare keuzemodules en voeg ze toe aan je favorieten.</p>
      
      <div class="filters">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Zoek keuzemodules..." 
          class="search-input"
          @input="searchModules"
        >
        <select v-model="selectedLocation" class="filter-select" @change="searchModules">
          <option value="">Alle locaties</option>
          <option value="Den Bosch">Den Bosch</option>
          <option value="Breda">Breda</option>
          <option value="Tilburg">Tilburg</option>
        </select>
        <select v-model="selectedLevel" class="filter-select" @change="searchModules">
          <option value="">Alle niveaus</option>
          <option value="NLQF5">NLQF5</option>
          <option value="NLQF6">NLQF6</option>
        </select>
        <select v-model="selectedCredits" class="filter-select" @change="searchModules">
          <option value="">Alle studiepunten</option>
          <option value="15">15 SP</option>
          <option value="30">30 SP</option>
        </select>
      </div>
      
      <div class="loading" v-if="isLoading">
        <p>Keuzemodules laden...</p>
      </div>
      
      <div class="error" v-else-if="error">
        <p>{{ error }}</p>
        <button @click="loadModules" class="btn btn-primary">Opnieuw proberen</button>
      </div>
      
      <div class="modules-grid" v-else>
        <div v-for="module in modules" :key="module._id" class="module-card">
          <div class="module-header">
            <h3>{{ module.name }}</h3>
            <button 
              @click="toggleFavoriet(module)"
              :class="['favorite-btn', { 'is-favorite': module.isFavoriet }]"
            >
              ❤️
            </button>
          </div>
          <p class="module-description">{{ module.shortdescription }}</p>
          <div class="module-meta">
            <span class="location-tag">📍 {{ module.location }}</span>
            <span class="level-tag">🎓 {{ module.level }}</span>
            <span class="credits">{{ module.studycredit }} SP</span>
          </div>
          <div class="module-actions">
            <button @click="showModuleDetails(module)" class="btn btn-outline">Meer info</button>
            <button 
              @click="toggleFavoriet(module)"
              :class="['btn', module.isFavoriet ? 'btn-danger' : 'btn-primary']"
            >
              {{ module.isFavoriet ? 'Verwijder uit favorieten' : 'Toevoegen aan favorieten' }}
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="!isLoading && !error && modules.length === 0" class="empty-state">
        <h3>Geen keuzemodules gevonden</h3>
        <p>Probeer je zoekcriteria aan te passen.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { KeuzeModulesService } from '@/services/keuzemodules.service'
import type { iVkm } from '@/vkm/iVkm'

const modules = ref<iVkm[]>([])
const isLoading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedLocation = ref('')
const selectedLevel = ref('')
const selectedCredits = ref('')

let searchTimeout: ReturnType<typeof setTimeout>

const searchModules = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(async () => {
    await loadModules()
  }, 300)
}

const loadModules = async () => {
  try {
    isLoading.value = true
    error.value = ''
    
    let result: iVkm[]
    
    // Als er filters zijn, gebruik search endpoint
    if (searchQuery.value || selectedLocation.value || selectedLevel.value || selectedCredits.value) {
      result = await KeuzeModulesService.searchKeuzeModules({
        name: searchQuery.value || undefined,
        location: selectedLocation.value || undefined,
        level: selectedLevel.value || undefined,
        studycredit: selectedCredits.value ? Number(selectedCredits.value) : undefined
      })
    } else {
      // Anders alle modules ophalen
      result = await KeuzeModulesService.getAllKeuzeModules()
    }
    
    modules.value = result.map(module => ({
      ...module,
      isFavoriet: false // TODO: Haal favorieten status op van API
    }))
    
  } catch (err) {
    console.error('Error loading modules:', err)
    error.value = 'Er is een fout opgetreden bij het laden van de keuzemodules.'
  } finally {
    isLoading.value = false
  }
}

const toggleFavoriet = (module: iVkm) => {
  module.isFavoriet = !module.isFavoriet
  console.log(`Module ${module.name} ${module.isFavoriet ? 'toegevoegd aan' : 'verwijderd uit'} favorieten`)
}

const showModuleDetails = (module: iVkm) => {
  console.log('Toon details voor:', module.name)
}

onMounted(() => {
  loadModules()
})
</script>

<style scoped>
.keuzemodules-view {
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

.filters {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 250px;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.filter-select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
  min-width: 150px;
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

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.module-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.module-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.module-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.module-header h3 {
  color: #2c3e50;
  margin: 0;
  flex: 1;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.favorite-btn:hover,
.favorite-btn.is-favorite {
  opacity: 1;
}

.module-description {
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

.module-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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
  flex: 1;
  text-align: center;
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

.btn-outline {
  background: transparent;
  color: #667eea;
  border: 1px solid #667eea;
}

.btn-outline:hover {
  background: #667eea;
  color: white;
}
</style>