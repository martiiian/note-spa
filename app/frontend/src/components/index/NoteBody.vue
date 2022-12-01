<template>
  <div
    class="p-3 pl-4 w-full bg-white rounded-lg bg-gray-200 border border-gray-400 cursor-pointer hover:bg-white group"
    :class="{
      'rounded-0 border-none cursor-default bg-gray-200 hover:bg-gray-200 last:rounded-b': isChild,
      'cursor-default bg-gray-500 hover:bg-gray-500': isComplete,
      'cursor-pointer hover:bg-white': isEmpty
    }"
    @click="$emit('click')"
  >
    <div class="flex justify-between items-start">
      <div class="text-cyan-900 grow">
        {{ title }}
      </div>

      <div
        class="max-[400px]:opacity-0 max-[400px]:visible flex flex-nowrap shrink-0 opacity-0 transition-all delay-300 ease-in invisible group-hover:opacity-100 group-hover:visible"
        :class="{ 'max-[400px]:opacity-100 visible': menuIsOpen }"
      >
        <UINoteBodyButton
          v-if="!isChild"
          img-src="/src/assets/images/add.svg"
          alt="add child"
          @click="$emit('create-child')"
        />

        <UINoteBodyButton
          img-src="/src/assets/images/check.svg"
          alt="complete"
          @click="$emit('toggle-complete')"
        />

        <UINoteBodyButton
          img-src="/src/assets/images/delete.svg"
          alt="delete"
          @click="$emit('delete')"
        />

        <UINoteBodyButton
          img-src="/src/assets/images/edit.svg"
          alt="delete"
          @click="$emit('edit')"
        />
      </div>


      <UINoteBodyButton
        class="hidden max-[400px]:block"
        img-src="/src/assets/images/menu.svg"
        alt="edit"
        @click="toggleMenu"
      />
    </div>

    <div class="bg-gray-500">
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UINoteBodyButton from '@/components/UINoteBodyButton.vue'

withDefaults(defineProps<{
  title: string
  description: string
  isChild?: boolean
  isEmpty?: boolean
  isComplete?: boolean
}>(), {
  isChild: false,
  isEmpty: false,
  isComplete: false
})

defineEmits([
  'create-child', 'toggle-complete', 'delete', 'edit', 'click'
])

const menuIsOpen = ref(false)

function toggleMenu() {
  menuIsOpen.value = !menuIsOpen.value
}
</script>

<style lang="scss">
.note-body {
  &:hover {
    .note-body__buttons {
      @media (min-width: 400px) {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}
</style>
