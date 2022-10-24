<template>
  <div class="note">
    <NoteBody
      :description="note.description"
      :title="note.title"
      @delete="$emit('delete', note)"
      @edit="$emit('edit', note)"
      @createChild="$emit('createChild', note)"
    />

    <div v-if="note.subNotes.length" class="note__sub-notes">
      <NoteBody
        v-for="subNote in note.subNotes"
        :key="subNote.id"
        :description="subNote.description"
        :title="subNote.title"
        is-child
        @delete="$emit('deleteChild', subNote)"
        @edit="$emit('editChild', subNote)"
      />
    </div>
  </div>
</template>

<script>
import NoteBody from './NoteBody'

export default {
  name: 'Note',

  components: {
    NoteBody
  },

  props: {
    note: {
      type: Object
    }
  },

  emits: ['edit', 'delete', 'editChild', 'deleteChild', 'createChild'],

  setup(props) {

  }
}
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
