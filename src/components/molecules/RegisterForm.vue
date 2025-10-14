<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <h2>Account aanmaken</h2>
    
    <div class="form-group">
      <FormInput
        v-model="formData.email"
        type="email"
        placeholder="E-mail"
        required
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-group">
      <FormInput
        v-model="formData.naam"
        type="text"
        placeholder="Volledige naam"
        required
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-group">
      <FormInput
        v-model="formData.studentnummer"
        type="text"
        placeholder="Studentnummer"
        required
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-group">
      <FilterSelect
        v-model="formData.opleiding"
        :options="opleidingOptions"
        placeholder="Selecteer opleiding"
        :disabled="isLoading"
      />
    </div>
    
    <div class="form-group">
      <FormInput
        v-model="formData.password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Wachtwoord (min. 6 karakters)"
        required
        :disabled="isLoading"
      />
      <button 
        type="button" 
        class="password-toggle"
        @click="showPassword = !showPassword"
        :disabled="isLoading"
      >
        {{ showPassword ? '🙈' : '👁️' }}
      </button>
    </div>
    
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    
    <FormButton
      type="submit"
      :loading="isLoading"
      :disabled="isLoading"
      variant="primary"
      label="Account aanmaken"
    />
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import FormInput from '@/components/atoms/FormInput.vue'
import FormButton from '@/components/atoms/FormButton.vue'
import FilterSelect from '@/components/atoms/FilterSelect.vue'

interface RegisterData {
  email: string
  password: string
  naam: string
  studentnummer: string
  opleiding: string
}

const emit = defineEmits<{
  submit: [data: RegisterData]
}>()

const formData = reactive<RegisterData>({
  email: '',
  password: '',
  naam: '',
  studentnummer: '',
  opleiding: 'Informatica'
})

const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showPassword = ref(false)

const opleidingOptions = [
  { value: 'Informatica', label: 'Informatica' },
  { value: 'Technische Informatica', label: 'Technische Informatica' }
]

const handleSubmit = () => {
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
  
  emit('submit', { ...formData })
}

// Expose methods voor parent component
defineExpose({
  setLoading: (loading: boolean) => {
    isLoading.value = loading
  },
  setError: (message: string) => {
    errorMessage.value = message
  },
  setSuccess: (message: string) => {
    successMessage.value = message
  },
  resetForm: () => {
    Object.assign(formData, {
      email: '',
      password: '',
      naam: '',
      studentnummer: '',
      opleiding: 'Informatica'
    })
    errorMessage.value = ''
    successMessage.value = ''
  }
})
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.register-form h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
  font-size: 1.5rem;
  font-weight: 600;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #6b7280;
  transition: color 0.2s;
}

.password-toggle:hover:not(:disabled) {
  color: #374151;
}

.password-toggle:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 6px;
}

.success-message {
  color: #059669;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 6px;
}
</style>