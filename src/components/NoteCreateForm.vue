<template>
  <NoteForm @submit="create" />
</template>

<script setup>
import NoteForm from './NoteForm'
import { convertFormDataToObject } from '../helpers/common'
import { defineEmits, defineProps } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  parent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['created'])

defineEmits(['created'])

function create(e) {
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
