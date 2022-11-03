<template>
  <Modal v-if="createModalIsOpen" @close="toggleCreateModal">
    <NoteCreateForm :parent="parentForCreate" @created="toggleCreateModal" />
  </Modal>

  <Modal v-if="editableItem" @close="removeEditableItem">
    <NoteUpdateForm :item="editableItem" @updated="removeEditableItem" />
  </Modal>

  <AreYouSure ref="areYouSure" />

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
        @complete="complete"
      />
    </div>

    <div v-else>
      Ничего не найдено
    </div>
  </div>
</template>

<script setup>
import '~/src/assets/styles/common.scss'
import AreYouSure from './AreYouSure'
import Modal from './Modal'
import Note from './Note'
import NoteCreateForm from './NoteCreateForm'
import NoteUpdateForm from './NoteUpdateForm'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const areYouSure = ref(null)
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
  areYouSure.value.confirm(`Вы точно хотите удалить "${item.title}"?`)
    .then((isDelete) => {
      if (isDelete) {
        store.commit('subNotes/delete', item)
      }
    })
}

function editChild(item) {
  editableItem.value = item
}

function deleteNote(item) {
  areYouSure.value.confirm(`Вы точно хотите удалить "${item.title}" и все его подзадачи?`)
    .then((isDelete) => {
      if (isDelete) {
        store.commit('notes/delete', item)
        store.commit('subNotes/deleteByParent', item)
      }
    })
}

function edit(item) {
  editableItem.value = item
}

function complete(item) {
  if (item.parent) {
    store.commit('subNotes/update', {
      ...item,
      isComplete: true
    })
  } else {
    store.commit('notes/update', {
      ...item,
      isComplete: true
    })
  }
}

function notesWithChildren() {
  return store.state.notes.all.map(note => ({
    ...note,
    subNotes: store.state.subNotes.all.filter((sn) => sn.parent === note.id)
  }))
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
