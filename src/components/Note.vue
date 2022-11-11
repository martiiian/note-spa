<template>
  <div class="note">
    <NoteBody
      :description="note.description"
      :title="note.title"
      :is-complete="note.isComplete"
      @delete="$emit('delete', note)"
      @edit="$emit('edit', note)"
      @complete="$emit('complete', note)"
      @createChild="$emit('createChild', note)"
    />

    <div v-if="note.subNotes.length" class="note__sub-notes">
      <NoteBody
        v-for="subNote in note.subNotes"
        :key="subNote.id"
        :description="subNote.description"
        :title="subNote.title"
        :is-complete="note.isComplete || subNote.isComplete"
        is-child
        @complete="$emit('complete', subNote)"
        @delete="$emit('deleteChild', subNote)"
        @edit="$emit('editChild', subNote)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NoteBody from './NoteBody.vue'

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
  'complete'
])
</script>

<style lang="scss">
.note {
  margin: 10px 0;
  &__sub-notes {
    padding-left: 20px;
    padding-right: 5px;
  }
}
</style>
