<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const router = useRouter()

// Check of gebruiker is ingelogd
const isLoggedIn = computed(() => {
  return localStorage.getItem('authToken') !== null
})

// Logout functie
const logout = () => {
  localStorage.removeItem('authToken')
  router.push('/')
}
</script>

<template>
  <div class="app">
    <!-- Navigatie balk -->
    <nav class="navbar">
      <div class="nav-container">
        <!-- Logo/Brand -->
        <RouterLink to="/" class="nav-brand">
          <h2>VKM Portal</h2>
        </RouterLink>

        <!-- Navigatie links -->
        <div class="nav-links">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          
          <!-- Als niet ingelogd -->
          <template v-if="!isLoggedIn">
            <RouterLink to="/login" class="nav-link">Inloggen</RouterLink>
            <RouterLink to="/register" class="nav-link nav-link-primary">Registreren</RouterLink>
          </template>
          
          <!-- Als wel ingelogd -->
          <template v-else>
            <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
            <RouterLink to="/modules" class="nav-link">Modules</RouterLink>
            <button @click="logout" class="nav-link nav-logout">Uitloggen</button>
          </template>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

/* Navigatie balk */
.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  height: 70px;
}

.nav-brand {
  text-decoration: none;
  color: white;
}

.nav-brand h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
}

.nav-link:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  background: rgba(255,255,255,0.2);
}

.nav-link-primary {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.3);
}

.nav-link-primary:hover {
  background: white;
  color: #667eea;
}

.nav-logout {
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
}

.nav-logout:hover {
  background: rgba(255,255,255,0.2);
}

/* Main content */
.main-content {
  flex: 1;
  width: 100%;
  background: #f8f9fa;
}

/* Responsive design */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    flex-direction: column;
    height: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  
  .nav-brand {
    margin-bottom: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav-link {
    padding: 6px 12px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    gap: 0.5rem;
  }
  
  .nav-link {
    padding: 4px 8px;
    font-size: 0.8rem;
  }
  
  .nav-brand h2 {
    font-size: 1.2rem;
  }
}
</style>
