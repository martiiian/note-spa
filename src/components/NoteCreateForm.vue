<template>
  <NoteForm @submit="create" />
</template>

<script>
import NoteForm from './NoteForm'
import { convertFormDataToObject } from '../helpers/common'
import { useStore } from 'vuex'

export default {
  components: { NoteForm },

  props: {
    parent: {
      type: Object,
      default: null
    }
  },

  emits: ['created'],

  setup(props, { emit }) {
    const store = useStore()

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

    return {
      create
    }
  }
}
</script>
