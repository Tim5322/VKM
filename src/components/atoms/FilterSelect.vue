<template>
  <div class="filter-select">
    <label v-if="label" class="filter-label">{{ label }}</label>
    <select 
      :value="modelValue"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value); $emit('change')"
      class="filter-select-input"
    >
      <option 
        v-for="option in options" 
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
interface SelectOption {
  value: string
  label: string
}

defineProps<{
  modelValue: string
  label?: string
  options: SelectOption[]
}>()

defineEmits<{
  'update:modelValue': [value: string]
  change: []
}>()
</script>

<style scoped>
.filter-select {
  display: flex;
  flex-direction: column;
  min-width: 150px;
}

.filter-label {
  font-size: 0.9rem;
  color: #495057;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.filter-select-input {
  padding: 0.5rem 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-select-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.filter-select-input:hover {
  border-color: #ced4da;
}
</style>