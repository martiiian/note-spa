<template>
  <button
    class="cursor-pointer bg-none border-0 ml-2 transition-all ease-in-out duration-300 hover:opacity-80"
    @click.stop="$emit('click')"
  >
    <img
      class="h-4 w-4"
      :src="img"
      :alt="alt"
    >
  </button>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'click'): void
}>()

const props = withDefaults(defineProps<{
  imgSrc: string
  alt?: string
}>(), {
  alt: ''
})

const img = (new URL(props.imgSrc, import.meta.url)).href
</script>
