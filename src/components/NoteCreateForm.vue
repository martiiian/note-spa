<template>
  <NoteForm @submit="create" />
</template>

<script setup lang="ts">
import NoteForm from './NoteForm'
import { convertFormDataToObject } from '../helpers/common'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  parent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['created'])

function create(e: any) {
  const formData = convertFormDataToObject(new FormData(e.target));

  if (props.parent) {
    store.commit('subNotes/create', {
      ...formData,
      parent: props.parent.id
    })
  } else {
    store.commit('notes/create', formData)
  }

  emit('created')
}
</script>
