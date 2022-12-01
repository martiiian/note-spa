<template>
  <div class="flex flex-col">
    <label
      class="text-5xl text-slate-300 font-sans"
      :for="id"
    >
      {{ title }} <br>
    </label>
    <input
      :id="id"
      :type="type"
      :name="name"
      class="mt-3 border-2 text-xl border-gray-400"
      :value="modelValue"
      @input="$emit('update:modelValue')"
    >
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  title: string,
  name: string,
  id?: string | null,
  modelValue?: string,
  type?: string
}>(), {
  id: null,
  modelValue: '',
  type: 'text'
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
