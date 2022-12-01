<template>
  <div class="mx-0 my-4">
    <NoteBody
      :description="note.description"
      :title="note.title"
      :is-complete="note.isComplete"
      :is-empty="note.subNotes.length === 0"
      @delete="$emit('delete', note)"
      @edit="$emit('edit', note)"
      @toggle-complete="$emit('toggleComplete', note)"
      @create-child="$emit('createChild', note)"
      @click="toggleCollapse"
    />

    <div
      v-if="note.subNotes.length"
      class="pl-5 pr-1 overflow-hidden max-h-[1000px] transition-all ease-in-out duration-700"
      :class="{'max-h-0 transition-all duration-300 ease-in': collapsed}"
    >
      <NoteBody
        v-for="subNote in note.subNotes"
        :key="subNote.id"
        :description="subNote.description"
        :title="subNote.title"
        :is-complete="note.isComplete || subNote.isComplete"
        is-child
        @toggle-complete="$emit('toggleComplete', subNote)"
        @delete="$emit('deleteChild', subNote)"
        @edit="$emit('editChild', subNote)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteBody from './NoteBody.vue'
import { ref } from 'vue'

defineProps({
  note: {
    type: Object,
    required: true
  }
})

defineEmits([
  'edit',
  'delete',
  'editChild',
  'deleteChild',
  'createChild',
  'toggleComplete'
])

const collapsed = ref(true)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>
