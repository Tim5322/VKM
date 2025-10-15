<template>
  <div class="form-input">
    <label v-if="label" :for="inputId" class="input-label">{{ label }}</label>
    <div class="input-wrapper">
      <input
        :id="inputId"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :type="type"
        :placeholder="placeholder"
        :required="required"
        class="input-field"
        :class="{ 'error': hasError }"
      />
      <div class="input-append">
        <slot name="append" />
      </div>
    </div>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  type?: string
  label?: string
  placeholder?: string
  required?: boolean
  errorMessage?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputId = computed(() => 
  props.label?.toLowerCase().replace(/\s+/g, '-') || 'input'
)

const hasError = computed(() => !!props.errorMessage)
</script>

<style scoped>
.form-input {
  margin-bottom: 1rem;
  position: relative;
}

.input-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.input-field {
  width: 100%;
  /* meer rechter padding zodat icons/buttons in absolute positie niet boven de tekst komen */
  padding: 0.75rem 2.75rem 0.75rem 1rem;
  min-height: 44px; /* consistentere hoogte zodat overlay icons netjes centreren */
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
  box-sizing: border-box;
}

.input-append {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 3; /* zorg dat knop boven het input element staat */
}

.input-wrapper {
  position: relative;
}

.input-append > * {
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.input-field.error {
  border-color: #ef4444;
}

.input-field.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-message {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #ef4444;
}

.input-field::placeholder {
  color: #9ca3af;
}
</style>