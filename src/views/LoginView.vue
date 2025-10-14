<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ApiService } from '../services/vkm-api.service'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { setToken } = useAuth()

// Login form data
const formData = reactive({
  email: '',
  password: ''
})

// Form state
const isLoading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

// Login functie
const handleLogin = async () => {
  errorMessage.value = ''
  
  // Basis validatie
  if (!formData.email || !formData.password) {
    errorMessage.value = 'Vul alle velden in'
    return
  }
  
  isLoading.value = true
  
  try {
    const response = await ApiService.post('/auth/login', {
      email: formData.email,
      password: formData.password
    }, { skipAuth: true })
    
    // Check if response exists and has data
    if (!response) {
      errorMessage.value = 'Geen response ontvangen van server'
      return
    }
    
    // Token opslaan (JWT)
    if (response.data && (response.data.token || response.data.access_token)) {
      const token = response.data.token || response.data.access_token
      setToken(token)
      
      // Redirect naar dashboard of gewenste pagina
      router.push('/')
    } else {
      errorMessage.value = 'Ongeldige inloggegevens'
    }
    
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Ongeldige inloggegevens'
  } finally {
    isLoading.value = false
  }
}

// Reset messages wanneer gebruiker begint te typen
const clearMessages = () => {
  errorMessage.value = ''
}

// Navigeer naar registratie
const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login-view">
    <div class="login-container">
      <LoginForm 
        ref="loginForm"
        @submit="handleLogin" 
      />
      
      <div class="register-link">
        <p>Nog geen account? <RouterLink to="/register">Registreer hier</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  padding: 3rem;
  width: 100%;
  max-width: 450px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.login-header p {
  color: #666;
  font-size: 1rem;
}

.login-form {
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

.form-group input {
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.login-btn {
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

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.message {
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.login-footer {
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
  .login-container {
    padding: 1rem;
  }
  
  .login-card {
    padding: 2rem;
  }
  
  .login-header h1 {
    font-size: 1.5rem;
  }
}
</style>