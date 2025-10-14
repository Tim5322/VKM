<template>
  <button 
    @click="$emit('click')"
    :disabled="disabled || loading"
    :class="[
      'form-button',
      `btn-${variant}`,
      { 'loading': loading, 'disabled': disabled }
    ]"
    :type="type"
  >
    <LoadingSpinner v-if="loading" message="" />
    <span v-else>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import LoadingSpinner from './LoadingSpinner.vue'

withDefaults(defineProps<{
  label: string
  variant?: 'primary' | 'secondary' | 'danger'
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
}>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
  loading: false
})

defineEmits<{
  click: []
}>()
</script>

<style scoped>
.form-button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(.disabled):not(.loading) {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover:not(.disabled):not(.loading) {
  background: #4b5563;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover:not(.disabled):not(.loading) {
  background: #dc2626;
}

.form-button.disabled,
.form-button.loading {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.form-button.loading {
  pointer-events: none;
}
</style>