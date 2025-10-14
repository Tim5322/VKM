<template>
  <div class="register-view">
    <div class="register-container">
      <RegisterForm 
        ref="registerForm"
        @submit="handleRegister" 
      />
      
      <div class="login-link">
        <p>Al een account? <RouterLink to="/login">Login hier</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { ApiService } from '@/services/vkm-api.service'
import RegisterForm from '@/components/molecules/RegisterForm.vue'

const router = useRouter()
const registerForm = ref<InstanceType<typeof RegisterForm>>()

const handleRegister = async (userData: { 
  email: string
  password: string
  naam: string
  studentnummer: string
  opleiding: string
}) => {
  if (!registerForm.value) return
  
  registerForm.value.setLoading(true)
  
  try {
    const response = await ApiService.post('/auth/register', userData, { skipAuth: true })
    
    if (response?.data) {
      registerForm.value.setSuccess('Account succesvol aangemaakt! Je wordt doorgestuurd naar de login pagina...')
      
      setTimeout(() => {
        registerForm.value?.resetForm()
        router.push('/login')
      }, 2000)
    } else {
      registerForm.value.setError('Er is iets misgegaan bij het aanmaken van je account')
    }
  } catch (error: any) {
    console.error('Registratie error:', error)
    
    if (error.response?.status === 409) {
      registerForm.value.setError('Dit e-mailadres is al geregistreerd')
    } else if (error.response?.data?.message) {
      registerForm.value.setError(error.response.data.message)
    } else {
      registerForm.value.setError('Er is een fout opgetreden. Probeer het opnieuw.')
    }
  } finally {
    registerForm.value.setLoading(false)
  }
}
</script>

<style scoped>
.register-view {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.login-link {
  text-align: center;
}

.login-link p {
  color: #6b7280;
  font-size: 0.875rem;
}

.login-link a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>