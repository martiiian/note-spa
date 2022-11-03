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
import { useStore } from 'vuex'

interface Props {
  item: object
  parent?: number
}

interface Emits {
  (e: 'updated'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const store = useStore()

function update(e: any) {
  const formData = convertFormDataToObject(new FormData(e.target));

  if (props.parent) {
    store.commit('subNotes/update', {
      ...props.item,
      ...formData,
    })
  } else {
    store.commit('notes/update', {
      ...props.item,
      ...formData,
    })
  }

  emit('updated')
}
</script>
