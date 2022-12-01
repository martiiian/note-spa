<template>
  <div class="flex flex-col pt-3">
    <label :for="id">
      {{ label }}<sup class="text-red">*</sup>
    </label>

    <component
      :is="inputType"
      :id="id"
      class="p-2"
      :value="modelValue"
      :type="type"
      :name="name"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  id: string
  inputType?: 'input' | 'textarea'
  label: string
  modelValue: string
  name: string
  type?: string
}>(), {
  type: 'text',
  inputType: 'input'
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
