<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="form-header">
      <h2>Inloggen</h2>
      <p>Voer je gegevens in om toegang te krijgen tot je account</p>
    </div>

    <div class="form-fields">
      <FormInput
        v-model="email"
        type="email"
        label="E-mailadres"
        placeholder="je@email.com"
        required
        :error-message="errors.email"
      />

      <FormInput
        v-model="password"
        type="password"
        label="Wachtwoord"
        placeholder="••••••••"
        required
        :error-message="errors.password"
      />
    </div>

    <div class="form-actions">
      <FormButton
        label="Inloggen"
        type="submit"
        :loading="isLoading"
        variant="primary"
      />
    </div>

    <div v-if="errorMessage" class="form-error">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '../atoms/FormInput.vue'
import FormButton from '../atoms/FormButton.vue'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const errors = ref<{
  email?: string
  password?: string
}>({})

const emit = defineEmits<{
  submit: [credentials: { email: string; password: string }]
}>()

const validateForm = () => {
  errors.value = {}
  
  if (!email.value) {
    errors.value.email = 'E-mailadres is verplicht'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Voer een geldig e-mailadres in'
  }
  
  if (!password.value) {
    errors.value.password = 'Wachtwoord is verplicht'
  } else if (password.value.length < 6) {
    errors.value.password = 'Wachtwoord moet minimaal 6 karakters zijn'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (!validateForm()) return
  
  isLoading.value = true
  errorMessage.value = ''
  
  emit('submit', {
    email: email.value,
    password: password.value
  })
}

// Expose method to handle external errors
defineExpose({
  setError: (error: string) => {
    errorMessage.value = error
    isLoading.value = false
  },
  setLoading: (loading: boolean) => {
    isLoading.value = loading
  }
})
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  margin: 0 0 0.5rem 0;
  color: #1f2937;
  font-size: 1.5rem;
}

.form-header p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.form-fields {
  margin-bottom: 1.5rem;
}

.form-actions {
  margin-bottom: 1rem;
}

.form-error {
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
}
</style>