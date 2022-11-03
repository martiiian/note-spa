<template>
  <NoteForm
    :title="item.title"
    :description="item.description"
    button-name="Обновить"
    @submit="update"
  />
</template>

<script setup>
import NoteForm from './NoteForm'
import { convertFormDataToObject } from '../helpers/common'
import { defineEmits, defineProps } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
  props: {
    item: {
      type: Object,
      required: true
    },
  },
})

const emit = defineEmits()

const store = useStore()

function update(e) {
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
