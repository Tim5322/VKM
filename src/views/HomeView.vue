<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// Check of gebruiker is ingelogd
const isLoggedIn = () => {
  return localStorage.getItem('authToken') !== null
}

// Navigatie functies
const goToKeuzemodules = () => {
  router.push('/keuzemodules')
}

const goToFavorieten = () => {
  router.push('/favorieten')
}
</script>

<template>
  <div class="homepage">
    <!-- Hero sectie -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Vrije Keuze Modules</h1>
        <p class="hero-subtitle">
          Op deze site vind je alle keuzemodules die je dit jaar kan kiezen, neem je tijd en kijk rond.
        </p>
        
        <!-- Als ingelogd -->
        <div v-if="isLoggedIn()" class="hero-actions">
          <button @click="goToFavorieten" class="btn btn-primary">
            Mijn Favorieten
          </button>
          <button @click="goToKeuzemodules" class="btn btn-secondary">
            Bekijk Keuzemodules
          </button>
        </div>
        
        <!-- Als niet ingelogd -->
        <div v-else class="hero-actions">
          <router-link to="/register" class="btn btn-primary">
            Account Aanmaken
          </router-link>
          <router-link to="/login" class="btn btn-secondary">
            Inloggen
          </router-link>
        </div>
      </div>
    </section>

    <!-- Info sectie -->
    <section class="info-section">
      <div class="container">
        <h2>Ontdek Keuzemodules</h2>
        <p class="info-description">
          Bekijk ons overzicht van beschikbare vrije keuzemodules. 
          Vind de module die bij jou past en schrijf je direct in.
        </p>
        <div class="features">
          <div class="feature-card">
            <div class="feature-icon">📋</div>
            <h3>Overzichtelijke Lijst</h3>
            <p>Alle beschikbare keuzemodules op één plek, makkelijk te vergelijken.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📍</div>
            <h3>Locatie Info</h3>
            <p>Zie direct waar elke module wordt gegeven: Den Bosch, Breda of Tilburg.</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3>Leeruitkomsten</h3>
            <p>Krijg meteen informatie over de leeruitkomsten van de keuzemodule en weet wat je te wachten staat.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA sectie (alleen als niet ingelogd) -->
    <section v-if="!isLoggedIn()" class="cta-section">
      <div class="container">
        <h2>Wil jij zien welke keuzemodules er zijn?</h2>
        <p>Maak vandaag nog een account aan en ontdek ons modulenaanbod.</p>
        <router-link to="/register" class="btn btn-large btn-primary">
          Registreer Nu
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.homepage {
  min-height: calc(100vh - 70px);
}

/* Hero sectie */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-subtitle {
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 14px 28px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255,255,255,0.3);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: white;
  color: #667eea;
}

.btn-large {
  padding: 18px 36px;
  font-size: 1.2rem;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Info sectie */
.info-section {
  padding: 5rem 0;
  background: white;
}

.info-section h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.info-description {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 3rem;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
}

.feature-card {
  background: #f8f9fa;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  font-size: 1rem;
}

/* CTA sectie */
.cta-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
}

.cta-section h2 {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 1rem;
}

.cta-section p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .hero {
    padding: 3rem 1rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 250px;
    padding: 12px 24px;
  }
  
  .features {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .feature-card {
    padding: 2rem 1.5rem;
  }
  
  .info-section h2 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}
</style>
