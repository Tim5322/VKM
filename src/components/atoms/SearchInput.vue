<template>
  <div class="search-input-container">
    <div class="search-input-wrapper">
      <span class="search-icon">🔍</span>
      <input 
        :value="modelValue"
        @input="handleInput"
        type="text" 
        :placeholder="placeholder"
        class="search-input"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  input: []
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input')
}
</script>

<style scoped>
.search-input-container {
  width: 100%;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #6c757d;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background: white;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.search-input::placeholder {
  color: #6c757d;
}
</style>