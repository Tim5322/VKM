<template>
  <div class="favorieten-view">
    <div class="container">
      <h1>Mijn Favorieten</h1>
      <p>Hier kun je je favoriete keuzemodules bekijken.</p>
      
      <div class="empty-state" v-if="favorieten.length === 0">
        <h3>Geen favorieten gevonden</h3>
        <p>Je hebt nog geen keuzemodules toegevoegd aan je favorieten.</p>
        <RouterLink to="/keuzemodules" class="btn btn-primary">
          Bekijk Keuzemodules
        </RouterLink>
      </div>
      
      <div class="favorieten-grid" v-else>
        <div v-for="favoriet in favorieten" :key="favoriet.id" class="favoriet-card">
          <h3>{{ favoriet.naam }}</h3>
          <p>{{ favoriet.beschrijving }}</p>
          <div class="card-actions">
            <button @click="removeFavoriet(favoriet.id)" class="btn btn-danger">
              Verwijderen
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

interface Favoriet {
  id: number
  naam: string
  beschrijving: string
}

const favorieten = ref<Favoriet[]>([])

const removeFavoriet = (id: number) => {
  favorieten.value = favorieten.value.filter(f => f.id !== id)
}

onMounted(() => {
  // Hier zou je de favorieten van de API ophalen
  // Voor nu een lege array
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