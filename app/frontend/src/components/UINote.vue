<template>
  <div class="note">
    <NoteBody
      :description="note.description"
      :title="note.title"
      :is-complete="note.isComplete"
      :is-empty="note.subNotes.length === 0"
      @delete="$emit('delete', note)"
      @edit="$emit('edit', note)"
      @toggleComplete="$emit('toggleComplete', note)"
      @createChild="$emit('createChild', note)"
      @click="toggleCollapse"
    />

    <div
      v-if="note.subNotes.length"
      class="note__sub-notes"
      :class="{'note__sub-notes_collapsed': collapsed}"
    >
      <NoteBody
        v-for="subNote in note.subNotes"
        :key="subNote.id"
        :description="subNote.description"
        :title="subNote.title"
        :is-complete="note.isComplete || subNote.isComplete"
        is-child
        @toggleComplete="$emit('toggleComplete', subNote)"
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

<style lang="scss">
.note {
  margin: 10px 0;
  &__sub-notes {
    padding-left: 20px;
    padding-right: 5px;
    overflow: hidden;
    max-height: 1000px;
    transition: max-height 1s ease-in-out;

    &_collapsed {
      max-height: 0;
      transition: max-height 0.5s cubic-bezier(0, 1, 0, 1);
    }
  }
}
</style>
