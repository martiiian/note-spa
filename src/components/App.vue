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

    <div v-if="notesStore.notesWithChildren.length" class="notes">
      <Note
        v-for="note in notesStore.notesWithChildren"
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

<script setup lang="ts">
import '@/assets/styles/common.scss'
import AreYouSure from './AreYouSure.vue'
import Modal from './Modal.vue'
import Note from './Note.vue'
import NoteCreateForm from './NoteCreateForm.vue'
import NoteUpdateForm from './NoteUpdateForm.vue'
import {ref} from 'vue'
import {useNotesStore, useSubNotesStore } from "@/store";

const notesStore = useNotesStore()
const subNotesStore = useSubNotesStore()

const areYouSure = ref<InstanceType<typeof AreYouSure> | null>(null)
const createModalIsOpen = ref<boolean>(false)
const editableItem = ref<ListItem>()
const parentForCreate = ref<ListItem>()

function createChild(parent: ListItem) {
  parentForCreate.value = parent
  toggleCreateModal()
}

function removeEditableItem() {
  editableItem.value = undefined
}

function toggleCreateModal() {
  if (createModalIsOpen.value) {
    parentForCreate.value = undefined
  }

  createModalIsOpen.value = !createModalIsOpen.value
}

function deleteChild(item: ListItem) {
  areYouSure.value && areYouSure.value.confirm(`Вы точно хотите удалить "${item.title}"?`)
    .then((isDelete: boolean) => {
      isDelete && subNotesStore.delete(item)
    })
}

function editChild(item: ListItem) {
  editableItem.value = item
}

function deleteNote(item: ListItem) {
  areYouSure.value.confirm(`Вы точно хотите удалить "${item.title}" и все его подзадачи?`)
    .then((isDelete: boolean) => {
      if (isDelete) {
        notesStore.delete(item)
        subNotesStore.deleteByParent(item)
      }
    })
}

function edit(item: ListItem) {
  editableItem.value = item
}

function complete(item: ListItem) {
  if (item.parent) {
    subNotesStore.update({
      ...item,
      isComplete: true
    })
  } else {
    notesStore.update({
      id: item.id,
      title: item.title,
      description: item.description,
      isComplete: true
    })
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
