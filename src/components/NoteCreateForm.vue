<template>
  <NoteForm @submit="create" />
</template>

<script setup lang="ts">
import NoteForm from './NoteForm'
import { convertFormDataToObject } from '../helpers/common'
import { useNotesStore, useSubNotesStore } from "../store";

const subNotesStore = useSubNotesStore()
const notesStore = useNotesStore()

const props = defineProps({
  parent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['created'])

function create(e: any) {
  const formData = convertFormDataToObject(new FormData(e.target)) as Pick<ListItem, 'title' | 'description'>;

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
