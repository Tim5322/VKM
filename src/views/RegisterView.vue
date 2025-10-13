<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ApiService } from '../services/vkm-api.service'

const router = useRouter()

// Registratie form data
const formData = reactive({
  email: '',
  password: '',
  naam: '',
  studentnummer: '',
  opleiding: 'Informatica'
})

// Form state
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const showPassword = ref(false)

// Beschikbare opleidingen
const opleidingen = [
  'Informatica',
  'Technische Informatica'
]

// Registratie functie
const handleRegister = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  // Basis validatie
  if (!formData.email || !formData.password || !formData.naam || !formData.studentnummer) {
    errorMessage.value = 'Vul alle velden in'
    return
  }
  
  if (formData.password.length < 6) {
    errorMessage.value = 'Wachtwoord moet minimaal 6 karakters zijn'
    return
  }
  
  isLoading.value = true
  
  try {
    const response = await ApiService.post('/auth/register', {
      email: formData.email,
      password: formData.password,
      naam: formData.naam,
      studentnummer: formData.studentnummer,
      opleiding: formData.opleiding
    }, { skipAuth: true })
    
    successMessage.value = 'Registratie succesvol!'
    
    // Na 2 seconden doorsturen naar login
    setTimeout(() => {
      router.push('/login')
    }, 2000)
    
  } catch (error) {
    console.error('Registratie error:', error)
    errorMessage.value = 'Registratie mislukt. Probeer het opnieuw.'
  } finally {
    isLoading.value = false
  }
}

// Reset messages wanneer gebruiker begint te typen
const clearMessages = () => {
  errorMessage.value = ''
  successMessage.value = ''
}

// Navigeer naar login
const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="register-container">
    <div class="register-card">
      <div class="register-header">
        <h1>Registreren voor VKM</h1>
        <p>Maak een account aan om je in te schrijven voor keuzemodules</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        
        <!-- Success/Error Messages -->
        <div v-if="successMessage" class="message success-message">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="message error-message">
          {{ errorMessage }}
        </div>

        <!-- Naam -->
        <div class="form-group">
          <label for="naam">Volledige naam</label>
          <input 
            id="naam"
            v-model="formData.naam"
            @input="clearMessages"
            type="text" 
            placeholder="Voer je volledige naam in"
            required
          />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email adres</label>
          <input 
            id="email"
            v-model="formData.email"
            @input="clearMessages"
            type="email" 
            placeholder="Voer je email in"
            required
          />
        </div>

        <!-- Wachtwoord -->
        <div class="form-group">
          <label for="password">Wachtwoord</label>
          <input 
            id="password"
            v-model="formData.password"
            @input="clearMessages"
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Minimaal 6 karakters"
            required
          />
          <div class="password-toggle">
            <input 
              type="checkbox" 
              id="show-password"
              v-model="showPassword"
            />
            <label for="show-password" class="checkbox-label">Wachtwoord tonen</label>
          </div>
        </div>

        <!-- Studentnummer -->
        <div class="form-group">
          <label for="studentnummer">Studentnummer</label>
          <input 
            id="studentnummer"
            v-model="formData.studentnummer"
            @input="clearMessages"
            type="text" 
            placeholder="Voer je studentnummer in"
            required
          />
        </div>

        <!-- Opleiding -->
        <div class="form-group">
          <label for="opleiding">Opleiding</label>
          <select 
            id="opleiding"
            v-model="formData.opleiding"
            @change="clearMessages"
            required
          >
            <option v-for="opl in opleidingen" :key="opl" :value="opl">
              {{ opl }}
            </option>
          </select>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit" 
          class="register-btn"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Registreren...</span>
          <span v-else>Account aanmaken</span>
        </button>

      </form>

      <div class="register-footer">
        <p>Heb je al een account? 
          <button @click="goToLogin" class="link-btn">Log hier in</button>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.register-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
}

.register-header {
  text-align: center;
  margin-bottom: 2rem;
}

.register-header h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.register-header p {
  color: #666;
  font-size: 1rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.form-group input,
.form-group select {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #667eea;
}

.register-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 24px;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.register-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

.success-message {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.register-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e5e9;
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  font-size: inherit;
}

.link-btn:hover {
  text-decoration: underline;
}

/* Password toggle styling */
.password-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.password-toggle input[type="checkbox"] {
  width: auto;
  margin: 0;
  padding: 0;
}

.checkbox-label {
  font-size: 0.9rem;
  color: #666;
  cursor: pointer;
  font-weight: normal;
}

.checkbox-label:hover {
  color: #667eea;
}

@media (max-width: 768px) {
  .register-container {
    padding: 1rem;
  }
  
  .register-card {
    padding: 2rem;
  }
  
  .register-header h1 {
    font-size: 1.5rem;
  }
}
</style>