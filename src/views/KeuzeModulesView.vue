<template>
  <div class="keuzemodules-view">
    <div class="container">
      <h1>Keuzemodules</h1>
      <p>Ontdek alle beschikbare keuzemodules en voeg ze toe aan je favorieten.</p>
      
      <!-- Gebruik het nieuwe SearchFilter component -->
      <SearchFilter @search="handleSearch" />
      
      <!-- Loading state met skeleton -->
      <SkeletonGrid v-if="isLoading" :count="6" />
      
      <!-- Error state -->
      <div class="error" v-else-if="error">
        <p>{{ error }}</p>
        <button @click="loadModules" class="btn btn-primary">Opnieuw proberen</button>
      </div>
      
      <!-- Modules grid met nieuwe ModuleCard componenten -->
      <div class="modules-grid" v-else>
        <ModuleCard
          v-for="module in modules" 
          :key="module._id"
          :module="module"
          @toggle-favorite="toggleFavoriet"
          @show-details="showModuleDetails"
        />
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
import { FavorietenService } from '@/services/favorieten.service'
import type { iVkm } from '@/vkm/iVkm'

// Import componenten volgens Atomic Design
import SearchFilter from '@/components/molecules/SearchFilter.vue'
import ModuleCard from '@/components/organisms/ModuleCard.vue'
import SkeletonGrid from '@/components/organisms/SkeletonGrid.vue'

const modules = ref<iVkm[]>([])
const isLoading = ref(true)
const error = ref('')
const favorietenIds = ref<number[]>([])

// Nieuwe handleSearch functie voor SearchFilter component
const handleSearch = async (filters: {
  name?: string
  location?: string
  level?: string
  studycredit?: number
}) => {
  try {
    isLoading.value = true
    error.value = ''
    
    let result: iVkm[]
    if (filters.name || filters.location || filters.level || filters.studycredit) {
      result = await KeuzeModulesService.searchKeuzeModules(filters)
    } else {
      result = await KeuzeModulesService.getAllKeuzeModules()
    }
    
    // Favoriet IDs ophalen
    try {
      favorietenIds.value = await FavorietenService.getFavorietenIds()
      if (!Array.isArray(favorietenIds.value)) {
        favorietenIds.value = []
      }
    } catch (favError) {
      favorietenIds.value = []
    }
    
    // Modules instellen met favoriet status
    modules.value = result.map(module => ({
      ...module,
      isFavoriet: Array.isArray(favorietenIds.value) && favorietenIds.value.includes(module.id)
    }))
    
  } catch (err: any) {
    console.error('Error loading modules:', err)
    error.value = `Fout bij laden keuzemodules: ${err.message || 'Onbekende fout'}`
  } finally {
    isLoading.value = false
  }
}

const loadModules = async () => {
  await handleSearch({}) // Laad alle modules zonder filters
}

const toggleFavoriet = async (module: iVkm) => {
  try {
    console.log('❤️ Toggling favoriet for:', module.name, 'ID:', module.id)
    
    const oldStatus = module.isFavoriet || false
    
    // Check voor maximum van 5 favorieten bij toevoegen
    if (!oldStatus) {
      // Controleer huidige favorieten count
      const currentFavorites = modules.value.filter(m => m.isFavoriet).length
      if (currentFavorites >= 5) {
        alert('Je kunt maximaal 5 favorieten hebben! Verwijder eerst een favoriet voordat je een nieuwe toevoegt.')
        return // Stop hier, geen API call en geen UI update
      }
    }
    
    // Doe de API call EERST voordat we de UI updaten
    if (oldStatus) {
      // Verwijderen uit favorieten: DELETE /favorieten/:id
      console.log('🗑️ Removing from favorites...')
      await FavorietenService.removeFavoriet(module.id)
    } else {
      // Toevoegen aan favorieten: PUT /favorieten/:id
      console.log('➕ Adding to favorites...')
      await FavorietenService.addFavoriet(module.id)
    }
    
    // Alleen als de API call succesvol was, update dan de UI
    module.isFavoriet = !oldStatus
    
    // Update favorietenIds array (met veiligheidscheck)
    if (!Array.isArray(favorietenIds.value)) {
      favorietenIds.value = []
    }
    
    if (module.isFavoriet) {
      if (!favorietenIds.value.includes(module.id)) {
        favorietenIds.value.push(module.id)
      }
    } else {
      favorietenIds.value = favorietenIds.value.filter(id => id !== module.id)
    }
    
    console.log('✅ Favoriet toggle successful, UI updated')
    
  } catch (error: any) {
    console.error('❌ Error toggling favoriet:', error)
    
    // Als er een error is, herstel de originele staat
    // (de UI is nog niet geüpdatet omdat we dat pas na succesvolle API call doen)
    
    if (error.message?.includes('409')) {
      alert('Deze module staat al in je favorieten!')
    } else if (error.message?.includes('400') && error.message?.includes('maximum')) {
      alert('Je kunt maximaal 5 favorieten hebben!')
    } else {
      alert('Er is een fout opgetreden bij het beheren van favorieten: ' + (error.message || 'Onbekende fout'))
    }
  }
}

const showModuleDetails = (module: iVkm) => {
  console.log('Toon details voor:', module.name)
}

onMounted(() => {
  loadModules()
})
</script>

<style scoped>
/* Alleen nog basis layout - alle component styling zit in de componenten! */
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

.error {
  text-align: center;
  padding: 3rem;
  color: #dc3545;
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
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
  .modules-grid {
    grid-template-columns: 1fr;
  }
}
</style>