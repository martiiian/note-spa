<template>
  <template v-if="parent">
    <h2>Создание дочерней заметки</h2>
    <p class="text-center">
      (для: {{ parent.title }})
    </p>
  </template>
  <h2 v-else>
    Создание заметки
  </h2>

  <NoteForm @submit="create" />
</template>

<script setup lang="ts">
import NoteForm from './NoteForm.vue'
import { convertFormDataToObject } from '@/helpers/common'
import { useNotesStore, useSubNotesStore } from '@/store'
import { ListItem } from '@/types/common'

const subNotesStore = useSubNotesStore()
const notesStore = useNotesStore()

const props = withDefaults(
  defineProps<{
    parent: ListItem | null
  }>(), 
  {
    parent: null
  }
)

const emit = defineEmits(['created'])

function create(e: Event) {
  const formData = convertFormDataToObject(new FormData(e.target as HTMLFormElement)) as Pick<ListItem, 'title' | 'description'>

  if (props.parent) {
    subNotesStore.create({
      ...formData,
      parent: props.parent.id
    })
  } else {
    notesStore.create(formData)
  }

  emit('created')
}
</script>
