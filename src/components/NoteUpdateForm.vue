<template>
  <NoteForm
    :title="item.title"
    :description="item.description"
    button-name="Обновить"
    @submit="update"
  />
</template>

<script lang="ts" setup>
import NoteForm from './NoteForm.vue'
import { convertFormDataToObject } from '../helpers/common'
import { useStore } from 'vuex'

const props = defineProps<{ item: object, parent: number }>()

const emit = defineEmits<{
  (e: 'updated'): void
}>()

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
