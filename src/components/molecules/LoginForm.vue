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
        :type="showPassword ? 'text' : 'password'"
        label="Wachtwoord"
        placeholder="••••••••"
        required
        :error-message="errors.password"
      >
        <template #append>
          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
            :aria-pressed="showPassword"
            :title="showPassword ? 'Verberg wachtwoord' : 'Toon wachtwoord'"
          >
            <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M17.94 17.94A10 10 0 0 1 12 19c-4.97 0-9.12-3.11-10-7 0.55-2.19 1.98-4.11 3.86-5.45"></path>
              <path d="M1 1l22 22"></path>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>
        </template>
      </FormInput>
    </div>

    <div class="form-actions">
      <FormButton label="Inloggen" type="submit" :loading="isLoading" variant="primary" />
    </div>

    <div v-if="errorMessage" class="form-error">{{ errorMessage }}</div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '../atoms/FormInput.vue'
import FormButton from '../atoms/FormButton.vue'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const errors = ref<{ email?: string; password?: string }>({})

const emit = defineEmits<{
  (e: 'submit', credentials: { email: string; password: string }): void
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
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
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

.password-toggle {
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
}

.form-error {
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
}
</style>