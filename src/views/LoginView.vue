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

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { ApiService } from '@/services/vkm-api.service'
import { useAuth } from '@/composables/useAuth'
import LoginForm from '@/components/molecules/LoginForm.vue'

const router = useRouter()
const { setToken } = useAuth()
const loginForm = ref<InstanceType<typeof LoginForm>>()

const handleLogin = async (credentials: { email: string; password: string }) => {
  try {
    const response = await ApiService.post('/auth/login', credentials, { skipAuth: true })
    
    if (response?.data && (response.data.token || response.data.access_token)) {
      const token = response.data.token || response.data.access_token
      setToken(token)
      router.push('/keuzemodules')
    } else {
      loginForm.value?.setError('Login mislukt: ongeldige inloggegevens')
    }
  } catch (err: any) {
    console.error('Login error:', err)
    loginForm.value?.setError(err.message || 'Er is een fout opgetreden bij het inloggen')
  }
}
</script>

<style scoped>
.login-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-container {
  padding: 2rem;
  width: 100%;
  max-width: 500px;
}

.register-link {
  text-align: center;
  margin-top: 2rem;
}

.register-link p {
  color: #6b7280;
  font-size: 0.9rem;
}

.register-link a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-container {
    padding: 1rem;
  }
}
</style>