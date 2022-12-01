<template>
  <div class="flex justify-center items-center z-10 bg-gray-500/50 fixed h-screen w-screen">
    <div class="modal my-0 mx-auto rounded-xl bg-white relative p-8">
      <button
        class="absolute right-3 top-3 cursor-pointer border-0 bg-none"
        @click="$emit('close')"
      >
        <img
          class="w-4 h-4"
          src="@/assets/images/close.svg"
          alt="close"
        >
      </button>

      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['close'])
</script>
