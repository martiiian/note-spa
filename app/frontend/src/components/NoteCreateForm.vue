<template>
  <template v-if="parent">
    <h2>Создание дочерней заметки</h2>
    <p class="note-create-form__title-desc">(для: {{ parent.title }})</p>
  </template>
  <h2 v-else>Создание заметки</h2>

  <NoteForm @submit="create" />
</template>

<script setup lang="ts">
import NoteForm from './NoteForm.vue'
import { convertFormDataToObject } from '@/helpers/common'
import { useNotesStore, useSubNotesStore } from "../store";

const subNotesStore = useSubNotesStore()
const notesStore = useNotesStore()

interface Props {
  parent: ListItem | null
}

const props = withDefaults(defineProps<Props>(), {
  parent: null
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

<style lang="scss" scoped>
.note-create-form {
  &__title-desc {
    text-align: center;
  }
}
</style>
