<template>
  <NoteForm
    :title="item.title"
    :description="item.description"
    button-name="Обновить"
    @submit="update"
  />
</template>

<script>
import NoteForm from './NoteForm'
import { convertFormDataToObject } from '../helpers/common'
import { useStore } from 'vuex'

export default {
  components: { NoteForm },

  props: {
    item: {
      type: Object,
      required: true
    },
  },

  setup(props, { emit }) {
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

    return {
      update
    }
  }
}
</script>
