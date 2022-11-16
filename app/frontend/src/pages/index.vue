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
        :key="note.id"
        :note="note"
        @delete="deleteNote"
        @edit="edit"
        @deleteChild="deleteChild"
        @editChild="editChild"
        @createChild="createChild"
        @toggleComplete="toggleComplete"
      />
    </div>

    <div v-else class="not-found">
      <p class="not-found__text">
        Ничего не найдено<br>
        создай свою первую заметку по кнопке выше.
      </p>
      <img
        class="not-found__img"
        src="@/assets/images/cat.png"
        alt="кот ничего не найдено"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/styles/common.scss'
import AreYouSure from '@/components/AreYouSure.vue'
import Modal from '@/components/UIModal.vue'
import Note from '@/components/index/Note.vue'
import NoteCreateForm from '@/components/index/NoteCreateForm.vue'
import NoteUpdateForm from '@/components/index/NoteUpdateForm.vue'
import { onBeforeMount, ref } from 'vue'
import { useNotesStore, useSubNotesStore } from '@/store'
import { ListItem } from '@/types/common'

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
  areYouSure.value?.confirm(`Вы точно хотите удалить "${item.title}"?`)
    .then((isDelete: boolean) => {
      isDelete && subNotesStore.delete(item)
    })
}

function editChild(item: ListItem) {
  editableItem.value = item
}

function deleteNote(item: ListItem) {
  areYouSure.value?.confirm(`Вы точно хотите удалить "${item.title}" и все его подзадачи?`)
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

function toggleComplete(item: ListItem) {
  if (item.parent) {
    subNotesStore.update({
      ...item,
      isComplete: !item.isComplete
    })
  } else {
    notesStore.update({
      id: item.id,
      title: item.title,
      description: item.description,
      isComplete: !item.isComplete
    })
  }
}

onBeforeMount(() => {
  const { VITE_BACKEND_API: baseApi } = import.meta.env
  fetch(`${baseApi}/hello`).then(res => {
    return res.text()
  }).then((data) => {
    console.log(data)
  })
})
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

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__img {
    opacity: 0.2;
  }
  &__text {
    font-size: 24px;
    text-align: center;
  }
}
</style>
