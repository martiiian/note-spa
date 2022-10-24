<template>
  <Modal v-if="createModalIsOpen" @close="toggleCreateModal">
    <NoteCreateForm :parent="parentForCreate" @created="toggleCreateModal" />
  </Modal>

  <Modal v-if="editableItem" @close="removeEditableItem">
    <NoteUpdateForm
      :description="editableItem.description"
      :title="editableItem.title"
    />
  </Modal>

  <div class="app">
    <button class="app__create-note-btn btn" @click="toggleCreateModal">
      Создать заметку
    </button>

    <div v-if="notesWithChildren.length" class="notes">
      <Note
        v-for="note in notesWithChildren"
        :note="note"
        @delete="deleteNote"
        @edit="edit"
        @deleteChild="deleteChild"
        @editChild="editChild"
        @createChild="createChild"
      />
    </div>

    <div v-else>
      Ничего не найдено
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import Note from './Note'
import NoteCreateForm from './NoteCreateForm'
import '~/src/assets/styles/common.scss'
import Modal from './Modal'
import NoteUpdateForm from './NoteUpdateForm'

export default {
  components: { NoteUpdateForm, Modal, NoteCreateForm, Note },

  setup() {
    const store = useStore()
    const createModalIsOpen = ref(false)
    const editableItem = ref(null)
    const parentForCreate = ref(null)

    function createChild(parent) {
      parentForCreate.value = parent
      toggleCreateModal()
    }

    function removeEditableItem() {
      editableItem.value = null
    }

    function toggleCreateModal() {
      if (createModalIsOpen.value) {
        parentForCreate.value = null
      }

      createModalIsOpen.value = !createModalIsOpen.value
    }

    function deleteChild(item) {
      store.commit('subNotes/delete', item)
    }

    function editChild(item) {
      editableItem.value = item
    }

    function deleteNote(item) {
      store.commit('notes/delete', item)
      store.commit('subNotes/deleteByParent', item)
    }

    function edit(item) {
      editableItem.value = item
    }

    function notesWithChildren() {
      return store.state.notes.all.map(note => ({
        ...note,
        subNotes: store.state.subNotes.all.filter((sn) => sn.parent === note.id)
      }))
    }

    return {
      createChild,
      deleteChild,
      deleteNote,
      edit,
      editChild,
      removeEditableItem,
      toggleCreateModal,
      notesWithChildren: computed(notesWithChildren),
      createModalIsOpen,
      editableItem,
      parentForCreate
    }
  }
}
</script>

<style lang="scss">
.app {
  padding: 10px;
  display: flex;
  flex-direction: column;

  &__create-note-btn {
    align-self: flex-end;
  }
}
</style>
