<template>
  <div class="search-filters">
    <div class="search-row">
      <SearchInput 
        v-model="searchQuery"
        placeholder="Zoek keuzemodules..."
        @input="handleSearch"
      />
    </div>
    <div class="filters-row">
      <FilterSelect
        v-model="selectedLocation"
        label="Locatie"
        :options="locationOptions"
        @change="handleFilterChange"
      />
      <FilterSelect
        v-model="selectedLevel"
        label="Niveau"
        :options="levelOptions"
        @change="handleFilterChange"
      />
      <FilterSelect
        v-model="selectedCredits"
        label="Studiepunten"
        :options="creditsOptions"
        @change="handleFilterChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchInput from '../atoms/SearchInput.vue'
import FilterSelect from '../atoms/FilterSelect.vue'

const searchQuery = ref('')
const selectedLocation = ref('')
const selectedLevel = ref('')
const selectedCredits = ref('')

const locationOptions = [
  { value: '', label: 'Alle locaties' },
  { value: 'Den Bosch', label: 'Den Bosch' },
  { value: 'Breda', label: 'Breda' },
  { value: 'Tilburg', label: 'Tilburg' }
]

const levelOptions = [
  { value: '', label: 'Alle niveaus' },
  { value: 'NLQF5', label: 'NLQF5' },
  { value: 'NLQF6', label: 'NLQF6' }
]

const creditsOptions = [
  { value: '', label: 'Alle studiepunten' },
  { value: '15', label: '15 SP' },
  { value: '30', label: '30 SP' }
]

const emit = defineEmits<{
  search: [filters: {
    name?: string
    location?: string
    level?: string
    studycredit?: number
  }]
}>()

let searchTimeout: ReturnType<typeof setTimeout>

const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    emitFilters()
  }, 300)
}

const handleFilterChange = () => {
  emitFilters()
}

const emitFilters = () => {
  emit('search', {
    name: searchQuery.value || undefined,
    location: selectedLocation.value || undefined,
    level: selectedLevel.value || undefined,
    studycredit: selectedCredits.value ? Number(selectedCredits.value) : undefined
  })
}
</script>

<style scoped>
.search-filters {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.search-row {
  margin-bottom: 1rem;
}

.filters-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
  }
}
</style>