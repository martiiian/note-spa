<template>
  <NoteForm
    :title="item.title"
    :description="item.description"
    button-name="Обновить"
    @submit="update"
  />
</template>

<script setup lang="ts">
import NoteForm from './NoteForm.vue'
import { convertFormDataToObject } from '../helpers/common'
import { useNotesStore, useSubNotesStore } from "../store";

const subNotesStore = useSubNotesStore()
const notesStore = useNotesStore()

interface Props {
  item: ListItem
}

interface Emits {
  (e: 'updated'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function update(e: any) {
  const formData = convertFormDataToObject(new FormData(e.target)) as Pick<ListItem, 'title' | 'description'>;

  if (props.item.parent) {
    subNotesStore.update({
      ...props.item,
      ...formData,
    })
  } else {
    notesStore.update({
      id: props.item.id,
      isComplete: props.item.isComplete,
      ...formData,
    })
  }

  emit('updated')
}
</script>
