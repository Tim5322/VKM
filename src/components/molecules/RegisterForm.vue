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
          :aria-pressed="showPassword"
          :title="showPassword ? 'Verberg wachtwoord' : 'Toon wachtwoord'"
          :disabled="isLoading"
        >
          <span v-if="showPassword" class="sr-only">Verberg wachtwoord</span>
          <span v-else class="sr-only">Toon wachtwoord</span>
          <!-- eye-off (hidden) -->
          <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M17.94 17.94A10 10 0 0 1 12 19c-4.97 0-9.12-3.11-10-7 0.55-2.19 1.98-4.11 3.86-5.45"></path>
            <path d="M1 1l22 22"></path>
          </svg>
          <!-- eye (visible) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
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
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

@media (min-width: 640px) {
  .register-form {
    padding: 2rem;
  }
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
  z-index: 2; /* zorgt dat knop boven input verschijnt */
}

.password-toggle svg {
  display: block;
  width: 20px;
  height: 20px;
}

.sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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