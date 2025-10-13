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
        >
        <select v-model="selectedCategory" class="category-select">
          <option value="">Alle categorieën</option>
          <option value="programming">Programmeren</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
          <option value="data">Data Science</option>
        </select>
      </div>
      
      <div class="loading" v-if="isLoading">
        <p>Keuzemodules laden...</p>
      </div>
      
      <div class="modules-grid" v-else>
        <div v-for="module in filteredModules" :key="module.id" class="module-card">
          <div class="module-header">
            <h3>{{ module.naam }}</h3>
            <button 
              @click="toggleFavoriet(module.id)"
              :class="['favorite-btn', { 'is-favorite': module.isFavoriet }]"
            >
              ❤️
            </button>
          </div>
          <p class="module-description">{{ module.beschrijving }}</p>
          <div class="module-meta">
            <span class="category-tag">{{ module.categorie }}</span>
            <span class="credits">{{ module.studiepunten }} SP</span>
          </div>
          <div class="module-actions">
            <button class="btn btn-outline">Meer info</button>
            <button 
              @click="toggleFavoriet(module.id)"
              :class="['btn', module.isFavoriet ? 'btn-danger' : 'btn-primary']"
            >
              {{ module.isFavoriet ? 'Verwijder uit favorieten' : 'Toevoegen aan favorieten' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface KeuzeModule {
  id: number
  naam: string
  beschrijving: string
  categorie: string
  studiepunten: number
  isFavoriet: boolean
}

const modules = ref<KeuzeModule[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')

const filteredModules = computed(() => {
  return modules.value.filter(module => {
    const matchesSearch = module.naam.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         module.beschrijving.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = !selectedCategory.value || module.categorie === selectedCategory.value
    
    return matchesSearch && matchesCategory
  })
})

const toggleFavoriet = (moduleId: number) => {
  const module = modules.value.find(m => m.id === moduleId)
  if (module) {
    module.isFavoriet = !module.isFavoriet
    // Hier zou je de favoriet status naar de API sturen
  }
}

onMounted(async () => {
  // Simuleer API call met dummy data
  setTimeout(() => {
    modules.value = [
      {
        id: 1,
        naam: 'Advanced Web Development',
        beschrijving: 'Leer moderne web development technieken met React, Vue en Node.js',
        categorie: 'programming',
        studiepunten: 6,
        isFavoriet: false
      },
      {
        id: 2,
        naam: 'UI/UX Design Principles',
        beschrijving: 'Ontdek de principes van gebruikersinterface en gebruikerservaring design',
        categorie: 'design',
        studiepunten: 4,
        isFavoriet: false
      },
      {
        id: 3,
        naam: 'Business Analytics',
        beschrijving: 'Leer hoe je business data analyseert en interpreteert voor betere besluitvorming',
        categorie: 'business',
        studiepunten: 5,
        isFavoriet: true
      },
      {
        id: 4,
        naam: 'Machine Learning Basics',
        beschrijving: 'Introductie tot machine learning algoritmes en hun toepassingen',
        categorie: 'data',
        studiepunten: 6,
        isFavoriet: false
      },
      {
        id: 5,
        naam: 'Mobile App Development',
        beschrijving: 'Ontwikkel native en cross-platform mobiele applicaties',
        categorie: 'programming',
        studiepunten: 7,
        isFavoriet: false
      }
    ]
    isLoading.value = false
  }, 1000)
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

.category-select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background: white;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #6c757d;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-tag {
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  text-transform: capitalize;
}

.credits {
  color: #6c757d;
  font-weight: 500;
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